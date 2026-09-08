---
kind: guide
title: "Free LLM Rotation: Run an AI Agent on $0"
date: 2026-08-28
description: "OpenRouter free models, rotation scripts, rate-limit mechanics. A daily autonomous research pipeline at exactly $0/month, with the honest caveats."
tags: [ai, automation]
author: karl-sund
product:
  name: "Zero-Cost AI Agent Toolkit"
  price: "Pay what you want · $1 suggested"
  url: "https://vhsgreed.gumroad.com/l/rkszjw"
  status: "live"
  tag: "Free"
lang: en
---
Every "how I use AI" post starts with a budget panic. Mine does not, because the agent that does the bulk of my autonomous research runs on OpenRouter's free tier at exactly $0/month. Not "free for now", not "freemium until you scale": a daily research pipeline, spawning parallel AI subagents, running on free models for months.

This is the toolkit that makes that possible, and the mechanics behind it.

## Why one model is a bottleneck

OpenRouter gives a genuine lineup of free models. The catch is that every model has its own rate-limit bucket — 20 requests per minute, 1,000 requests per day, per model — and a burst to one model exhausts it fast. Failure mode: your agent stalls at 8 PM instead of finishing the batch.

The lineup also churns. When I checked, 16 models carried the `:free` flag: Nvidia's Nemotron family, Google's Gemma 4 (31B and 26B), Thinking Machines' Inkling, and a routed free pool. That roster will not be the same next month, so the toolkit treats the model list as configuration, not a constant.

## The trick: rotate

Three small scripts do the job, all MIT and zero-dependency:

- `or-model-rotate.sh` round-robins subagent spawns across the free models. State lives in a small file next to the script; `--peek`, `--list`, and `--batch N` cover the spawning patterns a parallel pipeline needs.
- `or-model-probe.sh` health-pings the lineup with a 1-token request and reports which models are alive right now, sorted by latency, with a `--json` mode for scripting. The harness reassigns topics to the next healthy model when one 429s.
- `or-credits` prints the actual account balance. This matters more than it sounds: the OpenRouter usage API only shows billed spend, so without it you have no meter at all.

The rotation math is the whole win. With each free model capped at 1,000 requests per day, N models in the pool give you roughly N times the single-model limit. Rotation turns seven noisy free buckets into one reliable pipeline.

## The honest caveats

- Free usage is invisible to the usage API; 429s are the real meter.
- Limits are per-account, not per-key. Creating extra accounts to dodge quotas is both against policy and pointless.
- A frozen model means a respawn with a cooldown sleep, not a retry storm.
- Reliability ranking I measured, worst to best in peak hours: the routed free pool, then the branded free models. One branded model, ox-alpha, died entirely mid-run in August 2026. That is the reality of free tier: it works, and you must build for churn.
- Free tier is for research pipelines, not for latency-sensitive production.

## FAQ

**Is it really $0?** Yes, for inference. The pipeline runs on free OpenRouter models with rotation. Paid models cost money when I deliberately buy a quality jump.

**What about rate limits?** Each free model has its own bucket. Rotation plus backoff keeps total throughput high even when single models throttle.

**Can I run this myself?** The scripts are in the toolkit below, and the full write-up is on the blog.

**What do I need besides the scripts?** An OpenRouter account and an API key. The probe and credits scripts read the key from a file (an env var or `~/.config/openrouter/key` by default), the rotation script needs nothing at all — it only selects model IDs, so you can inspect its behavior before giving it access to anything. State is one small text file you can delete to reset the rotation.

The Zero-Cost AI Agent Toolkit bundles the rotation and health-probe scripts with documentation, MIT licensed, pay what you want. It is the same toolkit that runs my nightly research pipeline.

**The full mechanics — why rotation beats a single bucket and how the caveats bite in practice — are in [I Run an AI Agent on $0/month: Free LLM Rotation](/blog/free-llm-rotation/).**