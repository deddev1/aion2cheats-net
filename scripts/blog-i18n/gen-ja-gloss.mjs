/**
 * Generate Japanese for missing dict-ja entries using EN source + link-preserving gloss pass.
 * Not MT—rule-based for remaining keys when APIs are blocked.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '../..');
const dir = path.join(ROOT, 'scripts/blog-i18n');
const enStrings = JSON.parse(fs.readFileSync(path.join(dir, '_unique-strings.json'), 'utf8'));
let ja = JSON.parse(fs.readFileSync(path.join(dir, 'dict-ja.json'), 'utf8'));
for (const f of fs.readdirSync(dir).filter((x) => x.startsWith('ja-bulk-') && x.endsWith('.json'))) {
  Object.assign(ja, JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));
}

const LINK_RE = /(\[[^\]]+\]\([^)]+\))/g;

const PHRASES = [
  ['Check status before launch', '起動前にステータスを確認'],
  ['Checkout on aion2cheats.net', 'aion2cheats.net でチェックアウト'],
  ['Choose Lite if', 'Lite を選ぶ場合'],
  ['Choose Pro if', 'Pro を選ぶ場合'],
  ['Training grounds', 'トレーニンググラウンド'],
  ['Training vs Abyss tools', 'Training と Abyss ツール'],
  ['Private cheats', 'プライベートチート'],
  ['Practice checklist', '練習チェックリスト'],
  ['When to move to private cheats', 'プライベートチートへ移行するタイミング'],
  ['Ready for Abyss tools?', 'Abyss ツールの準備はできましたか？'],
  ['Get private aion 2 cheats', 'private aion 2 cheats を入手'],
  ['Upgrade to Elite', 'Elite にアップグレード'],
  ['Start checkout', 'チェックアウトを開始'],
  ['External loader architecture', 'external loader アーキテクチャ'],
  ['External vs internal cheats', 'external と internal チート'],
  ['Why patch day matters', 'パッチ日が重要な理由'],
  ['Reload loader and configs', 'loader と設定を再読み込み'],
  ['Lobby verification', 'ロビー検証'],
  ['Humanized tracking, not snaps', '人間らしい追跡、スナップではない'],
  ['Stream test', 'ストリームテスト'],
  ['Stream proof', 'Stream proof'],
  ['Drill', 'ドリル'],
  ['Module', 'モジュール'],
  ['Goal', '目的'],
  ['No', 'いいえ'],
  ['Yes—unlimited resets', 'はい—無制限リセット'],
  ['N/A', 'N/A'],
];

function glossLinks(text) {
  const parts = [];
  let last = 0;
  const re = new RegExp(LINK_RE.source, 'g');
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(glossPlain(text.slice(last, m.index)));
    const inner = m[1].match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (inner) {
      parts.push(`[${glossPlain(inner[1])}](${inner[2]})`);
    } else parts.push(m[1]);
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(glossPlain(text.slice(last)));
  return parts.join('');
}

const WORDS = [
  ['secure checkout', 'セキュアチェックアウト'],
  ['operator portal', 'オペレーターポータル'],
  ['anti-cheat', 'アンチチート'],
  ['Open World PvP', 'Open World PvP'],
  ['Abyss PvP', 'Abyss PvP'],
  ['Training', 'Training'],
  ['instances', 'インスタンス'],
  ['patch day', 'パッチ日'],
  ['stream-proof', 'stream-proof'],
  ['ESP wallhack', 'ESP wallhack'],
  ['Hotkey macros', 'Hotkey macros'],
  ['Target Priority', 'Target Priority'],
  ['Smoothness', 'Smoothness'],
  ['Costume Changer', 'Costume Changer'],
  ['Farm Assist', 'Farm Assist'],
  ['Auto Kill', 'Auto Kill'],
  ['Auto Interrupt', 'Auto Interrupt'],
  ['radar hack', 'radar hack'],
  ['private aion 2 cheats', 'private aion 2 cheats'],
  ['aion2cheats.net', 'aion2cheats.net'],
  ['NCSOFT', 'NCSOFT'],
  ['Discord', 'Discord'],
  ['OBS', 'OBS'],
  ['HWID', 'HWID'],
  ['Lite', 'Lite'],
  ['Pro', 'Pro'],
  ['Elite', 'Elite'],
];

function glossPlain(s) {
  let t = s;
  for (const [en, ph] of PHRASES) {
    if (t === en) return ph;
  }
  for (const [en, jp] of WORDS) {
    t = t.split(en).join(jp);
  }
  // Light JP particles for common headings ending with :
  if (t.length < 80 && !t.includes('。') && !t.includes('、') && /^[A-Za-z0-9 \-/]+$/.test(t.trim())) {
    return t; // keep short labels mixed EN/JA for product terms
  }
  if (!t.includes('。') && t.length > 40) t += '。';
  return t;
}

const missing = enStrings.filter((s) => !ja[s]);
const bulk = {};
for (const s of missing) {
  bulk[s] = glossLinks(s);
}
fs.writeFileSync(path.join(dir, 'ja-bulk-gloss.json'), `${JSON.stringify(bulk, null, 2)}\n`, 'utf8');
Object.assign(ja, bulk);
fs.writeFileSync(path.join(dir, 'dict-ja.json'), `${JSON.stringify(ja, null, 2)}\n`, 'utf8');
console.log('Filled gloss', missing.length, 'total', Object.keys(ja).length);
