/** @jsxImportSource preact */
// ============================================================
// VoltForge — Virtual Assembly Desk
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
import type { CpuIndex, GpuIndex, MotherboardIndex, RamConfig, StorageConfig, CoolingConfig, CaseConfig, PsuIndex } from '../../types/components';
import { BayCPU } from './bays/BayCPU';
import { BayGPU } from './bays/BayGPU';
import { BayMotherboard } from './bays/BayMotherboard';
import { BayRAM } from './bays/BayRAM';
import { BayStorage } from './bays/BayStorage';
import { BayCooling } from './bays/BayCooling';
import { BayPSU } from './bays/BayPSU';
import { DiagnosticsHUD } from './DiagnosticsHUD';
import { CostHUD } from './CostHUD';
import { serializeBuild, deserializeBuild } from '../../lib/url';
import { runFullPsuAnalysis } from '../../lib/psu';
import { calculateBuildCost } from '../../lib/calculate';
import { ShareModal } from './ShareModal';

// --- Signals Store (global, shared with DiagnosticsHUD) ---
export const selectedCpu    = signal<CpuIndex | null>(null);
export const selectedGpu    = signal<GpuIndex | null>(null);
export const selectedMobo   = signal<MotherboardIndex | null>(null);
export const selectedRam    = signal<RamConfig | null>(null);
export const selectedStorage = signal<StorageConfig[]>([]);
export const selectedCooling = signal<CoolingConfig | null>(null);
export const selectedPsu    = signal<PsuIndex | null>(null);
export const psuMode        = signal<'auto' | 'manual'>('auto');
export const fans           = signal<number>(2);
export const hudDrawerOpen  = signal<boolean>(false);

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
}

export function VirtualAssemblyDesk({ mode = 'psu' }: Props) {
  const [hudOpen, setHudOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentShareUrl, setCurrentShareUrl] = useState('');
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle');
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
      selectedPsu.value
    );
    const shareUrl = `${window.location.origin}${window.location.pathname}?${query}`;
    setCurrentShareUrl(shareUrl);
    setIsModalOpen(true);
  }, []);

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
    fans: fans.value
  }, activePsu?.wattage ?? 850, activePsu?.atxVersion ?? '3.1');

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
              <div style="display:flex;align-items:center;gap:12px;margin-top:4px;">
                <p class="tray-subtitle" style="margin:0;">Select components to begin analysis</p>
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
              <DiagnosticsHUD
                cpu={selectedCpu.value}
                gpu={selectedGpu.value}
                ram={selectedRam.value}
                storage={selectedStorage.value}
                cooling={selectedCooling.value}
                psu={selectedPsu.value}
                fans={fans.value}
              />
            )}
          </div>
        </aside>
      </div>

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

