// content.config.ts: what a post's frontmatter may contain.
// If a post breaks these rules, `npm run build` stops and tells you which.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    topic: z.enum(['ai', 'data', 'web', 'sweden']),
    description: z.string(),
    lang: z.enum(['en', 'sv']).default('en'),
    draft: z.boolean().default(false),
    mediumUrl: z.string().url().optional(),
    // Add a product block to turn a post into something people can buy.
    // No url = "get in touch" instead of a buy button.
    product: z
      .object({
        name: z.string(),
        price: z.string(),
        url: z.string().url().optional(),
      })
      .optional(),
  }),
});

export const collections = { posts };
