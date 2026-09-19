import rss from '@astrojs/rss';
import { site } from '../site';
import { getPosts } from '../posts';

export async function GET(context) {
  const posts = await getPosts();
  return rss({
    title: site.name,
    description: site.description,
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.description,
      link: `/blog/${p.id}/`,
    })),
  });
}
