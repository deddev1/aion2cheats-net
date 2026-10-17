/**
 * Machine-translate unique EN strings to TH/JA with markdown link preservation.
 * Run once: node scripts/blog-i18n/translate-dicts.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '../..');
const strings = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'scripts/blog-i18n/_unique-strings.json'), 'utf8'),
);

const LINK_RE = /(\[[^\]]+\]\([^)]+\))/g;

function splitLinks(text) {
  const parts = [];
  let last = 0;
  let m;
  const re = new RegExp(LINK_RE.source, 'g');
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push({ kind: 'text', value: text.slice(last, m.index) });
    parts.push({ kind: 'link', value: m[1] });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ kind: 'text', value: text.slice(last) });
  if (parts.length === 0) parts.push({ kind: 'text', value: text });
  return parts;
}

async function translateMyMemory(text, target) {
  const langpair = `en|${target}`;
  const url = new URL('https://api.mymemory.translated.net/get');
  url.searchParams.set('q', text);
  url.searchParams.set('langpair', langpair);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`MyMemory HTTP ${res.status}`);
  const data = await res.json();
  if (data.responseStatus !== 200 || !data.responseData?.translatedText) {
    throw new Error(`MyMemory bad response ${data.responseStatus}`);
  }
  return data.responseData.translatedText;
}

async function translateGoogle(text, target, attempt = 0) {
  const url = new URL('https://translate.googleapis.com/translate_a/single');
  url.searchParams.set('client', 'gtx');
  url.searchParams.set('sl', 'en');
  url.searchParams.set('tl', target);
  url.searchParams.set('dt', 't');
  url.searchParams.set('q', text);
  const res = await fetch(url);
  if (!res.ok) {
    if (attempt < 8 && (res.status === 429 || res.status >= 500)) {
      await sleep(res.status === 429 ? 8000 + attempt * 4000 : 1000 * (attempt + 1));
      return translateGoogle(text, target, attempt + 1);
    }
    throw new Error(`Translate HTTP ${res.status}`);
  }
  const data = await res.json();
  return data[0].map((row) => row[0]).join('');
}

async function translateText(text, target) {
  if (!text.trim()) return text;
  const chunkSize = 450;
  if (text.length > chunkSize) {
    const parts = [];
    for (let i = 0; i < text.length; i += chunkSize) {
      parts.push(await translateText(text.slice(i, i + chunkSize), target));
      await sleep(200);
    }
    return parts.join('');
  }
  for (let attempt = 0; attempt < 8; attempt++) {
    try {
      return await translateMyMemory(text, target);
    } catch {
      await sleep(3000 * (attempt + 1));
    }
  }
  for (let attempt = 0; attempt < 8; attempt++) {
    try {
      return await translateGoogle(text, target);
    } catch {
      await sleep(10000 * (attempt + 1));
    }
  }
  throw new Error(`All providers failed for: ${text.slice(0, 60)}…`);
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
      const [, label, href] = inner;
      const trLabel = await translateText(label, target);
      out.push(`[${trLabel}](${href})`);
      await sleep(800);
    } else {
      out.push(await translateText(p.value, target));
      await sleep(800);
    }
  }
  return out.join('');
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function buildDict(target, outFile) {
  let dict = {};
  if (fs.existsSync(outFile)) {
    dict = JSON.parse(fs.readFileSync(outFile, 'utf8'));
  }
  let i = 0;
  for (const s of strings) {
    i += 1;
    if (dict[s]) continue;
    process.stderr.write(`\r${target} ${i}/${strings.length}`);
    try {
      dict[s] = await translateString(s, target);
    } catch (err) {
      console.error(`\nFailed [${target}] string #${i}:`, err.message);
      fs.writeFileSync(outFile, `${JSON.stringify(dict, null, 2)}\n`, 'utf8');
      throw err;
    }
    if (i % 3 === 0) {
      fs.writeFileSync(outFile, `${JSON.stringify(dict, null, 2)}\n`, 'utf8');
    }
  }
  process.stderr.write('\n');
  fs.writeFileSync(outFile, `${JSON.stringify(dict, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${outFile}`);
}

const only = process.argv[2];
if (!only || only === 'th') {
  await buildDict('th', path.join(ROOT, 'scripts/blog-i18n/dict-th.json'));
}
if (!only || only === 'ja') {
  await buildDict('ja', path.join(ROOT, 'scripts/blog-i18n/dict-ja.json'));
}
