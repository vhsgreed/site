import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static-first: output is pure HTML/CSS (zero JS unless a page opts in).
// Deploy: build dist/ to Cloudflare Pages, custom domain vhsgreed.win.
export default defineConfig({
  site: 'https://vhsgreed.win',
  integrations: [sitemap()],
  output: 'static',
  build: { format: 'directory' },
});