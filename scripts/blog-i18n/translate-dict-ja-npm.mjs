import fs from 'node:fs';
import path from 'node:path';
import { translate } from '@vitalets/google-translate-api';

const ROOT = path.resolve(import.meta.dirname, '../..');
const strings = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'scripts/blog-i18n/_unique-strings.json'), 'utf8'),
);
const dictPath = path.join(ROOT, 'scripts/blog-i18n/dict-ja.json');
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

async function tr(text, attempt = 0) {
  try {
    const { text: out } = await translate(text, { from: 'en', to: 'ja' });
    return out;
  } catch (e) {
    if (attempt < 8) {
      await sleep(15000 * (attempt + 1));
      return tr(text, attempt + 1);
    }
    throw e;
  }
}

async function translateString(text) {
  const parts = splitLinks(text);
  const out = [];
  for (const p of parts) {
    if (p.kind === 'link') {
      const inner = p.value.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (!inner) {
        out.push(p.value);
        continue;
      }
      const trLabel = await tr(inner[1]);
      out.push(`[${trLabel}](${inner[2]})`);
    } else {
      out.push(await tr(p.value));
    }
    await sleep(12000);
  }
  return out.join('');
}

let n = 0;
for (const s of strings) {
  if (dict[s]) continue;
  n += 1;
  process.stderr.write(`\rja ${n}/${strings.length - Object.keys(dict).length}`);
  try {
    dict[s] = await translateString(s);
  } catch (e) {
    console.error('\nFail:', s.slice(0, 60), e.message);
    fs.writeFileSync(dictPath, `${JSON.stringify(dict, null, 2)}\n`, 'utf8');
    throw e;
  }
  if (n % 3 === 0) fs.writeFileSync(dictPath, `${JSON.stringify(dict, null, 2)}\n`, 'utf8');
}
process.stderr.write('\n');
fs.writeFileSync(dictPath, `${JSON.stringify(dict, null, 2)}\n`, 'utf8');
console.log(`Wrote ${Object.keys(dict).length} entries`);
