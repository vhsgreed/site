---
title: "AI Benchmarking in 2026: Why Single-Run Scores Don't Prove Anything"
date: 2026-09-08
kind: "guide"
description: "Single-run AI benchmark scores are marketing, not measurement. Variance, judge instability, benchmark contamination, and how multi-run evaluation with an independent judge fixes it."
author: "karl-sund"
lang: en
tags: [ai]
---

A model scores 8/10 on a benchmark once, and the number goes in a chart. We run our own model evaluations continuously, and we can tell you what that single number is worth: almost nothing. Variance, judge instability, and prompt sensitivity mean a one-shot score measures the sample, not the model.

## Four reasons a single run lies

- **Sampling variance.** LLMs are probabilistic. The same model, same prompt, same task, run five times, produces a distribution of outcomes, and for hard reasoning tasks the spread is wide. One run is one draw from that distribution; the tail draws get published.
- **Judge instability.** Most modern benchmarks use an LLM as the grader, and graders have their own failure modes. We have watched a judge model burn its entire token budget on internal reasoning, return an empty answer, and score zero on work that was fine. The benchmark reported a model failure that was actually a harness bug.
- **Reasoning-token traps.** Reasoning models can consume output budgets before producing any visible answer. If your harness sets max_tokens too low, strong models fail silently and weak ones look fine. Any leaderboard score without harness disclosure inherits this risk.
- **Contamination and prompt sensitivity.** Benchmark questions leak into training data, and trivial rewordings move scores. A model can know the benchmark without being able to do the job the benchmark stands for.

## What we do instead: trustless multi-run evaluation

Our own evaluation harness is built on a simple rule: no score is trusted from the same process that produced the work. Concretely:

- **Multiple runs per model per task**, reporting the distribution (mean and spread), not the best draw.
- **An independent judge model** with its own prompt and enough output budget to actually answer, because the judge that shares a failure mode with the worker grades nothing.
- **Rotating task sets** instead of a fixed question bank, so improving a score means improving at the work, not memorizing the test.
- **Published harness details:** model versions, prompts, token budgets, run counts. A number without its harness is a vibe.

This is the method behind our model-selection decisions, and it has reversed conclusions that a single run would have gotten wrong: we picked models for production roles only after multi-run, independently judged evaluation, and the winners were not always the ones with the best one-shot reputation.

## How to read any benchmark score in 2026

1. Ask how many runs it averages. One run: treat as anecdote.
2. Ask who graded, and whether the judge differs from the worker.
3. Ask for the harness: token budgets, prompts, dates. Undisclosed harness means unauditable result.
4. Ask what it costs: quality-per-dollar beats quality, always, for real workloads.

## The bottom line

Benchmarks are useful for ranking relative capability when they are run with discipline and useless as proof when they are not. Demand distributions, independent judges, and disclosure. If someone tries to sell you a model, an agent, or a pipeline on a single-run score, you have learned something about them, if not about the model.

## Related reading

- [What is agent alignment and why does it matter?](/blog/agent-alignment/)
- [Our alignment charter experiment](/blog/alignment-charter-kit/)
- [Free LLM rotation: run an AI agent on $0](/blog/zero-cost-ai-agent-toolkit/)
