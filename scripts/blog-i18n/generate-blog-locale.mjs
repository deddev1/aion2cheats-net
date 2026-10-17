/**
 * Compiles scripts/blog-i18n/{locale}.json into src/i18n/blog/locales/{locale}.ts
 *
 * Usage:
 *   node scripts/blog-i18n/generate-blog-locale.mjs ko
 *   node scripts/blog-i18n/generate-blog-locale.mjs all
 */
import fs from 'node:fs';

const ROOT = 'scripts/blog-i18n';
const OUT = 'src/i18n/blog/locales';

const EXPORT_NAMES = {
  ko: 'koBlog',
  'zh-tw': 'zhTwBlog',
  de: 'deBlog',
  'pt-br': 'ptBrBlog',
  th: 'thBlog',
  ja: 'jaBlog',
  es: 'esBlog',
  fr: 'frBlog',
};

const LABELS = {
  ko: 'Korean',
  'zh-tw': 'Traditional Chinese',
  de: 'German',
  'pt-br': 'Brazilian Portuguese',
  th: 'Thai',
  ja: 'Japanese',
  es: 'Spanish',
  fr: 'French',
};

function compile(locale) {
  const jsonPath = `${ROOT}/${locale}.json`;
  if (!fs.existsSync(jsonPath)) {
    throw new Error(`Missing ${jsonPath}`);
  }
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const exportName = EXPORT_NAMES[locale];
  const label = LABELS[locale];
  const body = JSON.stringify(data, null, 2);
  const ts = `import type { BlogLocalePack } from '../types';

/** Full blog article translations — ${label}. */
export const ${exportName}: BlogLocalePack = ${body};
`;
  const outPath = `${OUT}/${locale}.ts`;
  fs.writeFileSync(outPath, ts, 'utf8');
  console.log(`Wrote ${outPath} (${Object.keys(data).length} posts)`);
}

const arg = process.argv[2] || 'all';
const keys = arg === 'all' ? Object.keys(EXPORT_NAMES) : [arg];
if (!keys.every((k) => EXPORT_NAMES[k])) {
  console.error('Usage: node generate-blog-locale.mjs all|ko|zh-tw|de|pt-br|th|ja|es|fr');
  process.exit(1);
}

for (const key of keys) compile(key);
