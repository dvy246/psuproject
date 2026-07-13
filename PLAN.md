# PLAN.md — PC Build Cost + PSU Analysis Hub

## Where the PRD Was Wrong (Verified by Live Check)

| PRD Claim | Verified Reality |
|---|---|
| TechSearchers: "Text only" output, "no planning guides" | **False** — interactive calculator with graphs, confidence scores, line-item breakdown, plus guides (PSU sizing, ATX vs SFX) cross-linked from calculator |
| TechSearchers: "Manual blog posts, can't match scale" | **Overstated** — has CMS template archives, not a scaled programmatic pipeline; core articles are manually bylined |
| PCPartPicker: "No PSU calculator AT ALL" | **Misleading** — confirmed wattage estimation in every build list with per-component breakdown (no transient/ATX depth) |
| Seasonic: "minimum only, no headroom guidance" | **False** — verified functional (2026 content, Tom's Hardware citations), includes peak-load reserve and acknowledges GPU transients in FAQ |
| Newegg: "broken (internal error)" | **Unsubstantiated** — bot detection triggered during testing; tool confirmed functional by Newegg Insider (2025) and third-party sources |
| Cooler Master: "legacy subdomain, no calculator" | **Unverified** — removed from PRD |
| "PSU calculation methodology" = High-difficulty moat | **False** — TechSearchers already does this; parity is table stakes |
| Confidence: 94% | **Overstated** — corrected to 80% with honest assessment |

## What's Still True (The Real Opportunity)

1. **Three-pillar combination**: No competitor combines build-cost breakdown + deep PSU analysis + integrated guides in one connected product
2. **Cost optimization layer**: PCPartPicker structurally lacks pie charts, budget allocation advice, "save $X by choosing Y"
3. **TechSearchers lacks**: Build cost/pricing database, TCO calculator, cost optimization
4. **Oracle pages**: CPU×GPU "is X enough" matrix at scale — no competitor does this
5. **Manufacturer calculators**: Structurally biased to their own catalogs (still holds)
6. **TCO calculator**: TechSearchers doesn't model multi-year kWh cost across efficiency tiers — real differentiator
7. **Cable-Melt Prevention Auditor**: TechSearchers mentions daisy-chain risk in buying tips but has no dedicated dynamic audit card

## Build Plan

### Step 1 — Scaffold Project
- Astro 5.x + Preact (`@astrojs/preact`) + Tailwind CSS v4
- Structure: `src/data/`, `src/lib/`, `src/pages/`, `src/components/`
- Cloudflare Pages deployment configured from day 1

### Step 2 — Static Data Layer (Cite All Sources)
- `cpus.json` — Intel Ark, AMD official specs (TDP, socket, generation, price)
- `gpus.json` — TechPowerUp, manufacturer pages (TBP, tier, transient multiplier)
- `motherboards.json` — socket, form factor, price
- `psus.json` — ~150 models (wattage, efficiency, ATX version, price)
- `psu_efficiency.json` — real 80+ certification curves at 10-100% load
- `components.json` — RAM/storage/cooling draws + pricing tiers
- Source citations in every dataset for verifiable updates

### Step 3 — PSU Calculation Engine (Pure Functions + Unit Tests)
No UI dependency. Test against known reference values before wiring up anything.

| Module | Purpose |
|---|---|
| `psu.ts` | Base draw + transient spikes (verify multipliers against Cybenetics published data) |
| `efficiency.ts` | 80+ wall-power conversion curves |
| `atx31.ts` | ATX 3.0/3.1 compliance (200% spikes for 100μs) |
| `rail.ts` | Per-rail current estimation |
| `cost.ts` | 5-year TCO (purchase + electricity across efficiency tiers) |
| `validate.ts` | Socket/power/clearance compatibility |
| `optimize.ts` | Cost optimization suggestions |

TechSearchers' methodology sets the transparency floor: every output must show base draw, peak spike, efficiency loss, aging penalty, and safety buffer as separate line items. Publicly cite Cybenetics/HWiNFO/TechPowerUp as methodology sources (same as TechSearchers does) to establish credibility.

### Step 4 — Build Cost Calculator
- `ComponentSelector` — dropdown/search per component
- `CostBreakdown` — Chart.js pie chart + per-component table with affiliate links
- `optimize.ts` — "RTX 5070 is 15% cheaper than RTX 5070 Ti with 10% less performance"
- Shareable URL with build encoded in params

### Step 5 — PSU Deep Analysis UI (Match TechSearchers' Standard)
- Recommended wattage with confidence score + ATX 3.1/2.x badge
- Full line-item breakdown (every watt explained)
- Per-rail table (+12V, +5V, +3.3V current)
- Dual-graph transient spike visualizer (continuous load + transient peak vs PSU rating)
- PSU model recommendations (3-5, affiliate links)
- "Is my current PSU enough?" checker

### Step 6 — Differentiated Features (Not Matched by Competitors)
- **TCO Calculator**: State-aware kWh pricing, 3/5-year comparison across 80+ tiers
- **Cable-Melt Prevention Auditor**: Dynamic warning card for high-end GPUs with connector requirements and daisy-chain warnings
- **Dedicated "PSU vs upgrade" page**: Distinct entry point on /psu-calculator for users comparing their current PSU against a planned GPU upgrade

### Step 7 — Integrated Guides (Cross-Linked From Day 1)
1. How to Build a PC (12-step walkthrough)
2. ATX 3.1 Guide
3. PSU Sizing Guide
4. 80+ Efficiency Guide
5. PC Budget Guide ($500/$1000/$1500/$2500)
6. PC Building Tips

Every guide links to relevant calculator; every calculator result links to relevant guide.

### Step 8 — Oracle Pages (With Quality Gate)
- Generate CPU×GPU cross-product matrix per PRD Section 5.5
- **Quality gate**: Each page must include unique analysis beyond templated answer (e.g., "the RTX 5090's 575W spike is the binding constraint, not the 9800X3D's 120W")
- Also include: binding constraint identification, realistic upgrade path suggestion
- Launch in batches: top 50 combos first → verify rankings → scale to 7,440
- Self-referencing canonical tags on every page

### Step 9 — Schema & Technical SEO
- JSON-LD: WebApplication, HowTo, FAQPage, Product
- Open Graph tags for build URL sharing
- Astro sitemap generation

### Step 10 — Affiliate & AdSense
- Amazon Associates, Newegg, B&H on PSU recs and component pricing
- AdSense on calculator pages ($5-8 RPM), guides ($3-5 RPM)
- Rule: no layout-shift ads; no ads between user and calculation result

### Step 11 — Full Verification Before Launch
- Run 5-10 real builds through PSU engine, sanity-check against TDP + 1.25-1.5× buffer
- Verify all dataset sources are current
- Confirm Oracle quality gate held at launch batch
- Keyboard operability and screen-reader accessibility audit
- Methodology source citations visible on calculator page

## What the PRD Missed (Added Here)

1. **"Compare PSU vs upgrade" deserves dedicated page** — high-intent use case distinct from "plan a build from scratch"
2. **Component freshness plan** — checklist tied to manufacturer announcement dates, not just quarterly calendar
3. **Accessibility requirements** — keyboard operability, screen-reader-usable chart data
4. **Methodology citations** — cite Cybenetics/HWiNFO/TechPowerUp publicly (same as TechSearchers does)
5. **Used/refurbished pricing** — potential low-effort differentiator PCPartPicker doesn't do
6. **Oracle page quality gate** — per-page unique analysis required; batch-launch strategy; thin-content risk mitigation
