---
kind: insight
title: "Web Scraping Reality Check: 150 Sites Probed"
date: 2026-08-29
description: "103 of 150 e-commerce sites scraped clean, 37 blocked, 10 unreachable. The published blocked list and what to verify before hiring a scraper."
tags: [scraping, ai]
author: karl-sund
product:
  name: "Web scraping as a service"
  price: "From $30 per 100 pages"
  status: "none"
lang: en
---
Every scraping gig says "I can scrape anything." That is a lie, and I can prove it with data. Before selling scraping services I ran 150 live probes against real e-commerce and content sites and published the results, blocked list included.

## What 150 live probes found

- **Sweden:** 46 sites, 40 deliverable, 6 blocked, 0 unreachable.
- **Germany:** 48 sites, 26 deliverable, 22 blocked, 0 unreachable.
- **Indie web:** 56 sites, 37 deliverable, 9 blocked, 10 unreachable.
- **Total:** 103 deliverable (69%), 37 blocked, 10 unreachable.

The full CSV with per-site verdicts is public. No cherry-picking: the blocked list is as published as the working one. The per-site notes split roughly like this: 66 targets were plain static pages that a bare HTTP client handles, 35 more delivered only after TLS impersonation, and the blocked notes name their reason — Cloudflare challenges, generic challenge walls, empty or challenged responses, Akamai. Five sites failed on DNS alone. Reachability is IP- and time-dependent, so the CSV carries its probe date (2026-08-29) and should be treated as evidence, not a promise: a verdict from one network on one day does not carry over to another.

## What the 37 blocked sites have in common

Blocking is not random. The blocked set clusters on bot detection (Cloudflare and Akamai-style challenges), login walls, and aggressive rate limiting. Sites that rate-limit politely at 429 are deliverable with throttling; sites that fingerprint TLS and browser behavior are not. That distinction is the whole job, and any provider should be able to show you per-site evidence of it.

It also shows up at scale, fast. During the test, one high-profile auction site flagged my IP after about ten probes in an hour — after which every fetch failed, including the homepage. IP reputation, not parser quality, is the real gate on the hard targets.

## How a target gets classified

The prober behind the numbers is open source, and its logic is worth knowing because it is the logic a good provider applies to your job. Each target is fetched and scored once, then assigned a fetch tier:

1. **Tier 1, plain HTTP** — static HTML. Most of the indie web, directories, documentation.
2. **Tier 2, TLS impersonation** — JS-heavy or bot-checked pages that serve real content to a browser-fingerprinted client. AliExpress verified at this tier.
3. **Tier 3, browser stealth** — Amazon-class anti-bot. Heavy, fragile, and never promised blindly.

Pagination gets certified separately: the prober fetches page 2, confirms the content actually changed, and records verdicts like `PAGINATED_OK`, `NO_NEXT_LINK`, `BLOCKED_AT_DEPTH`, or `NO_CONTENT_CHANGE`. It runs on the exact URLs a job needs — category pages, not homepages, because homepages usually have no next link. A scrape certified on homepages has certified nothing you need.

The legal posture is fixed and boring: public pages only, robots.txt and rate limits respected, no login-gated content, no credential abuse. Every engagement states delivery limits up front; that is part of the probe report.

## What to verify before hiring a scraper

1. Ask for a probe report before paying: site names, delivery verdicts, block reasons.
2. Demand the blocked list, not just the wins. A provider that only shows successes is hiding the 30% that fail.
3. Check the deliverable definition: full page, product fields, or raw HTML? They are different jobs.
4. Confirm the tech: a TLS-fingerprinting target defeats naive HTTP scripts on day one.
5. Ask how pagination was certified, and on which URLs.

## FAQ

**Why did Germany block more?** Bot detection is regional and storefront-platform dependent. 22 of 48 German targets sit behind challenge walls. A provider that cannot say this before quoting is guessing.

**Is scraping legal?** I publish methodology and stick to public pages. Every engagement states delivery limits up front; that is part of the probe report.

**What counts as deliverable?** The page returned with usable content via a standards-compliant fetch, at a rate the target tolerates.

## Pricing

I sell this as a service, not a miracle: a probe-first engagement that tells you what is scrapable before you pay. Pricing scales with pages: $30 for 100 pages, $40 for 200 pages plus script, $50 for 300 pages plus script and install. The store page lists current offerings and how to commission one.

**The build-log version of this story, with the blocked sites named, is in [150 E-Commerce Probes: Blocked List Public](/blog/150-site-probe/).**