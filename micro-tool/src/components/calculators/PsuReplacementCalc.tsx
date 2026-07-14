import { h } from 'preact';
import { useState, useMemo } from 'preact/hooks';
import type { CpuIndex, GpuIndex, PsuIndex } from '../../types/components';
import { calculatePsuHealthScore, generateReplacementVerdict } from '../../lib/psu';

interface Props {
  cpus: CpuIndex[];
  gpus: GpuIndex[];
  psus: PsuIndex[];
}

export default function PsuReplacementCalc({ cpus, gpus, psus }: Props) {
  // Input states
  const [ratedWattage, setRatedWattage] = useState<number>(750);
  const [psuAgeYears, setPsuAgeYears] = useState<number>(5);
  const [efficiency, setEfficiency] = useState<string>('gold');
  const [atxVersion, setAtxVersion] = useState<'2.x' | '3.0' | '3.1'>('2.x');
  const [selectedGpuId, setSelectedGpuId] = useState<string>(gpus[0]?.id || '');
  const [selectedCpuId, setSelectedCpuId] = useState<string>(cpus[0]?.id || '');
  const [dailyHours, setDailyHours] = useState<number>(4);
  const [kwhRate, setKwhRate] = useState<number>(0.15);

  const selectedGpu = useMemo(() => gpus.find(g => g.id === selectedGpuId), [selectedGpuId, gpus]);
  const selectedCpu = useMemo(() => cpus.find(c => c.id === selectedCpuId), [selectedCpuId, cpus]);

  const calculations = useMemo(() => {
    if (!selectedGpu || !selectedCpu) return null;

    // Calculate transient peak draw
    const cpuTdp = selectedCpu.tdpSustained || selectedCpu.tdp;
    const gpuTbp = selectedGpu.tbp;

    // Standard additions matching engine
    const ramWatts = 10;
    const ssdWatts = 10;
    const fanWatts = 12;
    const overheadWatts = 15;
    const coolingWatts = 10;
    const baseDraw = cpuTdp + gpuTbp + ramWatts + ssdWatts + fanWatts + overheadWatts + coolingWatts;

    // Transient calculations
    const transientPeak = (cpuTdp * 1.20) + (gpuTbp * selectedGpu.transientMultiplier) + 32;

    const hasNative12v2x6 = selectedGpu.connectorType === '12v-2x6' && atxVersion !== '2.x';
    const connectorSafe = selectedGpu.connectorType !== '12v-2x6' || hasNative12v2x6;

    const health = calculatePsuHealthScore(
      psuAgeYears,
      ratedWattage,
      transientPeak,
      hasNative12v2x6,
      connectorSafe
    );

    // Recommended PSU capacity (requires ATX 3.1 rules)
    const safetyBuffer = 0.10; // Default 10% safety buffer
    const headroomMultiplier = atxVersion === '2.x' ? 1.35 : 1.20;
    let recommended = transientPeak * headroomMultiplier * (1 + safetyBuffer * 0.5);

    // Capacitor aging multiplier
    if (psuAgeYears > 3) {
      recommended *= (1 + (psuAgeYears - 3) * 0.05);
    }

    // Standard PSU tiers
    const standardWattages = [450, 500, 550, 600, 650, 700, 750, 800, 850, 1000, 1200, 1300, 1500, 1600];
    let recommendedWattage = 750;
    for (const wattage of standardWattages) {
      if (wattage >= recommended) {
        recommendedWattage = wattage;
        break;
      }
    }

    const verdict = generateReplacementVerdict(
      health.score,
      ratedWattage,
      health.effectiveCapacity,
      transientPeak,
      psuAgeYears,
      recommendedWattage,
      psus
    );

    return {
      transientPeak,
      health,
      verdict,
      recommendedWattage
    };
  }, [ratedWattage, psuAgeYears, efficiency, atxVersion, selectedGpuId, selectedCpuId, dailyHours, kwhRate, cpus, gpus, psus]);

  if (!calculations) return null;

  const { health, verdict, transientPeak, recommendedWattage } = calculations;

  const getVerdictBg = (action: string) => {
    if (action === 'keep') return 'var(--color-safe-bg)';
    if (action === 'plan') return 'var(--color-warning-bg)';
    return 'var(--color-danger-bg)';
  };

  const getVerdictBorder = (action: string) => {
    if (action === 'keep') return '1px solid var(--color-safe-border)';
    if (action === 'plan') return '1px solid var(--color-warning-border)';
    return '1px solid var(--color-danger-border)';
  };

  const getVerdictColor = (action: string) => {
    if (action === 'keep') return 'var(--color-safe)';
    if (action === 'plan') return 'var(--color-warning)';
    return 'var(--color-danger)';
  };

  return (
    <div style="display: grid; grid-template-columns: 1fr; gap: 2rem;">
      {/* Inputs block */}
      <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-secondary); border-radius: var(--radius-lg); display: flex; flex-direction: column; gap: 1.25rem;">
        <h3 style="font-size: 1rem; font-weight: 700; margin: 0; color: var(--text-primary); border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;">
          Current Power Supply Details
        </h3>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.25rem;">
          <div>
            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.5rem;">
              Rated PSU Wattage
            </label>
            <select
              value={ratedWattage}
              onChange={(e) => setRatedWattage(Number((e.target as HTMLSelectElement).value))}
              style="width: 100%; min-height: 40px; background: var(--bg-deep); border: 1px solid var(--border-subtle); color: var(--text-primary); border-radius: var(--radius-md); padding: 0 0.5rem; font-size: 0.875rem;"
            >
              {[450, 500, 550, 600, 650, 700, 750, 800, 850, 1000, 1200, 1300, 1500, 1600].map(w => (
                <option value={w}>{w} Watts</option>
              ))}
            </select>
          </div>

          <div>
            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.5rem; display: flex; justify-content: space-between;">
              <span>PSU Age</span>
              <span style="font-family: var(--font-mono); color: var(--color-accent-cyan);">{psuAgeYears} Years</span>
            </label>
            <input
              type="range"
              min="0"
              max="15"
              step="1"
              value={psuAgeYears}
              onInput={(e) => setPsuAgeYears(Number((e.target as HTMLInputElement).value))}
              style="width: 100%;"
            />
          </div>

          <div>
            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.5rem;">
              Efficiency Rating
            </label>
            <select
              value={efficiency}
              onChange={(e) => setEfficiency((e.target as HTMLSelectElement).value)}
              style="width: 100%; min-height: 40px; background: var(--bg-deep); border: 1px solid var(--border-subtle); color: var(--text-primary); border-radius: var(--radius-md); padding: 0 0.5rem; font-size: 0.875rem;"
            >
              <option value="bronze">80+ Bronze</option>
              <option value="gold">80+ Gold</option>
              <option value="platinum">80+ Platinum</option>
              <option value="titanium">80+ Titanium</option>
            </select>
          </div>

          <div>
            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.5rem;">
              ATX Specification
            </label>
            <select
              value={atxVersion}
              onChange={(e) => setAtxVersion((e.target as HTMLSelectElement).value as any)}
              style="width: 100%; min-height: 40px; background: var(--bg-deep); border: 1px solid var(--border-subtle); color: var(--text-primary); border-radius: var(--radius-md); padding: 0 0.5rem; font-size: 0.875rem;"
            >
              <option value="2.x">ATX 2.x (Legacy Standard)</option>
              <option value="3.0">ATX 3.0 (12VHPWR Gen)</option>
              <option value="3.1">ATX 3.1 (12V-2x6 Connector)</option>
            </select>
          </div>
        </div>

        <h3 style="font-size: 1rem; font-weight: 700; margin: 1rem 0 0; color: var(--text-primary); border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;">
          PC Hardware Specs
        </h3>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.25rem;">
          <div>
            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.5rem;">
              Graphics Card (GPU)
            </label>
            <select
              value={selectedGpuId}
              onChange={(e) => setSelectedGpuId((e.target as HTMLSelectElement).value)}
              style="width: 100%; min-height: 40px; background: var(--bg-deep); border: 1px solid var(--border-subtle); color: var(--text-primary); border-radius: var(--radius-md); padding: 0 0.5rem; font-size: 0.875rem;"
            >
              {gpus.map(g => (
                <option value={g.id}>{g.name} ({g.tbp}W)</option>
              ))}
            </select>
          </div>

          <div>
            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.5rem;">
              Processor (CPU)
            </label>
            <select
              value={selectedCpuId}
              onChange={(e) => setSelectedCpuId((e.target as HTMLSelectElement).value)}
              style="width: 100%; min-height: 40px; background: var(--bg-deep); border: 1px solid var(--border-subtle); color: var(--text-primary); border-radius: var(--radius-md); padding: 0 0.5rem; font-size: 0.875rem;"
            >
              {cpus.map(c => (
                <option value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.5rem; display: flex; justify-content: space-between;">
              <span>Usage Load Hours</span>
              <span style="font-family: var(--font-mono); color: var(--color-accent-cyan);">{dailyHours} Hr/Day</span>
            </label>
            <input
              type="range"
              min="1"
              max="24"
              step="1"
              value={dailyHours}
              onInput={(e) => setDailyHours(Number((e.target as HTMLInputElement).value))}
              style="width: 100%;"
            />
          </div>

          <div>
            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.5rem; display: flex; justify-content: space-between;">
              <span>Electricity Rate</span>
              <span style="font-family: var(--font-mono); color: var(--color-accent-cyan);">${kwhRate}/kWh</span>
            </label>
            <input
              type="number"
              step="0.01"
              min="0.05"
              max="1.0"
              value={kwhRate}
              onChange={(e) => setKwhRate(Number((e.target as HTMLInputElement).value))}
              style="width: 100%; min-height: 40px; background: var(--bg-deep); border: 1px solid var(--border-subtle); color: var(--text-primary); border-radius: var(--radius-md); padding: 0 0.5rem; font-size: 0.875rem;"
            />
          </div>
        </div>
      </div>

      {/* Outputs / Verdict Card */}
      <div
        class="card"
        style={{
          padding: '1.75rem',
          background: getVerdictBg(verdict.action),
          border: getVerdictBorder(verdict.action),
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div>
          <span style={`font-size:0.75rem; text-transform:uppercase; font-weight:700; color:${getVerdictColor(verdict.action)}; letter-spacing:0.05em;`}>
            Verdict: {verdict.urgency} Action
          </span>
          <h2 style={`font-size:2rem; font-weight:900; margin:0.25rem 0 0; color:var(--text-primary);`}>
            {verdict.action === 'replace' ? 'Replace Immediately' : verdict.action === 'plan' ? 'Upgrade Recommended' : 'PSU Safe to Keep'}
          </h2>
          <p style="font-size:0.95rem; color:var(--text-secondary); line-height:1.6; margin-top:0.75rem; max-width:75ch;">
            {verdict.reason}
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 1.25rem;">
          <div>
            <span style="font-size:0.7rem; color:var(--text-tertiary); text-transform:uppercase; font-weight:700; display:block;">PSU Health Score</span>
            <strong style={`font-size:1.5rem; color:${getVerdictColor(verdict.action)}; font-family:var(--font-mono); font-weight:800;`}>
              {health.score}/100
            </strong>
          </div>
          <div>
            <span style="font-size:0.7rem; color:var(--text-tertiary); text-transform:uppercase; font-weight:700; display:block;">Effective Output</span>
            <strong style="font-size:1.5rem; color:var(--text-primary); font-family:var(--font-mono); font-weight:800;">
              {health.effectiveCapacity}W <span style="font-size:0.8rem; font-weight:400; color:var(--text-tertiary);">(Rated {ratedWattage}W)</span>
            </strong>
          </div>
          <div>
            <span style="font-size:0.7rem; color:var(--text-tertiary); text-transform:uppercase; font-weight:700; display:block;">Calculated Peak Draw</span>
            <strong style="font-size:1.5rem; color:var(--text-primary); font-family:var(--font-mono); font-weight:800;">
              {Math.round(transientPeak)}W
            </strong>
          </div>
          <div>
            <span style="font-size:0.7rem; color:var(--text-tertiary); text-transform:uppercase; font-weight:700; display:block;">Estimated Safe Lifespan</span>
            <strong style="font-size:1.5rem; color:var(--text-primary); font-family:var(--font-mono); font-weight:800;">
              ~{verdict.estimatedLifespan} Years
            </strong>
          </div>
        </div>

        {/* Cost benefit section */}
        <div style="padding:1rem; background:rgba(255,255,255,0.02); border-left:3px solid var(--color-accent-cyan); border-radius:var(--radius-sm); font-size:0.875rem; color:var(--text-secondary); line-height:1.5;">
          <strong>💡 Cost-Benefit Insight:</strong> {verdict.costBenefit}
        </div>

        {/* Recommended Replacements */}
        {verdict.action !== 'keep' && verdict.recommendedPsus.length > 0 && (
          <div style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 1.25rem;">
            <h4 style="font-size:0.875rem; font-weight:700; text-transform:uppercase; color:var(--text-primary); margin:0 0 1rem; letter-spacing:0.05em;">
              Recommended Replacement Power Supplies
            </h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
              {verdict.recommendedPsus.map(p => (
                <div class="card" style="padding: 1rem; background: var(--bg-deep); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 0.5rem;">
                  <strong style="font-size:0.9rem; color:var(--text-primary);">{p.name}</strong>
                  <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--text-secondary);">
                    <span>Wattage: {p.wattage}W</span>
                    <span>ATX {p.atxVersion}</span>
                  </div>
                  <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--text-secondary);">
                    <span style="text-transform:uppercase; font-weight:700; color:var(--color-accent-cyan);">{p.efficiencyTier}</span>
                    <strong style="color:var(--text-primary);">${p.price}</strong>
                  </div>
                  <a
                    href={`https://www.amazon.com/s?k=${encodeURIComponent(p.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style="margin-top:0.5rem; text-align:center; padding:6px 12px; font-size:0.7rem; font-weight:700; background:rgba(0, 229, 255, 0.08); border:1px solid var(--border-accent); color:var(--color-accent-cyan); border-radius:4px; text-decoration:none; display:block;"
                  >
                    View on Amazon
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
