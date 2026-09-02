import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Single written-content collection (merged 09-02 from the old articles +
// insights split; Karl: "one directory for my sanity"). A post is either a
// blog post (no product block) or a product page (product block renders the
// Gumroad card). Affiliate links can appear in either type.
const postSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  description: z.string(),
  kind: z.enum(['build-log', 'story', 'guide', 'insight']).optional(),
  mediumUrl: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
  author: z.string().optional(),
  product: z
    .object({
      name: z.string(),
      price: z.string().optional(),
      url: z.string().url().optional(),
      status: z.enum(['live', 'pending', 'none']).optional(),
      tag: z.string().optional(),
    })
    .optional(),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: postSchema,
});

const authors = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/authors' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    links: z.array(z.object({ label: z.string(), url: z.string() })).optional(),
  }),
});

export const collections = { posts, authors };