# Search Console workflow (aion2cheats.net)

You verify the domain at your DNS provider—no HTML meta tags in the repo.

## Setup (once)

1. Open [Google Search Console](https://search.google.com/search-console) and add the **domain** property for `aion2cheats.net` if it is not already there.
2. Under **Sitemaps**, submit the index first (required):
   - `https://aion2cheats.net/sitemap.xml`
3. Optional — submit child sitemaps too (same URLs, clearer GSC status per section):
   - `https://aion2cheats.net/sitemap-pages.xml`
   - `https://aion2cheats.net/sitemap-products.xml`
   - `https://aion2cheats.net/sitemap-blog.xml`
   - `https://aion2cheats.net/sitemap-forum.xml`
4. Repeat in [Bing Webmaster Tools](https://www.bing.com/webmasters) if you use Bing.

## Monthly tune (15 minutes)

1. Search Console → **Performance** → **Search results**.
2. Sort by **Impressions** (last 28 days).
3. For each query that already maps to a page on your site, open the matching path in [`src/config/pageSeo.ts`](../src/config/pageSeo.ts).
4. Adjust `title` and `description` so the primary query appears naturally in the title (keep under ~60 characters for the title where possible).
5. Deploy. Allow 1–2 weeks before judging click-through changes.

## Path cheat sheet

| Common query intent | Edit path in `pageSeo.ts` |
| ------------------- | ------------------------- |
| aion 2 cheats (broad) | `/` |
| lite / pro / elite | `/cheats/compare/`, `/cheats/lite/`, etc. |
| ESP wallhack, aimbot | `/cheats/pro/`, blog posts (titles set per article) |
| hwid, costume changer | `/products/aion-2-cheats/utilities/` |
| purchase / refund | `/terms/`, `/contact/` |

Product and blog article pages still use their own titles from content; add entries to `PAGE_SEO` only when you want a fixed override for a specific pathname.
