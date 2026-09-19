import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://vhsgreed.win',
  integrations: [sitemap()],
  build: { format: 'directory' },
});
