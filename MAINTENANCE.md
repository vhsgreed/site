# vhsgreed.win — Site Maintenance

Owner: Karl. Build: GitHub `vhsgreed/site` → Cloudflare Pages (auto-deploy on push).
Repo checkout: `/home/karl/openclaw/prod/site` (OpenClaw agent runs inside `/home/karl/.openclaw/workspace`, this repo lives outside it on purpose).

## The 30-second mental model

- **One design system**: `src/styles/` tokens + `src/layouts/Base.astro` (head, GA4, nav shell).
- **One nav config**: `src/config/site.config.js` — lanes (Blog · Data · API · Store), utility links, GA id, site title. Adding a page NEVER touches navigation.
- **One content stream**: everything written lives in `src/content/blog/*.md` with frontmatter. `kind` (guide/build-log/story/insight) is a field, shown as chips — never separate sections.
- **Data pages are generated**: JSON in `src/data/` + generators (`actor-pages-gen.py` etc. in `/home/karl/openclaw/repos/scripts/`) → no hand-written data pages.

## Add a blog post

1. Create `src/content/blog/my-post.md`:

```md
---
title: My Post
date: 2026-09-08
description: One-sentence summary.
kind: guide          # guide | build-log | story | insight
tags: [sweden, business]   # max 3, from the locked 14: ai agents alignment automation robotics investing data scraping sweden business tax security meta writing
lang: en             # or sv
author: karl-sund    # sole author
---
Body text. Intro ≤80 words, then H2 sections, then ONE CTA slot at the end.
```

2. `git push` → live in ~1 min. The post auto-appears in `/blog/` and its tag pages.

## Swedish-post rule

Swedish? → `sweden`. About running a company? → `business`. About Skatteverket/forms? → `tax`. (Intersection pages generate automatically.)

## Add a data page

Drop JSON in `src/data/`, run the matching generator in `/home/karl/openclaw/repos/scripts/`, commit both. URL pattern: `/data/<slug>/`.

## Analytics (GA4)

- Property `G-E2E4K53319` lives in `src/layouts/Base.astro` — every page uses Base, so nothing ships untagged.
- Event tracking: any element with `data-track="name"` fires a GA4 click event. Naming: `click_nav_*`, `click_cta_*`. Keep names stable — they're your report continuity.
- Check it works: visit the site → GA4 → **Realtime** → your visit within ~30s. (Property reports lag hours; Realtime is the test.)
- CSP `_headers` allowlists googletagmanager/google-analytics — if you ever edit CSP, test GA in a Cloudflare Pages **preview** first.

## Deploy & rollback

- Deploy = `git push` to `main`. Cloudflare builds.
- Roll back = Cloudflare dashboard → deployments → instant rollback (or `git revert` + push).

## Redirects

Old → new URLs live in `public/_redirects` (301 splats, see `site-redesign/URL-MIGRATION.md`). Never create redirect chains. Adding a page needs no redirect; moving one does.

## Before/after any deploy

Before: preview deploy → check GA4 Realtime works under CSP, nav links, RSS (`/rss.xml` 200), spot-check redirect targets.
After: GA4 Realtime event from own visit → IndexNow → GSC sitemap resubmit → `curl -I` spot-check a few 301s.

## Naming notes

- `/api/*` = the Apify actor **storefront** landing pages (not API endpoints). Slugs are exact-match search phrases — don't rename them.
- Post URLs never move without a 301 line in `_redirects`.
## Telemetri (first-party stack)

Three layers, all cookieless except consent-gated GA4:

1. **First-party beacons → Worker → D1.** `src/scripts/telemetry.js` (bundled in Base.astro) sends `sendBeacon` to `https://telemetry.lillerik-sund.workers.dev/e`: `view` on load, `scroll` at 25/50/75/100, `click` for every `[data-track]`, `outbound` for external links. The Worker (`/home/karl/openclaw/prod/telemetry-worker/`) validates, rate-limits 1 req/s/IP, and inserts into D1 database **telemetry**, table `events`. **No cookies**: `sid` is a daily-rotating hash of IP+UA+day+`SALT`, computed server-side. CORS: `vhsgreed.win`, `a7.tail4fff58.ts.net:8443`, `localhost:4321`.
2. **GA4 — consent-gated.** `CookieConsent.astro` sets Consent Mode v2 default `analytics_storage: denied`; GA4 (`G-E2E4K53319`) only loads after the visitor clicks **Godkänn** in the Swedish banner. Choice in `localStorage: vhsgreed.consent`. `data-track` GA events now fire from the consent script (only when consented). Footer link **Cookie-inställningar** reopens the banner. Deploy note: this banner makes GA4 lawful without further action; keep `analytics_storage` denied by default in any future refactor.
3. **CF Web Analytics (optional, off).** `CF_ANALYTICS_TOKEN` in `src/layouts/Base.astro` is still the placeholder. To enable: Cloudflare dashboard → your zone/domain → **Web Analytics** → create site → copy the JS token → replace `YOUR_CF_WEB_ANALYTICS_TOKEN` in Base.astro. (It comes from the dashboard, not astro.config.)

### Querying D1

```bash
# top paths, 7 days
npx wrangler d1 execute telemetry --remote --command "SELECT path, COUNT(*) v FROM events WHERE ts > (unixepoch('now','-7 days')*1000) AND type='view' GROUP BY path ORDER BY v DESC LIMIT 20;"
# top click names, 7 days
npx wrangler d1 execute telemetry --remote --command "SELECT name, COUNT(*) c FROM events WHERE ts > (unixepoch('now','-7 days')*1000) AND type='click' AND name IS NOT NULL GROUP BY name ORDER BY c DESC LIMIT 20;"
# daily views, 14 days
npx wrangler d1 execute telemetry --remote --command "SELECT date(ts/1000,'unixepoch') d, COUNT(*) v FROM events WHERE ts > (unixepoch('now','-14 days')*1000) AND type='view' GROUP BY d ORDER BY d;"
```

JSON aggregates: `curl -H "X-Admin-Key: <key>" https://telemetry.lillerik-sund.workers.dev/stats?days=7` (key = Worker secret `ADMIN_KEY`).

### Rotation & admin

- **Admin key**: `cd /home/karl/openclaw/prod/telemetry-worker && CLOUDFLARE_API_TOKEN=$(cat ~/.openclaw/secrets/cf-api-token) npx wrangler secret put ADMIN_KEY` — generate with `openssl rand -hex 32`. Rotate by re-running; store locally outside this repo.
- **Session rotation**: automatic at UTC midnight; rotate `SALT` (wrangler secret) to break older correlation retroactively.
- **GDPR deletion**: `npx wrangler d1 execute telemetry --remote --command "DELETE FROM events;"` (or by `sid`).
- Deploy worker: `CLOUDFLARE_API_TOKEN=$(cat ~/.openclaw/secrets/cf-api-token) npx wrangler deploy` in the worker dir.
- Worker URL goes to `connect-src` in `public/_headers` — keep in sync if the worker is renamed.
- In-page reference: `/admin/telemetry/` (noindex). **Before it's linked anywhere, protect `/admin/*` with Cloudflare Access** — it currently has no data but is publicly reachable.
