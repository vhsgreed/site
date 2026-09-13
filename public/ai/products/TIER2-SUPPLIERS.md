# Tier-2 Suppliers — Suppliers of the Suppliers

**Layer:** tier-2 (one hop removed from Nvidia's direct suppliers).
**Flag discipline:** every edge carries the same honesty flags as tier-1.
Most tier-2 edges are `inferred` or `UNVERIFIED` — tier-2 suppliers rarely
name their customers' customers. We do not pretend otherwise.
**Version:** 2026-09-13.1 · **Spend:** ~$0.04 Tavily

## Memory / HBM chain

| Tier-2 supplier | Supplies | Tier-1 recipient | Flag | Evidence |
|---|---|---|---|---|
| Hanmi Semiconductor | HBM4 TC bonders (equipment) | SK hynix | **disclosed** | SK hynix ordered $28.7M (₩44.2B) of HBM4 production equipment from Hanmi, June 2026 — Korea Times 2026-06-08; first HBM4 TC bonder order — thelec.net; Chosun Biz 2026-01-14 |
| TES | HBM test/burn-in equipment | SK hynix | **UNVERIFIED** | Widely reported in Korean press as SK hynix's equipment partner; no primary source captured in this build |
| Toshiba / Ferrotec / others (wafer, jig) | HBM wafer & materials | SK hynix | **UNVERIFIED** | No primary source captured |

## Foundry chain (TSMC side)

| Tier-2 supplier | Supplies | Tier-1 recipient | Flag | Evidence |
|---|---|---|---|---|
| ASML | EUV / High-NA lithography | TSMC | **disclosed** (ASML's largest customer is publicly known to be TSMC; specific tool allocations per node not disclosed) | ASML filings name TSMC as major customer; High-NA rollout to leading foundry widely reported |
| Applied Materials | Etch/deposition/advanced packaging equipment | TSMC (CoWoS); Broadcom partnership on EPIC advanced packaging 2026-05-20 | **inferred** for TSMC link | Futurum Group 2026-05-20 (AMAT–Broadcom EPIC); TSMC tool orders not per-supplier disclosed |
| Lam Research | Etch/deposition (memory + foundry) | TSMC, SK hynix, Micron | **inferred** | Zacks 2026-05: AI-driven WFE demand across NAND/DRAM/foundry; no per-customer split |
| KLA | Process control/metrology | TSMC, memory makers | **inferred** | Same WFE-demand reporting; no per-customer split |
| Photographed note: TSMC CoPoS (co-packaged optics) equipment suppliers "overseas" | CoPoS pilot mid-2026, mass production end-2028 | TSMC | **UNVERIFIED** | Jukan on X, 2026 (x.com/jukan05/status/2003253864880082981) — supplier names not given |

## Substrate chain (Ibiden side)

| Tier-2 supplier | Supplies | Tier-1 recipient | Flag | Evidence |
|---|---|---|---|---|
| Ibiden's equipment/materials vendors (boilers, CNC, prepreg suppliers) | Substrate production inputs | Ibiden | **UNVERIFIED** | Ibiden's ¥500B capex (Feb 3, 2026 announcement, ic-pcb.com; Nikkei) implies large upstream orders; vendor split not public |

## Why tier-2 matters (and why it's mostly flags)

Nvidia's $279B in purchase commitments flows to tier-1 suppliers, but the
*capacity* those suppliers are building flows to tier-2 equipment and
materials vendors. Hanmi's HBM4 bonder order from SK hynix is the cleanest
example: a dated, disclosed, dollar-denominated tier-2 edge one hop from
Nvidia's memory supply. Most of the rest is structural inference — real
relationships, disclosed at the tier-2 level, but never tied to Nvidia by
name. That tie is the analysts' job; our job is to show which links carry
evidence and which don't.
