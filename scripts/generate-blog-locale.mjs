/**
 * Generates a locale blog pack TypeScript file from en-posts.json + a translations JSON.
 *
 * Usage:
 *   node scripts/generate-blog-locale.mjs ko scripts/blog-i18n/ko.json
 *
 * Translations JSON shape: { [slug]: { title, desc, tag, readTime, body } }
 * body must mirror English block types/order.
 */
import fs from 'node:fs';
import path from 'node:path';

const [locale, jsonPath] = process.argv.slice(2);
if (!locale || !jsonPath) {
  console.error('Usage: node scripts/generate-blog-locale.mjs <locale> <translations.json>');
  process.exit(1);
}

const en = JSON.parse(fs.readFileSync('scripts/blog-i18n/en-posts.json', 'utf8'));
const tr = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const exportName = {
  ko: 'koBlog',
  'zh-tw': 'zhTwBlog',
  de: 'deBlog',
  'pt-br': 'ptBrBlog',
  th: 'thBlog',
  ja: 'jaBlog',
  es: 'esBlog',
  fr: 'frBlog',
}[locale];

if (!exportName) {
  console.error('Unknown locale', locale);
  process.exit(1);
}

function esc(s) {
  return JSON.stringify(s);
}

const missing = [];
const parts = [];

for (const post of en) {
  const o = tr[post.slug];
  if (!o?.title || !o?.desc || !Array.isArray(o?.body)) {
    missing.push(post.slug);
    continue;
  }
  if (o.body.length !== post.body.length) {
    console.warn(`WARN ${post.slug}: body length ${o.body.length} vs EN ${post.body.length}`);
  }
  parts.push(`  ${esc(post.slug)}: {
    title: ${esc(o.title)},
    desc: ${esc(o.desc)},
    tag: ${esc(o.tag ?? post.tag)},
    readTime: ${esc(o.readTime ?? post.readTime)},
    body: ${JSON.stringify(o.body, null, 6).replace(/^/gm, '    ').trimStart()},
  }`);
}

if (missing.length) {
  console.error(`Missing complete overlays for ${missing.length} posts:`, missing.join(', '));
  process.exit(1);
}

const out = `import type { BlogLocalePack } from '../types';

/** Full blog article translations — ${locale} */
export const ${exportName}: BlogLocalePack = {
${parts.join(',\n')}
};
`;

const outPath = path.join('src/i18n/blog/locales', `${locale}.ts`);
fs.writeFileSync(outPath, out, 'utf8');
console.log(`Wrote ${outPath} (${parts.length} posts)`);
