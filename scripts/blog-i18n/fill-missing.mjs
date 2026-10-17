import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = path.resolve(import.meta.dirname, '../..');
const locale = process.argv[2];
const patchPath = process.argv[3];
if (!locale || !patchPath) {
  console.error('Usage: node fill-missing.mjs <th|ja> <patch.json>');
  process.exit(1);
}
const dictPath = path.join(ROOT, `scripts/blog-i18n/dict-${locale}.json`);
const dict = fs.existsSync(dictPath) ? JSON.parse(fs.readFileSync(dictPath, 'utf8')) : {};
const patch = JSON.parse(fs.readFileSync(path.join(ROOT, patchPath), 'utf8'));
Object.assign(dict, patch);
fs.writeFileSync(dictPath, `${JSON.stringify(dict, null, 2)}\n`, 'utf8');
const all = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/blog-i18n/_unique-strings.json'), 'utf8'));
const miss = all.filter((s) => !dict[s]);
console.log(`dict-${locale}.json: ${Object.keys(dict).length}/${all.length}, still missing ${miss.length}`);
