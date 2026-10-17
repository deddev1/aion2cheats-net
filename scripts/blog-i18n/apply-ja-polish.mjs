import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '../..');
const dir = path.join(ROOT, 'scripts/blog-i18n');
const ja = JSON.parse(fs.readFileSync(path.join(dir, 'dict-ja.json'), 'utf8'));
const polish = JSON.parse(fs.readFileSync(path.join(dir, 'ja-meta-polish.json'), 'utf8'));
Object.assign(ja, polish);
fs.writeFileSync(path.join(dir, 'dict-ja.json'), `${JSON.stringify(ja, null, 2)}\n`, 'utf8');
console.log('Polished', Object.keys(polish).length, 'strings');
