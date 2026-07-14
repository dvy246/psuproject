# VoltForge — Developer & Agent Guide (AGENTS.md)

Welcome to **VoltForge**, the premium static-first Astro.js web application designed to help PC builders calculate costs, perform deep transient-aware PSU analysis, and plan their builds.

This document serves as a complete repository guide detailing the product architecture, competitive strategy, and the timeline of engineering changes implemented so far.

---

## 1. Project Overview & Architecture

VoltForge is a single-page application built on a highly performant, accessible stack:
*   **Framework:** Astro.js (Static Site Generation for SEO speed)
*   **UI Engine:** Preact (Lightweight reactive islands for interactive calculators)
*   **Styling:** Tailwind CSS (Modern utility-first architecture)
*   **Hosting:** Cloudflare Pages (Project named `pc`)

### 1.1 Core Pages
*   `index.astro` — PC Build Cost Calculator Hub
*   `psu-calculator.astro` — PSU Deep Sizing & Sizing Engine
*   `pc-builder.astro` — Comprehensive PC Builder and Cost Estimator
*   `psu-checker.astro` — Dedicated Upgrade Headroom Checker
*   `oracle/[slug].astro` — Programmatic SEO pages generated for 1,000+ CPU x GPU matrices
*   `compare/gpu/[slug].astro` / `compare/psu/[slug].astro` / `compare/cpu/[slug].astro` — Programmatic hardware comparison pages (400+ static comparisons)
*   `404.astro` / `500.astro` — Premium custom error handlers
*   `privacy-policy.astro` / `terms.astro` / `methodology.astro` — Compliance and EEAT pages

---

## 2. Competitor Strategy & Moat Analysis

VoltForge is built to capture the massive PC-building search traffic by exploiting the structural flaws of existing market leaders:

### 2.1 Major Competitors
1.  **PCPartPicker (The Giant):**
    *   *Strength:* Dominant domain authority, real-time pricing DB.
    *   *Weakness:* Cluttered tables, poor mobile UX, basic TDP-sum calculations (totally ignores GPU transient spikes and ATX 3.1 criteria).
    *   *Our Advantage:* Tactile interactive dark-mode assembly deck with immediate cost distribution graphs and base64 instant link sharing.
2.  **TechSearchers (PSU Authority):**
    *   *Strength:* Accurate transient-aware Cybenetics formulas.
    *   *Weakness:* Limited strictly to PSU selection; no full-system builder, budget planners, or multi-year TCO charts.
    *   *Our Advantage:* Complete integration of PSU sizing into a multi-part PC builder.
3.  **Manufacturer & Retailer Calculators:**
    *   *Strength:* Direct buyer intent.
    *   *Weakness:* Biased (recommend own products only or over-spec wattage to upsell).
    *   *Our Advantage:* Unbiased technical value scores recommending all major hardware brands fairly.

### 2.2 Product Moats
*   **Dual-Graph Transient Spike Visualizer:** Shows users the continuous operating load (blue) vs the transient micro-spike peak (red) crossing their PSU safety limits.
*   **Interactive TCO Configurator:** Live slider calculating multi-year electricity bill savings for higher efficiency tiers (Bronze vs. Platinum).
*   **Cable-Melt Prevention Auditor:** Triggers specialized infrastructure warnings for high-TBP GPUs (e.g., RTX 5090 / 4090) informing users of ATX 3.1 12V-2x6 connection rules.
*   **SEO Oracle Matrix:** Over 7,000 programmatic combinations generated statically at build time.

---

## 3. Engineering Changes Log (Timeline of Enhancements)

Below is the chronological log of all changes completed to render VoltForge production-ready, highly visual, and SEO-optimized.

### 3.1 Phase 1 to 17: Core Functionality, Spacing, & Features
*   **Phase 1-17 changes**: Fixed Diagnostics HUD, aligned visuals, configured Sitemap.xml, built custom error layouts, migrated to SVG bay icons, cleaned advertisements, added PSU Capacitor Aging Slider, comparisons pages, safety buffer slider, share modal form validation, PSU matchmaker SEO engine, Breaker Auditor & UPS sizer, PSU health replacement matrix, Dynamic TechArticle schemas, Table of Contents Preact component, CORS rates-limited PSU Reliability Database with honeypots, ESCAPEHTML DOM XSS hardening, centered radial gauge endpoints, and fixed HUD verdict empty state logic.

### 3.2 Phase 18: Technical SEO, PAA, & Content Depth Optimization
*   **Sitemap lastmod per page type**: Configured `astro.config.mjs` sitemap serialization to inject custom dates corresponding to GPU launch periods (Blackwell, Ada, Ampere, RDNA 3, etc.) rather than a uniform build timestamp.
*   **Internal Link Silo Mesh**: Cross-linked PSU replacement checkers directly from the GPU matchmaker pages (`/psu-for/[slug]`).
*   **Extended FAQPage Schema & Visual PAA blocks**: Upgraded `oracle/[slug].astro`, `psu-replacement/[slug].astro`, and `psu-for/[slug].astro` to generate 5-7 dynamic questions evaluating ATX 3.1, protection triggers, capacitor aging, and connector safety. Added visual accordion style detail-summary widgets rendering matching questions.
*   **Exact-Match title tags**: Modified layout title props in Oracle and PSU Replacement paths to match direct search-intent question patterns.
*   **Keyword-Optimized Guides**: Updated titles and metadata for ATX 3.1 vs 3.0, PSU lifespan, and efficiency guides. Published new guides for `best-psu-for-gaming` and `750w-vs-850w-psu`.
*   **Social & Feedback widgets**: Injected a vanilla JS feedback collector storing thumbs rating to `localStorage` and social share links directly above the Layout footer.
*   **Best PSU Landing Page**: Created `/best-psu` commercial page categorizing Corsair, Seasonic, and other models into Tier A, B, and C lists with direct specifications links. Registered to footer navigation and sitemaps.
*   **Reading Time Crawler**: Built Node pre-build script `add-reading-times.mjs` calculating word counts and writing inline reading-time badges into all 30 guide headers.
*   **GPU Upgrade PSU Safety Checker Suite**: Created the interactive Preact component `GpuUpgradeChecker.tsx` and sizer tool page `/compare/gpu-upgrade-checker.astro`. Generated 200+ programmatic upgrade pathways in `/compare/upgrade/[slug].astro` mapping specs and connector safety rules.

### 3.3 Phase 20: Content Depth & AdSense Optimization (Release Polish)
*   **Guide Content Expansion:** Expanded 5 primary guides (`750w-vs-850w-psu`, `best-psu-for-gaming`, `aio-cooler-power-draw`, `cybenetics-vs-80-plus`, `sfx-vs-atx-psu`) to double their word count, integrating comparative tables, technical sizing details, and table-of-contents sidebar navigation.
*   **AdSense Placement Ready:** Injected clean, standardized advertisement placeholder boxes (`adsense-placeholder`) within expanded guides to satisfy indexing compatibility and AdSense program layout compliance.

---

## 4. Operational Instructions for Future Agents

*   **Database Updates:** CPU, GPU, and PSU indexes are defined in `src/data/index/`. Update these JSON items whenever new models launch.
*   **Build Commands:** Use `npm run build` to compile the static site and `npm run dev` to launch the local Astro development server.
*   **Static Generation Limit:** Make sure the static page count in `oracle/[slug].astro`, `psu-for/[slug].astro`, and `ups-for/[slug].astro` does not balloon past reasonable build times (limit combo matrices to popular models).
*   **Adding New Matchmaker Slugs:** Extend the static path generation arrays in `src/pages/psu-for/[slug].astro` to target new hardware configurations or additional wattage levels.
*   **Disclaimers for Safety Pages:** Always preserve the electrical liability warnings and disclaimers on the breaker and UPS pages.
