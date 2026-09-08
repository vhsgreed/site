---
title: "How to Verify a Web Scraping Provider Before You Hire One"
date: 2026-09-08
kind: "guide"
description: "A verification checklist for hiring a web scraping provider: probe reports, blocked lists, deliverable definitions, and the technical questions that separate real scrapers from guessers. Based on 150 live probes."
author: "karl-sund"
lang: en
tags: [scraping, data]
---

Every scraping gig says "I can scrape anything." Before we sold scraping services, we tested that claim ourselves: 150 live probes against real e-commerce and content sites, results published with the failures included. 103 delivered clean, 37 were blocked, 10 were unreachable. Use that reality to vet whoever you hire.

## What 150 live probes found

| Target group | Sites | Deliverable | Blocked | Unreachable |
| --- | --- | --- | --- | --- |
| Sweden (e-commerce) | 46 | 40 | 6 | 0 |
| Germany (e-commerce) | 48 | 26 | 22 | 0 |
| Indie web | 56 | 37 | 9 | 10 |
| **Total** | **150** | **103 (69%)** | **37** | **10** |

From our own methodology, published in full: [Web scraping reality check: 150 sites probed](/blog/web-scraping-reality-check/).

## The verification checklist

1. **Demand a probe report before paying.** A real provider tests your actual targets before quoting: site names, per-site verdicts, block reasons. If they quote instantly for any site, they are selling hope.
2. **Demand the blocked list, not just the wins.** Roughly a third of real-world targets resist naive scraping. A provider who only shows successes is hiding the 30% where their method breaks, which is exactly where your project will stall.
3. **Pin the deliverable definition.** "Full page," "product fields," and "raw HTML" are three different jobs at three different prices. Agree on fields, formats, dedup rules, and what happens when a page layout differs.
4. **Ask how they handle the two failure modes.** Polite rate-limiting (429 responses) is workable with throttling and backoff. TLS and browser fingerprinting (Cloudflare/Akamai-style challenges) is a different, harder problem. A provider who cannot name which of the two your targets use has not probed them.
5. **Confirm the tech stack.** Ask what client they use and how they handle JavaScript rendering. Fingerprinting targets defeat default HTTP-library traffic; "just use requests/httpx" is a day-one failure on those sites.
6. **Agree on compliance boundaries.** Public pages, published methodology, respect for rate limits, and stated delivery limits up front. This protects you as much as them.

## The one-question shortcut

Ask: "Which of my target sites will you fail on, and why?" A competent provider answers with specifics, because they probed. An incompetent one answers "none." The willingness to publish failure is the single best predictor of scraping competence: it is why we publish ours, blocked list included, and why our [scraping engagements start with the probe report](/store/).

## Related reading

- [Web scraping reality check: 150 sites probed](/blog/web-scraping-reality-check/)
- [Store: datasets built with this methodology](/store/)
- [SEMICON Taiwan 2026: the exhibitor list, explained](/blog/semicon-taiwan-2026/)
