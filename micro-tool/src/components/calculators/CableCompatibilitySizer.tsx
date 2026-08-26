import { h } from 'preact';
import { useState, useMemo } from 'preact/hooks';
import type { PsuIndex } from '../../types/components';
import type { Locale } from '../../i18n/locales';
import { getCableCompatibilityTranslations } from '../../i18n/cableCompatibility';

interface ExtendedPsu extends PsuIndex {
  modularPinoutStandard?: string;
  cableType: string;
}

interface Props {
  psus: ExtendedPsu[];
  lang?: Locale;
}

export default function CableCompatibilitySizer({ psus, lang = 'en' }: Props) {
  const cct = getCableCompatibilityTranslations(lang);

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
      summary = cct.passTitle;
      details = cct.passIdenticalDetails(sourcePsu.name);
    } else if (sourceStandard === targetStandard && sourceStandard !== 'standard') {
      verdict = 'PASS';
      summary = `${cct.passTitle} (${sourceStandard.toUpperCase()})`;
      details = cct.passStandardDetails(sourceStandard);
    } else if (sourceBrand.toLowerCase() === targetBrand.toLowerCase()) {
      verdict = 'WARN';
      summary = cct.warnTitle(sourceBrand);
      details = cct.warnDetails(sourceBrand, sourceStandard, targetStandard);
    } else {
      verdict = 'FAIL';
      summary = cct.failTitle;
      details = cct.failDetails(sourcePsu.name, sourceBrand, targetPsu.name, targetBrand);
    }

    return { verdict, summary, details };
  }, [sourcePsuId, targetPsuId, sourcePsu, targetPsu, cct]);

  if (!result || !sourcePsu || !targetPsu) return null;

  const { verdict, summary, details } = result;

  return (
    <div style="display: grid; grid-template-columns: 1fr; gap: 2rem;">
      {/* Selection card */}
      <div class="card" style="padding: 1.5rem; background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); display: flex; flex-direction: column; gap: 1.25rem;">
        <h3 style="font-size: 1rem; font-weight: 700; margin: 0; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.5rem;">
          {cct.title}
        </h3>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem;">
          <div>
            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.5rem;">
              {cct.sourceLabel}
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
              {cct.targetLabel}
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
      <div
        class="card"
        style={{
          padding: '1.5rem',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          borderLeft: verdict === 'PASS' ? '4px solid var(--color-safe)' : verdict === 'WARN' ? '4px solid var(--color-warning)' : '4px solid var(--color-danger)'
        }}
      >
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem;">
          <span style="font-size: 0.75rem; font-weight: 700; color: var(--color-text-tertiary); text-transform: uppercase;">
            {cct.ruleTitle}
          </span>
          <span class={verdict === 'PASS' ? 'badge badge-safe' : verdict === 'WARN' ? 'badge badge-warning' : 'badge badge-danger'}>
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
