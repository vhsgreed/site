---
kind: story
title: "The Price of a Fixed Level of AI Capability Fell 750-Fold. Then It Stopped Falling."
date: 2026-09-09
description: "Matched-capability pricing across 223 AI models, 2023 to 2026: the cost of a fixed level of capability fell by a factor of 750, almost all of it in one 2023 repricing. The floor, not the frontier, is what procurement should track."
tags: [ai, pricing, data, benchmarks]
author: karl-sund
lang: en
---

Headline model prices suggest AI is getting expensive. Pro models cost $40 to $67 per million tokens, and every launch cycle brings a more expensive top tier. This measurement takes a different view of the same market: it fixes a level of capability and asks what it costs to buy, month by month. On that definition, the price of intelligence fell by a factor of roughly 750 between early 2023 and late 2026. The decline is not one story. It is a one-time collapse in 2023 followed by a plateau at the low end, and the defensible claims are narrower than the usual cost-decline narrative suggests.

![Price of 100 points of AI capability, quarterly, 2023 to 2026. The shaded band marks the 2023 launch repricing.](/img/ai-cost-one-line.png)

## Method

The dataset is the Epoch AI Capabilities Index (ECI), a composite of agentic, coding, and knowledge benchmarks covering 264 models released between March 2023 and September 2026. Pricing was added from live API rates (OpenRouter) for currently listed models and launch-time published rates for retired ones. The blended price weights input to output at 3:1, the standard mix for agent-style workloads. 223 of the 264 models carry a public API price; the remainder are open-weights releases with no first-party API and are excluded.

The key construction is the capability floor. For each capability level, the measurement tracks the cheapest blended price among all models scoring at or above that level, by month. This separates two effects that headline prices conflate: models getting better, and a given quality getting cheaper.

## Result

The quarterly cheapest price for 100 ECI points fell from $29.79 in Q1 2023 (GPT-4, the only model above 100 points) to $0.04 in Q3 2026, a factor of about 750. The shape of the decline matters more than its size. Nearly all of it happened in 2023. A log-linear fit over the full period gives 63% per year, but the same fit starting in 2024 gives almost nothing: the floor moved from $0.15 to $0.04 per 100 points between Q1 2024 and Q3 2026, a factor of four over nearly three years. The 2023 collapse reflects GPT-4-class launch pricing ($37.50 blended) meeting a market that offered comparable scores near $0.70 within two quarters. That was a one-time repricing, not a standing annual rate. Since 2024 the cheap end has been roughly flat in price while capability at that price kept rising.

The same pattern appears capability level by level. Each floor starts expensive and collapses within one to two years of being reached:

![Indexed price of fixed capability floors over time](/img/ai-cost-floors.png)

- GPT-4 was the only model scoring at or above 120 at its March 2023 launch, at $37.50 blended. By September 2024, Qwen2.5-32B cleared the same floor at $0.13; the floor now sits at $0.05.
- o1 was the only model scoring at or above 140 in 2024, at $26.25 blended. Within seven months the floor was $0.75, and by 2026 it was below $0.10.
- The top of the market has not collapsed, and the bands thin out fast. As of Q3 2026, 19 models score at or above 150 and the cheapest costs $0.09; 13 score at or above 155 with a $0.45 floor; 4 score at or above 160 with a $4.00 floor; exactly 1 reaches 165, at $20.00.

The inverse series says the same thing from the other side. The best score available at $1 per million tokens or less rose from 118 in late 2023 to 158 in Q3 2026, 40 points in 11 quarters, without a price change. At $0.10 the same series rose from 94 to 154. Cost per capability and capability per cost are the same trade seen from two ends: price per point falls while the price tier stays put.

GPT-4 Turbo launched at $15 blended in November 2023; the 130-point floor crossed below $0.05 by early 2025. But the premium tier is not dissolving on the same schedule. The gap between the 150 floor ($0.09) and the 165 floor ($20) is more than a factor of 200. New capability collapses in price about a year after launch; the frontier holds its premium.

## What does not show up in the fit

Five qualifications, stated plainly:

1. **Prices are launch-time or current, not a full history.** Mid-life price cuts (GPT-4o went from $7.50 blended to $2.50 within months) make historical figures an upper bound. The true decline is steeper than measured here.
2. **The decline rate depends on the window.** The full-period fit (63% per year) is dominated by the 2023 collapse; from 2024 onward the floor is nearly flat. An ongoing halving rate is not supported by this dataset past early 2024.
3. **The blend assumption shifts the magnitude, not the direction.** At a 1:1 input-output mix the total decline is a factor of about 540; at 1:3 output-heavy it is about 410. The headline 750 assumes a 3:1 agent-style mix.
4. **A fit across all models is weak.** The naive exponential fit has a low correlation because cheap open-weights models entered the market in volume, a composition effect rather than a price change. The matched-capability floors are the defensible series.
5. **The index is a composite.** ECI weights agentic and coding benchmarks that did not exist in 2023, so early scores rest on a narrower evaluation base. The 2023 anchor price carries the widest uncertainty.

## Implication for procurement

For anyone building automation on these APIs, the floor is the number that matters, not the frontier. Two practical consequences follow from the measured curve:

- **Do not architect around model cost.** For most business workloads the sub-$1 tier is already within ten points of the frontier, and its price has been stable since 2024. The binding constraints are data access, verification, and integration.
- **Expect collapse at the margin, not across the curve.** Each drop arrives as a single new cheap model clearing a previously frontier score, then spreads into the distribution over following quarters. The floors measured here are edge events; median pricing moves slower.

A natural next metric falls out of this construction: a Floor Power index, the best capability purchasable at or below $1 per million tokens, tracked quarterly. It behaves like a benchmark that never needs rebalancing. The price tier is fixed, the market does the rest, and on this dataset it rose 40 points in 11 quarters. If the pattern holds, it is the single number a buyer should watch.

Two claims survive the audit. First, the price of a fixed level of capability fell by a factor of 750, almost entirely in one 2023 repricing; since 2024 the cheap tier has been flat in price while its capability kept climbing. Second, new capability still collapses in price about a year after launch, from the margin inward, while the frontier holds its premium. The floor is stable, the frontier is expensive, and the distance between them is where the market actually moves.
