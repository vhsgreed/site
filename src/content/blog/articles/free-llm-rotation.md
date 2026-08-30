---
title: "I Run an AI Research Agent on $0/month — Free LLM Rotation, the Honest Version"
date: 2026-08-28
description: "OpenRouter free tier with rotation: a daily research pipeline that costs exactly zero. The rate-limit mechanics, the scripts, the caveats."
mediumUrl: "https://vhsgreed.medium.com/"
author: "vhsgreed"
tags: ["llm", "openrouter", "agents", "free-tier"]
---
Every "how I use AI" post starts with a budget panic. Ours doesn't, because the agent that does the bulk of our autonomous research runs on OpenRouter's free tier, at exactly $0/month.

Not "free for now." Not "freemium until you scale." A daily research pipeline, spawning parallel AI subagents, running on free models for months.

## The problem: one model is a bottleneck

OpenRouter gives a genuine lineup of free models: Nvidia's Nemotron 3 Ultra and Super, Google's Gemma, Z-AI's GLM, Thinking Machines' Inkling, plus a routed "free" pool. The catch: each model has its own rate-limit bucket, and a burst to one model exhausts it fast.

## The trick: rotate

Three small scripts do it, all MIT and zero-dependency:

- `or-model-rotate.sh` — round-robins subagent spawns across the free models.
- `or-model-probe.sh` — health-pings each model directly, so a 404 or dead endpoint gets skipped before we spawn on it.
- `or-credits` — tracks the per-account quota, so the daily budget never silently drifts.

## The honest caveats

- Free-tier limits are per account, not per key. Multiple keys do not multiply quota.
- Free usage is invisible in the usage API; 429s are the real meter.
- Model reliability varies by time of day (peak hours are worse), which is why the rotation includes a respawn cooldown.

The result: months of autonomous research with zero API spend, and the same scripts are public so anyone can run the same pipeline.