# PSUCheck — Search Intent War Chest

## The 10× SEO Growth Strategy

**Author:** Strategy & SEO Architecture Review
**Date:** July 2026
**Objective:** Transform PSUCheck from a PSU calculator into the definitive PC hardware compatibility reference — capturing 10× the organic search traffic, earning backlinks from journalists and communities, and building a data moat no competitor can replicate.

---

## Contents

1. [Executive Summary](#1-executive-summary)
2. [Competitive Landscape & Strategic Positioning](#2-competitive-landscape--strategic-positioning)
3. [The Hard Truth About Calculator Ceilings](#3-the-hard-truth-about-calculator-ceilings)
4. [Flagship Feature: Universal Compatibility Engine (UCE)](#4-flagship-feature-universal-compatibility-engine-uce)
5. [Flagship Feature: Upgrade Impact Simulator (UIS)](#5-flagship-feature-upgrade-impact-simulator-uis)
6. [SEO Architecture & Keyword Universe](#6-seo-architecture--keyword-universe)
7. [Engineering Blueprint](#7-engineering-blueprint)
8. [Implementation Roadmap](#8-implementation-roadmap)
9. [Data Collection & Maintenance Strategy](#9-data-collection--maintenance-strategy)
10. [Devil's Advocate & Risk Analysis](#10-devils-advocate--risk-analysis)
11. [Success Metrics & Milestones](#11-success-metrics--milestones)
12. [Appendices](#12-appendices)

---

## 1. Executive Summary

PSUCheck has the strongest technical foundation of any PSU calculator on the market: transient-aware sizing, unbiased recommendations, cable-melt auditing, capacitor aging models, and a growing programmatic oracle matrix. The core product works. The ceiling is not product quality — it's **search intent surface area**.

The entire PSU calculator category addresses a finite keyword set: ~50-100 high-volume queries around "PSU calculator," "how many watts," and "PSU for [GPU]." Even with 100% market share, the traffic ceiling is ~500K-1M monthly visits.

The next 10× requires PSUCheck to become the answer to a much broader question: **"Will this component work with my build?"**

**The recommendation is a single flagship feature with two layers:**

- **Layer 1: Universal Compatibility Engine (UCE)** — A comprehensive, searchable, programmatic database that checks every real-world constraint between every pair of PC components: GPU ↔ PSU (wattage, transient tolerance, connector type, cable count, 12V-2x6 vs 12VHPWR, quality tier), GPU ↔ Case (length, width, slot thickness, front radiator interference), CPU Cooler ↔ Case (height, RAM clearance), PSU ↔ Case (form factor, length), PSU ↔ Motherboard (EPS connector count), PSU Age ↔ GPU Upgrade (derating curves, protection trigger risk), Cross-Brand Connector Compatibility (modular cable pinout safety).

- **Layer 2: Upgrade Impact Simulator (UIS)** — An interactive Preact tool that, given a user's current build, answers "what happens when I swap component X?" with exact deltas for wattage, clearance, connector availability, age derating, and transient margin. Generates a shareable Upgrade Report.

Together, these generate ~32,000+ genuinely unique, EEAT-compliant, reference-quality pages that address an estimated 2.5M+ new search queries per month — while creating a data maintenance moat that competitors cannot replicate without equivalent investment.

---

## 2. Competitive Landscape & Strategic Positioning

### 2.1 Market Map

| Competitor | Strengths | Fatal Weaknesses | Our Advantage |
|---|---|---|---|
| **PCPartPicker** | 14yr domain authority, 38-region pricing, build community, forums | Surface-level compat checking, commerce-driven not reference-driven, cluttered mobile UX, no transient analysis, no age derating | Deeper compatibility, transient-aware, unbiased, better mobile UX |
| **OuterVision (defunct)** | Trusted unbiased calculator, researcher-maintained DB, UPS sizing | Single-owner risk, no programmatic SEO, static site, never monetized | PSUCheck is alive + growing, already has programmatic pages |
| **Manufacturer calculators** (Cooler Master, be quiet!, MSI, Newegg) | Brand authority, simple UI, SEO-optimized | Biased (push own products), limited database, no transient analysis | Unbiased authority position is structurally unassailable |
| **PC-Builds / TechBenchPro** | Decent calculators, tier lists | Solo-dev projects, narrow data, no connector/case DB, no programmatic | Engineering depth, data breadth, team capacity |

### 2.2 The Strategic Gap

Every existing tool is optimized for one question: **"What PSU wattage do I need?"**

The questions users actually ask:

- "Will my Corsair RM850x work with an RTX 5090?"
- "Will this 357mm GPU fit in my Fractal North with a front AIO?"
- "Does my 5-year-old EVGA G3 750W have enough PCIe cables for a 5080?"
- "Can I use my Seasonic cables with a Corsair PSU?"
- "Will a Noctua NH-D15 fit in a Meshify 2 with tall RAM?"
- "I upgraded from a 3080 to a 5090 — do I need a new PSU?"

**No single tool on the planet answers these questions.**

Users assemble answers from: forum threads (Reddit, LTT, Tom's Hardware), manufacturer spec sheets, YouTube build videos, manual measurements, and guesswork. This fragmented workflow is the opportunity.

### 2.3 Our Moat

| Moat Element | Why It's Defensible |
|---|---|
| **Data breadth + depth** | ~32,000 unique pages checking multiple constraint types each |
| **Cross-brand connector DB** | No public database exists; requires buying/verifying PSUs |
| **Age derating curves** | Engineering domain expertise; existing code |
| **Maintenance velocity** | Every new GPU/case/PSU adds thousands of pages; CAGR matters |
| **Neutral authority** | Manufacturer calculators can never match this |
| **Community trust** | Reddit and forums link to tools they trust — earned over years |

---

## 3. The Hard Truth About Calculator Ceilings

### 3.1 Search Volume Reality

| Keyword Category | Monthly Volume (est.) | Ceiling |
|---|---|---|
| "PSU calculator" direct | 50K-100K | Hard ceiling |
| "How many watts" / PSU sizing | 100K-200K | Hard ceiling |
| "PSU for [GPU]" / "[GPU] power" | 200K-400K | Near ceiling |
| "Will [GPU] fit in [case]" | 100K-200K | **Untapped** |
| "[PSU] compatible with [GPU]" | 50K-100K | **Untapped** |
| "[Cooler] fit in [case]" | 50K-80K | **Untapped** |
| "Upgrade from [X] to [Y] PSU" | 80K-150K | **Untapped** |
| "Cross-brand PSU cable compatible" | 20K-40K | **Untapped (yet high value)** |
| Age-aware queries ("old PSU new GPU") | 30K-60K | **Partially tapped (oracle)** |
| Full-build validation | 100K-200K | **Untapped** |

**Total addressable expansion: 2M - 5M additional monthly impressions.**

### 3.2 Why Thin Programmatic Pages Don't Work

Google's Helpful Content System penalizes:
- Pages that don't deliver unique value beyond the template
- Pages that restate generic advice with different numbers
- Pages without EEAT signals

Our compatibility pages avoid all three because **each combination is genuinely unique**: specific dimensions, specific connectors, specific clearance calculations, specific age derating, specific verdict.

"Will RTX 5090 fit in Corsair 4000D" and "Will RTX 5090 fit in Fractal North" are **completely different pages** — different clearances, different cooling constraints, different cable routing challenges, different verdicts.

---

## 4. Flagship Feature: Universal Compatibility Engine (UCE)

### 4.1 Core Concept

A structured database and inference engine that answers "will component X work with component Y?" across every real-world constraint dimension.

Every PC component has an entry with exact specifications. The engine cross-references any two components and produces a concrete verdict with explanation.

### 4.2 Constraint Matrix

| Pair | Constraints Checked | Verdict Example |
|---|---|---|
| GPU ↔ PSU | Total system wattage (sustained + transient), available PCIe connectors vs GPU requirement, native 12V-2x6 vs adapter, 12VHPWR generation (ATX 3.0/3.1), cable count (single vs daisy-chain), age derating, quality tier | "Your 5yr old Corsair RM850x provides 680W effective (850W - 20% aging derate). RTX 5090 system peak draw is 780W. **Verdict: FAIL — upgrade recommended.** " |
| GPU ↔ Case | GPU length vs case max clearance, length with front radiator installed (subtract rad + fan thickness), GPU width vs case width, slot thickness (2.5/3/3.5 slot) vs motherboard clearance, GPU overhang vs PSU shroud | "RTX 5090 FE: 357mm. Corsair 4000D max: 360mm. With 30mm front rad + 25mm fans: usable = 305mm. **Verdict: FAIL with front AIO.** " |
| CPU Cooler ↔ Case | Cooler height vs case max height, cooler width vs RAM slot clearance, radiator size vs case mount points | "NH-D15: 165mm. Meshify 2 max: 185mm. RAM clearance with front fan: 32mm. **Verdict: PASS with low-profile RAM.** " |
| PSU ↔ Case | PSU form factor (ATX/SFX/SFX-L), PSU length vs case max length, fan orientation clearance, cable routing space | "RM850x: 160mm ATX. Node 304 max: 160mm. **Verdict: TIGHT — modular cables will press against GPU.** " |
| PSU ↔ Motherboard | 24-pin compatibility, EPS 4+4 vs 8-pin count, connector reach to motherboard position | "MSI Z790 Tomahawk: 1x 8-pin EPS. RM850x: 2x 4+4 EPS. **Verdict: PASS.** " |
| Cross-Brand Cables | PSU A cable pinout vs PSU B modular port, known dangerous combos, warning level | "Corsair Type 4 cable in Seasonic Focus: **DANGER — different pinout, will short.** " |

### 4.3 Programmatic Pages

| Route Template | Count | Example URL |
|---|---|---|
| `/compatibility/gpu/[gpu]/psu/[psu]` | 25 × 35 = 875 | `/compatibility/gpu/rtx-5090/psu/corsair-rm850x` |
| `/compatibility/gpu/[gpu]/case/[case]` | 25 × 50 = 1,250 | `/compatibility/gpu/rtx-5090/case/fractal-north` |
| `/compatibility/gpu/[gpu]/case/[case]/radiator` | 25 × 50 = 1,250 | `/compatibility/gpu/rtx-5090/case/corsair-4000d/radiator-360mm` |
| `/compatibility/psu/[psu]/case/[case]` | 35 × 50 = 1,750 | `/compatibility/psu/corsair-rm850x/case/fractal-north` |
| `/compatibility/cooler/[cooler]/case/[case]` | 25 × 50 = 1,250 | `/compatibility/cooler/nh-d15/case/meshify-2` |
| `/compatibility/gpu/[gpu]/psu/[psu]/age/[years]` | 25 × 35 × 5 = 4,375 | `/compatibility/gpu/rtx-5090/psu/corsair-rm850x/age-5` |
| `/compatibility/connector/[brandA]/[brandB]` | 10 × 10 = 100 | `/compatibility/connector/corsair/seasonic` |
| `/compatibility/pci-express/[connector]/psu/[psu]` | 15 × 35 = 525 | `/compatibility/pci-express/12vhpwr/psu/evga-g3-750` |
| Category hub pages | 10 | `/compatibility/`, `/compatibility/gpu/`, etc. |

**Total programmatic pages: ~11,375** (Phase 1 + 2)

### 4.4 Page Template (Every Page Is Unique)

Every compatibility page includes:

1. **H1 title** with exact component names and question intent: "Will the [GPU Name] Work with the [PSU Name] in [Year]?"
2. **Verdict box** with PASS/WARN/FAIL badge + color coding
3. **Constraint table** showing every checked metric with values and pass/fail icons
4. **Detailed explanation** (dynamic, per combination): "The RTX 5090 requires three 8-pin PCIe connectors or one 12V-2x6 600W connector..."
5. **Age-aware section** (if applicable): "At 5 years old, your PSU's effective capacity drops to approximately 680W..."
6. **Related checks** linking to other relevant combos
7. **Methodology link** to `/methodology` with transient-aware sizing explanation
8. **CTA** to Upgrade Impact Simulator
9. **Schema markup**: `FAQPage`, `Product` (both components), `TechArticle`

---

## 5. Flagship Feature: Upgrade Impact Simulator (UIS)

### 5.1 Core Concept

An interactive Preact island that answers: "What happens to my build when I upgrade component X?"

### 5.2 User Flow

1. User enters current build (CPU, GPU, PSU, case, cooler — optional)
2. User selects new component (GPU or PSU upgrade)
3. System shows delta:
   - **Wattage delta:** Current draw → New draw → % increase
   - **Clearance delta:** Current clearance → New clearance → Fit check
   - **Connector delta:** Current connectors needed → New connectors needed → Available
   - **Age-adjusted delta:** Current PSU effective capacity at current age → New requirement
   - **Transient margin:** Headroom before OCP trip
   - **Cable compatibility:** Existing cables work or need adapter
4. Shareable "Upgrade Report" generated (URL + local storage)

### 5.3 Programmatic Upgrade Pages

| Route Template | Count | Example URL |
|---|---|---|
| `/compare/upgrade/gpu/[fromGpu]/[toGpu]/psu/[psu]` | 15 × 15 × 20 = 4,500 | `/compare/upgrade/gpu/rtx-3080/rtx-5090/psu/corsair-rm850x` |
| `/compare/upgrade/gpu/[fromGpu]/[toGpu]/psu/[psu]/age/[age]` | top combo × 5 = ~300 | `/compare/upgrade/gpu/rtx-3080/rtx-5090/psu/evga-g3-750/age-5` |
| `/compare/upgrade/psu/[fromPsu]/[toPsu]/gpu/[gpu]` | 10 × 10 × 10 = 1,000 | `/compare/upgrade/psu/evga-g3-750/corsair-rm850x/gpu/rtx-5090` |
| Category index pages | 5 | `/compare/upgrade/` |

**Total programmatic upgrade pages: ~5,800**

### 5.4 Combined Page Count

| Phase | Page Type | Count |
|---|---|---|
| Phase 1 | GPU↔PSU, GPU↔Case | 1,500 |
| Phase 2 | Coolers, PSU-Case, cables, age-aware, connectors | ~9,875 |
| Phase 3 | Upgrade pathways, additional combos | ~5,800+ |
| **Total** | | **~17,000+** |

This is conservative. Expanding to 50 GPUs, 100 cases, 50 PSUs yields ~32,000+.

---

## 6. SEO Architecture & Keyword Universe

### 6.1 Keyword Taxonomy

| Intent Cluster | Example Queries | Monthly Vol (est.) | Our Page Type |
|---|---|---|---|
| **PSU ↔ GPU compatibility** | "will my 850w run rtx 5090", "psu for rtx 5080", "rm850x 5090" | 200K-400K | GPU↔PSU pages |
| **GPU ↔ Case fit** | "will rtx 5090 fit in fractal north", "gpu clearance corsair 4000d" | 150K-300K | GPU↔Case pages |
| **Cooler clearance** | "nh-d15 fit in meshify 2", "cpu cooler height fractal north" | 50K-100K | Cooler↔Case pages |
| **PSU fit** | "will atx psu fit in nzxt h1", "sfx vs atx psu case" | 30K-60K | PSU↔Case pages |
| **Connector safety** | "12vhpwr vs 12v-2x6", "corsair cable seasonic psu", "12vhpwr adapter melting" | 80K-150K | Connector pages |
| **Age-aware** | "old psu new gpu", "5 year old psu rtx 5090", "psu aging replacement" | 40K-80K | Age-aware pages |
| **Upgrade planning** | "upgrade from 3080 to 5090 psu", "do i need new psu for 5080" | 100K-200K | Upgrade pages |
| **Full build validation** | "check my pc build compatibility", "will these parts work together" | 80K-150K | Hub + tool pages |

**Total addressable monthly impression pool: 730K - 1.44M.**

### 6.2 Internal Link Architecture

```
                ┌─────────────────────────┐
                │   / (Home / Calculator)  │
                └────────┬────────────────┘
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
   ┌────────────┐ ┌────────────┐ ┌────────────┐
   │  /oracle   │ │ /psu-for  │ │/methodology│
   └─────┬──────┘ └──────┬─────┘ └────────────┘
         │               │
         ▼               ▼
   ┌─────────────────────────────────────────┐
   │          /compatibility (Hub)            │
   │   Category hubs for each pair type      │
   └──────┬──────────────┬───────────────────┘
          │              │
          ▼              ▼
   ┌──────────┐   ┌──────────┐
   │ GPU↔PSU  │   │ GPU↔Case │  ... (10 hubs)
   │ pages    │   │ pages    │
   └────┬─────┘   └────┬─────┘
        │              │
        ▼              ▼
   ┌────────────────────────────────────┐
   │    Individual combo pages           │
   │  (each links to 5-10 related pages) │
   └────────────────────────────────────┘
               │
               ▼
   ┌──────────────────────────┐
   │   /compare/upgrade (Hub)  │
   └──────────┬───────────────┘
              ▼
   ┌──────────────────────────┐
   │   Individual upgrade      │
   │   pathway pages           │
   └──────────────────────────┘
```

### 6.3 EEAT Signals

| Signal | Implementation |
|---|---|
| **Methodology transparency** | Every result page links to `/methodology` with transient-aware sizing standards, dimension measurement methodology, connector verification process |
| **Expert sourcing** | All data traces to manufacturer spec sheets, verified against minimum 3 independent sources per spec |
| **Named maintainers** | `/methodology` lists named individuals responsible for each data category |
| **Accuracy feedback** | "Was this result correct?" thumbs on every page → improves data over time |
| **Update cadence** | Each page displays "Last verified: [date]" and "Next scheduled review: [date]" |
| **Content differentiation** | Every page has unique analysis text generated per-combination (never template-only) |
| **Authoritative external references** | Links to Cultists tier list, Tom's Hardware reviews, manufacturer spec sheets |

### 6.4 Schema Markup Per Page

```json
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "name": "Will the RTX 5090 Work with the Corsair RM850x?",
  "description": "...",
  "proficiencyLevel": "Beginner",
  "about": {
    "@type": "Thing",
    "name": "PC Hardware Compatibility",
    "description": "Checks whether specific PC components are compatible..."
  },
  "mainEntity": {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Does the Corsair RM850x have enough wattage for the RTX 5090?",
        "acceptedAnswer": { "@type": "Answer", "text": "..." }
      },
      {
        "@type": "Question",
        "name": "Does the Corsair RM850x have the right connectors for the RTX 5090?",
        "acceptedAnswer": { "@type": "Answer", "text": "..." }
      }
    ]
  }
}
```

---

## 7. Engineering Blueprint

### 7.1 Architecture

```
src/
├── data/
│   ├── index/
│   │   ├── gpus.index.json        (EXISTING — expand with dimensions, connectors)
│   │   ├── psus.index.json        (EXISTING — expand with connector counts, cable lengths)
│   │   ├── cases.index.json       (NEW)
│   │   └── coolers.index.json     (NEW)
│   ├── compatibility/
│   │   ├── cross-brand-cables.json (NEW — pinout maps)
│   │   └── connector-standards.json (NEW — ATX 3.0/3.1, 12VHPWR, 12V-2X6)
│   └── builds.json               (EXISTING)
│
├── lib/
│   ├── psu.ts                     (EXISTING — transient, age, wattage)
│   ├── electrical.ts              (EXISTING)
│   ├── psu-matcher.ts             (EXISTING)
│   └── compatibility/
│       ├── engine.ts              (NEW — orchestrator, calls all checkers)
│       ├── check-gpu-psu.ts       (NEW — wattage + connector + age)
│       ├── check-gpu-case.ts      (NEW — dimensions + radiator)
│       ├── check-cooler-case.ts   (NEW — height + RAM)
│       ├── check-psu-case.ts      (NEW — form factor + length)
│       ├── check-cables.ts        (NEW — cross-brand compat)
│       └── upgrade-delta.ts       (NEW — before/after analysis)
│
├── components/
│   ├── UpgradeImpactSimulator.tsx  (NEW — Preact island)
│   └── CompatibilityResult.tsx     (NEW — shared result display)
│
└── pages/
    ├── compatibility/
    │   ├── index.astro             (NEW — hub)
    │   ├── gpu/
    │   │   ├── [slug].astro        (NEW — GPU hub with all pair links)
    │   │   └── [slug]/
    │   │       ├── psu/[psuSlug].astro          (NEW)
    │   │       ├── psu/[psuSlug]/age/[age].astro (NEW)
    │   │       └── case/[caseSlug].astro         (NEW)
    │   ├── psu/
    │   │   ├── [slug].astro        (NEW — PSU hub)
    │   │   └── [slug]/
    │   │       └── case/[caseSlug].astro (NEW)
    │   ├── cooler/
    │   │   ├── [slug].astro        (NEW — cooler hub)
    │   │   └── [slug]/
    │   │       └── case/[caseSlug].astro (NEW)
    │   └── connector/
    │       └── [brandA]/[brandB].astro (NEW)
    ├── compare/
    │   ├── upgrade/
    │   │   ├── index.astro         (NEW — upgrade hub)
    │   │   └── gpu/
    │   │       └── [fromGpu]/
    │   │           └── [toGpu].astro (NEW)
    │   └── gpu-upgrade-checker.astro (EXISTING)
    ├── oracle/
    │   └── [slug].astro            (EXISTING — add compat cross-links)
    └── psu-for/
        └── [slug].astro            (EXISTING — add compat cross-links)
```

### 7.2 Data Models

```typescript
// NEW: cases.index.json entry
interface CaseIndex {
  id: string;
  brand: string;
  model: string;
  formFactor: 'full-tower' | 'mid-tower' | 'micro-atx' | 'mini-itx';
  dimensions: {
    motherboardSupport: Array<'ATX' | 'Micro-ATX' | 'Mini-ITX'>;
    maxGpuLength: number;           // mm, without front rad
    maxGpuLengthWithRad360: number; // mm, with 360mm rad + fans
    maxGpuLengthWithRad280: number;
    maxGpuLengthWithRad240: number;
    maxCoolerHeight: number;        // mm
    maxPsuLength: number;           // mm
    psuFormFactor: Array<'ATX' | 'SFX' | 'SFX-L'>;
    psuMountLocation: 'bottom' | 'top' | 'front';
  };
  clearance: {
    gpuWidthMax: number;
    cableRoutingBehindTray: number; // mm
  };
}

// NEW: coolers.index.json entry
interface CoolerIndex {
  id: string;
  brand: string;
  model: string;
  type: 'air-tower' | 'air-low-profile' | 'aio' | 'custom-loop';
  dimensions: {
    height: number;          // mm
    width: number;           // mm
    depth: number;           // mm
    ramClearanceMaxHeight: number; // mm (0 if no RAM interference)
  };
  radiator?: {
    size: '120' | '240' | '280' | '360' | '420';
    thicknessWithFans: number; // mm
  };
  tdpRating: number; // W
}

// EXPANDED: existing gpus.index.json
// Add to existing interface:
interface GpuIndexExpanded {
  // ...existing fields...
  dimensions: {
    length: number;
    width: number;    // height from PCIe slot to top
    slotsOccupied: number; // 2, 2.5, 3, 3.5
    pciePowerConnectorPosition: 'edge' | 'recessed' | 'top';
  };
  powerConnectors: {
    type: '6-pin' | '8-pin' | '12vhpwr' | '12v-2x6';
    count: number;
  };
  includesAdapter: boolean;
  adapterType?: 'triple-8pin-to-12vhpwr' | 'dual-8pin-to-12vhpwr' | string;
  tbp: number;  // Total Board Power (W)
  peakTransient: number; // Peak transient spike (W)
}

// EXPANDED: existing psus.index.json
interface PsuIndexExpanded {
  // ...existing fields...
  connectors: {
    pcie6pin: number;
    pcie8pin: number;
    pcie12vhpwr: number;     // 12VHPWR (ATX 3.0)
    pcie12v2x6: number;      // 12V-2x6 (ATX 3.1)
    eps4pin: number;
    eps8pin: number;
    sata: number;
    molex: number;
  };
  cableType: 'fully-modular' | 'semi-modular' | 'non-modular';
  modularPinoutStandard?: 'corsair-type-3' | 'corsair-type-4' | 'seasonic-focus' | 'evga-g5' | 'evga-g3' | 'cooler-master-v' | 'msi-mag' | string;
  nativeAtx31: boolean;
  includes12vhpwrCable: boolean;
  includes12vhpwrAdapter: boolean;
  cableLengths: {
    atx24pin: number;   // mm
    eps8pin: number;
    pcie8pin: number;
  };
}

// NEW: compatibility result
interface CompatibilityResult {
  pair: { typeA: string; idA: string; typeB: string; idB: string };
  passes: boolean;
  warnings: string[];
  failures: string[];
  details: {
    wattageCheck: WattageCheckResult;
    connectorCheck: ConnectorCheckResult;
    dimensionCheck: DimensionCheckResult | null;
    ageCheck: AgeCheckResult | null;
    cableCheck: CableCheckResult | null;
  };
  verdict: 'PASS' | 'WARN' | 'FAIL';
  verdictSummary: string; // generated per combination
}

// NEW: upgrade delta
interface UpgradeDelta {
  componentChanged: 'gpu' | 'psu';
  from: string;
  to: string;
  wattageDelta: { before: number; after: number; change: number; };
  clearanceDelta: { before: number; after: number; fits: boolean; } | null;
  connectorDelta: { newConnectorsNeeded: string[]; available: boolean; };
  transientMarginDelta: { before: number; after: number; safe: boolean; };
  ageAdjustedDelta: { currentEffective: number; required: number; adequate: boolean; };
  verdict: 'SAFE-UPGRADE' | 'UPGRADE-PSU-FIRST' | 'CAUTION' | 'INCOMPATIBLE';
  reportUrl: string; // shareable
}
```

### 7.3 Engine Architecture

```typescript
// src/lib/compatibility/engine.ts — orchestrator

import { checkGpuPsu } from './check-gpu-psu';
import { checkGpuCase } from './check-gpu-case';
import { checkCoolerCase } from './check-cooler-case';
import { checkPsuCase } from './check-psu-case';
import { checkCables } from './check-cables';
import { computeUpgradeDelta } from './upgrade-delta';

// Main entry: checks ALL constraints for a given pair
export function checkCompatibility(
  a: ComponentSpec,  // must have .type: 'gpu' | 'psu' | 'case' | 'cooler'
  b: ComponentSpec,
  options?: { age?: number; radiatorSize?: string }
): CompatibilityResult { ... }

// Upgrade entry: computer before/after for component swap
export function checkUpgrade(
  currentBuild: BuildSpec,
  newComponent: ComponentSpec,
  componentType: 'gpu' | 'psu'
): UpgradeDelta { ... }
```

### 7.4 Build Time Impact

| Phase | New Pages | Est. Build Time Impact |
|---|---|---|
| Phase 1 | 1,500 | +20-30 minutes |
| Phase 2 | ~9,875 | +90-120 minutes |
| Phase 3 | ~5,800+ | +60-90 minutes |

**Mitigation:**
- Use Astro's incremental builds for changed data only
- Batch page generation with `Promise.all`
- Move deep/low-traffic combos to dynamic SSR via Cloudflare Pages Functions
- Monitor Cloudflare Pages 1-hour build limit; split into deploy jobs if needed

### 7.5 Infrastructure Cost

| Resource | Cost | Notes |
|---|---|---|
| Data storage (JSON) | $0 | In repo, no DB |
| Build (Cloudflare Pages) | $0 | Free tier: 500 builds/month, 1hr limit |
| Bandwidth | $0 | Unlimited on CF Pages free tier |
| CDN | $0 | Included with CF Pages |
| **Total monthly** | **$0** | 100% static |

If build time exceeds CF Pages limit:
- GitHub Actions runner: $0 (public repo minutes)
- Dedicated runner: ~$20/month

---

## 8. Implementation Roadmap

### 8.1 Phase 1: Foundation (Weeks 1-6)

**Data — Weeks 1-2**
- [ ] Expand `psus.index.json` with connector counts, cable types, pinout standard (35 PSUs)
- [ ] Expand `gpus.index.json` with dimensions, connector types, TBP, transient peaks (25 GPUs)
- [ ] Create `cases.index.json` with specs for 25 top-selling cases
- [ ] Research methodology for case measurements (manufacturer specs + physical verification)

**Engine — Weeks 3-4**
- [ ] Build `check-gpu-psu.ts` (wattage + connector check)
- [ ] Build `check-gpu-case.ts` (dimension check, basic — no radiator)
- [ ] Build `engine.ts` orchestrator
- [ ] Write unit tests for all engine functions

**Pages — Weeks 5-6**
- [ ] Generate `src/pages/compatibility/gpu/[slug]/psu/[psuSlug].astro` (875 pages)
- [ ] Generate `src/pages/compatibility/gpu/[slug]/case/[caseSlug].astro` (625 pages)
- [ ] Build `/compatibility/index.astro` hub page with search + filters
- [ ] Cross-link from all oracle pages to relevant compatibility pages

**Milestone: 1,500 new pages live**

### 8.2 Phase 2: Expansion (Weeks 7-14)

**Data — Weeks 7-8**
- [ ] Create `coolers.index.json` (25 coolers: 15 air + 10 AIO)
- [ ] Build cross-brand cable database (start with 10 most common combos)
- [ ] Add radiator dimensions to `cases.index.json`
- [ ] Build `connector-standards.json`

**Engine — Weeks 9-10**
- [ ] Build `check-cooler-case.ts`
- [ ] Build `check-psu-case.ts`
- [ ] Build `check-cables.ts` (cross-brand)
- [ ] Add radiator interference to `check-gpu-case.ts`
- [ ] Add age-aware analysis to `check-gpu-psu.ts`

**Pages — Weeks 11-14**
- [ ] Generate cooler↔case pages (1,250)
- [ ] Generate PSU↔case pages (1,750)
- [ ] Generate age-aware GPU↔PSU pages (4,375)
- [ ] Generate cross-brand connector pages (100)
- [ ] Generate 12VHPWR/12V-2x6 connector pages (525)
- [ ] Build `/compatibility/gpu/index.astro`, `/compatibility/psu/index.astro`, etc. category hubs

**Milestone: ~11,375 total compatibility pages**

### 8.3 Phase 3: Upgrade Simulator & Market Domination (Weeks 15-24)

**Interactive — Weeks 15-17**
- [ ] Build `UpgradeImpactSimulator.tsx` Preact island
- [ ] Build `CompatibilityResult.tsx` shared component
- [ ] Wire existing oracle/assembly desk data to Upgrade Simulator
- [ ] Implement URL encoding for shareable Upgrade Reports

**Pages — Weeks 18-20**
- [ ] Generate upgrade pathway pages for top GPU combos (4,500)
- [ ] Generate age-aware upgrade pages for top combos (300)
- [ ] Generate PSU upgrade pages (1,000)
- [ ] Build `/compare/upgrade/` hub

**Integration — Weeks 21-22**
- [ ] Add "Check Upgrade" CTA on all oracle pages
- [ ] Add "Check Upgrade" CTA on all PSU replacement pages
- [ ] Add "Upgrade Impact" link in Virtual Assembly Desk
- [ ] Update footer navigation
- [ ] Update sitemap.xml

**Launch — Weeks 23-24**
- [ ] Submit new sitemap to Google Search Console
- [ ] Manual outreach to 20 PC hardware communities
- [ ] Monitor indexing, impressions, clicks
- [ ] Fix any data accuracy issues from community feedback

**Milestone: ~17,000+ total pages, Upgrade Simulator live**

### 8.4 Ongoing (Every Hardware Launch)

- New GPU → generate all pages for that GPU × 35 PSUs × 50 cases × 25 coolers
- New PSU → generate all pages for that PSU × 25 GPUs × 50 cases
- New case → generate all pages for that case × 25 GPUs × 35 PSUs × 25 coolers
- Update affected compatibility pages when component data changes (spec revisions)
- Monitor build time and implement incremental builds if needed

---

## 9. Data Collection & Maintenance Strategy

### 9.1 Sourcing

| Data | Primary Source | Secondary Source | Verification |
|---|---|---|---|
| GPU dimensions | Manufacturer spec sheet | TechPowerUp GPU database | Confirm with ≥2 independent review measurements |
| GPU power specs | Manufacturer TBP/TDP + review transient tests | Tom's Hardware, GamersNexus | Use worst-case measured transient across 3 reviews |
| PSU connectors | Manufacturer spec sheet | PSU Tier list (Cultists) | Manual verification for ambiguous/non-standard pinouts |
| PSU cable lengths | Manufacturer spec or user reports | Cablefied.com community data | Sample at 3 retailers for spec consistency |
| Case clearances | Manufacturer spec sheet | Case reviews (GamersNexus, Hardware Canucks) | Measure physically for top 10 cases; spec for rest |
| Cooler dimensions | Manufacturer spec sheet | TechPowerUp, review measurements | Cross-reference with 2 sources |
| Cross-brand pinouts | Manufacturer documentation | Community pinout database (overclock.net) | Manual verification with multimeter for dangerous combos |

### 9.2 Update Cadence

| Event | Action | Timeline |
|---|---|---|
| New GPU announcement | Add to GPU index | Within 24 hours of official specs |
| New GPU review | Update transient peak data | Within 1 week of 3rd party review |
| New PSU launch | Add to PSU index + generate pages | Before retail availability |
| New case launch | Add to case index | Within 1 week of retail availability |
| Component spec revision | Update affected entries | Within 48 hours of official spec change |
| Community error report | Investigate + fix | Within 72 hours |

### 9.3 Automation Potential

- GPU/PSU/case spec scraping from manufacturer API + TechPowerUp → flagged for human review
- Automated dimension extraction from spec PDFs
- CI/CD pipeline: data change → regenerate only affected pages → deploy
- Build-time validator: catches missing or implausible data (e.g., GPU length < 50mm)

---

## 10. Devil's Advocate & Risk Analysis

### 10.1 Risk Register

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| **Data accuracy issues** | Medium | High — trust destroyer | Multi-source verification, feedback loop, clear methodology page, each page shows "last verified" date |
| **PCPartPicker adds compatibility** | Low-Medium | Medium — reduces uniqueness | They can't match depth (connectors, cross-brand, age) without years of investment. Our moat is depth, not breadth. |
| **Build time exceeds CF Pages 1hr** | Medium | Medium — deployment friction | Incremental builds, split deploy, CF Workers for dynamic pages |
| **Google slow to index** | Medium | Medium — delayed ROI | Strong internal linking from indexed pages (oracle, PSU-for), social seeding to create discoverability |
| **Cross-brand cable DB legally challenged** | Low | Low — pinouts are factual data | Only publish pinout differences, not proprietary diagrams. Link to public community databases. |
| **Low user adoption** | Low | High on Failure | Built into existing user flow. Every oracle page visitor is 1 click from a compatibility page. |
| **Hardware launch volume overwhelms** | Low-Medium | Low | Automated data pipeline with human verification gate. Build-time impact is linear. |
| **OuterVision-style founder dependency** | Medium | Medium | Document all data collection processes, maintain AGENTS.md for successor agents, open source data format for community contributions |

### 10.2 Rejected Alternatives

| Idea | Rejection Rationale |
|---|---|
| **AI chatbot** | Low SEO value (0 programmatic pages), no backlinks, high infra cost, poor user trust, easily copied |
| **Real-time pricing DB** | Competes with PCPartPicker on their turf (DA, retailer relationships), high scraping infra cost, no defensible moat |
| **Community marketplace** | Moderation cost, trust/safety infra, payment processing, legal exposure, distracts from core SEO product |
| **Noise/thermal database** | Interesting but low search volume, requires expensive equipment (semi-anechoic chamber), single data type |
| **PSU teardown gallery** | Good for EEAT but limited SEO, no programmatic expansion, manual effort per unit |
| **YouTube automation** | Can't generate 17,000 programmatic assets, competes with established channels, poor backlink profile |
| **More guides** | Already 30 guides; diminishing returns on additional "how to choose a PSU" content |

### 10.3 Core Assumptions

This strategy depends on:

1. **Build-time scalability:** Astro can generate 17,000+ pages within reasonable time without breaking Cloudflare Pages limits. Validated by existing 7,000+ oracle page generation.
2. **Data maintenance discipline:** Someone must update the database within ~72 hours of every hardware launch. This is the highest-risk assumption — automate everything that can be automated.
3. **Google's continued Helpful Content emphasis:** Google continues to reward specific, expert, useful content over generic programmatic pages. All evidence (2024-2026 HCU updates) supports this.
4. **Backlink acquisition:** The pages are naturally link-worthy. This is validated by similar reference-page behavior: PC Builds subreddit links to PCPartPicker for pricing, PSU Tier List for quality. They will link to PSUCheck for compatibility.
5. **User trust premium:** Users prefer unbiased tools. The OuterVision shutdown posts on TechPowerUp show users mourn unbiased tools specifically.

---

## 11. Success Metrics & Milestones

### 11.1 Leading Indicators (Month 1-3)

| Metric | Target (Month 3) |
|---|---|
| Compatibility pages indexed | 100% of Phase 1 (1,500) |
| Click-through rate from oracle → compat pages | ≥5% |
| Average position for top 50 target queries | Top 30 |
| Link clicks from Reddit/Twitter | ≥50 inbound clicks/week |
| Bounce rate on compat pages | ≤40% |
| Thumbs-up feedback rate | ≥80% positive |

### 11.2 Growth Indicators (Month 4-9)

| Metric | Target (Month 9) |
|---|---|
| Total indexed compat pages | ≥8,000 |
| Monthly organic impressions (compat section) | ≥500K |
| Monthly organic clicks (compat section) | ≥25K |
| Referring domains (compat pages) | ≥20 unique |
| Upgrade Simulator weekly active users | ≥500 |
| Share rate (Upgrade Reports generated) | ≥10% of simulator sessions |

### 11.3 Market Domination (Month 10-12)

| Metric | Target (Month 12) |
|---|---|
| Total indexed pages | ≥15,000 |
| Total monthly organic traffic (all sources) | 2× current baseline |
| Referring domains | ≥50 unique |
| Top 5 ranking for "PC compatibility checker" | Yes |
| Top 5 ranking for "GPU fit checker" | Yes |
| Top 3 ranking for "PSU compatibility" | Yes |
| Upgrade Reports created per week | ≥2,000 |
| Community backlinks from Reddit/LTT | Mentioned as default resource |

---

## 12. Appendices

### A. Component Database Schema — Full Index Files

```
src/data/index/
├── gpus.index.json        EXPAND (25 entries → 50 by year 2)
├── psus.index.json        EXPAND (35 entries → 50 by year 2)
├── cases.index.json       NEW (25 entries → 100 by year 2)
├── coolers.index.json     NEW (25 entries → 50 by year 2)
├── motherboards.index.json FUTURE (for EPS connector check)
└── rams.index.json        FUTURE (for cooler clearance check)
```

### B. Page Template — Full HTML Structure

```astro
---
// Template for gpu/psu compatibility page
export async function getStaticPaths() { ... }
const { gpu, psu, result } = Astro.props;
---

<Layout title={`Will ${gpu.name} Work with ${psu.name}?`}>
  <Breadcrumb items={[...]} schema={...} />

  <VerdictBadge verdict={result.verdict} />

  <h1>Will the {gpu.name} Work with the {psu.name}?</h1>

  <MethodologyBadge href="/methodology" />

  <ResultTable checks={result.details} />

  <AnalysisSection result={result} />

  <RelatedChecks gpu={gpu} psu={psu} />

  <CTASection type="upgrade-simulator" gpu={gpu} psu={psu} />

  <FAQSection questions={generateFaqs(gpu, psu, result)} />

  <StructuredData type="FAQPage" data={faqSchema(result)} />
</Layout>
```

### C. Upgrade Simulator — Wireframe

```
┌─────────────────────────────────────────────────────┐
│  Upgrade Impact Simulator                           │
├─────────────────────────────────────────────────────┤
│  Current Build              │  New Component        │
│  ┌──────────────────────┐  │  ┌──────────────────┐ │
│  │ CPU: 7800X3D         │  │  │ ▾ Select new GPU │ │
│  │ GPU: RTX 3080        │  │  │ [RTX 5090     ▼] │ │
│  │ PSU: Corsair RM850x  │  │  │                  │ │
│  │ Case: Fractal North  │  │  │ [Analyze Impact] │ │
│  │ Age: 3 years         │  │  │                  │ │
│  └──────────────────────┘  │  └──────────────────┘ │
├─────────────────────────────────────────────────────┤
│  Impact Analysis                                    │
│  ┌──────┬──────────┬──────────┬────────────────────┐ │
│  │      │ Current  │ New      │ Verdict            │ │
│  ├──────┼──────────┼──────────┼────────────────────┤ │
│  │ Peak │ 550W     │ 850W     │ ⚠️ +300W increase  │ │
│  │ PSU  │ 850W     │ 680W*    │ ⚠️ 6yr effective   │ │
│  │ Conn │ 2×8-pin  │ 1×12V-2x│ ✅ Adapter incl.   │ │
│  │ Case │ 357mm    │ 340mm    │ ✅ Fits (no rad)   │ │
│  └──────┴──────────┴──────────┴────────────────────┘ │
│  *Age-adjusted effective capacity                    │
│                                                      │
│  [Share Upgrade Report]  [See Recommended PSUs]     │
└─────────────────────────────────────────────────────┘
```

### D. Sitemap Strategy

```
/compatibility/
├── priority: 0.9
├── changefreq: weekly
├── lastmod: [build date]
│
/compatibility/gpu/...  → priority: 0.8 (hubs)
/compatibility/gpu/[slug]/psu/[psu] → priority: 0.6
/compatibility/gpu/[slug]/case/[case] → priority: 0.6
│
/compare/upgrade/ → priority: 0.7
/compare/upgrade/gpu/[from]/[to] → priority: 0.5
```

### E. AGENTS.md Update — Operational Instructions

Add to AGENTS.md `## 4. Operational Instructions`:

```
*   **Compatibility Engine Updates:** When new GPUs, PSUs, cases, or coolers launch, add entries to the respective index files in `src/data/index/`. The static build automatically regenerates all affected compatibility pages.
*   **Cross-Brand Cable Maintenance:** Update `src/data/compatibility/cross-brand-cables.json` whenever new PSU modular pinout standards are discovered. Mark dangerous combos with `"danger": true`.
*   **Data Verification:** Each compatibility page displays "Last verified: [date]". Bump this date in the component index entry when data has been re-verified against current manufacturer specs.
*   **Build Time Monitoring:** If total pages exceed ~25,000, implement incremental builds or split deployment to stay within Cloudflare Pages 1-hour limit.
*   **Feedback Loop:** Monitor thumbs-down feedback on compatibility pages weekly. Investigate and correct data accuracy issues within 72 hours.
```

---

*This is a living document. Update as the product evolves, competitive landscape shifts, and user needs clarify.*
