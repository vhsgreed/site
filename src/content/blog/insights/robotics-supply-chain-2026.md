---
title: "Robotics Stocks 2026: The Verified Supply-Chain Ticker List"
date: 2026-08-30
description: "1,093 live-verified robotics companies across 11 countries, 13,000+ assets, 60 exposure routes. The investable map of the robotics supply chain, with honest flags."
tags: ["robotics stocks", "supply chain", "ticker list", "investing"]
author: "vhsgreed"
product:
  name: "Robotics Supply-Chain Intelligence 2026"
  price: "$10 suggested · $5 minimum"
  status: "pending"
---
The robotics supply chain is the clearest concentration play in markets right now: actuators are 40-55% of robot BOM, China is 63-70% of the chain, Japan owns precision reducers, and the US owns the AI layer. Two weeks after the Unitree IPO opened +629% (pre-IPO perps priced it 75% low), the question is where the money flows next.

This page collects what we know: the verified ticker list, the exposure routes, and how to read the map without falling for vanity screenshots.

## What the verified list contains

The full dataset ships with **1,093 companies across 11 countries, 92% live-verified** against Yahoo Finance on 2026-08-30. Every row carries country, index or segment, company, ticker, exchange, and verification status.

- **Sweden 377** (Nasdaq Stockholm Large Cap 138 / Mid Cap 133 / Small Cap 106, sourced from nasdaq.com)
- **Japan 223** (Nikkei 225)
- **UK 100** (FTSE 100)
- **Russia 46** (MOEX)
- **Israel 161** (TA-35 + TA-125)
- **France 40** (CAC 40), **Germany 40** (DAX 40), **Spain 35** (IBEX 35)
- **Norway 26** (OBX), **Finland 25** (OMX Helsinki 25), **Switzerland 20** (SMI 20)

On top of the nations layer: **10,391 US tickers** from SEC EDGAR (463 robotics-relevant names flagged, honestly labelled as heuristic), **1,000 top cryptos** with AI-adjacent flags, and **232 Hyperliquid perps** for the derivatives angle.

Unverifiable rows stay in the file flagged UNVERIFIED. Nothing is silently dropped, because a dataset that hides its failures is marketing, not data.

## The exposure map: three levels

We structure exposure as 60 routes across three levels:

- **Direct:** own the company. TSLA, Harmonic Drive (6324), UBTech (9880), the actuator and reducer makers.
- **Adjacent:** crypto or perp exposure, plus supplier companies that feed the chain.
- **Indirect:** funds and ETFs (LIT, REMX, BATT), plus the resource-gamble products that bet on the same inputs.

Verification caught real bugs that would have embarrassed a scrape dump: LAZR no longer means Luminar (reassigned to an ETF), Schaeffler is SHA0.DE not SHA, and LG Energy Solution is 373220.KS, not 051910 (that is LG Chem). KUKA is flagged private (Midea-owned) rather than guessed.

## How to use it

1. Open the nations file and filter your home market.
2. Cross the core 64 verified companies against the exposure routes.
3. Check the prediction-market landscape for where price discovery happens (robotics prediction markets are thin; perps are where the action is).

## FAQ

**Is every ticker confirmed?** Identity is confirmed for all rows at harvest via authoritative registries (SEC, CoinGecko, Hyperliquid). Business-relevance verification is applied to curated tiers; the 463 US name-flags are an explicit heuristic filter, not a verdict.

**Can I trade these from my market?** The nation-sorted layer answers exactly that question: each row shows the exchange and listing format for its home market.

**Why did Unitree matter?** It is the reference event for robotics pricing: the pre-IPO perp market priced it 75% below its open. Perp markets move before listings.

**Who verified the data?** Live Yahoo Finance lookup on 2026-08-30, with fixes applied and flagged. The verification method is documented in the dataset README.

## Get the dataset

The full Robotics Supply-Chain Intelligence 2026 dataset ships as a single zip: nations layer, US universe, cryptos, perps, exposure map, prediction markets, and an exposure guide. Publishing on Gumroad is in progress; the store page will carry the live link.