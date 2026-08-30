---
title: "How We Built the Verified Robotics Supply-Chain Dataset"
date: 2026-08-30
description: "The story behind the 1,093-company verified layer: harvest method, live Yahoo verification, the ticker bugs we caught (LAZR, SHA0.DE, 373220.KS), and the honest flags."
tags: ["robotics", "data", "supply-chain", "verification"]
author: "vhsgreed"
---
Two weeks after the Unitree IPO (+629% open, pre-IPO perps priced it 75% low), the robotics supply chain is the clearest concentration play in markets: actuators are 40-55% of BOM, China is 63-70% of the chain, Japan owns precision reducers, and the US owns the AI layer.

The dataset maps it. v3 adds the layer that matters most to a buyer: **verification**.

## 1,093 companies, 92% live-verified

We harvested index constituents from maintained Wikipedia pages (they carry official tickers inline) across 11 countries, then verified every ticker live against Yahoo Finance:

- Sweden 377 (Nasdaq Stockholm Large/Mid/Small Cap, sourced from nasdaq.com)
- Japan 223 (Nikkei 225), UK 100 (FTSE 100), Russia 46 (MOEX), France 40 (CAC 40), Germany 40 (DAX 40), Spain 35 (IBEX 35), Norway 26 (OBX), Finland 25 (OMXH25), Switzerland 20 (SMI 20), Israel 161 (TA-35 + TA-125)

Every row that could not be verified stays in the file **flagged UNVERIFIED**. Nothing is silently dropped, because a dataset that hides its failures is not data, it is marketing.

## What verification caught

Two real bugs surfaced during the pass: a Finnish ticker resolved to a Frankfurt quote by wrong exchange, and a Russian blue chip matched to an index ticker. Both were reverted to honest UNVERIFIED rather than shipped wrong. One find looked wrong but was right: Norway's Aker BP is AKRBP.OL on Yahoo, not the intuitive AKERBP.OL.

That is the whole point of the layer. The file says how it was made, which rows are certain, and which are not.