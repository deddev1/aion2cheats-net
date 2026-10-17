import fs from 'node:fs';
const en = JSON.parse(fs.readFileSync('scripts/blog-i18n/en-posts.json', 'utf8'));
const cache = JSON.parse(fs.readFileSync('scripts/blog-i18n/._cache-de.json', 'utf8'));
const set = new Set();
function walk(b) {
  if (b.text) set.add(b.text);
  if (b.title) set.add(b.title);
  if (b.type === 'cta') set.add(b.text);
  if (b.items) b.items.forEach((x) => set.add(x));
  if (b.headers) b.headers.forEach((x) => set.add(x));
  if (b.rows) b.rows.forEach((r) => r.forEach((x) => set.add(x)));
}
for (const p of en) {
  set.add(p.title);
  set.add(p.desc);
  p.body.forEach(walk);
}
const missing = [...set].filter((s) => !cache[s] && !/^\/[\w\-/.]+$/.test(s));
console.log('missing', missing.length);
fs.writeFileSync('scripts/blog-i18n/_missing-de.json', JSON.stringify(missing, null, 2));
