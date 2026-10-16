/** Static path redirects (301). Keys are pathname without query/hash. */
export const PATH_REDIRECTS = new Map([
  ['/blog', '/blog/'],
  ['/about', '/about/'],
  ['/contact', '/support/'],
  ['/contact/', '/support/'],
  ['/support', '/support/'],
  ['/privacy', '/privacy/'],
  ['/terms', '/terms/'],
  ['/faq', '/faq/'],
  ['/cheats', '/products/aion-2-cheats/'],
  ['/cheats/', '/products/aion-2-cheats/'],
  ['/cheats/lite', '/products/aion-2-cheats/'],
  ['/cheats/lite/', '/products/aion-2-cheats/'],
  ['/cheats/pro', '/products/aion-2-cheats/'],
  ['/cheats/pro/', '/products/aion-2-cheats/'],
  ['/cheats/elite', '/products/aion-2-cheats/elite/'],
  ['/cheats/elite/', '/products/aion-2-cheats/elite/'],
  ['/cheats/compare', '/blog/aion-2-lite-vs-pro/'],
  ['/cheats/compare/', '/blog/aion-2-lite-vs-pro/'],
  ['/products/aion-2-cheats/utilities', '/products/aion-2-cheats/utilities/'],
  ['/products/aion-2-cheats', '/products/aion-2-cheats/'],
  ['/products/aion-2-cheats/account-recovery', '/products/aion-2-cheats/ugc/'],
  ['/products/aion-2-cheats/account-recovery/', '/products/aion-2-cheats/ugc/'],
  ['/products/dota-2-cheats', '/products/aion-2-cheats/'],
  ['/products/dota-2-cheats/', '/products/aion-2-cheats/'],
  ['/products/dota-2-cheats/elite', '/products/aion-2-cheats/elite/'],
  ['/products/dota-2-cheats/elite/', '/products/aion-2-cheats/elite/'],
  ['/products/dota-2-cheats/utilities', '/products/aion-2-cheats/utilities/'],
  ['/products/dota-2-cheats/utilities/', '/products/aion-2-cheats/utilities/'],
  ['/products/fortnite-cheats', '/products/aion-2-cheats/'],
  ['/products/fortnite-cheats/', '/products/aion-2-cheats/'],
  ['/products/fortnite-cheats/elite', '/products/aion-2-cheats/elite/'],
  ['/products/fortnite-cheats/elite/', '/products/aion-2-cheats/elite/'],
  ['/products/fortnite-cheats/utilities', '/products/aion-2-cheats/utilities/'],
  ['/products/fortnite-cheats/utilities/', '/products/aion-2-cheats/utilities/'],
  ['/go/fortnite', '/go/aion-2/'],
  ['/go/fortnite/', '/go/aion-2/'],
]);

/** Paths that should not receive a forced trailing slash. */
export const TRAILING_SLASH_SKIP = /\.[a-z0-9]+$/i;

export function resolvePathRedirect(pathname) {
  const direct = PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/') && !TRAILING_SLASH_SKIP.test(pathname)) {
    return `${pathname}/`;
  }

  return null;
}
