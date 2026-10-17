/**
 * Merge ._cache-{locale}.json + _patch-{locale}.json → {locale}.json
 */
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const ROOT = 'scripts/blog-i18n';
const en = JSON.parse(fs.readFileSync(`${ROOT}/en-posts.json`, 'utf8'));

const LOCALES = {
  de: {
    file: 'de.json',
    tags: {
      Guides: 'Guides',
      Setup: 'Setup',
      Features: 'Funktionen',
      Updates: 'Updates',
      Troubleshooting: 'Fehlerbehebung',
    },
    readTime: (n) => `${n} Min. Lesezeit`,
  },
  'pt-br': {
    file: 'pt-br.json',
    tags: {
      Guides: 'Guias',
      Setup: 'Instalação',
      Features: 'Recursos',
      Updates: 'Atualizações',
      Troubleshooting: 'Solução de problemas',
    },
    readTime: (n) => `${n} min de leitura`,
  },
};

function mapString(map, s) {
  if (s == null) return s;
  if (/^\/[\w\-/.]+$/.test(s)) return s;
  const v = map.get(s);
  if (v == null) throw new Error(`Missing translation: ${s.slice(0, 80)}`);
  return v;
}

function mapBlock(map, block) {
  const b = { type: block.type };
  if (block.type === 'ul') {
    b.items = block.items.map((x) => mapString(map, x));
    return b;
  }
  if (block.type === 'table') {
    b.headers = block.headers.map((x) => mapString(map, x));
    b.rows = block.rows.map((row) => row.map((x) => mapString(map, x)));
    return b;
  }
  if (block.type === 'cta') {
    b.title = mapString(map, block.title);
    b.text = mapString(map, block.text);
    b.href = block.href;
    return b;
  }
  if (block.text != null) b.text = mapString(map, block.text);
  return b;
}

function buildOverlay(map, cfg) {
  const out = {};
  for (const post of en) {
    const n = (post.readTime.match(/(\d+)/) || ['0'])[1];
    out[post.slug] = {
      title: mapString(map, post.title),
      desc: mapString(map, post.desc),
      tag: cfg.tags[post.tag] ?? post.tag,
      readTime: cfg.readTime(n),
      body: post.body.map((b) => mapBlock(map, b)),
    };
  }
  return out;
}

const locale = process.argv[2];
const cfg = LOCALES[locale];
if (!cfg) {
  console.error('Usage: node apply-patch-and-build.mjs de|pt-br');
  process.exit(1);
}

const map = new Map();
for (const p of [`${ROOT}/._cache-${locale}.json`, `${ROOT}/._cache-${locale === 'pt-br' ? 'pt' : locale}.json`, `${ROOT}/_patch-${locale}.json`]) {
  if (fs.existsSync(p)) Object.entries(JSON.parse(fs.readFileSync(p, 'utf8'))).forEach(([k, v]) => map.set(k, v));
}

const data = buildOverlay(map, cfg);
const outFile = `${ROOT}/${cfg.file}`;
fs.writeFileSync(outFile, JSON.stringify(data, null, 2), 'utf8');
console.log(`Wrote ${outFile} (${Object.keys(data).length} posts)`);

const gen = spawnSync('node', ['scripts/generate-blog-locale.mjs', locale, outFile], { stdio: 'inherit' });
process.exit(gen.status ?? 1);
