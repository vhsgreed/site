// posts.ts: one helper so every page gets posts the same way.
import { getCollection } from 'astro:content';

export async function getPosts() {
  const posts = await getCollection('posts', (p) => !p.data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(d: Date) {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
