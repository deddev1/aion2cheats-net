/**
 * Builds ko.json / zh-tw.json from en-posts.json using string maps.
 * Maps must cover every unique translatable string (see extract-unique-strings).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TAG_KO = {
  Guides: '가이드',
  Setup: '설치',
  Features: '기능',
  Updates: '업데이트',
  Troubleshooting: '문제 해결',
};
const TAG_ZH = {
  Guides: '攻略',
  Setup: '安裝',
  Features: '功能',
  Updates: '更新',
  Troubleshooting: '疑難排解',
};

function readTimeKo(en) {
  const m = /^(\d+)\s*min read$/i.exec(en);
  return m ? `${m[1]}분 읽기` : en;
}
function readTimeZh(en) {
  const m = /^(\d+)\s*min read$/i.exec(en);
  return m ? `閱讀時間 ${m[1]} 分鐘` : en;
}

/** Protect [text](/path/) segments during map lookup miss handling */
const LINK_RE = /(\[[^\]]+\]\([^)]+\))/g;

function tr(map, s, locale) {
  if (map[s] !== undefined) return map[s];
  throw new Error(`[${locale}] Missing translation for:\n${s}`);
}

function translateBlock(block, map, locale) {
  const out = { type: block.type };
  if (block.text !== undefined) out.text = tr(map, block.text, locale);
  if (block.title !== undefined) out.title = tr(map, block.title, locale);
  if (block.href !== undefined) out.href = block.href;
  if (block.items) out.items = block.items.map((i) => tr(map, i, locale));
  if (block.headers) out.headers = block.headers.map((h) => tr(map, h, locale));
  if (block.rows) out.rows = block.rows.map((row) => row.map((c) => tr(map, c, locale)));
  return out;
}

function buildLocale(enPosts, map, locale, tagMap, readTimeFn) {
  const out = {};
  for (const post of enPosts) {
    out[post.slug] = {
      title: tr(map, post.title, locale),
      desc: tr(map, post.desc, locale),
      tag: tagMap[post.tag] ?? post.tag,
      readTime: readTimeFn(post.readTime),
      body: post.body.map((b) => translateBlock(b, map, locale)),
    };
  }
  return out;
}

const en = JSON.parse(fs.readFileSync(path.join(__dirname, 'en-posts.json'), 'utf8'));

const locale = process.argv[2];
if (!locale || !['ko', 'zh-tw'].includes(locale)) {
  console.error('Usage: node build-locale-json.mjs ko|zh-tw');
  process.exit(1);
}

const mapPath = path.join(__dirname, locale === 'ko' ? 'ko-string-map.json' : 'zh-tw-string-map.json');
const map = JSON.parse(fs.readFileSync(mapPath, 'utf8'));

const tagMap = locale === 'ko' ? TAG_KO : TAG_ZH;
const readTimeFn = locale === 'ko' ? readTimeKo : readTimeZh;
const json = buildLocale(en, map, locale, tagMap, readTimeFn);

const outPath = path.join(__dirname, `${locale}.json`);
fs.writeFileSync(outPath, JSON.stringify(json, null, 2) + '\n', 'utf8');
console.log(`Wrote ${outPath} (${Object.keys(json).length} posts, ${Object.keys(map).length} map entries)`);
