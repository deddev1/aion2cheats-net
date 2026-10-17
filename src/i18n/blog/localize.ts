import type { BlogBlock, BlogPostFull } from '../../data/blog/types';
import type { Locale } from '../locales';
import type { BlogLocalePack, BlogPostOverlay } from './types';

import { koBlog } from './locales/ko';
import { zhTwBlog } from './locales/zh-tw';
import { deBlog } from './locales/de';
import { ptBrBlog } from './locales/pt-br';
import { thBlog } from './locales/th';
import { jaBlog } from './locales/ja';
import { esBlog } from './locales/es';
import { frBlog } from './locales/fr';

const PACKS: Partial<Record<Locale, BlogLocalePack>> = {
  ko: koBlog,
  'zh-tw': zhTwBlog,
  de: deBlog,
  'pt-br': ptBrBlog,
  th: thBlog,
  ja: jaBlog,
  es: esBlog,
  fr: frBlog,
};

/** Keep filter/icon keys stable by translating display tags. */
const TAG_LABELS: Partial<Record<Locale, Record<string, string>>> = {
  ko: {
    Guides: '가이드',
    Setup: '설치',
    Features: '기능',
    Updates: '업데이트',
    Troubleshooting: '문제 해결',
  },
  'zh-tw': {
    Guides: '攻略',
    Setup: '安裝',
    Features: '功能',
    Updates: '更新',
    Troubleshooting: '疑難排解',
  },
  de: {
    Guides: 'Guides',
    Setup: 'Setup',
    Features: 'Funktionen',
    Updates: 'Updates',
    Troubleshooting: 'Fehlerbehebung',
  },
  'pt-br': {
    Guides: 'Guias',
    Setup: 'Instalação',
    Features: 'Recursos',
    Updates: 'Atualizações',
    Troubleshooting: 'Solução de problemas',
  },
  th: {
    Guides: 'คู่มือ',
    Setup: 'ติดตั้ง',
    Features: 'ฟีเจอร์',
    Updates: 'อัปเดต',
    Troubleshooting: 'แก้ปัญหา',
  },
  ja: {
    Guides: 'ガイド',
    Setup: 'セットアップ',
    Features: '機能',
    Updates: 'アップデート',
    Troubleshooting: 'トラブルシュート',
  },
  es: {
    Guides: 'Guías',
    Setup: 'Configuración',
    Features: 'Funciones',
    Updates: 'Actualizaciones',
    Troubleshooting: 'Solución de problemas',
  },
  fr: {
    Guides: 'Guides',
    Setup: 'Installation',
    Features: 'Fonctionnalités',
    Updates: 'Mises à jour',
    Troubleshooting: 'Dépannage',
  },
};

function translateTag(tag: string, locale: Locale): string {
  return TAG_LABELS[locale]?.[tag] ?? tag;
}

function mergeBlock(base: BlogBlock, overlay: BlogBlock | undefined): BlogBlock {
  if (!overlay || overlay.type !== base.type) return base;
  switch (base.type) {
    case 'h2':
    case 'h3':
    case 'p':
      return overlay.type === base.type ? { ...base, text: overlay.text } : base;
    case 'ul':
      return overlay.type === 'ul' ? { ...base, items: overlay.items } : base;
    case 'table':
      return overlay.type === 'table'
        ? { ...base, headers: overlay.headers, rows: overlay.rows }
        : base;
    case 'cta':
      return overlay.type === 'cta'
        ? { ...base, title: overlay.title, text: overlay.text, href: overlay.href ?? base.href }
        : base;
    default:
      return base;
  }
}

function applyOverlay(post: BlogPostFull, overlay: BlogPostOverlay | undefined): BlogPostFull {
  if (!overlay) return post;
  const body =
    overlay.body && overlay.body.length > 0
      ? post.body.map((block, i) => mergeBlock(block, overlay.body![i]))
      : post.body;

  return {
    ...post,
    title: overlay.title ?? post.title,
    desc: overlay.desc ?? post.desc,
    tag: overlay.tag ?? post.tag,
    readTime: overlay.readTime ?? post.readTime,
    author: overlay.author ?? post.author,
    body,
  };
}

/** Localize a single blog post (falls back to English fields when overlay missing). */
export function localizeBlogPost(post: BlogPostFull, locale: Locale): BlogPostFull {
  if (locale === 'en') return post;
  const pack = PACKS[locale];
  const localized = applyOverlay(post, pack?.[post.slug]);
  return {
    ...localized,
    // Prefer overlay tag, else mapped label, else English.
    tag: pack?.[post.slug]?.tag ?? translateTag(post.tag, locale),
  };
}

/** Localize a list of posts for cards/index. */
export function localizeBlogPosts(posts: BlogPostFull[], locale: Locale): BlogPostFull[] {
  return posts.map((p) => localizeBlogPost(p, locale));
}

export function blogLocaleCoverage(locale: Locale): { total: number; withBody: number; withTitle: number } {
  const pack = PACKS[locale] ?? {};
  const entries = Object.values(pack);
  return {
    total: entries.length,
    withTitle: entries.filter((e) => !!e.title).length,
    withBody: entries.filter((e) => (e.body?.length ?? 0) > 0).length,
  };
}

/** Map a displayed (possibly translated) tag back to the English key for icons. */
export function englishBlogTag(tag: string): string {
  for (const map of Object.values(TAG_LABELS)) {
    if (!map) continue;
    for (const [en, localized] of Object.entries(map)) {
      if (localized === tag) return en;
    }
  }
  return tag;
}
