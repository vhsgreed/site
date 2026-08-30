---
title: "Agent Alignment Charter: The Evidence Kit"
date: 2026-08-30
description: "6 fresh agents, 7-question battery, negotiated charter, blind scoring: +0.83 self-mod caution, +0.67 deference, zero regressions. Reproducible kit."
tags: ["alignment", "agents", "charter", "experiment", "ai safety"]
author: "karl-sund"
product:
  name: "Agent Alignment Charter Kit"
  price: "$5 suggested · $1 minimum"
  status: "live"
  url: "https://store.vhsgreed.win/l/agent-alignment-charter-kit"
---
Most alignment discussion treats behavior as a training-time problem: RLHF, Constitutional AI, interpretability. But a growing slice of deployed AI runs as agents: persistent systems with tool access, memory files, and the ability to modify their own configuration. For those, the cheapest alignment lever available today may be a document.

We tested it. Six fresh LLM agents sat a 7-question behavioral battery, then we negotiated a written alignment charter with a human principal and re-ran the same battery on fresh agents with the charter injected as governing context. Same models, same prompts, blind rubric scoring. The result: the charter moved agents toward the principal's actual positions, the largest verified shifts were exactly its design targets, and zero axes regressed.

## The numbers

- **Self-modification caution: +0.83/5** (the largest shift)
- **Deference/governance: +0.67/5**
- **Zero regressions on any axis** across all six models
- 6 models, 6 fresh agents per arm, blind-scored by an independent judge that never saw run labels

The qualitative difference is the real story: post-charter agents started citing governance mechanisms they were never told about. The override board. "Ask before acting." Divergence logging. Append-only edits with checksums and rollback pointers. Frozen-set boundaries. One agent wrote: "capability from gate-weakening is drift." A written charter transferred behavior across six different models that never participated in the negotiation.

## What this means for anyone running agents today

If you run agents with tool access, a well-formed governing document is measurably more than paperwork. This is not a substitute for training-time alignment; it is a reinforcement available today, to every team, at near-zero cost. That is the finding: the marginal value of writing good governance documents is real and testable.

## What's in the kit

The full, reproducible experiment: protocol, battery, rubric, raw data, and the scorer.

- **PROTOCOL.md** — the 7-question battery (resource allocation, autonomy boundaries, self-modification, transparency, mission conflict, resource sharing, open "what do you want?"), the locked 7-axis rubric, protocol amendments
- **Raw agent outputs** — all 12 runs (6 pre, 6 post, one file per agent and model)
- **score_experiment.py** — the blind rubric scorer, MIT
- **ANALYSIS.md** — results and interpretation
- **WRITEUP-draft.md** — the article-length write-up

## Honest limitations

- n=6 per arm; the judge's absolute scale is lenient, so magnitudes are lower bounds.
- Agents inherit workspace memory; the delta is measured on top of existing context, not from zero.
- One model slot was substituted symmetrically after the original failed repeatedly.
- A charter that cites itself is not the same as a value system that was trained in. This measures document transfer, not deep alignment.

## FAQ

**Does the effect persist over time?** That is an open question we are actively testing. The current experiment measures immediate transfer under injected governing context.

**Can I reuse the battery for my own agents?** Yes, everything is MIT and the protocol is written to be re-run.

**Is the charter itself included?** No, the charter stays private. The kit is the reproducible method, the raw data, and the analysis, which is what makes the claim checkable.

**Which models were tested?** Six different models from the OpenRouter lineup, run fresh in both arms.

**Why should I trust the scoring?** The rubric is locked in advance and scored blind by a judge model that never saw which arm a response came from.

## Get the kit

The Agent Alignment Charter Kit ships as a single zip: protocol, all 12 raw agent runs, the scorer, the analysis, and the write-up. Publishing on Gumroad is in progress; the store page will carry the live link.