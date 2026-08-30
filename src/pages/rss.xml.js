import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const articles = (await getCollection('articles')).map((p) => ({ ...p, kind: 'articles' }));
  const insights = (await getCollection('insights')).map((p) => ({ ...p, kind: 'insights' }));
  const posts = [...articles, ...insights].sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
  return rss({
    title: 'vhsgreed',
    description: 'For-profit, self-funded AI R&D: robotics intelligence, open-source agent tooling, honest research.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.kind}/${post.id}/`,
    })),
  });
}