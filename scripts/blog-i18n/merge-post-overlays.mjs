/**
 * Merge per-post overlay JSON files into ko.json / zh-tw.json
 * Usage: node merge-post-overlays.mjs ko
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const locale = process.argv[2];
if (!locale) {
  console.error('Usage: node merge-post-overlays.mjs <ko|zh-tw>');
  process.exit(1);
}

const dir = path.join(__dirname, 'overlays', locale);
if (!fs.existsSync(dir)) {
  console.error('Missing overlay dir', dir);
  process.exit(1);
}

const en = JSON.parse(fs.readFileSync(path.join(__dirname, 'en-posts.json'), 'utf8'));
const merged = {};
for (const post of en) {
  const f = path.join(dir, `${post.slug}.json`);
  if (!fs.existsSync(f)) {
    console.error('Missing overlay', f);
    process.exit(1);
  }
  merged[post.slug] = JSON.parse(fs.readFileSync(f, 'utf8'));
}

const out = path.join(__dirname, `${locale}.json`);
fs.writeFileSync(out, JSON.stringify(merged, null, 2) + '\n', 'utf8');
console.log(`Wrote ${out} (${Object.keys(merged).length} posts)`);
