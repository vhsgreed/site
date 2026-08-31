---
title: "Free LLM Rotation: Run an AI Agent on $0"
date: 2026-08-28
description: "OpenRouter free models, rotation scripts, rate-limit mechanics. A daily autonomous research pipeline at exactly $0/month, with the honest caveats."
tags: ["free llm", "openrouter", "ai agent", "automation"]
author: "vhsgreed"
product:
  name: "Zero-Cost AI Agent Toolkit"
  price: "Pay what you want · $1 suggested"
  url: "https://vhsgreed.gumroad.com/l/rkszjw"
  status: "live"
  tag: "Free"
---
Every "how I use AI" post starts with a budget panic. Ours does not, because the agent that does the bulk of our autonomous research runs on OpenRouter's free tier at exactly $0/month. Not "free for now", not "freemium until you scale": a daily research pipeline, spawning parallel AI subagents, running on free models for months.

## Why one model is a bottleneck

OpenRouter gives a genuine lineup of free models: Nvidia Nemotron 3 Ultra and Super, Google Gemma, Z-AI GLM, Thinking Machines Inkling, plus a routed free pool. The catch is that every model has its own rate-limit bucket, and a burst to one model exhausts it fast. Failure mode: your agent stalls at 8 PM instead of finishing the batch.

## The trick: rotate

Three small scripts do the job, all MIT and zero-dependency:

- `or-model-rotate.sh` round-robins subagent spawns across the free models.
- `or-model-probe.sh` health-pings the lineup and reports which models are alive right now.
- The harness reassigns topics to the next healthy model when one 429s.

Rotation turns seven noisy free buckets into one reliable pipeline. Reliability ranking we measured, worst to best in peak hours: free pool, then the branded free models, with ox-alpha dying entirely mid-run in August 2026. That is the reality of free tier: it works, and you must build for churn.

## The honest caveats

- Free usage is invisible to the usage API; 429s are the real meter.
- Limits are per-account, not per-key. Creating extra accounts to dodge quotas is both against policy and pointless.
- A frozen model means a respawn with a cooldown sleep, not a retry storm.
- Free tier is for research pipelines, not for latency-sensitive production.

## FAQ

**Is it really $0?** Yes, for inference. The pipeline runs on free OpenRouter models with rotation. Paid models cost money when we deliberately buy a quality jump.

**What about rate limits?** Each free model has its own bucket. Rotation plus backoff keeps total throughput high even when single models throttle.

**Can I run this myself?** The scripts are in the toolkit below, and the full write-up is on the blog.

## Get the toolkit

The Zero-Cost AI Agent Toolkit bundles the rotation and health-probe scripts with documentation, MIT licensed, pay what you want. It is the same toolkit that runs our nightly research pipeline.