import fs from 'node:fs';
import path from 'node:path';
import { resolveDistDir } from './dist-dir.mjs';

const SITE = 'https://aion2cheats.net';
const dist = resolveDistDir();

/** Locale path prefixes (longest first so zh-tw / pt-br match correctly). */
const LOCALE_CODES = ['zh-tw', 'pt-br', 'ko', 'de', 'th', 'ja', 'es', 'fr'];

function loadUrlsetXml(dir) {
  const zero = path.join(dir, 'sitemap-0.xml');
  if (fs.existsSync(zero)) return fs.readFileSync(zero, 'utf8');

  const single = path.join(dir, 'sitemap.xml');
  if (fs.existsSync(single)) {
    const xml = fs.readFileSync(single, 'utf8');
    if (xml.includes('<urlset')) return xml;
  }

  const indexPath = path.join(dir, 'sitemap-index.xml');
  if (fs.existsSync(indexPath)) {
    const indexXml = fs.readFileSync(indexPath, 'utf8');
    for (const match of indexXml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const file = path.basename(new URL(match[1]).pathname);
      const child = path.join(dir, file);
      if (fs.existsSync(child)) {
        const childXml = fs.readFileSync(child, 'utf8');
        if (childXml.includes('<urlset')) return childXml;
      }
    }
  }

  return null;
}

const raw = loadUrlsetXml(dist);
if (!raw) {
  console.error(
    `finalize-sitemap: no urlset sitemap in ${dist} — run astro build first.`,
  );
  process.exit(1);
}

/** @typedef {{ loc: string, lastmod?: string, changefreq?: string, priority?: string }} SitemapUrl */

/** @returns {SitemapUrl[]} */
function parseUrls(xml) {
  const urls = [];
  const blocks = xml.match(/<url>[\s\S]*?<\/url>/g) ?? [];
  for (const block of blocks) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim();
    if (!loc) continue;
    urls.push({
      loc,
      lastmod: block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]?.trim(),
      changefreq: block.match(/<changefreq>([^<]+)<\/changefreq>/)?.[1]?.trim(),
      priority: block.match(/<priority>([^<]+)<\/priority>/)?.[1]?.trim(),
    });
  }
  return urls;
}

/** Normalize for GSC: https origin, trailing slash, drop junk. */
function normalizeUrl(loc) {
  let url;
  try {
    url = new URL(loc);
  } catch {
    return null;
  }
  if (url.protocol !== 'https:') url.protocol = 'https:';
  url.hostname = 'aion2cheats.net';
  url.hash = '';
  url.search = '';
  let pathname = url.pathname;
  if (!pathname.endsWith('/')) pathname += '/';
  if (pathname.includes('/404') || pathname.startsWith('/go/')) return null;
  return `${SITE}${pathname}`;
}

/** @param {string} pathname */
function localeOf(pathname) {
  for (const code of LOCALE_CODES) {
    if (pathname === `/${code}/` || pathname.startsWith(`/${code}/`)) return code;
  }
  return 'en';
}

/** @param {string} pathname */
function stripLocale(pathname) {
  for (const code of LOCALE_CODES) {
    if (pathname === `/${code}/`) return '/';
    if (pathname.startsWith(`/${code}/`)) {
      const rest = pathname.slice(code.length + 1);
      return rest.startsWith('/') ? rest : `/${rest}`;
    }
  }
  return pathname;
}

/** @param {string | undefined} value */
function formatLastmod(value) {
  if (!value) return new Date().toISOString().slice(0, 10);
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return new Date().toISOString().slice(0, 10);
  return d.toISOString().slice(0, 10);
}

/** Content-type bucket using locale-stripped path. */
function contentBucketFor(loc) {
  const bare = stripLocale(new URL(loc).pathname);
  if (bare.startsWith('/blog/')) return 'blog';
  if (bare.startsWith('/products/')) return 'products';
  if (bare.startsWith('/forum/')) return 'forum';
  return 'pages';
}

/** @param {SitemapUrl[]} urls */
function renderUrlset(urls) {
  const body = urls
    .map((u) => {
      const lines = [`  <url>`, `    <loc>${u.loc}</loc>`, `    <lastmod>${formatLastmod(u.lastmod)}</lastmod>`];
      if (u.changefreq) lines.push(`    <changefreq>${u.changefreq}</changefreq>`);
      if (u.priority) lines.push(`    <priority>${u.priority}</priority>`);
      lines.push(`  </url>`);
      return lines.join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

/** @param {{ name: string, lastmod: string }[]} children */
function renderIndex(children) {
  const body = children
    .map(
      (c) => `  <sitemap>
    <loc>${SITE}/${c.name}</loc>
    <lastmod>${c.lastmod}</lastmod>
  </sitemap>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</sitemapindex>
`;
}

const parsed = parseUrls(raw);
const byContent = {
  pages: /** @type {SitemapUrl[]} */ ([]),
  products: /** @type {SitemapUrl[]} */ ([]),
  blog: /** @type {SitemapUrl[]} */ ([]),
  forum: /** @type {SitemapUrl[]} */ ([]),
};

/** @type {Record<string, SitemapUrl[]>} */
const byLocale = Object.fromEntries(
  ['en', ...LOCALE_CODES].map((code) => [code, /** @type {SitemapUrl[]} */ ([])]),
);

const seen = new Set();
for (const item of parsed) {
  const loc = normalizeUrl(item.loc);
  if (!loc || seen.has(loc)) continue;
  seen.add(loc);
  const entry = {
    loc,
    lastmod: item.lastmod,
    changefreq: item.changefreq,
    priority: item.priority,
  };
  byContent[contentBucketFor(loc)].push(entry);
  byLocale[localeOf(new URL(loc).pathname)].push(entry);
}

const total = Object.values(byContent).reduce((n, list) => n + list.length, 0);
if (total === 0) {
  console.error('finalize-sitemap: no valid URLs after normalize.');
  process.exit(1);
}

for (const list of Object.values(byContent)) {
  list.sort((a, b) => a.loc.localeCompare(b.loc));
}
for (const list of Object.values(byLocale)) {
  list.sort((a, b) => a.loc.localeCompare(b.loc));
}

const today = new Date().toISOString().slice(0, 10);

/** @param {SitemapUrl[]} urls @param {string} name */
function writeUrlset(urls, name) {
  if (urls.length === 0) return null;
  const lastmod =
    urls
      .map((u) => formatLastmod(u.lastmod))
      .sort()
      .at(-1) ?? today;
  fs.writeFileSync(path.join(dist, name), renderUrlset(urls), 'utf8');
  return { name, lastmod, count: urls.length };
}

const contentFiles = [
  { key: 'pages', name: 'sitemap-pages.xml' },
  { key: 'products', name: 'sitemap-products.xml' },
  { key: 'blog', name: 'sitemap-blog.xml' },
  { key: 'forum', name: 'sitemap-forum.xml' },
];

const localeFiles = [
  { key: 'en', name: 'sitemap-en.xml' },
  { key: 'ko', name: 'sitemap-ko.xml' },
  { key: 'zh-tw', name: 'sitemap-zh-tw.xml' },
  { key: 'de', name: 'sitemap-de.xml' },
  { key: 'pt-br', name: 'sitemap-pt-br.xml' },
  { key: 'th', name: 'sitemap-th.xml' },
  { key: 'ja', name: 'sitemap-ja.xml' },
  { key: 'es', name: 'sitemap-es.xml' },
  { key: 'fr', name: 'sitemap-fr.xml' },
];

/** @type {{ name: string, lastmod: string, count: number }[]} */
const written = [];

// Language sitemaps first (primary for international SEO / GSC).
for (const child of localeFiles) {
  const result = writeUrlset(byLocale[child.key], child.name);
  if (result) written.push(result);
}

// Content-type sitemaps (secondary discovery).
for (const child of contentFiles) {
  const result = writeUrlset(byContent[child.key], child.name);
  if (result) written.push(result);
}

const indexXml = renderIndex(written);
// GSC entry point: /sitemap.xml is the index (also mirrored as sitemap-index.xml).
fs.writeFileSync(path.join(dist, 'sitemap.xml'), indexXml, 'utf8');
fs.writeFileSync(path.join(dist, 'sitemap-index.xml'), indexXml, 'utf8');

// Keep a combined urlset for IndexNow + tools that expect one file of <url> entries.
const allUrls = contentFiles.flatMap((c) => byContent[c.key]);
fs.writeFileSync(path.join(dist, 'sitemap-0.xml'), renderUrlset(allUrls), 'utf8');
fs.writeFileSync(path.join(dist, 'sitemap-all.xml'), renderUrlset(allUrls), 'utf8');

// Fail the build if a language sitemap is empty (SEO breakage).
for (const child of localeFiles) {
  if ((byLocale[child.key]?.length ?? 0) === 0) {
    console.error(`finalize-sitemap: missing URLs for locale "${child.key}"`);
    process.exit(1);
  }
  if (!fs.existsSync(path.join(dist, child.name))) {
    console.error(`finalize-sitemap: expected file missing: ${child.name}`);
    process.exit(1);
  }
}

console.log(`Sitemap finalized: ${total} URLs`);
console.log('Language sitemaps:');
for (const w of written.filter((x) => localeFiles.some((c) => c.name === x.name))) {
  console.log(`  ${SITE}/${w.name} (${w.count})`);
}
console.log('Content sitemaps:');
for (const w of written.filter((x) => contentFiles.some((c) => c.name === x.name))) {
  console.log(`  ${SITE}/${w.name} (${w.count})`);
}
console.log('  sitemap.xml / sitemap-index.xml → index');
console.log('  sitemap-all.xml → combined urlset');
