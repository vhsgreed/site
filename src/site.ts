// site.ts: the ONE file for your name, contact details and topics.
// Change something here and it updates on every page.

export const site = {
  name: 'Karl Sundström',
  url: 'https://vhsgreed.win',
  tagline: 'I build scrapers, automations and datasets, and write down how they are made.',
  description:
    'Karl Sundström builds web scrapers, automations and verified datasets from Stockholm, and writes about AI agents, data and running a one-person business in Sweden.',
  email: 'lillerik.sund@gmail.com',
  location: 'Stockholm, Sweden',
  business: 'Karl Sundström, enskild firma',
};

// Places you can be found. Shown on the About page and in the footer.
export const links = [
  { label: 'GitHub', url: 'https://github.com/vhsgreed' },
  { label: 'Apify', url: 'https://apify.com/vhsgreed' },
  { label: 'Medium', url: 'https://vhsgreed.medium.com/' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/vhsgreed/' },
  { label: 'Bluesky', url: 'https://bsky.app/profile/vhsgreed.bsky.social' },
];

// Every post has exactly one topic. The key goes in the post's
// frontmatter (topic: ai); the label is what readers see.
export const topics = {
  ai: 'AI & agents',
  data: 'Data & markets',
  web: 'Scraping & the web',
  sweden: 'Swedish business',
} as const;

export type Topic = keyof typeof topics;
