import fs from 'node:fs';
import path from 'node:path';
import { translate } from '@vitalets/google-translate-api';

const ROOT = path.resolve(import.meta.dirname, '../..');
const chunkIdx = Number(process.argv[2] ?? 0);
const chunkPath = path.join(ROOT, `scripts/blog-i18n/_ja-chunk-${chunkIdx}.json`);
const outPath = path.join(ROOT, `scripts/blog-i18n/ja-bulk-${chunkIdx}.json`);

const strings = JSON.parse(fs.readFileSync(chunkPath, 'utf8'));
const bulk = fs.existsSync(outPath) ? JSON.parse(fs.readFileSync(outPath, 'utf8')) : {};

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
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function tr(text, attempt = 0) {
  try {
    return (await translate(text, { from: 'en', to: 'ja' })).text;
  } catch (e) {
    if (attempt < 10) {
      await sleep(30000 + attempt * 15000);
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
      out.push(`[${await tr(inner[1])}](${inner[2]})`);
    } else {
      out.push(await tr(p.value));
    }
    await sleep(5000);
  }
  return out.join('');
}

let n = 0;
for (const s of strings) {
  if (bulk[s]) continue;
  n += 1;
  process.stderr.write(`\rchunk ${chunkIdx} ${n}/${strings.length}`);
  bulk[s] = await translateString(s);
  fs.writeFileSync(outPath, `${JSON.stringify(bulk, null, 2)}\n`, 'utf8');
}
console.log(`\nWrote ${outPath} (${Object.keys(bulk).length})`);
