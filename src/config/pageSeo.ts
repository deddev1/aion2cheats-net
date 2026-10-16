/**
 * Central titles/descriptions for high-traffic routes.
 * After Search Console shows impressions, edit the matching path here and redeploy.
 */

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'Aion 2 Cheats | ESP, Radar & Abyss PvP',
    description:
      'Aion 2 cheats for PC with player ESP, wallhack, Abyss radar, gather ESP, skill assist and costume changer. Built for Elyos vs Asmodian PvP, instances and flight.',
  },
  '/products/aion-2-cheats/': {
    title: 'Aion 2 Cheats Products | Elite, HWID & Costume Changer',
    description:
      'Aion 2 Elite cheats, HWID spoofer, UGC recovery and Costume Changer for Abyss RvR, arenas, instances and flight on PC.',
  },
  '/products/aion-2-cheats/elite/': {
    title: 'Aion 2 Elite Cheats | ESP, Skill Assist & Farm Assist',
    description:
      'Aion 2 Elite with ESP wallhack, class skill assist, farm assist, Auto Kill, Costume Changer and priority patch updates.',
  },
  '/products/aion-2-cheats/utilities/': {
    title: 'Aion 2 Utilities | HWID Spoofer, UGC & Costume Changer',
    description:
      'HWID Spoofer after hardware bans, UGC for NCSOFT and anti-cheat appeals, and local Costume Changer / Unlock All.',
  },
  '/blog/': {
    title: 'Aion 2 Cheats Guides | ESP, Abyss & Anti-Cheat',
    description:
      'Guides on Aion 2 ESP wallhack, Abyss presets, Lite vs Pro, class skill assist and NCSOFT anti-cheat patch checks.',
  },
  '/forum/': {
    title: 'Aion 2 Cheats Forum',
    description:
      'Talk Aion 2 cheat setup, ESP and class configs, Abyss status and product questions.',
  },
  '/faq/': {
    title: 'FAQ | Aion 2 ESP, Skill Assist & Setup',
    description:
      'Answers on Aion 2 cheat tiers, ESP wallhack, Abyss radar, skill assist, HWID spoofer, Costume Changer and loader setup.',
  },
  '/terms/': {
    title: 'Terms & Conditions | Aion 2 Cheats',
    description:
      'Purchase terms, license use and refund policy for Aion 2 cheat products on aion2cheats.net.',
  },
  '/privacy/': {
    title: 'Privacy Policy | Aion 2 Cheats',
    description:
      'How aion2cheats.net uses analytics, cookies and contact data.',
  },
  '/about/': {
    title: 'About Aion 2 Cheats',
    description:
      'Aion 2 Cheats sells PC Aion 2 cheat tiers, guides and utilities at aion2cheats.net.',
  },
  '/support/': {
    title: 'Support | Aion 2 Cheats',
    description:
      'Help with Aion 2 cheat loader setup, configs, HWID spoofing and checkout.',
  },
};

export function normalizeSeoPath(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function getPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  return PAGE_SEO[normalizeSeoPath(pathname)];
}
