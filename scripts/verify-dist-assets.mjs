/**
 * Fail the build if dist HTML/XML/JSON still points at missing files
 * (e.g. source PNGs deleted by prune-dist-images).
 */
import fs from 'node:fs';
import path from 'node:path';
import { resolveDistDir } from './dist-dir.mjs';

const dist = resolveDistDir();
const SITE = 'https://aion2cheats.net';

const textFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    if (/\.(html|xml|json|webmanifest|txt|css|js|svg)$/i.test(entry.name)) {
      textFiles.push(full);
    }
  }
}
walk(dist);

/** @type {Set<string>} */
const assets = new Set();
/** @type {string[]} */
const pngRefs = [];

function consider(raw, file) {
  if (!raw) return;
  let value = raw.trim().replace(/^['"]|['"]$/g, '');
  if (
    !value ||
    value.startsWith('data:') ||
    value.startsWith('mailto:') ||
    value.startsWith('tel:') ||
    value.startsWith('#') ||
    value.startsWith('blob:')
  ) {
    return;
  }
  if (value.startsWith(SITE)) value = value.slice(SITE.length);
  if (/^https?:\/\//i.test(value)) return;
  if (!value.startsWith('/')) return;
  value = value.split('?')[0].split('#')[0];
  if (!/\.(png|jpe?g|webp|gif|svg|ico|xml|txt|webmanifest|json|css|js|woff2?|map)$/i.test(value)) {
    return;
  }
  assets.add(value);
  if (/^\/images\/.+\.png$/i.test(value)) {
    pngRefs.push(`${path.relative(dist, file)} → ${value}`);
  }
}

for (const file of textFiles) {
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(/(?:href|src|content)=["']([^"']+)["']/g)) {
    consider(match[1], file);
  }
  for (const match of text.matchAll(/url\(([^)]+)\)/g)) {
    consider(match[1], file);
  }
  for (const match of text.matchAll(/srcset=["']([^"']+)["']/g)) {
    for (const part of match[1].split(',')) {
      consider(part.trim().split(/\s+/)[0], file);
    }
  }
  for (const match of text.matchAll(/"image"\s*:\s*"([^"]+)"/g)) {
    consider(match[1], file);
  }
  for (const match of text.matchAll(/https:\/\/aion2cheats\.net(\/[^"<\s]+)/g)) {
    consider(match[1], file);
  }
}

const missing = [];
for (const asset of assets) {
  const disk = path.join(dist, asset.replace(/^\//, '').replace(/\//g, path.sep));
  if (!fs.existsSync(disk)) missing.push(asset);
}

const required = ['/og.jpg', '/logo.svg', '/favicon.ico', '/robots.txt', '/sitemap.xml'];
for (const req of required) {
  const disk = path.join(dist, req.replace(/^\//, '').replace(/\//g, path.sep));
  if (!fs.existsSync(disk)) missing.push(`required:${req}`);
}

let failed = false;
if (pngRefs.length) {
  failed = true;
  console.error(
    `verify-dist-assets: ${pngRefs.length} pruned /images/*.png ref(s) still in dist output:`,
  );
  for (const line of pngRefs.slice(0, 40)) console.error(`  ${line}`);
}
if (missing.length) {
  failed = true;
  console.error(`verify-dist-assets: ${missing.length} missing asset(s):`);
  for (const line of missing.slice(0, 40)) console.error(`  ${line}`);
}

if (failed) process.exit(1);

console.log(
  `verify-dist-assets: ok (${assets.size} assets, 0 missing, 0 /images/*.png refs)`,
);
