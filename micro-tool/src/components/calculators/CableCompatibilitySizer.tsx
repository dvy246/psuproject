import { h } from 'preact';
import { useState, useMemo } from 'preact/hooks';
import type { PsuIndex } from '../../types/components';

interface ExtendedPsu extends PsuIndex {
  modularPinoutStandard?: string;
  cableType: string;
}

interface Props {
  psus: ExtendedPsu[];
}

export default function CableCompatibilitySizer({ psus }: Props) {
  // Input states
  const [sourcePsuId, setSourcePsuId] = useState<string>(psus[0]?.id || '');
  const [targetPsuId, setTargetPsuId] = useState<string>(psus[1]?.id || '');

  const sourcePsu = useMemo(() => psus.find(p => p.id === sourcePsuId), [sourcePsuId, psus]);
  const targetPsu = useMemo(() => psus.find(p => p.id === targetPsuId), [targetPsuId, psus]);

  const result = useMemo(() => {
    if (!sourcePsu || !targetPsu) return null;

    const sourceStandard = sourcePsu.modularPinoutStandard || 'standard';
    const targetStandard = targetPsu.modularPinoutStandard || 'standard';
    const sourceBrand = sourcePsu.brand;
    const targetBrand = targetPsu.brand;

    let verdict: 'PASS' | 'WARN' | 'FAIL' = 'FAIL';
    let summary = '';
    let details = '';

    if (sourcePsuId === targetPsuId) {
      verdict = 'PASS';
      summary = 'Fully Compatible (Identical Models)';
      details = `Both power supplies are the exact same model (${sourcePsu.name}). You can safely reuse and swap modular cables between them.`;
    } else if (sourceStandard === targetStandard && sourceStandard !== 'standard') {
      verdict = 'PASS';
      summary = `Compatible (${sourceStandard.toUpperCase()} Pinout)`;
      details = `Yes! Both units share the identical '${sourceStandard}' modular pinout standard. Modular cables for PCIe, EPS, and SATA are fully interchangeable between these models.`;
    } else if (sourceBrand.toLowerCase() === targetBrand.toLowerCase()) {
      verdict = 'WARN';
      summary = `Partial Compatibility / Risk (${sourceBrand} Brand)`;
      details = `Caution: While both power supplies are manufactured by ${sourceBrand}, they use different modular standards ('${sourceStandard}' vs '${targetStandard}'). Corsair Type 3 and Type 4, for instance, have different 24-pin ATX layouts. Reusing cables without verifying pins poses a high risk.`;
    } else {
      verdict = 'FAIL';
      summary = 'DANGEROUS — INCOMPATIBLE';
      details = `DANGER! Plugging cables from a ${sourcePsu.name} (${sourceBrand}) into a ${targetPsu.name} (${targetBrand}) will short-circuit your PC components. The PSU-side pinout layout is completely different. Reusing modular cables across different manufacturers is guaranteed to fry components.`;
    }

    return { verdict, summary, details };
  }, [sourcePsuId, targetPsuId, sourcePsu, targetPsu]);

  if (!result || !sourcePsu || !targetPsu) return null;

  const { verdict, summary, details } = result;

  return (
    <div style="display: grid; grid-template-columns: 1fr; gap: 2rem;">
      {/* Selection card */}
      <div class="card" style="padding: 1.5rem; background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); display: flex; flex-direction: column; gap: 1.25rem;">
        <h3 style="font-size: 1rem; font-weight: 700; margin: 0; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.5rem;">
          Compare PSU Modular Cables
        </h3>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem;">
          <div>
            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.5rem;">
              Source PSU (Cables you want to reuse)
            </label>
            <select
              value={sourcePsuId}
              onChange={(e) => setSourcePsuId((e.target as HTMLSelectElement).value)}
              style="width: 100%; min-height: 40px; background: var(--bg-deep); border: 1px solid var(--border-subtle); color: var(--text-primary); border-radius: var(--radius-md); padding: 0 0.5rem; font-size: 0.875rem;"
            >
              {psus.map(p => (
                <option value={p.id}>{p.brand} {p.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.5rem;">
              Target PSU (PSU you are upgrading to)
            </label>
            <select
              value={targetPsuId}
              onChange={(e) => setTargetPsuId((e.target as HTMLSelectElement).value)}
              style="width: 100%; min-height: 40px; background: var(--bg-deep); border: 1px solid var(--border-subtle); color: var(--text-primary); border-radius: var(--radius-md); padding: 0 0.5rem; font-size: 0.875rem;"
            >
              {psus.map(p => (
                <option value={p.id}>{p.brand} {p.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Verdict Panel */}
      <div class="card" style={`padding: 1.5rem; border-left: 4px solid ${verdict === 'PASS' ? 'var(--color-safe)' : verdict === 'WARN' ? 'var(--color-warning)' : 'var(--color-danger)'};`}>
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
          <span class={`badge ${verdict === 'PASS' ? 'badge-safe' : verdict === 'WARN' ? 'badge-warning' : 'badge-danger'}`} style="font-size: 0.85rem; padding: 4px 10px;">
            {summary}
          </span>
        </div>
        <p style="font-size: 1rem; line-height: 1.6; color: var(--color-text-primary); margin: 0;">
          {details}
        </p>
      </div>
    </div>
  );
}
