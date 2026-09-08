---
title: "I Run an AI Agent on $0/month: Free LLM Rotation"
date: 2026-08-28
kind: guide
description: "OpenRouter free tier with rotation: a daily research pipeline that costs exactly zero. The rate-limit mechanics, the scripts, the caveats."
mediumUrl: "https://vhsgreed.medium.com/"
author: karl-sund
tags: [ai, agents]
lang: en
---
Every "how I use AI" post starts with a budget panic. Mine does not, because the agent that does the bulk of my autonomous research runs on OpenRouter's free tier, at exactly $0/month.

Not "free for now." Not "freemium until you scale." A daily research pipeline, spawning parallel AI subagents, running on free models for months.

## The problem: one model is a bottleneck

OpenRouter gives a genuine lineup of free models. The catch: each model has its own rate-limit bucket — 20 requests per minute and 1,000 requests per day, per model, per account — and a burst to one model exhausts it fast. Failure mode: your agent stalls at 8 PM instead of finishing the batch.

The lineup also churns. The day I checked, OpenRouter listed 16 models flagged `:free`: Nvidia's Nemotron family (3 Ultra 550B, 3 Super 120B, 3.5 Lightning), Google's Gemma 4 31B and 26B, Thinking Machines' Inkling and Inkling Small, plus a routed "free" pool. That list is different from the one six months ago and will be different again next month. Design for churn, not for a fixed roster.

## The trick: rotate

Three small scripts do it, all MIT and zero-dependency:

- `or-model-rotate.sh` — round-robins subagent spawns across the free models. It keeps its state in a small file next to the script (`.or-model-state` by default, overridable), and supports `--peek` (next model without advancing), `--list`, and `--batch N` (N distinct models, one per line) for handing a batch of subagents different buckets.
- `or-model-probe.sh` — health-pings each model with a 1-token request, sorted by latency, with a `--json` mode for scripting. A 404 or dead endpoint gets skipped before I spawn on it.
- `or-credits` — tracks the per-account quota balance from the OpenRouter credits endpoint, so the daily budget never silently drifts.

The rotation math is the whole win: with each free model carrying its own 1,000-requests-per-day cap, N models in the pool gives you roughly N times the single-model throughput. Seven noisy buckets become one reliable pipeline.

## What a day in the pipeline looks like

In practice the three scripts chain in one order. Before a batch spawns, `or-model-probe.sh` runs and returns the healthy lineup fastest-first; the spawn logic then hands each subagent a different bucket via `or-model-rotate.sh --batch N`, so no two parallel workers share a rate-limit window; and if a worker dies on a 429 or a dead endpoint, the harness reassigns its topic to the next healthy model after the cooldown sleep. `or-credits` runs once a day, not per request, because the balance only moves on paid spend — its job is to catch drift, not to meter free usage. None of this is clever; it is just the boring loop that makes a fragile free tier dependable.

## The honest caveats

- Free-tier limits are per account, not per key. Multiple keys do not multiply quota.
- Free usage is invisible in the usage API — it only reports billed spend — so 429s are the real meter, and `or-credits` watches the balance instead.
- Model reliability varies by time of day (peak hours are worse), which is why the rotation includes a respawn cooldown. A frozen model means a respawn with a cooldown sleep, not a retry storm.
- Reliability ranking I measured, worst to best in peak hours: the routed free pool, then the branded free models. One branded model, ox-alpha, died entirely mid-run in August 2026. The pipeline survived because rotation assumed it would.
- Free tier is for research pipelines, not for latency-sensitive production.

The result: months of autonomous research with zero API spend, and the same scripts are public so anyone can run the same pipeline.

**Want the scripts?** The [Zero-Cost AI Agent Toolkit](/blog/zero-cost-ai-agent-toolkit/) bundles the rotation and health-probe scripts, MIT, pay what you want.