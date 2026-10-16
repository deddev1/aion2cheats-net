import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';

export default defineConfig({
  site: 'https://aion2cheats.net',
  trailingSlash: 'always',
  redirects: {
    '/cheats/': '/products/aion-2-cheats/',
    '/cheats/lite/': '/products/aion-2-cheats/',
    '/cheats/pro/': '/products/aion-2-cheats/',
    '/cheats/elite/': '/products/aion-2-cheats/elite/',
    '/cheats/compare/': '/blog/aion-2-lite-vs-pro/',
    '/products/dota-2-cheats/': '/products/aion-2-cheats/',
    '/products/dota-2-cheats/elite/': '/products/aion-2-cheats/elite/',
    '/products/dota-2-cheats/utilities/': '/products/aion-2-cheats/utilities/',
    '/products/fortnite-cheats/': '/products/aion-2-cheats/',
    '/products/fortnite-cheats/elite/': '/products/aion-2-cheats/elite/',
    '/products/fortnite-cheats/utilities/': '/products/aion-2-cheats/utilities/',
    '/go/fortnite/': '/go/aion-2/',
    '/contact/': '/support/',
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/go/'),
      serialize: sitemapSerialize,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
      minify: 'esbuild',
      target: 'es2022',
      modulePreload: { polyfill: false },
    },
  },
  build: {
    inlineStylesheets: 'always',
  },
});
