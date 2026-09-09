# DRAFT A — "We Mapped How Every Swedish Authority Styles Its Website"

Status: skeleton + verified data, Karl finishes tomorrow morning.
Canonical target: /blog/authority-styling-census/ · kind: insight · tags: [sweden, data]

## Angle
The Swedish state has a recognizable visual identity — and it's measurable. We crawled 223 of ~230 government agencies and pulled the actual CSS. This is what "looking official" is made of.

## Verified numbers (use only these)
- 223/230 homepages fetched; 7 hard 403 bot-gates. Asset capture: 209/232 sites with CSS after the second pass (browser-like UA retry); 23 remain CSS-less (hard 403 bot-gates or JS-injected CSS) — say so honestly.
- Platforms (full fleet): SiteVision 81, Envision 77, Bootstrap 64, EPiServer 49, WordPress 15, Tailwind 7; Matomo self-hosted on 125/223; jQuery 127, React 92.
- Average page: 839 elements, 32 scripts, ~615 kB external CSS (8.2 files/page), 238 media queries, 984 CSS custom properties.
- Colors: white background, near-black ink. Teal (#076a81) as accent only, not a primary. Bootstrap stock blues on dozens of un-customized CMS installs.
- Blue family (second pass, 209 CSS-bearing sites), aggregate hits: #013351 dark petrol-navy leads (2,583 hits, 21 sites), then #243987 (918), #076a81 teal (499), #00588f (468), #10335f (286). Per-site dominant blue: #013351 on 21 sites, then #3a71aa (6), #5cb3fd (5), #0d6efd (4, stock Bootstrap), #007bff (3).
- Fleet center of gravity is darker and less saturated than the "establishment blue" #0061C2 (still present, 64+ hits, regeringen/verksamt family, but no longer modal). Blend-in pick: #396291 holds; sit closer to the fleet center with #2A4A6E–#33526E.
- Our old test brand #192BC2: zero occurrences in 223 sites.
- Fonts: Open Sans dominates outright (2,500+ hits incl. quoted variants), then Roboto, Merriweather Sans, Arial, Jost; system Arial/Helvetica still the most common raw choice; licensed identity fonts (Neo Sans, FM Condensed) for the big brands.
- Our differentiation: 3 kB CSS and 2 kB JS vs their ~615 kB / 32 scripts.

## Structure sketch
1. Intro ≤80 w: why authority aesthetics matter for trust (one paragraph, first person).
2. H2 "The census": method (keyless fetches, honest UA, 2 s pacing, 223/230).
3. H2 "What official looks like": color table + font table.
4. H2 "The one blue we had to kill": #192BC2 → #396291 verdict story (plus the darker nudge #2A4A6E–#33526E if we want the fleet center).
5. H2 "What we copied and what we didn't": tokens yes, CMS bloat no; performance budget.
6. Closing CTA slot: link the /data/ hub or the store.

## Karl to finish
- Personal voice opening + any opinion lines; fact-check the tone; add cover.
