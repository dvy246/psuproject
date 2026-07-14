import { h } from 'preact';
import type { PsuHealthScore } from '../../types/components';

interface Props {
  psuAgeYears: number;
  psuWattage: number;
  health: PsuHealthScore;
}

export default function PsuHealthHUD({ psuAgeYears, psuWattage, health }: Props) {
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

  return (
    <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; gap: 1rem; border: 1px solid var(--border-subtle); background: var(--bg-secondary); border-radius: var(--radius-lg);">
      <header style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.5rem;">
        <h3 style="font-size: 0.875rem; font-weight: 700; margin: 0; display: flex; align-items: center; gap: 6px; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.05em;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style={`color: ${ratingColor}`}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          PSU Health Status
        </h3>
        <span class="badge" style={`background: ${ratingBg}; color: ${ratingColor}; font-weight: 700; font-size: 0.65rem; text-transform: uppercase; padding: 2px 6px; border-radius: 4px;`}>
          {health.rating}
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
              Score
            </span>
          </div>
        </div>

        {/* Wattage capacity card */}
        <div style="flex: 1; min-width: 130px; display: flex; flex-direction: column; gap: 0.4rem;">
          <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-secondary);">
            <span>Rated Output:</span>
            <strong style="color: var(--text-primary); font-family: var(--font-mono);">{psuWattage}W</strong>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-secondary);">
            <span>Effective Capacity:</span>
            <strong style={`color: ${psuAgeYears > 3 ? 'var(--color-warning)' : 'var(--text-primary)'}; font-family: var(--font-mono);`}>
              {health.effectiveCapacity}W
            </strong>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-secondary);">
            <span>Degradation:</span>
            <strong style={`color: ${health.degradationPercent > 0 ? ratingColor : 'var(--text-tertiary)'}; font-family: var(--font-mono);`}>
              -{health.degradationPercent}%
            </strong>
          </div>
        </div>
      </div>

      {/* Narrative */}
      <div style="padding: 0.5rem 0.75rem; background: var(--color-surface-raised); border-left: 2px solid var(--border-accent); border-radius: var(--radius-sm); font-size: 0.75rem; color: var(--text-secondary); line-height: 1.45;">
        {health.narrative}
      </div>

      {/* Timeline tracker */}
      <div style="display: flex; flex-direction: column; gap: 0.4rem;">
        <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: var(--text-tertiary); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">
          <span>Degradation Timeline</span>
          <span>Age: {psuAgeYears} Yr</span>
        </div>
        <div style="position: relative; height: 26px; background: var(--color-surface-raised); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); display: flex; align-items: center; overflow: hidden; padding: 0 4px;">
          {/* Progress fill indicating degradation */}
          <div
            style={`position: absolute; top: 0; bottom: 0; left: 0; right: ${100 - health.score}%; background: linear-gradient(90deg, var(--color-safe) 0%, var(--color-warning) 60%, var(--color-danger) 100%); opacity: 0.12; transition: right 0.35s ease;`}
          />
          {/* Label checkpoints */}
          <div style="width: 100%; display: flex; justify-content: space-between; z-index: 1; font-size: 0.6rem; font-weight: 700; color: var(--text-tertiary); padding: 0 4px; font-family: var(--font-mono);">
            <span>0Y (100%)</span>
            <span>5Y (90%)</span>
            <span>8Y (75%)</span>
            <span>12Y (55%)</span>
            <span>15Y (EOL)</span>
          </div>
        </div>
      </div>

      {/* Replacement check CTA */}
      {health.score < 70 && (
        <a
          href="/psu-replacement-calculator"
          style="display: block; text-align: center; text-decoration: none; padding: 6px 12px; font-size: 0.7rem; font-weight: 700; border-radius: var(--radius-md); background: rgba(0, 145, 234, 0.08); border: 1px solid var(--border-accent); color: var(--color-accent-cyan); transition: all 0.2s;"
          class="hover-glow"
        >
          Verify replacement status ➔
        </a>
      )}
    </div>
  );
}
