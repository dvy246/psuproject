import { useState } from 'preact/hooks';
import { sizeUpsForPc, UPS_PRODUCTS } from '../../lib/electrical';

export default function UpsSizer() {
  const [pcGamingWatts, setPcGamingWatts] = useState(450);
  const [pcIdleWatts, setPcIdleWatts] = useState(80);
  const [monitorWatts, setMonitorWatts] = useState(40);
  const [isPfcPsu, setIsPfcPsu] = useState(true);

  // Run calculation
  const result = sizeUpsForPc(pcGamingWatts, pcIdleWatts, monitorWatts, isPfcPsu);

  return (
    <div class="ups-sizer-box">
      <div class="grid-layout">
        {/* Settings Panel */}
        <div class="card card-dark" style="padding:1.5rem; display:flex; flex-direction:column; gap:1.25rem;">
          <h2 style="font-size:1.15rem; font-weight:700; color:var(--text-primary); margin:0;">1. Sizing Parameters</h2>

          {/* PC Gaming Load */}
          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.875rem; color:var(--text-secondary); margin-bottom:0.25rem;">
              <span>PC Gaming/Peak Load Draw</span>
              <span class="tabular" style="font-weight:700; color:var(--text-primary);">{pcGamingWatts}W</span>
            </div>
            <input
              type="range"
              min="100"
              max="1000"
              step="25"
              value={pcGamingWatts}
              onInput={(e) => setPcGamingWatts(parseInt(e.currentTarget.value, 10))}
              style="width:100%; accent-color:var(--color-accent-cyan);"
            />
            <span style="font-size:0.75rem; color:var(--text-tertiary);">The maximum sustained load of your CPU + GPU + internal components.</span>
          </div>

          {/* PC Idle Load */}
          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.875rem; color:var(--text-secondary); margin-bottom:0.25rem;">
              <span>PC Office/Idle Draw</span>
              <span class="tabular" style="font-weight:700; color:var(--text-primary);">{pcIdleWatts}W</span>
            </div>
            <input
              type="range"
              min="30"
              max="300"
              step="10"
              value={pcIdleWatts}
              onInput={(e) => setPcIdleWatts(parseInt(e.currentTarget.value, 10))}
              style="width:100%; accent-color:var(--color-accent-cyan);"
            />
          </div>

          {/* Monitor Power */}
          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.875rem; color:var(--text-secondary); margin-bottom:0.25rem;">
              <span>Monitor Load Draw</span>
              <span class="tabular" style="font-weight:700; color:var(--text-primary);">{monitorWatts}W</span>
            </div>
            <input
              type="range"
              min="10"
              max="200"
              step="5"
              value={monitorWatts}
              onInput={(e) => setMonitorWatts(parseInt(e.currentTarget.value, 10))}
              style="width:100%; accent-color:var(--color-accent-cyan);"
            />
            <span style="font-size:0.75rem; color:var(--text-tertiary);">Tip: A standard 27\" monitor draws ~30-40W. Ultrawide or high-refresh monitors draw 60-120W.</span>
          </div>

          <hr style="border:0; border-top:1px solid var(--color-border-subtle); margin:0.25rem 0;" />

          {/* Active PFC PSU Toggle */}
          <div>
            <label style="display:flex; align-items:flex-start; gap:10px; cursor:pointer;">
              <input
                type="checkbox"
                checked={isPfcPsu}
                onChange={(e) => setIsPfcPsu(e.currentTarget.checked)}
                style="margin-top:4px; accent-color:var(--color-accent-cyan);"
              />
              <div>
                <span style="font-size:0.875rem; font-weight:700; color:var(--text-primary); display:block;">Active PFC Power Supply</span>
                <span style="font-size:0.75rem; color:var(--text-secondary); display:block; margin-top:0.15rem; line-height:1.4;">
                  Highly recommended check. Most modern 80+ Gold/Platinum/Titanium power supplies use Active PFC (Power Factor Correction). They require <strong>Pure Sine Wave</strong> UPS units to prevent crashing when switching to battery.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Results Panel */}
        <div class="card card-dark" style="padding:1.5rem; display:flex; flex-direction:column; justify-content:space-between; gap:1.5rem;">
          <div>
            <h2 style="font-size:1.15rem; font-weight:700; color:var(--text-primary); margin:0;">2. UPS Compatibility Matrix</h2>
            <div style="display:flex; justify-content:space-between; margin-top:1rem; font-size:0.8125rem; color:var(--text-secondary); border-bottom:1px solid var(--color-border-subtle); padding-bottom:0.5rem;">
              <span>Total Load (PC + Monitor)</span>
              <span class="tabular" style="font-weight:700; color:var(--text-primary);">{result.requiredWatts} W</span>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:0.8125rem; color:var(--text-secondary); border-bottom:1px solid var(--color-border-subtle); padding-bottom:0.5rem; margin-top:0.5rem;">
              <span>Minimum Capacity Needed</span>
              <span class="tabular" style="font-weight:700; color:var(--color-accent-cyan);">{result.requiredVa} VA</span>
            </div>

            {/* UPS Product Recommendations Table */}
            <div style="margin-top:1.5rem; display:flex; flex-direction:column; gap:0.75rem;">
              {result.verdicts.map(v => {
                const ups = UPS_PRODUCTS.find(u => u.id === v.upsId);
                if (!ups) return null;

                return (
                  <div key={v.upsId} style="padding:1rem; border:1px solid var(--color-border-subtle); border-radius:var(--radius-md); background:var(--color-bg-secondary); display:flex; justify-content:space-between; gap:1rem; align-items:center;">
                    <div style="display:flex; flex-direction:column; gap:0.15rem; flex:1;">
                      <span style="font-size:0.6875rem; font-weight:700; text-transform:uppercase; color:var(--text-tertiary);">{ups.brand} · {ups.waveType}</span>
                      <h3 style="font-size:0.875rem; font-weight:700; color:var(--text-primary); margin:0;">{ups.name}</h3>
                      <p style="font-size:0.75rem; color:var(--text-secondary); margin:0.25rem 0 0; line-height:1.45;">{v.notes}</p>
                    </div>
                    <div style="text-align:right; display:flex; flex-direction:column; gap:0.4rem; align-items:flex-end;">
                      <span class={`badge badge-${v.isCompatible ? 'safe' : 'danger'}`} style="font-size:0.75rem;">
                        {v.isCompatible ? 'Compatible' : 'Incompatible'}
                      </span>
                      {v.isCompatible && (
                        <span style="font-size:0.6875rem; color:var(--text-tertiary); line-height:1.2;">
                          Gaming: <strong>{v.runtimeGamingMins}m</strong><br/>
                          Office: <strong>{v.runtimeOfficeMins}m</strong>
                        </span>
                      )}
                      <a href={ups.affiliateUrl} target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-xs" style="padding:4px 8px; font-size:0.6875rem;">Amazon →</a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ups-sizer-box {
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
        .btn-xs {
          font-size: 0.6875rem !important;
          padding: 4px 8px !important;
          min-height: 24px !important;
        }
      `}</style>
    </div>
  );
}
