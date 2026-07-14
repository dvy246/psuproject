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
        // Default fallback date
        let lastmod = new Date('2026-07-13');

        // Dynamically compute lastmod based on URL content
        if (url.includes('/oracle/') || url.includes('/psu-for/') || url.includes('/psu-replacement/')) {
          const lowerUrl = url.toLowerCase();
          if (lowerUrl.includes('5090') || lowerUrl.includes('5080') || lowerUrl.includes('5070') || lowerUrl.includes('5060')) {
            lastmod = new Date('2025-01-15');
          } else if (lowerUrl.includes('9070')) {
            lastmod = new Date('2025-01-20');
          } else if (lowerUrl.includes('4090') || lowerUrl.includes('4080') || lowerUrl.includes('4070') || lowerUrl.includes('4060')) {
            lastmod = new Date('2023-06-15');
          } else if (lowerUrl.includes('7900') || lowerUrl.includes('7800') || lowerUrl.includes('7700') || lowerUrl.includes('7600')) {
            lastmod = new Date('2023-08-15');
          } else if (lowerUrl.includes('3090') || lowerUrl.includes('3080') || lowerUrl.includes('3070') || lowerUrl.includes('3060')) {
            lastmod = new Date('2021-04-15');
          } else {
            lastmod = new Date('2024-10-12');
          }
        } else if (url.includes('/guides/')) {
          if (url.includes('atx-3-1') || url.includes('psu-cable-compatibility') || url.includes('when-to-replace-psu') || url.includes('older-psu-new-gpu')) {
            lastmod = new Date('2026-07-13');
          } else {
            lastmod = new Date('2025-11-20');
          }
        }

        // Home page — highest priority
        if (url === 'https://psucheck.com/' || url === 'https://psucheck.com') {
          return { ...item, priority: 1.0, changefreq: 'daily', lastmod: new Date('2026-07-13') };
        }

        // Core calculators — very high priority (primary monetization)
        if (
          url.includes('/psu-calculator') ||
          url.includes('/pc-builder') ||
          url.includes('/psu-checker')
        ) {
          return { ...item, priority: 0.9, changefreq: 'weekly', lastmod: new Date('2026-07-13') };
        }

        // Compare tool & GPU Upgrade Checker
        if (url.includes('/compare/gpu-upgrade-checker')) {
          return { ...item, priority: 0.9, changefreq: 'weekly', lastmod: new Date('2026-07-13') };
        }
        if (url.includes('/compare/cable-compatibility')) {
          return { ...item, priority: 0.9, changefreq: 'weekly', lastmod: new Date('2026-07-14') };
        }
        if (url === 'https://psucheck.com/compare/upgrade' || url === 'https://psucheck.com/compare/upgrade/') {
          return { ...item, priority: 0.8, changefreq: 'weekly', lastmod: new Date('2026-07-14') };
        }
        if (url.includes('/compare/upgrade/')) {
          return { ...item, priority: 0.5, changefreq: 'monthly', lastmod };
        }
        if (url.includes('/compare')) {
          return { ...item, priority: 0.8, changefreq: 'weekly', lastmod: new Date('2026-07-13') };
        }

        // Compatibility Hub & Programmatic Checker Paths
        if (url === 'https://psucheck.com/compatibility' || url === 'https://psucheck.com/compatibility/') {
          return { ...item, priority: 0.9, changefreq: 'weekly', lastmod: new Date('2026-07-14') };
        }
        if (url.includes('/compatibility/')) {
          return { ...item, priority: 0.6, changefreq: 'monthly', lastmod };
        }

        // Best PSU buyer's guide - High commercial priority
        if (url.includes('/best-psu')) {
          return { ...item, priority: 0.9, changefreq: 'weekly', lastmod: new Date('2026-07-13') };
        }

        // Guides index
        if (url === 'https://psucheck.com/guides' || url === 'https://psucheck.com/guides/') {
          return { ...item, priority: 0.85, changefreq: 'weekly', lastmod: new Date('2026-07-13') };
        }

        // Learning guides — high value SEO content
        if (url.includes('/guides/')) {
          return { ...item, priority: 0.8, changefreq: 'monthly', lastmod };
        }

        // Oracle pages — long-tail SEO content
        if (url.includes('/oracle/')) {
          return { ...item, priority: 0.7, changefreq: 'monthly', lastmod };
        }

        // About / methodology — trust signals
        if (url.includes('/about') || url.includes('/methodology')) {
          return { ...item, priority: 0.6, changefreq: 'monthly', lastmod: new Date('2026-07-13') };
        }

        // Legal / contact — low priority
        if (
          url.includes('/privacy') ||
          url.includes('/terms') ||
          url.includes('/contact')
        ) {
          return { ...item, priority: 0.3, changefreq: 'yearly', lastmod: new Date('2026-07-13') };
        }

        // Default
        return { ...item, priority: 0.7, changefreq: 'weekly', lastmod };
      },
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
