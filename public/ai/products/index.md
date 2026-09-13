---
title: /ai/products — machine-consumable product data
description: Data products exposed for agents. Free metadata tier; full cited dataset paid.
---

# /ai/products

Machine-consumable data from vhsgreed's build pipeline. Same pipeline as the
human products, exposed as static JSON with explicit versioning and honesty
flags.

## Nvidia Supplier Map 2026

- [supplier-edges.json](/ai/products/supplier-edges.json) — **free tier**: 29
  edges / 9 tiers, supplier names, direction, honesty flag
  (disclosed/inferred/estimate/UNVERIFIED), tickers. No evidence fields.
  Attribution "vhsgreed.win" required.
- `supplier-edges-full.json` — **paid tier ($10)**: adds verbatim evidence
  quotes, source URLs, filing dates. Payment:
  <https://buy.stripe.com/00w8wRbq4dm60p4gX5ew802> — after payment email
  karl@vhsgreed.win; manual fulfillment until first sale automates it.
- Refresh cadence: quarterly. Next scheduled: NVDA 10-Q (~late Nov 2026).
- Version: 2026-09-12.1. Deterministic build; SHA256SUMS in the full dataset.

## Extended layers (markdown, same pipeline)

- [TIER2-SUPPLIERS.md](/ai/products/TIER2-SUPPLIERS.md) — suppliers of the suppliers (one hop out). Most edges inferred/UNVERIFIED; flag discipline identical to tier-1.
- [ROADMAP-2026.md](/ai/products/ROADMAP-2026.md) — Rubin / Rubin Ultra / Feynman watch, per-claim confidence flags.
- [SOCIAL-CLAIMS.md](/ai/products/SOCIAL-CLAIMS.md) — dated rumor log, all UNVERIFIED by construction; never feeds the main dataset.
- [BREADCRUMBS.md](/ai/products/BREADCRUMBS.md) — append-only evidence trail with open resolution criteria.

## Terms

- Free tier: attribution required, no warranty.
- Full tier: single-entity use, redistribution prohibited.
- Flags are honest: UNVERIFIED means we could not verify; we do not blur it.
