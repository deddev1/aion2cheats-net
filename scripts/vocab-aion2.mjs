/**
 * Second-pass vocabulary cleanup: Fortnite/BR/Epic leftovers → Aion 2 MMO.
 * Run after rebrand-aion2.mjs: node scripts/vocab-aion2.mjs
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
]);
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', '.seo-baseline']);
const SKIP_FILES = new Set([
  'rebrand-fortnite.mjs',
  'rebrand-aion2.mjs',
  'vocab-fortnite.mjs',
  'vocab-aion2.mjs',
  'fetch-fortnite-gameplay.mjs',
]);

const REPLACEMENTS = [
  ['launch Aion 2 on NCSOFT', 'launch Aion 2'],
  ['Aion 2 on NCSOFT', 'Aion 2'],
  ['exiting the Aion 2 launcher', 'exiting the Aion 2 client'],
  ['Current Aion 2 client via the Aion 2 launcher', 'Current Aion 2 client via the official launcher'],
  ['open Aion 2 settings in the Aion 2 launcher', 'open Aion 2 client settings'],

  ['BR, instances, Abyss, Training', 'PvP, instances, Abyss, training'],
  ['Modes', 'Modes'],
  ['pickaxes', 'wings'],
  ['pickaxe', 'wing'],
  ['wraps', 'appearances'],
  ['wrap ', 'appearance '],
  ['Wrap ', 'Appearance '],

  ['chest locations', 'drop locations'],
  ['chest information', 'drop information'],
  [' chests', ' drops'],
  [' chest ', ' drop '],
  ['Chest ', 'Drop '],

  ['POI cam', 'zone cam'],
  ['POI routes', 'zone routes'],
  ['POI pathing', 'zone pathing'],
  ['POI markers', 'zone markers'],
  [' POI', ' zone'],
  ['POI ', 'Zone '],

  ['zone timing', 'flight timing'],
  ['Rotation Assist AI', 'Flight Assist AI'],
  ['Close-range finish', 'Melee finish'],
  ['under pressure', 'under siege'],
  ['ganks and map control', 'ganks and zone control'],
  ['See Ganks Before They Hit', 'See Ganks Before They Hit'],
  ['Radar & Loot', 'Radar & Drops'],
  ['mini-radar', 'mini-radar'],
  ['Mini-radar', 'Mini-radar'],

  ['loadout value', 'gear value'],
  ['loadout export', 'preset export'],
  ['Loadout favorites', 'Preset favorites'],
  ['loadouts', 'loadouts'],

  ['practice islands', 'training grounds'],
  ['practice maps', 'training grounds'],
  ['practice session', 'training session'],
  ['aim drills', 'skill drills'],
  ['aim practice', 'skill practice'],

  ['OBS safe', 'stream safe'],
  ['Game Bar modes', 'capture modes'],
  ['Game Bar', 'capture tools'],

  ['weapon swap', 'skill swap'],
  ['weapon label', 'skill label'],
  ['scoped FOV', 'ranged FOV'],
  ['Scoped aimbot', 'Ranged aim assist'],

  ['smoke alerts', 'stealth alerts'],
  ['smoke information', 'stealth information'],
  ['floor loot', 'world drops'],
  ['floor-loot', 'world-drop'],

  ['through builds', 'through terrain'],
  ['walls and builds', 'walls and terrain'],
  ['build fights', 'instance fights'],
  ['Build fights', 'Instance fights'],

  ['Aion 2 Scripts', 'Aion 2 Skill Scripts'],
  ['humanized aimbot', 'humanized aim assist'],
  ['aimbot automation', 'skill automation'],
  ['aimbot smoothness', 'aim smoothness'],
  ['aimbot engine', 'aim engine'],

  // Catch remaining brand tokens
  ['fortnite-cheats.com', 'aion2cheats.net'],
  ['Fortnite', 'Aion 2'],
  ['fortnite', 'aion-2'],
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

let changed = 0;
for (const file of walk(root)) {
  if (SKIP_FILES.has(path.basename(file))) continue;
  const ext = path.extname(file).toLowerCase();
  const base = path.basename(file);
  if (!TEXT_EXTS.has(ext) && base !== '_redirects') continue;
  const before = fs.readFileSync(file, 'utf8');
  let next = before;
  for (const [from, to] of REPLACEMENTS) {
    if (next.includes(from)) next = next.split(from).join(to);
  }
  if (next !== before) {
    fs.writeFileSync(file, next);
    changed++;
    console.log('updated', path.relative(root, file));
  }
}
console.log(`Vocab pass done. Updated ${changed} files.`);
