/**
 * Builds blog locale JSON overlays from en-posts.json via public translate APIs,
 * preserving markdown link hrefs. Then compile with generate-blog-locale.mjs.
 *
 * Usage:
 *   node scripts/blog-i18n/auto-build-locales.mjs all
 *   node scripts/blog-i18n/auto-build-locales.mjs ko
 */
import fs from 'node:fs';

const ROOT = 'scripts/blog-i18n';
const en = JSON.parse(fs.readFileSync(`${ROOT}/en-posts.json`, 'utf8'));

const LOCALES = {
  ko: {
    tl: 'ko',
    file: 'ko.json',
    tags: {
      Guides: '가이드',
      Setup: '설치',
      Features: '기능',
      Updates: '업데이트',
      Troubleshooting: '문제 해결',
    },
    readTime: (n) => `${n}분 읽기`,
  },
  'zh-tw': {
    tl: 'zh-TW',
    file: 'zh-tw.json',
    tags: {
      Guides: '攻略',
      Setup: '安裝',
      Features: '功能',
      Updates: '更新',
      Troubleshooting: '疑難排解',
    },
    readTime: (n) => `閱讀時間 ${n} 分鐘`,
  },
  de: {
    tl: 'de',
    file: 'de.json',
    tags: {
      Guides: 'Guides',
      Setup: 'Setup',
      Features: 'Funktionen',
      Updates: 'Updates',
      Troubleshooting: 'Fehlerbehebung',
    },
    readTime: (n) => `${n} Min. Lesezeit`,
  },
  'pt-br': {
    tl: 'pt',
    file: 'pt-br.json',
    tags: {
      Guides: 'Guias',
      Setup: 'Instalação',
      Features: 'Recursos',
      Updates: 'Atualizações',
      Troubleshooting: 'Solução de problemas',
    },
    readTime: (n) => `${n} min de leitura`,
  },
  th: {
    tl: 'th',
    file: 'th.json',
    tags: {
      Guides: 'คู่มือ',
      Setup: 'ติดตั้ง',
      Features: 'ฟีเจอร์',
      Updates: 'อัปเดต',
      Troubleshooting: 'แก้ปัญหา',
    },
    readTime: (n) => `อ่าน ${n} นาที`,
  },
  ja: {
    tl: 'ja',
    file: 'ja.json',
    tags: {
      Guides: 'ガイド',
      Setup: 'セットアップ',
      Features: '機能',
      Updates: 'アップデート',
      Troubleshooting: 'トラブルシュート',
    },
    readTime: (n) => `約${n}分`,
  },
  es: {
    tl: 'es',
    file: 'es.json',
    tags: {
      Guides: 'Guías',
      Setup: 'Configuración',
      Features: 'Funciones',
      Updates: 'Actualizaciones',
      Troubleshooting: 'Solución de problemas',
    },
    readTime: (n) => `${n} min de lectura`,
  },
  fr: {
    tl: 'fr',
    file: 'fr.json',
    tags: {
      Guides: 'Guides',
      Setup: 'Installation',
      Features: 'Fonctionnalités',
      Updates: 'Mises à jour',
      Troubleshooting: 'Dépannage',
    },
    readTime: (n) => `${n} min de lecture`,
  },
};

const MOZHI_HOSTS = ['mozhi.aryak.me', 'mozhi.ducks.party'];

function collectStrings() {
  const set = new Set();
  const add = (s) => {
    if (typeof s === 'string' && s && !/^\/[\w\-/.]+$/.test(s)) set.add(s);
  };
  for (const post of en) {
    add(post.title);
    add(post.desc);
    for (const block of post.body) walkBlock(block, add);
  }
  return [...set];
}

function walkBlock(block, add) {
  if (block.text != null) add(block.text);
  if (block.title != null) add(block.title);
  if (block.type === 'cta') add(block.text);
  if (block.items) block.items.forEach(add);
  if (block.headers) block.headers.forEach(add);
  if (block.rows) block.rows.forEach((row) => row.forEach(add));
}

function tokenize(text) {
  const tokens = [];
  let last = 0;
  const re = /\[[^\]]+\]\([^)]+\)/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) tokens.push({ kind: 'text', value: text.slice(last, m.index) });
    const full = m[0];
    const label = full.slice(1, full.indexOf(']'));
    const href = full.slice(full.indexOf('(') + 1, -1);
    tokens.push({ kind: 'link', label, href });
    last = m.index + full.length;
  }
  if (last < text.length) tokens.push({ kind: 'text', value: text.slice(last) });
  if (tokens.length === 0) tokens.push({ kind: 'text', value: text });
  return tokens;
}

const KEEP_LABEL = /^(Lite|Pro|Elite|ESP|HWID|NCSOFT|Discord|OBS|Aion 2|Unlock All|UGC)$/i;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function normalizeTl(tl) {
  // Mozhi/google engine language codes
  if (tl === 'zh-TW') return 'zh-TW';
  if (tl === 'pt') return 'pt';
  return tl;
}

async function translateMozhi(text, tl) {
  const to = normalizeTl(tl);
  let lastErr;
  for (const host of MOZHI_HOSTS) {
    try {
      const url = `https://${host}/api/translate?engine=google&from=en&to=${encodeURIComponent(to)}&text=${encodeURIComponent(text)}`;
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!res.ok) {
        lastErr = new Error(`${host} HTTP ${res.status}`);
        continue;
      }
      const data = await res.json();
      const out = data['translated-text'] ?? data.translated_text;
      if (typeof out === 'string' && out.length > 0) return out;
      lastErr = new Error(`${host} empty`);
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error('Mozhi failed');
}

async function translateGoogle(text, tl) {
  const to = normalizeTl(tl);
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(to)}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Google HTTP ${res.status}`);
  const data = await res.json();
  return data[0].map((x) => x[0]).join('');
}

async function translatePlain(text, tl) {
  if (!text.trim()) return text;
  if (text.length > 900) {
    const mid = text.lastIndexOf(' ', 800);
    const cut = mid > 100 ? mid : 800;
    const a = await translatePlain(text.slice(0, cut), tl);
    await sleep(300);
    const b = await translatePlain(text.slice(cut), tl);
    return a + b;
  }

  const attempts = [() => translateMozhi(text, tl), () => translateGoogle(text, tl)];

  let lastErr;
  for (let round = 0; round < 10; round++) {
    for (const fn of attempts) {
      try {
        const out = await fn();
        if (out && typeof out === 'string') return out;
      } catch (e) {
        lastErr = e;
      }
    }
    const wait = Math.min(60000, 3000 * (round + 1));
    process.stderr.write(`\n[retry] wait ${Math.round(wait / 1000)}s (${lastErr?.message || 'fail'})\n`);
    await sleep(wait);
  }
  throw new Error(`Translate failed for "${text.slice(0, 60)}": ${lastErr?.message}`);
}

async function translateWithLinks(text, tl, subCache) {
  const tokens = tokenize(text);
  const out = [];
  for (const t of tokens) {
    if (t.kind === 'link') {
      let label = t.label;
      if (!KEEP_LABEL.test(label.trim())) {
        const lk = `label:${tl}:${label}`;
        if (!subCache.has(lk)) {
          subCache.set(lk, await translatePlain(label, tl));
          await sleep(250);
        }
        label = subCache.get(lk);
      }
      out.push(`[${label}](${t.href})`);
    } else {
      const tk = `txt:${tl}:${t.value}`;
      if (!subCache.has(tk)) {
        subCache.set(tk, await translatePlain(t.value, tl));
        await sleep(250);
      }
      out.push(subCache.get(tk));
    }
  }
  return out.join('');
}

async function buildStringMap(strings, localeKey, tl) {
  const cachePath = `${ROOT}/._cache-${localeKey}.json`;
  let persisted = {};
  if (fs.existsSync(cachePath)) {
    persisted = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
  }
  const map = new Map(Object.entries(persisted));
  const subCache = new Map();
  let i = 0;
  let translated = 0;
  for (const s of strings) {
    i++;
    if (map.has(s)) continue;
    translated++;
    process.stderr.write(`\r[${localeKey}] ${i}/${strings.length} (+${translated})`);
    map.set(s, await translateWithLinks(s, tl, subCache));
    fs.writeFileSync(cachePath, JSON.stringify(Object.fromEntries(map)), 'utf8');
  }
  fs.writeFileSync(cachePath, JSON.stringify(Object.fromEntries(map)), 'utf8');
  process.stderr.write(`\n[${localeKey}] done (${map.size}/${strings.length})\n`);
  return map;
}

function mapString(map, s) {
  if (s == null) return s;
  if (/^\/[\w\-/.]+$/.test(s)) return s;
  return map.get(s) ?? s;
}

function mapBlock(map, block) {
  const b = { type: block.type };
  if (block.type === 'ul') {
    b.items = block.items.map((x) => mapString(map, x));
    return b;
  }
  if (block.type === 'table') {
    b.headers = block.headers.map((x) => mapString(map, x));
    b.rows = block.rows.map((row) => row.map((x) => mapString(map, x)));
    return b;
  }
  if (block.type === 'cta') {
    b.title = mapString(map, block.title);
    b.text = mapString(map, block.text);
    b.href = block.href;
    return b;
  }
  if (block.text != null) b.text = mapString(map, block.text);
  return b;
}

function buildOverlay(map, cfg) {
  const out = {};
  for (const post of en) {
    const n = (post.readTime.match(/(\d+)/) || ['?', '?'])[1];
    out[post.slug] = {
      title: mapString(map, post.title),
      desc: mapString(map, post.desc),
      tag: cfg.tags[post.tag] ?? post.tag,
      readTime: cfg.readTime(n),
      body: post.body.map((b) => mapBlock(map, b)),
    };
  }
  return out;
}

const arg = process.argv[2] || 'all';
const keys = arg === 'all' ? Object.keys(LOCALES) : [arg];
if (!keys.every((k) => LOCALES[k])) {
  console.error('Usage: node auto-build-locales.mjs all|ko|zh-tw|de|pt-br|th|ja|es|fr');
  process.exit(1);
}

const strings = collectStrings();
process.stderr.write(`Unique strings: ${strings.length}\n`);

for (const key of keys) {
  const cfg = LOCALES[key];
  const map = await buildStringMap(strings, key, cfg.tl);
  const data = buildOverlay(map, cfg);
  const file = `${ROOT}/${cfg.file}`;
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Wrote ${file} (${Object.keys(data).length} posts)`);
}
