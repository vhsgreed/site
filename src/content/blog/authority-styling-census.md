---
kind: story
title: "Sweden's Government Websites All Wear the Same Blue. We Measured It."
date: 2026-09-09
description: "223 agency homepages, 209 CSS samples, and one blue that dominates. The measured visual identity of the Swedish state, chart by chart."
tags: [sweden, data, css, design]
author: karl-sund
lang: en
---

We downloaded the stylesheets of 209 Swedish government agencies and counted every color, font, and framework. The state's visual identity is real, it is measurable, and it is darker than anyone advertises.

![Census header: two robots auditing a wall of blue filing cabinets](/img/census-header.jpg)

It started as an interior design problem. We were picking a brand blue for this site and kept asking the same question: what color is "official" in Sweden, actually? Everyone can picture a Swedish authority website. White background, black ink, some kind of blue. Nobody can say which blue.

So we stopped guessing and ran a census instead. 223 of Sweden's roughly 230 government agencies had their homepages fetched, their stylesheets downloaded, and every hex code, font stack, and framework fingerprint counted. This is what the Swedish state looks like when you average it.

## The census, and the part that nearly failed

The method was deliberately plain: keyless HTTP requests, an honest user agent, two seconds of pacing between requests. Nothing a normal browser would not see.

The first pass was almost a total failure. We got HTML from 223 agencies, but usable CSS from only 40. The reason is a quiet change in how the modern web works: government sites now inject their stylesheets through JavaScript, so the raw HTML arrives nearly naked. A page that renders perfectly in your browser looks unstyled to a simple fetcher.

The fix was a second pass: parse every stylesheet URL out of the saved HTML, re-fetch them with a browser-like signature, and cap at 25 files per site. Coverage jumped from 40 to 209 of 232 sampled sites. The 23 that remain are the gap: Skatteverket, Säkerhetspolisen, Tullverket and friends run hard bot-blocks that returned 403 to everything, challenge pages included.

Then the numbers got interesting.

The average authority page carries 839 DOM elements, 32 scripts, and about 615 kB of external CSS spread across 8 files, with 238 media queries and close to a thousand CSS custom properties. Self-hosted Matomo analytics runs on 125 of the 223 sites, and jQuery is still loaded by 127.

![External CSS weight distribution across 209 sites](/img/census-css-weight.png)

## Three themes run the entire state

The framework bar graph is the census at its most lopsided. SiteVision sits at 81 of the 209 sites, Envision at 81, and the next bar, Bootstrap, reaches 65, with 8 more un-branded installs that ship nothing but Bootstrap's stock blues, identifiable by hex code alone. Then the curve collapses: EPiServer 42, WordPress 28, Tailwind 7. The counts are independent fingerprints, so a single site can appear under more than one bar; the shape, not the sum, is the finding.

![Framework fingerprints across the 209-site sample](/img/census-frameworks.png)

The shape says the state's web is a market of two procurement decisions rather than 209 designs. When one product sits on 81 of 209 sites, a template release or an accessibility fix propagates across more than a third of government in a week, and that product's defaults quietly become public-sector defaults. It also explains the Bootstrap spike in the dominant-color chart below: the un-customized tail of these bars is exactly where stock blues survive. WordPress, the default of the wider web, is a rounding error at 28 sites, and Tailwind's 7 installs mean utility CSS has barely crossed the government perimeter.

The Swedish public sector does not have 200 website designs. It has about three, wearing different logos.

## The blue that runs the country

Colors first: white backgrounds and near-black ink are the law of the land, with no exceptions worth mentioning. The identity lives in the blues, and this is where the widened sample surprised us.

The single most common authority blue is #013351: a deep petrol-navy, with 2,583 occurrences across the sample and the dominant-color slot on 21 sites. Then #243987 (918 hits), the teal #076a81 (499), #00588f (468), and the navy #10335f (286).

![Blue family: aggregate hex hits across 209 sites](/img/census-blue-family.png)

![Which color dominates each site](/img/census-dominant-color.png)

Here is the twist. The "classic Swedish authority blue" you find in brand folklore, #0061C2, the regeringen and verksamt shade, still exists, but it is no longer the modal choice. The center of gravity of the whole fleet has drifted darker and less saturated. The new agencies flirt with teal, but only ever as an accent, never as a primary. And Bootstrap's stock blues (#0d6efd, #007bff) pop up on exactly the sites that never touched their CMS theme, which is why the dominant-color chart has a small Bootstrap-shaped spike.

One more finding, and it is the reason this census exists: our original brand candidate, #192BC2, occurs exactly zero times in 223 sites. Nothing in the Swedish state publishes saturation that loud. The test blue was killed by data, and a calmer steel blue, #396291, took its place. For anyone playing the same game at home: if you want to sit even closer to the fleet center, drift toward #2A4A6E or #33526E.

## Fonts: pragmatism all the way down

As raw mentions, Arial and Helvetica lead, for the least glamorous possible reason: system stacks are the default, and most sites never override them. Among deliberate webfont choices, Open Sans dominates outright (2,500+ mentions across its quoted variants), followed by Roboto and Merriweather Sans.

![Named font mentions across 209 sites](/img/census-fonts.png)

The big brands buy licensed identity fonts: Neo Sans W01, FM Condensed, Benton Sans, and the Kammarkollegiet family. Everyone else ships Open Sans and calls it a day.

## What we copied, and what we refused to

The aesthetics were copied. Ink on white, hairline borders, square corners, a blue that demonstrably belongs to the family, Open Sans for body text.

The machinery was not. The average Swedish authority page ships roughly 615 kB of CSS and 32 scripts. This site ships 3 kB of CSS and 2 kB of JavaScript, with no CMS behind it. That gap is the actual finding of the census: authority aesthetics and modern performance are not in tension. They are simply rarely attempted together, by anyone, including the state.

The full method, the per-site data, and the scripts behind every chart are published in [the open build log](/blog/).
