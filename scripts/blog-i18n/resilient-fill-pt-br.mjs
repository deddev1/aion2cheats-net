/**
 * Slowly fills ._cache-pt-br.json then writes pt-br.json (resumes on 429).
 */
import fs from 'node:fs';

const ROOT = 'scripts/blog-i18n';
const en = JSON.parse(fs.readFileSync(`${ROOT}/en-posts.json`, 'utf8'));

function collectStrings() {
  const set = new Set();
  const add = (s) => {
    if (typeof s === 'string' && s && !/^\/[\w\-/.]+$/.test(s)) set.add(s);
  };
  for (const post of en) {
    add(post.title);
    add(post.desc);
    for (const block of post.body) walkBlock(block, add);
  }
  return [...set];
}

function walkBlock(block, add) {
  if (block.text != null) add(block.text);
  if (block.title != null) add(block.title);
  if (block.type === 'cta') add(block.text);
  if (block.items) block.items.forEach(add);
  if (block.headers) block.headers.forEach(add);
  if (block.rows) block.rows.forEach((row) => row.forEach(add));
}

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

const KEEP = /^(Lite|Pro|Elite|ESP|HWID|NCSOFT|Discord|OBS|Aion 2|Unlock All|UGC)$/i;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function translatePlain(text) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(text)}`;
  for (let i = 0; i < 25; i++) {
    const res = await fetch(url);
    if (res.status === 429) {
      await sleep(15000 + i * 5000);
      continue;
    }
    if (!res.ok) await sleep(3000);
    else {
      const data = await res.json();
      return data[0].map((x) => x[0]).join('');
    }
  }
  throw new Error('translatePlain exhausted');
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
          await sleep(3500);
        }
        label = sub.get(k);
      }
      out.push(`[${label}](${t.href})`);
    } else {
      const k = `T:${t.value}`;
      if (!sub.has(k)) {
        sub.set(k, await translatePlain(t.value));
        await sleep(3500);
      }
      out.push(sub.get(k));
    }
  }
  return out.join('');
}

const strings = collectStrings();
const cachePath = `${ROOT}/._cache-pt-br.json`;
const cache = fs.existsSync(cachePath) ? JSON.parse(fs.readFileSync(cachePath, 'utf8')) : {};
const sub = new Map();

for (let i = 0; i < strings.length; i++) {
  const s = strings[i];
  if (cache[s]) continue;
  process.stderr.write(`\rpt-br ${i + 1}/${strings.length}`);
  for (;;) {
    try {
      cache[s] = await translateWithLinks(s, sub);
      fs.writeFileSync(cachePath, JSON.stringify(cache), 'utf8');
      break;
    } catch (e) {
      process.stderr.write(`\nretry ${s.slice(0, 50)}...\n`);
      await sleep(20000);
    }
  }
}
process.stderr.write('\ndone cache\n');

// build pt-br.json via apply script
import { spawnSync } from 'node:child_process';
const r = spawnSync('node', ['scripts/blog-i18n/apply-patch-and-build.mjs', 'pt-br'], { stdio: 'inherit' });
process.exit(r.status ?? 1);
