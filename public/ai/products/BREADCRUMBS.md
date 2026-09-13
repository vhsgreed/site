# Breadcrumbs — the dated evidence trail

**Purpose:** chronological trail of how the Supplier Map's knowledge evolved
— weak signals first, confirmations later. This is the falsifiability
backbone: every future claim should be checkable against when we first saw
it and what we believed at the time.
**Version:** 2026-09-13.1 · Append-only; do not edit past entries.

## 2026-09-12 — initial build (S2)

- **NVDA 10-Q (period 2026-07-26, filed 2026-08-26):** supply commitments
  $119B → **$279B** quarter-over-quarter; FY-end $95.2B; H20 $4.5B charge
  (Q1 FY2026); H200 $0.4B charge (H1 FY2027); 25% tariff on licensed H200
  imports; gross margin 75.0% (Blackwell Ultra mix). [disclosed — SEC filing]
- **TSMC 20-F:** largest customer 19%/22%/25% of net revenue (2025/24/23),
  second customer 17%/12%/11% — unnamed, flagged inferred. [disclosed filing,
  inferred tie]
- **SK hynix newsroom:** $500B NVIDIA partnership (2026-07-25); HBM4 mass
  shipments; Yongin/M15X capacity. [disclosed]
- **Concentration notes captured:** Micron one customer 10% FY2025;
  Broadcom 32% FY2025 (context, not NVDA); Amkor 29.8%/30.8%/27.7%;
  Marvell Customer A 16%. [disclosed filings, context-tier]
- Initial dataset: 26 edges / 9 tiers. $0 tool spend.

## 2026-09-12 — expansion pass

- **Ibiden:** ¥500B ($3.1B) capex FY2026–2028 (largest single substrate
  expansion), new Gifu factory at 25% capacity on opening; described in
  Bloomberg-syndicated reporting as "Nvidia's key supplier." [inferred —
  press identity, disclosed capex]
- **Kinsus:** NT$23.5B ($722M) ABF equipment investment over three years;
  Nikkei headline names Nvidia and TSMC. [inferred]
- **Delta Electronics:** AI server power at Nvidia GTC, March 16 2026, own
  PR; 800V DC architecture. [disclosed participation, inferred revenue tie]
- **Monolithic Power (MPWR):** power-stage winner claims + Edgewater
  allocation-risk counter-evidence. [estimate — contested, both directions
  logged]
- Dataset: 26 → 29 edges / 9 tiers (14 disclosed / 7 inferred / 7 estimate /
  1 UNVERIFIED). Commit db244b3.

## 2026-09-13 — deepening pass (this one)

- **Tier-2 layer added** (TIER2-SUPPLIERS.md): Hanmi→SK hynix HBM4 bonder
  order $28.7M (Korea Times 2026-06-08) is the first dollar-denominated
  tier-2 edge. ASML→TSMC disclosed; AMAT/Lam/KLA→foundry+memory inferred;
  TES and Ibiden's vendors UNVERIFIED.
- **Roadmap layer added** (ROADMAP-2026.md): Rubin platform disclosed
  (Nvidia newsroom, CES 2026, AWS/Google/Azure/OCI first deployments);
  Feynman 2028 on TSMC A16 — inferred via Electronics Weekly; our
  backside-power hypothesis flagged UNVERIFIED as our own.
- **Social/rumor layer added** (SOCIAL-CLAIMS.md): 8 claims logged, all
  UNVERIFIED, including one dismissal (#5 leaked memo) and one noise
  example (#6). Watch item: MPWR allocation risk (#8).
- Machine layers shipped same weekend: MCP server (vhsgreed-mcp 0.1.0) +
  /ai/products JSON free/paid tiers.

## Open breadcrumbs — to resolve next

1. MPWR allocation (SOCIAL-CLAIMS #8) — check next MPWR earnings + NVDA
   supplier notes.
2. TSMC CoPoS "overseas suppliers" — names should surface by pilot mid-2026.
3. NVDA 10-Q (~late Nov 2026) — the $279B number gets its first quarterly
   test; refresh.py watch is live.
4. Ibiden Gifu factory ramp — 25% capacity at opening (allelcoelec/Nikkei);
   watch for utilization disclosures in H2 2026.
5. China orders claim (#4) — check NVDA next 10-Q China revenue language.
