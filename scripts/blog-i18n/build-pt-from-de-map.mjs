/**
 * Build ._cache-pt-br.json by translating merged EN→DE strings to PT (one call per string).
 */
import fs from 'node:fs';

const ROOT = 'scripts/blog-i18n';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function readJson(path) {
  if (!fs.existsSync(path)) return {};
  return JSON.parse(fs.readFileSync(path, 'utf8'));
}

const deMap = {
  ...readJson(`${ROOT}/._cache-de.json`),
  ...readJson(`${ROOT}/_patch-de.json`),
};
if (Object.keys(deMap).length < 400) {
  console.error('DE map too small', Object.keys(deMap).length);
  process.exit(1);
}

const outPath = `${ROOT}/._cache-pt-br.json`;
const ptMap = fs.existsSync(outPath) ? JSON.parse(fs.readFileSync(outPath, 'utf8')) : {};

async function googleTranslate(text, sl, tl) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;
  for (let i = 0; i < 15; i++) {
    const res = await fetch(url);
    if (res.status === 429) {
      await sleep(12000 + i * 6000);
      continue;
    }
    if (!res.ok) {
      await sleep(3000);
      continue;
    }
    const data = await res.json();
    return data[0].map((x) => x[0]).join('');
  }
  return null;
}

async function deToPt(text) {
  for (let i = 0; i < 15; i++) {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=de|pt`;
    const res = await fetch(url);
    if (res.status === 429) {
      await sleep(8000 + i * 4000);
      continue;
    }
    const data = await res.json();
    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return normalizeMt(data.responseData.translatedText);
    }
    await sleep(2000);
  }
  const g = await googleTranslate(text, 'de', 'pt');
  if (g) return normalizeMt(g);
  throw new Error('deToPt failed');
}

function normalizeMt(text) {
  return text
    .replace(/\bAIMBOT\b/g, 'Aimbot')
    .replace(/\bESP\b/g, 'ESP')
    .replace(/\bHWID\b/g, 'HWID')
    .replace(/\bNCSOFT\b/g, 'NCSOFT')
    .replace(/\bOBS\b/g, 'OBS')
    .replace(/\bDISCORD\b/g, 'Discord');
}

const entries = Object.entries(deMap);
let n = 0;
for (const [en, de] of entries) {
  n++;
  if (ptMap[en]) continue;
  process.stderr.write(`\rpt-br ${n}/${entries.length}`);
  ptMap[en] = await deToPt(de);
  fs.writeFileSync(outPath, JSON.stringify(ptMap), 'utf8');
  await sleep(1800);
}
process.stderr.write('\n');

import { spawnSync } from 'node:child_process';
const r = spawnSync('node', ['scripts/blog-i18n/apply-patch-and-build.mjs', 'pt-br'], { stdio: 'inherit' });
process.exit(r.status ?? 1);
