/**
 * Merge string caches/patches and write locale overlay JSON + run generator.
 * Usage: node scripts/blog-i18n/merge-build-locale.mjs de|pt-br
 */
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import { LOCALES, collectStrings, buildOverlay } from './auto-build-locales-core.mjs';

const locale = process.argv[2];
if (!LOCALES[locale]) {
  console.error('Usage: node merge-build-locale.mjs de|pt-br');
  process.exit(1);
}

const cfg = LOCALES[locale];
const cachePath = `scripts/blog-i18n/._cache-${locale}.json`;
const patchPath = `scripts/blog-i18n/_patch-${locale}.json`;

const map = new Map();
if (fs.existsSync(cachePath)) {
  Object.entries(JSON.parse(fs.readFileSync(cachePath, 'utf8'))).forEach(([k, v]) => map.set(k, v));
}
if (fs.existsSync(patchPath)) {
  Object.entries(JSON.parse(fs.readFileSync(patchPath, 'utf8'))).forEach(([k, v]) => map.set(k, v));
}

const strings = collectStrings();
const missing = strings.filter((s) => !map.has(s));
if (missing.length) {
  console.error(`Missing ${missing.length} strings for ${locale}. Add to ${patchPath} or cache.`);
  fs.writeFileSync(`scripts/blog-i18n/_missing-${locale}.json`, JSON.stringify(missing, null, 2));
  process.exit(1);
}

const data = buildOverlay(map, cfg);
const outFile = `scripts/blog-i18n/${cfg.file}`;
fs.writeFileSync(outFile, JSON.stringify(data, null, 2), 'utf8');
console.log(`Wrote ${outFile} (${Object.keys(data).length} posts)`);

const gen = spawnSync('node', ['scripts/generate-blog-locale.mjs', locale, outFile], {
  stdio: 'inherit',
  cwd: process.cwd(),
});
process.exit(gen.status ?? 1);
