---
title: "The Ledger Method: Stop Checking Prices and Start Keeping Books"
date: 2026-09-01
kind: "guide"
description: "Stop checking prices and start keeping books. A ledger-based method for holding crypto without the drama: sources and dates for every figure, net worth and buffer kept apart, and an honest look at how it compares to high-risk trading."
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

Philosophy is cheap; files are forever. A JSON file, or any plain-text file, is immutable in structure. You cannot accidentally delete a row and
shift everything out of alignment. You can diff it, version it, and audit it line by line.
Our entire portfolio lives in a single JSON file: plain text, readable in any editor, diffable in Git, and impossible to fudge.
No spreadsheets with hidden formulas, no Notion pages with manual typing,
no "I'll update it later." If it is not in this file, it does not exist.

Here is exactly what one position looks like (figures illustrative, not our real position):

```json
{
  "asset": "ETH",
  "amount": 4.5,
  "source": "Etherscan API - 0x3F...B1C",
  "as_of": "2026-09-01T14:00Z",
  "cannot_do": "Staked in Lido; 24-hour unbonding period; yield accrues but unrealized",
  "counterparty": "Lido Smart Contract (mainnet)",
  "cost_basis": {
    "avg_price_usd": 1850.00,
    "total_cost_usd": 8325.00
  },
  "target_allocation_pct": 30,
  "rebalance_trigger": "Sell if allocation exceeds 45%",
  "last_review": "2026-09-01"
}
```

Every field answers a specific question a panicked mind asks at 2 AM:

| Field | Questions it kills |
|-------|-------------------|
| `source` | "Where did this number come from? Did I make it up?" |
| `as_of` | "Is this balance from today or last month?" |
| `cannot_do` | "Can I sell this right now if I need to?" |
| `counterparty` | "Who is holding my money if this is not self-custodied?" |
| `cost_basis` | "What did I actually pay for this, fees included?" |
| `target_allocation_pct` | "Is this position still within my plan, or has it drifted?" |
| `rebalance_trigger` | "What exactly needs to happen for me to act?" |

The file grows as your portfolio does. For us, it currently holds 20–30 entries: one per wallet, per staking position, per exchange balance. The whole thing is under 200 lines. A stranger could read it and reconstruct our exact situation within five minutes. That is the test.

**Two hard rules about the file itself:**

- **No manual price entries.** Prices come from an API at review time and are recorded separately. If you type a price, you are introducing opinion, not data.
- **The file is committed to Git.** Every change has a timestamp and a commit message. "Updated ETH balance after staking reward" tells a story. "Fixed numbers" tells a lie.

The format does not matter as much as the discipline: JSON, YAML, a SQLite DB, a paper notebook with a fountain pen. Pick what you will actually maintain. But if you want to skip the debate, copy our JSON structure above, fill in your numbers, and start. The first entry takes five minutes. The second takes two. By the tenth, you will wonder how you ever tracked anything without it.

---

*Next, we get to the real heart of the method: what each position **cannot** do right now. The JSON above has a `cannot_do` field for a reason. Read on.*

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

Custody is a spectrum:

- **Hardware wallet** → You hold the keys. The counterparty field reads "self."

- **Hot wallet** → You hold the keys, but exposure is online. The counterparty field reads "self (hot)."

- **Exchange balance** → They hold the keys. The counterparty field reads the exchange name.

Every step away from your own keys is a step toward the "promises" column of your ledger.
We keep the full reasoning, tradeoffs, and self-custody basics in a separate explainer:
[Not your keys, not your crypto](/learn/not-your-keys/).

## 4. Know the difference between net worth and buffer

Two numbers, deliberately kept apart:

- **Net worth** answers "am I solvent long term?"
- **Liquid buffer** answers "can I survive the next three months?"

A portfolio can look strong on the first and be dangerous on the second.
Volatility assets inflate net worth and do nothing for the buffer.
Our rule: the liquid buffer must cover 3 months of fixed personal/operational
expenses in stablecoins or fiat. If volatility eats into this bucket,
we rebalance before we buy more crypto. The buffer is not a dry-powder
investment fund; it is insurance, and insurance costs opportunity cost.
It never includes anything with an unstaking period, a settlement lag,
or a sale that would realize a loss at the wrong moment.

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

You can look at your portfolio whenever you like; we all do. But updates
to the ledger happen on a fixed cadence. Looking is entertainment;
updating is accounting. Never confuse the two.

## 7. "The Exit"

The ledger also tracks a 'target allocation' (e.g., 65% BTC, 35% ETH).
During weekly reviews, if an asset drifts 15% above its target,
we record a 'sell trigger' in the ledger. We don't act on emotion;
we act when the numbers cross a pre-defined line.
The ledger is not just for recording,
it is for pre-recording your future decisions.

Example: if BTC is targeted at 65% and drifts to 80% (a 15% absolute increase),
we record a sell order for the excess 15%. We do not sell immediately,
we record the decision in the ledger and execute during the next scheduled
review window. This cools off emotion and ensures the trade is deliberate, not reactive.

## 8. AI Agents: Automating the Ledger Without Trusting It

The ledger method works beautifully by hand, until you have hundreds of transactions,
multiple wallets, DeFi positions across five chains, and staking rewards accruing daily.
Manual entry becomes a bottleneck, and bottlenecks become excuses to skip updates.

This is where AI agents shine, **provided you use them as clerks, not oracles.**

### What AI does well

- **Transaction ingestion.** An agent can pull your entire transaction history
from Etherscan, Arbiscan, or your exchange's API and parse every deposit,
withdrawal, trade, and reward into structured data.
- **Reconciliation.** It can compare your ledger against on-chain balances and
flag discrepancies: "You recorded 4.5 ETH, but this address holds 4.52 ETH.
Was there a staking reward you missed?"
- **Cost-basis tracking.** For active traders or frequent stakers, AI can compute
average cost, realized gains, and unrealized P&L across thousands of transactions
in seconds. A task that would take a human hours.
- **Continuous monitoring.** Instead of weekly manual checks, an agent can watch
your addresses and append new transactions to the ledger daily, leaving you to review rather than type.

### What AI should NOT do

- **Make decisions.** The ledger records facts, not predictions. An AI that suggests "sell ETH because momentum is weakening"
 is a trading signal, not a bookkeeping tool. Keep the two separate.
- **Write to the ledger without review.** Automating entry is fine.
Automating *commit* without human sign-off is how errors compound.
Our rule: AI drafts, humans approve.
- **Connect to your bank via screen scraping.** Some agents offer Plaid or similar integrations.
These are convenient but introduce a new counterparty:
the API provider now has read access to your financial life. We avoid this entirely.
In our method, exports are manual or built with in house tools, and encrypted.

### The data privacy problem

This is the non-negotiable part: if you use a cloud-based AI provider (OpenAI, Anthropic, DeepSeek), **your transaction data leaves your machine.** That includes:

- Wallet addresses (public, but linkable to you)
- Transaction amounts and timestamps
- Counterparties (exchange names, smart contracts, even the coffee shop where you spent crypto)
- Your entire net worth, if you upload your full ledger

Do you want DeepSeek or Anthropic knowing your OnlyFans subscriptions? Your exact ETH balance? The timing of your paychecks? Probably not.

**Our rule:**
- **On-chain data only** goes to AI providers. Addresses are public anyway; we are not revealing anything that isn't already visible on Etherscan.
- **Bank data, fiat balances, and personal labels** never touch a cloud API. These stay local.
- **If you must use AI,** run a local model ([Ollama](https://ollama.com/)) or use an on-premise solution where your data never leaves your hardware. The speed tradeoff is worth the privacy.

### How we actually do it

Our setup is deliberately simple:

1. **Weekly export:** Download CSVs from exchanges and bank accounts.
2. **Local script:** A Python script (with no network calls) parses the CSVs and generates a draft JSON update.
3. **AI-assisted review:** We paste the on-chain portion (public addresses only) into a local model to flag anomalies: unusual gas spikes, missed reward claims, or addresses we forgot to record.
4. **Manual merge:** We review the draft, cross-check against the existing ledger, and commit the changes ourselves.

The AI saves us the grunt work. The human keeps the keys and the final say.

### The litmus test

Same as Section 1: could a stranger reconstruct your situation from the ledger file alone? If the AI wrote it, the answer must still be yes. If you cannot verify every number, you have outsourced trust, not work.

AI is a tool, not a trustee. Use it to type faster, not to think for you.

---

*Next, we compare this whole approach, manual or AI-assisted, against the alternatives. Because if you are going to keep books, you should know what you are saying no to.*

## 9. How this compares to high-risk trading

The ledger method is a low-drama, low-effort approach: hold proven
assets, earn staking APR where the network is established, accept
marginal gains, and let time do the compounding. It is the opposite end
of the spectrum from active trading. The honest comparison, without
romance:

| Approach | Effort | Return profile | Principal risk |
|---|---|---|---|
| Ledger method: staking + holding proven assets | Minutes per week (Setup 1hr) | Steady APR, marginal, compounding gains | Market drawdowns; smart-contract and counterparty risk |
| Buy-and-hold, diversified basket | Minutes per month | Tracks the asset class | Full market drawdowns |
| Swing trading / chasing trends | Hours per day | Highly variable; most retail traders underperform the assets they trade | Can decline sharply and quickly |
| Leverage / day trading | Constant | Frequently negative after fees and liquidations | Total loss is a real outcome |

The bottom rows are not for us to judge: they are for risk-tolerant people who have knowingly accepted that their principal investment
may vanish. What the ledger method refuses is the middle lie:
trading risk with savings discipline, or savings boredom with
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

