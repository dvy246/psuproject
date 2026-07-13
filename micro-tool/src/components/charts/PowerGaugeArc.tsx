/** @jsxImportSource preact */
// ============================================================
// PSUCheck — Animated Power Gauge Arc (SVG-based)
// A radial arc gauge showing recommended PSU vs rated capacity.
// No canvas, no Chart.js — pure SVG + CSS transitions.
// Accessible: aria-label, role="img", hidden data table.
// ============================================================

import { useEffect, useRef } from 'preact/hooks';

interface Props {
  recommendedWattage: number;
  psuRated: number;
  verdict: 'safe' | 'warning' | 'danger';
  'aria-label'?: string;
}

const VERDICTCOLORS = {
  safe:    'var(--color-accent-cyan)',
  warning: 'var(--color-warning)',
  danger:  'var(--color-danger)',
};

// Arc: semi-circle. r=70, center=(90,90), circumference of half-circle
const R       = 70;
const CX      = 90;
const CY      = 90;
const FULL_ARC = Math.PI * R; // half-circle arc length = πr ≈ 219.9

// Standard PSU wattage range for gauge
const MIN_W = 450;
const MAX_W = 1600;

export function PowerGaugeArc({ recommendedWattage, psuRated, verdict, 'aria-label': ariaLabel }: Props) {
  const fillRef = useRef<SVGPathElement>(null);

  const clampedRec = Math.max(MIN_W, Math.min(MAX_W, recommendedWattage));
  const clampedPsu = Math.max(MIN_W, Math.min(MAX_W, psuRated));

  const recPct = (clampedRec - MIN_W) / (MAX_W - MIN_W);
  const psuPct = (clampedPsu - MIN_W) / (MAX_W - MIN_W);

  const recDash  = recPct  * FULL_ARC;
  const psuDash  = psuPct  * FULL_ARC;

  const color = VERDICTCOLORS[verdict];

  // Semi-circle arc: left (180°) to right (0°) along top
  // M = start-left, A = arc params
  const arcD = `M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`;

  const hasData = recommendedWattage > 0;

  return (
    <div class="gauge-container" role="img" aria-label={ariaLabel ?? `Power gauge: ${recommendedWattage}W recommended`}>
      <svg
        viewBox="0 0 180 100"
        width="100%"
        style="max-width: 240px; display: block; margin: 0 auto;"
        aria-hidden="true"
        focusable="false"
      >
        {/* Track (background arc) */}
        <path
          d={arcD}
          fill="none"
          stroke="var(--color-border-subtle)"
          stroke-width="10"
          stroke-linecap="round"
        />

        {/* PSU rated indicator (subtle) */}
        {hasData && (
          <path
            d={arcD}
            fill="none"
            stroke="var(--color-border)"
            stroke-width="10"
            stroke-linecap="round"
            stroke-dasharray={`${psuDash} ${FULL_ARC}`}
            style={{
              'transition-property': 'stroke-dasharray',
              'transition-duration': '400ms',
              'transition-timing-function': 'cubic-bezier(0.16,1,0.3,1)',
            }}
          />
        )}

        {/* Recommended fill */}
        {hasData && (
          <path
            ref={fillRef}
            d={arcD}
            fill="none"
            stroke={color}
            stroke-width="10"
            stroke-linecap="round"
            stroke-dasharray={`${recDash} ${FULL_ARC}`}
            style={{
              'transition-property': 'stroke-dasharray, stroke',
              'transition-duration': '500ms',
              'transition-timing-function': 'cubic-bezier(0.16,1,0.3,1)',
              filter: `drop-shadow(0 0 6px ${color})`,
            }}
          />
        )}

        {/* Center: recommended wattage label */}
        <text
          x={CX} y={CY - 10}
          text-anchor="middle"
          class="gauge-value-text"
          style={{
            fill: hasData ? color : 'var(--color-text-tertiary)',
            'font-size': '22px',
            'font-family': 'var(--font-mono)',
            'font-variant-numeric': 'tabular-nums',
            'font-weight': '900',
          }}
        >
          {hasData ? `${recommendedWattage}W` : '—'}
        </text>

        <text
          x={CX} y={CY + 3}
          text-anchor="middle"
          style={{
            fill: 'var(--color-text-tertiary)',
            'font-size': '8.5px',
            'font-family': 'var(--font-body)',
            'text-transform': 'uppercase',
            'letter-spacing': '0.06em',
          }}
        >
          {hasData ? 'RECOMMENDED' : 'SELECT COMPONENTS'}
        </text>

        {/* Range labels */}
        <text x="12" y="94" text-anchor="start" style="fill:var(--color-text-tertiary);font-size:9px;font-family:var(--font-mono);">{MIN_W}W</text>
        <text x="168" y="94" text-anchor="end" style="fill:var(--color-text-tertiary);font-size:9px;font-family:var(--font-mono);">{MAX_W}W</text>
      </svg>

      {/* Screen-reader accessible data table (visually hidden) */}
      <table class="sr-only">
        <caption>PSU power gauge data</caption>
        <tbody>
          <tr>
            <th scope="row">Recommended wattage</th>
            <td>{recommendedWattage}W</td>
          </tr>
          <tr>
            <th scope="row">PSU rated capacity</th>
            <td>{psuRated}W</td>
          </tr>
          <tr>
            <th scope="row">Status</th>
            <td>{verdict === 'safe' ? 'Safe' : verdict === 'warning' ? 'Borderline' : 'Dangerous'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
