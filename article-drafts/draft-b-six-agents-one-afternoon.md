# DRAFT B — "Six Agents, One Afternoon: Building a Data-API Fleet in Parallel"

Status: skeleton + verified data, Karl finishes tomorrow morning.
Canonical target: /blog/six-agents-one-afternoon/ · kind: build-log · tags: [agents, automation, ai]

## Angle
The day we stopped being the bottleneck: five working data actors plus one evidence-backed NO-GO, built by parallel subagents while the human slept/was at school. How the orchestration works and where it broke.

## Verified beats
- The batch: beneficial-ownership tree (UK PSC chains, 32-record smoke), VIN decoder + recalls (NHTSA keyless), certificate-transparency monitor (crt.sh), App Store metadata (iTunes API), SMHI-weather (⚠ their pmp3g API retired mid-build → MET Norway fallback), email verifier. Food-inspection actor = NO-GO with receipts (Livsmedelsverket stopped publishing per-business results).
- Cost picture: each build ~10-30 min agent time, ~$0.5-1 API cost; NO-GOs killed cheaply by design.
- Conventions as the multiplier: shared ACTOR-CONVENTIONS.md + README style guide meant zero re-explaining; a 63-char title lesson got inherited fleet-wide within the hour.
- The honest failures: two SMHI builders raced the same repo (duplicate spawn), the site builders raced the same git tree (design CSS clobbered, repaired from history). LESSON: one writer per working tree; parallelism at the repo level, serialization at the file level.
- Probe-first doctrine: every source verified keyless before build time; NO-GO written with evidence, not vibes.

## Structure sketch
1. Intro: "I need money" → throughput is the constraint → agents are the build team.
2. H2 "The fleet": table of the 6 with one-line outcomes.
3. H2 "What made it work": conventions file, probe-first, isolated sandboxes.
4. H2 "Where it broke": the two races, and the one-writer rule.
5. H2 "The economics": ~$5 of API calls for 24 build-ready assets; the NO-GO that saved a dead actor.
6. CTA slot: link /api/ hub.

## Karl to finish
- Voice, any names/details you want public vs private, cover.
