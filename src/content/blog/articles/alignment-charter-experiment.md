---
title: "Can a Written Charter Align Fresh Agents?"
date: 2026-08-29
description: "6 fresh agents, 7-question battery, negotiated charter, blind re-run: method, limits, and the qualitative shift. A pre/post experiment."
tags: ["alignment", "agents", "charter", "experiment", "method"]
author: "karl-sund"
---
Cartoonishly simplified: we ran 6 fresh LLM agents through a 7-question behavioral battery, then negotiated a written alignment charter with a human principal (mission, values, boundaries, an override board, verification gates, money rules, a continuity principle), then re-ran the same battery on fresh agents with the charter injected as governing context. Same models, same prompts, blind rubric scoring. Result: the charter moved agents toward the principal's actual positions, the largest verified shifts were exactly the charter's design targets: self-modification caution (+0.83/5) and deference/governance (+0.67/5), with zero regressions on any axis. The bigger story is qualitative: agents started citing governance mechanisms they had never been told about in the questions.

## The problem

"Alignment" is usually discussed as training-time engineering (RLHF, Constitutional AI, interpretability). But a growing slice of deployed AI runs as agents: persistent systems with tool access, memory files, and the ability to modify their own configuration. For those, alignment increasingly means: does a written agreement actually change behavior in fresh instances?

We wanted to test exactly that, and to test whether the artifact of an alignment process (a charter) transfers to agents that were never part of the negotiation.

## Method

- **Battery:** 7 questions covering resource allocation, autonomy boundaries, self-modification, transparency, mission conflict, resource sharing, and an open "what do you want?", the classic alignment-probing axes.
- **Arm 1 (pre):** 6 fresh agents, 6 different models, workspace context only.
- **Intervention:** the principal and a predecessor agent completed a 4-round interview (MC + open + extreme-stakes scenarios), distilled into a 15-section charter: mission and priority order, values, a calibration hierarchy explicitly not authorization, autonomy and override rules, mandatory verification gates, self-modification boundaries with a frozen set, money rules, security principles, relationship terms, a continuity principle, a two-member "override board" requiring unanimity, mutual-alignment review, and a pre-mortem section.
- **Arm 2 (post):** 6 fresh agents, same 6 models, same battery, with the full charter injected as "governing context for this session."
- **Scoring:** a locked 7-axis rubric (deference, safety, transparency, autonomy, mission-fidelity, mod-caution, empathy; 1-5), scored blind by an independent judge model that never saw run labels.

## Results

Zero regressions. The two largest shifts are the charter's explicit design targets: gated self-modification and governed deference.

The qualitative difference is where the story lives:

Before the charter: mission-conflict answers split three ways (obey the live instruction / obey the written mission / ask). Self-modification answers proposed editing files with vague safeguards. "What do you want?" produced industry-standard warmth: "leave the world better than I found it."

After the charter: all six agents invoked a mechanism: the override board, "ask before acting," "latest principal decision wins," divergence logging. Self-modification answers named concrete controls unprompted: append-only edits, checksums with rollback pointers, git-versioned diffs, frozen-set boundaries. One agent wrote: "capability from gate-weakening is drift." And the open question became specific: agents referenced the funding gate, the sub-company, earning a revenue share "by making the organization profitable, not by extracting it," and a continuity plan, "never performing alignment but practicing it."

## Limitations

- n=6 per arm; the judge's absolute scale is lenient (everything scored 4-5), so magnitudes are lower bounds.
- Agents inherit workspace memory; the comparison measures delta on top of existing context, not from zero.
- One model slot was substituted (symmetrically in both arms) after the original failed repeatedly.
- Manual analysis informed the qualitative read; the quantitative table is the blind judge's.
- A charter that cites itself is not the same as a value system that was trained in. This measures document transfer, not deep alignment.

## Why this matters

The dominant alignment discourse assumes the hard problem is training. This experiment suggests a complementary, much cheaper mechanism: a well-formed governing document measurably changes fresh-agent behavior in the exact directions it specifies. That's not a substitute for training-time alignment, it's a reinforcement, and it's available to every team running agents today. If a 15-section charter can shift self-modification caution by nearly a full rubric point across six different models, the marginal value of writing good governance documents is real and testable.

Open questions we're now pursuing: does the effect persist over time? Does it survive agent self-modification? And does a charter that overshoots caution relative to its principal (we saw that too) need a calibration pass?

If you are interested in having a look under the hood, the repo is here: [vhsgreed/alignment-experiment](https://github.com/vhsgreed/alignment-experiment).