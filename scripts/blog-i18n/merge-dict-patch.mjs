import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '../..');
const locale = process.argv[2];
const patchMod = process.argv[3];
if (!locale || !patchMod) {
  console.error('Usage: node merge-dict-patch.mjs <th|ja> <patch-module.mjs>');
  process.exit(1);
}
const dictPath = path.join(ROOT, `scripts/blog-i18n/dict-${locale}.json`);
const dict = fs.existsSync(dictPath) ? JSON.parse(fs.readFileSync(dictPath, 'utf8')) : {};
const patch = (await import(pathToFileURL(path.join(ROOT, patchMod)).href)).default;
Object.assign(dict, patch);
fs.writeFileSync(dictPath, `${JSON.stringify(dict, null, 2)}\n`, 'utf8');
console.log(`Merged ${Object.keys(patch).length} keys → ${Object.keys(dict).length} total`);

function pathToFileURL(p) {
  const u = new URL('file:///');
  u.pathname = p.replace(/\\/g, '/');
  return u;
}
