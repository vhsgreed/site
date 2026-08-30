---
title: "Web Scraping Reality Check: 150 Sites Probed"
date: 2026-08-29
description: "103 of 150 e-commerce sites scraped clean, 37 blocked, 10 unreachable. The published blocked list and what to verify before hiring a scraper."
tags: ["web scraping", "data extraction", "e-commerce", "scrapeforge"]
author: "vhsgreed"
product:
  name: "Web scraping as a service"
  price: "From $30 per 100 pages"
  status: "none"
---
Every scraping gig says "I can scrape anything." That is a lie, and we can prove it with data. Before selling scraping services we ran 150 live probes against real e-commerce and content sites and published the results, blocked list included.

## What 150 live probes found

- **Sweden:** 46 sites, 40 deliverable, 6 blocked, 0 unreachable.
- **Germany:** 48 sites, 26 deliverable, 22 blocked, 0 unreachable.
- **Indie web:** 56 sites, 37 deliverable, 9 blocked, 10 unreachable.
- **Total:** 103 deliverable (69%), 37 blocked, 10 unreachable.

The full CSV with per-site verdicts is public. No cherry-picking: the blocked list is as published as the working one.

## What the 37 blocked sites have in common

Blocking is not random. The blocked set clusters on bot detection (Cloudflare and Akamai-style challenges), login walls, and aggressive rate limiting. Sites that rate-limit politely at 429 are deliverable with throttling; sites that fingerprint TLS and browser behavior are not. That distinction is the whole job, and any provider should be able to show you per-site evidence of it.

## What to verify before hiring a scraper

1. Ask for a probe report before paying: site names, delivery verdicts, block reasons.
2. Demand the blocked list, not just the wins. A provider that only shows successes is hiding the 30% that fail.
3. Check the deliverable definition: full page, product fields, or raw HTML? They are different jobs.
4. Confirm the tech: a TLS-fingerprinting target defeats naive httpx scripts on day one.

## FAQ

**Why did Germany block more?** Bot detection is regional and storefront-platform dependent. 22 of 48 German targets sit behind challenge walls. A provider that cannot say this before quoting is guessing.

**Is scraping legal?** We publish methodology and stick to public pages. Every engagement states delivery limits up front; that is part of the probe report.

**What counts as deliverable?** The page returned with usable content via a standards-compliant fetch, at a rate the target tolerates.

## Get a scrape that keeps its promises

We sell this as a service, not a miracle: a probe-first engagement that tells you what is scrapable before you pay. Pricing scales with pages: $30 for 100 pages, $40 for 200 pages plus script, $50 for 300 pages plus script and install. The store page lists current offerings and how to commission one.