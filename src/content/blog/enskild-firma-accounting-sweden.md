---
title: "How a one-person tech firm books itself in Sweden"
date: 2026-09-01
kind: "guide"
description: "The enskild firma legal frame, the one-pool bookkeeping merge, moms method choice, and the 5-year deficit window. Source-grounded, for any solo digital builder."
author: "vhsgreed"
tags: ["sweden", "accounting", "enskild firma", "sole proprietorship", "tax", "guide"]
---
Swedish company forms get less attention than they should. For a solo
builder selling digital products, the default is not an aktiebolag. It is
an enskild näringsverksamhet, a sole proprietorship. It is simpler, cheaper
to run, and it changes how the whole accounting stack behaves.

This is a practical writeup of how that works, based on running a real one.
It is not tax advice. Confirm rules and figures with Skatteverket before
filing.

## 1. The legal frame changes everything

An enskild firma is not a separate legal entity. The firm and the owner are
the same legal subject: the firm's assets are the owner's, its debts are
the owner's, and liability is unlimited and personal. Skatteverket states it
plainly: you declare the firm's result inside your own tax return, in a
NE-bilaga that accompanies Inkomstdeklaration 1 (Skatteverket, Deklarera
enskild näringsverksamhet).

The consequence is not theoretical. There is no corporate shell to keep
books for. There is one person, and one pool of money.

## 2. Bookkeeping is mandatory, and it is modest

Every näringsverksamhet must keep books. "Alla som driver
näringsverksamhet ska upprätta en bokföring" (Verksamt, Bokföring). The
legal floor is Bokföringslagen 1999:1078. For a sole proprietor the
requirement sits below what most people imagine: recurring registration of
affärshändelser, source documents kept, and a bookslut at year end.

For a solo digital business the practical shape is small:

- Source documents: bank exports, receipts, invoices. Kept, filed, named.
- A transaction mirror: a cleaned view of the bank feed, deduplicated on
  account, date, text, amount, and running balance.
- A business ledger (affärsbok) for business-only händelser, classified
  against the BAS chart. Append-only.
- A book-close: reconcile bank against ledger, lock exchange rates, and
  produce the result that feeds the NE-bilaga.

Nothing in that requires a paid platform at zero revenue. It requires
discipline.

## 3. The merge: one pool, separated by category

Because there is no separate entity, business and personal money land in
the same accounts. What you separate is never a legal boundary. It is a
bookkeeping category. The same bank account can carry a personal grocery
charge and a business API fee. That is normal and legal for an enskild
firma. The work is labelling, not incorporation.

This matters when someone tells you to keep business and private "apart."
For an enskild firma that is not two entities. A dedicated receiving
account for payouts, and clear labels for business costs, is enough.

## 4. Moms: registered from day one, method decided up front

An enskild näringsidkare who is moms-registered declares momsen in the tax
return context. Skatteverket defines two methods:

- Faktureringsmetoden: moms is booked when the invoice is issued, paid or
  not. This is the main method under Bokföringslagen (Skatteverket,
  Bokföring och bokslut).
- Bokslutsmetoden (kontantmetoden): moms is booked when cash moves. It is
  available to firms with a small number of invoices or turnover below a
  threshold (currently around 3 MSEK per year; confirm at close).

A solo digital firm with modest turnover and few invoices fits
bokslutsmetoden. It keeps cashflow simpler, because output momsen is not
due until payment lands.

## 5. Deficits carry a real 5-year window

A deficit (underskott) in the firm is not stranded. For a newly started
active näringsverksamhet, the deficit can be deducted as a general
deduction against other income, including income from employment, up to
100,000 SEK per year, for the start year and the four that follow
(Skatteverket, Underskott; 62 kap. Inkomstskattelagen 1999:1229).

Two caveats keep this honest:

- Both sides must be active and newly started, and the owner must not have
  run a like activity in the five years before start.
- A deficit saves roughly your marginal tax rate, not its full face value.
  Incurring costs to create a deficit, rather than to make money, usually
  loses about 30 SEK for every 100 SEK spent.

## 6. What a clean book-close looks like

At year end the work is:

1. Book every händelser for the period.
2. Reconcile: bank balance must equal ledger balance.
3. Document any gaps with source vouchers.
4. Confirm the moms result and the filing period.
5. Produce the NE-bilaga result and the annual statement.

The payoff for doing this weekly and monthly, instead of reconstructing at
year end, is that no deductions are lost and none are over-claimed. A
digital stack that keeps the transaction mirror, the ledger, and the
vouchers leaves a clean SIE4 path to a real ledger the day revenue makes
one worthwhile.

## Sources

- Skatteverket. Deklarera enskild näringsverksamhet. NE (SKV 2161), SKV 282

The forms themselves have a
[dedicated plain-English map](/blog/swedish-small-business-forms/):
what SKV 2161, the NE-bilaga, and the F-skatt application each do, with the
[2026 filing calendar](/blog/swedish-tax-deadlines-2026/).
  and 283. skatteverket.se
- Verksamt. Bokföring. verksamt.se/bokforing
- Verksamt. Årsbokslut och redovisning för enskild näringsverksamhet.
- Skatteverket. Underskott.
- Skatteverket. Rätt att dra av underskott för nystartad näringsverksamhet,
  62 kap. 2-3 §§ IL.
- Skatteverket. När ska jag deklarera moms; Bokföring och bokslut.
- Bokföringslagen (1999:1078). Inkomstskattelagen (1999:1229).