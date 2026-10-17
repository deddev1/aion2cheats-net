/**
 * Build th.json / ja.json from en-posts.json + per-locale string dictionaries.
 * Dictionaries map exact English source strings to translated strings (links preserved).
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '../..');
const en = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'scripts/blog-i18n/en-posts.json'), 'utf8'),
);

const TAG_TH = {
  Guides: 'คู่มือ',
  Setup: 'ติดตั้ง',
  Features: 'ฟีเจอร์',
  Updates: 'อัปเดต',
  Troubleshooting: 'แก้ปัญหา',
};
const TAG_JA = {
  Guides: 'ガイド',
  Setup: 'セットアップ',
  Features: '機能',
  Updates: 'アップデート',
  Troubleshooting: 'トラブルシュート',
};

function readTimeTh(enRt) {
  const m = enRt.match(/(\d+)/);
  const n = m ? m[1] : '?';
  return `อ่าน ${n} นาที`;
}
function readTimeJa(enRt) {
  const m = enRt.match(/(\d+)/);
  const n = m ? m[1] : '?';
  return `約${n}分`;
}

function trBlock(block, dict) {
  const lookup = (s) => {
    if (dict[s] !== undefined) return dict[s];
    throw new Error(`Missing translation: ${s.slice(0, 80)}…`);
  };
  switch (block.type) {
    case 'p':
    case 'h2':
    case 'h3':
      return { type: block.type, text: lookup(block.text) };
    case 'ul':
      return { type: 'ul', items: block.items.map(lookup) };
    case 'table':
      return {
        type: 'table',
        headers: block.headers.map(lookup),
        rows: block.rows.map((row) => row.map(lookup)),
      };
    case 'cta':
      return {
        type: 'cta',
        title: lookup(block.title),
        text: lookup(block.text),
        href: block.href,
      };
    default:
      throw new Error(`Unknown block type ${block.type}`);
  }
}

function buildLocale(dict, tagMap, readTimeFn) {
  const out = {};
  for (const post of en) {
    out[post.slug] = {
      title: dict[post.title],
      desc: dict[post.desc],
      tag: tagMap[post.tag] ?? post.tag,
      readTime: readTimeFn(post.readTime),
      body: post.body.map((b) => trBlock(b, dict)),
    };
    if (!out[post.slug].title || !out[post.slug].desc) {
      throw new Error(`Missing title/desc for ${post.slug}`);
    }
  }
  return out;
}

const locale = process.argv[2];
if (!locale || !['th', 'ja'].includes(locale)) {
  console.error('Usage: node build-locales-from-dict.mjs <th|ja>');
  process.exit(1);
}

const dictPath = path.join(ROOT, `scripts/blog-i18n/dict-${locale}.json`);
const dict = JSON.parse(fs.readFileSync(dictPath, 'utf8'));
const tagMap = locale === 'th' ? TAG_TH : TAG_JA;
const readTimeFn = locale === 'th' ? readTimeTh : readTimeJa;

const pack = buildLocale(dict, tagMap, readTimeFn);
const outPath = path.join(ROOT, `scripts/blog-i18n/${locale}.json`);
fs.writeFileSync(outPath, `${JSON.stringify(pack, null, 2)}\n`, 'utf8');
console.log(`Wrote ${outPath} (${Object.keys(pack).length} posts)`);
