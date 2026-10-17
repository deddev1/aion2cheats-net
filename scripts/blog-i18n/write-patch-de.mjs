import fs from 'node:fs';
import { PATCH } from './patch-de-translations.mjs';

const missing = JSON.parse(fs.readFileSync('scripts/blog-i18n/_missing-de.json', 'utf8'));
const out = {};
const notFound = [];
for (const s of missing) {
  if (PATCH[s]) out[s] = PATCH[s];
  else notFound.push(s);
}
if (notFound.length) {
  console.error('Missing PATCH entries:', notFound.length);
  notFound.forEach((s) => console.error(' -', s.slice(0, 100)));
  process.exit(1);
}
fs.writeFileSync('scripts/blog-i18n/_patch-de.json', JSON.stringify(out, null, 2), 'utf8');
console.log('Wrote _patch-de.json', Object.keys(out).length);
