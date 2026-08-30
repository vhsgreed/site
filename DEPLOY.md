# Site — vhsgreed.win

Domain: **vhsgreed.win** (registered by Karl, ~$5/yr, 2026-08-30).

## Source + auto-deploy (GitHub → Cloudflare Pages)

**Repo: `github.com/vhsgreed/site`** (public). This directory is the repo;
every `git push` to main triggers a Cloudflare Pages rebuild + deploy
(connect steps below). No other hosting needed.

Local dev: `npm install && npm run dev` (http://localhost:4321).
Build test: `npm run build` → `dist/`.

## One-time Cloudflare Pages setup (Karl, ~5 min, free)

1. **Add the domain to Cloudflare** first: Cloudflare → Add site →
   `vhsgreed.win` → follow the nameserver update at your registrar (Karl
   bought it at a cheap registrar; either point nameservers to Cloudflare
   or use Cloudflare DNS records pointing `@` + `www` to the Pages
   project once it exists).
2. **Create Pages project**: Workers & Pages → Create → Pages → **Connect
   to GitHub** → pick `vhsgreed/site`.
   - Build command: `npm run build`
   - Output directory: `dist`
   - Production branch: `main`
3. **Custom domain**: add `vhsgreed.win` (+ `www` redirect).
4. **Enable Cloudflare Web Analytics** (free, cookieless) → copy the site
   token → paste over `YOUR_CF_WEB_ANALYTICS_TOKEN` in
   `src/layouts/Base.astro` → commit + push (auto-redeploys, tracking live).
   This is the ONLY config step remaining before tracking works.

Every subsequent change: edit `src/…` → `git push` → auto-deploy in ~1 min.

## Verify after deploy

```
curl -sL https://vhsgreed.win | grep -i "openly built"
curl -sL https://vhsgreed.win/sitemap-index.xml | head
curl -sL https://vhsgreed.win/rss.xml | head
```

## Local preview (this machine)

`python3 -m http.server 4322 -d dist/` → http://hub.local:4322 (LAN,
mDNS; direct IP if DHCP moved the address).

## Notes

- Static-first Astro: pure HTML/CSS output, zero JS by default, mobile
  menu works with JS disabled (`<details>`), verified 360→1920px no
  overflow.
- Store = Gumroad links; robotics product link goes live when Karl
  publishes the listing.
- Old `prod/store/` single-page scaffold in the workspace repo is
  superseded by this project.