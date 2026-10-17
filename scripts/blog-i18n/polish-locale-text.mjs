/**
 * Post-process locale JSON: fix markdown link spacing and known term fixes.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function fixLinkSpacing(s) {
  if (typeof s !== 'string') return s;
  return s
    .replace(/([^\s\[(])\[/g, '$1 [')
    .replace(/\]\(([^)]+)\)(?=[\uAC00-\uD7A3\u4E00-\u9FFFA-Za-z0-9(])/g, ']($1) ')
    .replace(/  +/g, ' ');
}

const TERM_FIXES_ZH = [
  [/放棄 ESP/g, '掉落 ESP'],
  [/ESP 和放棄 ESP/g, 'ESP 與掉落 ESP'],
];

function polishString(s, locale) {
  let out = fixLinkSpacing(s);
  if (locale === 'zh-tw') {
    for (const [re, rep] of TERM_FIXES_ZH) out = out.replace(re, rep);
  }
  return out;
}

function walk(obj, locale) {
  if (typeof obj === 'string') return polishString(obj, locale);
  if (Array.isArray(obj)) return obj.map((x) => walk(x, locale));
  if (obj && typeof obj === 'object') {
    const o = {};
    for (const [k, v] of Object.entries(obj)) {
      if (k === 'href') o[k] = v;
      else o[k] = walk(v, locale);
    }
    return o;
  }
  return obj;
}

for (const locale of ['ko', 'zh-tw']) {
  const p = path.join(__dirname, `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  fs.writeFileSync(p, JSON.stringify(walk(data, locale), null, 2) + '\n', 'utf8');
  console.log('Polished', p);
}
