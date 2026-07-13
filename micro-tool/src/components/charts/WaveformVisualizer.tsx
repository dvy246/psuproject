/** @jsxImportSource preact */
// ============================================================
// VoltForge — Live Transient Waveform Visualizer
// Pure SVG + requestAnimationFrame. No canvas, no Chart.js.
// Shows: sustained load line (cyan), transient spike (red/amber),
//        PSU rating dashed limit line.
// Accessible: role="img", aria-label, hidden data table.
// Respects prefers-reduced-motion.
// ============================================================

import { useEffect, useRef, useState } from 'preact/hooks';

interface Props {
  baseDraw:      number;  // sustained load (W)
  transientPeak: number;  // peak spike (W)
  psuRating:     number;  // PSU rated wattage
  isDanger:      boolean; // true = spike exceeds PSU
}

const W = 300;  // SVG viewBox width
const H = 120;  // SVG viewBox height
const PAD_L = 40;
const PAD_R = 10;
const PAD_T = 12;
const PAD_B = 20;
const INNER_W = W - PAD_L - PAD_R;
const INNER_H = H - PAD_T - PAD_B;

// Map watts to SVG Y coordinate (inverted — higher W = lower Y)
function wToY(watts: number, maxW: number): number {
  const clamped = Math.max(0, Math.min(maxW, watts));
  return PAD_T + INNER_H - (clamped / maxW) * INNER_H;
}

// Map time 0-1 to SVG X
function tToX(t: number): number {
  return PAD_L + t * INNER_W;
}

export function WaveformVisualizer({ baseDraw, transientPeak, psuRating, isDanger }: Props) {
  const [prefersReduced] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );
  const [animPhase, setAnimPhase] = useState(0); // 0-1 for spike animation
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  // Animate spike pulse (2.5s loop)
  useEffect(() => {
    if (prefersReduced) return;
    const PERIOD = 2500;

    const tick = (now: number) => {
      if (!startRef.current) startRef.current = now;
      const elapsed = (now - startRef.current) % PERIOD;
      setAnimPhase(elapsed / PERIOD);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [prefersReduced]);

  // Guard: if no data
  if (!baseDraw && !transientPeak) {
    return (
      <div
        class="waveform-empty"
        role="img"
        aria-label="No power data available"
        style="height:100px;display:flex;align-items:center;justify-content:center;"
      >
        <span style="color:var(--color-text-tertiary);font-size:0.8125rem;">Select GPU to see waveform</span>
      </div>
    );
  }

  const maxY = Math.max(psuRating * 1.15, transientPeak * 1.1, 100);
  const spikeColor = isDanger ? 'var(--color-danger)' : 'var(--color-warning)';

  // Spike animation: sine-based intensity flicker
  const spikeGlow = prefersReduced
    ? `drop-shadow(0 0 4px ${spikeColor})`
    : `drop-shadow(0 0 ${4 + Math.sin(animPhase * Math.PI * 2) * 8}px ${spikeColor})`;

  // Y coordinates
  const baseY    = wToY(baseDraw, maxY);
  const spikeY   = wToY(transientPeak, maxY);
  const psuY     = wToY(psuRating, maxY);

  // Waveform path: flat baseline with a spike at ~35% of timeline
  const spikeX = tToX(0.35);
  const baselinePath = [
    `M ${tToX(0)} ${baseY}`,
    `L ${tToX(0.30)} ${baseY}`,
    `L ${spikeX - 8} ${baseY}`,
    `L ${spikeX} ${spikeY}`,
    `L ${spikeX + 8} ${baseY}`,
    `L ${tToX(1)} ${baseY}`,
  ].join(' ');

  // Fill area under baseline
  const fillPath = [
    `M ${tToX(0)} ${baseY}`,
    `L ${tToX(0.30)} ${baseY}`,
    `L ${spikeX - 8} ${baseY}`,
    `L ${spikeX} ${spikeY}`,
    `L ${spikeX + 8} ${baseY}`,
    `L ${tToX(1)} ${baseY}`,
    `L ${tToX(1)} ${H - PAD_B}`,
    `L ${tToX(0)} ${H - PAD_B}`,
    'Z',
  ].join(' ');

  return (
    <div style="position:relative;">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="img"
        aria-label={`Power waveform: sustained ${baseDraw}W, transient peak ${transientPeak}W, PSU limit ${psuRating}W`}
        aria-describedby="waveform-desc"
        style="display:block;border-radius:var(--radius-md);background:var(--color-surface);border:1px solid var(--color-border-subtle);"
      >
        <desc id="waveform-desc">
          A power waveform showing sustained load of {baseDraw}W with a transient spike to {transientPeak}W.
          The PSU is rated at {psuRating}W.
          {isDanger ? 'The spike exceeds safe limits.' : 'The PSU can handle the transient.'}
        </desc>

        {/* Grid lines (subtle) */}
        {[0.25, 0.5, 0.75, 1].map(frac => {
          const gY = wToY(maxY * frac, maxY);
          return (
            <line
              key={frac}
              x1={PAD_L} y1={gY}
              x2={W - PAD_R} y2={gY}
              stroke="var(--color-border-subtle)"
              stroke-width="0.5"
            />
          );
        })}

        {/* Y-axis watt labels */}
        {[0.25, 0.5, 0.75, 1].map(frac => {
          const gY = wToY(maxY * frac, maxY);
          return (
            <text key={`label-${frac}`} x={PAD_L - 4} y={gY + 4} text-anchor="end"
              style="fill:var(--color-text-tertiary);font-size:8px;font-family:var(--font-mono);">
              {Math.round(maxY * frac)}W
            </text>
          );
        })}

        {/* PSU rating dashed limit line */}
        <line
          x1={PAD_L} y1={psuY}
          x2={W - PAD_R} y2={psuY}
          stroke="rgba(255,255,255,0.25)"
          stroke-width="1"
          stroke-dasharray="6 4"
        />
        <text x={W - PAD_R - 2} y={psuY - 4} text-anchor="end"
          style="fill:rgba(255,255,255,0.4);font-size:8px;font-family:var(--font-mono);">
          {psuRating}W PSU
        </text>

        {/* Fill under waveform */}
        <path
          d={fillPath}
          fill={isDanger ? 'var(--color-danger-bg)' : 'oklch(85% 0.18 195 / 0.06)'}
        />

        {/* Waveform line */}
        <path
          d={baselinePath}
          fill="none"
          stroke={spikeColor}
          stroke-width="2"
          stroke-linejoin="round"
          stroke-linecap="round"
          class="waveform-spike-line"
          style={{ filter: spikeGlow }}
        />

        {/* Sustained load (cyan, underneath) */}
        <line
          x1={PAD_L} y1={baseY}
          x2={tToX(0.30)} y2={baseY}
          stroke="var(--color-accent-cyan)"
          stroke-width="2"
        />
        <line
          x1={tToX(0.43)} y1={baseY}
          x2={W - PAD_R} y2={baseY}
          stroke="var(--color-accent-cyan)"
          stroke-width="2"
        />
        <text x={PAD_L + 4} y={baseY - 5}
          style="fill:var(--color-accent-cyan);font-size:8px;font-family:var(--font-mono);">
          {baseDraw}W
        </text>

        {/* Spike peak label */}
        <text x={spikeX + 10} y={spikeY + 4} text-anchor="start"
          style={`fill:${spikeColor};font-size:9px;font-family:var(--font-mono);font-weight:700;`}>
          {transientPeak}W
        </text>

        {/* Time axis */}
        <text x={PAD_L} y={H - 4} style="fill:var(--color-text-tertiary);font-size:8px;font-family:var(--font-mono);">0ms</text>
        <text x={W - PAD_R} y={H - 4} text-anchor="end" style="fill:var(--color-text-tertiary);font-size:8px;font-family:var(--font-mono);">100ms</text>
      </svg>

      {/* Screen-reader data table (visually hidden) */}
      <table class="sr-only">
        <caption>Transient waveform data</caption>
        <tbody>
          <tr><th scope="row">Sustained load</th><td>{baseDraw}W</td></tr>
          <tr><th scope="row">Transient peak</th><td>{transientPeak}W</td></tr>
          <tr><th scope="row">PSU limit</th><td>{psuRating}W</td></tr>
          <tr><th scope="row">Status</th><td>{isDanger ? 'EXCEEDS SAFE LIMITS' : 'Within safe range'}</td></tr>
        </tbody>
      </table>
    </div>
  );
}
