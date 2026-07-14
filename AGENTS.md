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

### 3.1 Phase 1: Core Functionality & UI Fixes
*   **Diagnostics HUD Bug Fixes:** Fixed the `cable-alert` visibility logic where warnings were incorrectly triggered or overlapping.
*   **Visual Alignment Adjustments:** Resolved text overlaps, spacing dials, and layout issues in the PSU Calculator using Vercel/Linear dark bento guidelines.

### 3.2 Phase 2: SEO Optimization & Error Pages
*   **Robots.txt & Sitemap.xml Configuration:** Added optimized `public/robots.txt` and generated a comprehensive static `public/sitemap.xml` pointing to core calculators, guides, and oracle directories.
*   **Custom Error Layouts:** Built `500.astro` and overhauled `404.astro` to feature premium dark designs with `noindex, nofollow` headers to align with Google crawler guidelines.
*   **SEO FAQ Integration:** Added at least 10 high-traffic keyword-optimized FAQs on every major page along with pre-rendered structured schema markup.

### 3.3 Phase 3: Visual Polish & SVG Migration
*   **SVG Hardware Bay Icons:** Migrated the assembly desk bays from emoji indicators to high-fidelity, custom-drawn inline SVGs. Created `BayIcons.tsx` hosting components for:
    *   `CpuIcon` (Styilzed socket & pins)
    *   `GpuIcon` (PCIe graphics card with fans)
    *   `MotherboardIcon` (Board layout & slots)
    *   `RamIcon` (Memory DIMM stick)
    *   `StorageIcon` (M.2 NVMe SSD)
    *   `CoolingIcon` (AIO/Air tower fan)
    *   `PsuIcon` (Power supply box & switch)
*   **BayCard Refactoring:** Rewrote `BayCard.tsx` to support Preact JSX children for icons and styled the wrapper dynamically with active state backgrounds (cyan, amber, red).

### 3.4 Phase 4: Advertisements Removal
*   **Global Ad Removal:** Removed all `<AdSlot />` placeholder components and script declarations from:
    *   `index.astro`
    *   `psu-calculator.astro`
    *   `pc-builder.astro`
    *   `psu-checker.astro`
    *   `oracle/[slug].astro`
*   **Codebase Cleanup:** Deleted the unused component file `src/components/AdSlot.astro` and purged unused styling classes (`.ad-container`, `.ad-label`, `.ad-content`) from stylesheets.

### 3.5 Phase 5: UI & SEO Enhancements (PSU Aging & Comparison Pages)
*   **PSU Age Slider:** Integrated an age-input slider (0-15 years) in the Virtual Assembly Desk. Wired the `psuAge` signal to pass through to the diagnostics engine, dynamically applying capacitor aging derating (5% annually after year 3) and displaying degraded capacity warnings (e.g. `850W rated -> ~680W effective`).
*   **Programmatic Hardware Comparison Pages:** Created side-by-side comparison routes for GPUs, CPUs, and PSUs (`compare/gpu/[slug].astro`, `compare/cpu/[slug].astro`, `compare/psu/[slug].astro`) rendering 450+ high-value static comparison pages with automated specifications tables, TCO analysis, cable safety diffs, and structured JSON-LD schemas.
*   **Age-Aware Oracle Pages:** Expanded the static page generation script on `oracle/[slug].astro` to produce 90 age-aware variant pages for flagship GPUs (e.g. `/oracle/is-750w-enough-for-rtx-5080-age-5`) with custom title tags, descriptions, and header warnings matching search queries.
*   **Dynamic Oracle Cross-Links:** Substituted static link sections on oracle templates with GPU/CPU-sensitive related guides (e.g., triggering native ATX 3.1 & power connector guides for high-power RTX 5090/4090 targets) to improve link equity distribution.

### 3.6 Phase 6: Overclocking Mode & Safety Buffer Slider
*   **Overclocking Mode:** Added toggle + CPU/GPU overclock sliders (0–30%, step 1) to the Virtual Assembly Desk. New `OcConfig` type (`src/types/components.ts`) drives OC multipliers in `calculateBaseDraw` and `calculateTransientPeak` (`src/lib/psu.ts`). Live wattage deltas shown beneath each slider. OC state displays as a badge (`⚡ OC: CPU+15% GPU+10%`) in the Diagnostics HUD verdict section.
*   **Safety Buffer Slider:** Exposed the existing `safetyBuffer` parameter (already in `calculateRecommendedWattage`) as a user-facing slider (0–30%, step 5, default 10%). Wired through `runFullPsuAnalysis` in `VirtualAssemblyDesk.tsx` and `DiagnosticsHUD.tsx`. Replaces the previously hardcoded default of 25%.
*   **URL Serialization:** Added `cpuoc`, `gpuoc`, and `sb` query params to `serializeBuild`/`deserializeBuild` in `url.ts` for shareable OC and safety buffer configurations. Values clamped 0–30 on decode.
*   **Engine Changes:** `ComponentDraws.ocConfig` optional — zero regression when absent. `calculateTransientPeak` accepts optional `OcConfig` parameter. Safety buffer passed as `safetyBufferPercent / 100` to match engine's decimal format.

### 3.7 Phase 7: Community Build Gallery
*   **Build Gallery & Showcases:** Created static collection routes `/builds` and individual `/build/[slug]` showcase pages. Populated from a pre-seeded `src/data/builds.json` containing 10 high-quality custom build configurations.
*   **A11y & Interactive Diagnostics:** Detail showcase pages mount `DiagnosticsHUD` with `client:load` for real-time transient peak analysis, TCO projections, and cable audits.
*   **Publish Form Integration:** Updated `ShareModal.tsx` to host a "Publish to Gallery" tab. The form validates and enforces creator details and a 150+ character description (satisfying Google's HCU quality checklist), saving builds directly to `localStorage`.
*   **Workbench Gallery Access:** Added a header button in the Virtual Assembly Desk's assembly tray to navigate directly to the Completed Builds Gallery.
*   **Sitemap Registration:** Registered `/builds` to the `sitemap.xml` index.

### 3.8 Phase 8: PSU Matchmaker (Programmatic SEO Hub)
*   **PSU Matchmaker Engine:** Created a pure utility `src/lib/psu-matcher.ts` with brand-agnostic rankings, cost-per-watt value scores, and GPU compatibility matrices.
*   **Programmatic Page Generator:** Built `src/pages/psu-for/[slug].astro` generating 250+ new static routes:
    *   `/psu-for/[gpu]` — GPU-specific hub pages with premium/mid/budget recommendations.
    *   `/psu-for/[gpu]-with-[cpu]` — GPU+CPU combo pages with binding constraint analysis.
    *   `/psu-for/can-[wattage]w-run-[gpu]` — Upgrade checker landing pages with yes/no compatibility verdicts.
*   **Navigation & Sitemap Mesh:** Updated header links in `Layout.astro` and registered top priority landing pages in `public/sitemap.xml` to build immediate crawl equity. Add CTAs linking from `oracle` pages to the matchmaker.

### 3.9 Phase 9: PC Infrastructure & Electrical Safety Suite (Breaker Auditor + UPS Sizer)
*   **Electrical Sizing Engine:** Created `src/lib/electrical.ts` containing equations for VA conversion, load amp calculations, and battery runtime coefficients.
*   **Interactive Preact Calculators:** Created `BreakerAuditor.tsx` and `UpsSizer.tsx` with dynamic sliders for electric load tracking, pure sine wave Active PFC alerts, and timeline projections.
*   **Astro Page Sizers:** Created `/compare/breaker-calculator` and `/compare/ups-calculator` pages, plus programmatic combo guides `/ups-for/[slug]`.
*   **Internal Link Mesh:** Integrated pages into Layout footers and breadcrumbs, and sitemap registry.

### 3.10 Phase 10: PSU Health Ecosystem (PSU Replacement Programmatic Pages + Oracle Age Expansion)
*   **PSU Replacement Verdict Pages:** Created `src/pages/psu-replacement/[slug].astro` generating 344 static verdict pages analyzing whether an aging PSU (3/5/8/10yr) can safely power a specific GPU. Each page runs `calculatePsuHealthScore` and `generateReplacementVerdict` at build time, renders health score ring, degradation timeline, and brand-agnostic PSU upgrade recommendations.
*   **Oracle Age Bucket Expansion:** Modified `src/pages/oracle/[slug].astro` to expand from 3 age buckets (3/5/8yr, halo/ultra GPUs only) to 5 buckets (3/5/8/10/12yr) applied across all 25 GPUs, yielding 625 age-aware oracle pages (+505 net new). Slug pattern: `is-{wattage}w-enough-for-{gpu}-age-{n}`.
*   **Health Guide Creation:** Added two new EEAT health guides:
    *   `/guides/when-to-replace-psu` — Age-based replacement thresholds, symptom checklist, upgrade trigger guide.
    *   `/guides/older-psu-new-gpu` — Connector compatibility (12V-2x6), transient headroom math, keep vs replace decision matrix with real-world transient examples (RTX 5090 ~900W peak, RTX 5080 ~540W peak).
*   **Cross-Link Integration:** Added PSU Health Check cross-link cards on all oracle pages linking to the age-5 replacement verdict for the same GPU/wattage combo. Updated guide sidebar CTAs pointing to the interactive `psu-replacement-calculator` and `psu-calculator`.

### 3.11 Phase 11: Pre-Launch Technical & On-Page SEO Audit
*   **Error Page Canonicals:** Conditionally omitted `<link rel="canonical">` and `<meta property="og:url">` tags in `Layout.astro` for pages where `noIndex` is true, resolving GSC "Soft 404" errors.
*   **Headers Configuration Cleanup:** Purged invalid absolute path domain rule from `public/_headers`.
*   **Breadcrumb Trailing Slash Consolidation:** Appended trailing slashes to dynamic breadcrumb JSON-LD schema links to match sitemap and canonical structures.
*   **Missing Comparison Index Pages:** Created new pages `src/pages/compare/index.astro`, `src/pages/compare/cpu.astro`, and `src/pages/compare/gpu.astro` to act as master index hubs for all side-by-side comparison matchups.
*   **Dynamic TechArticle Schema:** Implemented automatic layout-level generation of Google Search-compliant `TechArticle` schema markup on all guides.
*   **Footer Link Mesh:** Added comparison index routes to the footer calculators section in `Layout.astro`.

### 3.12 Phase 12: PSU Quality Tier Integration (Cultists List-Aligned)
*   **Database Schema Update:** Added `qualityTier` (`A` | `B` | `C` | `Avoid`) to `PsuIndex` type definition in `src/types/components.ts`.
*   **PSU Quality Tiers Seeding:** Populated Cultists Network-aligned quality tiers for all 35 models in `src/data/index/psus.index.json` (premium models marked Tier A, budget Tier C, and smart-500W marked Avoid).
*   **UI Quality Badges:** Rendered color-coded quality badges in recommended PSU listings across `oracle/[slug].astro`, `psu-replacement/[slug].astro`, `PsuReplacementCalc.tsx`, `psu-for/[slug].astro`, and `best-under-[price].astro`.
*   **Specs Table Integration:** Added a "PSU Quality Tier (Cultists List)" row in `src/pages/psu/[slug].astro` specs.

### 3.13 Phase 13: Technical SEO & Sizing Methodology Transparency Audit
*   **Deep Schema Enhancements:** Upgraded `WebApplication`/`SoftwareApplication` JSON-LD properties on `psu-calculator.astro`, `pc-builder.astro`, `psu-replacement-calculator.astro`, `ups-calculator.astro`, and `breaker-calculator.astro` with explicit browser dependencies, operating systems, and functional features lists.
*   **Sizing Methodology Verified Badges:** Replaced all visual `✓ E-E-A-T Verified` badges with `✓ Sizing Methodology Verified` badges linking contextually to the `/methodology` page on all 28 guides.
*   **Methodology Cards:** Built `MethodologyCard.astro` explaining transient-aware sizing standards and embedded it across all guide sidebars to build E-E-A-T without fake author persona profiles.
*   **Table of Contents (TOC):** Designed and deployed a client-side Preact TOC component (`TableOfContents.tsx`) that dynamically reads headings, slugifies hash links, smooth-scrolls to anchor points, and tracks section intersections.
*   **New Content Silos:** Created two new guides: `/guides/psu-cable-compatibility` (modular pinout safety warnings) and `/guides/power-glossary` (technical power terms hub). Integrated them into category directories and breadcrumb mappings.

### 3.15 Phase 15: PSU Reliability Database Moat
*   **Database Config & Binding**: Configured `wrangler.toml` to bind the new Cloudflare D1 database (`psu-reliability`) as `PSU_DB` and created the base table schema in `schema.sql`.
*   **Secure API Route**: Created the serverless Cloudflare Pages Function `functions/api/psu-report.ts` implementing a rate-limited, CORS-protected, honeypot-guarded submission endpoint for PSU longevity reports.
*   **Data Synchronization prebuild Hook**: Integrated a fallback-safe pre-build script `scripts/sync-psu-counts.mjs` and hook to download current database stats and update `src/data/psu-report-counts.json` for compilation.
*   **Community Index & Detail Pages**: Created the main portal `/psu-reliability/index.astro` and `/psu-reliability/[id].astro` spec pages for all 35 tracked models.
*   **Internal Link Mesh**: Cross-linked spec pages, oracle routes, and layout footer to make all reliability pages fully crawlable. Enforced `MIN_SAMPLE = 30` to guarantee high E-E-A-T and prevent thin content penalties.

### 3.16 Phase 16: Pre-Production Security Audit & DOM XSS Hardening
*   **Security Audit**: Conducted a final pre-production security review covering architecture, input validation, injection risks, client-side vulnerabilities, browser security headers, and dependencies. Saved the findings to `SECURITY_AUDIT.md`.
*   **DOM XSS Remediations**: Hardened `src/pages/builds/index.astro` by adding an HTML-escaping function (`escapeHTML()`) and sanitizing all user-controlled build parameters retrieved from `localStorage` before inserting them into the DOM via `innerHTML`.
*   **Credentials Separation**: Migrated the production database ID to the gitignored `.env` file. Created `scripts/generate-wrangler.mjs` and hooked it into the `prebuild` phase to dynamically write a temporary, gitignored `wrangler.toml` file at compile time.

### 3.17 Phase 17: UI/UX Layout Refactoring & Spacing Polish
*   **Verdict Box Empty State**: Fixed empty state logic in `DiagnosticsHUD.tsx` so that when no CPU/GPU is selected, it renders neutral gray backgrounds/borders (`verdict-empty`) instead of bright danger/alert red.
*   **Radial Gauge Layout Polish**: Repositioned text inside `PowerGaugeArc.tsx` so value and label text are fully centered inside the arc. Relocated range labels (`450W`/`1600W`) directly beneath the endpoints, completely eliminating overlapping text.
*   **Cable Warning Emoji Cleanup**: Removed redundant/duplicate warning emoji prefix from the `CABLE SAFETY ALERT` header, leaving only the clean SVG icon representation.

### 3.18 Phase 18: Technical SEO, PAA, & Content Depth Optimization
*   **Sitemap lastmod per page type**: Configured `astro.config.mjs` sitemap serialization to inject custom dates corresponding to GPU launch periods (Blackwell, Ada, Ampere, RDNA 3, etc.) rather than a uniform build timestamp.
*   **Internal Link Silo Mesh**: Cross-linked PSU replacement checkers directly from the GPU matchmaker pages (`/psu-for/[slug]`).
*   **Extended FAQPage Schema & Visual PAA blocks**: Upgraded `oracle/[slug].astro`, `psu-replacement/[slug].astro`, and `psu-for/[slug].astro` to generate 5-7 dynamic questions evaluating ATX 3.1, protection triggers, capacitor aging, and connector safety. Added visual accordion style detail-summary widgets rendering matching questions.
*   **Exact-Match title tags**: Modified layout title props in Oracle and PSU Replacement paths to match direct search-intent question patterns.
*   **Keyword-Optimized Guides**: Updated titles and metadata for ATX 3.1 vs 3.0, PSU lifespan, and efficiency guides. Published new guides for `best-psu-for-gaming` and `750w-vs-850w-psu`.
*   **Social & Feedback widgets**: Injected a vanilla JS feedback collector storing thumbs rating to `localStorage` and social share links directly above the Layout footer.
*   **Best PSU Landing Page**: Created `/best-psu` commercial page categorizing Corsair, Seasonic, and other models into Tier A, B, and C lists with direct specifications links. Registered to footer navigation and sitemaps.
*   **Reading Time Crawler**: Built Node pre-build script `add-reading-times.mjs` calculating word counts and writing inline reading-time badges into all 30 guide headers.
*   **Content Uniqueness**: Added dynamic pairing analysis paragraphs on all Oracle and PSU Replacement pages calculating specific TBP, CPU boost draw, headroom, and ATX compliance tolerances.
*   **GPU Upgrade PSU Safety Checker Suite**: Created the interactive Preact component `GpuUpgradeChecker.tsx` and sizer tool page `/compare/gpu-upgrade-checker.astro`. Generated 200+ programmatic upgrade pathways in `/compare/upgrade/[slug].astro` mapping specs and connector safety rules.

---

## 3.19 Phase 19: Universal Compatibility Engine & Upgrade Impact Simulator (Strategic Growth)

*   **Universal Compatibility Engine (UCE):** Created a comprehensive compatibility database covering GPU↔PSU (wattage, transient, connectors, 12V-2x6/12VHPWR), GPU↔Case (length, width, slots, front radiator interference), Cooler↔Case (height, RAM clearance), PSU↔Case (form factor, length), PSU↔Motherboard (EPS count), PSU Age↔GPU (derating curves, protection triggers), and Cross-Brand Cable Compatibility (modular pinout safety).
*   **Data Indexes:** Expanded `gpus.index.json` and `psus.index.json` with connector counts, dimensions, cable types. Created `cases.index.json` and `coolers.index.json` for physical compatibility data.
*   **Compatibility Engine:** Built `src/lib/compatibility/` with checkers for every constraint type and an orchestrator (`engine.ts`) producing concrete PASS/WARN/FAIL verdicts per component pair.
*   **Programmatic Pages:** Generated 11,000+ static pages at `/compatibility/gpu/[gpu]/psu/[psu]`, `/compatibility/gpu/[gpu]/case/[case]`, `/compatibility/psu/[psu]/case/[case]`, `/compatibility/cooler/[cooler]/case/[case]`, and age-aware variants. Each page has unique combination-specific analysis, schema markup, and cross-links.
*   **Upgrade Impact Simulator:** Built interactive Preact island `UpgradeImpactSimulator.tsx` answering "what happens when I upgrade component X?" with wattage deltas, clearance checks, connector availability, age-adjusted headroom, and transient margin. Generates shareable Upgrade Reports via URL.
*   **Upgrade Pathway Pages:** Generated 5,800+ programmatic upgrade pages at `/compare/upgrade/gpu/[fromGpu]/[toGpu]` mapping specific GPU-to-GPU upgrade paths with PSU adequacy verdicts.
*   **Cross-Link Mesh:** Integrated compatibility and upgrade links from oracle pages, PSU replacement pages, PSU matchmaker pages, and Virtual Assembly Desk. Updated footer navigation and sitemap.

---

## 3.20 Phase 20: Content Depth & AdSense Optimization (Release Polish)

*   **Guide Content Expansion:** Expanded 5 primary guides (`750w-vs-850w-psu`, `best-psu-for-gaming`, `aio-cooler-power-draw`, `cybenetics-vs-80-plus`, `sfx-vs-atx-psu`) to double their word count, integrating comparative tables, technical sizing details, and table-of-contents sidebar navigation.
*   **AdSense Placement Ready:** Injected clean, standardized advertisement placeholder boxes (`adsense-placeholder`) within expanded guides to satisfy indexing compatibility and AdSense program layout compliance.

---

## 4. Operational Instructions for Future Agents

*   **Compatibility Engine Updates:** When new GPUs, PSUs, cases, or coolers launch, add entries to the respective index files in `src/data/index/`. The static build automatically regenerates all affected compatibility pages.
*   **Cross-Brand Cable Maintenance:** Update `src/data/compatibility/cross-brand-cables.json` whenever new PSU modular pinout standards are discovered. Mark dangerous combos with `"danger": true`.
*   **Data Verification:** Each compatibility page displays "Last verified: [date]". Bump this date in the component index entry when data has been re-verified against current manufacturer specs.
*   **Build Time Monitoring:** If total pages exceed ~25,000, implement incremental builds or split deployment to stay within Cloudflare Pages 1-hour limit. Monitor `npm run build` duration.
*   **Feedback Loop:** Monitor thumbs-down feedback on compatibility pages weekly. Investigate and correct data accuracy issues within 72 hours.
*   **Strategic Reference:** The full strategic plan is documented in `SEARCH-INTENT-WAR-CHEST.md`. Refer to it when prioritizing features, evaluating technical decisions, or assessing competitive positioning.

*   **Database Updates:** CPU, GPU, and PSU indexes are defined in `src/data/index/`. Update these JSON items whenever new models launch.
*   **Build Commands:** Use `npm run build` to compile the static site and `npm run dev` to launch the local Astro development server.
*   **Static Generation Limit:** Make sure the static page count in `oracle/[slug].astro`, `psu-for/[slug].astro`, and `ups-for/[slug].astro` does not balloon past reasonable build times (limit combo matrices to popular models).
*   **Adding New Matchmaker Slugs:** Extend the static path generation arrays in `src/pages/psu-for/[slug].astro` to target new hardware configurations or additional wattage levels.
*   **Disclaimers for Safety Pages:** Always preserve the electrical liability warnings and disclaimers on the breaker and UPS pages.


