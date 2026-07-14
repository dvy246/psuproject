# PLAN.md — PC Build Cost + PSU Analysis + Planning Hub

**Site type:** Static Astro.js site, Preact islands for interactivity, Cloudflare Pages deployment
**Monetization:** AdSense + affiliate (Amazon, Newegg, B&H)
**Objective:** A single connected product that answers three questions no single competitor currently answers together — true build cost with optimization guidance, PSU analysis at the rigor of the best standalone PSU tools, and integrated planning guides — built to rank on real, defensible SEO strategy rather than volume alone.

---

## 1. The Real Opportunity

The PC-building tool space has two kinds of strong, established players, and neither does what this product does:

- **General-purpose build sites** (led by PCPartPicker) have deep component pricing and compatibility databases and a trusted, well-used wattage calculator, but no cost-breakdown visualization, no budget-allocation guidance, no cost-optimization suggestions, and no integrated planning guides connected to the calculator.
- **Specialist PSU tools** (led by sites like TechSearchers, plus manufacturer calculators from Corsair, MSI, be quiet!) go deep on PSU-specific analysis — transient spike modeling, efficiency tiers, confidence scoring — but have no build-cost calculation, no component pricing database, and manufacturer tools are structurally biased toward their own product catalogs.

**The gap is the combination, not any single missing feature.** No product found combines true cost breakdown + optimization advice + PSU analysis at specialist-level rigor + integrated guides + a differentiated long-tail SEO strategy, all cross-linked in one fast, static, unbiased product. That's what this plan builds.

---

## 2. The Differentiation Strategy (What Actually Makes This Win)

Four pillars, in order of how defensible each one is:

1. **The three-pillar combination itself.** Cost + PSU-depth + guides, all cross-linked, all in one product. This is the core, structural differentiator — competitors are each strong in one lane and absent from the others.
2. **The cost-optimization layer.** "Save $50 by choosing this PSU instead," "downgrade CPU to save $100, lose 5% performance," budget-allocation analysis ("you're spending 48% on GPU — ideal for gaming"). This is a product layer general-purpose build sites don't have, because it requires opinionated guidance, not just a parts database.
3. **Two genuinely new features that go beyond what any standalone PSU tool offers:**
   - **Cable-Melt Prevention Auditor** — detects high-end GPU selection and surfaces specific connector/cabling requirements and daisy-chain warnings (a real safety issue with modern high-wattage GPUs that no calculator currently addresses as a dedicated feature).
   - **TCO Calculator** — state-aware electricity pricing, multi-year cost comparison across 80+ efficiency tiers, proving the ROI of a higher-tier PSU in real dollars.
4. **PSU analysis rigor matched to the best existing standalone tools as a floor, not a ceiling.** Real transient spike multipliers, efficiency-tier wall-power modeling, capacitor aging, full line-item transparency, and a confidence score — build this to the standard the best specialist tools already hit, then differentiate on the three items above rather than on the base methodology, which is a known, replicable approach, not a novel one.

**What this product does not claim:** that competitors are missing basic features they actually have. The differentiation is depth-plus-combination-plus-two-new-features, which is a real, defensible, but genuinely harder bar than "fill an empty space" — build with that difficulty in mind, especially in the polish of pillars 2 and 3, since those carry the most differentiation weight.

---

## 3. Technical Architecture

| Layer | Technology | Rationale |
|---|---|---|
| Framework | Astro.js | Static-first, zero JS by default, islands architecture for interactive calculators only |
| UI Engine | Preact (`@astrojs/preact`) | Lightweight interactivity, keeps calculator islands fast |
| Styling | Tailwind CSS | Consistent, fast-iterating utility-first design system |
| Charts | Chart.js (canvas) | Cost pie charts, PSU comparison bars, transient spike line graphs |
| Icons | Lucide | Clean, consistent icon set |
| Deployment | Cloudflare Pages | Free tier, global CDN, native static-site support |
| Analytics | Whatever privacy-respecting option is already standard for this project | No Google Analytics/Search Console configuration as part of this build |

### Repository structure

```
src/
├── data/
│   ├── cpus.json              # ~200 CPUs: TDP, price, socket, generation
│   ├── gpus.json               # ~100 GPUs: TBP, price, tier, transient_multiplier
│   ├── motherboards.json
│   ├── psus.json               # ~150 PSU models: wattage, efficiency, ATX version, price
│   ├── components.json         # RAM/storage/cooling typical draws + pricing tiers
│   ├── psu_efficiency.json     # 80+ efficiency curves at different load %
│   └── affiliate.json          # Amazon/Newegg/B&H affiliate IDs per product
├── lib/
│   ├── calculate.ts            # Build cost summation
│   ├── psu.ts                  # PSU wattage calc (base + transients + aging)
│   ├── efficiency.ts           # 80+ efficiency modeling + wall power
│   ├── atx31.ts                # ATX 3.0/3.1 compliance checks
│   ├── rail.ts                 # Per-rail current estimation
│   ├── cost.ts                 # Multi-year cost projection
│   ├── optimize.ts             # Cost optimization suggestions
│   └── validate.ts             # Compatibility checks (socket, power, clearance)
├── components/
│   ├── ComponentSelector/      # CPU/GPU/motherboard/RAM/storage/PSU/case pickers
│   ├── CostBreakdown/          # Pie chart + cost table + affiliate links
│   ├── PSUAnalysis/            # Wattage result, spike graph, cable-melt auditor, TCO
│   └── CostOptimization/       # Savings tips, electricity cost calc
├── pages/
│   ├── index.astro             # Build cost calculator (hub)
│   ├── psu-calculator/
│   ├── pc-builder/
│   ├── oracle/                 # Programmatic PSU-sufficiency pages (Section 6.2)
│   ├── guides/
│   └── compare/psu/
```

---

## 4. Data Architecture & Sourcing

- **CPU/GPU specs**: source TDP/TBP directly from manufacturer spec sheets (Intel Ark, AMD official specs, GPU manufacturer product pages) — every figure must be traceable to a real, checkable source, not estimated.
- **PSU efficiency curves**: source from real published 80+ certification test data, not invented percentages.
- **Transient spike multipliers**: source from published lab methodology (Cybenetics' own published testing methodology is the right reference standard for this specific figure) rather than an unsourced assumption.
- **Pricing**: static price-tier maps, refreshed on a real trigger (see Section 8), not live scraping — this keeps the static-site architecture intact while staying "close enough" for planning purposes.
- Every dataset file should carry a source citation (in a comment or companion doc) so future updates can verify against the same reference rather than guessing.

---

## 5. Build Plan — Step by Step

### Step 1 — Scaffolding
Initialize the Astro + Preact + Tailwind project. Set up the repository structure above. Configure Cloudflare Pages deployment immediately so every subsequent step can be verified against a real preview build, not just local dev.

### Step 2 — Data layer first
Populate all `src/data/*.json` files with real, sourced specs before writing any UI. This ordering matters — the calculators are only as credible as the data underneath them, and building UI against placeholder data creates rework later.

### Step 3 — PSU calculation engine as pure, tested functions
Implement `psu.ts`, `efficiency.ts`, `atx31.ts`, `rail.ts`, and `cost.ts` as pure functions with zero UI dependency. Write unit tests against known reference values before any UI is wired up. This engine's output is the product's core credibility — verify the transient multipliers, efficiency-tier wall-power conversion, and capacitor aging formula against real published methodology before shipping any number publicly.

### Step 4 — Build Cost Calculator
Implement `ComponentSelector`, `CostBreakdown` (Chart.js pie chart), and `optimize.ts`'s budget-allocation and cost-optimization logic. Prioritize making optimization suggestions specific and genuinely useful ("RTX 5070 is 15% cheaper than RTX 5070 Ti with 10% less performance," anchored to real current pricing) — this is the pillar with the least existing competition, so its quality carries real differentiation weight.

### Step 5 — PSU Deep Analysis UI
Build the full results panel: wattage recommendation with confidence score, ATX 3.1/2.x compliance badge, per-rail table, dual-graph transient spike visualizer (continuous load vs. peak spike, with the user's PSU rating overlaid), and multi-year cost comparison. Every output shows its full line-item breakdown (base draw, spike, efficiency loss, aging penalty, safety buffer) — full transparency is now the standard to match, not a differentiator on its own.

### Step 6 — The two differentiated features
Build the **Cable-Melt Prevention Auditor** (detect high-end GPU selection, surface specific connector/cabling requirements, warn against daisy-chaining) and the **TCO Calculator** (state-aware kWh pricing, multi-year cost comparison across 80+ tiers, output framed as concrete savings — "Upgrading from Bronze to Platinum saves $85 over 3 years"). Give these the highest polish of any feature in the product — they carry the most differentiation weight.

### Step 7 — Integrated guides
Write guides: How to Build a PC, ATX 3.1 Guide, PSU Sizing Guide, 80+ Efficiency Guide, PC Budget Guide, PC Building Tips. Every guide links to the relevant calculator; every calculator result links to the relevant guide. This tight cross-linking is itself a real differentiator — no competitor found connects guides and calculators this closely. Every factual claim in a guide (ATX 3.1 spec details, 80+ certification thresholds) cites a real, checkable source.

### Step 8 — Oracle page generation, with a real content-quality gate
Build the CPU×GPU cross-product static page generator. Each page answers "Is [wattage]W enough for [GPU] + [CPU]?" with a pre-rendered PSU analysis, transient spike graph, and 3 tiered PSU recommendations. **Insert a quality gate between generation and publishing**: every page must include at least one piece of page-specific analysis beyond the templated yes/no answer — which specific component is the binding constraint for that pairing, or a realistic upgrade-path note — not just swapped variable names into an identical shell. Launch with the highest-relevance GPU/CPU pairings first (reasoned from real current hardware popularity), confirm these index and rank cleanly with no quality issues, then scale toward the full cross-product matrix. This staged approach protects the whole domain from the risk that comes with publishing thousands of near-identical pages at once.

### Step 9 — Schema & technical SEO foundation
Implement `WebApplication` schema on calculator pages, `HowTo` on guides, `FAQPage` on FAQ sections, `Product` on PSU recommendations, and `Dataset` schema on oracle pages. Self-referencing canonical tags on every indexable page, including every oracle page. Generate and submit a sitemap covering every genuinely indexable page.

### Step 10 — Affiliate & AdSense integration
Wire affiliate links (Amazon Associates, Newegg, B&H) into PSU recommendations and component pricing. Add AdSense placements matched to page-type traffic tiers. Hard rule: no ad placement causes layout shift, and no ad sits between a user and their calculation result.

### Step 11 — Accuracy verification pass
Run 5-10 real, current PC builds through the PSU engine and sanity-check output against the community-standard manual method (TDP-based estimation plus a 1.25-1.5× transient buffer). Investigate any significant divergence before launch — a wrong number here undermines the entire product's credibility. Confirm every data source is still current. Confirm the Oracle page quality gate held up at the initial launch batch size before scaling further.

### Step 12 — Accessibility pass
Confirm every calculator is keyboard-operable and that results are screen-reader-usable, not just visually presented via charts — the calculators are the entire product, so this isn't optional polish.

---

## 6. SEO & Ranking Strategy

### 6.1 Keyword architecture

| Priority | Keyword | Intent | Target Page |
|---|---|---|---|
| P0 | psu calculator / power supply calculator | Commercial | /psu-calculator |
| P0 | pc power supply calculator | Commercial | /psu-calculator |
| P1 | pc build cost calculator | Commercial | / (homepage) |
| P1 | how much to build a pc | Informational | /build-cost-calculator |
| P2 | pc builder / custom pc builder | Commercial | /pc-builder |
| P3 | how to build a pc | Informational | /guides/how-to-build-a-pc |
| P3 | atx 3.1 guide | Informational | /guides/atx-3-1 |
| P3 | 80 plus efficiency guide | Informational | /guides/psu-efficiency |

Treat any specific monthly search-volume figure as a planning estimate, not a guaranteed number, until confirmed against a live keyword tool — prioritize by realistic intent-match and competitive gap first, volume second.

### 6.2 The Oracle page strategy — the real SEO differentiator

Long-tail "Is [wattage] enough for [GPU]?" queries currently get answered by scattered Reddit threads and forum arguments, not a dedicated, authoritative resource. Cross-multiplying the CPU and GPU databases at build time produces a large set of static, pre-rendered, zero-layout-shift pages that directly answer these queries — a strategy no general-purpose build site or specialist PSU tool currently executes at this scale. This is the single highest-leverage SEO play in this plan, and Section 5, Step 8's quality gate is what makes it sustainable rather than a liability — scale is worthless, and actively risky, without genuine per-page value.

### 6.3 Content architecture

- **Pillar pages**: the three main calculators (build cost, PSU, PC builder) each carry real supporting content, not just the interactive tool — methodology explanation, FAQ, and links to relevant guides.
- **Supporting guides**: the six guides in Section 5, Step 7, each targeting a specific informational query and cross-linking back to calculators.
- **Oracle pages**: the long-tail layer, per Section 6.2.
- **Comparison pages**: PSU model comparison pages, targeting "X vs Y" PSU queries.
- **FAQ on every page type**: direct-answer-first structure (the answer in the first 1-2 sentences after the question), which is what gets pulled into both traditional featured snippets and AI-generated answer boxes.

### 6.4 E-E-A-T and trust signals

Every methodology claim (transient multiplier values, efficiency-tier modeling, capacitor aging formula) should cite its real source directly on the page — the same standard the best existing specialist PSU tools already hold themselves to. This isn't just good practice; it's the direct answer to the question a technical audience will immediately ask ("why should I trust these numbers"), and it's cheap to do relative to the trust it buys.

### 6.5 Internal linking mesh

Every calculator links to every relevant guide. Every guide links to the relevant calculator(s). Every oracle page links back to the main PSU calculator and at least one relevant guide. No page should be an orphan — this mesh is what turns a collection of tools into a real topical-authority site rather than a set of disconnected pages.

### 6.6 Technical performance

Static-first Astro output with Preact islands keeps JS payload minimal on every page. Sub-100ms interaction feedback on calculators. Skeleton loading states for calculator islands. Mobile-first responsive design, since many users research on phone and buy on desktop — the mobile experience of the calculators specifically needs to be as good as desktop, not an afterthought.

---

## 7. Monetization

| Channel | Mechanism |
|---|---|
| Amazon/Newegg/B&H Affiliate | PSU recommendations, per-component pricing links, guide product mentions |
| AdSense | Tiered by page type — calculators highest priority placement (highest intent traffic), guides secondary, comparison/blog content tertiary |
| Future: Premium tier | Price-drop alerts, unlimited saved builds, CSV export — evidence-gated, only if usage data after launch shows real demand for gated features |
| Future: Data licensing | Aggregated, anonymized build-pricing trend data — long-horizon, not a launch priority |

---

## 8. Recommended Additions Beyond the Original Scope

1. **A dedicated "is my current PSU still enough for this upgrade?" entry point.** This is a distinct, high-intent use case (someone who already owns a PSU deciding on a GPU upgrade) from "planning a build from scratch" — give it its own clear page and URL, not just a checker buried inside the main calculator.
2. **A used/secondhand component price range indicator**, alongside new pricing — a real, common part of PC building (especially GPUs) that general-purpose build sites handle poorly. Real added value, though it adds ongoing data-maintenance work worth planning for explicitly.
3. **A concrete database-freshness trigger**, not just a calendar cadence — tie data refreshes to major manufacturer announcement dates (new GPU/CPU generation launches) so the database doesn't go stale exactly when search interest in new hardware spikes.
4. **Explicit accessibility requirements** treated as core, not an afterthought, given the calculators are the entire product (see Section 5, Step 12).
5. **Public, cited sourcing for every PSU methodology claim**, matching the best existing specialist tools' own standard (see Section 6.4) — this should be a visible, permanent page (a `/methodology` page), not just scattered footnotes.

---

## 9. Success Checklist Before Calling This Launch-Ready

- [ ] Every dataset entry (CPU, GPU, PSU) traceable to a real, cited source
- [ ] PSU engine unit-tested and sanity-checked against 5-10 real builds
- [ ] Every methodology claim publicly cited on a `/methodology` page
- [ ] Cable-Melt Auditor and TCO Calculator built to the highest polish in the product
- [ ] Oracle page quality gate verified at initial launch batch before any further scaling
- [ ] Full schema coverage validated (WebApplication, HowTo, FAQPage, Product, Dataset)
- [ ] Every page reachable through the internal linking mesh — zero orphans
- [ ] Every calculator keyboard-operable and screen-reader-usable
- [ ] No ad placement causes layout shift or sits between user and result
- [ ] Mobile experience verified as equal to desktop on every calculator