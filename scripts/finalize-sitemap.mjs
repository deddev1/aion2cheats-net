import fs from 'node:fs';
import path from 'node:path';
import { resolveDistDir } from './dist-dir.mjs';

const SITE = 'https://aion2cheats.net';
const dist = resolveDistDir();

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

/** @param {string | undefined} value */
function formatLastmod(value) {
  if (!value) return new Date().toISOString().slice(0, 10);
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return new Date().toISOString().slice(0, 10);
  return d.toISOString().slice(0, 10);
}

/** @param {SitemapUrl[]} urls */
function bucketFor(loc) {
  const path = new URL(loc).pathname;
  if (path.startsWith('/blog/')) return 'blog';
  if (path.startsWith('/products/')) return 'products';
  if (path.startsWith('/forum/')) return 'forum';
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
const byBucket = {
  pages: /** @type {SitemapUrl[]} */ ([]),
  products: /** @type {SitemapUrl[]} */ ([]),
  blog: /** @type {SitemapUrl[]} */ ([]),
  forum: /** @type {SitemapUrl[]} */ ([]),
};

const seen = new Set();
for (const item of parsed) {
  const loc = normalizeUrl(item.loc);
  if (!loc || seen.has(loc)) continue;
  seen.add(loc);
  byBucket[bucketFor(loc)].push({
    loc,
    lastmod: item.lastmod,
    changefreq: item.changefreq,
    priority: item.priority,
  });
}

const total = Object.values(byBucket).reduce((n, list) => n + list.length, 0);
if (total === 0) {
  console.error('finalize-sitemap: no valid URLs after normalize.');
  process.exit(1);
}

for (const list of Object.values(byBucket)) {
  list.sort((a, b) => a.loc.localeCompare(b.loc));
}

const today = new Date().toISOString().slice(0, 10);
const childFiles = [
  { key: 'pages', name: 'sitemap-pages.xml' },
  { key: 'products', name: 'sitemap-products.xml' },
  { key: 'blog', name: 'sitemap-blog.xml' },
  { key: 'forum', name: 'sitemap-forum.xml' },
];

const written = [];
for (const child of childFiles) {
  const urls = byBucket[child.key];
  if (urls.length === 0) continue;
  const lastmod = urls
    .map((u) => formatLastmod(u.lastmod))
    .sort()
    .at(-1) ?? today;
  fs.writeFileSync(path.join(dist, child.name), renderUrlset(urls), 'utf8');
  written.push({ name: child.name, lastmod, count: urls.length });
}

const indexXml = renderIndex(written);
// GSC entry point: /sitemap.xml is the index (also mirrored as sitemap-index.xml).
fs.writeFileSync(path.join(dist, 'sitemap.xml'), indexXml, 'utf8');
fs.writeFileSync(path.join(dist, 'sitemap-index.xml'), indexXml, 'utf8');

// Keep a combined urlset for IndexNow + tools that expect one file of <url> entries.
const allUrls = childFiles.flatMap((c) => byBucket[c.key]);
fs.writeFileSync(path.join(dist, 'sitemap-0.xml'), renderUrlset(allUrls), 'utf8');

// Point IndexNow at the combined urlset (not the index).
fs.writeFileSync(path.join(dist, 'sitemap-all.xml'), renderUrlset(allUrls), 'utf8');

console.log(`Sitemap finalized: ${total} URLs`);
for (const w of written) {
  console.log(`  ${w.name}: ${w.count}`);
}
console.log('  sitemap.xml / sitemap-index.xml → index');
console.log('  sitemap-all.xml → combined urlset');
