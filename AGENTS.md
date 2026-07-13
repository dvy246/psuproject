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

---

## 4. Operational Instructions for Future Agents

*   **Database Updates:** CPU, GPU, and PSU indexes are defined in `src/data/index/`. Update these JSON items whenever new models launch.
*   **Build Commands:** Use `npm run build` to compile the static site and `npm run dev` to launch the local Astro development server.
*   **Static Generation Limit:** Make sure the static page count in `oracle/[slug].astro` doesn't balloon past reasonable build times (limit combo matrices to popular models).
