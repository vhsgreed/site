---
title: "We Probed 150 E-Commerce Sites So We Could Promise Honestly"
date: 2026-08-29
description: "The boring, reproducible way to know what a scraper can actually deliver. 150 live probes, published blocked list included."
mediumUrl: "https://vhsgreed.medium.com/"
author: "vhsgreed"
tags: ["scraping", "scrapeforge", "honesty", "data"]
---
Every scraping gig says "I can scrape anything." That is a lie, and we can prove it with data.

Before selling scraping services, we ran 150 live probes against real e-commerce and content sites and published the results:

- **Sweden**: 46 sites, 40 deliverable, 6 blocked, 0 unreachable.
- **Germany**: 48 sites, 26 deliverable, 22 blocked, 0 unreachable.
- **Indie web**: 56 sites, 37 deliverable, 9 blocked, 10 unreachable.
- **Total**: 103 deliverable (69%), 37 blocked, 10 unreachable.

The full CSV with per-site verdicts is public. No cherry-picking: the blocked list is as published as the working one.

## What the 37 blocked sites have in common

Almost all run one of two commercial anti-bot stacks: Akamai (AliExpress-class, eBay, Amazon) or Cloudflare managed challenges (StackOverflow-class). Both serve JS-proof challenges that beat every open-source browser-stealth tool from a single IP.

One hard lesson from the test: our own IP got flagged by eBay after about ten probes in an hour. From that moment, every tool failed, even the homepage. IP reputation is the real gate, and it is why probe-first matters.

This is why scrapeforge probes the target first, picks a fetch tier automatically, and says "no" honestly when a site is out of reach.