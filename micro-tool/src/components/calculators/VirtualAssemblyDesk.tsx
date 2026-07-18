/** @jsxImportSource preact */
// ============================================================
// PSUCheck — Virtual Assembly Desk
// Two-column workbench layout.
// Left: 8-col Assembly Tray with modular bay cards.
// Right: 4-col Sticky Diagnostics HUD.
// Mobile: HUD collapses to bottom-sheet drawer.
//
// UI-UX-Pro-Max rules applied:
// - Touch targets ≥ 44px
// - Color-independent status (icon + text + color)
// - Explicit transition properties (no `transition: all`)
// - Fixed min-height on warning containers (CLS prevention)
// - Tabular-nums on every data value
// - Keyboard + screen reader compliant
// ============================================================

import { signal, computed } from '@preact/signals';
import { useEffect, useRef, useState, useCallback } from 'preact/hooks';
import type { CpuIndex, GpuIndex, MotherboardIndex, RamConfig, StorageConfig, CoolingConfig, CaseConfig, PsuIndex, CaseIndex } from '../../types/components';
import { BayCPU } from './bays/BayCPU';
import { BayGPU } from './bays/BayGPU';
import { BayMotherboard } from './bays/BayMotherboard';
import { BayRAM } from './bays/BayRAM';
import { BayStorage } from './bays/BayStorage';
import { BayCooling } from './bays/BayCooling';
import { BayPSU } from './bays/BayPSU';
import { DiagnosticsHUD } from './DiagnosticsHUD';
import { CostHUD } from './CostHUD';
import PsuHealthHUD from './PsuHealthHUD';
import { serializeBuild, deserializeBuild } from '../../lib/url';
import { runFullPsuAnalysis, calculatePsuHealthScore } from '../../lib/psu';
import { calculateBuildCost } from '../../lib/calculate';
import { ShareModal } from './ShareModal';
import { generateBlueprint } from '../../lib/blueprint';
import type { BlueprintOutput } from '../../lib/blueprint';
import { BuildBlueprint } from './BuildBlueprint';

import caseData from '../../data/index/cases.index.json';
const ALL_CASES = (caseData as any).items as CaseIndex[];

// --- Signals Store (global, shared with DiagnosticsHUD) ---
export const selectedCpu     = signal<CpuIndex | null>(null);
export const selectedGpu     = signal<GpuIndex | null>(null);
export const selectedMobo    = signal<MotherboardIndex | null>(null);
export const selectedRam     = signal<RamConfig | null>(null);
export const selectedStorage = signal<StorageConfig[]>([]);
export const selectedCooling = signal<CoolingConfig | null>(null);
export const selectedPsu     = signal<PsuIndex | null>(null);
export const psuMode         = signal<'auto' | 'manual'>('auto');
export const fans            = signal<number>(2);
export const hudDrawerOpen   = signal<boolean>(false);
export const psuAge          = signal<number>(0); // P1: PSU age in years (0 = new)
export const overclockingEnabled = signal<boolean>(false);
export const cpuOcPercent       = signal<number>(0);  // 0–30
export const gpuOcPercent       = signal<number>(0);  // 0–30
export const safetyBufferPercent = signal<number>(10); // 0–30, default 10%

// Computed: total filled bays (for progress ring)
export const filledBayCount = computed(() => {
  let count = 0;
  if (selectedCpu.value)     count++;
  if (selectedGpu.value)     count++;
  if (selectedMobo.value)    count++;
  if (selectedRam.value)     count++;
  if (selectedStorage.value.length > 0) count++;
  if (selectedCooling.value) count++;
  if (selectedPsu.value)     count++;
  return count;
});

const TOTAL_BAYS = 7;

interface Props {
  mode?: 'psu' | 'cost';
  blueprintMode?: boolean;
}

export function VirtualAssemblyDesk({ mode = 'psu', blueprintMode = false }: Props) {
  const [hudOpen, setHudOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentShareUrl, setCurrentShareUrl] = useState('');
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle');
  const [blueprintOutput, setBlueprintOutput] = useState<BlueprintOutput | null>(null);
  const [selectedCase, setSelectedCase] = useState<CaseIndex | null>(null);
  const [showCaseSelector, setShowCaseSelector] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const drawerToggleRef = useRef<HTMLButtonElement>(null);

  // Deserialize build on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search) {
      const build = deserializeBuild(window.location.search);
      if (build.cpu) selectedCpu.value = build.cpu;
      if (build.gpu) selectedGpu.value = build.gpu;
      if (build.mobo) selectedMobo.value = build.mobo;
      if (build.ram) selectedRam.value = build.ram;
      if (build.storage.length > 0) selectedStorage.value = build.storage;
      if (build.cooling) selectedCooling.value = build.cooling;
      if (build.psu) {
        selectedPsu.value = build.psu;
        psuMode.value = 'manual';
      }
      if (build.cpuOcPercent !== undefined || build.gpuOcPercent !== undefined) {
        overclockingEnabled.value = true;
        if (build.cpuOcPercent !== undefined) cpuOcPercent.value = build.cpuOcPercent;
        if (build.gpuOcPercent !== undefined) gpuOcPercent.value = build.gpuOcPercent;
      }
      if (build.safetyBufferPercent !== undefined) {
        safetyBufferPercent.value = build.safetyBufferPercent;
      }
    }
  }, []);

  // Close drawer on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && hudOpen) {
        setHudOpen(false);
        drawerToggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [hudOpen]);

  const toggleDrawer = useCallback(() => {
    setHudOpen(prev => !prev);
  }, []);

  const handleShare = useCallback(() => {
    const query = serializeBuild(
      selectedCpu.value,
      selectedGpu.value,
      selectedMobo.value,
      selectedRam.value,
      selectedStorage.value,
      selectedCooling.value,
      selectedPsu.value,
      cpuOcPercent.value,
      gpuOcPercent.value,
      safetyBufferPercent.value
    );
    const shareUrl = `${window.location.origin}${window.location.pathname}?${query}`;
    setCurrentShareUrl(shareUrl);
    setIsModalOpen(true);
  }, []);

  const handleGenerateBlueprint = useCallback(() => {
    const output = generateBlueprint({
      cpu: selectedCpu.value,
      gpu: selectedGpu.value,
      ram: selectedRam.value,
      storage: selectedStorage.value,
      cooling: selectedCooling.value,
      psu: selectedPsu.value,
      caseModel: selectedCase,
      fans: fans.value,
      psuAgeYears: psuAge.value,
      cpuOcPercent: cpuOcPercent.value,
      gpuOcPercent: gpuOcPercent.value,
      safetyBufferPercent: safetyBufferPercent.value,
    });
    setBlueprintOutput(output);
    requestAnimationFrame(() => {
      const el = document.getElementById('blueprint-output');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [selectedCase]);

  const activeCpu = selectedCpu.value;
  const activeGpu = selectedGpu.value;
  const activeRam = selectedRam.value;
  const activeStorage = selectedStorage.value;
  const activeCooling = selectedCooling.value;
  const activePsu = selectedPsu.value;

  const costBreakdown = calculateBuildCost({
    cpu: activeCpu,
    gpu: activeGpu,
    motherboard: selectedMobo.value,
    ram: activeRam,
    storage: activeStorage,
    psu: activePsu,
    psuMode: psuMode.value,
    cooling: activeCooling,
    caseConfig: null,
    peripherals: { os: 'none', osPrice: 0, monitor: false, monitorPrice: 0, keyboardMouse: false, keyboardMousePrice: 0 },
    fans: fans.value,
    taxRate: 0,
    assemblyFee: 0
  });

  const psuAnalysis = runFullPsuAnalysis({
    cpu: activeCpu,
    gpu: activeGpu,
    ram: activeRam,
    storage: activeStorage,
    cooling: activeCooling,
    fans: fans.value,
    ocConfig: overclockingEnabled.value ? {
      cpuOcPercent: cpuOcPercent.value,
      gpuOcPercent: gpuOcPercent.value,
    } : undefined,
  }, activePsu?.wattage ?? 850, activePsu?.atxVersion ?? '3.1', safetyBufferPercent.value / 100);

  // Build progress
  const filled = filledBayCount.value;
  const progressPct = (filled / TOTAL_BAYS) * 100;

  return (
    <div class="assembly-desk">
      {/* ── Desktop layout: 12-col grid ── */}
      <div class="assembly-grid">

        {/* ══ LEFT: Assembly Tray (col-span-8) ══ */}
        <section
          class="assembly-tray"
          aria-label="Component Assembly Tray"
          id="assembly-tray"
        >
          {/* Tray header */}
          <div class="tray-header">
            <div>
              <h2 class="tray-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                  <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
                </svg>
                Assembly Tray
              </h2>
              <div style="display:flex;align-items:center;gap:8px;margin-top:4px;flex-wrap:wrap;">
                <p class="tray-subtitle" style="margin:0;margin-right:4px;">Select components to begin analysis</p>
                <button
                  onClick={handleShare}
                  class="btn btn-secondary"
                  style="font-size:0.7rem;padding:2px 8px;min-height:30px;display:flex;align-items:center;gap:4px;"
                  aria-label="Share build configuration via link"
                  type="button"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
                  {shareStatus === 'copied' ? 'Link Copied!' : 'Share Build'}
                </button>
                <a
                  href="/builds"
                  class="btn btn-secondary"
                  style="font-size:0.7rem;padding:6px 10px;min-height:30px;display:inline-flex;align-items:center;gap:4px;text-decoration:none;"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>
                  Build Gallery
                </a>
                <button
                  onClick={handleGenerateBlueprint}
                  class="btn btn-primary"
                  style="font-size:0.7rem;padding:2px 8px;min-height:30px;display:flex;align-items:center;gap:4px;"
                  aria-label="Generate build blueprint"
                  type="button"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                  Generate Blueprint
                </button>
              </div>
            </div>
            {/* Build progress indicator */}
            <div class="build-progress" aria-label={`Build progress: ${filled} of ${TOTAL_BAYS} components selected`}>
              <div class="build-progress-ring" aria-hidden="true">
                <svg width="48" height="48" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="20" fill="none" stroke="var(--color-border-subtle)" stroke-width="3"/>
                  <circle
                    cx="24" cy="24" r="20" fill="none"
                    stroke="var(--color-accent-cyan)"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-dasharray={`${progressPct * 1.257} 125.7`}
                    stroke-dashoffset="31.4"
                    style="transition-property: stroke-dasharray; transition-duration: 400ms; transition-timing-function: cubic-bezier(0.16,1,0.3,1);"
                  />
                </svg>
                <span class="build-progress-count tabular">{filled}/{TOTAL_BAYS}</span>
              </div>
            </div>
          </div>

          {/* ── Bay Cards ── */}
          <div class="bays-list" role="list">
            <BayCPU
              selected={selectedCpu.value}
              onSelect={(cpu) => { selectedCpu.value = cpu; }}
            />
            <BayGPU
              selected={selectedGpu.value}
              onSelect={(gpu) => { selectedGpu.value = gpu; }}
            />
            <BayMotherboard
              selected={selectedMobo.value}
              selectedCpu={selectedCpu.value}
              onSelect={(mobo) => { selectedMobo.value = mobo; }}
            />
            <BayRAM
              selected={selectedRam.value}
              onSelect={(ram) => { selectedRam.value = ram; }}
            />
            <BayStorage
              selected={selectedStorage.value}
              onSelect={(storage) => { selectedStorage.value = storage; }}
            />
            <BayCooling
              selected={selectedCooling.value}
              onSelect={(cooling) => { selectedCooling.value = cooling; }}
            />
            <BayPSU
              selected={selectedPsu.value}
              mode={psuMode.value}
              onSelect={(psu) => { selectedPsu.value = psu; }}
              onModeChange={(mode) => { psuMode.value = mode; }}
            />

            {/* ── P1: PSU Age Slider ── */}
            <div
              class="bay-wrapper"
              role="listitem"
              style="padding: 0.75rem 1rem; background: var(--color-surface-raised); border-radius: var(--radius-md); border: 1px solid var(--color-border-subtle);"
            >
              <label
                for="psu-age-slider"
                style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:0.5rem;font-size:0.8125rem;font-weight:600;color:var(--color-text-secondary);"
              >
                <span style="display:flex;align-items:center;gap:6px;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  PSU Age
                </span>
                <span class="tabular" style="color:var(--color-accent-cyan);font-weight:700;">
                  {psuAge.value === 0 ? 'New' : `${psuAge.value}yr`}
                  {psuAge.value > 3 && (
                    <span style="color:#f59e0b;font-size:0.7rem;margin-left:6px;">⚠ aging applied</span>
                  )}
                </span>
              </label>
              <input
                id="psu-age-slider"
                type="range"
                min="0"
                max="15"
                step="1"
                value={psuAge.value}
                onInput={(e) => { psuAge.value = Number((e.target as HTMLInputElement).value); }}
                aria-label={`PSU age: ${psuAge.value === 0 ? 'New' : `${psuAge.value} years`}. Capacitor aging drates effective wattage by 5% per year after 3 years.`}
                aria-valuemin={0}
                aria-valuemax={15}
                aria-valuenow={psuAge.value}
                style="width:100%;accent-color:var(--color-accent-cyan);cursor:pointer;"
              />
              <div style="display:flex;justify-content:space-between;font-size:0.65rem;color:var(--color-text-tertiary);margin-top:2px;">
                <span>New</span><span>5yr</span><span>10yr</span><span>15yr</span>
              </div>
              {psuAge.value <= 3 && (
                <p style="font-size:0.7rem;color:var(--color-text-tertiary);margin-top:0.4rem;">
                  No capacity derating below 3 years.
                </p>
              )}
            </div>

            {/* ── P2: Overclocking Mode Card ── */}
            <div
              class="bay-wrapper"
              role="listitem"
              style="padding: 0.75rem 1rem; background: var(--color-surface-raised); border-radius: var(--radius-md); border: 1px solid var(--color-border-subtle);"
            >
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                <span style="display:flex;align-items:center;gap:6px;font-size:0.8125rem;font-weight:600;color:var(--color-text-secondary);">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                  Overclocking Mode
                </span>
                <button
                  class={`mode-tab ${overclockingEnabled.value ? 'mode-tab--active' : ''}`}
                  onClick={() => { overclockingEnabled.value = !overclockingEnabled.value; }}
                  aria-pressed={overclockingEnabled.value}
                  type="button"
                  style="min-height:30px;font-size:0.7rem;padding:2px 10px;"
                >
                  {overclockingEnabled.value ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              {overclockingEnabled.value && (
                <div style="display:flex;flex-direction:column;gap:0.75rem;">
                  {selectedCpu.value && (
                    <div>
                      <div style="display:flex;justify-content:space-between;font-size:0.75rem;color:var(--color-text-secondary);margin-bottom:0.25rem;">
                        <label for="cpu-oc-slider">CPU Overclock</label>
                        <span class="tabular" style="color:var(--color-accent-cyan);font-weight:700;">+{cpuOcPercent.value}%</span>
                      </div>
                      <input
                        id="cpu-oc-slider"
                        name="cpuOc"
                        type="range"
                        min="0"
                        max="30"
                        step="1"
                        value={cpuOcPercent.value}
                        onInput={(e) => { cpuOcPercent.value = Number((e.target as HTMLInputElement).value); }}
                        aria-label={`CPU overclock: ${cpuOcPercent.value}% above stock`}
                        style="width:100%;accent-color:var(--color-accent-cyan);cursor:pointer;"
                      />
                      <div style="display:flex;justify-content:space-between;font-size:0.65rem;color:var(--color-text-tertiary);">
                        <span>Stock</span><span>15%</span><span>30% max</span>
                      </div>
                      <p style="font-size:0.7rem;color:var(--color-text-tertiary);margin-top:0.25rem;">
                        +{Math.round(selectedCpu.value.tdpSustained * cpuOcPercent.value / 100)}W on CPU draw
                      </p>
                    </div>
                  )}
                  {selectedGpu.value && (
                    <div>
                      <div style="display:flex;justify-content:space-between;font-size:0.75rem;color:var(--color-text-secondary);margin-bottom:0.25rem;">
                        <label for="gpu-oc-slider">GPU Overclock</label>
                        <span class="tabular" style="color:var(--color-accent-cyan);font-weight:700;">+{gpuOcPercent.value}%</span>
                      </div>
                      <input
                        id="gpu-oc-slider"
                        name="gpuOc"
                        type="range"
                        min="0"
                        max="30"
                        step="1"
                        value={gpuOcPercent.value}
                        onInput={(e) => { gpuOcPercent.value = Number((e.target as HTMLInputElement).value); }}
                        aria-label={`GPU overclock: ${gpuOcPercent.value}% above stock`}
                        style="width:100%;accent-color:var(--color-accent-cyan);cursor:pointer;"
                      />
                      <div style="display:flex;justify-content:space-between;font-size:0.65rem;color:var(--color-text-tertiary);">
                        <span>Stock</span><span>15%</span><span>30% max</span>
                      </div>
                      <p style="font-size:0.7rem;color:var(--color-text-tertiary);margin-top:0.25rem;">
                        +{Math.round(selectedGpu.value.tbp * gpuOcPercent.value / 100)}W on GPU draw
                      </p>
                    </div>
                  )}
                  {!selectedCpu.value && !selectedGpu.value && (
                    <p style="font-size:0.7rem;color:var(--color-text-tertiary);margin:0;">
                      Select a CPU or GPU to configure overclocking.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* ── P3: Safety Buffer Card ── */}
            <div
              class="bay-wrapper"
              role="listitem"
              style="padding: 0.75rem 1rem; background: var(--color-surface-raised); border-radius: var(--radius-md); border: 1px solid var(--color-border-subtle);"
            >
              <label
                for="safety-buffer-slider"
                style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:0.5rem;font-size:0.8125rem;font-weight:600;color:var(--color-text-secondary);"
              >
                <span style="display:flex;align-items:center;gap:6px;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  Safety Buffer
                </span>
                <span class="tabular" style="color:var(--color-accent-cyan);font-weight:700;">
                  {safetyBufferPercent.value}%
                </span>
              </label>
              <input
                id="safety-buffer-slider"
                name="safetyBuffer"
                type="range"
                min="0"
                max="30"
                step="5"
                value={safetyBufferPercent.value}
                onInput={(e) => { safetyBufferPercent.value = Number((e.target as HTMLInputElement).value); }}
                aria-label={`Safety buffer: ${safetyBufferPercent.value}% additional wattage margin`}
                style="width:100%;accent-color:var(--color-accent-cyan);cursor:pointer;"
              />
              <div style="display:flex;justify-content:space-between;font-size:0.65rem;color:var(--color-text-tertiary);margin-top:2px;">
                <span>0%</span><span>10%</span><span>20%</span><span>30%</span>
              </div>
              {safetyBufferPercent.value > 0 && (
                <p style="font-size:0.7rem;color:var(--color-text-tertiary);margin-top:0.4rem;">
                  Adds ~{Math.round(safetyBufferPercent.value * 0.5)}% to recommended wattage on top of ATX headroom.
                </p>
              )}
            </div>

            {/* ── Case Selection for Blueprint ── */}
            <div
              class="bay-wrapper"
              role="listitem"
              style="padding: 0.75rem 1rem; background: var(--color-surface-raised); border-radius: var(--radius-md); border: 1px solid var(--color-border-subtle);"
            >
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                <span style="display:flex;align-items:center;gap:6px;font-size:0.8125rem;font-weight:600;color:var(--color-text-secondary);">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><rect x="7" y="7" width="10" height="10" rx="1"/></svg>
                  Case (for clearance checks)
                </span>
                {selectedCase && (
                  <button
                    onClick={() => setSelectedCase(null)}
                    class="btn btn-secondary"
                    style="font-size:0.65rem;padding:2px 6px;min-height:24px;"
                    type="button"
                    aria-label="Clear case selection"
                  >
                    Clear
                  </button>
                )}
              </div>
              {selectedCase ? (
                <div style="display:flex;flex-direction:column;gap:0.25rem;">
                  <span style="font-size:0.9375rem;font-weight:700;color:var(--text-primary);">{selectedCase.name}</span>
                  <span style="font-size:0.75rem;color:var(--text-tertiary);">{selectedCase.formFactor} | GPU: {selectedCase.maxGpuLength}mm | Cooler: {selectedCase.maxCoolerHeight}mm</span>
                </div>
              ) : (
                <select
                  value=""
                  onChange={(e) => {
                    const id = (e.target as HTMLSelectElement).value;
                    if (id) {
                      const found = ALL_CASES.find(c => c.id === id);
                      if (found) setSelectedCase(found);
                    }
                  }}
                  aria-label="Select a computer case for clearance checks"
                  style="width:100%;padding:0.5rem;background:var(--bg-primary);color:var(--text-primary);border:1px solid var(--border-default);border-radius:var(--radius-sm);font-size:0.8125rem;"
                >
                  <option value="">— Select a case —</option>
                  {ALL_CASES.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.formFactor}, {c.maxGpuLength}mm GPU max)</option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </section>

        {/* ══ RIGHT: Sticky Diagnostics HUD (col-span-4) ══ */}
        <aside
          class="hud-sidebar"
          aria-label={mode === 'cost' ? 'Cost Allocation HUD' : 'Diagnostics HUD'}
          id="diagnostics-hud"
        >
          <div class="hud-sticky">
            {mode === 'cost' ? (
              <CostHUD
                cpu={selectedCpu.value}
                gpu={selectedGpu.value}
                ram={selectedRam.value}
                storage={selectedStorage.value}
                cooling={selectedCooling.value}
                psu={selectedPsu.value}
              />
            ) : (
              <div style="display: flex; flex-direction: column; gap: 1rem;">
                <DiagnosticsHUD
                  cpu={selectedCpu.value}
                  gpu={selectedGpu.value}
                  ram={selectedRam.value}
                  storage={selectedStorage.value}
                  cooling={selectedCooling.value}
                  psu={selectedPsu.value}
                  fans={fans.value}
                  psuAgeYears={psuAge.value}
                  cpuOcPercent={overclockingEnabled.value ? cpuOcPercent.value : 0}
                  gpuOcPercent={overclockingEnabled.value ? gpuOcPercent.value : 0}
                  safetyBufferPercent={safetyBufferPercent.value}
                />
                {activePsu && (
                  <PsuHealthHUD
                    psuAgeYears={psuAge.value}
                    psuWattage={activePsu.wattage}
                    health={calculatePsuHealthScore(
                      psuAge.value,
                      activePsu.wattage,
                      psuAnalysis.transientPeak,
                      activePsu.has12v2x6,
                      activePsu.has12v2x6 || activePsu.atxVersion === '3.1'
                    )}
                  />
                )}
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* ══ BLUEPRINT OUTPUT SECTION ══ */}
      {(blueprintMode || blueprintOutput) && (
        <section
          class="blueprint-section"
          style="margin-top:2rem;background:var(--bg-primary);border:1px solid var(--border-default);"
          aria-label="Build Blueprint Output"
        >
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
            <h2 style="font-size:1.25rem;font-weight:800;margin:0;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="vertical-align:middle;margin-right:0.5rem;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              Build Blueprint
            </h2>
            {blueprintOutput && (
              <button
                onClick={() => window.print()}
                class="btn btn-primary"
                style="font-size:0.8125rem;padding:6px 14px;min-height:36px;"
                type="button"
                aria-label="Print build blueprint"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                Print Blueprint
              </button>
            )}
          </div>
          <BuildBlueprint blueprint={blueprintOutput} />
        </section>
      )}

      {/* ══ MOBILE: Bottom-Sheet Drawer ══ */}
      <div
        class={`hud-drawer ${hudOpen ? 'open' : ''}`}
        ref={drawerRef}
        role="complementary"
        aria-label={mode === 'cost' ? 'Cost Allocation HUD' : 'Diagnostics HUD'}
        aria-expanded={hudOpen}
        id="mobile-hud-drawer"
      >
        {/* Drawer toggle handle — 44px touch target */}
        <button
          ref={drawerToggleRef}
          class="hud-drawer-handle"
          onClick={toggleDrawer}
          aria-controls="mobile-hud-drawer"
          aria-expanded={hudOpen}
          aria-label={hudOpen ? 'Collapse diagnostics panel' : 'Expand diagnostics panel'}
          type="button"
        >
          <span class="drawer-handle-label">
            <svg
              width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" aria-hidden="true"
              style={{
                transform: hudOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                'transition-property': 'transform',
                'transition-duration': '250ms',
              }}
            >
              <polyline points="18 15 12 9 6 15"/>
            </svg>
            <span style="font-size:0.8125rem;font-weight:600;color:var(--color-text-secondary);">
              {hudOpen ? 'Hide' : (mode === 'cost' ? 'Build Cost HUD' : 'Diagnostics HUD')}
            </span>
          </span>
        </button>

        {/* HUD content inside drawer */}
        <div class="drawer-hud-content" aria-hidden={!hudOpen} inert={!hudOpen ? '' : undefined}>
          {mode === 'cost' ? (
            <CostHUD
              cpu={selectedCpu.value}
              gpu={selectedGpu.value}
              ram={selectedRam.value}
              storage={selectedStorage.value}
              cooling={selectedCooling.value}
              psu={selectedPsu.value}
            />
          ) : (
            <DiagnosticsHUD
              cpu={selectedCpu.value}
              gpu={selectedGpu.value}
              ram={selectedRam.value}
              storage={selectedStorage.value}
              cooling={selectedCooling.value}
              psu={selectedPsu.value}
              fans={fans.value}
              psuAgeYears={psuAge.value}
              cpuOcPercent={overclockingEnabled.value ? cpuOcPercent.value : 0}
              gpuOcPercent={overclockingEnabled.value ? gpuOcPercent.value : 0}
              safetyBufferPercent={safetyBufferPercent.value}
            />
          )}
        </div>
      </div>

      {/* ══ SHARE MODAL ══ */}
      <ShareModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cpu={activeCpu}
        gpu={activeGpu}
        mobo={selectedMobo.value}
        ram={activeRam}
        storage={activeStorage}
        cooling={activeCooling}
        psu={activePsu}
        shareUrl={currentShareUrl}
        totalCost={costBreakdown.totalCost}
        transientPeak={psuAnalysis.transientPeak}
        recommendedWattage={psuAnalysis.recommendedWattage}
      />
    </div>
  );
}

