import { h } from 'preact';
import { useState, useMemo } from 'preact/hooks';
import type { CpuIndex, GpuIndex, PsuIndex } from '../../types/components';
import { useTranslations, type Locale } from '../../i18n';

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
  lang?: Locale;
}

export default function UpgradeImpactSimulator({ cpus, gpus, psus, cases, lang = 'en' }: Props) {
  const t = useTranslations(lang);

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
    allowedLength,
    lengthFits,
    powerVerdict
  } = calculations;

  const headingTitle = lang === 'de' ? 'Upgrade-Auswirkungs-Simulator' : lang === 'es' ? 'Simulador de Impacto de Actualización' : lang === 'fr' ? 'Simulateur d\'Impact d\'Upgrade' : lang === 'ja' ? 'パーツ換装・影響シミュレーター' : lang === 'zh' ? '硬件升级换装影响模拟器' : 'Upgrade Impact Simulator';
  const currGpuLabel = lang === 'de' ? 'Aktuelle Grafikkarte' : lang === 'es' ? 'Tarjeta Gráfica Actual' : lang === 'fr' ? 'Carte Graphique Actuelle' : lang === 'ja' ? '現在のグラフィックボード' : lang === 'zh' ? '当前在用显卡' : 'Current Graphics Card';
  const targetGpuLabel = lang === 'de' ? 'Geplante Upgrade-GPU' : lang === 'es' ? 'GPU de Actualización' : lang === 'fr' ? 'GPU Cible Upgrade' : lang === 'ja' ? '換装予定のGPU' : lang === 'zh' ? '目标升级显卡' : 'Target Upgrade GPU';
  const psuRatedLabel = lang === 'de' ? 'Aktuelle Netzteil-Nennleistung' : lang === 'es' ? 'Potencia de la Fuente Actual' : lang === 'fr' ? 'Puissance Alimentation Actuelle' : lang === 'ja' ? '現在の電源容量' : lang === 'zh' ? '当前电源额定功率' : 'Current PSU Rating';
  const psuAgeLabel = lang === 'de' ? 'Netzteil-Alter' : lang === 'es' ? 'Antigüedad de la Fuente' : lang === 'fr' ? 'Âge de l\'Alimentation' : lang === 'ja' ? '電源使用年数' : lang === 'zh' ? '电源已用年限' : 'PSU Age';
  const yearsSuffix = lang === 'de' ? 'Jahre' : lang === 'es' ? 'años' : lang === 'fr' ? 'ans' : lang === 'ja' ? '年' : lang === 'zh' ? '年' : 'years';
  const caseLabel = lang === 'de' ? 'PC-Gehäuse' : lang === 'es' ? 'Caja / Chasis de PC' : lang === 'fr' ? 'Boîtier PC' : lang === 'ja' ? 'PCケース' : lang === 'zh' ? '电脑机箱型号' : 'PC Case';

  const powerTitle = lang === 'de' ? '⚡ Leistungsbedarf & Kapazität' : lang === 'es' ? '⚡ Variación de Capacidad Eléctrica' : lang === 'fr' ? '⚡ Évolution de Puissance' : lang === 'ja' ? '⚡ 電力要求・容量変化' : lang === 'zh' ? '⚡ 供电负荷与容量变化' : '⚡ Power Capacity Delta';
  const physTitle = lang === 'de' ? '📏 Gehäuse-Kompatibilität & Abmessungen' : lang === 'es' ? '📏 Espacio Físico y Dimensiones' : lang === 'fr' ? '📏 Espace Physique & Dimensions' : lang === 'ja' ? '📏 物理寸法・クリアランス' : lang === 'zh' ? '📏 物理尺寸与机箱限长' : '📏 Physical fit Delta';

  const safeWattage = lang === 'de' ? 'Kapazität ausreichend' : lang === 'es' ? 'Potencia Segura' : lang === 'fr' ? 'Puissance Sécurisée' : lang === 'ja' ? '容量適合 (安全)' : lang === 'zh' ? '功率安全充裕' : 'Safe Wattage';
  const warnWattage = lang === 'de' ? 'Knappe Reserven' : lang === 'es' ? 'Margen Límite' : lang === 'fr' ? 'Marge Limite' : lang === 'ja' ? '余裕わずか (限界)' : lang === 'zh' ? '余量紧凑临界' : 'Borderline Headroom';
  const failWattage = lang === 'de' ? 'Netzteil-Upgrade erforderlich' : lang === 'es' ? 'Requiere Nueva Fuente' : lang === 'fr' ? 'Upgrade Alimentation Requis' : lang === 'ja' ? '電源交換が必要' : lang === 'zh' ? '必须升级更大电源' : 'PSU Upgrade Required';

  const fitsText = lang === 'de' ? '✅ Passt' : lang === 'es' ? '✅ Compatible' : lang === 'fr' ? '✅ Compatible' : lang === 'ja' ? '✅ 収まります' : lang === 'zh' ? '✅ 完美装入' : '✅ Fits';
  const tooLongText = lang === 'de' ? '❌ Zu lang' : lang === 'es' ? '❌ Demasiado larga' : lang === 'fr' ? '❌ Trop long' : lang === 'ja' ? '❌ 長すぎます (干渉)' : lang === 'zh' ? '❌ 长度超限' : '❌ Too Long';
  const passClearance = lang === 'de' ? 'Abmessungen PASS' : lang === 'es' ? 'Espacio Correcto' : lang === 'fr' ? 'Dégagement Valide' : lang === 'ja' ? '寸法クリア' : lang === 'zh' ? '尺寸符合规范' : 'Clearance PASS';
  const failClearance = lang === 'de' ? 'Kollision mit Gehäuse' : lang === 'es' ? 'Espacio Insuficiente' : lang === 'fr' ? 'Collision Boîtier' : lang === 'ja' ? 'ケース干渉' : lang === 'zh' ? '机箱空间不足' : 'Clearance FAIL';

  return (
    <div style="display: grid; grid-template-columns: 1fr; gap: 2rem;">
      {/* Inputs Deck */}
      <div class="card" style="padding: 1.5rem; background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); display: flex; flex-direction: column; gap: 1.25rem;">
        <h3 style="font-size: 1rem; font-weight: 700; margin: 0; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.5rem;">
          {headingTitle}
        </h3>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.25rem;">
          <div>
            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.5rem;">
              {currGpuLabel}
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
              {targetGpuLabel}
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
              {psuRatedLabel}
            </label>
            <select
              value={ratedWattage}
              onChange={(e) => setRatedWattage(Number((e.target as HTMLSelectElement).value))}
              style="width: 100%; min-height: 40px; background: var(--bg-deep); border: 1px solid var(--border-subtle); color: var(--text-primary); border-radius: var(--radius-md); padding: 0 0.5rem; font-size: 0.875rem;"
            >
              {[550, 650, 750, 850, 1000, 1200].map(w => (
                <option value={w}>{w}W</option>
              ))}
            </select>
          </div>

          <div>
            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.5rem; display: flex; justify-content: space-between;">
              <span>{psuAgeLabel}</span>
              <span style="color: var(--color-accent-cyan); font-family: var(--font-mono);">{psuAge} {yearsSuffix}</span>
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
              {caseLabel}
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
          <h3 style="font-size: 1rem; font-weight: 700; margin: 0 0 1rem; color: var(--text-primary); text-transform: uppercase;">{powerTitle}</h3>
          <div style="font-size: 0.875rem; color: var(--color-text-secondary); line-height: 1.5;">
            <p>Sustained draw shift: <strong>{currentBase}W</strong> → <strong>{targetBase}W</strong> ({baseDelta >= 0 ? `+${baseDelta}` : baseDelta}W)</p>
            <p>Peak transient shift: <strong>{currentPeak}W</strong> → <strong>{targetPeak}W</strong> ({peakDelta >= 0 ? `+${peakDelta}` : peakDelta}W)</p>
            <p>Age-derated PSU capacity: <strong>{effectiveCapacity}W</strong> (rated {ratedWattage}W)</p>
            <div style="margin-top: 1rem;">
              <span class={`badge ${powerVerdict === 'PASS' ? 'badge-safe' : powerVerdict === 'WARN' ? 'badge-warning' : 'badge-danger'}`}>
                {powerVerdict === 'PASS' ? safeWattage : powerVerdict === 'WARN' ? warnWattage : failWattage}
              </span>
            </div>
          </div>
        </div>

        {/* Physical clearance */}
        <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg);">
          <h3 style="font-size: 1rem; font-weight: 700; margin: 0 0 1rem; color: var(--text-primary); text-transform: uppercase;">{physTitle}</h3>
          <div style="font-size: 0.875rem; color: var(--color-text-secondary); line-height: 1.5;">
            <p>Target GPU Length: <strong>{targetGpu.dimensions?.length}mm</strong></p>
            <p>Case Max GPU Clearance: <strong>{allowedLength}mm</strong></p>
            <p>Fit Verdict: <strong>{lengthFits ? fitsText : tooLongText}</strong></p>
            <div style="margin-top: 1.5rem;">
              <span class={`badge ${lengthFits ? 'badge-safe' : 'badge-danger'}`}>
                {lengthFits ? passClearance : failClearance}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
