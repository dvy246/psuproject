# PRD: PC Build Cost + PSU Analysis + Planning Hub

**Version:** 1.0
**Date:** July 13, 2026
**Site Type:** Static Astro.js site with client-side interactive calculators
**Confidence:** 80%

---

## 1. Executive Summary

### 1.1 The Product
A single-page application (Astro.js static) that answers three questions every PC builder asks:
1. **"How much does this build cost?"** — True per-component cost with breakdown visualization
2. **"Is my PSU safe?"** — Deep PSU analysis (transients, ATX 3.1, per-rail, efficiency, aging)
3. **"How do I build it?"** — Step-by-step guides, tool checklists, planning strategies

### 1.2 The Gap
| Competitor | Build Cost | PSU Depth | Visualizations | Guides | SEO Scale |
|---|---|---|---|---|---|
| PCPartPicker | ✅ Live pricing, no cost summary | ❌ Basic TDP sum only | ❌ No graphs | ❌ None | ❌ Manual only |
| Manufacturer calculators | ❌ Only their products | ⚠️ Biased recommendations | ❌ No graphs | ❌ None | ❌ Single page |
| OmniCalculator / generic | ⚠️ Manual entry, no DB | ❌ None | ❌ No graphs | ❌ None | ❌ Single page |
| TechSearchers | ❌ None | ✅ Good (Cybenetics, transients, confidence scores) | ⚠️ Some interactive graphs | ⚠️ Guides + buying tips | ⚠️ Some programmatic content |
| **This product** | ✅ True cost + breakdown | ✅ Transients + ATX 3.1 + models + TCO + cabling audit | ✅ Spike vs load graph | ✅ Integrated guides | ✅ 1000+ programmatic pages |

### 1.3 Key Metrics (Target)
- **Head keywords**: "pc build cost calculator" (est. 5-20K/mo), "psu calculator" (18K/mo), "how to build a pc" (450K/mo informational)
- **Total TAM**: ~1M+/mo US searches across PC building vertical
- **Monetization**: Amazon/Newegg affiliate (1-4% on $500-3K builds) + AdSense ($3-8 RPM)
- **Development time**: 5-6 weeks for v1

---

## 2. Problem & Opportunity

### 2.1 User Pain Points

1. **PCPartPicker shows prices but no cost summary** — You see individual prices but no pie chart, no budget allocation guidance, no "spend 40% on GPU" advice
2. **PSU calculators are biased** — Manufacturer tools push their own PSUs; cannot give unbiased recommendations
3. **No integrated planning** — Users jump between 3-5 tabs (PCPartPicker + PSU calculator + build guide YouTube + Reddit)
4. **No cost optimization** — "What if I spend $50 more on the PSU and save $30/year on electricity?" — nobody answers this
5. **No static, fast, modern experience** — Most tools have 2005-era UI

### 2.2 Market Validation

| Signal | Source |
|---|---|
| OuterVision shutdown left gap | Tom's Hardware, VOGONS forums, SilverPC blog |
| Reddit users asking for alternatives | r/buildapc, r/pcmasterrace |
| RTX 5090/5080 driving new builds | NVIDIA announcements, AI boom |
| ATX 3.1 transition confusing builders | TechPowerUp, Gamers Nexus commentary |
| PC PSU market $8.3B, growing 5.7% CAGR | Morgan Reed Insights, ReportPrime |
| "psu calculator" 18K/mo searches | Semrush (via Seasonic/Cooler Master data) |
| "pc builder" 60K/mo searches | Semrush |

### 2.3 Competitive Deep Dive

**PCPartPicker** (dominant, DA ~75)
- Strengths: Huge DB, live pricing, compatibility checking
- Weaknesses: Basic wattage estimation (not deep transient/ATX analysis), dated UI, no build guides, cluttered
- Est. traffic: ~30M+/mo (301K branded searches alone)
- Response to us: Unlikely to copy — PSU depth would require architectural rebuild

**Manufacturer calculators** (Seasonic, Corsair, be quiet!, ASUS, Cooler Master)
- Strengths: High DA, trust
- Weaknesses: All structurally biased to their own products; most lack transient/ATX 3.1 depth; Seasonic's calculator includes peak-load reserve and acknowledges GPU spikes but is still bound to the Seasonic catalog
- Cannot fix bias — it's their business model

**PCPartPicker alternatives** (PlanMyPC, GixCore, BuildMyPC, MaxMyBuild, EasyPC)
- Strengths: Some have modern UI, some have AI
- Weaknesses: None have PSU depth beyond basic wattage; none combine cost + PSU + guides
- EasyPC has AI but PSU is generic; GixCore shows PSU headroom but no ATX/transient analysis

**TechSearchers** (most similar PSU-only competitor)
- Strengths: Cybenetics data, transient multipliers (1.35× GPU, 1.2× CPU), efficiency modeling, confidence scores, line-item transparency, cross-linked guides, affiliate links
- Weaknesses: **PSU only** — no build cost, no component pricing database, no cost optimization, no TCO calculator
- Our differentiator: build cost + PSU depth + guides + cost optimization combined in one product

---

## 3. Keyword & SEO Strategy

### 3.1 Target Keywords by Priority

| Priority | Keyword | Est. US Vol | Intent | Page |
|---|---|---|---|---|
| P0 | "psu calculator" | 18,100/mo | Commercial | /psu-calculator |
| P0 | "power supply calculator" | 18,100/mo | Commercial | /psu-calculator |
| P0 | "pc power supply calculator" | 9,900/mo | Commercial | /psu-calculator |
| P1 | "pc build cost calculator" | 5-20K/mo | Commercial | / (homepage) |
| P1 | "how much to build a pc" | 5-15K/mo | Informational | /build-cost-calculator |
| P2 | "build a pc for" | 10-30K/mo | Commercial | PC builder page |
| P2 | "pc builder" | 60,500/mo | Commercial | /pc-builder |
| P2 | "custom pc builder" | 52,300/mo | Commercial | /pc-builder |
| P3 | "how to build a pc" | 450,000/mo | Informational | /guides/how-to-build-a-pc |
| P3 | "atx 3.1 guide" | 2-5K/mo | Informational | /guides/atx-3-1 |
| P3 | "80 plus efficiency guide" | 3-8K/mo | Informational | /guides/psu-efficiency |
| P3 | "pc building tips" | 8-15K/mo | Informational | /guides/building-tips |

### 3.2 SEO Architecture

```
/                                       <- PC Build Cost Calculator (hub)
/psu-calculator/                        <- PSU Deep Analysis
/pc-builder/                            <- Full PC Builder + Cost
/oracle/                                <- Programmatic PSU oracle pages
├── is-750w-enough-for-rtx-5080/
├── is-850w-enough-for-rtx-5090-ryzen-9800x3d/
├── is-650w-enough-for-rtx-5070/
├── ... (1000+ pages auto-generated from CPU x GPU matrix)
/guides/
├── how-to-build-a-pc/
├── atx-3-1-guide/
├── psu-sizing-guide/
├── psu-efficiency-guide/
├── budget-guide/
├── building-tips/
/psu-checker/                           <- "Is my PSU enough for my upgrade?" (dedicated high-intent flow)
/compare/psu/                           <- PSU Model Comparison
/blog/                                  <- Content marketing
```

### 3.3 Programmatic "Oracle" Pages (The SEO Nuke)

**Purpose**: Capture 100,000+ long-tail "Is X Watts enough for Y?" searches that currently go to Reddit threads and forum arguments.

**How it works**: Using Astro's static generation, cross-multiply every modern CPU (~30) with every modern GPU (~40) to produce **1000+ ultra-fast, zero-layout-shift landing pages**.

**Page URL pattern**: `/oracle/is-{wattage}-enough-for-{gpu}` and `/oracle/is-{wattage}-enough-for-{gpu}-{cpu}`

**Each page delivers**:
- Instant answer: "Yes, 850W is enough for RTX 5080 + Ryzen 7 9800X3D — with 180W headroom"
- The dual-graph transient spike visualizer pre-loaded with the specific combo
- Three recommended PSUs (affiliate links) at different price tiers
- Generate Astro static pages at build time from the CPU x GPU cross-product matrix

**Why no competitor does this**:
- PCPartPicker has dynamic pages, not static pre-rendered SEO pages
- TechSearchers has some programmatic content but hasn't scaled a CPU×GPU oracle matrix
- Manufacturer calculators only show their own PSUs

### 3.4 Schema Markup
- Calculator schema on calculator pages (Google rich result eligibility)
- HowTo schema on guide pages
- FAQ schema on FAQ sections
- Product schema on PSU recommendations with affiliate links
- Dataset schema on oracle pages for structured "Is X enough for Y" results

---

## 4. Product Requirements

### 4.1 Core Calculator: Build Cost Estimator

**Purpose**: User selects components, sees true total cost with breakdown.

**Inputs**:
| Component | Selection Method | Data Source |
|---|---|---|
| CPU | Dropdown + search (Intel/AMD) | JSON DB with TDP + pricing |
| GPU | Dropdown + search | JSON DB with TBP + pricing |
| Motherboard | Dropdown (socket-filtered) | JSON DB |
| RAM | Capacity + speed picker | Price tier map |
| Storage | Type + capacity picker | Price tier map |
| PSU | Auto-recommended or manual | PSU engine (see 4.2) |
| Case | Form-factor filtered | JSON DB |
| Cooling | Type picker (air/AIO/custom) | Price tier map |
| OS | Windows/Linux/None | Fixed price |
| Monitor | Optional peripheral | Price tier map |
| Keyboard/Mouse | Optional peripheral | Price tier map |
| Tax rate | Slider/input | User-configurable |
| Assembly fee | Toggle + input | User-configurable |

**Outputs**:
- **Total build cost** with pie chart (GPU %, CPU %, etc.)
- **Per-component breakdown** table with affiliate links
- **Budget allocation analysis** ("You're spending 48% on GPU — ideal for gaming")
- **Cost optimization tips** ("RTX 5070 is 15% cheaper than RTX 5070 Ti with 10% less performance")
- **Price history indicator** ("Prices trending down on this CPU")
- **Shareable URL** with build encoded in params

### 4.2 PSU Deep Analysis Engine

**Purpose**: Go beyond simple TDP sum. Model real-world power behavior.

**Calculation steps**:
1. **Base draw**: Sum of all component TDPs
2. **Transient spike modeling**:
   - GPU spikes: 1.35x-2.0x TDP (depends on GPU tier)
   - CPU spikes: 1.2x TDP
   - Duration: 100μs-10ms
3. **ATX compliance check**:
   - ATX 3.1: Built to handle 200% spikes for 100μs — recommend lower headroom (20%)
   - ATX 2.x: Needs larger buffer (30-40%)
4. **Efficiency adjustment**: Wall power = DC power ÷ efficiency (80+ Bronze=82%, Gold=87%, Platinum=89%, Titanium=92%)
5. **Capacitor aging**: +5% per year for PSUs >3 years old
6. **Safety buffer**: User-configurable (default 25%)
7. **Multi-GPU**: Add 1.5x per additional GPU to account for transient overlap

**Methodology sources**: All transient spike multipliers sourced from Cybenetics PSU lab published data. GPU power figures cross-referenced against TechPowerUp GPU database and HWiNFO real-world measurements. Efficiency curves from 80+ certification public data. Full source references available on a `/methodology` page.

**Outputs**:
- **Recommended wattage** with confidence score
- **Recommended PSU models** (3-5 picks from DB, affiliate links)
- **ATX 3.1 vs ATX 2.x recommendation**
- **Per-rail analysis** (+12V, +5V, +3.3V current in amps)
- **5-year cost comparison** (purchase price + electricity at different 80+ tiers)
- **Dedicated "Is my PSU enough for my upgrade?"** page at `/psu-checker/` — distinct entry point from the full build calculator. User selects their current PSU wattage + planned upgrade component (GPU or CPU), gets a clear Yes/Borderline/No verdict with specific transient spike reasoning and headroom analysis. High-intent flow for users who already own a PSU and are deciding whether to upgrade.
- **Upgrade headroom** ("You have 200W of headroom for GPU upgrade")
- **Dual-graph transient spike visualizer**: Interactive SVG/Canvas graph showing two thresholds — Blue line for continuous operating load (e.g. 650W), Red flashing peak for transient micro-spike (e.g. 940W at 0.1ms). When the red spike visually crosses the user's PSU rating line, the psychological urgency to buy the proper PSU drives affiliate conversion.
- **Cable-Melt Prevention Auditor**: When a high-end GPU (RTX 4080/4090/5090 or RX 7900 XTX/9070 XT) is detected, an "Infrastructure Warning" card displays specific cabling requirements. Example: "WARNING: RTX 5090 detected. DO NOT daisy-chain PCIe cables. You require an ATX 3.1 PSU with a native 12V-2x6 cable, or 4 dedicated separate 8-pin PCIe cables." This safety audit turns the tool from a calculator into a risk management dashboard.
- **PSU Total Cost of Ownership (TCO) Calculator**: State-aware kWh pricing toggle that compares purchase price + electricity cost over 3-5 years across 80+ Bronze/Gold/Platinum/Titanium. Output: "Upgrading from $100 Bronze to $150 Platinum saves $85 in electricity over 3 years — pays for itself." Justifies higher-tier affiliate purchases and gives real financial planning advice no competitor offers.

### 4.3 Cost Optimization Features

- **"Save $50 by choosing this PSU instead"** — Show equivalent PSUs at lower price
- **"Downgrade CPU to save $100, lose 5% gaming performance"**
- **"This build costs $80/month to run at 4h/day gaming"** — Electricity cost calculator
- **"Buy these 3 parts from Amazon, this from Newegg"** — Cross-retailer optimization

### 4.4 Planning Guides & Content

**Interactive guides** (step-by-step with checklist):
1. **How to Build a PC** — Complete walkthrough, 12 steps, tool checklist, photos/illustrations
2. **ATX 3.1 Guide** — What it is, why it matters, how to check, compatible PSUs
3. **PSU Sizing Guide** — How much wattage you actually need, debunking myths
4. **80+ Efficiency Guide** — Bronze vs Gold vs Platinum vs Titanium, ROI calculator
5. **PC Budget Guide** — How to allocate $500/$1000/$1500/$2500 builds
6. **PC Building Tips** — Cable management, thermal paste, static protection, testing

**Content strategy**:
- Each guide cross-links to calculator pages
- Guides contain affiliate links to relevant products
- Guides are static, SEO-optimized, fast-loading
- FAQ sections with schema markup

### 4.5 User Flows

**Flow 1: "How much for my dream build?"**
1. User lands on homepage
2. Selects CPU → GPU → Motherboard → RAM → Storage
3. PSU auto-recommends based on PSU engine
4. Sees total cost + pie chart + PSU analysis
5. Clicks affiliate link → buys on Amazon

**Flow 2: "Is my PSU safe for my upgrade?"**
1. User lands on /psu-calculator
2. Selects components + enters current PSU wattage
3. Sees: "Your 650W PSU is borderline. Transient spikes may trip protection."
4. Gets specific model recommendations
5. Affiliate click

**Flow 3: "I know nothing about PCs"**
1. User lands on /guides/how-to-build-a-pc
2. Reads step-by-step guide
3. Clicks "Calculate your build cost" → Flow 1

**Flow 4: "Is my current PSU enough for this GPU upgrade?"**
1. User lands on /psu-checker
2. Selects their current PSU wattage + the GPU they want to upgrade to
3. Sees verdict: "Your 650W PSU is borderline for RTX 5080 — transient spikes may trip protection"
4. Gets specific upgrade recommendations with affiliate links
5. Optionally clicks through to full PSU calculator for deeper analysis

---

## 5. Technical Architecture

### 5.1 Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| Framework | **Astro.js 5.x** | Static-first, zero JS by default, islands architecture |
| UI Engine | **Preact** (via `@astrojs/preact`) | Lightweight interactivity for calculators |
| Styling | **Tailwind CSS v4** | Modern utility-first, consistent design |
| Charts | **Chart.js** (via canvas) | Pie charts for cost breakdown, bar charts for PSU comparison |
| Icons | **Lucide** | Clean, consistent icon set |
| Deployment | **Cloudflare Pages** | Free, global CDN, fast static hosting |
| Analytics | **Plausible** (self-hosted) | Privacy-focused, no GDPR issues |

### 5.2 Component Tree

```
App (Astro Layout)
├── Header (Nav + Logo)
├── Hero Section (SEO-focused H1 + intro)
├── Build Cost Calculator (Preact island)
│   ├── ComponentSelector (dropdown/search)
│   │   ├── CPUPicker
│   │   ├── GPUPicker
│   │   ├── MotherboardPicker
│   │   ├── RAMPicker
│   │   ├── StoragePicker
│   │   ├── PSUAnalyzer (auto/manual toggle)
│   │   └── CasePicker
│   ├── CostBreakdown (Chart.js pie chart)
│   │   ├── PieChart
│   │   ├── CostTable
│   │   └── AffiliateLinks
│   ├── PSUSection
│   │   ├── WattageResult
│   │   ├── TransientSpikeAnalysis
│   │   ├── DualGraphVisualizer       # Blue continuous line + red transient spike graph
│   │   ├── CableMeltAuditor           # Infrastructure warning card for high-end GPUs
│   │   ├── ATXComplianceBadge
│   │   ├── PerRailAnalysis
│   │   ├── FiveYearCostCompare
│   │   ├── TCOSummary                 # "Bronze costs $X more over 5 years than Platinum"
│   │   └── PSUModelRecommendations
│   └── CostOptimization
│       ├── SavingsTips
│       └── ElectricityCostCalc
├── Guides Grid (Static Astro pages)
│   ├── GuideCard (linked to each guide)
│   └── RelatedCalculators
└── Footer
```

### 5.3 Data Architecture (Static JSON)

```
src/data/
├── cpus.json              # ~200 CPUs with TDP, price, socket, generation
├── gpus.json              # ~100 GPUs with TBP, price, tier, transient_multiplier
├── motherboards.json      # ~100 mobos with socket, form_factor, price
├── psus.json              # ~150 PSU models with wattage, efficiency, atx_version, price, cybenetics_rating
├── components.json        # RAM/storage/cooling/fan typical draws + pricing tiers
├── psu_efficiency.json    # 80+ efficiency curves at different load %
└── affiliate.json         # Amazon/Newegg affiliate IDs per product
```

**Data source strategy**:
- Initial DB: Manual compilation from TechPowerUp, Intel Ark, AMD specs, retailer pricing
- Updates: Trigger-based refresh tied to major manufacturer announcement dates (NVIDIA GPU launches, AMD CPU launches, Intel CPU launches) + quarterly price sanity check between announcement cycles
- **Freshness triggers**: New GPU/CPU launch → update relevant JSON within 7 days. Community feedback flagging stale prices → review within 48 hours
- Post-v1 stretch: Used/refurbished pricing indicators alongside new pricing — PCPartPicker doesn't handle this well and it's common in PC building (especially GPUs). Adds data maintenance burden; evaluate after core experience is solid.
- Future: Automated price scraping via GitHub Actions + API (if feasible)

### 5.4 Calculation Engine

```
src/lib/
├── calculate.ts           # Main build cost summation
├── psu.ts                 # PSU wattage calculation (base + transients + aging)
├── efficiency.ts          # 80+ efficiency modeling + wall power calculation
├── atx31.ts               # ATX 3.0/3.1 compliance checks
├── rail.ts                # Per-rail current estimation
├── cost.ts                # 5-year cost projection (purchase + electricity)
├── optimize.ts            # Cost optimization suggestions
└── validate.ts            # Basic compatibility checks (socket, power, clearance)
```

### 5.5 Oracle Page Generation

**Build-time generation**: A script in `src/pages/oracle/` cross-multiplies the CPU and GPU databases at build time to produce static pages.

```typescript
// Pseudocode for oracle page generation
const cpus = getCPUs()  // ~30 modern CPUs
const gpus = getGPUs()  // ~40 modern GPUs
const wattages = [550, 650, 750, 850, 1000, 1200]

for (const gpu of gpus) {
  for (const wattage of wattages) {
    generatePage(`/oracle/is-${wattage}-enough-for-${gpu.slug}`, {
      gpu, wattage, cpu: null  // GPU-only variant
    })
  }
  for (const cpu of cpus) {
    for (const wattage of wattages) {
      generatePage(`/oracle/is-${wattage}-enough-for-${gpu.slug}-${cpu.slug}`, {
        gpu, cpu, wattage
      })
    }
  }
}
```

~6 wattages × 40 GPUs = 240 GPU-only pages. ~6 × 40 × 30 = 7,200 full combo pages. **~7,440 total static pages** — trivial for Astro's build pipeline.

**Quality gate (critical)**: Each page must include unique, page-specific analysis beyond the templated answer (e.g., "the RTX 5090's 575W transient spike is the binding constraint here, not the 9800X3D's 120W draw"). Launch in batches — start with top 50 highest-search-volume combos, verify rankings, then scale to 7,440. This mitigates thin-content risk from Google's helpful-content systems.

Each page contains:
- Unique H1: "Is [Wattage]W enough for [GPU] + [CPU]?"
- Pre-rendered PSU analysis with the specific combo's base draw, transient spike, and headroom
- Binding constraint identification (which component drives the wattage need)
- Realistic upgrade path suggestion specific to the pairing
- Dual transient spike graph pre-loaded for the combo
- 3 PSU recommendations at budget/mid/premium with affiliate links
- Internal links to main calculator + relevant guides
- Canonical tag pointing to itself (no duplicate content issues)

### 5.6 SEO Implementation
- **JSON-LD structured data**:
  - `@type: WebApplication` for calculators
  - `@type: HowTo` for guides
  - `@type: FAQPage` for FAQ
  - `@type: Product` for PSU recommendations
- **Internal linking mesh**: Every calculator links to relevant guides, every guide links to calculators
- **Sitemap generation**: Astro's built-in sitemap integration
- **Open Graph tags**: For social sharing of build URLs

---

## 6. UI/UX Design

### 6.1 Design Principles
- **Dark theme first** (PC enthusiast audience preference)
- **Skeleton loading** for calculator islands
- **Live calculation** (no submit button — results update as user selects)
- **Mobile-first responsive** (many users research on phone, buy on desktop)
- **Sub-100ms interaction** feedback (Preact islands keep it snappy)
- **Accessibility-first**: All calculator results must be fully keyboard-operable. Chart data (pie charts, transient spike graphs) must have screen-reader-accessible text alternatives — no information conveyed solely through visual graphs. Color is never the sole indicator of status (supporting text labels accompany all green/yellow/red badges). Target WCAG 2.1 AA compliance.

### 6.2 Key UI Patterns

**Homepage**:
- Hero section: "Build Your PC. Know the True Cost. Pick the Right PSU."
- Three-step visual: 1. Select components → 2. See cost + PSU analysis → 3. Build with confidence
- Below fold: Guide cards grid + featured calculators

**Calculator page**:
- Left sidebar: Component selectors (accordion style)
- Right main: Live results panel
  - Top: Total cost (hero number) + pie chart
  - Middle: PSU analysis card (wattage, ATX badge, confidence)
  - Bottom: Model recommendations with buy buttons

**PSU calculator page**:
- Single focused column
- Component selectors at top
- Results cascade down:
  - Recommended wattage (large number)
  - ATX compliance badge (green/yellow/red)
  - **Dual-graph transient spike visualizer**: SVG line graph with blue continuous load line, red transient spike peak, and a dashed horizontal line marking the user's PSU rating. If the red spike crosses the dashed line, the graph pulses red — instant visual urgency.
  - **Cable-Melt Prevention card**: Red/yellow/green warning card that appears when a high-end GPU is selected. Shows specific cabling requirements, connector types, and warnings against daisy-chaining.
  - Per-rail table
  - 5-year cost comparison chart + TCO summary card comparing Bronze vs Gold vs Platinum over 3/5 years
  - PSU model cards (3-5, with prices + affiliate links)

**Oracle pages**:
- URL: `/oracle/is-{wattage}-enough-for-{gpu}-{cpu}`
- Hero: "Yes/No — [Wattage]W is [enough/not enough] for [GPU] + [CPU]"
- Pre-loaded transient spike graph specific to the combo
- Three PSU recommendations at budget/mid/premium tiers
- Helper CTA: "Calculate your exact build →" linking to main calculator

### 6.3 Color Palette

| Token | Color | Usage |
|---|---|---|
| `--bg-primary` | `#0a0a0b` | Page background |
| `--bg-secondary` | `#18181b` | Card background |
| `--bg-tertiary` | `#27272a` | Input background |
| `--text-primary` | `#fafafa` | Headings |
| `--text-secondary` | `#a1a1aa` | Body text |
| `--accent` | `#22d3ee` | Cyan (tech/gaming feel) |
| `--accent-secondary` | `#a78bfa` | Purple (PSU analysis) |
| `--success` | `#22c55e` | Compatible / safe |
| `--warning` | `#eab308` | Borderline |
| `--danger` | `#ef4444` | Incompatible / unsafe |

---

## 7. The Moat

### 7.1 Structural Advantages

| Moat Layer | Description | Copy Difficulty |
|---|---|---|
| **Combined value prop** | Cost + PSU + Guides = unique trifecta | High — PCPartPicker would need PSU engine; PSU tools would need cost DB |
| **Component DB** | Curated CPU/GPU/PSU database with pricing | Medium — takes time to build |
| **PSU calculation methodology** | Transients + ATX 3.1 + per-rail + aging + efficiency | Medium — TechSearchers already uses similar Cybenetics-based methodology; parity is table stakes, not a moat |
| **SEO content mesh** | Interlinked calculators + guides growing over time | Medium — takes time |
| **User builds (URL sharing)** | Users share their build URLs → natural backlinks | Very High — network effect |
| **Brand trust** | Independent, unbiased recommendations | Very High — manufacturer tools can't claim this |
| **Freshness** | Updated for every new GPU/CPU/PSU launch | High — maintenance commitment |
| **Oracle pages (SEO scale)** | 7,440+ programmatic pages answering specific "Is X enough for Y?" queries | Very High — requires CPU × GPU DB + generation pipeline; competitors would need months to replicate |
| **Dual-graph visualization** | Interactive transient spike graph | Medium — TechSearchers shows spike values but not a line graph with PSU threshold crossing |
| **Cable-melt auditor** | Safety audit card that builds trust and authority | Low to copy but no one does it |
| **TCO calculator** | Proves ROI of premium PSU purchases | Medium — requires state kWh data + efficiency curves |

### 7.2 Defensibility Over Time

- **Month 1-3**: Build leads in "psu calculator" + "pc build cost" keywords
- **Month 3-6**: Content mesh grows, backlinks accumulate, build sharing starts
- **Month 6-12**: Domain authority rises, new pages rank faster, user-generated backlinks compound
- **Year 2+**: Brand recognition, trusted status, difficult for new entrants to compete

---

## 8. Monetization Detail

### 8.1 Affiliate Strategy

| Program | Commission | Avg Order | Per Conversion |
|---|---|---|---|
| Amazon Associates | 1-4% (varies by category) | $75-150 (single component) | $0.75-$6.00 |
| Amazon Associates | 1-4% | $500-3,000 (full build) | $5-$120 |
| Newegg Affiliate | 1-4% | Similar | Similar |
| B&H Affiliate | 1-3% | Similar | Similar |

**Integration points**:
- Each PSU recommendation → "Buy on Amazon" button
- Each component in cost breakdown → Amazon price link
- Guide tool suggestions → Amazon links
- "Best PSU for X build" → affiliate roundups

### 8.2 AdSense Strategy

| Page Type | Est. RPM | Volume | Revenue |
|---|---|---|---|
| Calculator pages | $5-8 RPM | High traffic | Primary income |
| Guide pages | $3-5 RPM | Medium traffic | Secondary |
| Blog/content | $2-4 RPM | Growing | Long tail |

### 8.3 Future Monetization
- **Sponsored guides**: "Best PSU for RTX 5090 builds" with affiliate
- **Premium tier**: Price-drop alerts, unlimited build saves, CSV export ($3-5/mo)
- **Data licensing**: Aggregated build pricing trends (B2B)

---

## 9. Implementation Phases

### Phase 1: Core Calculator + PSU Engine (Days 1-5)

| Day | Task | Deliverable |
|---|---|---|
| 1 | Astro project setup + Tailwind + Preact | Running skeleton |
| 2 | Component DB (JSON files) + types | ~300 components |
| 3 | Build Cost Calculator UI + calculation engine | Cost breakdown working |
| 4 | PSU Analysis Engine (transients, ATX, efficiency) | PSU analysis working |
| 5 | Integrate both + result panels + styling | Phase 1 complete |

### Phase 2: PSU Comparison + Cost Over Time (Days 6-9)

| Day | Task | Deliverable |
|---|---|---|
| 6 | PSU model DB (~100 PSUs with pricing + ratings) | PSU database |
| 7 | PSU model recommendations + comparison table + dual-graph transient spike visualizer | Recommendations + graph working |
| 8 | Cable-melt prevention auditor + TCO energy calculator with state kWh data | Safety audit + cost projections |
| 9 | 5-year cost comparison + electricity estimator | Full cost over time working |

### Phase 3: Planning Guides + SEO (Days 9-12)

| Day | Task | Deliverable |
|---|---|---|
| 9 | Write: How to Build a PC guide | Published guide |
| 10 | Write: ATX 3.1 guide + PSU sizing guide | Published guides |
| 11 | Write: 80+ Efficiency guide + Budget guide + Tips | Published guides |
| 12 | Schema markup + sitemap + OG tags + internal linking | SEO foundation complete |

### Phase 4: Oracle Pages (Days 13-14)

| Day | Task | Deliverable |
|---|---|---|
| 13 | Build CPU x GPU cross-product generation script, create oracle page template with transient spike graph + PSU recommendations | 1000+ pages generating at build time |
| 14 | Wire up canonical tags, internal linking from oracle pages to main calculator + guides | Oracle SEO mesh complete |

### Phase 5: Polish + Launch (Days 15-17)

| Day | Task | Deliverable |
|---|---|---|
| 15 | Build sharing (URL encoding), affiliate link integration, cable-melt auditor + TCO calculator | All features working |
| 16 | Responsive testing, edge cases, performance audit | QA pass |
| 17 | Deploy to Cloudflare Pages, submit sitemap, post to Reddit | LAUNCH |

### Phase 6: Future Calculators (Post-Launch)

- **Bottleneck Calculator** — CPU vs GPU bottleneck at target resolution
- **FPS Estimator** — Expected FPS in popular games based on build
- **Budget Planner** — "I have $1500, what build should I do?"
- **Prebuilt vs Custom Cost Analyzer** — Is this prebuilt worth it?
- **Upgrade Impact Calculator** — "Will upgrading from RTX 4070 to RTX 5090 give me 50% more FPS?"

---

## 10. Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| PCPartPicker deepens PSU features | Medium | They have existing wattage estimation; deeper transient/ATX analysis would take effort but isn't an architectural rebuild |
| TechSearchers adds build cost | Medium | They already have PSU expertise and component DB experience; cost/pricing DB is the harder piece for them |
| Component pricing goes stale | Medium | Price tier maps (not live scraping) keep it "close enough"; quarterly refreshes |
| Search algorithm changes | Low | Diversified keyword base across 15+ target pages |
| Low initial traffic | Medium | Focus on low-competition PSU keywords + content marketing + Reddit |
| Affiliate link bans/regulation | Low | Multiple affiliate programs, AdSense as backup |

---

## 11. Success Metrics

| Metric | Month 1 Target | Month 6 Target | Year 1 Target |
|---|---|---|---|
| Monthly unique visitors | 5,000 | 50,000 | 200,000 |
| Organic keyword rankings | Top 50 for 5 keywords | Top 10 for 10 keywords | Top 3 for 15 keywords |
| Builds created (URL shares) | 500 | 5,000 | 25,000 |
| Affiliate revenue | $50 | $500 | $2,000+ |
| AdSense revenue | $25 | $200 | $800+ |
| Total monthly revenue | $75 | $700 | $2,800+ |
| Bounce rate | <55% | <45% | <40% |

---

## 12. Final Verdict

Confidence: 80%. A real structural gap exists: no single competitor combines build-cost breakdown (with optimization), deep PSU analysis (matching TechSearchers' rigor as a baseline), and integrated planning guides. However, this is a narrower, harder opportunity than the pre-verification picture suggested — you're competing at feature parity with two capable specialists (PCPartPicker on pricing, TechSearchers on PSU depth), not filling empty space. The three-pillar combination, TCO calculator, cable-melt auditor, and oracle pages with per-page quality are the real differentiators. Execute honestly, cite sources transparently, and the moat compounds over time.
