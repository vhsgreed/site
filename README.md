# vhsgreed.win: Karl Sundström's site

A small, static website. Every page is built from a few templates and a
folder of markdown posts. There is nothing else.

## Everyday tasks

**Write a new post.** Create a file in `src/content/posts/`, for example
`my-new-post.md`. It will appear at `vhsgreed.win/blog/my-new-post/`.
Start it like this:

```md
---
title: My new post
date: 2026-10-01
topic: ai            # one of: ai, data, web, sweden
description: One or two sentences. Shown in lists and in Google results.
---

The text of the post, in markdown.
```

Optional lines you can add between the `---` lines:

- `lang: sv` for a post written in Swedish
- `draft: true` to keep it off the site while you work on it
- a product block, which adds a buy box and lists the post on /products/:

```md
product:
  name: Robotics Supply-Chain Intelligence 2026
  price: "$7"
  url: https://vhsgreed.gumroad.com/l/...   # leave out for "email me" instead
```

**Add an image.** Put it in `public/img/` and write
`![What the image shows](/img/my-image.png)` in the post.

**Change your email, tagline or links.** Edit `src/site.ts`.

**Change colours or fonts.** Edit the top of `src/styles.css`.

**Publish.** Commit and push to `main`. Cloudflare rebuilds the site in
about a minute. Pushing to any other branch gives a private preview link
in the Cloudflare dashboard instead.

## What each file does

| File | What it is |
| --- | --- |
| `src/content/posts/*.md` | Your writing. One file per post. |
| `src/site.ts` | Your name, email, tagline, links and the four topics. |
| `src/styles.css` | The whole look of the site. |
| `src/layouts/Page.astro` | The frame of every page: header, footer, page title. |
| `src/pages/index.astro` | Home: intro plus every post. |
| `src/pages/blog/[slug].astro` | The template for a single post. |
| `src/pages/topics/[topic].astro` | The list for one topic, like /topics/ai/. |
| `src/pages/products.astro` | Every post that has a product block. |
| `src/pages/about.astro`, `privacy.astro`, `404.astro` | Those three pages, written directly. |
| `src/components/*.astro` | Small reusable pieces: the post list, topic filter, buy box. |
| `src/content.config.ts` | The rules for a post's top section. The build stops if a post breaks them. |
| `src/posts.ts` | Fetches posts newest-first and hides drafts. |
| `src/telemetry.js` | Your cookieless visitor counter (reports to your Cloudflare Worker). |
| `public/_redirects` | Old addresses and where they now go. |
| `public/_headers` | Security settings Cloudflare sends with every page. |
| `public/` (rest) | Files served as they are: images, favicon, robots.txt, llms.txt. |

## Try it on your own computer

```
npm install
npm run dev
```

Then open http://localhost:4321. Changes show up as you save.
`npm run build` does a full build and tells you if anything is broken.

## Redirect rules (important)

Cloudflare applies `_redirects` before it looks for a page. So a redirect
must never start from an address that is a real page, and must never
point to another redirect. If you rename a post, add one line:
`/blog/old-name/   /blog/new-name/   301`.
