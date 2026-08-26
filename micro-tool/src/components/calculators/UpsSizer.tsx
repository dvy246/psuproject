import { useState } from 'preact/hooks';
import { sizeUpsForPc, UPS_PRODUCTS } from '../../lib/electrical';
import { useTranslations, type Locale } from '../../i18n';
import { getElectricalTranslations } from '../../i18n/electrical';

interface Props {
  lang?: Locale;
}

export default function UpsSizer({ lang = 'en' }: Props) {
  const t = useTranslations(lang);
  const et = getElectricalTranslations(lang);
  const [pcGamingWatts, setPcGamingWatts] = useState(450);
  const [pcIdleWatts, setPcIdleWatts] = useState(80);
  const [monitorWatts, setMonitorWatts] = useState(40);
  const [isPfcPsu, setIsPfcPsu] = useState(true);

  const result = sizeUpsForPc(pcGamingWatts, pcIdleWatts, monitorWatts, isPfcPsu);

  return (
    <div class="ups-sizer-box">
      <div class="grid-layout">
        {/* Settings Panel */}
        <div class="card card-dark" style="padding:1.5rem; display:flex; flex-direction:column; gap:1.25rem;">
          <h2 style="font-size:1.15rem; font-weight:700; color:var(--text-primary); margin:0;">1. {et.ups.title}</h2>

          {/* PC Gaming Load */}
          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.875rem; color:var(--text-secondary); margin-bottom:0.25rem;">
              <span>{et.ups.gamingLoad}</span>
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
          </div>

          {/* PC Idle Load */}
          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.875rem; color:var(--text-secondary); margin-bottom:0.25rem;">
              <span>{et.ups.officeLoad}</span>
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
              <span>{et.ups.monitorLoad}</span>
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
                <span style="font-size:0.875rem; font-weight:700; color:var(--text-primary); display:block;">{et.ups.activePfcTitle}</span>
                <span style="font-size:0.75rem; color:var(--text-secondary); display:block; margin-top:0.15rem; line-height:1.4;">
                  {et.ups.activePfcDesc}
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Results Panel */}
        <div class="card card-dark" style="padding:1.5rem; display:flex; flex-direction:column; justify-content:space-between; gap:1.5rem;">
          <div>
            <h2 style="font-size:1.15rem; font-weight:700; color:var(--text-primary); margin:0;">2. {et.ups.outputTitle}</h2>
            <div style="display:flex; justify-content:space-between; margin-top:1rem; font-size:0.8125rem; color:var(--text-secondary); border-bottom:1px solid var(--color-border-subtle); padding-bottom:0.5rem;">
              <span>{et.ups.totalLoad}</span>
              <span class="tabular" style="font-weight:700; color:var(--text-primary);">{result.requiredWatts} W</span>
            </div>

            <div style="display:flex; justify-content:space-between; margin-top:0.5rem; font-size:0.8125rem; color:var(--text-secondary); border-bottom:1px solid var(--color-border-subtle); padding-bottom:0.5rem;">
              <span>{et.ups.recommendedVa}</span>
              <span class="tabular" style="font-weight:700; color:var(--color-accent-cyan);">{result.requiredVa} VA</span>
            </div>

            <div style="display:flex; justify-content:space-between; margin-top:0.5rem; font-size:0.8125rem; color:var(--text-secondary); border-bottom:1px solid var(--color-border-subtle); padding-bottom:0.5rem;">
              <span>{t.ups.runtimeMinutes}</span>
              <span class="tabular" style="font-weight:700; color:var(--text-primary);">{et.ups.runtimeMinutes(result.verdicts[0]?.runtimeGamingMins || 5)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
