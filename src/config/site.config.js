// site.config.js — ONE edit point for site-wide identity, nav, analytics.
// Adding a page NEVER touches navigation: lanes are prefix→lane mappings.
// See MAINTENANCE.md. Locked design tokens: Open Sans, square corners.

export const siteTitle = 'vhsgreed';
export const siteUrl = 'https://vhsgreed.win';
export const siteDescription =
  'Robotics supply-chain intelligence, open-source agent tooling, and honest research. For-profit, self-funded, built from Stockholm.';

// GA4 property (consent-gated; see CookieConsent.astro). Do not change without MAINTENANCE.md update.
export const gaId = 'G-E2E4K53319';

// Primary nav: exactly four lanes (locked IA 2026-09-08).
export const navLanes = [
  { href: '/blog/', label: 'Blog' },
  { href: '/data/', label: 'Data' },
  { href: '/api/', label: 'API' },
  { href: '/store/', label: 'Store' },
];

// Utility links: mobile menu overlay "More" section + footer. Order = display order.
export const utilityLinks = [
  { href: '/about/', label: 'About' },
  { href: '/site-index/', label: 'Site index' },
  { href: '/contact/', label: 'Contact' },
  { href: '/privacy/', label: 'Privacy' },
];

// Locked 14-tag taxonomy (max 3 per post). kind field = tone, separate.
export const taxonomy = [
  'ai', 'agents', 'alignment', 'automation', 'robotics', 'investing',
  'data', 'scraping', 'sweden', 'business', 'tax', 'security', 'meta', 'writing',
];

export const author = 'karl-sund';

// Design tokens (single source; global.css mirrors these as CSS custom props).
export const brand = {
  color: '#396291', // active brand blue (steel, styling census). Alternate: '#0061C2' — swap here to switch site-wide.
  ink: '#111111',
  bg: '#ffffff',
  line: '#c8c8c8',
  radius: '0',
  font: 'Open Sans',
};
