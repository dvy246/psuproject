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
  site: 'https://psucheck.com',
  output: 'static',
  integrations: [
    preact({ compat: true }),
    sitemap({
      // Exclude error pages and internal paths from sitemap
      filter: (page) =>
        !page.includes('/api/') &&
        !page.endsWith('/404') &&
        !page.endsWith('/500'),

      // Serialize each URL with tiered priority based on path
      serialize(item) {
        const url = item.url;

        // Home page — highest priority
        if (url === 'https://psucheck.com/' || url === 'https://psucheck.com') {
          return { ...item, priority: 1.0, changefreq: 'daily' };
        }

        // Core calculators — very high priority (primary monetization)
        if (
          url.includes('/psu-calculator') ||
          url.includes('/pc-builder') ||
          url.includes('/psu-checker')
        ) {
          return { ...item, priority: 0.9, changefreq: 'weekly' };
        }

        // Compare tool
        if (url.includes('/compare')) {
          return { ...item, priority: 0.8, changefreq: 'weekly' };
        }

        // Guides index
        if (url === 'https://psucheck.com/guides' || url === 'https://psucheck.com/guides/') {
          return { ...item, priority: 0.85, changefreq: 'weekly' };
        }

        // Learning guides — high value SEO content
        if (url.includes('/guides/')) {
          return { ...item, priority: 0.8, changefreq: 'monthly' };
        }

        // Oracle pages — long-tail SEO content
        if (url.includes('/oracle/')) {
          return { ...item, priority: 0.7, changefreq: 'monthly' };
        }

        // About / methodology — trust signals
        if (url.includes('/about') || url.includes('/methodology')) {
          return { ...item, priority: 0.6, changefreq: 'monthly' };
        }

        // Legal / contact — low priority
        if (
          url.includes('/privacy') ||
          url.includes('/terms') ||
          url.includes('/contact')
        ) {
          return { ...item, priority: 0.3, changefreq: 'yearly' };
        }

        // Default
        return { ...item, priority: 0.7, changefreq: 'weekly' };
      },

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
