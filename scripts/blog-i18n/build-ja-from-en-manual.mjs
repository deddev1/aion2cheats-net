/**
 * Build dict-ja.json from English strings using dict-th.json as timing reference
 * and inline JA translations loaded from ja-bulk.json (en -> ja map).
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '../..');
const enStrings = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'scripts/blog-i18n/_unique-strings.json'), 'utf8'),
);
const bulkPath = path.join(ROOT, 'scripts/blog-i18n/ja-bulk.json');
const partialPath = path.join(ROOT, 'scripts/blog-i18n/dict-ja.json');

const bulk = fs.existsSync(bulkPath) ? JSON.parse(fs.readFileSync(bulkPath, 'utf8')) : {};
const dict = fs.existsSync(partialPath) ? JSON.parse(fs.readFileSync(partialPath, 'utf8')) : {};

for (const s of enStrings) {
  if (dict[s]) continue;
  if (bulk[s]) dict[s] = bulk[s];
}

fs.writeFileSync(partialPath, `${JSON.stringify(dict, null, 2)}\n`, 'utf8');
const miss = enStrings.filter((s) => !dict[s]);
console.log(`dict-ja: ${Object.keys(dict).length}/${enStrings.length}, missing ${miss.length}`);
