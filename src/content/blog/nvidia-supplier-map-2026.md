---
title: "Reconstructing Nvidia's Supplier Network From Public Disclosures"
date: 2026-09-13
kind: insight
description: "Nvidia discloses $279B in supply commitments and no supplier split. We reconstructed 29 supplier edges across 9 tiers from public filings, with an evidence-grade flag on every row."
mediumUrl: "https://vhsgreed.medium.com/"
author: karl-sund
tags: [nvidia, supply-chain, semiconductors, data]
lang: en
---

## Abstract (TL;DR)

Nvidia's quarterly filing discloses **$279 billion in supply commitments** — and no supplier split. We reconstruct the supplier network from the other side of the table: supplier-side disclosures, concentration statements, and company newsrooms. The result is a map of **29 supplier relationships across 9 tiers** (HBM memory, advanced packaging, foundry, substrate, assembly, power), where every edge carries a verbatim quote, a dated source URL, and one of four evidence flags: *disclosed*, *inferred*, *estimate*, or *UNVERIFIED*. Fourteen edges are company-stated; one is honestly unverified. The dataset rebuilds byte-identically and refreshes quarterly from each new filing. The full dataset ships as [NVIDIA Supplier Map 2026](https://vhsgreed.gumroad.com/l/nvidia-suppliers-list-2026).

## 1. Background

### 1.1 The disclosure gap

Nvidia's 10-Q for the period ending 2026-07-26 (filed 2026-08-26) states purchase commitments of **$279B, up from $119B the prior quarter** — an extraordinary quarter-over-quarter jump that implies massive capacity reservation across memory, foundry, and packaging partners. The filing names none of the counterparties.

The buyers of that information fall into a gap. Institutional research (SemiAnalysis at $70/month, TrendForce, TechInsights) serves firms, not individuals. DigiTimes is paywalled. Meanwhile, when a supply-chain analyst asked on Reddit's r/supplychain where to find a company's supply-chain data, the top-voted reply was: *"you won't find this dataset outside of an organisation."*

That reply was accurate. This paper describes an attempt to falsify it — at least for one company, one year.

### 1.2 Why supplier-side reconstruction works

Nvidia won't name its suppliers in filings; its suppliers' own disclosure obligations name Nvidia for it. Three mechanisms:

1. **Customer-concentration disclosures.** SEC/governance rules force suppliers to disclose when a customer exceeds ~10% of revenue. TSMC's 20-F reports "Customer A" at 19% of 2025 net revenue (up from 12%), a company whose purchasing scale and timing is consistent with exactly one firm.
2. **Newsroom announcements.** SK hynix publicly announced a **$500B partnership with Nvidia** (2026-07-25) — the single loudest disclosed edge in the dataset.
3. **Capex with stated purpose.** Ibiden's ¥500B substrate expansion and Kinsus's NT$23.5B equipment investment are disclosed without naming buyers, but the reporting context (Nikkei, Bloomberg syndication) does the tying for us — at the cost of a weaker flag.

## 2. Method

### 2.1 Data collection

Sources were constrained to **keyless, non-paywalled documents**: SEC EDGAR (10-Q/10-K/20-F for NVDA, TSMC, MU, AVGO, MRVL, AMKR, ASE), DART and company newsrooms for SK hynix, and PR pages. Paywalled sources (DigiTimes, TrendForce reports) were excluded entirely; their public summaries were used only where the summary itself is free. Tool spend: under $0.05 (search API calls).

### 2.2 Edge construction

An **edge** is a tuple (supplier, tier, direction) plus evidence. Tiers follow the physical chain: HBM memory → advanced packaging (CoWoS) → ABF substrate → foundry → assembly & test → power delivery, etc. Each edge must carry either a verbatim quote from a named document or an explicit statement of why the tie is inferred.

### 2.3 The evidence flag

Every edge receives exactly one flag:

| Flag | Meaning | Count |
|---|---|---|
| `disclosed` | A company stated the relationship in a primary document | 14 |
| `inferred` | Strongly implied by public disclosure (e.g. Customer A arithmetic) | 7 |
| `estimate` | Reasoned from public data with stated assumptions | 7 |
| `UNVERIFIED` | Credible claim, no primary source captured — kept and labeled | 1 |

The flag exists because the failure mode of every "supplier list" on the internet is silent blending of confirmed facts with SEO slop. Our design decision: an unverified edge stays in the dataset, visibly marked, rather than being quietly dropped or quietly promoted.

### 2.4 Reproducibility

The build is a deterministic script: same inputs, byte-identical outputs, verified twice, with SHA256SUMS in the package. A refresh hook re-runs the extraction each quarter against the newest filings; the late-November 10-Q is the first scheduled test of the pipeline's currency.

## 3. Results

The 29-edge map resolves to 9 tiers. Highlights by evidence grade:

- **Disclosed:** SK hynix's $500B Nvidia partnership; HBM4 mass shipments; Nvidia's $279B aggregate commitment (the number that motivates the whole map); concentration bands at Micron (one customer 10% of FY2025), Broadcom (32%), Amkor (29.8%), Marvell (Customer A, 16%).
- **Inferred:** TSMC "Customer A" at 19% (the arithmetic points at Nvidia; the filing never says the name); Ibiden and Kinsus AI-driven capex; Delta Electronics' 800V DC power participation at GTC.
- **Estimate:** Monolithic Power's power-stage content — where our estimate collides with a named research shop's contrary claim (Edgewater Research's allocation-risk call), which we log rather than resolve.
- **UNVERIFIED (1):** the ABF substrate edge where credible secondary reporting exists but no primary document was captured before ship.

Quarter-over-quarter, the most consequential number in the dataset is not any single edge but the **aggregate commitment curve**: $95.2B (FY-end) → $279B (July 10-Q). Supplier edges are the labeled decomposition of that curve's trajectory.

## 4. Limitations

1. **Aggregate ≠ split.** Nvidia discloses the total; the per-supplier decomposition is our reconstruction, and its confidence is exactly as good as the flags say.
2. **Unnamed customers.** "Customer A" disclosures are arithmetic inferences, not statements. Strong arithmetic, still inference.
3. **One-hop bias.** Tier-2 suppliers (suppliers of the suppliers — ASML, Hanmi Semiconductor's $28.7M HBM4 bonder order, the equipment vendors) sit one disclosure further from Nvidia, so most tier-2 edges are inferred or unverified. The tier-2 layer is documented but not yet part of the 29-edge core.
4. **English-source bias.** Japanese and Taiwanese IR documents (Ibiden, Shinko, Unimicron) were not pulled in full this cycle; those edges are correspondingly weaker.

## 5. Discussion

Two findings surprised us. First, **the flag distribution is itself information**: 48% of the map is company-stated, which is a higher disclosed share than we expected when we started — the disclosure-gap problem is real but narrower than the Reddit reply implies. Second, **the map degrades honestly**. Where evidence thins (power delivery, substrate), the flags drop from disclosed to estimate to unverified in a way that matches the underlying document availability, which is what a falsifiable dataset should do.

The quarterly refresh matters more than it sounds. A static supplier list is stale on arrival; a dataset that re-anchors on every 10-Q is an instrument. The $279B figure gets its first quarterly test in late November 2026, and each refresh will re-grade edges whose evidence changed.

## 6. The dataset

The full 29-edge dataset — CSV with verbatim quotes and source URLs, JSON edition, one-pager, data dictionary, build report, and the quarterly refresh script — ships as **[NVIDIA Supplier Map 2026, $5](https://vhsgreed.gumroad.com/l/nvidia-suppliers-list-2026)**. If it saves you one hour of EDGAR spelunking, it has paid for itself. Refund window of 14 days applies, no questions asked.

*A machine-readable edition of this data is exposed at [vhsgreed.win/ai/products/](https://vhsgreed.win/ai/products/) and via MCP for agent consumption.*

---

*Karl Sundström runs [vhsgreed](https://vhsgreed.win), a one-person data research shop in Stockholm. Everything claimed here is sourced; where it couldn't be, the dataset says so.*
