import { h } from 'preact';
import type { PsuHealthScore } from '../../types/components';
import type { Locale } from '../../i18n/locales';

interface Props {
  psuAgeYears: number;
  psuWattage: number;
  health: PsuHealthScore;
  lang?: Locale;
}

export default function PsuHealthHUD({ psuAgeYears, psuWattage, health, lang = 'en' }: Props) {
  const getRatingColor = (rating: string) => {
    if (rating === 'good') return 'var(--color-safe)';
    if (rating === 'warning') return 'var(--color-warning)';
    return 'var(--color-danger)';
  };

  const getRatingBg = (rating: string) => {
    if (rating === 'good') return 'var(--color-safe-bg)';
    if (rating === 'warning') return 'var(--color-warning-bg)';
    return 'var(--color-danger-bg)';
  };

  const ratingColor = getRatingColor(health.rating);
  const ratingBg = getRatingBg(health.rating);

  // SVG Gauge calculations
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (health.score / 100) * circumference;

  const title = lang === 'de' ? 'Netzteil-Zustand & Alterung' : lang === 'es' ? 'Estado de Salud de la Fuente' : lang === 'fr' ? 'État de Santé Alimentation' : lang === 'ja' ? '電源ユニット健全性ステータス' : lang === 'zh' ? '电源健康度与老化状态' : 'PSU Health Status';
  const scoreLabel = lang === 'de' ? 'Punkte' : lang === 'es' ? 'Puntos' : lang === 'fr' ? 'Score' : lang === 'ja' ? 'スコア' : lang === 'zh' ? '健康评分' : 'Score';
  const ratedLabel = lang === 'de' ? 'Nennleistung:' : lang === 'es' ? 'Potencia Nominal:' : lang === 'fr' ? 'Puissance Nominale :' : lang === 'ja' ? '公称定格出力:' : lang === 'zh' ? '标称额定功率:' : 'Rated Output:';
  const effectiveLabel = lang === 'de' ? 'Effektive Kapazität:' : lang === 'es' ? 'Capacidad Efectiva:' : lang === 'fr' ? 'Capacité Réelle :' : lang === 'ja' ? '実効出力容量:' : lang === 'zh' ? '老化实效功率:' : 'Effective Capacity:';
  const degradationLabel = lang === 'de' ? 'Kapazitätsverlust:' : lang === 'es' ? 'Degradación:' : lang === 'fr' ? 'Dégradation :' : lang === 'ja' ? '経年劣化損耗:' : lang === 'zh' ? '老化容量损耗:' : 'Degradation:';

  const ratingLabel = (rating: string) => {
    if (rating === 'good') return lang === 'de' ? 'Gut' : lang === 'es' ? 'Óptimo' : lang === 'fr' ? 'Optimal' : lang === 'ja' ? '良好' : lang === 'zh' ? '优良' : 'Good';
    if (rating === 'warning') return lang === 'de' ? 'Warnung' : lang === 'es' ? 'Atención' : lang === 'fr' ? 'Attention' : lang === 'ja' ? '要警戒' : lang === 'zh' ? '老化预警' : 'Warning';
    return lang === 'de' ? 'Kritisch' : lang === 'es' ? 'Crítico' : lang === 'fr' ? 'Critique' : lang === 'ja' ? '危険' : lang === 'zh' ? '严重老化' : 'Critical';
  };

  return (
    <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; gap: 1rem; border: 1px solid var(--border-subtle); background: var(--bg-secondary); border-radius: var(--radius-lg);">
      <header style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.5rem;">
        <h3 style="font-size: 0.875rem; font-weight: 700; margin: 0; display: flex; align-items: center; gap: 6px; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.05em;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style={`color: ${ratingColor}`}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          {title}
        </h3>
        <span class="badge" style={`background: ${ratingBg}; color: ${ratingColor}; font-weight: 700; font-size: 0.65rem; text-transform: uppercase; padding: 2px 6px; border-radius: 4px;`}>
          {ratingLabel(health.rating)}
        </span>
      </header>

      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        {/* Radial gauge */}
        <div style="position: relative; width: 76px; height: 76px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin: 0 auto;">
          <svg width="76" height="76" viewBox="0 0 90 90" style="transform: rotate(-90deg);">
            {/* Background circle */}
            <circle cx="45" cy="45" r={radius} fill="none" stroke="var(--color-border)" stroke-width="8" />
            {/* Colored arc */}
            <circle
              cx="45"
              cy="45"
              r={radius}
              fill="none"
              stroke={ratingColor}
              stroke-width="8"
              stroke-dasharray={circumference}
              stroke-dashoffset={strokeDashoffset}
              stroke-linecap="round"
              style="transition: stroke-dashoffset 0.35s ease;"
            />
          </svg>
          <div style="position: absolute; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
            <span style="font-size: 1.15rem; font-weight: 800; font-family: var(--font-mono); color: var(--text-primary); line-height: 1;">
              {health.score}
            </span>
            <span style="font-size: 0.55rem; color: var(--text-tertiary); text-transform: uppercase; font-weight: 700; margin-top: 1px; letter-spacing: 0.05em;">
              {scoreLabel}
            </span>
          </div>
        </div>

        {/* Wattage capacity card */}
        <div style="flex: 1; min-width: 130px; display: flex; flex-direction: column; gap: 0.4rem;">
          <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-secondary);">
            <span>{ratedLabel}</span>
            <strong style="color: var(--text-primary); font-family: var(--font-mono);">{psuWattage}W</strong>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-secondary);">
            <span>{effectiveLabel}</span>
            <strong style={`color: ${psuAgeYears > 3 ? 'var(--color-warning)' : 'var(--text-primary)'}; font-family: var(--font-mono);`}>
              {health.effectiveCapacity}W
            </strong>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-secondary);">
            <span>{degradationLabel}</span>
            <strong style={`color: ${health.degradationPercent > 0 ? ratingColor : 'var(--text-tertiary)'}; font-family: var(--font-mono);`}>
              -{health.degradationPercent}%
            </strong>
          </div>
        </div>
      </div>

      {/* Narrative */}
      {health.narrative && (
        <div style="padding: 0.5rem 0.75rem; background: var(--color-surface-raised); border-left: 2px solid var(--border-accent); border-radius: var(--radius-sm); font-size: 0.75rem; color: var(--text-secondary); line-height: 1.45;">
          {health.narrative}
        </div>
      )}
    </div>
  );
}
