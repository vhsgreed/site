# Store — vhsgreed.win (SECURED 2026-08-30, Karl, $5/yr)

Domain: **vhsgreed.win** — registered by Karl, 2026-08-30, ~$5/yr.

## Site source

**`prod/site/`** — Astro static site (replaces the old `prod/store/`
single-page scaffold, which is superseded). Build: `npm run build` →
`prod/site/dist/` (pure HTML/CSS, zero JS by default, RSS + sitemap).

Pages: Home (minimalist, pulls latest blog head), Mission, Open Source,
About (transparency + HQ + privacy summary), Blog (content collection,
seeded with Medium articles; daily posts coming), Store (Gumroad
integration), Privacy, RSS.

## Deploy: Cloudflare Pages (free static hosting)

1. Cloudflare account → Workers & Pages → Create → Pages → Upload assets
   **from `prod/site/dist/`** (after `npm run build`), OR connect the
   workspace repo branch with build command `cd prod/site && npm run
   build` and output dir `prod/site/dist`.
2. Set custom domain **vhsgreed.win**, enable HTTPS (free).
3. Enable **Cloudflare Web Analytics** (free, cookieless) → copy the site
   token → paste over `YOUR_CF_WEB_ANALYTICS_TOKEN` in
   `prod/site/src/layouts/Base.astro` → rebuild + redeploy. This is the
   ONLY config step left before tracking goes live.
4. Optional: Cloudflare Analytics for traffic is the same feature.
5. Verify: `curl -sL https://vhsgreed.win | grep -i "openly built"` and
   `curl -sL https://vhsgreed.win/sitemap-index.xml | head`.

## SEO / standards (already built in)

- Astro sitemap integration → `sitemap-index.xml`
- OpenGraph + Twitter card + canonical per page
- robots.txt + semantic h1/h2 + prose pages
- RSS feed at `/rss.xml`
- Responsive 360px → 1920px+, verified programmatically (no overflow,
  mobile menu works with JS disabled)

## Notes

- .win TLD: cheap, slightly less trusted than .com for SEO, but fine for
  a data-product storefront; brand is vhsgreed.
- Renewal ~$5/yr → total fixed cost ≈ $5 + $0 hosting. Fits money-first.
- Gumroad links in `src/pages/store.astro`: robotics product link goes
  live when Karl publishes the listing; toolkit link is a placeholder.