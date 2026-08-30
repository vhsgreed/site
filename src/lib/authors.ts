import { getCollection } from 'astro:content';

let cache: Array<{ id: string; data: { name: string } }> | null = null;

async function authors() {
  if (!cache) cache = await getCollection('authors');
  return cache;
}

export async function getAuthorName(id?: string): Promise<string | undefined> {
  if (!id) return undefined;
  return (await authors()).find((a) => a.id === id)?.data.name;
}