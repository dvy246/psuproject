// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';

// Tailwind v4: CSS-first approach via Vite plugin
// No tailwind.config.js needed — all tokens defined in tailwind.css via @theme
let tailwindVite;
try {
  const tw = await import('@tailwindcss/vite');
  tailwindVite = tw.default;
} catch {
  // Package not yet installed — will work after `npm install`
  tailwindVite = null;
}

export default defineConfig({
  site: 'https://voltforge.app',
  output: 'static',
  integrations: [
    preact({ compat: true }),
    sitemap({
      filter: (page) => !page.includes('/api/'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [
      // Tailwind v4 Vite plugin — processes @import "tailwindcss"
      ...(tailwindVite ? [tailwindVite()] : []),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('chart.js')) return 'chart';
            if (id.includes('preact')) return 'preact';
          },
        },
      },
    },
  },
});
