---
title: "150 E-Commerce Probes: Blocked List Public"
date: 2026-08-29
kind: build-log
description: "103 of 150 sites scraped clean, 37 blocked, 10 unreachable, and the full blocked list published. What to verify before hiring a scraper."
mediumUrl: "https://vhsgreed.medium.com/"
author: karl-sund
tags: [scraping, meta]
lang: en
---
Every scraping gig says "I can scrape anything." That is a lie, and I can prove it with data.

Before selling scraping services, I ran 150 live probes against real e-commerce and content sites and published the results. The idea is simple: if I am going to charge money for scraping, the first thing I should be able to show a client is not a portfolio of wins but an honest map of what works and what does not.

## The numbers

- **Sweden**: 46 sites, 40 deliverable, 6 blocked, 0 unreachable.
- **Germany**: 48 sites, 26 deliverable, 22 blocked, 0 unreachable.
- **Indie web**: 56 sites, 37 deliverable, 9 blocked, 10 unreachable.
- **Total**: 103 deliverable (69%), 37 blocked, 10 unreachable.

The full CSV with per-site verdicts is public in the scrapeforge repo (`results-stress-test-2026-08-29.csv`), together with a pagination-advance matrix from the same set (`pagination-matrix-homepages-2026-08-29.csv`). No cherry-picking: the blocked list is as published as the working one. The per-site notes tell you why a verdict landed where it did — 66 targets came back as plain static pages fetched with nothing fancier than `httpx`, 35 needed TLS impersonation (`curl_cffi`) to return real content, and the blocked notes split between Cloudflare challenges, generic challenge walls, empty or challenged responses, and Akamai. Five sites were unreachable on plain DNS errors, and one timed out.

## What the 37 blocked sites have in common

Almost all run one of two commercial anti-bot stacks: Akamai (AliExpress-class, eBay, Amazon) or Cloudflare managed challenges (StackOverflow-class). Both serve JS-proof challenges that beat every open-source browser-stealth tool from a single IP.

One hard lesson from the test: my own IP got flagged by eBay after about ten probes in an hour. From that moment, every tool failed, even the homepage. IP reputation is the real gate, and it is why probe-first matters.

The other lesson is that reachability is not a property of a site, it is a property of a site **from your network on your day**. The README on the dataset says it directly: probe per job, never assume a verdict carries over to another network or date. A verdict from my connection in August is a data point, not a guarantee for yours.

## How the probes classify a target

The prober behind these numbers is `scrapeforge`, a config-driven scraper built around the same principle. It fetches the target once, scores the response, and picks a fetch tier automatically:

1. **Tier 1 — `httpx`**: plain HTTP for static HTML. Blogs, directories, the 66 easy sites.
2. **Tier 2 — `curl_cffi`**: TLS impersonation for JS-heavy or bot-checked pages. AliExpress verified at tier 2 during the test.
3. **Tier 3 — browser stealth (CloakBrowser/Playwright)**: Amazon-class anti-bot. Heavy, fragile, and never promised blindly — it is an escalation path with honest caveats.

There is also a pagination prober that certifies a next-link actually advances: it fetches page 2, checks that the content changed, and records verdicts like `PAGINATED_OK`, `NO_NEXT_LINK`, `BLOCKED_AT_DEPTH`, or `NO_CONTENT_CHANGE`. One practical detail it enforces: probe category pages, not homepages, because homepages usually have no next link. A scrape job that only certified its homepages has certified nothing the client needs.

The legal posture is part of the tool: public data only, robots.txt and rate limits respected, no login-gated content, no credential abuse. If a site forbids scraping, scrapeforge flags it rather than hides it.

## Why publish the failures

A blocked list is uncomfortable to publish and cheap to fake around. That is exactly the point. If a provider cannot show you per-site evidence — which sites, which verdicts, which block reasons — then "I can scrape anything" is the 31% that does not show up in the pitch. Probe first, publish both lists, and pick your fetch tier on data instead of hope.

**The client-side version of this checklist lives in [Web Scraping Reality Check: 150 Sites Probed](/blog/web-scraping-reality-check/)** — what to demand before you pay anyone, including me.