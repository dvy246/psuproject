/** @jsxImportSource preact */
// ============================================================
// PSUCheck — Diagnostics HUD
// Real-time analysis panel. Used in:
//   - Desktop: sticky right-column sidebar
//   - Mobile: bottom-sheet drawer
//
// Contains: Power Gauge Arc, Verdict Badge, Waveform Preview,
//           Per-Rail Table, Cable Audit, TCO summary CTA
// ============================================================

import type { CpuIndex, GpuIndex, RamConfig, StorageConfig, CoolingConfig, PsuIndex, PsuAnalysis, OcConfig } from '../../types/components';
import { runFullPsuAnalysis } from '../../lib/psu';
import { WaveformVisualizer } from '../charts/WaveformVisualizer';
import { PowerGaugeArc } from '../charts/PowerGaugeArc';

interface Props {
  cpu:               CpuIndex | null;
  gpu:               GpuIndex | null;
  ram:               RamConfig | null;
  storage:           StorageConfig[];
  cooling:           CoolingConfig | null;
  psu:               PsuIndex | null;
  fans:              number;
  psuAgeYears?:      number; // P1: capacitor aging — 0 = new PSU
  cpuOcPercent?:     number; // 0–30
  gpuOcPercent?:     number; // 0–30
  safetyBufferPercent?: number; // 0–30
}

export function DiagnosticsHUD({ cpu, gpu, ram, storage, cooling, psu, fans, psuAgeYears = 0, cpuOcPercent = 0, gpuOcPercent = 0, safetyBufferPercent = 10 }: Props) {
  // Run analysis only when we have at least a GPU
  const hasBuild = !!(cpu || gpu);
  const psuWattage = psu?.wattage ?? 850;
  const atxVersion = psu?.atxVersion ?? '3.1';
  const ocActive = cpuOcPercent > 0 || gpuOcPercent > 0;
  const ocConfig: OcConfig | undefined = ocActive ? { cpuOcPercent, gpuOcPercent } : undefined;

  const analysis: PsuAnalysis | null = hasBuild
    ? runFullPsuAnalysis(
        { cpu, gpu, ram: ram ?? null, storage, cooling: cooling ?? null, fans, ocConfig },
        psuWattage,
        atxVersion,
        safetyBufferPercent / 100,
        psuAgeYears
      )
    : null;

  // When PSU age > 3 years, compute effective derated wattage for display
  // Formula mirrors psu.ts: agingFactor = 1 + (years - 3) * 0.05
  const effectiveWattage = psuAgeYears > 3
    ? Math.round(psuWattage / (1 + (psuAgeYears - 3) * 0.05))
    : null;

  const verdict = analysis?.verdict ?? null;
  const verdictColor = !hasBuild ? 'empty' : verdict === 'yes' ? 'safe' : verdict === 'borderline' ? 'warning' : 'danger';
  const verdictLabel = !hasBuild ? '' : verdict === 'yes' ? '✓ SAFE' : verdict === 'borderline' ? '⚠ BORDERLINE' : '✕ DANGER';

  return (
    <div class="hud-panel" role="region" aria-label="PSU Diagnostics">

      {/* ── Section: Verdict + Confidence ── */}
      <div class="hud-section hud-section--verdict">
        <div class="hud-label" id="hud-verdict-label">PSU Verdict</div>
        <div
          class={`verdict-display verdict-${verdictColor}`}
          role="status"
          aria-live="polite"
          aria-labelledby="hud-verdict-label"
          aria-atomic="true"
        >
          {hasBuild ? (
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; width:100%;">
              <span class={`verdict-badge badge-${verdictColor}`}>
                {verdictLabel}
              </span>
              <div style="display:flex; align-items:center; gap:6px;">
                {ocActive && (
                  <span class="badge-warning" style="font-size:9px; padding:1px 5px; border-radius:3px;">
                    ⚡ OC: {cpuOcPercent > 0 ? `CPU+${cpuOcPercent}%` : ''}{cpuOcPercent > 0 && gpuOcPercent > 0 ? ' ' : ''}{gpuOcPercent > 0 ? `GPU+${gpuOcPercent}%` : ''}
                  </span>
                )}
                {analysis && (
                  <span class="verdict-confidence tabular" aria-label={`Confidence: ${analysis.confidenceScore}%`}>
                    {analysis.confidenceScore}% confidence
                  </span>
                )}
              </div>
            </div>
          ) : (
            <span class="verdict-empty">Select components to analyze</span>
          )}
        </div>
      </div>

      {/* ── Section: Power Gauge Arc ── */}
      <div class="hud-section" aria-label="Recommended PSU wattage gauge">
        <div class="hud-label">Recommended PSU</div>
        {safetyBufferPercent > 0 && (
          <div style="font-size:0.7rem;color:var(--color-text-tertiary);margin-bottom:0.4rem;">
            Safety buffer: +{safetyBufferPercent}%
          </div>
        )}
        {/* P1: Show degraded effective wattage when age > 3 */}
        {effectiveWattage !== null && (
          <div
            class="hud-note"
            style="margin-bottom:0.5rem;padding:6px 10px;background:var(--color-warning-bg);border:1px solid var(--color-warning-border);border-radius:6px;"
            aria-live="polite"
          >
            <strong style="color:var(--color-warning);">⚠ Age derated:</strong>{' '}
            <span class="tabular" style="color:var(--color-warning);">{psuWattage}W rated → ~{effectiveWattage}W effective</span>
            <span style="font-size:0.7rem;color:var(--color-text-tertiary);display:block;margin-top:2px;">
              Capacitor aging: {psuAgeYears}yr PSU loses ~{Math.round((1 - effectiveWattage/psuWattage)*100)}% capacity
            </span>
          </div>
        )}
        <div class="gauge-wrap">
          <PowerGaugeArc
            recommendedWattage={analysis?.recommendedWattage ?? 0}
            psuRated={psuWattage}
            verdict={verdictColor as 'safe' | 'warning' | 'danger'}
            aria-label={analysis ? `Recommended ${analysis.recommendedWattage}W, rated ${psuWattage}W${effectiveWattage ? `, effective ${effectiveWattage}W after aging` : ''}` : 'No data'}
          />
        </div>
      </div>

      {/* ── Section: Key Metrics Row ── */}
      {analysis && (
        <div class="hud-section hud-metrics-grid" role="list" aria-label="Power metrics">
          <div class="hud-metric" role="listitem">
            <span class="hud-metric-label">Base Draw</span>
            <span class="hud-metric-value tabular" aria-label={`Base draw: ${analysis.baseDraw} watts`}>
              {analysis.baseDraw}<span class="hud-metric-unit">W</span>
            </span>
          </div>
          <div class="hud-metric" role="listitem">
            <span class="hud-metric-label">Transient Peak</span>
            <span class={`hud-metric-value tabular hud-metric-value--${verdictColor}`} aria-label={`Transient peak: ${analysis.transientPeak} watts`}>
              {analysis.transientPeak}<span class="hud-metric-unit">W</span>
            </span>
          </div>
          <div class="hud-metric" role="listitem">
            <span class="hud-metric-label">Headroom</span>
            <span class={`hud-metric-value tabular ${analysis.headroom >= 0 ? '' : 'hud-metric-value--danger'}`} aria-label={`Headroom: ${analysis.headroom} watts`}>
              {analysis.headroom >= 0 ? '+' : ''}{analysis.headroom}<span class="hud-metric-unit">W</span>
            </span>
          </div>
          <div class="hud-metric" role="listitem">
            <span class="hud-metric-label">Binding</span>
            <span class="hud-metric-value" style="text-transform:capitalize;" aria-label={`Binding constraint: ${analysis.bindingConstraint}`}>
              {analysis.bindingConstraint}
            </span>
          </div>
        </div>
      )}

      {/* ── Section: Waveform Visualizer ── */}
      {analysis && (
        <div class="hud-section" aria-label="Power transient waveform visualization">
          <div class="hud-label">Transient Waveform</div>
          <WaveformVisualizer
            baseDraw={analysis.baseDraw}
            transientPeak={analysis.transientPeak}
            psuRating={psuWattage}
            isDanger={verdict !== 'yes'}
          />
        </div>
      )}

      {/* ── Section: ATX Compliance ── */}
      {analysis && (
        <div class="hud-section">
          <div class="hud-label">ATX Compliance</div>
          <div class={`atx-badge ${analysis.atxCompliance.canHandleTransient ? 'badge-safe' : 'badge-danger'}`}>
            {analysis.atxCompliance.canHandleTransient ? '✓' : '✕'} ATX {analysis.atxCompliance.atxVersion}
            {' · '}
            {analysis.atxCompliance.transientHeadroomPercent}% transient headroom
          </div>
          <p class="hud-note">{analysis.atxCompliance.recommendation}</p>
        </div>
      )}

      {/* ── Section: Cable Audit (CLS-safe fixed min-height) ── */}
      <div
        class={`hud-section cable-alert ${analysis?.cableAudit.severity !== 'safe' ? 'visible' : ''}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        aria-label="Cable safety audit"
      >
        {analysis?.cableAudit.severity !== 'safe' ? (
          <>
            <div class="cable-alert-header">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2L1 21h22L12 2zm0 4l7.5 13h-15L12 6zm-1 5v4h2v-4h-2zm0 6v2h2v-2h-2z"/></svg>
              <strong>CABLE SAFETY ALERT</strong>
            </div>
            <p class="cable-alert-msg">{analysis?.cableAudit.message}</p>
            {!analysis?.cableAudit.daisyChainSafe && (
              <p class="cable-alert-rule">
                <strong>RULE:</strong> Each connector must run as a dedicated cable directly from PSU. Daisy-chaining is unsafe at this power level.
              </p>
            )}
          </>
        ) : (
          <span class="cable-alert-safe badge-safe">✓ Cable configuration safe</span>
        )}
      </div>

      {/* ── Section: Per-Rail Table ── */}
      {analysis && (
        <div class="hud-section">
          <div class="hud-label">Per-Rail Analysis</div>
          <table class="rail-table" aria-label="Per-rail current analysis">
            <thead>
              <tr>
                <th scope="col">Rail</th>
                <th scope="col" class="text-right">Amps</th>
                <th scope="col" class="text-right">Watts</th>
                <th scope="col" class="text-right">% of load</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">+12V</th>
                <td class="text-right tabular">{analysis.perRail.v12Amps}A</td>
                <td class="text-right tabular">{analysis.perRail.v12Watts}W</td>
                <td class="text-right tabular">90%</td>
              </tr>
              <tr>
                <th scope="row">+5V</th>
                <td class="text-right tabular">{analysis.perRail.v5Amps}A</td>
                <td class="text-right tabular">{analysis.perRail.v5Watts}W</td>
                <td class="text-right tabular">5%</td>
              </tr>
              <tr>
                <th scope="row">+3.3V</th>
                <td class="text-right tabular">{analysis.perRail.v3_3Amps}A</td>
                <td class="text-right tabular">{analysis.perRail.v3_3Watts}W</td>
                <td class="text-right tabular">5%</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* ── CTA: TCO Comparison ── */}
      <div class="hud-section">
        <a href="/psu-calculator#tco" class="hud-cta-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          View 5-Year Electricity Cost Comparison →
        </a>
      </div>

      {/* ── Empty state ── */}
      {!hasBuild && (
        <div class="hud-empty" role="status">
          <div class="hud-empty-icon" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </div>
          <p class="hud-empty-text">Select a CPU or GPU to begin power analysis</p>
        </div>
      )}
    </div>
  );
}
