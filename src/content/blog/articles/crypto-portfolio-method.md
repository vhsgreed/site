---
title: "The Ledger Method: Tracking a Crypto Portfolio Honestly"
date: 2026-09-01
kind: "guide"
description: "A ledger-based method for holding crypto without the drama: sources and dates for every figure, committed capital recorded as committed, net worth and buffer kept apart, and an honest look at how it compares to high-risk trading."
author: "karl-sund"
tags: ["crypto", "ledger", "staking", "portfolio", "method"]
---

Every crypto post you see is one of two things: a prediction, or an ad.
This is neither. It is the method we use to keep a position honest over
months, and you can apply it to yours without trusting a single claim we
make, because the whole point is that you verify your own numbers.

The idea in one sentence: **treat your portfolio like a company treats its
books.** Not a trading diary, not a chart screenshot. A ledger.

## 1. One ledger, one truth

Every account, every wallet, every balance lives in one file with a date.
If a number is not in the ledger, it does not exist. Two rules keep it
honest:

- Every figure carries a **source**: a live API check, a bank export, or a
  typed confirmation. "I think I have about X" is not a number.
- Every figure carries an **as-of date**. A balance without a date is a
  rumor.

The test: could a stranger reconstruct your situation from the file alone?
If yes, the ledger works. If you have to explain anything verbally, the
ledger has a hole.

## 2. Write down what the position can NOT do

Most portfolios only record what is owned. The more useful half is what
each asset **cannot do right now**. This section is the heart of the
method, so here is the fuller checklist we keep next to every position:

- **Staked tokens are not spendable.** If it sits in a staking contract,
  it is committed capital with an unbonding period, not cash. Record the
  cooldown length next to the position, not in your head. "I could sell
  if it dips" is exactly the sentence a 28-day unbonding period turns
  into a lie.
- **A wallet address is not the position.** If the funds live in a smart
  contract, the address balance reads zero. Write down where the value
  actually is, or you will panic one day looking at an empty wallet.
- **Yield is not income until it is unstaked and sold.** Rewards accrue
  as numbers until then. Paper the difference between "earning" and
  "realized."
- **Custodied assets are promises.** Exchange balances, Wrapped tokens,
  lending deposits: each one is a claim on somebody else's solvency and
  honesty. Record the counterparty next to the number.
- **Illiquid is a spectrum.** A large position in a thin market cannot be
  exited at the screen price. Note the depth, or at least the honesty of
  the comparison you are making.
- **Loss of keys is loss of everything.** Which is its own section below.

These notes have saved us more stress than any chart. The failure mode
they prevent is simple: treating committed capital as spendable, and
discovering the difference on the worst possible day.

## 3. Not your keys, not your crypto

The oldest rule in the space, and it fits the ledger method precisely:
self-custody means the asset is yours in fact, not just in claim.
Custody is a spectrum (hardware wallet, hot wallet, exchange balance),
and every step away from your own keys is a step toward the "promises"
column of your ledger. We keep the full reasoning, tradeoffs, and the
self-custody basics in a separate explainer:
[Not your keys, not your crypto](/learn/not-your-keys/).

## 4. Know the difference between net worth and buffer

Two numbers, deliberately kept apart:

- **Net worth** answers "am I solvent long term?"
- **Liquid buffer** answers "can I survive the next three months?"

A portfolio can look strong on the first and be dangerous on the second.
Volatility assets inflate net worth and do nothing for the buffer. Our
rule: the buffer is measured in what could be spent within a month, and
it never includes anything with an unstaking period, a settlement lag, or
a sale that would realize a loss at the wrong moment.

## 5. Split business from personal, even when the law does not

If you operate as a sole proprietor anywhere in Europe, your firm and
your private finances are legally one pool. The discipline still matters:
every purchase gets a label (business tool, private expense, transfer)
the day it happens. It costs seconds, and it is the difference between a
two-hour tax filing and a two-week archaeology project.

## 6. Review on a schedule, not on a mood

The ledger gets updated on a cadence: exports on a fixed day, live prices
at check time, a short review weekly. No dashboard-checking at midnight.
The schedule is what makes the data trustworthy; a ledger you update when
anxious is a mood ring.

## 7. How this compares to high-risk trading

The ledger method is a low-drama, low-effort approach: hold proven
assets, earn staking APR where the network is established, accept
marginal gains, and let time do the compounding. It is the opposite end
of the spectrum from active trading. The honest comparison, without
romance:

| Approach | Effort | Return profile | Principal risk |
|---|---|---|---|
| Ledger method: staking + holding proven assets | Minutes per week | Steady APR, marginal, compounding gains | Market drawdowns; smart-contract and counterparty risk |
| Buy-and-hold, diversified basket | Minutes per month | Tracks the asset class | Full market drawdowns |
| Swing trading / chasing trends | Hours per day | Highly variable; most retail traders underperform the assets they trade | Can decline sharply and quickly |
| Leverage / day trading | Constant | Frequently negative after fees and liquidations | Total loss is a real outcome |

The bottom rows are not for us to judge: they are for people who have
knowingly accepted that their principal investment may disappear or
sharply decline in value. What the ledger method refuses is the middle
lie: trading risk with savings discipline, or savings boredom with
trading adrenaline. Pick a lane with open eyes, then keep books that tell
you the truth about it.

## What this method deliberately does not do

- No predictions. A method that needs to be right about price is not a
  method, it is a bet.
- No "buy this." We publish process, not tickers.
- No screenshots of gains. A screenshot is not a source.

## The verifiable part

Everything above is checkable against your own accounts, which is the
only audit that matters. We built our internal ledger as plain files
(JSON plus a few exports), because tools you can read in a text editor
do not hide anything. The format matters less than the rules: sources,
dates, and the discipline to record what a position cannot do.

That is the method. No signal, no alpha, no secret. Just books that
balance, kept by someone who would rather be boring and correct than
exciting and wrong.

---

*This is not financial advice. It is a description of a method we use on
our own position, published so you can copy the process rather than trust
our claims. Do your own research, and never hold more in volatile assets
than you can watch drop without panic.*
