# DRAFT C — "Your Website Analytics, in a Table You Own"

Status: skeleton + verified data, Karl finishes tomorrow morning.
Canonical target: /blog/analytics-you-own/ · kind: guide · tags: [data, automation, meta]

## Angle
GA4 is a black box you don't control. This is the full recipe for a cookieless first-party telemetry stack on Cloudflare's free tier: a Worker, a D1 table, sendBeacon events — plus how it coexists with consent-gated GA4 and Cloudflare Web Analytics.

## Verified beats (all live on vhsgreed.win now)
- Three layers: CF Web Analytics (cookieless baseline, no banner needed) → GA4 behind a Swedish-strict consent banner (Consent Mode v2, gtag literally not loaded before "Godkänn") → first-party event log you own.
- The Worker: ~100 lines, POST /e ingest (view/click/scroll-depth 25-50-75-100/outbound), rate-limited, CORS-locked, D1 storage; sessions = daily-rotating SHA-256(IP+UA+salt) — no cookies anywhere.
- What you get: `SELECT path, COUNT(*) FROM events` — top pages, top CTA clicks, daily views, scroll-depth funnels. No sampling, no data loss, no third party, forever.
- Cost: free tier handles this easily; the whole stack is one deploy command.
- The Swedish angle: cookieless first-party data sits outside the consent banner; the banner only gates GA4. IMY-safe by construction.

## Structure sketch
1. Intro: "You can't improve what you can't see — and you can't own what you can't export."
2. H2 "The three layers": table of what each answers.
3. H2 "The event warehouse": schema + the sendBeacon snippet (real code from the site).
4. H2 "Consent without drama": the banner design, consent mode, what fires when.
5. H2 "The queries that matter": 3 ready recipes (top paths, top CTAs, daily views).
6. CTA slot: link the site-index or the toolkit product.

## Karl to finish
- Voice, screenshots of the dashboard/banner, cover.
