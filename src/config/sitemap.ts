import type { SitemapItem } from '@astrojs/sitemap';
import { blogPosts } from '../data/blog';
import { parseBlogDate } from '../utils/schema';
import { LOCALE_META, NON_DEFAULT_LOCALES, type Locale } from '../i18n/locales';

const buildDate = new Date().toISOString();

const blogLastmod = new Map(
  blogPosts.map((post) => [`/blog/${post.slug}/`, parseBlogDate(post.date)] as const),
);

function pathnameFromUrl(url: string): string {
  const path = new URL(url).pathname;
  return path.endsWith('/') ? path : `${path}/`;
}

function stripLocale(path: string): string {
  for (const locale of NON_DEFAULT_LOCALES) {
    const prefix = `/${locale}/`;
    if (path === `/${locale}/`) return '/';
    if (path.startsWith(prefix)) return path.slice(prefix.length - 1);
  }
  return path;
}

function localeOf(path: string): Locale | 'en' {
  for (const locale of NON_DEFAULT_LOCALES) {
    if (path === `/${locale}/` || path.startsWith(`/${locale}/`)) return locale;
  }
  return 'en';
}

function isPriorityPath(path: string): boolean {
  const loc = localeOf(path);
  if (loc === 'en') return true;
  return LOCALE_META[loc].priority;
}

export function sitemapSerialize(item: SitemapItem): SitemapItem | undefined {
  const path = pathnameFromUrl(item.url);
  const bare = stripLocale(path);
  const priorityMarket = isPriorityPath(path);

  if (path.includes('/404') || path.startsWith('/go/') || path.includes('/rss.xml')) {
    return undefined;
  }

  item.lastmod = buildDate;

  if (bare === '/') {
    item.priority = priorityMarket ? 1 : 0.85;
    item.changefreq = 'weekly';
    return item;
  }

  if (bare === '/blog/') {
    item.priority = priorityMarket ? 0.9 : 0.75;
    item.changefreq = 'weekly';
    return item;
  }

  if (bare === '/forum/') {
    item.priority = priorityMarket ? 0.8 : 0.65;
    item.changefreq = 'daily';
    return item;
  }

  if (bare.startsWith('/forum/')) {
    item.priority = priorityMarket ? 0.6 : 0.5;
    item.changefreq = 'weekly';
    return item;
  }

  if (bare.startsWith('/blog/')) {
    item.priority = priorityMarket ? 0.7 : 0.55;
    item.changefreq = 'monthly';
    item.lastmod = blogLastmod.get(bare) ?? buildDate;
    return item;
  }

  if (bare.startsWith('/products/')) {
    item.priority = priorityMarket ? 0.85 : 0.7;
    item.changefreq = 'weekly';
    return item;
  }

  if (
    bare === '/about/' ||
    bare === '/support/' ||
    bare === '/privacy/' ||
    bare === '/terms/' ||
    bare === '/faq/'
  ) {
    item.priority = priorityMarket ? 0.7 : 0.5;
    item.changefreq = bare === '/faq/' || bare === '/support/' ? 'monthly' : 'yearly';
    return item;
  }

  item.priority = priorityMarket ? 0.65 : 0.5;
  item.changefreq = 'monthly';
  return item;
}
