/**
 * Build dict-pt-br.json via Bing Translator (resume-safe).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { translate } from 'bing-translate-api';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SLEEP_MS = 400;
const KEEP = /^(Lite|Pro|Elite|ESP|HWID|NCSOFT|Discord|OBS|Aion 2|Unlock All|UGC)$/i;

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

async function trPlain(text) {
  if (!text.trim()) return text;
  const res = await translate(text, 'en', 'pt');
  return res.translation;
}

async function translateWithLinks(text) {
  const chunks = splitLinks(text);
  const out = [];
  for (const c of chunks) {
    if (c.t === 'plain') out.push(await trPlain(c.v));
    else {
      const label = KEEP.test(c.label.trim()) ? c.label : await trPlain(c.label);
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
    for (const b of p.body) {
      if (b.text) set.add(b.text);
      if (b.title) set.add(b.title);
      if (b.type === 'cta') {
        set.add(b.title);
        set.add(b.text);
      }
      if (b.items) b.items.forEach((i) => set.add(i));
      if (b.headers) b.headers.forEach((h) => set.add(h));
      if (b.rows) b.rows.flat().forEach((c) => set.add(c));
    }
  }
  return [...set].filter((s) => !/^\d+\s*min read$/i.test(s) && !/^\/[\w\-/.]+$/.test(s));
}

const en = JSON.parse(fs.readFileSync(path.join(__dirname, 'en-posts.json'), 'utf8'));
const strings = collectStrings(en);
const mapPath = path.join(__dirname, 'dict-pt-br.json');
const map = fs.existsSync(mapPath) ? JSON.parse(fs.readFileSync(mapPath, 'utf8')) : {};
const pending = strings.filter((s) => !map[s]);
console.log(`pt-br: ${Object.keys(map).length} cached, ${pending.length} pending`);

for (let i = 0; i < pending.length; i++) {
  const s = pending[i];
  try {
    map[s] = await translateWithLinks(s);
  } catch (e) {
    fs.writeFileSync(mapPath, `${JSON.stringify(map, null, 2)}\n`, 'utf8');
    console.error('FAIL at', i, s.slice(0, 60), e.message);
    process.exit(1);
  }
  if ((i + 1) % 10 === 0) {
    fs.writeFileSync(mapPath, `${JSON.stringify(map, null, 2)}\n`, 'utf8');
    console.log(`+${i + 1}/${pending.length}`);
  }
  await new Promise((r) => setTimeout(r, SLEEP_MS));
}
fs.writeFileSync(mapPath, `${JSON.stringify(map, null, 2)}\n`, 'utf8');
console.log('Wrote', mapPath, Object.keys(map).length);
