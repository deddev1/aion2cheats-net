/**
 * Last resort: map missing JA keys using dict-th text run through a minimal EN glossary
 * when bulk files incomplete. Prefer manual ja-bulk-*.json.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '../..');
const dir = path.join(ROOT, 'scripts/blog-i18n');
const enStrings = JSON.parse(fs.readFileSync(path.join(dir, '_unique-strings.json'), 'utf8'));
const th = JSON.parse(fs.readFileSync(path.join(dir, 'dict-th.json'), 'utf8'));
let ja = JSON.parse(fs.readFileSync(path.join(dir, 'dict-ja.json'), 'utf8'));

for (const f of fs.readdirSync(dir).filter((x) => x.startsWith('ja-bulk-') && x.endsWith('.json'))) {
  Object.assign(ja, JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));
}

const missing = enStrings.filter((s) => !ja[s]);
if (!missing.length) {
  fs.writeFileSync(path.join(dir, 'dict-ja.json'), `${JSON.stringify(ja, null, 2)}\n`, 'utf8');
  console.log('dict-ja complete', Object.keys(ja).length);
  process.exit(0);
}

console.error('Still missing', missing.length, '— add ja-bulk files');
process.exit(1);
