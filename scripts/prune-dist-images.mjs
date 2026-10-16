import fs from 'node:fs';
import path from 'node:path';
import { resolveDistDir } from './dist-dir.mjs';

/** Drop source PNGs from dist — pages serve WebP variants only. */
const distImages = path.join(resolveDistDir(), 'images');
let removed = 0;
let bytes = 0;

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    if (!/\.png$/i.test(entry.name)) continue;
    // Never prune dedicated share/brand assets (OG lives at /og.jpg outside images/).
    if (/^og[-.]/i.test(entry.name) || /share/i.test(entry.name)) continue;
    // Keep brand/favicon-sized assets if any land under images; gameplay/blog sources go.
    const stat = fs.statSync(full);
    if (stat.size < 80_000) continue;
    bytes += stat.size;
    fs.unlinkSync(full);
    removed += 1;
  }
}

walk(distImages);
console.log(
  `Pruned ${removed} source PNG(s) from dist/images (${(bytes / 1024 / 1024).toFixed(1)} MB).`,
);
