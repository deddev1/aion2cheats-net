import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const src = process.argv[2];
const outDir = process.argv[3] ?? path.resolve('public/images');

if (!src) {
  console.error('Usage: node scripts/make-hero-bg.mjs <source.jpg> [outDir]');
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

const meta = await sharp(src).metadata();
console.log('source', meta.width, meta.height, meta.format);

// Extra dark + dull: crush brightness, mute colour, soft contrast.
const pipeline = sharp(src)
  .resize(1920, null, { withoutEnlargement: true })
  .modulate({
    brightness: 0.28,
    saturation: 0.22,
  })
  .linear(0.75, -12)
  .blur(0.55);

const jpgPath = path.join(outDir, 'hero-aion-2-dark.jpg');
const webpPath = path.join(outDir, 'hero-aion-2-dark.webp');

await pipeline.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(jpgPath);
await pipeline.clone().webp({ quality: 72 }).toFile(webpPath);

console.log('wrote', jpgPath);
console.log('wrote', webpPath);
console.log(await sharp(webpPath).metadata());
