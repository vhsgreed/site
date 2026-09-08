---
title: "What Is an Agent Orchestrator? A Plain-Language Guide"
date: 2026-09-08
kind: "guide"
description: "Agent orchestrators explained: how a coordinator agent plans, spawns subagents, routes models, and enforces verification gates. Includes our own production patterns."
author: "karl-sund"
lang: en
tags: [ai, agents]
---

An agent orchestrator is the coordinator layer that turns one big task into work that several AI agents can actually do: it plans, spawns subagents, routes each call to the right model, tracks state, and gates the results. Think general contractor, not a smarter worker.

## The five jobs of an orchestrator

- **Decomposition:** break an objective into tasks small enough that a single model call, or a short agent loop, can finish them reliably.
- **Spawning:** create subagent sessions with scoped context. A subagent should get its job, its constraints, and nothing else; leaking the whole transcript into every child is how context windows and budgets die.
- **Model routing:** send each call to the cheapest model that can do it. Draft work goes to free or cheap models, code generation and judging go to stronger ones.
- **State and waits:** track what finished, what stalled, and what is blocked on an external reply. Long-running work needs durable state, not a chat scrollback.
- **Verification:** a gate between "the subagent says it is done" and "the work is accepted." Compile checks, unit tests, a second model judging the output.

## Patterns we run in production

We operate an orchestrator that coordinates daily research pipelines, spawning parallel subagents across multiple LLM providers. Three lessons from running it every day:

- **Poll, do not assume delivery.** Completion events from subagents can be deferred or dropped; a robust orchestrator polls state on a timer instead of waiting for a callback that may never arrive.
- **Rotation beats capacity.** Free model tiers have per-model rate limits. Round-robin across models with health probes turns seven noisy buckets into one reliable pipeline: the subject of our [zero-cost AI agent toolkit](/blog/zero-cost-ai-agent-toolkit/).
- **The judge is a different model.** Self-grading is grade inflation. An independent judge model with its own prompt catches subagent failures the orchestrator would wave through.

## Orchestrator vs agent framework vs model

The model is the engine. An agent framework gives one agent tools and a loop. The orchestrator sits above that: it owns the plan, the budget, the routing, and the acceptance criteria. You can build one with a few hundred lines of shell and scheduling, as we did, or use a framework; what matters is the separation of concerns, not the library.

## When you do not need one

If a single prompt finishes the task, an orchestrator is overhead. The payoff starts when work is parallelizable, long-running, multi-model, or expensive enough that routing and verification save more than they cost. Start with one script that spawns two subagents and checks their output. Grow from evidence, not ambition.

## Related reading

- [What is agent alignment and why does it matter?](/blog/agent-alignment/)
- [Free LLM rotation: run an AI agent on $0](/blog/zero-cost-ai-agent-toolkit/)
- [Open-source agent tooling](/opensource/)
