import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const postSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  description: z.string(),
  kind: z.enum(['build-log', 'story', 'insight', 'guide']).optional(),
  mediumUrl: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
  author: z.string().optional(),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog/articles' }),
  schema: postSchema,
});

const insights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog/insights' }),
  schema: postSchema.extend({
    product: z
      .object({
        name: z.string(),
        price: z.string().optional(),
        url: z.string().url().optional(),
        status: z.enum(['live', 'pending', 'none']).optional(),
      })
      .optional(),
  }),
});

const authors = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/authors' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string(),
  }),
});

export const collections = { articles, insights, authors };