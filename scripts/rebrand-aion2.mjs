/**
 * Fortnite Cheats → Aion 2 Cheats (aion2cheats.net) rebrand.
 * Run from project root: node scripts/rebrand-aion2.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('.');

const TEXT_EXTS = new Set([
  '.ts',
  '.tsx',
  '.astro',
  '.mjs',
  '.js',
  '.json',
  '.md',
  '.txt',
  '.svg',
  '.html',
  '.webmanifest',
  '.css',
  '.toml',
]);

const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', '.seo-baseline']);
const SKIP_FILES = new Set([
  'rebrand-fortnite.mjs',
  'rebrand-aion2.mjs',
  'vocab-fortnite.mjs',
  'vocab-aion2.mjs',
  'fetch-fortnite-gameplay.mjs',
]);

/** Ordered longest-first brand / path / slug replacements. */
const REPLACEMENTS = [
  // Domains & brand compounds
  ['fortnite-cheats.com', 'aion2cheats.net'],
  ['Fortnite Cheats & Hacks', 'Aion 2 Cheats & Hacks'],
  ['Fortnite cheats & hacks', 'Aion 2 cheats & hacks'],
  ['FortniteCheats', 'Aion2Cheats'],
  ['Fortnitecheats', 'Aion2cheats'],
  ['fortnitecheats', 'aion2cheats'],
  ['Fortnite Cheats', 'Aion 2 Cheats'],
  ['Fortnite cheats', 'Aion 2 cheats'],
  ['fortnite cheats', 'aion 2 cheats'],

  // Product / checkout paths
  ['/products/fortnite-cheats', '/products/aion-2-cheats'],
  ['products/fortnite-cheats', 'products/aion-2-cheats'],
  ['https://zadeyo.com/products/fortnite', 'https://zadeyo.com/products/aion-2'],
  ['%2Fproducts%2Ffortnite', '%2Fproducts%2Faion-2'],
  ['/products/fortnite', '/products/aion-2'],
  ['/go/fortnite/', '/go/aion-2/'],
  ['/go/fortnite', '/go/aion-2'],

  ["checkoutPath('fortnite')", "checkoutPath('aion2')"],
  ['checkoutPath("fortnite")', 'checkoutPath("aion2")'],
  ["product: 'fortnite'", "product: 'aion2'"],
  ['  fortnite:', '  aion2:'],
  ['fortnite:', 'aion2:'],
  ["'fortnite'", "'aion2'"],
  ['"fortnite"', '"aion2"'],

  // Blog / guide slugs (longest first)
  ['how-to-buy-fortnite-cheats-2026', 'how-to-buy-aion-2-cheats-2026'],
  ['how-to-use-fortnite-cheat-codes', 'how-to-use-aion-2-cheat-codes'],
  ['eac-bypass-fortnite-guide', 'anticheat-bypass-aion-2-guide'],
  ['fortnite-aimbot-combat-guide', 'aion-2-skill-script-guide'],
  ['fortnite-aimbot-ranked-guide', 'aion-2-aimbot-pvp-guide'],
  ['fortnite-console-commands-cheats', 'aion-2-training-vs-pvp'],
  ['fortnite-console-cheats-tips', 'aion-2-training-tips'],
  ['fortnite-cheats-features-guide', 'aion-2-cheats-features-guide'],
  ['fortnite-hwid-spoofer-after-ban', 'aion-2-hwid-spoofer-after-ban'],
  ['fortnite-external-cheat-guide', 'aion-2-external-cheat-guide'],
  ['fortnite-stream-proof-setup', 'aion-2-stream-proof-setup'],
  ['fortnite-skin-changer-guide', 'aion-2-costume-changer-guide'],
  ['fortnite-elite-tier-guide', 'aion-2-elite-tier-guide'],
  ['fortnite-esp-wallhack-setup', 'aion-2-esp-wallhack-setup'],
  ['fortnite-radar-hack-guide', 'aion-2-radar-hack-guide'],
  ['fortnite-cheat-codes-guide', 'aion-2-training-guide'],
  ['fortnite-lite-vs-pro', 'aion-2-lite-vs-pro'],
  ['eac-patch-day-checklist', 'anticheat-patch-day-checklist'],
  ['fortnite-aimbot-combat', 'aion-2-skill-script'],
  ['fortnite-aimbot-lock', 'aion-2-aimbot-lock'],
  ['fortnite-arena-wallhack', 'aion-2-abyss-wallhack'],
  ['fortnite-build-fight-esp', 'aion-2-instance-esp'],
  ['fortnite-spawn-island-esp', 'aion-2-spawn-esp'],
  ['fortnite-long-range-esp', 'aion-2-long-range-esp'],
  ['fortnite-thermal-esp', 'aion-2-thermal-esp'],
  ['fortnite-combat-esp', 'aion-2-combat-esp'],
  ['fortnite-squad-esp', 'aion-2-group-esp'],
  ['fortnite-chams-esp', 'aion-2-chams-esp'],
  ['fortnite-player-esp', 'aion-2-player-esp'],
  ['fortnite-esp-wallhack', 'aion-2-esp-wallhack'],
  ['fortnite-loot-radar', 'aion-2-loot-radar'],
  ['fortnite-radar-hack', 'aion-2-radar-hack'],
  ['fortnite-skin-changer', 'aion-2-costume-changer'],
  ['fortnite-auto-aim', 'aion-2-auto-aim'],
  ['fortnite-cheats', 'aion-2-cheats'],

  // Anti-cheat naming
  ['Easy Anti-Cheat', 'NCSOFT anti-cheat'],
  ['easy anti-cheat', 'NCSOFT anti-cheat'],
  ['EAC ban', 'anti-cheat ban'],
  ['EAC update', 'anti-cheat update'],
  ['EAC patch', 'anti-cheat patch'],
  ['EAC patches', 'anti-cheat patches'],
  ['EAC enforcement', 'anti-cheat enforcement'],
  ['EAC-aware', 'anti-cheat-aware'],
  [' after EAC', ' after anti-cheat'],
  [' an EAC', ' an anti-cheat'],
  [' a EAC', ' an anti-cheat'],
  ['EAC/', 'anti-cheat/'],
  ['/EAC', '/anti-cheat'],
  [' EAC ', ' anti-cheat '],
  ['(EAC)', '(anti-cheat)'],
  ['"EAC"', '"anti-cheat"'],
  ["'EAC'", "'anti-cheat'"],
  ['EAC', 'anti-cheat'],

  // Platform
  ['NCSOFT Launcher', 'Aion 2 launcher'],
  ['NCSOFT platform', 'NCSOFT platform'],
  ['NCSOFT store', 'NCSOFT store'],
  ['Epic Terms of Service', 'NCSOFT Terms of Service'],
  ['Epic account', 'NCSOFT account'],
  ['Epic overlay', 'NCSOFT overlay'],
  ['Epic locker', 'costume wardrobe'],
  ['Epic-approved', 'NCSOFT-approved'],
  ['Epic-sanctioned', 'NCSOFT-sanctioned'],
  ['Epic review', 'NCSOFT review'],
  ['via NCSOFT', 'via the Aion 2 launcher'],
  ['through NCSOFT', 'through the Aion 2 launcher'],
  ['on Epic', 'on NCSOFT'],
  [' NCSOFT ', ' NCSOFT '],
  ['NCSOFT,', 'NCSOFT,'],
  ['NCSOFT.', 'NCSOFT.'],
  ['NCSOFT)', 'NCSOFT)'],
  ['(NCSOFT', '(NCSOFT'],
  [' Epic ', ' NCSOFT '],
  ['Epic,', 'NCSOFT,'],
  ['Epic.', 'NCSOFT.'],
  ['reqEpic', 'reqNcsoft'],
  ['compatEpic', 'compatNcsoft'],

  // Game name (after slugs/paths handled)
  ['Fortnite Elite', 'Aion 2 Elite'],
  ['Fortnite PC', 'Aion 2 PC'],
  ['Fortnite online', 'Aion 2 online'],
  ['Fortnite client', 'Aion 2 client'],
  ['Fortnite and', 'Aion 2 and'],
  ['Fortnite or', 'Aion 2 or'],
  ['Fortnite,', 'Aion 2,'],
  ['Fortnite.', 'Aion 2.'],
  ['Fortnite ', 'Aion 2 '],
  [' Fortnite', ' Aion 2'],
  ['Fortnite', 'Aion 2'],
  ['fortnite ', 'aion 2 '],
  [' fortnite', ' aion 2'],
  ['fortnite', 'aion-2'],

  // Modes & BR leftovers → Aion 2 MMO
  ['Battle Royale and instances', 'Open World PvP and instances'],
  ['Battle Royale, instances', 'Open World PvP, instances'],
  ['Battle Royale or instances', 'Open World PvP or instances'],
  ['instances and Ranked', 'instances and Abyss PvP'],
  ['Abyss and instances', 'Abyss PvP and instances'],
  ['Abyss or instances', 'Abyss PvP or instances'],
  ['instances lobby', 'training instance'],
  ['instances lobbies', 'training instances'],
  ['instances preset', 'instance preset'],
  ['instances presets', 'instance presets'],
  ['instances-friendly', 'instance-friendly'],
  ['and instances', 'and instances'],
  ['or instances', 'or instances'],
  [' instances', ' instances'],
  ['instances ', 'Instance '],
  ['Battle Royale', 'Open World PvP'],
  ['battle royale', 'open world PvP'],
  ['Creative practice', 'Training grounds'],
  ['Creative maps', 'Training grounds'],
  ['Creative islands', 'Training grounds'],
  ['Creative island', 'Training ground'],
  ['Creative and bot', 'Training and private'],
  ['bot lobbies', 'private instances'],
  ['bot lobby', 'private instance'],
  ['Creative ', 'Training '],
  [' Creative', ' Training'],
  ['creative ', 'training '],

  ['Abyss Arena', 'Abyss Arena'],
  ['ranked play', 'Abyss PvP'],
  ['Abyss play', 'Abyss PvP'],
  ['climbing rank', 'climbing Abyss rank'],
  ['high-rank', 'high Abyss rank'],
  ['live Abyss PvP', 'live Abyss'],
  ['safer Ranked', 'safer Abyss'],
  ['for Ranked', 'for Abyss PvP'],
  ['in Ranked', 'in Abyss PvP'],
  ['before Ranked', 'before Abyss PvP'],
  [' Ranked', ' Abyss'],
  ['Abyss ', 'Abyss '],
  ['ranked ', 'Abyss '],

  // Cosmetics / loot framing
  ['outfit skins', 'costumes'],
  ['Outfit, wrap and pickaxe', 'Costume and weapon appearance'],
  ['outfit, wrap and pickaxe', 'costume and weapon appearance'],
  ['Wrap & pickaxe', 'Weapon & wing'],
  ['wraps and exclusive sets', 'wings and exclusive sets'],
  ['Skin & wrap', 'Costume & appearance'],
  ['skin and wrap', 'costume and appearance'],
  ['Skin Changer', 'Costume Changer'],
  ['skin changer', 'costume changer'],
  ['Unlock All', 'Unlock All'],
  ['chest and reboot-van locator', 'drop and gather locator'],
  ['chest and reboot markers', 'drop and gather markers'],
  ['chest and floor-loot', 'drop and gather'],
  ['chest ESP', 'drop ESP'],
  ['Chest ESP', 'Drop ESP'],
  ['loot ESP', 'drop ESP'],
  ['Loot ESP', 'Drop ESP'],
  ['Rare and mythic markers', 'Rare drop markers'],
  ['Reboot van and supply drop hints', 'Gather and treasure hints'],
  ['reboot van', 'bind point'],
  ['supply drop', 'treasure chest'],

  // Combat framing
  ['ARs, SMGs, snipers and shotguns', 'staffs, bows, swords and guns'],
  ['ARs, SMGs, and snipers', 'staffs, bows, and guns'],
  ['AR, SMG, shotgun and sniper', 'staff, bow, sword and gun'],
  ['AR spray with sticky aim', 'skill chain with sticky aim'],
  ['per-weapon', 'per-class'],
  ['Per-weapon', 'Per-class'],
  ['weapon configs', 'class configs'],
  ['weapon aim profiles', 'class skill profiles'],
  ['weapon skins', 'weapon appearances'],
  ['Weapon aimbot', 'Skill aim assist'],
  ['Sniper aimbot', 'Ranged aim assist'],
  ['build-fight', 'instance fight'],
  ['Build fight', 'Instance fight'],
  ['build fight', 'instance fight'],
  ['through builds', 'through terrain'],
  ['through walls and builds', 'through walls and terrain'],
  ['storm edge', 'contested zone edge'],
  ['Storm and POI', 'Zone and landmark'],
  ['storm circle', 'contested zone'],
  ['Storm circle', 'Contested zone'],
  ['third-part', 'gank'],
  ['Third part', 'Gank'],
  ['squad fights', 'group fights'],
  ['squad ', 'group '],
  ['Squad ', 'Group '],
  ['Auto Finish', 'Auto Kill'],
  ['Auto Shield Break', 'Auto Interrupt'],
  ['Loot Assist', 'Farm Assist'],
  ['loot assist', 'farm assist'],
  ['Hotkey macros (heals/shields)', 'Hotkey macros (heals/buffs)'],
  ['hotkey macros for heals and mobility', 'hotkey macros for heals and flight'],
  ['Bone Priority', 'Target Priority'],
  ['bone priority', 'target priority'],
  ['OBS and Game Bar', 'OBS and capture'],
  ['pier fight', 'Abyss fight'],
  ['spawn island', 'starting zone'],
  ['Spawn island', 'Starting zone'],
];

const IMAGE_RENAMES = [
  ['how-to-buy-fortnite-cheats-2026', 'how-to-buy-aion-2-cheats-2026'],
  ['how-to-use-fortnite-cheat-codes', 'how-to-use-aion-2-cheat-codes'],
  ['eac-bypass-fortnite-guide', 'anticheat-bypass-aion-2-guide'],
  ['eac-patch-day-checklist', 'anticheat-patch-day-checklist'],
  ['fortnite-aimbot-combat-guide', 'aion-2-skill-script-guide'],
  ['fortnite-aimbot-ranked-guide', 'aion-2-aimbot-pvp-guide'],
  ['fortnite-console-commands-cheats', 'aion-2-training-vs-pvp'],
  ['fortnite-console-cheats-tips', 'aion-2-training-tips'],
  ['fortnite-cheats-features-guide', 'aion-2-cheats-features-guide'],
  ['fortnite-hwid-spoofer-after-ban', 'aion-2-hwid-spoofer-after-ban'],
  ['fortnite-external-cheat-guide', 'aion-2-external-cheat-guide'],
  ['fortnite-stream-proof-setup', 'aion-2-stream-proof-setup'],
  ['fortnite-skin-changer-guide', 'aion-2-costume-changer-guide'],
  ['fortnite-elite-tier-guide', 'aion-2-elite-tier-guide'],
  ['fortnite-esp-wallhack-setup', 'aion-2-esp-wallhack-setup'],
  ['fortnite-radar-hack-guide', 'aion-2-radar-hack-guide'],
  ['fortnite-cheat-codes-guide', 'aion-2-training-guide'],
  ['fortnite-lite-vs-pro', 'aion-2-lite-vs-pro'],
  ['fortnite-aimbot-combat', 'aion-2-skill-script'],
  ['fortnite-aimbot-lock', 'aion-2-aimbot-lock'],
  ['fortnite-arena-wallhack', 'aion-2-abyss-wallhack'],
  ['fortnite-build-fight-esp', 'aion-2-instance-esp'],
  ['fortnite-spawn-island-esp', 'aion-2-spawn-esp'],
  ['fortnite-long-range-esp', 'aion-2-long-range-esp'],
  ['fortnite-thermal-esp', 'aion-2-thermal-esp'],
  ['fortnite-combat-esp', 'aion-2-combat-esp'],
  ['fortnite-squad-esp', 'aion-2-group-esp'],
  ['fortnite-chams-esp', 'aion-2-chams-esp'],
  ['fortnite-player-esp', 'aion-2-player-esp'],
  ['fortnite-esp-wallhack', 'aion-2-esp-wallhack'],
  ['fortnite-loot-radar', 'aion-2-loot-radar'],
  ['fortnite-radar-hack', 'aion-2-radar-hack'],
  ['fortnite-skin-changer', 'aion-2-costume-changer'],
  ['fortnite-auto-aim', 'aion-2-auto-aim'],
];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function applyText(content) {
  let next = content;
  for (const [from, to] of REPLACEMENTS) {
    if (next.includes(from)) next = next.split(from).join(to);
  }
  return next;
}

function renameImages() {
  const imageRoots = [
    path.join(root, 'public', 'images', 'gameplay'),
    path.join(root, 'public', 'images', 'blog'),
  ];
  for (const dir of imageRoots) {
    if (!fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir)) {
      for (const [from, to] of IMAGE_RENAMES) {
        if (name.startsWith(from)) {
          const dest = name.replace(from, to);
          const fromPath = path.join(dir, name);
          const toPath = path.join(dir, dest);
          if (fromPath !== toPath && !fs.existsSync(toPath)) {
            fs.renameSync(fromPath, toPath);
            console.log('rename image', name, '→', dest);
          }
          break;
        }
      }
    }
  }
}

function renameProductDir() {
  const from = path.join(root, 'src', 'pages', 'products', 'fortnite-cheats');
  const to = path.join(root, 'src', 'pages', 'products', 'aion-2-cheats');
  if (fs.existsSync(from) && !fs.existsSync(to)) {
    fs.renameSync(from, to);
    console.log('renamed product dir → aion-2-cheats');
  }
}

renameProductDir();
renameImages();

const files = walk(root).filter((f) => {
  if (SKIP_FILES.has(path.basename(f))) return false;
  return TEXT_EXTS.has(path.extname(f).toLowerCase()) || path.basename(f) === '_redirects';
});

let changed = 0;
for (const file of files) {
  const before = fs.readFileSync(file, 'utf8');
  const after = applyText(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed++;
    console.log('updated', path.relative(root, file));
  }
}

console.log(`Done. Updated ${changed} text files.`);
