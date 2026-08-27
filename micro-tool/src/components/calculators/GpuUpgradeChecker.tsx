import { h } from 'preact';
import { useState, useMemo } from 'preact/hooks';
import type { CpuIndex, GpuIndex, PsuIndex } from '../../types/components';
import { useTranslations, l, formatCurrency, type Locale } from '../../i18n';
import { getGpuUpgradeTranslations } from '../../i18n/gpuUpgrade';

interface Props {
  cpus: CpuIndex[];
  gpus: GpuIndex[];
  psus: PsuIndex[];
  lang?: Locale;
}

export default function GpuUpgradeChecker({ cpus, gpus, psus, lang = 'en' }: Props) {
  const t = useTranslations(lang);
  const gut = getGpuUpgradeTranslations(lang);

  // Input states
  const [currentGpuId, setCurrentGpuId] = useState<string>(gpus.find(g => g.id.includes('3070'))?.id || gpus[0]?.id || '');
  const [targetGpuId, setTargetGpuId] = useState<string>(gpus.find(g => g.id.includes('5080'))?.id || gpus[1]?.id || '');
  const [ratedWattage, setRatedWattage] = useState<number>(750);
  const [psuAgeYears, setPsuAgeYears] = useState<number>(3);
  const [selectedCpuId, setSelectedCpuId] = useState<string>(cpus[0]?.id || '');

  const currentGpu = useMemo(() => gpus.find(g => g.id === currentGpuId), [currentGpuId, gpus]);
  const targetGpu = useMemo(() => gpus.find(g => g.id === targetGpuId), [targetGpuId, gpus]);
  const selectedCpu = useMemo(() => cpus.find(c => c.id === selectedCpuId), [selectedCpuId, cpus]);

  const calculations = useMemo(() => {
    if (!currentGpu || !targetGpu || !selectedCpu) return null;

    const cpuTdp = selectedCpu.tdpSustained || selectedCpu.tdp;

    // Standard additions matching the engine formulas
    const additionsWatts = 10 + 10 + 12 + 15 + 10; // RAM + SSD + FAN + OVERHEAD + COOLING = 57W

    // Current GPU configuration demands
    const currentBaseDraw = cpuTdp + currentGpu.tbp + additionsWatts;
    const currentTransientPeak = Math.round((cpuTdp * 1.20) + (currentGpu.tbp * currentGpu.transientMultiplier) + 32);

    // Target GPU configuration demands
    const targetBaseDraw = cpuTdp + targetGpu.tbp + additionsWatts;
    const targetTransientPeak = Math.round((cpuTdp * 1.20) + (targetGpu.tbp * targetGpu.transientMultiplier) + 32);

    // Power deltas
    const baseDelta = targetBaseDraw - currentBaseDraw;
    const peakDelta = targetTransientPeak - currentTransientPeak;

    // Capacitor aging derating
    const agingLossFactor = psuAgeYears <= 3 ? 0 : (psuAgeYears - 3) * 0.05;
    const effectiveCapacity = Math.round(ratedWattage * (1 - agingLossFactor));

    // Compatibility check logic
    const safetyBuffer = 0.15;
    const isSafe = effectiveCapacity >= targetTransientPeak * (1 + safetyBuffer * 0.5);
    const isBorderline = effectiveCapacity >= targetTransientPeak && effectiveCapacity < targetTransientPeak * (1 + safetyBuffer * 0.5);

    let verdict: 'safe' | 'borderline' | 'upgrade_required' = 'upgrade_required';
    if (isSafe) verdict = 'safe';
    else if (isBorderline) verdict = 'borderline';

    // Connector transitions warnings
    const connectorChanged = currentGpu.connectorType !== targetGpu.connectorType;
    const targetIs12v2x6 = targetGpu.connectorType === '12v-2x6';

    // Recommended wattage sizing
    const rawRecommended = targetTransientPeak * 1.20;
    const standardWattages = [550, 650, 750, 850, 1000, 1200, 1300, 1600];
    const recommendedWattage = standardWattages.find(w => w >= rawRecommended) || 1000;

    // Get premium recommendations
    const recommendedPsus = psus
      .filter(p => p.wattage >= recommendedWattage && p.qualityTier === 'A')
      .slice(0, 3);

    return {
      currentBaseDraw,
      currentTransientPeak,
      targetBaseDraw,
      targetTransientPeak,
      baseDelta,
      peakDelta,
      effectiveCapacity,
      verdict,
      connectorChanged,
      targetIs12v2x6,
      recommendedWattage,
      recommendedPsus
    };
  }, [currentGpuId, targetGpuId, ratedWattage, psuAgeYears, selectedCpuId, cpus, gpus, psus]);

  if (!calculations || !currentGpu || !targetGpu) return null;

  const {
    currentBaseDraw,
    currentTransientPeak,
    targetBaseDraw,
    targetTransientPeak,
    baseDelta,
    peakDelta,
    effectiveCapacity,
    verdict,
    connectorChanged,
    targetIs12v2x6,
    recommendedWattage,
    recommendedPsus
  } = calculations;

  const getVerdictClass = (v: string) => {
    if (v === 'safe') return 'badge badge-safe';
    if (v === 'borderline') return 'badge badge-warning';
    return 'badge badge-danger';
  };

  const getVerdictLabel = (v: 'safe' | 'borderline' | 'upgrade_required') => {
    return gut.verdictLabels[v] || v;
  };

  return (
    <div style="display: grid; grid-template-columns: 1fr; gap: 2rem;">
      {/* Inputs Deck */}
      <div class="card" style="padding: 1.5rem; background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); display: flex; flex-direction: column; gap: 1.25rem;">
        <h3 style="font-size: 1rem; font-weight: 700; margin: 0; color: var(--text-primary); border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;">
          {gut.paramsHeading}
        </h3>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.25rem;">
          <div>
            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.5rem;">
              {gut.currentGpuLabel}
            </label>
            <select
              value={currentGpuId}
              onChange={(e) => setCurrentGpuId((e.target as HTMLSelectElement).value)}
              style="width: 100%; min-height: 40px; background: var(--bg-deep); border: 1px solid var(--border-subtle); color: var(--text-primary); border-radius: var(--radius-md); padding: 0 0.5rem; font-size: 0.875rem;"
            >
              {gpus.map(g => (
                <option value={g.id}>{g.name} ({g.tbp}W TBP)</option>
              ))}
            </select>
          </div>

          <div>
            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.5rem;">
              {gut.targetGpuLabel}
            </label>
            <select
              value={targetGpuId}
              onChange={(e) => setTargetGpuId((e.target as HTMLSelectElement).value)}
              style="width: 100%; min-height: 40px; background: var(--bg-deep); border: 1px solid var(--border-subtle); color: var(--text-primary); border-radius: var(--radius-md); padding: 0 0.5rem; font-size: 0.875rem;"
            >
              {gpus.map(g => (
                <option value={g.id}>{g.name} ({g.tbp}W TBP)</option>
              ))}
            </select>
          </div>

          <div>
            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.5rem;">
              {gut.currentWattageLabel}
            </label>
            <select
              value={ratedWattage}
              onChange={(e) => setRatedWattage(Number((e.target as HTMLSelectElement).value))}
              style="width: 100%; min-height: 40px; background: var(--bg-deep); border: 1px solid var(--border-subtle); color: var(--text-primary); border-radius: var(--radius-md); padding: 0 0.5rem; font-size: 0.875rem;"
            >
              {[450, 500, 550, 600, 650, 700, 750, 800, 850, 1000, 1200, 1300, 1500, 1600].map(w => (
                <option value={w}>{w}W</option>
              ))}
            </select>
          </div>

          <div>
            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.5rem; display: flex; justify-content: space-between;">
              <span>{gut.psuAgeLabel}</span>
              <span style="font-family: var(--font-mono); color: var(--color-accent-cyan);">{psuAgeYears} {gut.yearsSuffix}</span>
            </label>
            <input
              type="range"
              min="0"
              max="15"
              step="1"
              value={psuAgeYears}
              onInput={(e) => setPsuAgeYears(Number((e.target as HTMLInputElement).value))}
              style="width: 100%;"
            />
          </div>

          <div style="grid-column: span 1;">
            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.5rem;">
              {gut.systemCpuLabel}
            </label>
            <select
              value={selectedCpuId}
              onChange={(e) => setSelectedCpuId((e.target as HTMLSelectElement).value)}
              style="width: 100%; min-height: 40px; background: var(--bg-deep); border: 1px solid var(--border-subtle); color: var(--text-primary); border-radius: var(--radius-md); padding: 0 0.5rem; font-size: 0.875rem;"
            >
              {cpus.map(c => (
                <option value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Sizing & Compatibility Verdict */}
      <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem; align-items: start;">
        {/* Main Verdict Card */}
        <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); position: relative; overflow: hidden;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem; margin-bottom: 1rem;">
            <span style="font-size: 0.875rem; font-weight: 700; color: var(--color-text-secondary); text-transform: uppercase; letter-spacing: 0.05em;">{gut.verdictHeading}</span>
            <span class={getVerdictClass(verdict)}>{getVerdictLabel(verdict)}</span>
          </div>

          <div style="font-size: 1rem; line-height: 1.6; color: var(--color-text-primary);">
            <p>
              {gut.getVerdictText(verdict, ratedWattage, targetGpu.name, targetTransientPeak, effectiveCapacity, recommendedWattage)}
            </p>
          </div>

          {/* Connector changes warning */}
          {connectorChanged && targetIs12v2x6 && (
            <div style="margin-top: 1rem; padding: 0.75rem 1rem; background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: var(--radius-md); font-size: 0.875rem; color: #f59e0b;">
              <strong>⚠ {gut.connectorAlert(currentGpu.name, targetGpu.name, currentGpu.connectorType.toUpperCase(), targetGpu.connectorType.toUpperCase())}</strong>
            </div>
          )}
        </div>

        {/* Delta Comparison Table */}
        <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg);">
          <h3 style="font-size: 1rem; font-weight: 700; margin: 0 0 1rem; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.05em;">
            {gut.comparisonHeading}
          </h3>
          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.875rem;">
              <thead>
                <tr style="border-bottom: 2px solid var(--border-subtle); color: var(--text-secondary);">
                  <th style="padding: 0.5rem 0.75rem;">{gut.tableHeaders.metric}</th>
                  <th style="padding: 0.5rem 0.75rem;">{gut.tableHeaders.current(currentGpu.name)}</th>
                  <th style="padding: 0.5rem 0.75rem;">{gut.tableHeaders.upgraded(targetGpu.name)}</th>
                  <th style="padding: 0.5rem 0.75rem;">{gut.tableHeaders.delta}</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid var(--border-subtle);">
                  <td style="padding: 0.75rem; font-weight: 700;">{gut.metrics.gpuTbp}</td>
                  <td style="padding: 0.75rem;">{currentGpu.tbp}W</td>
                  <td style="padding: 0.75rem;">{targetGpu.tbp}W</td>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: (targetGpu.tbp - currentGpu.tbp) >= 0 ? '#ef4444' : '#10b981' }}>
                    {(targetGpu.tbp - currentGpu.tbp) >= 0 ? `+${targetGpu.tbp - currentGpu.tbp}` : targetGpu.tbp - currentGpu.tbp}W
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-subtle);">
                  <td style="padding: 0.75rem; font-weight: 700;">{gut.metrics.sustainedDraw}</td>
                  <td style="padding: 0.75rem;">{currentBaseDraw}W</td>
                  <td style="padding: 0.75rem;">{targetBaseDraw}W</td>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: baseDelta >= 0 ? '#ef4444' : '#10b981' }}>
                    {baseDelta >= 0 ? `+${baseDelta}` : baseDelta}W
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-subtle);">
                  <td style="padding: 0.75rem; font-weight: 700;">{gut.metrics.transientPeak}</td>
                  <td style="padding: 0.75rem; color: var(--color-warning-text);">{currentTransientPeak}W</td>
                  <td style="padding: 0.75rem; color: var(--color-warning-text);">{targetTransientPeak}W</td>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: peakDelta >= 0 ? '#ef4444' : '#10b981' }}>
                    {peakDelta >= 0 ? `+${peakDelta}` : peakDelta}W
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-subtle);">
                  <td style="padding: 0.75rem; font-weight: 700;">{gut.metrics.connector}</td>
                  <td style="padding: 0.75rem;">{currentGpu.connectorType.toUpperCase()}</td>
                  <td style="padding: 0.75rem;">{targetGpu.connectorType.toUpperCase()}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: connectorChanged ? '#f59e0b' : 'inherit' }}>
                    {connectorChanged ? gut.connectorDifferent : gut.connectorSame}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      {verdict !== 'safe' && recommendedPsus.length > 0 && (
        <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg);">
          <h3 style="font-size: 1rem; font-weight: 700; margin: 0 0 1rem; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.05em;">
            {gut.recommendedPsusHeading(recommendedWattage)}
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem;">
            {recommendedPsus.map(p => (
              <div key={p.id} class="card card-accent" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; border-left: 3px solid var(--color-safe);">
                <div>
                  <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-text-tertiary); text-transform: uppercase;">{p.brand}</span>
                  <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-primary); margin: 0.25rem 0 0.5rem;">{p.name}</h4>
                  <div style="display: flex; gap: 0.25rem; flex-wrap: wrap;">
                    <span class="badge badge-safe" style="font-size: 0.65rem; padding: 2px 6px;">Tier A</span>
                    <span style="font-size: 0.75rem; background: var(--color-surface-raised); border: 1px solid var(--color-border-subtle); padding: 1px 6px; border-radius: 4px; color: var(--color-text-secondary);">{p.wattage}W</span>
                    <span style="font-size: 0.75rem; background: var(--color-surface-raised); border: 1px solid var(--color-border-subtle); padding: 1px 6px; border-radius: 4px; color: var(--color-text-secondary);">ATX {p.atxVersion}</span>
                  </div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.25rem;">
                  <span style="font-size: 1.15rem; font-weight: 800; color: var(--color-accent-cyan); font-family: var(--font-mono);">{formatCurrency(p.price, lang)}</span>
                  <a href={`/psu/${p.id}`} class="btn btn-secondary btn-sm" style="font-size: 0.75rem; padding: 6px 12px; min-height: 32px;">{gut.viewSpecs}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
