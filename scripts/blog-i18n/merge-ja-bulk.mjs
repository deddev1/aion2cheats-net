import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '../..');
const dir = path.join(ROOT, 'scripts/blog-i18n');
const ja = JSON.parse(fs.readFileSync(path.join(dir, 'dict-ja.json'), 'utf8'));
for (const f of fs.readdirSync(dir).filter((x) => x.startsWith('ja-bulk-') && x.endsWith('.json'))) {
  Object.assign(ja, JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));
}
fs.writeFileSync(path.join(dir, 'dict-ja.json'), `${JSON.stringify(ja, null, 2)}\n`, 'utf8');
const all = JSON.parse(fs.readFileSync(path.join(dir, '_unique-strings.json'), 'utf8'));
console.log(Object.keys(ja).length, '/', all.length, 'missing', all.filter((s) => !ja[s]).length);
