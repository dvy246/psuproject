/** @jsxImportSource preact */
// ============================================================
// VoltForge — Cost HUD Component
// Real-time PC build cost calculator & optimizer.
// Shows: Cost Breakdown, Stacked Distribution Bar,
//        Budget Advice, Cost Optimization Tips.
// Tactile controls for: Peripherals, OS, Tax, Assembly Fee.
// ============================================================

import { signal, computed } from '@preact/signals';
import { useCallback } from 'preact/hooks';
import type { CpuIndex, GpuIndex, RamConfig, StorageConfig, CoolingConfig, PsuIndex, CaseConfig } from '../../types/components';
import { calculateBuildCost } from '../../lib/calculate';
import { generateOptimizationTips } from '../../lib/optimize';
import { selectedCpu, selectedGpu } from './VirtualAssemblyDesk';

// Component state signals for peripheral customizers
export const selectedCase       = signal<CaseConfig | null>(null);
export const osType             = signal<'none' | 'windows' | 'linux'>('none');
export const osPrice            = signal<number>(109);
export const hasMonitor         = signal<boolean>(false);
export const monitorPrice       = signal<number>(199);
export const hasPeripherals     = signal<boolean>(false);
export const keyboardMousePrice = signal<number>(49);
export const taxRatePercent     = signal<number>(8); // 8% Default
export const assemblyFee        = signal<number>(0);

interface Props {
  cpu:     CpuIndex | null;
  gpu:     GpuIndex | null;
  ram:     RamConfig | null;
  storage: StorageConfig[];
  cooling: CoolingConfig | null;
  psu:     PsuIndex | null;
}

// Color palette map for distribution segments
const CATEGORY_COLORS: Record<string, string> = {
  CPU:         'oklch(85% 0.18 195)',    /* cyan */
  GPU:         'oklch(68% 0.20 295)',    /* violet */
  Motherboard: 'oklch(80% 0.16 65)',     /* amber */
  RAM:         'oklch(68% 0.22 15)',     /* rose */
  Storage:     'oklch(75% 0.18 152)',    /* emerald */
  PSU:         'oklch(85% 0.12 110)',    /* lime/orange */
  Cooling:     'oklch(80% 0.10 230)',    /* light blue */
  Case:        'oklch(60% 0.08 260)',    /* slate */
  OS:          'oklch(50% 0.15 320)',    /* pink */
  Monitor:     'oklch(70% 0.12 180)',    /* teal */
  Peripherals: 'oklch(65% 0.14 20)',     /* brown */
};

export function CostHUD({ cpu, gpu, ram, storage, cooling, psu }: Props) {
  const hasBuild = !!(cpu || gpu || ram || storage.length > 0 || cooling || psu);

  // Map state to build selection parameters
  const currentBuild = computed(() => ({
    cpu,
    gpu,
    motherboard: null, // Passed at component level in page
    ram,
    storage,
    psu,
    psuMode: 'auto' as const,
    cooling,
    caseConfig: selectedCase.value,
    peripherals: {
      os: osType.value,
      osPrice: osPrice.value,
      monitor: hasMonitor.value,
      monitorPrice: monitorPrice.value,
      keyboardMouse: hasPeripherals.value,
      keyboardMousePrice: keyboardMousePrice.value,
    },
    fans: 2,
    taxRate: taxRatePercent.value / 100,
    assemblyFee: assemblyFee.value,
  }));

  const breakdown = calculateBuildCost(currentBuild.value);
  const optimizationTips = generateOptimizationTips(cpu, gpu);

  // Apply optimization downgrade directly to preact store signals
  const applyGpuOptimization = useCallback((optGpuName: string) => {
    // Find matching GPU in the data to apply
    import('../../data/index/gpus.index.json').then(gpuData => {
      const items = (gpuData.default || gpuData).items;
      const target = items.find(g => g.name === optGpuName);
      if (target) {
        selectedGpu.value = target as GpuIndex;
      }
    });
  }, []);

  const applyCpuOptimization = useCallback((optCpuName: string) => {
    // Find matching CPU in the data to apply
    import('../../data/index/cpus.index.json').then(cpuData => {
      const items = (cpuData.default || cpuData).items;
      const target = items.find(c => c.name === optCpuName);
      if (target) {
        selectedCpu.value = target as CpuIndex;
      }
    });
  }, []);

  return (
    <div class="hud-panel" role="region" aria-label="PC Build Cost Diagnostics">
      {/* ── Section: Total Cost Verdict ── */}
      <div class="hud-section">
        <div class="hud-label" id="hud-total-cost-label">Total Estimated Cost</div>
        <div class="verdict-display verdict-empty" style="padding: 1.25rem;">
          <div style="display:flex;justify-content:space-between;align-items:baseline;">
            <span style="font-size: 2rem; font-weight:900; color:var(--color-accent-cyan);" class="tabular">
              ${breakdown.totalCostWithTax}
            </span>
            <span style="font-size:0.75rem;color:var(--color-text-tertiary);" class="tabular">
              Subtotal: ${breakdown.totalCost}
            </span>
          </div>
          <div style="font-size:0.75rem;color:var(--color-text-secondary);margin-top:0.25rem;">
            Includes {taxRatePercent.value}% tax & ${assemblyFee.value} assembly fee
          </div>
        </div>
      </div>

      {/* ── Section: Visual Cost Distribution (Segmented Bar) ── */}
      {hasBuild && (
        <div class="hud-section" aria-label="Component budget allocation chart">
          <div class="hud-label">Budget Allocation</div>
          
          {/* Custom segmented progress bar */}
          <div style="height:14px;background:var(--color-surface-overlay);border-radius:var(--radius-full);display:flex;overflow:hidden;margin-bottom:1rem;" role="img" aria-label="Budget breakdown bar">
            {breakdown.components.map(item => {
              const pct = item.percentage;
              if (pct === 0) return null;
              const color = CATEGORY_COLORS[item.category] || 'var(--color-border)';
              return (
                <div
                  key={item.category}
                  style={{
                    width: `${pct}%`,
                    background: color,
                    height: '100%',
                    transition: 'width 250ms ease-out',
                  }}
                  title={`${item.category}: ${pct}%`}
                />
              );
            })}
          </div>

          {/* Allocation Legend List */}
          <div style="display:flex;flex-direction:column;gap:0.375rem;">
            {breakdown.components.map(item => {
              const color = CATEGORY_COLORS[item.category] || 'var(--color-border)';
              return (
                <div key={item.category} style="display:flex;align-items:center;justify-content:space-between;font-size:0.75rem;">
                  <div style="display:flex;align-items:center;gap:0.5rem;">
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
                    <span style="color:var(--color-text-secondary);font-weight:600;">{item.category}</span>
                  </div>
                  <div style="display:flex;gap:1rem;font-family:var(--font-mono);" class="tabular">
                    <span style="color:var(--color-text-tertiary);">${item.price}</span>
                    <span style="color:var(--color-text-primary);font-weight:700;width:32px;text-align:right;">{item.percentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Section: Budget Advice ── */}
      {hasBuild && (
        <div class="hud-section" style="background:var(--color-surface-raised);padding:0.875rem;border-radius:var(--radius-md);border:1px solid var(--color-border-subtle);">
          <div class="hud-label">Budget Analysis</div>
          <p style="font-size:0.75rem;color:var(--color-text-secondary);line-height:1.5;">
            {breakdown.budgetAdvice}
          </p>
        </div>
      )}

      {/* ── Section: Peripherals & Customs Customizer Panel ── */}
      <div class="hud-section" style="background:var(--color-surface-raised);padding:1rem;border-radius:var(--radius-md);border:1px solid var(--color-border-subtle);display:flex;flex-direction:column;gap:0.875rem;">
        <div class="hud-label">Workbench Accessories</div>

        {/* OS selector */}
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <label for="cost-os-select" style="font-size:0.75rem;font-weight:600;color:var(--color-text-secondary);">Operating System</label>
          <select
            id="cost-os-select"
            value={osType.value}
            onChange={(e) => { osType.value = (e.target as HTMLSelectElement).value as 'none' | 'windows' | 'linux'; }}
            style="background:var(--color-surface);border:1px solid var(--color-border-subtle);color:var(--color-text-primary);font-size:0.75rem;padding:0.25rem 0.5rem;border-radius:var(--radius-sm);min-height:36px;"
          >
            <option value="none">None (Free/Trial)</option>
            <option value="windows">Windows 11 ($109)</option>
            <option value="linux">Linux (Free Open Source)</option>
          </select>
        </div>

        {/* Monitor checkbox */}
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <label style="font-size:0.75rem;font-weight:600;color:var(--color-text-secondary);display:flex;align-items:center;gap:0.5rem;cursor:pointer;">
            <input
              type="checkbox"
              checked={hasMonitor.value}
              onChange={(e) => { hasMonitor.value = (e.target as HTMLInputElement).checked; }}
              style="width:16px;height:16px;"
            />
            Add 1440p Gaming Monitor
          </label>
          <span style="font-size:0.75rem;color:var(--color-text-tertiary);font-family:var(--font-mono);" class="tabular">+$199</span>
        </div>

        {/* Peripherals keyboard & mouse checkbox */}
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <label style="font-size:0.75rem;font-weight:600;color:var(--color-text-secondary);display:flex;align-items:center;gap:0.5rem;cursor:pointer;">
            <input
              type="checkbox"
              checked={hasPeripherals.value}
              onChange={(e) => { hasPeripherals.value = (e.target as HTMLInputElement).checked; }}
              style="width:16px;height:16px;"
            />
            Add Keyboard & Mouse Combo
          </label>
          <span style="font-size:0.75rem;color:var(--color-text-tertiary);font-family:var(--font-mono);" class="tabular">+$49</span>
        </div>

        {/* Tax Rate slider */}
        <div style="display:flex;flex-direction:column;gap:0.25rem;">
          <div style="display:flex;justify-content:space-between;font-size:0.75rem;font-weight:600;color:var(--color-text-secondary);">
            <label for="tax-rate-range">Sales Tax Rate</label>
            <span class="tabular" style="color:var(--color-accent-cyan);">{taxRatePercent.value}%</span>
          </div>
          <input
            id="tax-rate-range"
            type="range"
            min="0"
            max="20"
            value={taxRatePercent.value}
            onInput={(e) => { taxRatePercent.value = parseInt((e.target as HTMLInputElement).value, 10); }}
            style="width:100%;height:6px;background:var(--color-surface-overlay);border-radius:3px;accent-color:var(--color-accent-cyan);cursor:pointer;min-height:30px;"
          />
        </div>

        {/* Assembly Fee input */}
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <label for="assembly-fee-input" style="font-size:0.75rem;font-weight:600;color:var(--color-text-secondary);">Assembly/Building Fee</label>
          <div style="display:flex;align-items:center;position:relative;">
            <span style="position:absolute;left:8px;font-size:0.75rem;color:var(--color-text-tertiary);">$</span>
            <input
              id="assembly-fee-input"
              type="number"
              min="0"
              value={assemblyFee.value}
              onInput={(e) => { assemblyFee.value = Math.max(0, parseInt((e.target as HTMLInputElement).value, 10) || 0); }}
              style="background:var(--color-surface);border:1px solid var(--color-border-subtle);color:var(--color-text-primary);font-size:0.75rem;padding:0.25rem 0.5rem 0.25rem 1.25rem;border-radius:var(--radius-sm);width:80px;text-align:right;font-family:var(--font-mono);min-height:36px;"
            />
          </div>
        </div>
      </div>

      {/* ── Section: Real-time Cost Optimization Tips ── */}
      {hasBuild && optimizationTips.length > 0 && (
        <div class="hud-section" style="border: 2px solid var(--color-warning-border); background: var(--color-warning-bg); padding:1rem; border-radius:var(--radius-md);">
          <div class="hud-label" style="color:var(--color-warning);margin-bottom:0.5rem;">⚡ Budget Optimizations</div>
          <div style="display:flex;flex-direction:column;gap:0.75rem;">
            {optimizationTips.map((tip, idx) => {
              // Parse out target name from tip
              const match = tip.suggestion.match(/The (.*?) at \$/);
              const targetName = match ? match[1] : '';

              return (
                <div key={idx} style="display:flex;flex-direction:column;gap:0.375rem;">
                  <p style="font-size:0.75rem;color:var(--color-text-secondary);line-height:1.45;">
                    {tip.suggestion}
                  </p>
                  <p style="font-size:0.7rem;color:var(--color-warning);font-weight:700;">
                    Impact: {tip.performanceImpact}
                  </p>
                  {targetName && (
                    <button
                      onClick={() => {
                        if (tip.component === 'GPU') applyGpuOptimization(targetName);
                        if (tip.component === 'CPU') applyCpuOptimization(targetName);
                      }}
                      class="btn btn-secondary"
                      style="font-size:0.7rem;padding:0.375rem;min-height:36px;width:100%;text-align:center;border-color:var(--color-warning-border);"
                      type="button"
                    >
                      Apply suggestion (Save ${tip.savings})
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Empty State ── */}
      {!hasBuild && (
        <div class="hud-empty" role="status">
          <div class="hud-empty-icon" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
          </div>
          <p class="hud-empty-text">Select components to build your custom PC estimate</p>
        </div>
      )}
    </div>
  );
}
