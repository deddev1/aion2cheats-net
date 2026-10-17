import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, 'map-parts');
const locale = process.argv[2];
if (!locale) {
  console.error('Usage: node merge-string-maps.mjs ko|zh-tw');
  process.exit(1);
}
const prefix = locale === 'ko' ? 'ko-' : 'zh-tw-';
const merged = {};
for (const f of fs.readdirSync(dir).sort()) {
  if (!f.startsWith(prefix) || !f.endsWith('.json')) continue;
  Object.assign(merged, JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));
}
const out = path.join(__dirname, `${locale}-string-map.json`);
fs.writeFileSync(out, JSON.stringify(merged, null, 2) + '\n', 'utf8');
console.log(`Merged ${Object.keys(merged).length} -> ${out}`);
