# Roadmap Watch — Nvidia beyond Blackwell (2026 → 2028)

**Purpose:** forward layer of the Supplier Map — what each generation implies
for suppliers. Confidence is flagged per row; roadmap items from Nvidia's own
GTC/CES keynotes are `disclosed`, per-product supplier allocations are almost
always `inferred` or `UNVERIFIED`.
**Version:** 2026-09-13.1

## Rubin / Vera Rubin — 2H 2026

| Claim | Flag | Evidence |
|---|---|---|
| Rubin platform launched at CES; six new silicon items; production 2H 2026 | **disclosed** | Nvidia newsroom (nvidianews.nvidia.com/news/rubin-platform-ai-supercomputer) |
| First cloud deployments: AWS, Google Cloud, Microsoft Azure, OCI | **disclosed** | Nvidia newsroom (same PR) |
| Manufactured on TSMC 3nm-class (3NP/3PN), NVL144 rack scale | **inferred** | Wikipedia "Rubin (microarchitecture)" (secondary), CRN hardware roundup |
| HBM4 memory from SK hynix (primary), Micron/Samsung (allocation split unknown) | **inferred** | Continuity from Blackwell Ultra HBM4 reporting; no disclosed split |

## Rubin Ultra — 2027

| Claim | Flag | Evidence |
|---|---|---|
| NVL576 rack scale, HBM4e | **inferred** | vrlatech roadmap roundup aggregating GTC statements; keynote-derived |
| Supplier continuity from Rubin (TSMC + HBM trio) | **UNVERIFIED** | No disclosed allocations |

## Feynman — 2028

| Claim | Flag | Evidence |
|---|---|---|
| Feynman officially on Nvidia's roadmap for 2028, paired with "Rosa" CPU generation | **disclosed** (roadmap slide) | GTC keynote per vrlatech/tweaktown/wccftech roundups |
| Books TSMC A16 (1.6nm, backside power) for H2 2028 mass production; Nvidia first customer | **inferred** | Electronics Weekly ("Nvidia books TSMC 1.6nm process for Feynman in H2 2028"); naddod.com analysis; TSMC's own A16 mass-production target 2H 2026 |
| Accelerated debut (pulled forward) | **inferred** | finance.biggo.com report |
| New components: LP40 memory, BlueField-5, NVLink-8 | **inferred** | tweaktown roadmap update |
| Supplier implication: A16 backside-power delivery shifts power-delivery content toward TSMC's integrated flow — watch power-tier suppliers (Delta, MPWR) for allocation changes | **UNVERIFIED** (our hypothesis, explicitly) | vhsgreed analysis — no source; falsifiable at Rubin Ultra teardown |

## Reading the roadmap for suppliers

- **Disclosed roadmap ≠ disclosed suppliers.** Nvidia names products and
  dates; the supplier tie always comes from the supplier side or teardown.
- **The A16 generation is the watch item:** backside power delivery and
  co-packaged optics (CoPoS pilot mid-2026, mass production end-2028) are the
  two points where the tier-1/tier-2 supplier mix is most likely to shift.
- Each row here should be re-flagged when the corresponding disclosure lands.
