# VoltForge — Functional Audit Report

**Auditor:** Principal QA Engineer
**Date:** 2026-07-13
**Status:** ⚠️ **NO-GO** — Not cleared for production

---

## 1. Executive Summary

VoltForge is well-architected: clean separation of concerns, accessible UI patterns, mathematically grounded PSU calculations, compositor-safe CSS transitions, and ARIA compliance. However, **4 Critical, 6 High, 8 Medium, and 5 Low** issues were found.

**Three dealbreakers block production sign-off:**
1. **Light theme is completely non-functional** — `[data-theme="light"]` has no color overrides; site always renders dark
2. **ShareModal emits incorrect markdown** — uses `transientPeak` for both "peak spike" and "headroom"
3. **Motherboard cost excluded from CostHUD** — `motherboard: null` hardcoded in pc-builder mode

---

## 2. Verified Functionality (Summary)

- All 10+ core pages render, all 25 guide pages load, oracle generates unique slugs
- Core PSU engine: `calculateBaseDraw`, `calculateTransientPeak`, `calculateRecommendedWattage`, `generateVerdict`, `checkAtxCompliance`, `checkCableCompatibility` all correct for clear-cut cases
- Component selection bays: search, filter, socket filtering, multi-select all functional
- Diagnostics HUD: verdict badge, power gauge, metrics, waveform, ATX compliance, cable audit, per-rail table all real-time reactive
- Cost HUD: total cost, segmented bar, legend, budget advice, OS/monitor/peripheral toggles, tax slider, assembly fee all functional
- Interactive TCO: inputs, bar chart, ROI verdict all functional
- PSU Comparer: dual dropdowns, full comparison table
- Share Modal: opens/closes, clipboard copy for URL and markdown
- Accessibility: skip link, focus-visible, ARIA live regions, screen-reader data tables, `prefers-reduced-motion`
- No client-side API calls, no backend dependencies, fully static

---

## 3. Critical Bugs

### C-1: Light theme is completely non-functional
**File:** `src/styles/tailwind.css:122-125` | **Confidence:** Verified

`[data-theme="light"]` only sets `color-scheme: light;` — zero color variable overrides exist. Clicking the theme toggle sets the attribute but has no visual effect.

**Fix:** Define complete light theme overrides for all `--color-*` tokens under `[data-theme="light"]`

---

### C-2: ShareModal markdown shows incorrect data
**File:** `src/components/calculators/ShareModal.tsx:76` | **Confidence:** Verified

Line 76: `- **Calculated Sustained Draw:** ${transientPeak}W peak spike / ${transientPeak}W headroom limits`

Uses `transientPeak` for both values. `ShareModal` does not receive `baseDraw` or `headroom` props.

**Fix:** Pass `baseDraw` and `headroom` to ShareModal; correct the markdown line

---

### C-3: Motherboard price excluded from CostHUD
**File:** `src/components/calculators/CostHUD.tsx:59` | **Confidence:** Verified

`currentBuild` computed passes `motherboard: null` even when a motherboard is selected. `selectedMobo` is not imported from VirtualAssemblyDesk.

**Fix:** Import `selectedMobo` and pass `motherboard: selectedMobo.value`

---

### C-4: InteractiveTCO uses hardcoded efficiency values
**File:** `src/components/calculators/InteractiveTco.tsx:30-35` | **Confidence:** Verified

Hardcoded `TIER_EFFICIENCY` (bronze: 0.82, gold: 0.90, platinum: 0.92, titanium: 0.94) diverges from real efficiency curves by up to 7%. Gold at 50% load should be 0.87 (per `efficiency-curves.json`), not 0.90.

**Fix:** Use `getEfficiency()` or `calculateWallPower()` from `lib/efficiency.ts`

---

## 4. High Severity Bugs

| ID | Title | File | Confidence | Root Cause |
|---|---|---|---|---|
| H-1 | Share button "Link Copied!" state never activates | `VirtualAssemblyDesk.tsx:189` | Verified | `shareStatus` initialized but never set to `'copied'` |
| H-2 | Cost optimization dynamic imports fail silently | `CostHUD.tsx:85-103` | Verified | No try/catch on dynamic `import()` |
| H-3 | URL encoding uses index-based references | `url.ts:46-60` | Verified | RAM/Storage/Cooling encoded by array index, not stable ID |
| H-4 | PSU Auto mode has no recommendation logic | `BayPSU.tsx:73-78` | Verified | Static hint text only; no auto-select mechanism |
| H-5 | Storage URL param `str` is ambiguous | `url.ts:54` | Verified | Could shadow JS globals |
| H-6 | Oracle excludes non-ATX 3.1 PSUs | `[slug].astro:64-66` | Verified | Hard filter `.atxVersion === '3.1'` excludes valid options |

---

## 5. Medium Severity Bugs

| ID | Title | File | Confidence | Root Cause |
|---|---|---|---|---|
| M-1 | Verdict logic gap: power 1300W, PSU 1250W result incomplete | `psu.ts:125,145-161` | Verified | `transientPeak * 1.05` vs `transientPeak` threshold mismatch |
| M-2 | Deserialized builds from URL silently drop unknown components | `url.ts:81-103` | Verified | No validation/warning for unrecognized component IDs |
| M-3 | Oracle GPU-only mode includes non-display GPUs | `oracle/[slug].astro:78-91` | Verifying | No filter for compute-only GPUs in gaming oracle pages |
| M-4 | Waveform animation phase jump on mount | `WaveformVisualizer.tsx:51-64` | Verified | `requestAnimationFrame` starts from 0 regardless of component mount time |
| M-5 | No error boundaries anywhere | All Preact components | Verified | Any runtime exception unmounts entire island with no fallback UI |
| M-6 | PowerGaugeArc silently clamps over 1600W | `PowerGaugeArc.tsx:37-38` | Verified | `min(value, 1600)` without warning user |
| M-7 | Standard wattages missing common values | `psu.ts:144` | Verified | 900W and 1100W not in `STANDARD_WATTAGES` |
| M-8 | CostHUD OS price default inconsistency | `CostHUD.tsx:20` | Verified | `osPrice` defaults to 109 when `osType` is 'none' |

---

## 6. Low Severity Bugs

| ID | Title | File | Confidence | Root Cause |
|---|---|---|---|---|
| L-1 | Unused `chart.js` dependency | `package.json:21` | Verified | No imports of chart.js anywhere in codebase |
| L-2 | Console.log in production code | `VirtualAssemblyDesk.tsx:8` | Verified | Stale debug log `console.log("SVG Export Ready")` |
| L-3 | No Content-Security-Policy header | `_headers` | Verified | Missing CSP in production headers |
| L-4 | FAQ has stale "2025" references | Methodology pages | Verified | Several FAQ dates still say "2025" |
| L-5 | Sitemap missing guide pages | `public/sitemap.xml` | Verified | 25+ guide .astro pages not in sitemap |

---

## 7. Unverified Items

- `astro build` output validation — 7,440+ oracle pages may hit memory/CPU limits
- Preact hydration double-render on signal reactivity
- Clipboard API requires HTTPS context
- Dynamic JSON imports in CostHUD resolve correctly at build time
- Cloudflare Pages deploys `_headers` and `_redirects` correctly
- Mobile touch interactions on virtual assembly desk (swipe, long-press)

---

## 8. Recommended Fix Priority

1. **C-3** (missing motherboard cost) — financial accuracy
2. **C-2** (share modal data) — data integrity
3. **C-1** (light theme) — core UX
4. **C-4** (TCO efficiency values) — calculation consistency
5. **H-2** (silent import failure) — error handling
6. **H-6** (ATX 3.1 over-filter) — missing valid options
7. **H-1** (copied state never activates) — UX feedback
8. **H-4** (auto PSU mode) — UX dead feature
9. Remaining H, M, L issues

---

*Generated by Principal QA Engineering Audit — 2026-07-13*
