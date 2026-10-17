export type { BlogBlock, BlogPostFull } from './blog/types';
export { blogPosts } from './blog/posts';

import { blogPosts } from './blog/posts';
import { DEFAULT_LOCALE, type Locale } from '../i18n/locales';
import { localizeBlogPost, localizeBlogPosts } from '../i18n/blog/localize';

export function getBlogPost(slug: string, locale: Locale = DEFAULT_LOCALE) {
  const post = blogPosts.find((p) => p.slug === slug);
  return post ? localizeBlogPost(post, locale) : undefined;
}

export function getAllBlogSlugs() {
  return blogPosts.map((p) => p.slug);
}

export function getLocalizedBlogPosts(locale: Locale = DEFAULT_LOCALE) {
  return localizeBlogPosts(blogPosts, locale);
}

export function getFeaturedBlogPost(locale: Locale = DEFAULT_LOCALE) {
  const featured = blogPosts.find((p) => p.featured) ?? blogPosts[0];
  return featured ? localizeBlogPost(featured, locale) : undefined;
}

export function getNonFeaturedBlogPosts(locale: Locale = DEFAULT_LOCALE) {
  const featured = blogPosts.find((p) => p.featured) ?? blogPosts[0];
  return localizeBlogPosts(
    blogPosts.filter((p) => p.slug !== featured?.slug),
    locale,
  );
}

export function getFeaturedBlogPosts(limit = 3, locale: Locale = DEFAULT_LOCALE) {
  const featured = getFeaturedBlogPost(locale);
  const rest = getNonFeaturedBlogPosts(locale);
  return featured ? [featured, ...rest].slice(0, limit) : getLocalizedBlogPosts(locale).slice(0, limit);
}

export function getRelatedBlogPosts(slug: string, limit = 3, locale: Locale = DEFAULT_LOCALE) {
  const current = blogPosts.find((p) => p.slug === slug);
  if (!current) return [];

  const sameTag = blogPosts.filter((p) => p.slug !== slug && p.tag === current.tag);
  const others = blogPosts.filter((p) => p.slug !== slug && p.tag !== current.tag);
  return localizeBlogPosts([...sameTag, ...others].slice(0, limit), locale);
}

export function getBlogPostsBySlugs(slugs: string[], locale: Locale = DEFAULT_LOCALE) {
  return slugs
    .map((slug) => blogPosts.find((p) => p.slug === slug))
    .filter((post): post is NonNullable<typeof post> => post != null)
    .map((post) => localizeBlogPost(post, locale));
}

export function getRelatedBlogPostsForProduct(
  relatedSlugs: string[],
  limit = 6,
  locale: Locale = DEFAULT_LOCALE,
) {
  const curated = getBlogPostsBySlugs(relatedSlugs, locale);
  if (curated.length >= limit) return curated.slice(0, limit);

  const used = new Set(curated.map((p) => p.slug));
  const fill = localizeBlogPosts(
    blogPosts.filter((p) => !used.has(p.slug)),
    locale,
  );
  return [...curated, ...fill].slice(0, limit);
}

export function getBlogTags(locale: Locale = DEFAULT_LOCALE) {
  return [...new Set(getLocalizedBlogPosts(locale).map((p) => p.tag))].sort((a, b) =>
    a.localeCompare(b),
  );
}

export function getBlogPostTimestamp(date: string) {
  return new Date(date).getTime();
}

export function getBlogReadMinutes(readTime: string) {
  const match = readTime.match(/(\d+)/);
  return match ? Number(match[1]) : 0;
}
