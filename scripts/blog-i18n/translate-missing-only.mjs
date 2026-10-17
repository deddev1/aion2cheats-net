import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '../..');
const locale = process.argv[2];
if (!locale) {
  console.error('Usage: node translate-missing-only.mjs <th|ja>');
  process.exit(1);
}

const strings = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/blog-i18n/_unique-strings.json'), 'utf8'));
const dictPath = path.join(ROOT, `scripts/blog-i18n/dict-${locale}.json`);
const dict = fs.existsSync(dictPath) ? JSON.parse(fs.readFileSync(dictPath, 'utf8')) : {};

const LINK_RE = /(\[[^\]]+\]\([^)]+\))/g;

function splitLinks(text) {
  const parts = [];
  let last = 0;
  const re = new RegExp(LINK_RE.source, 'g');
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push({ kind: 'text', value: text.slice(last, m.index) });
    parts.push({ kind: 'link', value: m[1] });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ kind: 'text', value: text.slice(last) });
  if (!parts.length) parts.push({ kind: 'text', value: text });
  return parts;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function translateMyMemory(text, target) {
  const url = new URL('https://api.mymemory.translated.net/get');
  url.searchParams.set('q', text);
  url.searchParams.set('langpair', `en|${target}`);
  const res = await fetch(url);
  const data = await res.json();
  if (data.responseStatus !== 200) throw new Error(String(data.responseStatus));
  return data.responseData.translatedText;
}

async function translatePart(text, target) {
  if (!text.trim()) return text;
  for (let i = 0; i < 10; i++) {
    try {
      return await translateMyMemory(text, target);
    } catch {
      await sleep(5000 * (i + 1));
    }
  }
  throw new Error('failed part');
}

async function translateString(text, target) {
  const parts = splitLinks(text);
  const out = [];
  for (const p of parts) {
    if (p.kind === 'link') {
      const inner = p.value.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (!inner) {
        out.push(p.value);
        continue;
      }
      const trLabel = await translatePart(inner[1], target);
      out.push(`[${trLabel}](${inner[2]})`);
    } else {
      out.push(await translatePart(p.value, target));
    }
    await sleep(1200);
  }
  return out.join('');
}

const missing = strings.filter((s) => !dict[s]);
console.log(`Missing ${missing.length} for ${locale}`);
let n = 0;
for (const s of missing) {
  n += 1;
  process.stderr.write(`\r${locale} ${n}/${missing.length}`);
  dict[s] = await translateString(s, locale);
  fs.writeFileSync(dictPath, `${JSON.stringify(dict, null, 2)}\n`, 'utf8');
}
process.stderr.write('\n');
console.log('Done');
