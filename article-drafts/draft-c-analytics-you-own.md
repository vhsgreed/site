# Your Website Analytics, in a Table You Own

You cannot improve what you cannot see, and you cannot own what you cannot export. GA4 is a black box with a consent headache attached. This is the full recipe I use on my own site: a cookieless first-party telemetry stack on Cloudflare's free tier, a Worker, a D1 table, and plain `sendBeacon` events. Roughly a hundred lines of Worker code, and every number sits in a database I control.

## The three layers

My analytics stack has three layers, and each answers a different question.

| Layer | Consent needed? | What it answers |
| --- | --- | --- |
| Cloudflare Web Analytics | No, cookieless | How much traffic does the site get, from where? (Optional on my site, currently off) |
| GA4 behind a consent banner | Yes, explicit approval | Funnel and audience analysis when visitors opt in |
| First-party events in D1 | No, cookieless | Which pages get read, which buttons get clicked, how deep people scroll |

The important design decision is the split between layers two and three. The consent banner does not gate my telemetry. It only gates GA4. Everything in the first-party layer is a cookieless beacon to my own endpoint, so under Swedish and GDPR rules it sits outside the banner, the same way server logs do. The banner exists for Google's benefit, not mine.

## The event warehouse

The client side is a tiny inline script bundled on every page. It fires a `view` on load, `scroll` events at 25, 50, 75 and 100 percent depth (once per threshold), a `click` for every element tagged with `data-track`, and an `outbound` event for external links. Transport is `navigator.sendBeacon` with a `fetch` fallback, so nothing blocks the page and events survive navigation.

```js
var payload = JSON.stringify({
  t: type,
  p: location.pathname + location.search,
  r: document.referrer && document.referrer.indexOf(location.origin) === -1 ? document.referrer : '',
  n: extra && extra.name ? extra.name : undefined
});
if (navigator.sendBeacon) {
  navigator.sendBeacon(ENDPOINT, new Blob([payload], { type: 'application/json' }));
} else {
  fetch(ENDPOINT, { method: 'POST', body: payload, keepalive: true, mode: 'cors' });
}
```

The Worker receives POSTs at `/e` and stores one row per event. The D1 table is as flat as it gets:

```sql
CREATE TABLE events (
  ts INTEGER,
  type TEXT,
  path TEXT,
  name TEXT,
  referrer TEXT,
  sid TEXT,
  country TEXT,
  browser TEXT
);
```

No cookies and no client identifiers anywhere. The `sid` column is a session hash computed server-side: SHA-256 of the visitor's IP, user agent, the current UTC day, and a salt held as a Worker secret. It rotates automatically at midnight UTC, so it can tell "how many distinct visitors today" without ever storing something that identifies anyone tomorrow. Rotating the salt retroactively breaks all older correlation too.

The Worker also does the boring hygiene that production endpoints need:

- Validation: only four event types accepted, path capped at 512 characters, name at 128.
- Rate limiting: one request per second per IP, in-memory per isolate. Good enough, costs nothing.
- CORS: responses only for origins on an explicit allowlist.
- Country comes from Cloudflare's `CF-IPCountry` header; browser family from a small user-agent classifier that flags bots.
- If the D1 binding is missing, the Worker still answers 202 and logs instead of storing. Beacons never break pages.

## Consent without drama

The banner is one small component. On load it sets Consent Mode v2 with `analytics_storage: denied` as the default, and the GA4 script is literally not injected into the page until the visitor clicks Accept in the Swedish banner. The choice is stored in localStorage and a footer link reopens the banner for anyone who changes their mind. That single detail is what makes GA4 lawful here without further action: no tracking script touches the page before explicit consent, and "denied" is the honest default, not a dark pattern.

The first-party beacons keep flowing the whole time, because they carry no cookies and no persistent identifiers. That is the IMY-safe-by-construction part: the banner gates exactly one thing, and everything else never needed gating.

## The queries that matter

Because everything lands in plain SQLite, analysis is just SQL. Three recipes from my admin runbook, run through `wrangler d1 execute telemetry --remote`:

Top paths, last 7 days:

```sql
SELECT path, COUNT(*) v FROM events
WHERE ts > (unixepoch('now','-7 days')*1000) AND type='view'
GROUP BY path ORDER BY v DESC LIMIT 20;
```

Top click names, last 7 days:

```sql
SELECT name, COUNT(*) c FROM events
WHERE ts > (unixepoch('now','-7 days')*1000) AND type='click' AND name IS NOT NULL
GROUP BY name ORDER BY c DESC LIMIT 20;
```

Daily views, last 14 days:

```sql
SELECT date(ts/1000,'unixepoch') d, COUNT(*) v FROM events
WHERE ts > (unixepoch('now','-14 days')*1000) AND type='view'
GROUP BY d ORDER BY d;
```

No sampling, no data loss, no waiting for a vendor to process yesterday. The whole stack deploys with one `wrangler deploy`, the free tier handles it without breaking a sweat, and the export path is trivial because the data was never anyone else's to begin with. GDPR deletion is one DELETE statement, by `sid` or for everything.

[CTA: link to the site index or the toolkit product.]
