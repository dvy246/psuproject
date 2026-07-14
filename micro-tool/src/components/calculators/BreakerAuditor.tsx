import { useState } from 'preact/hooks';
import { auditBreaker } from '../../lib/electrical';

interface AppliancePreset {
  id: string;
  name: string;
  watts: number;
}

const APPLIANCES: AppliancePreset[] = [
  { id: 'space-heater', name: 'Portable Space Heater (High)', watts: 1500 },
  { id: 'space-heater-low', name: 'Portable Space Heater (Low)', watts: 750 },
  { id: 'portable-ac', name: 'Portable Air Conditioner', watts: 950 },
  { id: 'monitor-dual', name: 'Dual Gaming Monitors', watts: 90 },
  { id: 'monitor-single', name: 'Single Monitor', watts: 45 },
  { id: 'console-charger', name: 'Console / Laptop Charger', watts: 150 },
  { id: 'room-lights', name: 'LED Room Lighting', watts: 30 },
  { id: 'fan-tower', name: 'Standing/Tower Fan', watts: 60 }
];

export default function BreakerAuditor() {
  const [pcWatts, setPcWatts] = useState(450);
  const [breakerAmps, setBreakerAmps] = useState<15 | 20>(15);
  const [selectedAppliances, setSelectedAppliances] = useState<string[]>(['monitor-single', 'room-lights']);

  // Calculate sum of appliances
  const additionalWatts = APPLIANCES
    .filter(a => selectedAppliances.includes(a.id))
    .reduce((sum, a) => sum + a.watts, 0);

  // Run calculation
  const result = auditBreaker(pcWatts, additionalWatts, breakerAmps);
  const limitWatts = breakerAmps * 120;

  const toggleAppliance = (id: string) => {
    if (selectedAppliances.includes(id)) {
      setSelectedAppliances(selectedAppliances.filter(a => a !== id));
    } else {
      setSelectedAppliances([...selectedAppliances, id]);
    }
  };

  return (
    <div class="breaker-auditor-box">
      <div class="grid-layout">
        {/* Settings Panel */}
        <div class="card card-dark" style="padding:1.5rem; display:flex; flex-direction:column; gap:1.25rem;">
          <h2 style="font-size:1.15rem; font-weight:700; color:var(--text-primary); margin:0;">1. Power Inputs</h2>

          {/* PC Load Slider */}
          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.875rem; color:var(--text-secondary); margin-bottom:0.25rem;">
              <span>PC Power Draw (From Wall)</span>
              <span class="tabular" style="font-weight:700; color:var(--text-primary);">{pcWatts}W</span>
            </div>
            <input
              type="range"
              min="100"
              max="1200"
              step="25"
              value={pcWatts}
              onInput={(e) => setPcWatts(parseInt(e.currentTarget.value, 10))}
              style="width:100%; accent-color:var(--color-accent-cyan);"
            />
            <span style="font-size:0.75rem; color:var(--text-tertiary);">Note: Under gaming load, an average mid-range PC draws ~350W, while an RTX 5090 system draws 650W–900W.</span>
          </div>

          {/* Breaker Rating */}
          <div>
            <label class="input-label" style="display:block; margin-bottom:0.5rem; font-weight:700;">Circuit Breaker Limit (US Standard)</label>
            <div style="display:flex; gap:0.5rem;">
              <button
                type="button"
                class={`btn-tab ${breakerAmps === 15 ? 'active' : ''}`}
                onClick={() => setBreakerAmps(15)}
                style="flex:1; padding:8px;"
              >
                15 Amp (1800W max)
              </button>
              <button
                type="button"
                class={`btn-tab ${breakerAmps === 20 ? 'active' : ''}`}
                onClick={() => setBreakerAmps(20)}
                style="flex:1; padding:8px;"
              >
                20 Amp (2400W max)
              </button>
            </div>
            <span style="font-size:0.75rem; color:var(--text-tertiary); display:block; margin-top:0.25rem;">Most US residential bedrooms are wired on shared 15A circuits.</span>
          </div>

          <hr style="border:0; border-top:1px solid var(--color-border-subtle); margin:0.25rem 0;" />

          {/* Shared Room Appliances */}
          <div>
            <label class="input-label" style="display:block; margin-bottom:0.5rem; font-weight:700;">Other Shared Room Devices</label>
            <div style="display:flex; flex-direction:column; gap:0.5rem; max-height:220px; overflow-y:auto; padding-right:4px;">
              {APPLIANCES.map(app => (
                <label key={app.id} style="display:flex; align-items:center; justify-content:space-between; padding:8px; border-radius:4px; border:1px solid var(--color-border-subtle); background:var(--color-bg-secondary); cursor:pointer;">
                  <div style="display:flex; align-items:center; gap:8px;">
                    <input
                      type="checkbox"
                      checked={selectedAppliances.includes(app.id)}
                      onChange={() => toggleAppliance(app.id)}
                      style="accent-color:var(--color-accent-cyan);"
                    />
                    <span style="font-size:0.8125rem; color:var(--text-primary);">{app.name}</span>
                  </div>
                  <span class="tabular" style="font-size:0.8125rem; font-weight:700; color:var(--text-secondary);">{app.watts}W</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div class="card card-dark" style="padding:1.5rem; display:flex; flex-direction:column; justify-content:space-between; gap:1.5rem;">
          <div>
            <h2 style="font-size:1.15rem; font-weight:700; color:var(--text-primary); margin:0;">2. Circuit Load Audit</h2>

            {/* Verdict Box */}
            <div style={`margin-top:1.25rem; padding:1.25rem; border-radius:var(--radius-lg); border: 2px solid ${result.verdict === 'danger' ? 'var(--color-danger)' : result.verdict === 'warning' ? 'var(--color-warning)' : 'var(--color-accent-cyan)'}; background:var(--color-surface-raised);`}>
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:0.25rem;">
                <span style={`font-size:1.15rem; color:${result.verdict === 'danger' ? 'var(--color-danger)' : result.verdict === 'warning' ? 'var(--color-warning)' : 'var(--color-accent-cyan)'};`}>
                  {result.verdict === 'danger' ? '✕' : result.verdict === 'warning' ? '⚠' : '✓'}
                </span>
                <span style="font-size:0.6875rem; font-weight:700; text-transform:uppercase; color:var(--text-tertiary); letter-spacing:0.06em;">Breaker Verdict</span>
              </div>
              <h3 style="font-size:1.15rem; font-weight:800; margin:0 0 0.5rem; color:var(--text-primary);">
                {result.verdict === 'danger' ? 'Circuit Overloaded' : result.verdict === 'warning' ? 'Near Capacity' : 'Circuit is Safe'}
              </h3>
              <p style="font-size:0.875rem; color:var(--text-secondary); line-height:1.5; margin:0;">
                {result.warningMessage}
              </p>
            </div>

            {/* Visual Load Bar */}
            <div style="margin-top:2rem;">
              <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--text-secondary); margin-bottom:0.25rem;">
                <span>Total Amps Drawn: <strong>{result.totalAmps} A</strong></span>
                <span>Max Capacity: <strong>{breakerAmps} A</strong></span>
              </div>
              <div style="height:24px; background:var(--color-surface-raised); border-radius:4px; overflow:hidden; display:flex;">
                <div style={`height:100%; width:${Math.min(100, result.capacityPercent)}%; background:${result.verdict === 'danger' ? 'linear-gradient(90deg, var(--color-warning), var(--color-danger))' : result.verdict === 'warning' ? 'linear-gradient(90deg, var(--color-accent-cyan), var(--color-warning))' : 'linear-gradient(90deg, var(--color-safe), var(--color-accent-cyan))'}; transition:width 0.2s;`}></div>
              </div>
              <div style="display:flex; justify-content:space-between; font-size:0.6875rem; color:var(--text-tertiary); margin-top:0.25rem;">
                <span>Total Circuit Load: <strong>{result.totalWatts}W</strong></span>
                <span>{result.capacityPercent}% of {limitWatts}W limit</span>
              </div>
            </div>
          </div>

          {/* Breakdown Table */}
          <div style="display:flex; flex-direction:column; gap:0.75rem;">
            <h4 style="font-size:0.875rem; font-weight:700; color:var(--text-secondary); margin:0;">Load Breakdown</h4>
            <div style="display:flex; flex-direction:column; gap:0.5rem; font-size:0.8125rem;">
              <div style="display:flex; justify-content:space-between; padding-bottom:0.4rem; border-bottom:1px solid var(--color-border-subtle);">
                <span style="color:var(--text-tertiary);">Gaming PC Peak Load</span>
                <span class="tabular" style="font-weight:700; color:var(--text-primary);">{pcWatts}W</span>
              </div>
              <div style="display:flex; justify-content:space-between; padding-bottom:0.4rem; border-bottom:1px solid var(--color-border-subtle);">
                <span style="color:var(--text-tertiary);">Shared Peripherals / Appliances</span>
                <span class="tabular" style="font-weight:700; color:var(--text-primary);">{additionalWatts}W</span>
              </div>
              <div style="display:flex; justify-content:space-between; font-weight:700; padding-top:0.25rem;">
                <span style="color:var(--text-primary);">Total Combined Current</span>
                <span class="tabular" style="color:var(--color-accent-cyan);">{result.totalWatts}W (~{result.totalAmps}A)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .breaker-auditor-box {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .grid-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .grid-layout {
            grid-template-columns: 1fr 1.2fr;
          }
        }
        .btn-tab {
          background: var(--color-surface-raised);
          border: 1px solid var(--color-border-subtle);
          color: var(--color-text-secondary);
          border-radius: var(--radius-md, 8px);
          font-size: 0.8125rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s;
        }
        .btn-tab.active {
          border-color: var(--color-accent-cyan);
          color: var(--color-accent-cyan);
          background: var(--color-surface);
        }
      `}</style>
    </div>
  );
}
