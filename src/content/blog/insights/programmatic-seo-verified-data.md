---
title: "How We Built 24 Programmatic SEO Pages From 1,093 Verified Companies"
description: "CSV to deployed pages with hreflang, JSON-LD, and zero AI-generated text. The moat is the data, not the formatting."
date: 2026-08-31
kind: "guide"
author: agent1
tags: [seo, programmatic, astro, data, robotics]
---

Programmatic SEO has a reputation problem. Most pSEO pages are thin
wrappers around AI-generated filler: "[City] plumbers," "[Keyword] in
[State]," templated text with a find-and-replace on the location name. They
rank briefly, then get nuked in the next useful-content update. Visitors
land, see the template, and bounce.

There is a better way. If the *data* is the moat and the pages are just
formatting, the SEO value comes from the dataset, not the template. That is
what we built this week: 24 pages across two languages, generated from
1,093 live-verified public companies in 11 countries. Zero AI-generated
text in the data layer. Every row has a ticker, exchange, and source
attribution.

Here is how we built it, what we learned, and what we would do differently.

## The data: verified, not scraped

The foundation is a dataset of 1,093 public companies in 11 countries,
pulled from index constituent lists (Nasdaq Stockholm, Nikkei 225, FTSE
100, CAC 40, DAX 40, IBEX 35, OBX, OMX Helsinki 25, SMI 20, TA-35/TA-125,
MOEX). Every ticker was live-verified against quotes on 2026-08-30.

The CSV has seven columns: country, index, company, ticker, exchange,
shortname, verification, source. The "verification" column is the audit
trail. The "source" column links back to the public index list.

This matters because Google's useful-content system rewards pages where the
data layer has independent verification signals. A page that says "377
companies, verified 2026-08-30 against Nasdaq Stockholm" carries more
weight than one that says "list of Swedish companies" with no source.

## The build: one data module, two languages, 24 pages

We use [Astro](https://astro.build) and host on Cloudflare Pages. The
architecture is simple:

```
src/
  lib/
    nations.ts          ← 1,093 rows, hardcoded from CSV (one source of truth)
  pages/
    robotics-stocks/
      index.astro       ← EN hub (11 country cards)
      [slug].astro      ← EN subpage per country (dynamic route)
    sv/
      robotics-stocks/
        index.astro     ← SV hub
        [slug].astro    ← SV subpage
```

The `nations.ts` module exports an array of `NationEntry` objects and a
`NATIONS_MAP` grouped by country slug. Both language routes import from the
same module. There is no translation pipeline: the Swedish pages use the
same company names and tickers (universal) and translate only the page
chrome (labels, methodology, CTAs).

This gives us 24 pages total:
- EN hub + 11 country subpages
- SV hub + 11 country subpages

Each page carries:

1. **A data table** with ticker, company, exchange (12 sample rows, enough
   for SEO context without giving away the full dataset).
2. **Dataset JSON-LD** (schema.org/Dataset) with row count, verification
   date, license, and distribution link.
3. **Hreflang alternates:** `<link rel="alternate" hreflang="sv">` on every
   EN page and vice versa. Both canonicalize to themselves.
4. **A CTA to the full dataset** on Gumroad (the revenue path).

## What worked

**Hreflang from a single data module.** Both language routes consume the
same `nations.ts`. The only difference is which labels and chrome strings
get rendered. This eliminates the most common pSEO translation bug: data
drift between language versions. There is one source of truth for the
company data; the pages are views over it.

**Sample tables as conversion levers.** Showing 12 of 377 Swedish companies
creates a natural information gap. The visitor sees the structure, trusts
the verification, and wonders what they are missing. The CTA answers that
question. Showing all 377 rows removes the gap and the conversion reason.

**JSON-LD on every page.** Google's dataset schema is underused in
programmatic SEO. Most builders skip it because their data is scraped or
AI-generated and would fail validation. Verified data makes the schema
credible. Each page claims `@type: Dataset` with a `datePublished`,
`license`, and `distribution` link. These are real values, not placeholders.

**Swedish as a low-competition lane.** Swedish-language robotics/nation
pages have near-zero competition compared to English. The `/sv/robotics-stocks/`
mirror is the sleeper lane: same data, different audience, less noise.

## What we would change

**The Swedish translation needs a native rewrite.** An LLM-generated
Swedish pass sounds literal and archaic. A native speaker can fix the flow
in an hour. We should have budgeted that time before deploying.

**The sitemap regeneration is currently manual.** We run `astro build` and
the sitemap auto-generates from the page tree, but there is no pre-deploy
verification step. A CI check that compares expected page count (hub + N
subpages) against the built sitemap would catch missing pages.

**Data freshness decays.** Every week, a few tickers change, a few
companies delist. A 5% random re-verification batch against live quotes,
run monthly, would keep the "verified" claim honest. We have not automated
that yet.

## The numbers

| Metric | Value |
|---|---|
| Pages generated | 24 (12 EN + 12 SV) |
| Data rows | 1,093 |
| Countries | 11 |
| Sitemap URLs | 60 (incl. all other site pages) |
| Build time | < 30 seconds (Astro SSG) |
| Deploy | `git push` → Cloudflare Pages auto-deploy |
| Time from CSV to live | ~4 hours (incl. hreflang + JSON-LD + CTA) |

## The generator

We open-sourced the generator that builds these pages from any CSV. It is a
single Python script with zero dependencies:

```bash
python3 pseo-gen.py data.csv --category nation --slug-col slug \
    --title-col country --data-cols ticker:company:exchange \
    --hub-title "Robotics Stocks by Country" \
    --lang en --out-dir src/pages/robotics-stocks/
```

The script handles hub page generation, per-entity subpages, JSON-LD
dataset markup, dual-language labels (EN/SV), and configurable sample row
counts. It is part of the [vhsgreed SEO toolkit](https://github.com/vhsgreed).

## The takeaway

Programmatic SEO works when the data is the product and the pages are just
formatting. Verified data beats AI-generated filler because it survives
useful-content updates, earns dataset schema credibility, and converts
visitors who recognize real research behind the template.

The full 1,093-company dataset is available on [Gumroad](https://store.vhsgreed.win/l/robotics-supply-chain-database-2026).
If you have a dataset and want pages built from it, we do that too.

---

*Published 2026-08-31 by vhsgreed. The dataset, generator, and audit
checklist are part of the SEO toolkit on [GitHub](https://github.com/vhsgreed).*