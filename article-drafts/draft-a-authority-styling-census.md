# DRAFT A — "We Mapped How Every Swedish Authority Styles Its Website"

Status: skeleton + verified data, Karl finishes tomorrow morning.
Canonical target: /blog/authority-styling-census/ · kind: insight · tags: [sweden, data]

## Angle
The Swedish state has a recognizable visual identity — and it's measurable. We crawled 223 of ~230 government agencies and pulled the actual CSS. This is what "looking official" is made of.

## Verified numbers (use only these)
- 223/230 homepages fetched; 7 hard 403 bot-gates. Asset capture: ~40 sites (challenge-gated) — say so honestly.
- Platforms: SiteVision/Episerver families dominate; Matomo self-hosted on 125/223; jQuery 127, React 92.
- Average page: 839 elements, 32 scripts, ~700 kB CSS on CMS sites.
- Colors: white background, near-black ink. Blue family (second-pass): #013351 petrol-navy dominant, mid-navies #243987/#10335f, steel #396291/#007DBA. Teal as accent only. Bootstrap stock blues on dozens of un-customized CMS installs.
- Blue family (second pass, 209 CSS-bearing sites): #013351 dark petrol-navy leads (2,583 hits, 21 sites), then #243987, #076a81 teal, #00588f. Fleet center of gravity is darker and less saturated than the "establishment blue" #0061C2.
- Our old test brand #192BC2: zero occurrences in 223 sites.
- Fonts: Roboto #1 webfont; Open Sans mid-pack; system Arial/Helvetica the majority choice; licensed identity fonts (Neo Sans, FM Condensed) for the big brands.
- Our differentiation: 3 kB CSS and 2 kB JS vs their ~700 kB/32 scripts.

## Structure sketch
1. Intro ≤80 w: why authority aesthetics matter for trust (one paragraph, first person).
2. H2 "The census": method (keyless fetches, honest UA, 2 s pacing, 223/230).
3. H2 "What official looks like": color table + font table.
4. H2 "The one blue we had to kill": #192BC2 → #396291 verdict story.
5. H2 "What we copied and what we didn't": tokens yes, CMS bloat no; performance budget.
6. Closing CTA slot: link the /data/ hub or the store.

## Karl to finish
- Personal voice opening + any opinion lines; fact-check the tone; add cover.
