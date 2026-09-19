# Rules for AI agents working on this repo

Karl is the editor of this site. You are a helper. Keep it small.

## Never do without Karl's explicit OK in this conversation

- Add a new page, page type, section, nav item, component or dependency.
- Change or remove any URL, or edit `public/_redirects`.
- Add tracking, analytics, cookies, or third-party scripts.
- Reorganise folders or rename files.
- Publish a post that says it is a draft or not ready.

## Fine to do

- Write or edit posts in `src/content/posts/` when asked.
- Fix typos, broken links and build errors.
- Small style tweaks in `src/styles.css` when asked.

## How the site works

- Static Astro site. Every post is one markdown file in `src/content/posts/`.
  Its file name is its URL: `/blog/<file-name>/`.
- Frontmatter: `title`, `date`, `topic` (ai | data | web | sweden),
  `description`, optional `lang` (en | sv), `draft`, `mediumUrl`, `product`.
- Posts with a `product` block show a buy box and appear on `/products/`.
- Site-wide settings live in `src/site.ts`. Look lives in `src/styles.css`.
- Voice: first person singular ("I"). It's Karl's personal site.
- No em-dashes in new copy. Use colons, commas, periods.

## Before you finish

- `npm run build` must pass.
- Tell Karl, in plain words, every file you changed and why.
