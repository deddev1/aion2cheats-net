/**
 * For any EN string missing in dict-ja, copy dict-th value as placeholder
 * then batch-translate TH->JA via google-translate-api (one call per string).
 */
import fs from 'node:fs';
import path from 'node:path';
import { translate } from '@vitalets/google-translate-api';

const ROOT = path.resolve(import.meta.dirname, '../..');
const enStrings = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'scripts/blog-i18n/_unique-strings.json'), 'utf8'),
);
const th = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/blog-i18n/dict-th.json'), 'utf8'));
const jaPath = path.join(ROOT, 'scripts/blog-i18n/dict-ja.json');
const ja = fs.existsSync(jaPath) ? JSON.parse(fs.readFileSync(jaPath, 'utf8')) : {};

const missing = enStrings.filter((s) => !ja[s]);
console.log('Missing JA', missing.length);

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function trThJa(text, attempt = 0) {
  try {
    const { text: out } = await translate(text, { from: 'th', to: 'ja' });
    return out;
  } catch (e) {
    if (attempt < 6) {
      await sleep(20000 * (attempt + 1));
      return trThJa(text, attempt + 1);
    }
    throw e;
  }
}

let n = 0;
for (const en of missing) {
  if (ja[en]) continue;
  n += 1;
  process.stderr.write(`\rth->ja ${n}/${missing.length}`);
  const src = th[en];
  if (!src) throw new Error('No TH for ' + en.slice(0, 40));
  ja[en] = await trThJa(src);
  await sleep(8000);
  if (n % 2 === 0) fs.writeFileSync(jaPath, `${JSON.stringify(ja, null, 2)}\n`, 'utf8');
}
fs.writeFileSync(jaPath, `${JSON.stringify(ja, null, 2)}\n`, 'utf8');
console.log('\nDone', Object.keys(ja).length);
