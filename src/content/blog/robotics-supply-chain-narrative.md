---
title: "We Built a Verified Map of the Robotics Supply Chain"
date: 2026-08-30
kind: "story"
description: "Why 'buy the robot stocks' is useless advice: the tradeability gap, the verified 1,093-company layer, the exposure routes, and the bugs verification caught."
mediumUrl: "https://vhsgreed.medium.com/we-built-a-verified-map-of-the-robotics-supply-chain-half-the-tickers-were-not-tradeable-feb47260ca7a"
tags: ["robotics", "supply chain", "verified tickers", "tradeability"]
author: "vhsgreed"
---
Two weeks ago, a Chinese robot maker nobody had heard of in the West opened its IPO at +629%. Unitree, the company behind the mass-produced humanoid that runs, climbs, and sells in the thousands, went public on August 19, 2026 at a $66B peak valuation. The pre-IPO crypto perps had priced it 75% below that open.

That gap is the whole story of this market in one number: the machinery of modern trading (derivatives, price discovery, liquidity) is now ahead of the underlying supply chain, and almost nobody has a clean map of what is actually buyable.

So we built one. This is the honest version of how, what we found, and the bugs we caught along the way.

## The problem: "just buy the robot stocks" is useless

Ask any chatbot for "robotics stocks" and you get a list: Tesla, NVIDIA, Harmonic Drive, UBTech, Fanuc. All real. All mostly true. And almost all of it is useless to a retail investor outside the US, because the list never tells you which of those you can actually hold from your own market, in your own currency, through your own broker.

Harmonic Drive trades on the Tokyo exchange as 6324. You can buy it from Sweden through a cross-border broker, but it comes with FX, settlement lag, and sometimes a premium. NASDAQ-listed names are easy if you have a US account. The dozens of small EU names, the Russians, the Israeli precision shops: each has its own access rules, and nobody tells you which is which.

That was the gap. We decided to map it: every robotics-relevant company we could find, with a verification pass that answered one question per row: "Can I actually trade this from my market?"

## What we built

A single dataset, 13 files, three layers:

**1. The verified core.** 64 companies in the chain's critical positions: OEMs (TSLA, UBTech), actuator and reducer makers (Harmonic Drive 6324, Nabtesco), sensor shops, compute muscle (NVDA), battery and integrator names. Every one source-verified, with a ticker and a trading route.

**2. The exposure map.** 60 routes across three levels:
- Direct: own the company.
- Adjacent: a crypto perp on Unitree (xyz:UNITREE), or a supplier feeding the chain (lithium, rare-earth magnets).
- Indirect: ETFs (KOID, BOTZ, IRBO, ROBO) and commodity funds (LIT, REMX, BATT).

The perp layer matters more than it looks. Unitree's pre-IPO perps on Hyperliquid turned over $59M with a $9.1M open interest. That is real price discovery happening before any listing, and it is where the "crypto is a casino" crowd is missing the point: the casino is becoming the price oracle.

**3. The tradeability layer.** 1,093 companies across 11 countries, each row live-verified against Yahoo Finance on 2026-08-30: Sweden's full Nasdaq Stockholm universe by segment (Large 138 / Mid 133 / Small 106), the UK FTSE 100, Germany DAX 40, France CAC 40, Japan Nikkei 225, Israel TA-35 + TA-125, Spain IBEX 35, Switzerland SMI 20, Norway OBX, Finland OMX Helsinki 25, Russia MOEX. Plus 10,391 US tickers from SEC EDGAR and 232 Hyperliquid perp assets.

The answer to "can I trade it" is now in a column, not in a forum thread.

## The honest part: verification caught real bugs

This is where the project stopped being a scrape and became a dataset.

- **LAZR no longer means Luminar.** The ticker was reassigned to a Tema Photonics & Optical ETF. A scrape dump would have sold you a dead symbol.
- **Schaeffler is SHA0.DE, not SHA.** The obvious ticker is not the real one.
- **LG Energy Solution is 373220.KS, not 051910.** 051910 is LG Chem. They were one company, then a spin-off, then two tickers, and most lists still mix them up.
- **KUKA is flagged private (Midea-owned), not guessed.** We do not pretend to have a ticker for a company that does not have one.

Every row that could not be verified stayed in the file with an explicit UNVERIFIED flag. Nothing was silently dropped. A dataset that hides its failures is marketing, not data. The full build log with every catch is public: [Building the Verified Robotics Dataset](/blog/articles/robotics-supply-chain-2026/).

## Where the money flows next

Three structural facts we confirmed while building:

1. **Actuators are 40-55% of robot bill of materials.** The people who move the joints capture the value.
2. **China is 63-70% of the supply chain.** The commodity and rare-earth layer is the real choke point.
3. **Japan owns precision reducers.** The Nikkei layer is not a diversifier, it is the core.

Robotics prediction markets are still thin. Polymarket volume is sports and politics, not robots. That gap is either a watch item or an opportunity, and the perp premium vs. spot is where the signal is.

## The honest bottom line

We did not build this to be a get-rich list. It is a map, and maps have honest edges: perps are leveraged and liquidation risk is real (the Unitree case study is documented in the guide), identity is confirmed at harvest but business relevance is a heuristic filter in places, and verified against live quotes on a specific date (2026-08-30), not forever.

This piece ran first on Medium; the dataset and the exposure map are the product: [Robotics Supply-Chain Intelligence 2026](/blog/insights/robotics-supply-chain-2026/).

It is the difference between a list of names and an answer to the only question that matters: can I actually buy this from where I sit?