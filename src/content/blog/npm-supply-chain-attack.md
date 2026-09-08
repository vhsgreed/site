---
title: "The npm Supply-Chain Attack Explained: The Keyv and Cacheable Worm"
date: 2026-09-08
kind: "guide"
description: "How the August 2026 npm supply-chain attack worked: a compromised maintainer account, a preinstall hook worm, 400+ packages and 2 billion monthly downloads affected, and how to check your exposure."
author: "karl-sund"
lang: en
tags: [security]
---

On August 4, 2026, attackers hijacked a widely trusted npm maintainer account and published trojanized versions of foundational caching libraries: keyv, cacheable, flat-cache, and their ecosystem. The malicious versions spread like a worm using stolen publish tokens, ultimately reaching 400+ packages and roughly 2 billion monthly downloads. Here is how it worked and how to check whether you were hit.

## The documented poisoned versions

| Package | Compromised version |
| --- | --- |
| keyv | 6.0.0 |
| cacheable | 2.5.1 |
| cacheable-request | 13.0.20 |
| flat-cache | 6.1.24 |
| file-entry-cache | 11.1.6 |
| cache-manager | 7.2.10 |
| @cacheable/memory | 2.2.1 |
| @cacheable/node-cache | 3.1.2 |
| @cacheable/utils | 2.5.1 |
| @cacheable/net | 2.1.1 |

Sources: Socket threat research (August 4, 2026), Microsoft Threat Intelligence (ChainDrop analysis, August 4, 2026), Arctic Wolf advisory, and the Cyber Security Agency of Singapore advisory AD 2026-009. The full affected-package list lives on Socket's campaign page; new versions surfaced for days.

## How the attack worked, step by step

- **Account compromise:** the maintainer account behind the keyv and cacheable ecosystems was taken over on or before August 4, 2026.
- **The trojanized release:** the published library code was byte-for-byte identical to the clean build. The only changes were the package manifest and an added `preinstall` hook, a script that runs automatically when `npm install` executes.
- **The loader:** the hook downloaded the Bun runtime and executed an obfuscated second-stage payload that swept the machine for credentials: cloud keys, CI tokens, npm tokens.
- **Worm propagation:** stolen npm and CI tokens were used to publish malicious patch versions of every other package the tokens could reach, including packages outside the original namespaces. Microsoft, which tracks the malware family as ChainDrop (related to the earlier Shai-Hulud worm), documented the self-propagating pattern across more than 400 packages from multiple unrelated publishers.
- **Exfiltration and persistence:** stolen secrets were pushed to attacker-controlled GitHub repositories, and IDE configuration hooks established persistence.

## Why defenses people relied on did not catch it

The malicious releases looked like ordinary patch-version increments, published by an account with legitimate signing keys and trusted maintainer reputation. SBOM checks and signature enforcement inherited that trust. Most victims never installed keyv directly: common dependency chains ran through ubiquitous tooling (for example, eslint to file-entry-cache to flat-cache to keyv), so the compromise arrived transitively. Singapore's CSA put the combined reach of affected package versions at roughly 2 billion monthly downloads.

## How to check and protect yourself

- **Audit your lockfile** for the versions listed above, including transitive dependencies. Tools like Socket's campaign page and vendor advisories list known-bad versions.
- **Pin known-good versions** published before August 2026, and downgrade anything matching the poisoned list.
- **Purge caches:** npm and yarn caches, CI caches, and artifact repositories may hold compromised tarballs.
- **Rotate credentials** on any machine that ran an affected install, and treat those secrets as compromised.
- **Use release-age defenses:** npm CLI v12 introduced a minimum-release-age option; refusing brand-new versions buys the window defenders need.

## The takeaway

A supply-chain attack does not hack your code; it hacks the trust your build already extends. The cost of defense is boring hygiene: pinned versions, reviewed lockfiles, and a policy that treats a surprise patch release on a foundational package as suspicious until proven otherwise. We track incidents like this in our npm supply-chain timeline dataset: [11 major 2026 incidents with packages and IOCs](/store/).

## Related pages

- [Store: npm Supply-Chain Attack Timeline 2026](/store/)
- [Our open-source security tooling](/opensource/)
- [Not your keys: custody, control, and counterparty risk](/blog/not-your-keys/)
