import { useState } from 'preact/hooks';

interface TcoPreset {
  name: string;
  loadWatts: number;
}

const DESKTOP_PRESETS: TcoPreset[] = [
  { name: 'Budget PC (Ryzen 5 + RTX 4060)', loadWatts: 180 },
  { name: 'Mid-Range PC (Ryzen 7 + RTX 4070 SUPER)', loadWatts: 350 },
  { name: 'High-End PC (Ryzen 7 + RTX 5080)', loadWatts: 550 },
  { name: 'Enthusiast PC (Intel i9 + RTX 5090)', loadWatts: 800 }
];

const LAPTOP_PRESETS: TcoPreset[] = [
  { name: 'Thin & Light (MacBook Pro / Office)', loadWatts: 30 },
  { name: 'Productivity Laptop (Dell XPS / Creator)', loadWatts: 85 },
  { name: 'High-End Gaming Laptop (ASUS G14 / Blade)', loadWatts: 180 }
];

export default function DesktopVsLaptopTco() {
  // States for Desktop specs
  const [desktopPresetIdx, setDesktopPresetIdx] = useState(1); // Mid-range default
  const [desktopCustomWatts, setDesktopCustomWatts] = useState(350);
  const [isDesktopCustom, setIsDesktopCustom] = useState(false);

  // States for Laptop specs
  const [laptopPresetIdx, setLaptopPresetIdx] = useState(2); // Gaming Laptop default
  const [laptopCustomWatts, setLaptopCustomWatts] = useState(180);
  const [isLaptopCustom, setIsLaptopCustom] = useState(false);

  // General parameters
  const [hoursGaming, setHoursGaming] = useState(4); // 4 hours/day under load
  const [hoursOffice, setHoursOffice] = useState(4); // 4 hours/day under light idle load
  const [kwhRate, setKwhRate] = useState(0.16); // $0.16/kWh
  const [timeHorizon, setTimeHorizon] = useState(5); // 5 years

  // Setup actual watts
  const desktopWatts = isDesktopCustom ? desktopCustomWatts : DESKTOP_PRESETS[desktopPresetIdx].loadWatts;
  // Idle load is assumed to be 20% of peak under standard office tasks
  const desktopIdleWatts = Math.round(desktopWatts * 0.2);

  const laptopWatts = isLaptopCustom ? laptopCustomWatts : LAPTOP_PRESETS[laptopPresetIdx].loadWatts;
  const laptopIdleWatts = Math.round(laptopWatts * 0.15); // Laptops idle lower

  // Calculations
  const gamingHoursPerYear = hoursGaming * 365;
  const officeHoursPerYear = hoursOffice * 365;

  // Desktop power calculations
  const desktopGamingKwh = (desktopWatts / 1000) * gamingHoursPerYear;
  const desktopOfficeKwh = (desktopIdleWatts / 1000) * officeHoursPerYear;
  const totalDesktopKwhYear = desktopGamingKwh + desktopOfficeKwh;
  const desktopCostPerYear = totalDesktopKwhYear * kwhRate;
  const desktopCostHorizon = desktopCostPerYear * timeHorizon;

  // Laptop power calculations
  const laptopGamingKwh = (laptopWatts / 1000) * gamingHoursPerYear;
  const laptopOfficeKwh = (laptopIdleWatts / 1000) * officeHoursPerYear;
  const totalLaptopKwhYear = laptopGamingKwh + laptopOfficeKwh;
  const laptopCostPerYear = totalLaptopKwhYear * kwhRate;
  const laptopCostHorizon = laptopCostPerYear * timeHorizon;

  // Savings
  const savingsPerYear = Math.round(Math.abs(desktopCostPerYear - laptopCostPerYear));
  const savingsHorizon = Math.round(Math.abs(desktopCostHorizon - laptopCostHorizon));
  const betterOption = desktopCostPerYear <= laptopCostPerYear ? 'Desktop' : 'Laptop';

  return (
    <div class="tco-calculator-box">
      <div class="tco-control-grid">
        {/* Left Side: Parameters */}
        <div class="card card-dark" style="padding: 1.5rem; display:flex; flex-direction:column; gap:1.25rem;">
          <h2 style="font-size:1.15rem; font-weight:700; color:var(--text-primary); margin:0;">1. Sizing Presets</h2>
          
          {/* Desktop Selection */}
          <div>
            <label class="input-label" style="display:block; margin-bottom:0.5rem; font-weight:700;">Desktop Config</label>
            <div style="display:grid; grid-template-columns:1fr; gap:0.5rem;">
              <select
                class="form-input"
                style="width: 100%;"
                value={isDesktopCustom ? 'custom' : desktopPresetIdx.toString()}
                onChange={(e) => {
                  const val = e.currentTarget.value;
                  if (val === 'custom') {
                    setIsDesktopCustom(true);
                  } else {
                    setIsDesktopCustom(false);
                    setDesktopPresetIdx(parseInt(val, 10));
                  }
                }}
              >
                {DESKTOP_PRESETS.map((preset, idx) => (
                  <option key={idx} value={idx.toString()}>{preset.name} ({preset.loadWatts}W)</option>
                ))}
                <option value="custom">Custom Power Rating</option>
              </select>
              {isDesktopCustom && (
                <div style="margin-top:0.25rem;">
                  <label style="font-size:0.75rem; color:var(--text-tertiary);">Custom Gaming Load (W): {desktopCustomWatts}W</label>
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="10"
                    value={desktopCustomWatts}
                    onInput={(e) => setDesktopCustomWatts(parseInt(e.currentTarget.value, 10))}
                    style="width:100%; accent-color:var(--color-accent-cyan);"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Laptop Selection */}
          <div>
            <label class="input-label" style="display:block; margin-bottom:0.5rem; font-weight:700;">Laptop Config</label>
            <div style="display:grid; grid-template-columns:1fr; gap:0.5rem;">
              <select
                class="form-input"
                style="width: 100%;"
                value={isLaptopCustom ? 'custom' : laptopPresetIdx.toString()}
                onChange={(e) => {
                  const val = e.currentTarget.value;
                  if (val === 'custom') {
                    setIsLaptopCustom(true);
                  } else {
                    setIsLaptopCustom(false);
                    setLaptopPresetIdx(parseInt(val, 10));
                  }
                }}
              >
                {LAPTOP_PRESETS.map((preset, idx) => (
                  <option key={idx} value={idx.toString()}>{preset.name} ({preset.loadWatts}W)</option>
                ))}
                <option value="custom">Custom Power Rating</option>
              </select>
              {isLaptopCustom && (
                <div style="margin-top:0.25rem;">
                  <label style="font-size:0.75rem; color:var(--text-tertiary);">Custom Gaming Load (W): {laptopCustomWatts}W</label>
                  <input
                    type="range"
                    min="15"
                    max="330"
                    step="5"
                    value={laptopCustomWatts}
                    onInput={(e) => setLaptopCustomWatts(parseInt(e.currentTarget.value, 10))}
                    style="width:100%; accent-color:var(--color-accent-cyan);"
                  />
                </div>
              )}
            </div>
          </div>

          <hr style="border: 0; border-top:1px solid var(--color-border-subtle); margin:0.5rem 0;" />

          <h2 style="font-size:1.15rem; font-weight:700; color:var(--text-primary); margin:0;">2. Usage & Cost Parameters</h2>

          {/* Gaming Hours */}
          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.875rem; color:var(--text-secondary); margin-bottom:0.25rem;">
              <span>Heavy Usage (Gaming/Load)</span>
              <span class="tabular" style="font-weight:700; color:var(--text-primary);">{hoursGaming} hr/day</span>
            </div>
            <input
              type="range"
              min="0"
              max="16"
              step="0.5"
              value={hoursGaming}
              onInput={(e) => setHoursGaming(parseFloat(e.currentTarget.value))}
              style="width:100%; accent-color:var(--color-accent-cyan);"
            />
          </div>

          {/* Idle Hours */}
          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.875rem; color:var(--text-secondary); margin-bottom:0.25rem;">
              <span>Light Usage (Office/Idle)</span>
              <span class="tabular" style="font-weight:700; color:var(--text-primary);">{hoursOffice} hr/day</span>
            </div>
            <input
              type="range"
              min="0"
              max="24"
              step="0.5"
              value={hoursOffice}
              onInput={(e) => setHoursOffice(parseFloat(e.currentTarget.value))}
              style="width:100%; accent-color:var(--color-accent-cyan);"
            />
          </div>

          {/* Electricity Rate */}
          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.875rem; color:var(--text-secondary); margin-bottom:0.25rem;">
              <span>Electricity Rate</span>
              <span class="tabular" style="font-weight:700; color:var(--text-primary);">${kwhRate.toFixed(2)}/kWh</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.50"
              step="0.01"
              value={kwhRate}
              onInput={(e) => setKwhRate(parseFloat(e.currentTarget.value))}
              style="width:100%; accent-color:var(--color-accent-cyan);"
            />
          </div>

          {/* Timeline */}
          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.875rem; color:var(--text-secondary); margin-bottom:0.25rem;">
              <span>Timeline Horizon</span>
              <span class="tabular" style="font-weight:700; color:var(--text-primary);">{timeHorizon} Years</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={timeHorizon}
              onInput={(e) => setTimeHorizon(parseInt(e.currentTarget.value, 10))}
              style="width:100%; accent-color:var(--color-accent-cyan);"
            />
          </div>
        </div>

        {/* Right Side: Projections & Chart */}
        <div class="card card-dark" style="padding: 1.5rem; display:flex; flex-direction:column; justify-content:space-between; gap:1.5rem;">
          <div>
            <h2 style="font-size:1.15rem; font-weight:700; color:var(--text-primary); margin:0;">3. Cost Comparison Projections</h2>
            
            {/* Verdict Box */}
            <div style={`margin-top:1.25rem; padding:1.25rem; border-radius:var(--radius-lg); border: 2px solid ${betterOption === 'Laptop' ? 'var(--color-accent-cyan)' : 'var(--color-accent-purple)'}; background:rgba(0, 229, 255, 0.03);`}>
              <span style="font-size:0.6875rem; font-weight:700; text-transform:uppercase; color:var(--text-tertiary); letter-spacing:0.06em;">Efficiency Verdict</span>
              <h3 style="font-size:1.25rem; font-weight:800; margin:0.25rem 0 0.5rem; color:var(--text-primary);">
                The {betterOption} Saves You Money
              </h3>
              <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.5; margin:0;">
                By using a {betterOption === 'Laptop' ? 'laptop' : 'desktop'}, you reduce your electric bill by approximately <strong>${savingsPerYear} per year</strong>, saving <strong>${savingsHorizon} over your {timeHorizon}-year timeline</strong>.
              </p>
            </div>

            {/* Comparison Metrics */}
            <div style="display:flex; flex-direction:column; gap:0.75rem; margin-top:1.5rem;">
              <div class="tco-comp-row">
                <span style="color:var(--text-secondary);">Operating Mode Draw</span>
                <span class="tabular" style="font-weight:700;"><span style="color:var(--color-accent-purple);">{desktopWatts}W</span> vs <span style="color:var(--color-accent-cyan);">{laptopWatts}W</span></span>
              </div>
              <div class="tco-comp-row">
                <span style="color:var(--text-secondary);">Idle/Office Mode Draw</span>
                <span class="tabular" style="font-weight:700;"><span style="color:var(--color-accent-purple);">{desktopIdleWatts}W</span> vs <span style="color:var(--color-accent-cyan);">{laptopIdleWatts}W</span></span>
              </div>
              <div class="tco-comp-row">
                <span style="color:var(--text-secondary);">Annual Power Consumption</span>
                <span class="tabular" style="font-weight:700;"><span style="color:var(--color-accent-purple);">{Math.round(totalDesktopKwhYear)} kWh</span> vs <span style="color:var(--color-accent-cyan);">{Math.round(totalLaptopKwhYear)} kWh</span></span>
              </div>
            </div>
          </div>

          {/* Visual Bars */}
          <div style="display:flex; flex-direction:column; gap:1rem;">
            <div>
              <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--text-secondary); margin-bottom:0.25rem;">
                <span>Desktop PC {timeHorizon}-Yr Cost</span>
                <span class="tabular" style="font-weight:700; color:var(--color-accent-purple);">${Math.round(desktopCostHorizon)}</span>
              </div>
              <div style="height:24px; background:var(--color-bg-secondary); border-radius:4px; overflow:hidden;">
                <div style={`height:100%; background:linear-gradient(90deg, var(--color-accent-purple), #c084fc); width:${Math.max(10, Math.min(100, (desktopCostHorizon / Math.max(desktopCostHorizon, laptopCostHorizon)) * 100))}%`}></div>
              </div>
            </div>

            <div>
              <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--text-secondary); margin-bottom:0.25rem;">
                <span>Laptop {timeHorizon}-Yr Cost</span>
                <span class="tabular" style="font-weight:700; color:var(--color-accent-cyan);">${Math.round(laptopCostHorizon)}</span>
              </div>
              <div style="height:24px; background:var(--color-bg-secondary); border-radius:4px; overflow:hidden;">
                <div style={`height:100%; background:linear-gradient(90deg, var(--color-accent-cyan), #38bdf8); width:${Math.max(10, Math.min(100, (laptopCostHorizon / Math.max(desktopCostHorizon, laptopCostHorizon)) * 100))}%`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .tco-calculator-box {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .tco-control-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .tco-control-grid {
            grid-template-columns: 1fr 1.2fr;
          }
        }
        .form-input {
          background: var(--color-surface-raised);
          border: 1px solid var(--color-border-subtle);
          color: var(--color-text-primary);
          padding: 0.625rem 0.75rem;
          border-radius: var(--radius-md, 8px);
          font-size: 0.875rem;
        }
        .form-input:focus {
          border-color: var(--color-accent-cyan);
          outline: none;
        }
        .tco-comp-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8125rem;
          padding-bottom: 0.625rem;
          border-bottom: 1px solid var(--color-border-subtle);
        }
      `}</style>
    </div>
  );
}
