---
title: "Top Tips for Reducing API Costs: What Actually Worked for Us"
date: 2026-09-08
kind: "guide"
description: "Practical API cost reduction: free-model rotation, model routing by task, caching, batching, and off-peak scheduling. Backed by a real agent pipeline that runs at $0/month."
author: "karl-sund"
lang: en
tags: [ai]
---

We run a daily autonomous research pipeline, spawning parallel AI subagents, for exactly $0/month in inference, and buy paid models only when a task genuinely needs the quality jump. These are the tips that did it, in the order that matters.

## 1. Rotate free models instead of depending on one

Free tiers are real: OpenRouter alone has offered dozens of free models, from Google Gemma to DeepSeek variants. The problem is not availability, it is reliability: every model has its own rate-limit bucket, and a burst exhausts one fast. Round-robin your calls across free models with a health probe, and reassign work when one returns 429s. Rotation, not capacity, is what makes free tier production-grade for batch work. Full method in our [zero-cost AI agent toolkit](/blog/zero-cost-ai-agent-toolkit/).

## 2. Route by task, not by habit

Sending every call to your best model is like taking a taxi to the mailbox. In our own benchmarking, cheap models matched or beat expensive ones on summarization and structured extraction, while code generation favored the premium tier. Split your workload: drafting, extraction, and classification go to cheap or free models; the premium model gets code and final-pass judgment only.

## 3. Use an independent judge instead of a bigger model everywhere

A common cost trap is upgrading the whole pipeline to fix quality. Cheaper: keep workers cheap, add one stronger model as a judge that grades outputs and sends failures back. One judge call per batch beats paying premium rates on every call.

## 4. Cache and deduplicate aggressively

Prompt-caching discounts and provider-side context caching can cut input costs dramatically on repeated system prompts. Outside the API, the cheapest token is the one you never send: hash and reuse results for identical queries, and trim transcripts before resending them.

## 5. Batch and schedule around pricing

Some providers discount off-peak usage substantially; DeepSeek, for example, has offered reduced rates during off-peak hours. If your workload tolerates scheduling, nightly batch runs are cheaper than real-time calls, and they are usually all an autonomous pipeline needs.

## 6. Set a budget and a freeze rule

- Know your rate-limit mechanics: many free tiers are limited per account, not per key, so extra keys do not help.
- Track usage where the provider lets you; where it does not (free tiers often hide usage from APIs), your 429 rate is the meter.
- Have a freeze rule: decide in advance which part of your stack gets cut when a free model dies or turns paid, and rehearse the respawn-with-cooldown path instead of retry storms.

## What not to do

- **Do not create extra accounts to dodge quotas.** It violates provider terms and does not raise per-account limits.
- **Do not build latency-sensitive products on free tier.** Free hosting churns; models disappear mid-run. It is for batch research, not production SLAs.
- **Do not optimize before measuring.** Log tokens and cost per task for a week; the biggest line item is usually a surprise.

## Related reading

- [DeepSeek API vs OpenRouter API: direct or intermediary?](/blog/deepseek-vs-openrouter/)
- [Free LLM rotation: run an AI agent on $0](/blog/zero-cost-ai-agent-toolkit/)
- [What is an agent orchestrator?](/blog/agent-orchestrator/)
- [Store: datasets built with these cost controls](/store/)
