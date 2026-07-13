# VoltForge Improvement Plan

> Based on: Independent competitive research, SEO landscape analysis, codebase audit, and critical review of all proposed features. Gemini's plan was evaluated claim-by-claim — findings below.

---

## Executive Summary

Four prioritized improvements. Each grounded in real data, leveraging existing code, and feasible within the static-site constraint ($0 infra cost on Cloudflare Pages). No new dependencies. No databases. No SSR.

| # | Change | Files | Pages Added | Effort | SEO Impact | UX Impact |
|---|--------|-------|-------------|--------|------------|-----------|
| P1 | PSU age slider in calculator | 2 | 0 | ~30 min | Medium | High |
| P2 | Programmatic comparison pages | 3 new | ~80-150 | ~3 hrs | High | High |
| P3 | Age-aware oracle pages | 1 | ~200 | ~1 hr | High | Medium |
| P4 | Dynamic oracle cross-links | 1 | 0 | ~30 min | Medium | Low |

---

## P1 — PSU Age Slider (Calculator UI)

### What
Add a PSU age slider (0-15 years) to the `VirtualAssemblyDesk` calculator UI. Pass the value to `runFullPsuAnalysis()` which already accepts `psuAgeYears` and derates capacity via `capacitorAgingPerYear: 0.05` (5%/year after 3 years).

### Current State
- `psu.ts:118-122` — `calculateRecommendedWattage()` already applies: `agingFactor = 1 + (years - 3) * 0.05` for years > 3
- `psu.ts:285-316` — `runFullPsuAnalysis()` already accepts `psuAgeYears`
- `transient-constants.json:14` — `capacitorAgingPerYear: 0.05`
- `VirtualAssemblyDesk.tsx` — does NOT expose any age control to the user
- `DiagnosticsHUD.tsx` — shows analysis but does NOT call with age data

### Implementation
1. Add `psuAge` signal to `VirtualAssemblyDesk.tsx` state
2. Add slider UI element in PSU bay or diagnostics panel
3. Wire it into the `runFullPsuAnalysis()` call
4. Display "degraded capacity" alongside original PSU rating in results

### Why
- **Zero new engine code** — the entire feature already exists, just hidden
- **Captures search intent:** "can I reuse my old PSU for new GPU" — this is a real content gap with How-To Geek, Tech4Gamers, LTT forums all covering it editorially
- **Retention hook:** Users check their 4-year-old PSU today, come back in 2 years for their next upgrade
- **Affiliate opportunity:** When the verdict is "replace your PSU," show recommended ATX 3.1 units

### Files
- `src/components/calculators/VirtualAssemblyDesk.tsx`
- `src/components/calculators/DiagnosticsHUD.tsx`

---

## P2 — Programmatic Comparison Pages

### What
Generate static comparison pages for meaningful hardware pairings: in-tier GPUs, same-wattage-range PSUs, same-price-bracket CPUs. Each page is a fully static Astro template with comparison tables and JSON-LD schemas.

### Why Now
- **Hardwarepedia** already does this with 596 programmatic comparison pages — they're a direct competitor in the PC builder + PSU calculator space
- **"vs" pages are a proven SEO strategy** — documented by Founderpath, Wisp CMS, Groops, all confirming high-intent bottom-of-funnel traffic
- **VoltForge has a differentiator** — comparison pages can include transient spike analysis data that no other comparison tool has
- **Data already exists** — all GPU, CPU, PSU fields are present in the index JSON files

### Pairing Logic (NOT cross-multiply everything)

| Category | Criteria | Count |
|----------|----------|-------|
| GPUs | Same tier or adjacent-gen, within $200 price bracket | ~30 pairs |
| PSUs | Same wattage range (±150W), different brands | ~40 pairs |
| CPUs | Same socket generation or same price bracket | ~15 pairs |
| Cross | CPU + GPU combos that trigger bottleneck analysis | ~20 pairs |
| **Total** | | **~105 pages** |

### Page Template
```
URL: /compare/gpu/rtx-5080-vs-rtx-4090
Schema: Product comparison (2x Product + aggregate rating)
Content:
  - Spec table side-by-side (TBP, transient peak, connector, price, tier)
  - PSU requirement comparison (what wattage each needs)
  - Cable compatibility diff (12V-2x6 vs older connectors)
  - Verdict: which card for which use case
  - FAQ: 3 comparison-specific questions
```

### Files (new)
- `src/pages/compare/gpu/[slug].astro`
- `src/pages/compare/psu/[slug].astro`
- `src/pages/compare/cpu/[slug].astro`

### Implementation
```
getStaticPaths():
  for each meaningful pair (a, b):
    slug = generateSlug(a.id, b.id)
    props = { itemA: a, itemB: b }

Template:
  - Side-by-side HTML table (no JS needed — fully static)
  - JSON-LD: @type Product for both items
  - PSU analysis comparison if applicable
  - Internal links to related oracle pages
```

### Risks
- Google may flag auto-generated comparison pages as thin content if they lack substantive differences → mitigated by only pairing genuinely competitive items and including unique analysis data
- Hardwarepedia already has 596 pages in this space → VoltForge differentiator is PSU transient analysis + ATX compliance data

---

## P3 — Age-Aware Oracle Pages

### What
Extend the oracle page generator to include PSU age as a URL parameter, e.g. `/oracle/is-750w-enough-for-rtx-5090-age-5`. Each age bucket produces different analysis output (different recommended wattage, different verdict).

### Current Limitation
- Oracle pages all run with `psuAgeYears = 0` (default)
- A page saying "750W is enough for RTX 5090" is accurate for a new PSU but WRONG for a 7-year-old unit
- No oracle page targets the "old PSU" search intent

### Age Buckets
| Bucket | Years | Aging Factor | Rationale |
|--------|-------|-------------|-----------|
| new | 0 | 1.00x | Default — current behavior |
| used-3 | 3 | 1.00x | Under 3yr: no aging applied |
| used-5 | 5 | 1.10x | Common "should I replace my 5yr old PSU?" query |
| used-8 | 8 | 1.25x | "Is my 8yr old PSU still safe?" — max useful range |

### Page Count Impact
- Only apply age buckets to the top 8 GPUs (halo/ultra tier — where PSU age matters most)
- 8 GPUs × 5 wattages × 4 age buckets = 160 new pages (GPU-only)
- 5 top combos × 5 wattages × 4 age buckets = 100 new pages (combo)
- **Total: ~260 new static pages**

### SEO Benefit
- Each page has unique content (different wattage recommendation, different verdict)
- Captures long-tail: "is 750w enough for rtx 5090 with 5 year old psu"
- Every page has unique JSON-LD FAQ schema
- No other PSU calculator generates age-aware pages — **unique moat**

### Implementation
```js
// In [slug].astro getStaticPaths()
const ageBuckets = [
  { years: 0,  label: 'new' },
  { years: 3,  label: 'age-3' },
  { years: 5,  label: 'age-5' },
  { years: 8,  label: 'age-8' },
];

for (const gpu of topGpus) {
  for (const wattage of wattages) {
    for (const age of ageBuckets) {
      const analysis = runFullPsuAnalysis(components, wattage, '3.1', undefined, age.years);
      // analysis.recommendedWattage will be different for each age
      paths.push({
        params: { slug: `is-${wattage}w-enough-for-${gpu.id}-${age.label}` },
        props: { gpu, cpu: null, wattage, psuAgeYears: age.years, analysis }
      });
    }
  }
}
```

---

## P4 — Dynamic Oracle Cross-Links

### What
Replace the hardcoded "Related Guides" section on oracle pages with GPU/CPU-aware dynamic links that change based on the specific component combo.

### Current State
Every oracle page links the same 3-4 guides regardless of content. An RTX 5090 page links the same guides as an RX 7600 page.

### Dynamic Link Rules
| Condition | Guide Link |
|-----------|-----------|
| GPU tier is "halo" or "ultra" | PSU Sizing Guide + Cybenetics vs 80 PLUS |
| GPU connector is "12v-2x6" | ATX 3.1 Guide + GPU Power Connectors |
| GPU connector is "8pin-x3" | Cable Extensions Safety + PSU Cable Safety |
| CPU is overclockable (tdpSustained > tdp) | Overclocking Power Draw Guide |
| PSU age > 0 | PSU Lifespan & Aging guide |
| Default fallback | PSU Sizing Guide + How to Build a PC |

### Implementation
```js
const relatedLinks = [];
if (gpu?.tier === 'halo' || gpu?.tier === 'ultra') {
  relatedLinks.push({ name: 'PSU Sizing Guide', href: '/guides/psu-sizing-guide' });
  relatedLinks.push({ name: 'Cybenetics vs 80 PLUS', href: '/guides/cybenetics-vs-80-plus' });
}
if (gpu?.connectorType === '12v-2x6') {
  relatedLinks.push({ name: 'ATX 3.1 Guide', href: '/guides/atx-3-1-guide' });
  relatedLinks.push({ name: 'GPU Power Connectors', href: '/guides/gpu-power-connectors' });
}
// ... more rules
```

### Why
- Distributes internal link equity more naturally across the site
- Keeps users on-site longer (90s+ more session duration)
- Guides currently have low inbound link counts from oracle pages (only the 25 guide pages link among themselves)
- Google values relevant contextual links over static "related content" blocks

---

## Rejected Proposals (from Gemini analysis)

### ❌ Case Clearance / Cable Bend Auditor
- **Rejected because:** Data requirements are prohibitive (GPU width varies by AIB model, case internal width requires research per model)
- **PCPartPicker already covers GPU length** (verified via their staff forums — they check length, not width)
- **Existing cable warning already fires** in `checkCableCompatibility()` for 12V-2x6 GPUs — no new code needed
- **The 35mm figure is not in the spec** — it's a CableMod recommendation, not PCI-SIG
- **Better use of effort:** P2 (comparison pages) generates more pages with existing data

### ❌ "3% per year" degradation rate
- **Rejected because:** The 3% figure is for ceramic MLCC capacitors (KEMET white paper), logarithmically per decade-hour — completely unrelated to PSU electrolytic capacitors
- **The existing 5% after-3-years model** (`capacitorAgingPerYear: 0.05`) is more conservative and is sourced from "industry consensus" per the JSON source attribution
- **No public empirical data** exists measuring PSU-level wattage degradation over time — capacitor aging is backed by NASA/component-level research but translates to PSU output only through engineering estimates

### ❌ Cross-multiply ALL component comparisons
- **Rejected because:** C(25,2) = 300 GPU pages, many pairing RTX 5090 vs GTX 1660 (nobody searches this)
- **Replaced by:** Tier-aware pairings (~80-150 meaningful pages)

---

## Competitive Landscape Notes

### Hardwarepedia (direct competitor)
- Has 596 programmatic comparison pages
- Has PC Builder, PSU Calculator, VRAM Calculator
- Amazon affiliate program member
- **VoltForge's edge:** Transient spike analysis, ATX 3.1 compliance, capacitor aging — Hardwarepedia does basic TDP-sum math

### PCPartPicker (market leader)
- Checks GPU length vs case (confirmed)
- Does NOT reliably check GPU width/thickness (confirmed by staff)
- No transient analysis, no aging model
- **VoltForge's edge:** Faster (static), more detailed PSU analysis, capacitor aging, oracle pages

### Corsair PSU Calculator
- First-party, biased toward Corsair products
- No transient analysis
- No comparison pages
- **VoltForge's edge:** Unbiased, transient-aware, multi-brand

---

## Effort Estimation

| Priority | Developer Time | Risk | Dependencies |
|----------|---------------|------|-------------|
| P1 | 30 min | Low — existing engine, just add UI | None |
| P2 | 2-3 hours | Medium — Google may flag thin content | None |
| P3 | 1 hour | Low — follows existing oracle pattern | P1 engine (already works) |
| P4 | 30 min | Low — just conditional logic in template | None |

All four: ~4-6 hours total. Zero infra cost. Zero new dependencies.

---

## Verification

After each change, run:
```
npx astro build
```
Verify 0 errors and page count matches expectations.

Post-change checks:
- P1: Calculator displays PSU age slider, outputs change with different ages
- P2: `/compare/gpu/rtx-5080-vs-rtx-4090` renders a full static comparison page
- P3: `/oracle/is-750w-enough-for-rtx-5090-age-5` returns different wattage than `...age-new`
- P4: Oracle page for RTX 5090 links to ATX 3.1 guide; oracle page for RTX 5060 does not
