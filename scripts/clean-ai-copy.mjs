import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const files = [
  'src/utils/schema.ts',
  'src/utils/rss.ts',
  'src/data/faq.ts',
  'src/data/blog/posts.ts',
  'src/i18n/en.ts',
  'src/config/site.ts',
];

const reps = [
  ['Aion2Cheats Editorial', 'Aion 2 Cheats'],
  ['Aion2Cheats Community Forum', 'Aion 2 Cheats Forum'],
  ['Aion2Cheats Blog', 'Aion 2 Cheats Blog'],
  ['Aion2Cheats Support', 'Aion 2 Cheats Support'],
  ['Join Aion2Cheats on Discord', 'Join Aion 2 Cheats on Discord'],
  ['Aion2Cheats home', 'Aion 2 Cheats home'],
  ['Aion2Cheats', 'Aion 2 Cheats'],
  ["TITLE_PREFIX = 'Aion 2 Cheats & Hacks'", "TITLE_PREFIX = 'Aion 2 Cheats'"],
  ['humanized Aimbot', 'smooth aimbot'],
  ['humanized order', 'smooth order'],
  ['humanized input', 'smooth input'],
  ['humanized', 'smooth'],
  [
    'Climbing Abyss PvP with aion 2 aimbot means smooth aimbot—not instant bot bursts that draw reports.',
    'Abyss Aion 2 aimbot works better with smooth tracking than instant snaps that get you reported.',
  ],
  [
    'maintains private aion 2 cheats for Windows PC Open World PvP and instances—not console lobby codes. Every module ships through the operator portal with secure checkout, Discord support, and live status banners before patch-day queues.',
    'sells Aion 2 cheats for Windows PC Open World PvP and instances. Check status before you queue after a patch.',
  ],
  [
    'maintains private aion 2 cheats for Windows PC Open World PvP and instances. Every module ships through the operator portal with secure checkout, Discord support, and live status banners before patch-day queues.',
    'sells Aion 2 cheats for Windows PC Open World PvP and instances. Check status before you queue after a patch.',
  ],
  [
    'maintains private aion 2 cheats for Windows PC Open World PvP and instances. Check live status before every patch-day queue.',
    'sells Aion 2 cheats for Windows PC Open World PvP and instances. Check status before you queue after a patch.',
  ],
  [
    'maintains private aion 2 cheats for Windows PC Open World PvP and instances.',
    'sells Aion 2 cheats for Windows PC Open World PvP and instances.',
  ],
  [
    'ships a modular external suite for Windows PC Abyss PvP—not lobby cheat codes. Aimbot tracks targets, farm assist clears zones, ESP wallhack exposes hostile players, and utility tools like Radar Hack and Costume Changer round out the toolkit. This is the complete feature map across',
    'sells external Aion 2 cheats for PC Abyss. Aimbot, farm assist, ESP wallhack, radar and Costume Changer. See',
  ],
];

for (const rel of files) {
  const file = path.join(root, rel);
  let text = fs.readFileSync(file, 'utf8');
  const before = text;
  for (const [from, to] of reps) text = text.split(from).join(to);
  if (text !== before) {
    fs.writeFileSync(file, text);
    console.log('updated', rel);
  } else {
    console.log('noop', rel);
  }
}
