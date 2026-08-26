/** @jsxImportSource preact */
// ============================================================
// PSUCheck — Diagnostics HUD (i18n Enabled)
// Real-time analysis panel with full multi-language telemetry.
// ============================================================

import type { CpuIndex, GpuIndex, RamConfig, StorageConfig, CoolingConfig, PsuIndex, PsuAnalysis, OcConfig } from '../../types/components';
import { runFullPsuAnalysis } from '../../lib/psu';
import { WaveformVisualizer } from '../charts/WaveformVisualizer';
import { PowerGaugeArc } from '../charts/PowerGaugeArc';
import { useTranslations, l, type Locale } from '../../i18n';

interface Props {
  cpu:               CpuIndex | null;
  gpu:               GpuIndex | null;
  ram:               RamConfig | null;
  storage:           StorageConfig[];
  cooling:           CoolingConfig | null;
  psu:               PsuIndex | null;
  fans:              number;
  psuAgeYears?:      number; // capacitor aging — 0 = new PSU
  cpuOcPercent?:     number; // 0–30
  gpuOcPercent?:     number; // 0–30
  safetyBufferPercent?: number; // 0–30
  lang?:             Locale;
}

export function DiagnosticsHUD({
  cpu,
  gpu,
  ram,
  storage,
  cooling,
  psu,
  fans,
  psuAgeYears = 0,
  cpuOcPercent = 0,
  gpuOcPercent = 0,
  safetyBufferPercent = 10,
  lang = 'en',
}: Props) {
  const t = useTranslations(lang);
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
  const effectiveWattage = psuAgeYears > 3
    ? Math.round(psuWattage / (1 + (psuAgeYears - 3) * 0.05))
    : null;

  const verdict = analysis?.verdict ?? null;
  const verdictColor = !hasBuild ? 'empty' : verdict === 'yes' ? 'safe' : verdict === 'borderline' ? 'warning' : 'danger';
  const verdictLabel = !hasBuild
    ? ''
    : verdict === 'yes'
    ? t.verdicts.safeBadge
    : verdict === 'borderline'
    ? t.verdicts.borderlineBadge
    : t.verdicts.dangerBadge;

  const bindingLabel = lang === 'de' ? 'Engpass' : lang === 'es' ? 'Limitante' : lang === 'fr' ? 'Facteur Limitant' : lang === 'ja' ? '律速要因' : lang === 'zh' ? '主导瓶颈' : 'Binding';
  const cableAlertTitle = lang === 'de' ? 'KABELSICHERHEITS-WARNUNG' : lang === 'es' ? 'ALERTA DE SEGURIDAD DE CABLE' : lang === 'fr' ? 'ALERTE SÉCURITÉ CÂBLAGE' : lang === 'ja' ? '配線・コネクタ安全警告' : lang === 'zh' ? '供电线材安全警报' : 'CABLE SAFETY ALERT';
  const cableRuleText = lang === 'de' ? 'REGEL: Jeder Anschluss muss über ein separates Kabel direkt vom Netzteil versorgt werden (kein Daisy-Chain).' : lang === 'es' ? 'REGLA: Cada conector debe alimentarse con un cable dedicado directo desde la fuente (sin conexión en cadena).' : lang === 'fr' ? 'RÈGLE : Chaque connecteur doit être alimenté par un câble dédié direct depuis le bloc (pas de pontage).' : lang === 'ja' ? 'ルール: 各コネクタは電源から独立した個別ケーブルで接続してください（数珠つなぎ禁止）。' : lang === 'zh' ? '安全规则: 每个供电接口必须使用来自电源的原生独立线材直连（严禁一分二并联）。' : 'RULE: Each connector must run as a dedicated cable directly from PSU.';

  return (
    <div class="hud-panel" role="region" aria-label={t.calculators.hudTitle}>
      {/* ── Section: Verdict + Confidence ── */}
      <div class="hud-section hud-section--verdict">
        <div class="hud-label" id="hud-verdict-label">{t.calculators.hudTitle}</div>
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
                    {analysis.confidenceScore}{t.verdicts.confidenceScore}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <span class="verdict-empty">{t.verdicts.selectPrompt}</span>
          )}
        </div>
      </div>

      {/* ── Section: Power Gauge Arc ── */}
      <div class="hud-section" aria-label={t.calculators.recommendedWattage}>
        <div class="hud-label">{t.calculators.recommendedWattage}</div>
        {safetyBufferPercent > 0 && (
          <div style="font-size:0.7rem;color:var(--color-text-tertiary);margin-bottom:0.4rem;">
            {t.calculators.safetyBuffer}: +{safetyBufferPercent}%
          </div>
        )}
        {effectiveWattage !== null && (
          <div
            class="hud-note"
            style="margin-bottom:0.5rem;padding:6px 10px;background:var(--color-warning-bg);border:1px solid var(--color-warning-border);border-radius:6px;"
            aria-live="polite"
          >
            <strong style="color:var(--color-warning);">⚠ {t.calculators.capacitorAging}:</strong>{' '}
            <span class="tabular" style="color:var(--color-warning);">{psuWattage}W → ~{effectiveWattage}W</span>
            <span style="font-size:0.7rem;color:var(--color-text-tertiary);display:block;margin-top:2px;">
              {psuAgeYears} yr: ~{Math.round((1 - effectiveWattage/psuWattage)*100)}% derate
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
            <span class="hud-metric-label">{t.calculators.continuousLoad}</span>
            <span class="hud-metric-value tabular" aria-label={`Base draw: ${analysis.baseDraw} watts`}>
              {analysis.baseDraw}<span class="hud-metric-unit">W</span>
            </span>
          </div>
          <div class="hud-metric" role="listitem">
            <span class="hud-metric-label">{t.calculators.transientSpike}</span>
            <span class={`hud-metric-value tabular hud-metric-value--${verdictColor}`} aria-label={`Transient peak: ${analysis.transientPeak} watts`}>
              {analysis.transientPeak}<span class="hud-metric-unit">W</span>
            </span>
          </div>
          <div class="hud-metric" role="listitem">
            <span class="hud-metric-label">{t.calculators.safetyBuffer}</span>
            <span class={`hud-metric-value tabular ${analysis.headroom >= 0 ? '' : 'hud-metric-value--danger'}`} aria-label={`Headroom: ${analysis.headroom} watts`}>
              {analysis.headroom >= 0 ? '+' : ''}{analysis.headroom}<span class="hud-metric-unit">W</span>
            </span>
          </div>
          <div class="hud-metric" role="listitem">
            <span class="hud-metric-label">{bindingLabel}</span>
            <span class="hud-metric-value" style="text-transform:capitalize;" aria-label={`Binding constraint: ${analysis.bindingConstraint}`}>
              {analysis.bindingConstraint}
            </span>
          </div>
        </div>
      )}

      {/* ── Section: Waveform Visualizer ── */}
      {analysis && (
        <div class="hud-section" aria-label="Power transient waveform visualization">
          <div class="hud-label">{t.calculators.transientLabel}</div>
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
          <div class="hud-label">{t.calculators.atxStandard}</div>
          <div class={`atx-badge ${analysis.atxCompliance.canHandleTransient ? 'badge-safe' : 'badge-danger'}`}>
            {analysis.atxCompliance.canHandleTransient ? '✓' : '✕'} ATX {analysis.atxCompliance.atxVersion}
            {' · '}
            {analysis.atxCompliance.transientHeadroomPercent}% headroom
          </div>
          <p class="hud-note">{analysis.atxCompliance.recommendation}</p>
        </div>
      )}

      {/* ── Section: Cable Audit ── */}
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
              <strong>{cableAlertTitle}</strong>
            </div>
            <p class="cable-alert-msg">{analysis?.cableAudit.message}</p>
            {!analysis?.cableAudit.daisyChainSafe && (
              <p class="cable-alert-rule">
                <strong>{cableRuleText}</strong>
              </p>
            )}
          </>
        ) : (
          <span class="cable-alert-safe badge-safe">✓ {t.calculators.native12v2x6}</span>
        )}
      </div>

      {/* ── Section: Per-Rail Table ── */}
      {analysis && (
        <div class="hud-section">
          <div class="hud-label">{t.calculators.rail12v}</div>
          <div class="rail-meters-list" role="list" aria-label="Rail power distribution">
            <div class="rail-meter-row" role="listitem">
              <div class="rail-meter-header">
                <span class="rail-badge rail-12v">+12V</span>
                <span class="rail-meter-val tabular">{analysis.perRail.v12Watts}W · {analysis.perRail.v12Amps}A</span>
              </div>
              <div class="rail-bar-track" aria-hidden="true">
                <div class="rail-bar-fill rail-bar-fill--12v" style={{ width: '90%' }} />
              </div>
            </div>

            <div class="rail-meter-row" role="listitem">
              <div class="rail-meter-header">
                <span class="rail-badge rail-5v">+5V</span>
                <span class="rail-meter-val tabular">{analysis.perRail.v5Watts}W · {analysis.perRail.v5Amps}A</span>
              </div>
              <div class="rail-bar-track" aria-hidden="true">
                <div class="rail-bar-fill rail-bar-fill--5v" style={{ width: '5%' }} />
              </div>
            </div>

            <div class="rail-meter-row" role="listitem">
              <div class="rail-meter-header">
                <span class="rail-badge rail-3v">+3.3V</span>
                <span class="rail-meter-val tabular">{analysis.perRail.v3_3Watts}W · {analysis.perRail.v3_3Amps}A</span>
              </div>
              <div class="rail-bar-track" aria-hidden="true">
                <div class="rail-bar-fill rail-bar-fill--3v" style={{ width: '5%' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CTA: TCO Comparison ── */}
      <div class="hud-section">
        <a href={l('/psu-calculator#tco', lang)} class="hud-cta-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          {t.tco.title} →
        </a>
      </div>

      {/* ── Empty state ── */}
      {!hasBuild && (
        <div class="hud-empty" role="status">
          <div class="hud-empty-icon" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </div>
          <p class="hud-empty-text">{t.calculators.hudEmpty}</p>
        </div>
      )}
    </div>
  );
}
