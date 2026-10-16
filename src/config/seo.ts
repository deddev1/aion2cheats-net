import { getTranslations, resolveLocale, stripLocalePrefix } from '../i18n';
import { SITE_DOMAIN, SITE_DOMAIN as INDEXNOW_HOST_NAME } from './site';
import { getPageSeoEntry } from './pageSeo';
import { PAGE_SEO_BY_LOCALE } from '../i18n/seo-locales';

export const SITE_ORIGIN = `https://${SITE_DOMAIN}`;

/** Stable share image (outside dist/images so prune-dist-images never deletes it). */
export const DEFAULT_OG_IMAGE = '/og.jpg';

export const GA_MEASUREMENT_ID = import.meta.env.PUBLIC_GA_MEASUREMENT_ID as string | undefined;

/** @example @aion2cheats */
export const TWITTER_SITE = import.meta.env.PUBLIC_TWITTER_SITE as string | undefined;

export const TWITTER_CREATOR = import.meta.env.PUBLIC_TWITTER_CREATOR as string | undefined;

/** Comma-separated profile URLs (X, YouTube, etc.) for Organization sameAs. */
export function getOrganizationSameAs(): string[] {
  const raw = import.meta.env.PUBLIC_ORG_SAME_AS as string | undefined;
  if (!raw?.trim()) return [];
  return raw
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export const INDEXNOW_KEY = import.meta.env.INDEXNOW_KEY as string | undefined;

export function canonicalUrl(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return `${SITE_ORIGIN}${path}`;
}

export function absoluteAssetUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized}`;
}

/**
 * Map pruned source PNGs under /images/ to the kept -960.webp variant.
 * Deploy drops large PNGs; WebP stays and works for OG/Twitter/schema.
 */
export function shareImagePath(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (normalized === DEFAULT_OG_IMAGE) return normalized;
  return normalized.replace(/^(\/images\/.+)\.png$/i, '$1-960.webp');
}

export function absoluteShareImageUrl(path: string): string {
  return absoluteAssetUrl(shareImagePath(path));
}

export function resolvePageSeo(
  pathname: string,
  locale?: string | null,
): { title: string; description: string } {
  const code = resolveLocale(locale);
  const bare = stripLocalePrefix(pathname);
  const localized = PAGE_SEO_BY_LOCALE[code]?.[bare];
  if (localized) return localized;
  const entry = getPageSeoEntry(bare);
  if (entry) return entry;
  const t = getTranslations(code);
  return { title: t.site.title, description: t.site.description };
}

export function pageTitle(keyword: string, brand?: string, locale?: string | null): string {
  const t = getTranslations(locale);
  const name = brand ?? t.site.name;
  const suffix = ` | ${name}`;
  const max = 60;
  if (`${keyword}${suffix}`.length <= max) return `${keyword}${suffix}`;
  const trimmed = keyword.slice(0, Math.max(20, max - suffix.length - 1)).trim();
  return `${trimmed}${suffix}`;
}

export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;

export const RSS_FEED_PATH = '/rss.xml';

/** Used by IndexNow postbuild script. */
export const INDEXNOW_HOST = INDEXNOW_HOST_NAME;
