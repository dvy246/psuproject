/** @jsxImportSource preact */
// ============================================================
// PSUCheck — Cost HUD Component (i18n Enabled)
// Real-time PC build cost calculator & optimizer.
// ============================================================

import { signal, computed } from '@preact/signals';
import { useCallback } from 'preact/hooks';
import type { CpuIndex, GpuIndex, RamConfig, StorageConfig, CoolingConfig, PsuIndex, CaseConfig } from '../../types/components';
import { calculateBuildCost } from '../../lib/calculate';
import { generateOptimizationTips } from '../../lib/optimize';
import { selectedCpu, selectedGpu } from './VirtualAssemblyDesk';
import { useTranslations, formatCurrency, type Locale } from '../../i18n';

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
  lang?:   Locale;
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

export function CostHUD({ cpu, gpu, ram, storage, cooling, psu, lang = 'en' }: Props) {
  const t = useTranslations(lang);
  const hasBuild = !!(cpu || gpu || ram || storage.length > 0 || cooling || psu);

  // Map state to build selection parameters
  const currentBuild = computed(() => ({
    cpu,
    gpu,
    motherboard: null,
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

  const applyGpuOptimization = useCallback((optGpuName: string) => {
    import('../../data/index/gpus.index.json').then(gpuData => {
      const items = (gpuData.default || gpuData).items;
      const target = items.find(g => g.name === optGpuName);
      if (target) {
        selectedGpu.value = target as GpuIndex;
      }
    });
  }, []);

  const applyCpuOptimization = useCallback((optCpuName: string) => {
    import('../../data/index/cpus.index.json').then(cpuData => {
      const items = (cpuData.default || cpuData).items;
      const target = items.find(c => c.name === optCpuName);
      if (target) {
        selectedCpu.value = target as CpuIndex;
      }
    });
  }, []);

  const subtotalLabel = lang === 'de' ? 'Zwischensumme' : lang === 'es' ? 'Subtotal' : lang === 'fr' ? 'Sous-total' : lang === 'ja' ? '小計' : lang === 'zh' ? '小计' : 'Subtotal';
  const osAccessoriesTitle = lang === 'de' ? `${t.cost.osCost} & Zubehör` : lang === 'es' ? `${t.cost.osCost} y Periféricos` : lang === 'fr' ? `${t.cost.osCost} & Accessoires` : lang === 'ja' ? `${t.cost.osCost}＆周辺機器` : lang === 'zh' ? `${t.cost.osCost}与外设配件` : `${t.cost.osCost} & Accessories`;
  const osNoneLabel = lang === 'de' ? 'Kein OS (Kostenlos/Testversion)' : lang === 'es' ? 'Ninguno (Gratis/Prueba)' : lang === 'fr' ? 'Aucun (Gratuit/Essai)' : lang === 'ja' ? 'なし (無料/体験版)' : lang === 'zh' ? '无操作系统 (免费开源/试用)' : 'None (Free/Trial)';
  const osWinLabel = `Windows 11 (${formatCurrency(109, lang)})`;
  const osLinuxLabel = lang === 'de' ? 'Linux (Kostenlos/Open Source)' : lang === 'es' ? 'Linux (Gratis/Código Abierto)' : lang === 'fr' ? 'Linux (Gratuit Open Source)' : lang === 'ja' ? 'Linux (無料オープンソース)' : lang === 'zh' ? 'Linux (免费开源发行版)' : 'Linux (Free Open Source)';

  return (
    <div class="hud-panel" role="region" aria-label={t.cost.title}>
      {/* ── Section: Total Cost Verdict ── */}
      <div class="hud-section">
        <div class="hud-label" id="hud-total-cost-label">{t.cost.totalBuildCost}</div>
        <div class="verdict-display verdict-empty" style="padding: 1.25rem;">
          <div style="display:flex;justify-content:space-between;align-items:baseline;">
            <span style="font-size: 2rem; font-weight:900; color:var(--color-accent-cyan);" class="tabular">
              {formatCurrency(breakdown.totalCostWithTax, lang)}
            </span>
            <span style="font-size:0.75rem;color:var(--color-text-tertiary);" class="tabular">
              {subtotalLabel}: {formatCurrency(breakdown.totalCost, lang)}
            </span>
          </div>
          <div style="font-size:0.75rem;color:var(--color-text-secondary);margin-top:0.25rem;">
            {t.cost.taxRate}: {taxRatePercent.value}% | {t.cost.assemblyFee}: {formatCurrency(assemblyFee.value, lang)}
          </div>
        </div>
      </div>

      {/* ── Section: Visual Cost Distribution ── */}
      {hasBuild && (
        <div class="hud-section" aria-label="Component budget allocation chart">
          <div class="hud-label">{t.cost.costDistribution}</div>
          
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
                    <span style="color:var(--color-text-tertiary);">{formatCurrency(item.price, lang)}</span>
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
          <div class="hud-label">{t.cost.subtitle}</div>
          <p style="font-size:0.75rem;color:var(--color-text-secondary);line-height:1.5;">
            {breakdown.budgetAdvice}
          </p>
        </div>
      )}

      {/* ── Section: Peripherals Customizer Panel ── */}
      <div class="hud-section" style="background:var(--color-surface-raised);padding:1rem;border-radius:var(--radius-md);border:1px solid var(--color-border-subtle);display:flex;flex-direction:column;gap:0.875rem;">
        <div class="hud-label">{osAccessoriesTitle}</div>

        {/* OS selector */}
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <label for="cost-os-select" style="font-size:0.75rem;font-weight:600;color:var(--color-text-secondary);">{t.cost.osCost}</label>
          <select
            id="cost-os-select"
            value={osType.value}
            onChange={(e) => { osType.value = (e.target as HTMLSelectElement).value as 'none' | 'windows' | 'linux'; }}
            style="background:var(--color-surface);border:1px solid var(--color-border-subtle);color:var(--color-text-primary);font-size:0.75rem;padding:0.25rem 0.5rem;border-radius:var(--radius-sm);min-height:36px;"
          >
            <option value="none">{osNoneLabel}</option>
            <option value="windows">{osWinLabel}</option>
            <option value="linux">{osLinuxLabel}</option>
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
            {t.cost.monitorCost}
          </label>
          <span style="font-size:0.75rem;color:var(--color-text-tertiary);font-family:var(--font-mono);" class="tabular">+{formatCurrency(199, lang)}</span>
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
            {t.cost.peripheralsCost}
          </label>
          <span style="font-size:0.75rem;color:var(--color-text-tertiary);font-family:var(--font-mono);" class="tabular">+{formatCurrency(49, lang)}</span>
        </div>

        {/* Tax Rate slider */}
        <div style="display:flex;flex-direction:column;gap:0.25rem;">
          <div style="display:flex;justify-content:space-between;font-size:0.75rem;font-weight:600;color:var(--color-text-secondary);">
            <label for="tax-rate-range">{t.cost.taxRate}</label>
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
          <label for="assembly-fee-input" style="font-size:0.75rem;font-weight:600;color:var(--color-text-secondary);">{t.cost.assemblyFee}</label>
          <div style="display:flex;align-items:center;position:relative;">
            <input
              id="assembly-fee-input"
              type="number"
              min="0"
              step="10"
              value={assemblyFee.value}
              onInput={(e) => { assemblyFee.value = parseInt((e.target as HTMLInputElement).value, 10) || 0; }}
              style="width:80px;background:var(--color-surface);border:1px solid var(--color-border-subtle);color:var(--color-text-primary);font-size:0.75rem;padding:0.25rem 0.5rem;border-radius:var(--radius-sm);text-align:right;min-height:32px;"
            />
          </div>
        </div>
      </div>

      {/* ── Section: Optimization Tips ── */}
      {optimizationTips.length > 0 && (
        <div class="hud-section" style="background:var(--color-surface-raised);padding:0.875rem;border-radius:var(--radius-md);border:1px solid var(--color-border-subtle);">
          <div class="hud-label" style="display:flex;align-items:center;gap:0.375rem;color:var(--color-accent-cyan);">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            {t.cost.optimizationTips}
          </div>
          <div style="display:flex;flex-direction:column;gap:0.5rem;margin-top:0.5rem;">
            {optimizationTips.map((tip, idx) => (
              <div key={idx} style="background:var(--color-surface);padding:0.625rem;border-radius:var(--radius-sm);border:1px solid var(--color-border-subtle);font-size:0.75rem;">
                <div style="font-weight:700;color:var(--color-text-primary);margin-bottom:0.25rem;">
                  {tip.title}
                </div>
                <div style="color:var(--color-text-secondary);margin-bottom:0.5rem;line-height:1.4;">
                  {tip.description}
                </div>
                {tip.action && (
                  <button
                    type="button"
                    class="btn btn-secondary btn-sm"
                    style="font-size:0.7rem;padding:2px 8px;min-height:24px;"
                    onClick={() => {
                      if (tip.action?.type === 'downgrade-gpu') {
                        applyGpuOptimization(tip.action.targetGpu);
                      } else if (tip.action?.type === 'downgrade-cpu') {
                        applyCpuOptimization(tip.action.targetCpu);
                      }
                    }}
                  >
                    {tip.action.label}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
