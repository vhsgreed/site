// siteTree.ts — exhaustive route inventory of the site, generated at build.
//
// Single source of truth for /site-index/. Static routes come from the
// actual files under src/pages (import.meta.glob), dynamic routes are
// enumerated from the same data their getStaticPaths use. Adding a page
// anywhere in src/pages (or a content/data file) is enough for it to show
// up here on the next build: no list editing.

export interface SiteEntry {
  href: string;
  label: string;
}

export interface SiteSection {
  name: string;
  href: string | null;
  entries: SiteEntry[];
}

// Static page files -> route paths. Excludes the 404 (not indexable) and
// dynamic routes (enumerated below from their data sources).
const staticModules = import.meta.glob('/src/pages/**/*.astro');

function staticRoutes(): SiteEntry[] {
  const entries: SiteEntry[] = [];
  for (const path of Object.keys(staticModules)) {
    const rel = path.replace('/src/pages/', '').replace(/\.astro$/, '');
    if (rel === '404') continue;
    if (rel.includes('[')) continue; // dynamic: enumerated explicitly
    const href =
      rel === 'index' ? '/' : rel.endsWith('/index') ? `/${rel.slice(0, -6)}/` : `/${rel}/`;
    const label = href === '/' ? '(home)' : href;
    entries.push({ href, label });
  }
  return entries.sort((a, b) => a.href.localeCompare(b.href));
}

export async function buildSiteTree(): Promise<SiteSection[]> {
  const { getCollection } = await import('astro:content');
  const staticPages = staticRoutes();

  // Dynamic: blog posts from the posts collection.
  const posts = (await getCollection('posts')).sort((a, b) =>
    a.id.localeCompare(b.id)
  );

  // Dynamic: authors.
  const authors = (await getCollection('authors')).sort((a, b) =>
    a.id.localeCompare(b.id)
  );

  // Dynamic: data + company pSEO pages from their JSON sources.
  const pseo: { slug: string; title: string }[] = (
    (await import('../data/pseo-pages.json')).default as {
      pages: { slug: string; title: string }[];
    }
  ).pages;

  const companies: { slug: string; label: string }[] = (
    (await import('../data/companies.json')).default as {
      pages: { slug: string; label: string }[];
    }
  ).pages;

  // Dynamic: robotics nation pages.
  const { nations } = await import('./nations');
  const nationEntries: SiteEntry[] = Object.entries(nations)
    .map(([name, data]) => ({
      href: `/robotics-stocks/${data.slug}/`,
      label: name,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const section = (
    name: string,
    href: string | null,
    entries: SiteEntry[]
  ): SiteSection => ({ name, href, entries });

  // Group: a top-level segment is a "directory" if anything lives deeper
  // than the segment index page itself (static nested pages or dynamic
  // entries). Everything else is a plain top-level page.
  const allDynamic: { dir: string; entries: SiteEntry[] }[] = [
    { dir: 'blog', entries: posts.map((p) => ({ href: `/blog/${p.id}/`, label: p.data.title })) },
    { dir: 'authors', entries: authors.map((a) => ({ href: `/authors/${a.id}/`, label: a.data.name })) },
    { dir: 'companies', entries: companies.map((c) => ({ href: `/companies/${c.slug}/`, label: c.label })) },
    { dir: 'data', entries: pseo.map((p) => ({ href: `/data/${p.slug}/`, label: p.title })) },
    { dir: 'robotics-stocks', entries: nationEntries },
  ].filter((d) => d.entries.length > 0);

  const dirs = new Set<string>(allDynamic.map((d) => d.dir));
  for (const e of staticPages) {
    const parts = e.href.replace(/^\//, '').replace(/\/$/, '').split('/');
    if (parts.length > 1) dirs.add(parts[0]);
  }

  const topPages = staticPages.filter((e) => {
    const parts = e.href.replace(/^\//, '').replace(/\/$/, '');
    return e.href === '/' || (!parts.includes('/') && !dirs.has(parts));
  });

  const sections: SiteSection[] = [
    section('Pages', '/', topPages.sort((a, b) => a.href.localeCompare(b.href))),
  ];

  for (const dir of [...dirs].sort()) {
    const dyn = allDynamic.find((d) => d.dir === dir)?.entries ?? [];
    const own = staticPages
      .filter((e) => e.href === `/${dir}/` || e.href.startsWith(`/${dir}/`))
      .sort((a, b) => a.href.localeCompare(b.href));
    const merged = [...own, ...dyn].sort((a, b) => a.href.localeCompare(b.href));
    sections.push(section(dir, `/${dir}/`, merged));
  }

  return sections;
}

export function countEntries(sections: SiteSection[]): number {
  return sections.reduce((n, s) => n + s.entries.length, 0);
}
