/** @jsxImportSource preact */
// ============================================================
// VoltForge — Interactive TCO Calculator
// Reactive to: selected CPU, GPU, RAM, Storage, Cooling.
// Custom inputs: electricity rate, daily hours, calculation period.
// Compares: Bronze, Gold, Platinum, Titanium 80 PLUS Tiers.
// ============================================================

import { useState } from 'preact/hooks';
import { computed } from '@preact/signals';
import {
  selectedCpu,
  selectedGpu,
  selectedRam,
  selectedStorage,
  selectedCooling,
  fans
} from './VirtualAssemblyDesk';
import { calculateBaseDraw } from '../../lib/psu';

// Purchase average baseline costs per tier (realistic averages for standard 750W-850W units)
const PURCHASE_COSTS = {
  bronze: 65,
  gold: 125,
  platinum: 185,
  titanium: 295,
};

// 80 PLUS standard efficiency curves at ~50% typical load
const TIER_EFFICIENCY = {
  bronze: 0.82,
  gold: 0.90,
  platinum: 0.92,
  titanium: 0.94,
};

export function InteractiveTco() {
  const [rate, setRate] = useState<number>(0.15); // $0.15 per kWh default
  const [hours, setHours] = useState<number>(6);   // 6 hours/day default
  const [years, setYears] = useState<number>(5);   // 5 years period default

  // Calculate sustained base draw dynamically based on selected workbench items
  const baseDraw = computed(() => {
    const cpuVal = selectedCpu.value;
    const gpuVal = selectedGpu.value;
    const ramVal = selectedRam.value;
    const storageVal = selectedStorage.value;
    const coolingVal = selectedCooling.value;
    const fansVal = fans.value;

    return calculateBaseDraw({
      cpu: cpuVal,
      gpu: gpuVal,
      ram: ramVal,
      storage: storageVal,
      cooling: coolingVal,
      fans: fansVal
    });
  });

  const activeDraw = baseDraw.value;

  // Calculate total costs (Purchase + Lifetime Electricity)
  const calcTco = (tier: 'bronze' | 'gold' | 'platinum' | 'titanium') => {
    const eff = TIER_EFFICIENCY[tier];
    const wallWatts = activeDraw / eff;
    const annualKwh = (wallWatts / 1000) * hours * 365;
    const annualCost = annualKwh * rate;
    const totalElectricity = annualCost * years;
    const totalTco = PURCHASE_COSTS[tier] + totalElectricity;

    return {
      purchase: PURCHASE_COSTS[tier],
      electricity: Math.round(totalElectricity),
      total: Math.round(totalTco),
    };
  };

  const bronze = calcTco('bronze');
  const gold = calcTco('gold');
  const platinum = calcTco('platinum');
  const titanium = calcTco('titanium');

  // Find max value to calibrate bar chart scaling
  const maxCost = Math.max(bronze.total, gold.total, platinum.total, titanium.total, 1);

  // Quick calculations for the verdict note
  const goldSavings = bronze.electricity - gold.electricity;
  const platSavings = bronze.electricity - platinum.electricity;
  const goldBreakeven = (PURCHASE_COSTS.gold - PURCHASE_COSTS.bronze) / (goldSavings / years || 1);
  const platBreakeven = (PURCHASE_COSTS.platinum - PURCHASE_COSTS.bronze) / (platSavings / years || 1);

  return (
    <div class="tco-interactive-wrapper card" style="padding: 2rem; background: var(--color-surface); border: 1px solid var(--color-border-subtle); border-radius: var(--radius-lg);">
      {/* Parameters Header */}
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
        {/* Active sustained draw stat */}
        <div style="display:flex; flex-direction:column; gap:0.25rem;">
          <span style="font-size:0.75rem;font-weight:700;color:var(--color-text-tertiary);text-transform:uppercase;">Active Build Draw</span>
          <span style="font-size:1.75rem;font-weight:900;color:var(--color-accent-cyan);" class="tabular">{activeDraw}W</span>
          <span style="font-size:0.7rem;color:var(--color-text-secondary);">Sustained power baseline</span>
        </div>

        {/* Electricity rate input */}
        <div style="display:flex; flex-direction:column; gap:0.25rem;">
          <label for="tco-rate" style="font-size:0.75rem;font-weight:700;color:var(--color-text-tertiary);text-transform:uppercase;">Electricity Cost</label>
          <div style="position:relative; display:flex; align-items:center;">
            <span style="position:absolute; left:10px; font-size:0.875rem; color:var(--color-text-tertiary); font-family:var(--font-mono); font-weight:700;">$</span>
            <input
              id="tco-rate"
              type="number"
              step="0.01"
              min="0.01"
              value={rate}
              onInput={(e) => setRate(Math.max(0.01, parseFloat((e.target as HTMLInputElement).value) || 0.01))}
              style="width: 100%; min-height: 40px; padding-left: 24px; padding-right: 48px; background: var(--color-surface-raised); border: 1px solid var(--color-border-subtle); color: var(--color-text-primary); border-radius: var(--radius-md); font-family:var(--font-mono); font-size:0.875rem;"
            />
            <span style="position:absolute; right:10px; font-size:0.75rem; color:var(--color-text-tertiary); font-weight:700;">/ kWh</span>
          </div>
          <span style="font-size:0.7rem;color:var(--color-text-secondary);">US avg is ~$0.15 - $0.17</span>
        </div>

        {/* Daily hours slider */}
        <div style="display:flex; flex-direction:column; gap:0.25rem;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <label for="tco-hours" style="font-size:0.75rem;font-weight:700;color:var(--color-text-tertiary);text-transform:uppercase;">Daily Usage</label>
            <span style="font-size:0.875rem;font-weight:700;color:var(--color-accent-cyan);" class="tabular">{hours} hrs</span>
          </div>
          <input
            id="tco-hours"
            type="range"
            min="1"
            max="24"
            value={hours}
            onInput={(e) => setHours(parseInt((e.target as HTMLInputElement).value, 10))}
            style="width: 100%; height: 6px; background: var(--color-surface-raised); border-radius: 3px; accent-color: var(--color-accent-cyan); cursor: pointer; min-height:30px;"
          />
          <span style="font-size:0.7rem;color:var(--color-text-secondary);">Gaming & productivity load time</span>
        </div>

        {/* Calculation period years */}
        <div style="display:flex; flex-direction:column; gap:0.25rem;">
          <label for="tco-years" style="font-size:0.75rem;font-weight:700;color:var(--color-text-tertiary);text-transform:uppercase;">Calculation Period</label>
          <select
            id="tco-years"
            value={years}
            onChange={(e) => setYears(parseInt((e.target as HTMLSelectElement).value, 10))}
            style="width:100%; min-height:40px; background:var(--color-surface-raised); border:1px solid var(--color-border-subtle); color:var(--color-text-primary); border-radius:var(--radius-md); padding:0 0.5rem; font-size:0.875rem;"
          >
            <option value={1}>1 Year</option>
            <option value={3}>3 Years</option>
            <option value={5}>5 Years</option>
            <option value={7}>7 Years</option>
            <option value={10}>10 Years</option>
          </select>
          <span style="font-size:0.7rem;color:var(--color-text-secondary);">PSU typical warranty: 5-10 yrs</span>
        </div>
      </div>

      {/* Dynamic Graph Chart */}
      <div style="display:flex; flex-direction:column; gap:1.25rem; margin-top:2rem;">
        {/* Bronze */}
        <div class="tco-tier">
          <div style="display:flex; justify-content:space-between; font-size:0.8125rem; font-weight:600; color:var(--color-text-secondary); margin-bottom:0.25rem;">
            <span>80+ Bronze</span>
            <span class="tabular">${bronze.total} total cost</span>
          </div>
          <div class="tco-bar-wrap" style="height:12px; background:var(--color-surface-raised); border-radius:6px; overflow:hidden; display:flex;">
            <div
              style={{
                width: `${(bronze.total / maxCost) * 100}%`,
                background: 'oklch(68% 0.22 15)', /* rose accent for highest cost */
                height: '100%',
                transition: 'width 300ms ease-out',
                borderRadius: '6px'
              }}
              title={`Bronze: $${bronze.purchase} unit + $${bronze.electricity} electricity`}
            />
          </div>
          <div style="display:flex; justify-content:space-between; font-size:0.7rem; color:var(--color-text-tertiary); margin-top:0.125rem;">
            <span>Purchase: ${bronze.purchase}</span>
            <span class="tabular">Electricity: ${bronze.electricity}</span>
          </div>
        </div>

        {/* Gold */}
        <div class="tco-tier">
          <div style="display:flex; justify-content:space-between; font-size:0.8125rem; font-weight:600; color:var(--color-text-secondary); margin-bottom:0.25rem;">
            <span>80+ Gold</span>
            <span class="tabular">${gold.total} total cost</span>
          </div>
          <div class="tco-bar-wrap" style="height:12px; background:var(--color-surface-raised); border-radius:6px; overflow:hidden; display:flex;">
            <div
              style={{
                width: `${(gold.total / maxCost) * 100}%`,
                background: 'oklch(80% 0.16 65)', /* gold/amber */
                height: '100%',
                transition: 'width 300ms ease-out',
                borderRadius: '6px'
              }}
              title={`Gold: $${gold.purchase} unit + $${gold.electricity} electricity`}
            />
          </div>
          <div style="display:flex; justify-content:space-between; font-size:0.7rem; color:var(--color-text-tertiary); margin-top:0.125rem;">
            <span>Purchase: ${gold.purchase}</span>
            <span class="tabular">Electricity: ${gold.electricity} (Saves ${bronze.electricity - gold.electricity})</span>
          </div>
        </div>

        {/* Platinum */}
        <div class="tco-tier">
          <div style="display:flex; justify-content:space-between; font-size:0.8125rem; font-weight:600; color:var(--color-text-secondary); margin-bottom:0.25rem;">
            <span style="display:flex;align-items:center;gap:6px;">
              80+ Platinum
              {platinum.total < bronze.total && (
                <span class="badge-safe" style="font-size:9px;padding:1px 5px;">Best ROI Value</span>
              )}
            </span>
            <span class="tabular" style={platinum.total < bronze.total ? "color:var(--color-safe);font-weight:700;" : ""}>
              ${platinum.total} total cost
            </span>
          </div>
          <div class="tco-bar-wrap" style="height:12px; background:var(--color-surface-raised); border-radius:6px; overflow:hidden; display:flex;">
            <div
              style={{
                width: `${(platinum.total / maxCost) * 100}%`,
                background: 'oklch(75% 0.18 152)', /* emerald */
                height: '100%',
                transition: 'width 300ms ease-out',
                borderRadius: '6px'
              }}
              title={`Platinum: $${platinum.purchase} unit + $${platinum.electricity} electricity`}
            />
          </div>
          <div style="display:flex; justify-content:space-between; font-size:0.7rem; color:var(--color-text-tertiary); margin-top:0.125rem;">
            <span>Purchase: ${platinum.purchase}</span>
            <span class="tabular">Electricity: ${platinum.electricity} (Saves ${bronze.electricity - platinum.electricity})</span>
          </div>
        </div>

        {/* Titanium */}
        <div class="tco-tier">
          <div style="display:flex; justify-content:space-between; font-size:0.8125rem; font-weight:600; color:var(--color-text-secondary); margin-bottom:0.25rem;">
            <span>80+ Titanium</span>
            <span class="tabular">${titanium.total} total cost</span>
          </div>
          <div class="tco-bar-wrap" style="height:12px; background:var(--color-surface-raised); border-radius:6px; overflow:hidden; display:flex;">
            <div
              style={{
                width: `${(titanium.total / maxCost) * 100}%`,
                background: 'oklch(85% 0.18 195)', /* cyan */
                height: '100%',
                transition: 'width 300ms ease-out',
                borderRadius: '6px'
              }}
              title={`Titanium: $${titanium.purchase} unit + $${titanium.electricity} electricity`}
            />
          </div>
          <div style="display:flex; justify-content:space-between; font-size:0.7rem; color:var(--color-text-tertiary); margin-top:0.125rem;">
            <span>Purchase: ${titanium.purchase}</span>
            <span class="tabular">Electricity: ${titanium.electricity} (Saves ${bronze.electricity - titanium.electricity})</span>
          </div>
        </div>
      </div>

      {/* Advisory Verdict Box */}
      <div style="margin-top: 2rem; padding: 1rem; background: var(--color-surface-raised); border-radius: var(--radius-md); border: 1px solid var(--color-border-subtle); font-size: 0.8125rem; color: var(--color-text-secondary); line-height: 1.5;">
        {goldSavings > 0 ? (
          <p>
            <strong>💡 ROI VERDICT:</strong> Upgrading from Bronze to a Gold power supply saves
            <strong> ${goldSavings}</strong> in electricity over {years} years. Given the ${PURCHASE_COSTS.gold - PURCHASE_COSTS.bronze} purchase premium,
            the Gold unit will **break even in {goldBreakeven.toFixed(1)} years**, after which it generates pure net savings.
            {platSavings > (PURCHASE_COSTS.platinum - PURCHASE_COSTS.bronze) && (
              <span> A Platinum unit saves <strong>${platSavings}</strong> in electricity and breaks even in **{platBreakeven.toFixed(1)} years** — making it the optimal financial choice.</span>
            )}
          </p>
        ) : (
          <p>Select components in the tray above to see custom electricity break-even thresholds.</p>
        )}
      </div>
    </div>
  );
}
