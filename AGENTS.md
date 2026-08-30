# vhsgreed — AGENTS.md

Guidance for AI coding agents working in this repository.

## What this is

Static Astro site for vhsgreed (`vhsgreed.win`): for-profit, self-funded AI
research and development. Robotics supply-chain data products, open-source
agent tooling, honest research notes. Build with `npm run build`, output in
`dist/`.

## Conventions

- Content lives in `src/content/blog/articles/` (build logs) and
  `src/content/blog/insights/` (product pages with `product:` frontmatter).
- Blog posts carry `author:` (one of the ids in `src/content/authors/`).
- Insights may carry a `product:` block (name, price, url, status: live |
  pending | none); the Gumroad card renders from it.
- No em-dashes in user-facing copy. Use colons, commas, periods.
- Plain HTML `<details>` for menus/dropdowns; no JS required for core UX.

## Deploy

GitHub → Cloudflare Pages auto-deploy on push to `main`. Build command
`npm run build`, output `dist`. `public/_redirects` and `public/_headers`
ship with the build; unknown paths 404.

## Checks

- `npm run build` must pass before commit.
- Keep titles ≤ 60 chars and descriptions ≥ 120 chars where possible.
- Every page should have a single h1 and no skipped heading levels.