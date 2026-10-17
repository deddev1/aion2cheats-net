import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const en = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/blog-i18n/en-posts.json'), 'utf8'));
const dict = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/blog-i18n/dict-pt-br.json'), 'utf8'));

const TAG = {
  Guides: 'Guias',
  Setup: 'Instalação',
  Features: 'Recursos',
  Updates: 'Atualizações',
  Troubleshooting: 'Solução de problemas',
};

function readTimePt(enRt) {
  const n = (enRt.match(/(\d+)/) || ['0'])[1];
  return `${n} min de leitura`;
}

function lookup(s) {
  if (dict[s] === undefined) throw new Error(`Missing: ${s.slice(0, 80)}`);
  return dict[s];
}

function trBlock(block) {
  switch (block.type) {
    case 'p':
    case 'h2':
    case 'h3':
      return { type: block.type, text: lookup(block.text) };
    case 'ul':
      return { type: 'ul', items: block.items.map(lookup) };
    case 'table':
      return {
        type: 'table',
        headers: block.headers.map(lookup),
        rows: block.rows.map((row) => row.map(lookup)),
      };
    case 'cta':
      return {
        type: 'cta',
        title: lookup(block.title),
        text: lookup(block.text),
        href: block.href,
      };
    default:
      throw new Error(`Unknown ${block.type}`);
  }
}

const out = {};
for (const post of en) {
  out[post.slug] = {
    title: lookup(post.title),
    desc: lookup(post.desc),
    tag: TAG[post.tag] ?? post.tag,
    readTime: readTimePt(post.readTime),
    body: post.body.map(trBlock),
  };
}

const outPath = path.join(ROOT, 'scripts/blog-i18n/pt-br.json');
fs.writeFileSync(outPath, `${JSON.stringify(out, null, 2)}\n`, 'utf8');
console.log(`Wrote ${outPath} (${Object.keys(out).length} posts)`);

const gen = spawnSync('node', ['scripts/generate-blog-locale.mjs', 'pt-br', outPath], {
  cwd: ROOT,
  stdio: 'inherit',
});
process.exit(gen.status ?? 1);
