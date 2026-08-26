import { useState } from 'preact/hooks';
import { auditBreaker } from '../../lib/electrical';
import { useTranslations, type Locale } from '../../i18n';
import { getElectricalTranslations } from '../../i18n/electrical';

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

interface Props {
  lang?: Locale;
}

export default function BreakerAuditor({ lang = 'en' }: Props) {
  const t = useTranslations(lang);
  const et = getElectricalTranslations(lang);
  const [pcWatts, setPcWatts] = useState(450);
  const [breakerAmps, setBreakerAmps] = useState<15 | 20>(15);
  const [selectedAppliances, setSelectedAppliances] = useState<string[]>(['monitor-single', 'room-lights']);

  const additionalWatts = APPLIANCES
    .filter(a => selectedAppliances.includes(a.id))
    .reduce((sum, a) => sum + a.watts, 0);

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
          <h2 style="font-size:1.15rem; font-weight:700; color:var(--text-primary); margin:0;">1. {et.breaker.title}</h2>

          {/* PC Load Slider */}
          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.875rem; color:var(--text-secondary); margin-bottom:0.25rem;">
              <span>{et.breaker.wallPower}</span>
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
            <span style="font-size:0.75rem; color:var(--text-tertiary);">{et.breaker.noteText}</span>
          </div>

          {/* Breaker Rating */}
          <div>
            <label class="input-label" style="display:block; margin-bottom:0.5rem; font-weight:700;">{et.breaker.circuitRating}</label>
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
          </div>

          <hr style="border:0; border-top:1px solid var(--color-border-subtle); margin:0.25rem 0;" />

          {/* Shared Room Appliances */}
          <div>
            <label class="input-label" style="display:block; margin-bottom:0.5rem; font-weight:700;">{et.breaker.sharedDevices}</label>
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
                    <span style="font-size:0.875rem; color:var(--text-primary);">{et.breaker.appliances[app.id] || app.name}</span>
                  </div>
                  <span class="tabular" style="font-size:0.8rem; font-weight:700; color:var(--text-tertiary);">+{app.watts}W</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Verdict & Telemetry Panel */}
        <div class="card card-dark" style="padding:1.5rem; display:flex; flex-direction:column; justify-content:space-between; gap:1.25rem;">
          <div>
            <h2 style="font-size:1.15rem; font-weight:700; color:var(--text-primary); margin:0 0 1rem 0;">2. {et.breaker.verdictTitle}</h2>

            <div class={`badge ${result.verdict === 'danger' ? 'badge-danger' : result.verdict === 'warning' ? 'badge-warning' : 'badge-safe'}`} style="font-size:1rem; padding:8px 12px; width:100%; text-align:center; justify-content:center; margin-bottom:1.5rem;">
              {result.verdict === 'danger' ? t.breaker.tripRiskHigh : result.verdict === 'warning' ? et.breaker.highContinuousLoad : t.breaker.tripRiskSafe}
            </div>

            <div style="display:flex; flex-direction:column; gap:1rem;">
              <div>
                <div style="display:flex; justify-content:space-between; font-size:0.875rem; margin-bottom:0.25rem;">
                  <span style="color:var(--text-secondary);">{et.breaker.totalCircuitLoad}</span>
                  <span class="tabular" style="font-weight:700; color:var(--text-primary);">{result.totalWatts}W / {limitWatts}W ({result.capacityPercent}%)</span>
                </div>
                <div style="height:12px; background:var(--color-surface-overlay); border-radius:6px; overflow:hidden;">
                  <div
                    style={{
                      height: '100%',
                      width: `${Math.min(result.capacityPercent, 100)}%`,
                      background: result.verdict === 'danger' ? 'var(--color-danger, #ef4444)' : result.verdict === 'warning' ? 'var(--color-warning, #f59e0b)' : 'var(--color-accent-cyan, #06b6d4)',
                      transition: 'width 200ms ease'
                    }}
                  />
                </div>
              </div>

              <div style="background:var(--color-surface-raised); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--color-border-subtle); font-size:0.85rem; line-height:1.5;">
                <p style="margin:0; color:var(--text-primary);">{result.warningMessage}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
