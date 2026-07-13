# VoltForge — Premium PC Builder, PSU Calculator, & Hardware Planning Hub

VoltForge is a state-of-the-art, dark-first Multi-Page Application (MPA) built using **Astro**, **Preact**, and **Tailwind CSS v4**. It is engineered to be the definitive, unbiased category leader in PC power diagnostics and budget planning, directly resolving structural user-experience and technical-depth gaps found in existing industry calculators.

## 🏛️ Project Architecture & Three Pillars

VoltForge unifies three core product layers that competitors fail to combine:

```
                  ┌──────────────────────────────────────────────┐
                  │                 VoltForge App                │
                  └──────┬──────────────┬──────────────┬─────────┘
                         │              │              │
        ┌────────────────▼───┐ ┌────────▼───────────┐ ┌▼──────────────────┐
        │  1. PSU DIAGNOSTICS │ │  2. BUILD COST     │ │  3. TECH PLANNING │
        │     (Cybenetics)   │ │     OPTIMIZER     │ │      GUIDES        │
        └────────────────────┘ └────────────────────┘ └───────────────────┘
```

1.  **Precision PSU Sizing Engine:** Unlike simple TDP-summing calculators, VoltForge models sub-millisecond transient power spikes, ATX 3.1 compliance margins, per-rail current allocations (+12V, +5V, +3.3V), and cable safety risks (native 12V-2x6 connectors vs adapters) using published Cybenetics standards.
2.  **Live Build Cost Optimizer:** A reactive layout canvas matching parts selection with sales tax sliders, assembly fees, custom peripheral checkboxes, and live value-downgrade advice (e.g. suggesting cheaper motherboards or cooling swaps without bottlenecking performance).
3.  **Entity-Linked Planning Guides:** A comprehensive, search-optimized educational library of **25+ guides** structured with JSON-LD graphs (`HowTo` and `FAQPage`) to secure rich Google search snippets and maximize crawl indexability.

---

## ⚡ Highlights & Exploit Moats

Every feature was developed to convert a specific competitor weakness into a VoltForge competitive advantage:

*   **Interactive 80 PLUS TCO Configurator:** In contrast to static tables, the `InteractiveTco` island parses active component draws and allows users to input local $/kWh electricity rates and daily usage hours, showing live multi-year Gold/Platinum ROI breakeven verdicts.
*   **Tactile Hardware Assembly Desk:** A 12-column bento-style workspace featuring circular progress rings, visual warning states, and a real-time animated SVG transient waveform monitor.
*   **Live Selector Search:** Live text input filtering in CPU, GPU, and PSU picker bays, allowing users to search thousands of models instantly by socket, architecture generation, or wattage rating.
*   **Reddit & Forum Markdown Exporter:** Eliminates registration requirements. Users click "Share Build" to copy a base64-encoded URL (restoring exact client state) alongside a pre-formatted Markdown table ideal for `/r/buildapc` and PC support boards.
*   **Double-Slug SEO Oracle:** Evaluates 320+ cross-product combinations (e.g., `is-850w-enough-for-rtx-5080`) supporting dual slug formats (both with and without `w` suffixes) to maximize Google index coverage.
*   **Library Directory of 25+ Educational Guides:** A dedicated, searchable index directory (`/guides`) linking articles on hardware sizing, standards (ATX 3.1, Cybenetics), and building protocols (fanless PSUs, UPS sizing, AWG cable limits, fan positioning).

---

## 🛠️ Technology Stack

*   **Core Framework:** [Astro v7](https://astro.build/) — static-first Multi-Page Routing.
*   **Reactivity:** [Preact](https://preactjs.com/) with push-based [@preact/signals](https://preactjs.com/guide/v10/signals/) (fine-grained rendering, zero VDOM diffing overhead for complex mathematical grids).
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) — CSS-first theme configuration utilizing native OKLCH dark-first color semantics.
*   **SEO Schema:** Native structured JSON-LD graphs injected in the layout's header.

---

## 📦 Directory Structure

```
micro-tool/
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   └── robots.txt                   # Crawler policy linking to the sitemap index
├── src/
│   ├── components/
│   │   ├── calculators/
│   │   │   ├── bays/                # Modular hardware bays (BayCPU, BayGPU, BayPSU, etc.)
│   │   │   ├── CostHUD.tsx          # PC Builder budget & peripheral config panel
│   │   │   ├── DiagnosticsHUD.tsx   # PSU diagnostics real-time metrics
│   │   │   ├── InteractiveTco.tsx   # Slider-based 80+ electricity ROI visualizer
│   │   │   ├── ShareModal.tsx       # Share link and Reddit markdown exporter dialog
│   │   │   └── VirtualAssemblyDesk.tsx # Main assembly desk layout controller
│   │   └── charts/
│   │       ├── PowerGaugeArc.tsx    # SVG wattage headroom indicator
│   │       └── WaveformVisualizer.tsx # requestAnimationFrame transient wave simulator
│   ├── data/
│   │   ├── index/                   # Lightweight client-side database indices
│   │   └── derived/                 # Pre-computed Cybenetics & 80+ curve constants
│   ├── layouts/
│   │   └── Layout.astro             # MPA Shell with theme toggle and SEO meta tags
│   ├── lib/
│   │   ├── psu.ts                   # Sizing arithmetic and transient calculations
│   │   ├── calculate.ts             # Price summation logic
│   │   └── url.ts                   # base64 state URL serialization
│   ├── pages/
│   │   ├── index.astro              # Homepage
│   │   ├── psu-calculator.astro     # Standalone PSU Diagnostics Tool
│   │   ├── pc-builder.astro         # Standalone PC Build Cost Calculator
│   │   ├── psu-checker.astro        # Upgrades & headroom comparison tool
│   │   ├── compare/
│   │   │   └── psu.astro            # Side-by-side PSU specifications comparison
│   │   ├── oracle/
│   │   │   └── [slug].astro         # Dynamic programmatic CPU x GPU oracle pages
│   │   └── guides/                  # Long-form FAQ/HowTo-structured guides
│   └── styles/
│       ├── tailwind.css             # Tailwind v4 entry and token utility configurations
│       └── global.css               # Global layout resets
```

---

## 🚀 Development & Build

### Installation
Clone the repository, navigate to the `micro-tool` workspace directory, and install dependencies:
```bash
cd micro-tool
npm install
```

### Dev Server
Launch the Vite hot-reloading development server:
```bash
npm run dev
```
The site will be live at `http://localhost:4321/`.

### Production Build
Build the static website target:
```bash
npm run build
```
This minifies styles and pre-computes sitemaps and dynamic oracle routes. Built outputs compile into the `dist/` directory, ready to be deployed to Cloudflare Pages.