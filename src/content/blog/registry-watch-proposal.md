---
title: "Registry Watch: A Compliance Monitoring Proposal"
date: 2026-09-10
kind: story
description: "A proposed service that watches the companies a business works with across official registries and emails a plain alert when something changes. This is a proposal, not a shipped product."
author: karl-sund
tags: [compliance, registries, proposal]
lang: en
---

Registry Watch is a service we are considering building. It does not exist yet. This article explains what it would do, how it would work, and what it would cost if built. If that sounds useful, the last section says how to tell us.

## What compliance monitoring is

Most businesses work with a handful of companies they depend on: a supplier that delivers a critical component, a tenant that pays rent, a counterparty on a long contract. The health of those companies is a business risk, and it is usually checked once, at onboarding, and then never again.

The information that would change the picture is public. Companies file for liquidation, change status, or change ownership in official registries: Bolagsverket in Sweden, the Central Business Register (CVR) in Denmark, Companies House in the UK. The filings are public and free to read. The problem is that nobody re-reads them every week.

Compliance monitoring is the practice of re-reading those registries on a schedule and reporting what changed. The people who need it are usually the ones without a tool for it: small finance teams, landlords, procurement staff, credit desks at small factoring shops. Larger companies buy this as part of enterprise risk platforms. The smaller end of the market mostly checks manually or not at all.

## How the monitoring would work

The setup would be deliberately small:

1. **Input.** A company pastes the list of businesses it wants watched: names or registry IDs of suppliers, tenants, and counterparties.
2. **Checks.** Every week, each watched company is checked against official registries. The sources are the registries themselves, not third-party summaries.
3. **Alerts.** When a filing or status change appears, the service sends one plain email: "Company X filed for liquidation on 2026-09-08. Source: registry link." No dashboard, no login. Email is the product.
4. **Coverage at launch.** Swedish Bolagsverket, Danish CVR, and UK Companies House.

The three starting registries were chosen for data quality, not market size. All three publish structured status and filing data with predictable change signals: liquidation filings, status changes, and ownership changes are distinguishable events, not free-text notes. A weekly cadence fits that: registry changes of this kind are important with days of lead time, not seconds, and weekly checks keep the alert volume at a level a person actually reads.

What the checks would catch: a company entering liquidation proceedings, a registry status change (active to inactive or under reconstruction), and registered ownership changes. What it would not catch in the first version: sanctions screening, credit scoring, and anything beyond the filing data the registries publish.

## What it would cost, if built

Conditional pricing, since nothing is built:

- **Free:** up to 5 watched companies.
- **Paid:** approximately EUR 9 per month for 50 watched companies, billed through Stripe.

The economics behind those numbers are simple. The registry reads are automated and the alerting is a scheduled job, so the marginal cost per watched company is close to zero. The price covers the billing work, the design pass, and the ongoing operation, not data licensing, because the underlying filings are public.

## Open questions

Some things are unresolved before any build:

- Demand is unproven. Compliance tools are bought by people with jobs to do, and they are usually found through search or referral, not by browsing. Whether passive interest converts is an open question.
- Scope beyond the three registries. Adding countries is straightforward technically but multiplies the maintenance of change detection per registry.
- How much ownership detail is useful in an email versus a page.

## What we ask of the reader

If monitoring your suppliers, tenants, or counterparties across Bolagsverket, CVR, or Companies House would save you a recurring manual check, say so. There is no signup form and no waitlist, because the product does not exist. Reply through the site contact page, or follow the build log, where any decision to build or not build will be documented either way.
