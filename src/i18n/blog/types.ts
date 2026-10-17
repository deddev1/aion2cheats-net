import type { BlogBlock, BlogPostFull } from '../../data/blog/types';

/** Partial overlay merged onto an English blog post for a locale. */
export type BlogPostOverlay = {
  title?: string;
  desc?: string;
  tag?: string;
  readTime?: string;
  author?: string;
  /** Full body replacement (same length/structure as English preferred). */
  body?: BlogBlock[];
};

export type BlogLocalePack = Record<string, BlogPostOverlay>;

export type { BlogBlock, BlogPostFull };
