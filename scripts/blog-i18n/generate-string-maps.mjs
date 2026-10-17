/**
 * Generates ko-string-map.json and zh-tw-string-map.json via Bing Translator.
 * Preserves markdown hrefs; translates link labels.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { translate } from 'bing-translate-api';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SLEEP_MS = 350;

function splitLinks(text) {
  const chunks = [];
  let last = 0;
  const re = /(\[[^\]]+\]\([^)]+\))/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) chunks.push({ t: 'plain', v: text.slice(last, m.index) });
    const label = m[0].match(/^\[([^\]]+)\]/)[1];
    const href = m[0].match(/\(([^)]+)\)$/)[1];
    chunks.push({ t: 'link', label, href });
    last = m.index + m[0].length;
  }
  if (last < text.length) chunks.push({ t: 'plain', v: text.slice(last) });
  if (!chunks.length) chunks.push({ t: 'plain', v: text });
  return chunks;
}

async function trPlain(text, to) {
  if (!text.trim()) return text;
  const res = await translate(text, 'en', to);
  return res.translation;
}

async function translateWithLinks(text, to) {
  const chunks = splitLinks(text);
  const out = [];
  for (const c of chunks) {
    if (c.t === 'plain') out.push(await trPlain(c.v, to));
    else {
      const label = await trPlain(c.label, to);
      out.push(`[${label}](${c.href})`);
    }
    await new Promise((r) => setTimeout(r, SLEEP_MS));
  }
  return out.join('');
}

function collectStrings(enPosts) {
  const set = new Set();
  for (const p of enPosts) {
    set.add(p.title);
    set.add(p.desc);
    set.add(p.readTime);
    for (const b of p.body) {
      if (b.text) set.add(b.text);
      if (b.title) set.add(b.title);
      if (b.items) b.items.forEach((i) => set.add(i));
      if (b.headers) b.headers.forEach((h) => set.add(h));
      if (b.rows) b.rows.flat().forEach((c) => set.add(c));
    }
  }
  return [...set];
}

function saveMap(mapPath, map) {
  fs.writeFileSync(mapPath, JSON.stringify(map, null, 2) + '\n', 'utf8');
}

async function buildMap(strings, to, mapPath) {
  const map = fs.existsSync(mapPath) ? JSON.parse(fs.readFileSync(mapPath, 'utf8')) : {};
  const pending = strings.filter((s) => !map[s] && !/^\d+\s*min read$/i.test(s));
  console.log(`  ${to}: ${Object.keys(map).length} cached, ${pending.length} pending`);
  let done = 0;
  for (const s of pending) {
    try {
      map[s] = await translateWithLinks(s, to);
    } catch (e) {
      console.error('FAIL', s.slice(0, 60), e.message);
      saveMap(mapPath, map);
      throw e;
    }
    done++;
    if (done % 10 === 0) {
      saveMap(mapPath, map);
      console.log(`  ${to}: +${done}/${pending.length}`);
    }
    await new Promise((r) => setTimeout(r, SLEEP_MS));
  }
  saveMap(mapPath, map);
  return map;
}

const en = JSON.parse(fs.readFileSync(path.join(__dirname, 'en-posts.json'), 'utf8'));
const strings = collectStrings(en);
console.log(`Total unique strings: ${strings.length}`);

const koPath = path.join(__dirname, 'ko-string-map.json');
const zhPath = path.join(__dirname, 'zh-tw-string-map.json');

console.log('Korean (ko)...');
await buildMap(strings, 'ko', koPath);

console.log('Traditional Chinese (zh-Hant)...');
await buildMap(strings, 'zh-Hant', zhPath);

console.log('Done.');
