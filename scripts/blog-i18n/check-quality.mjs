import fs from 'node:fs';

const files = process.argv.slice(2);
for (const f of files) {
  const path = f.includes('/') ? f : `scripts/blog-i18n/${f}`;
  const p = JSON.parse(fs.readFileSync(path, 'utf8'));
  const s = Object.keys(p)[0];
  let eng = 0;
  let tot = 0;
  for (const post of Object.values(p)) {
    for (const b of post.body || []) {
      const texts = [b.text, b.title, ...(b.items || []), ...(b.headers || [])].filter(Boolean);
      for (const t of texts) {
        tot++;
        if (/^[A-Za-z0-9 ,.'"`\-;:!?()\/\[\]%]+$/.test(t) && t.length > 25) eng++;
      }
    }
  }
  console.log(f, 'title:', p[s].title.slice(0, 60), '| long-enish', `${eng}/${tot}`);
}
