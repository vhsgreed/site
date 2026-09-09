---
title: "Building the Verified Robotics Dataset"
date: 2026-08-30
kind: build-log
description: "How we built the 1,093-company verified layer: harvest, live verification, the ticker bugs caught (LAZR, SHA0.DE, 373220.KS), and the honest flags."
tags: [robotics, data]
author: karl-sund
lang: en
---
Two weeks after the Unitree IPO (+629% open, pre-IPO perps priced it 75% low), the robotics supply chain is the clearest concentration play in markets: actuators are 40-55% of BOM, China is 63-70% of the chain, Japan owns precision reducers, and the US owns the AI layer.

The dataset maps it. v4 adds the layer that matters most to a buyer: **verification**, now with registry-verified org data from official sources. 55 organizations carry registry profiles (Sweden via allabolag, Norway via Brønnøysund, Finland via PRH, US via SEC EDGAR), 20 of them at full depth: revenue, profit, employees, officers, industry codes. Nothing is estimated; where a registry does not expose a field, the cell stays empty.

## 1,093 companies, live-verified, plus a US layer

I harvested index constituents from maintained Wikipedia pages (they carry official tickers inline) across 11 countries, then verified every ticker live against Yahoo Finance:

- Sweden 377 (Nasdaq Stockholm Large/Mid/Small Cap, sourced from nasdaq.com)
- Japan 223 (Nikkei 225), UK 100 (FTSE 100), Russia 46 (MOEX), France 40 (CAC 40), Germany 40 (DAX 40), Spain 35 (IBEX 35), Norway 26 (OBX), Finland 25 (OMXH25), Switzerland 20 (SMI 20), Israel 161 (TA-35 + TA-125)

Beyond the 11-nation index layer, the full dataset adds a US layer of 10,391 tickers harvested from SEC EDGAR (463 of them robotics-flagged) and a curated Tier-A core of 64 firms — the companies that actually matter to the thesis, from Unitree to Tesla. Every row that could not be verified stays in the file **flagged UNVERIFIED**. Nothing is silently dropped, because a dataset that hides its failures is not data, it is marketing.

## What verification caught

Two real bugs surfaced during the pass: a Finnish ticker resolved to a Frankfurt quote by wrong exchange, and a Russian blue chip matched to an index ticker. Both were reverted to honest UNVERIFIED rather than shipped wrong. One find looked wrong but was right: Norway's Aker BP is AKRBP.OL on Yahoo, not the intuitive AKERBP.OL.

That is the whole point of the layer. The file says how it was made, which rows are certain, and which are not.

## The layers inside the chain

The chain is not one trade, it is four, and the dataset lets you pull them apart:

- **Motion/actuators** — 40-55% of a robot's bill of materials, which makes this the closest thing robotics has to a pick-and-shovel trade. The verified names cluster in Japan: Harmonic Drive Systems (6324.T) for strain-wave precision reducers, Nabtesco (6268.T) for cycloidal reducers, Fanuc (6954.T) as robot OEM and a direct consumer of actuator components.
- **Humanoid OEMs** — Tesla (TSLA, the Optimus program inside a car company), UBTech (9888.HK, listed Chinese OEM with mass-production shipments), Unitree (China A-share, post-IPO as of August 19, 2026). Private programs are flagged private rather than guessed at; KUKA is the documented example.
- **Compute** — NVIDIA (NVDA), the layer most humanoids run on, and the reason the US layer matters despite making no joints.
- **China concentration** — 63-70% of the chain by my build, which is both the cost advantage and the single largest risk line in the thesis.

## The trigger: Unitree's open

The dataset exists because the market repriced in one morning. Unitree went public on August 19, 2026 and opened at +629% to a $66B peak valuation, while pre-IPO crypto perps on Hyperliquid (ticker xyz:UNITREE, $59M turnover, $9.1M open interest) had priced it 75% below that open. When the defining position of a sector is that mispriced, a supply-chain map is not a nice-to-have; it is how you find what actually moved.

## Why the verification layer exists

Every robotics stock list on the internet contains stale tickers, wrong exchanges, and delisted names carried forward by copy-paste. Those errors are cheap to make and expensive to trade on. The fix is boring: harvest from maintained public index lists, check each ticker against live quotes, keep the timestamps, and flag whatever refuses to resolve. No paid data provider sits in the middle — all sources are maintenance-free public records.

**Looking for the tickers themselves?** The [Robotics Stocks 2026 guide](/blog/robotics-stocks-2026/) lists the verified companies, exposure routes, and how to get the full dataset.