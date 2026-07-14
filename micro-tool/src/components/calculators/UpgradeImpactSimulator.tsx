import { h } from 'preact';
import { useState, useMemo } from 'preact/hooks';
import type { CpuIndex, GpuIndex, PsuIndex } from '../../types/components';

interface CaseIndex {
  id: string;
  brand: string;
  name: string;
  formFactor: string;
  maxGpuLength: number;
  maxGpuLengthWithRad360: number;
  maxGpuLengthWithRad280: number;
  maxGpuLengthWithRad240: number;
  maxCoolerHeight: number;
  maxPsuLength: number;
  psuFormFactor: string[];
  gpuWidthMax: number;
}

interface Props {
  cpus: CpuIndex[];
  gpus: GpuIndex[];
  psus: PsuIndex[];
  cases: CaseIndex[];
}

export default function UpgradeImpactSimulator({ cpus, gpus, psus, cases }: Props) {
  // Input states
  const [cpuId, setCpuId] = useState<string>(cpus[0]?.id || '');
  const [currentGpuId, setCurrentGpuId] = useState<string>(gpus.find(g => g.id.includes('3070'))?.id || gpus[0]?.id || '');
  const [targetGpuId, setTargetGpuId] = useState<string>(gpus.find(g => g.id.includes('5080'))?.id || gpus[1]?.id || '');
  const [ratedWattage, setRatedWattage] = useState<number>(750);
  const [psuAge, setPsuAge] = useState<number>(3);
  const [caseId, setCaseId] = useState<string>(cases[0]?.id || '');

  const currentGpu = useMemo(() => gpus.find(g => g.id === currentGpuId), [currentGpuId, gpus]);
  const targetGpu = useMemo(() => gpus.find(g => g.id === targetGpuId), [targetGpuId, gpus]);
  const selectedCpu = useMemo(() => cpus.find(c => c.id === cpuId), [cpuId, cpus]);
  const selectedCase = useMemo(() => cases.find(c => c.id === caseId), [caseId, cases]);

  const calculations = useMemo(() => {
    if (!currentGpu || !targetGpu || !selectedCpu || !selectedCase) return null;

    const cpuTdp = selectedCpu.tdpSustained || selectedCpu.tdp;
    const additionsWatts = 57;

    // Current setup
    const currentBase = cpuTdp + currentGpu.tbp + additionsWatts;
    const currentPeak = Math.round((cpuTdp * 1.20) + (currentGpu.tbp * currentGpu.transientMultiplier) + 32);

    // Target setup
    const targetBase = cpuTdp + targetGpu.tbp + additionsWatts;
    const targetPeak = Math.round((cpuTdp * 1.20) + (targetGpu.tbp * targetGpu.transientMultiplier) + 32);

    // Deltas
    const baseDelta = targetBase - currentBase;
    const peakDelta = targetPeak - currentPeak;

    // Aging derating
    const agingLoss = psuAge <= 3 ? 0 : (psuAge - 3) * 0.05;
    const effectiveCapacity = Math.round(ratedWattage * (1 - agingLoss));

    // Clearances
    // We check target GPU length vs case clearance
    const allowedLength = selectedCase.maxGpuLength;
    const lengthFits = targetGpu.dimensions?.length <= allowedLength;

    // Verdict sizing
    const safetyBuffer = 0.15;
    const isSafe = effectiveCapacity >= targetPeak * (1 + safetyBuffer * 0.5);
    const isBorderline = effectiveCapacity >= targetPeak && effectiveCapacity < targetPeak * (1 + safetyBuffer * 0.5);

    let powerVerdict: 'PASS' | 'WARN' | 'FAIL' = 'FAIL';
    if (isSafe) powerVerdict = 'PASS';
    else if (isBorderline) powerVerdict = 'WARN';

    return {
      currentBase,
      currentPeak,
      targetBase,
      targetPeak,
      baseDelta,
      peakDelta,
      effectiveCapacity,
      agingLossFactor: agingLoss,
      allowedLength,
      lengthFits,
      powerVerdict
    };
  }, [currentGpuId, targetGpuId, cpuId, ratedWattage, psuAge, caseId, cpus, gpus, psus, cases]);

  if (!calculations || !currentGpu || !targetGpu || !selectedCase) return null;

  const {
    currentBase,
    currentPeak,
    targetBase,
    targetPeak,
    baseDelta,
    peakDelta,
    effectiveCapacity,
    agingLossFactor,
    allowedLength,
    lengthFits,
    powerVerdict
  } = calculations;

  return (
    <div style="display: grid; grid-template-columns: 1fr; gap: 2rem;">
      {/* Parameters deck */}
      <div class="card" style="padding: 1.5rem; background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); display: flex; flex-direction: column; gap: 1.25rem;">
        <h3 style="font-size: 1rem; font-weight: 700; margin: 0; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.5rem;">
          Upgrade Configuration
        </h3>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1.25rem;">
          <div>
            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.5rem;">
              Current Graphics Card (GPU)
            </label>
            <select
              value={currentGpuId}
              onChange={(e) => setCurrentGpuId((e.target as HTMLSelectElement).value)}
              style="width: 100%; min-height: 40px; background: var(--bg-deep); border: 1px solid var(--border-subtle); color: var(--text-primary); border-radius: var(--radius-md); padding: 0 0.5rem; font-size: 0.875rem;"
            >
              {gpus.map(g => (
                <option value={g.id}>{g.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.5rem;">
              Target Upgrade GPU
            </label>
            <select
              value={targetGpuId}
              onChange={(e) => setTargetGpuId((e.target as HTMLSelectElement).value)}
              style="width: 100%; min-height: 40px; background: var(--bg-deep); border: 1px solid var(--border-subtle); color: var(--text-primary); border-radius: var(--radius-md); padding: 0 0.5rem; font-size: 0.875rem;"
            >
              {gpus.map(g => (
                <option value={g.id}>{g.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.5rem;">
              Current PSU Rating
            </label>
            <select
              value={ratedWattage}
              onChange={(e) => setRatedWattage(Number((e.target as HTMLSelectElement).value))}
              style="width: 100%; min-height: 40px; background: var(--bg-deep); border: 1px solid var(--border-subtle); color: var(--text-primary); border-radius: var(--radius-md); padding: 0 0.5rem; font-size: 0.875rem;"
            >
              {[550, 650, 750, 850, 1000, 1200].map(w => (
                <option value={w}>{w}W PSU</option>
              ))}
            </select>
          </div>

          <div>
            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.5rem; display: flex; justify-content: space-between;">
              <span>PSU Age</span>
              <span style="color: var(--color-accent-cyan); font-family: var(--font-mono);">{psuAge} years</span>
            </label>
            <input
              type="range" min="0" max="15" step="1"
              value={psuAge}
              onInput={(e) => setPsuAge(Number((e.target as HTMLInputElement).value))}
              style="width: 100%;"
            />
          </div>

          <div>
            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.5rem;">
              PC Case
            </label>
            <select
              value={caseId}
              onChange={(e) => setCaseId((e.target as HTMLSelectElement).value)}
              style="width: 100%; min-height: 40px; background: var(--bg-deep); border: 1px solid var(--border-subtle); color: var(--text-primary); border-radius: var(--radius-md); padding: 0 0.5rem; font-size: 0.875rem;"
            >
              {cases.map(c => (
                <option value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.5rem;">
              CPU
            </label>
            <select
              value={cpuId}
              onChange={(e) => setCpuId((e.target as HTMLSelectElement).value)}
              style="width: 100%; min-height: 40px; background: var(--bg-deep); border: 1px solid var(--border-subtle); color: var(--text-primary); border-radius: var(--radius-md); padding: 0 0.5rem; font-size: 0.875rem;"
            >
              {cpus.map(c => (
                <option value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Simulator Verdict Grid */}
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
        {/* Power Safety */}
        <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg);">
          <h3 style="font-size: 1rem; font-weight: 700; margin: 0 0 1rem; color: var(--text-primary); text-transform: uppercase;">⚡ Power Capacity Delta</h3>
          <div style="font-size: 0.875rem; color: var(--color-text-secondary); line-height: 1.5;">
            <p>Sustained draw shift: <strong>{currentBase}W</strong> → <strong>{targetBase}W</strong> ({baseDelta >= 0 ? `+${baseDelta}` : baseDelta}W)</p>
            <p>Peak transient shift: <strong>{currentPeak}W</strong> → <strong>{targetPeak}W</strong> ({peakDelta >= 0 ? `+${peakDelta}` : peakDelta}W)</p>
            <p>Age-derated PSU capacity: <strong>{effectiveCapacity}W</strong> (rated {ratedWattage}W)</p>
            <div style="margin-top: 1rem;">
              <span class={`badge ${powerVerdict === 'PASS' ? 'badge-safe' : powerVerdict === 'WARN' ? 'badge-warning' : 'badge-danger'}`}>
                {powerVerdict === 'PASS' ? 'Safe Wattage' : powerVerdict === 'WARN' ? 'Borderline Headroom' : 'PSU Upgrade Required'}
              </span>
            </div>
          </div>
        </div>

        {/* Physical clearance */}
        <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg);">
          <h3 style="font-size: 1rem; font-weight: 700; margin: 0 0 1rem; color: var(--text-primary); text-transform: uppercase;">📏 Physical fit Delta</h3>
          <div style="font-size: 0.875rem; color: var(--color-text-secondary); line-height: 1.5;">
            <p>Target GPU Length: <strong>{targetGpu.dimensions?.length}mm</strong></p>
            <p>Case Max GPU Clearance: <strong>{allowedLength}mm</strong></p>
            <p>Fit Verdict: <strong>{lengthFits ? '✅ Fits' : '❌ Too Long'}</strong></p>
            <div style="margin-top: 1.5rem;">
              <span class={`badge ${lengthFits ? 'badge-safe' : 'badge-danger'}`}>
                {lengthFits ? 'Clearance PASS' : 'Clearance FAIL'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
