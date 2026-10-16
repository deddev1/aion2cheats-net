/**
 * Import Aion 2 cheat screenshots into public/images (gameplay + blog),
 * then write SEO-named PNGs with accurate alt metadata.
 *
 * Run: node scripts/import-user-gameplay.mjs && npm run optimize:images
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const assetsDir =
  'C:\\Users\\3Tee System\\.cursor\\projects\\c-Users-3Tee-System-Downloads-aion2cheats-net-main\\assets';
const importDir = path.resolve('_import');
const gameplayDir = path.resolve('public/images/gameplay');
const blogDir = path.resolve('public/images/blog');

/** Preferred shot order (newest cliffside → night wings). */
const SOURCE_ORDER = [
  '073343', // sunny cliff + inventory + On task bot
  '073149', // rocky outpost + On task bot
  '073011', // extraction reward + Leveling worker
  '072947', // dialogue scene + bot overlay
  '072927', // night wings/portal + Leveling worker
];

const GAMEPLAY = [
  {
    file: 'aion-2-esp-wallhack.png',
    alt: 'Aion 2 cheat gameplay with leveling bot panel open beside players on a sunny cliff overlooking a valley',
    caption: 'Leveling bot',
    captionDesc: 'On-task leveling panel with players gathered on a cliff.',
  },
  {
    file: 'aion-2-skill-script.png',
    alt: 'Aion 2 automated quest bot overlay showing target level 45 skill upgrades and healing potion settings',
    caption: 'Quest automation',
    captionDesc: 'Target level, skill upgrades and potion restock controls.',
  },
  {
    file: 'aion-2-player-esp.png',
    alt: 'Aion 2 players and mounts in a rocky outpost with an active cheat leveling menu on the left',
    caption: 'Open-world bot',
    captionDesc: 'Leveling worker active near players and mounts.',
  },
  {
    file: 'aion-2-radar-hack.png',
    alt: 'Aion 2 cheat menu with Abyss-ready leveling settings while characters stand in a dark rocky zone',
    caption: 'Bot controls',
    captionDesc: 'Full leveling worker panel over rocky open-world terrain.',
  },
  {
    file: 'aion-2-auto-aim.png',
    alt: 'Aion 2 extraction reward popup with leveling worker cheat overlay and chat showing Kinah and quest loot',
    caption: 'Loot & extraction',
    captionDesc: 'Extraction results with bot panel and quest loot chat.',
  },
  {
    file: 'aion-2-loot-radar.png',
    alt: 'Aion 2 inventory and gem tooltip open while the On task cheat bot manages restock and market options',
    caption: 'Farm assist',
    captionDesc: 'Inventory, restock and market automation during farming.',
  },
  {
    file: 'aion-2-costume-changer.png',
    alt: 'Aion 2 dialogue scene with purple cheat overlay waiting for game API bindings during a quest cutscene',
    caption: 'Quest bot',
    captionDesc: 'Bot stays loaded through NPC dialogue and cutscenes.',
  },
  {
    file: 'aion-2-thermal-esp.png',
    alt: 'Aion 2 night scene with winged character near a glowing portal and leveling worker cheat menu running',
    caption: 'Flight zone bot',
    captionDesc: 'Leveling worker active near portal and winged players.',
  },
  {
    file: 'aion-2-instance-esp.png',
    alt: 'Aion 2 cheat gameplay showing Start Stop Pause bot controls beside the native hotbar and HP MP bars',
    caption: 'One-click start',
    captionDesc: 'Start, stop and pause controls beside the Aion 2 hotbar.',
  },
  {
    file: 'aion-2-abyss-wallhack.png',
    alt: 'Aion 2 multiplayer gathering on a grassy cliff with On task bot prioritizing feathers skills and equipment',
    caption: 'Group farming',
    captionDesc: 'Feather priority, skill upgrades and equipment automation.',
  },
  {
    file: 'aion-2-spawn-esp.png',
    alt: 'Aion 2 starting-area gameplay with leveling bot target level 45 and main quest until level enabled',
    caption: 'Main quest bot',
    captionDesc: 'Main-quest leveling path set to target level 45.',
  },
  {
    file: 'aion-2-long-range-esp.png',
    alt: 'Aion 2 open-world cheat overlay with recovery profile Aether Energy and market listing options visible',
    caption: 'Recovery profile',
    captionDesc: 'Recovery, Aether Energy and market listing options.',
  },
  {
    file: 'aion-2-aimbot-lock.png',
    alt: 'Aion 2 cheat panel in validation mode with leveling worker started and Portuguese quest tracker on screen',
    caption: 'Validation mode',
    captionDesc: 'Leveling worker started in validation mode.',
  },
  {
    file: 'aion-2-chams-esp.png',
    alt: 'Aion 2 cave dialogue with blonde NPC Niror and purple automation menu for potions and quest recovery',
    caption: 'Cutscene-safe bot',
    captionDesc: 'Automation stays up during contaminated-zone dialogue.',
  },
  {
    file: 'aion-2-group-esp.png',
    alt: 'Aion 2 players with glowing wings near a temporary investigation base while cheat leveling settings stay open',
    caption: 'Winged party',
    captionDesc: 'Party near portal with live leveling worker settings.',
  },
  {
    file: 'aion-2-combat-esp.png',
    alt: 'Aion 2 combat-ready hotbar and chat log with Kinah rewards while the On task cheat bot panel remains visible',
    caption: 'Live session',
    captionDesc: 'Hotbar, Kinah chat and On task bot in one session.',
  },
];

const BLOG = [
  'aion-2-training-guide.png',
  'aion-2-training-tips.png',
  'how-to-use-aion-2-cheat-codes.png',
  'aion-2-cheats-features-guide.png',
  'aion-2-training-vs-pvp.png',
  'aion-2-lite-vs-pro.png',
  'aion-2-elite-tier-guide.png',
  'aion-2-aimbot-pvp-guide.png',
  'aion-2-esp-wallhack-setup.png',
  'aion-2-radar-hack-guide.png',
  'aion-2-costume-changer-guide.png',
  'anticheat-patch-day-checklist.png',
  'aion-2-hwid-spoofer-after-ban.png',
  'how-to-buy-aion-2-cheats-2026.png',
  'aion-2-skill-script-guide.png',
  'anticheat-bypass-aion-2-guide.png',
  'aion-2-external-cheat-guide.png',
  'aion-2-stream-proof-setup.png',
];

function longPath(p) {
  const resolved = path.resolve(p);
  if (resolved.startsWith('\\\\?\\')) return resolved;
  return `\\\\?\\${resolved}`;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function listAssetImages() {
  const entries = fs.readdirSync(longPath(assetsDir));
  const images = entries.filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
  const ordered = [];
  for (const key of SOURCE_ORDER) {
    const match = images.find((f) => f.includes(key));
    if (match) ordered.push(match);
  }
  for (const f of images.sort()) {
    if (!ordered.includes(f)) ordered.push(f);
  }
  return ordered;
}

async function writeResizedPng(src, dest) {
  const buf = await sharp(src)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .png({ compressionLevel: 8, quality: 90 })
    .toBuffer();
  fs.writeFileSync(dest, buf);
  console.log('wrote', path.relative(process.cwd(), dest), `${Math.round(buf.length / 1024)}KB`);
}

ensureDir(importDir);
ensureDir(gameplayDir);
ensureDir(blogDir);

const sources = listAssetImages();
console.log(`Found ${sources.length} source screenshots`);

const shortFiles = [];
for (let i = 0; i < sources.length; i++) {
  const name = sources[i];
  const short = `shot-${String(i + 1).padStart(2, '0')}${path.extname(name).toLowerCase()}`;
  const from = longPath(path.join(assetsDir, name));
  const to = path.join(importDir, short);
  fs.copyFileSync(from, to);
  shortFiles.push(to);
  console.log('copied', short, '←', name.slice(-55));
}

if (!shortFiles.length) {
  console.error('No screenshots copied.');
  process.exit(1);
}

const alts = [];
for (let i = 0; i < GAMEPLAY.length; i++) {
  const src = shortFiles[i % shortFiles.length];
  const dest = path.join(gameplayDir, GAMEPLAY[i].file);
  await writeResizedPng(src, dest);
  alts.push({
    file: GAMEPLAY[i].file,
    alt: GAMEPLAY[i].alt,
    caption: GAMEPLAY[i].caption,
    captionDesc: GAMEPLAY[i].captionDesc,
    srcIndex: i % shortFiles.length,
  });
}

for (let i = 0; i < BLOG.length; i++) {
  const src = shortFiles[(i + 2) % shortFiles.length];
  await writeResizedPng(src, path.join(blogDir, BLOG[i]));
}

fs.writeFileSync(
  path.join(process.cwd(), 'scripts', 'gameplay-image-alts.json'),
  JSON.stringify({ gameplay: alts, sourceCount: shortFiles.length }, null, 2),
);

console.log('Done. Next: npm run optimize:images');
