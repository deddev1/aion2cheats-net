/**
 * EN → pt-BR via Google Translate, resume cache, then apply-patch-and-build.
 */
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const ROOT = 'scripts/blog-i18n';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function readJson(path) {
  return fs.existsSync(path) ? JSON.parse(fs.readFileSync(path, 'utf8')) : {};
}

const enKeys = Object.keys({
  ...readJson(`${ROOT}/._cache-de.json`),
  ...readJson(`${ROOT}/_patch-de.json`),
});

const outPath = `${ROOT}/._cache-pt-br.json`;
const ptMap = readJson(outPath);

const KEEP = /^(Lite|Pro|Elite|ESP|HWID|NCSOFT|Discord|OBS|Aion 2|Unlock All|UGC)$/i;

function tokenize(text) {
  const tokens = [];
  let last = 0;
  const re = /\[[^\]]+\]\([^)]+\)/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) tokens.push({ kind: 'text', value: text.slice(last, m.index) });
    const full = m[0];
    tokens.push({
      kind: 'link',
      label: full.slice(1, full.indexOf(']')),
      href: full.slice(full.indexOf('(') + 1, -1),
    });
    last = m.index + full.length;
  }
  if (last < text.length) tokens.push({ kind: 'text', value: text.slice(last) });
  if (!tokens.length) tokens.push({ kind: 'text', value: text });
  return tokens;
}

async function translatePlain(text) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(text)}`;
  for (let i = 0; i < 20; i++) {
    const res = await fetch(url);
    if (res.status === 429) {
      await sleep(10000 + i * 8000);
      continue;
    }
    if (!res.ok) {
      await sleep(4000);
      continue;
    }
    const data = await res.json();
    return data[0].map((x) => x[0]).join('');
  }
  throw new Error('translatePlain');
}

async function translateWithLinks(text, sub) {
  const out = [];
  for (const t of tokenize(text)) {
    if (t.kind === 'link') {
      let label = t.label;
      if (!KEEP.test(label.trim())) {
        const k = `L:${label}`;
        if (!sub.has(k)) {
          sub.set(k, await translatePlain(label));
          await sleep(2500);
        }
        label = sub.get(k);
      }
      out.push(`[${label}](${t.href})`);
    } else {
      const k = `T:${t.value}`;
      if (!sub.has(k)) {
        sub.set(k, await translatePlain(t.value));
        await sleep(2500);
      }
      out.push(sub.get(k));
    }
  }
  return out.join('');
}

const sub = new Map();
for (let i = 0; i < enKeys.length; i++) {
  const en = enKeys[i];
  if (ptMap[en]) continue;
  process.stderr.write(`\rpt-br ${i + 1}/${enKeys.length}`);
  for (;;) {
    try {
      ptMap[en] = await translateWithLinks(en, sub);
      fs.writeFileSync(outPath, JSON.stringify(ptMap), 'utf8');
      break;
    } catch {
      await sleep(30000);
    }
  }
}
process.stderr.write('\n');

const r = spawnSync('node', ['scripts/blog-i18n/apply-patch-and-build.mjs', 'pt-br'], { stdio: 'inherit' });
process.exit(r.status ?? 1);
