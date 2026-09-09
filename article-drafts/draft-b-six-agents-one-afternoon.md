# Six Agents, One Afternoon: Building a Data-API Fleet in Parallel

I need money, which means I need throughput, and I am one person who also has a nursing degree to finish. Last week I stopped being the bottleneck in my own build pipeline. In a single afternoon I ran five parallel subagents that each shipped a working Apify data actor, plus one NO-GO decision with written evidence. This is a build log of how the orchestration worked, and where it broke.

## The fleet

Each actor follows the same shape: one official keyless source, flat one-record-per-output data, export to CSV, Excel, or JSON. The batch:

| Actor | Source | Outcome |
| --- | --- | --- |
| UBO Ownership Tree | UK Companies House PSC register | Walks corporate beneficial-ownership chains level by level, source URL on every record |
| VIN Decoder & Recall Check | NHTSA vPIC + recall database | Decode plus open safety recalls in one flat record, up to 500 VINs per run |
| crt.sh Certificate Monitor | Certificate-transparency logs | New subdomains, issuers and validity windows, one row per certificate |
| App Store Metadata | iTunes Search API | Pricing, ratings, versions across 175+ storefronts |
| Nordic Hourly Weather | SMHI Open Data, MET Norway fallback | One row per hour for any Nordic coordinate |
| Swedish food inspections | Livsmedelsverket | NO-GO, and the most valuable result of the day |

Every source was probed keyless before build time. No API key management, no scraping paid feeds, no surprises after the actor is published.

## What made it work

Three things carried the day, and none of them is clever code.

First, a shared conventions file. Every subagent got the same `ACTOR-CONVENTIONS.md` plus a README style guide, so nobody had to re-explain pay-per-event naming, pricing shape, or what a Store listing needs to pass validation. The conventions file is the shared brain: when I learned that Apify rejects `.actor/actor.json` titles longer than 63 characters (with a misleading error at push time, discovered the hard way), the rule went into the file and was inherited fleet-wide within the hour. One audit pass later, every title in the fleet was compliant.

Second, probe-first doctrine. Before any agent wrote code, the source had to prove it exists and works without a key. That habit is what made the NO-GO cheap instead of tragic.

Third, isolated sandboxes. Each agent got its own repo and its own process. They never stepped on each other's directories, they could smoke-test against live endpoints without coordinating, and the only shared artifact was the conventions file.

## Where it broke

Two races, both instructive.

The first was a duplicate spawn: two builders were dispatched for the weather actor, so they raced the same repo. Both made real progress against a moving target, and the result was confusion, not corruption, because the smoke runs against SMHI were already interesting for another reason: mid-build, SMHI retired their `pmp3g` point-forecast API and every old path started returning 404. The actor ended up using SMHI's current point-forecast category as primary, with automatic fallback to MET Norway Locationforecast 2.0 on any failure, every row stamped with its data source. A fallback story is worth more than a clean run, and this one is now a selling point.

The second race was nastier: two site-building agents shared one git working tree, and one design change clobbered another. That got repaired from git history, but the lesson is permanent: one writer per working tree. Parallelism at the repo level, serialization at the file level. The orchestration model is "many isolated agents, one shared brain, one writer per tree", and any deviation from that costs more than it saves.

## The economics

Each build ran roughly 10 to 30 minutes of agent time and cost about $0.50 to $1 in API calls, mostly smoke tests against the live sources. The full batch came in around $5 for 24 build-ready assets across the wider sweep. Against a day rate for a contractor, that arithmetic is not close.

The best deal of the day, though, was the NO-GO. I wanted a Swedish food-inspection actor: business, address, municipality, last inspection result. The evidence pass killed it for about $0.50 of probes, because the source provably does not exist. The old national search tool is gone, the domain returns NXDOMAIN, Wayback has zero captures of it, the official Livsmedelsverket page confirms only aggregate annual PDFs are published, and per-business results live scattered across roughly 300 county and municipal sites with no common schema. Without the probe-first discipline, an agent would have happily built a scraper against a dead service and shipped an actor that fails for every customer. Instead: a written NO-GO, no repo created, nothing pushed, and the money and hours went to actors that can actually earn.

That is the part people miss about agent fleets. The value is not just in what gets built. It is in what gets killed early, cheaply, with receipts.

## What I would tell anyone doing this

Write the conventions file first, even if it is short. Probe sources before build, every time. Give each agent its own repo. Never let two agents write one tree. And require the NO-GO in writing with evidence, so the same dead end is never explored twice. The fleet is now a repeatable unit: one conventions file, isolated builders, verified sources, and a rule set learned from exactly two failures.

[CTA: link to the /api/ hub, where the finished actors live.]
