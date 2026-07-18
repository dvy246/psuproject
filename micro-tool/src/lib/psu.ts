// ============================================================
// VoltForge — PSU Calculation Engine
// Pure functions. No UI dependency. Fully testable.
// ============================================================

import type {
  CpuIndex,
  GpuIndex,
  GpuTier,
  TransientConstants,
  AtxVersion,
  PsuAnalysis,
  AtxComplianceResult,
  CableAuditResult,
  PerRailResult,
  RamConfig,
  StorageConfig,
  CoolingConfig,
  OcConfig,
  PsuHealthScore,
  HealthTimelinePoint,
  ReplacementVerdict,
  PsuIndex,
} from '../types/components';

import transientData from '../data/derived/transient-constants.json';

const constants: TransientConstants = transientData as TransientConstants;

// --- Base Draw Calculation ---

export interface ComponentDraws {
  cpu: CpuIndex | null;
  gpu: GpuIndex | null;
  ram: RamConfig | null;
  storage: StorageConfig[];
  cooling: CoolingConfig | null;
  fans: number;
  miscSystemWatts?: number;
  ocConfig?: OcConfig;
}

export function calculateBaseDraw(components: ComponentDraws): number {
  let total = 0;

  // CPU — use measuredPeakWatts if present, else sustained power (PL2 for Intel), apply OC multiplier
  if (components.cpu) {
    const ocMult = 1 + ((components.ocConfig?.cpuOcPercent ?? 0) / 100);
    const cpuBase = components.cpu.measuredPeakWatts ?? components.cpu.tdpSustained;
    total += Math.round(cpuBase * ocMult);
  }

  // GPU — use measuredPeakWatts if present, else TBP (Total Board Power), apply OC multiplier
  if (components.gpu) {
    const ocMult = 1 + ((components.ocConfig?.gpuOcPercent ?? 0) / 100);
    const gpuBase = components.gpu.measuredPeakWatts ?? components.gpu.tbp;
    total += Math.round(gpuBase * ocMult);
  }

  // RAM
  if (components.ram) {
    total += components.ram.typicalWatts;
  }

  // Storage (can have multiple drives)
  for (const drive of components.storage) {
    total += drive.typicalWatts;
  }

  // Cooling
  if (components.cooling) {
    total += components.cooling.typicalWatts;
  }

  // Case fans (3W each)
  total += (components.fans || 2) * 3;

  // Motherboard + misc system overhead
  total += components.miscSystemWatts ?? 15;

  return Math.round(total);
}

// --- Transient Peak Calculation ---

export function calculateTransientPeak(
  cpu: CpuIndex | null,
  gpu: GpuIndex | null,
  baseDraw: number,
  ocConfig?: OcConfig
): number {
  let cpuPeak = 0;
  let gpuPeak = 0;

  if (cpu) {
    const ocMult = 1 + ((ocConfig?.cpuOcPercent ?? 0) / 100);
    const cpuBase = cpu.measuredPeakWatts ?? cpu.tdpSustained;
    cpuPeak = cpuBase * ocMult * constants.cpuTransientMultiplier;
  }

  if (gpu) {
    const ocMult = 1 + ((ocConfig?.gpuOcPercent ?? 0) / 100);
    if (gpu.measuredTransientWatts) {
      gpuPeak = gpu.measuredTransientWatts * ocMult;
    } else {
      const tierMultiplier = constants.gpuTierMultipliers[gpu.tier as GpuTier];
      gpuPeak = gpu.tbp * ocMult * tierMultiplier;
    }
  }

  // Non-CPU/GPU components don't spike — add their draw as-is
  const cpuBaseVal = cpu ? (cpu.measuredPeakWatts ?? cpu.tdpSustained) * (1 + ((ocConfig?.cpuOcPercent ?? 0) / 100)) : 0;
  const gpuBaseVal = gpu ? (gpu.measuredPeakWatts ?? gpu.tbp) * (1 + ((ocConfig?.gpuOcPercent ?? 0) / 100)) : 0;
  const otherDraw = baseDraw - Math.round(cpuBaseVal) - Math.round(gpuBaseVal);

  // Total peak: CPU peak + GPU peak + other components (no transient)
  return Math.round(cpuPeak + gpuPeak + otherDraw);
}

// --- Recommended Wattage ---

export function calculateRecommendedWattage(
  transientPeak: number,
  atxVersion: AtxVersion,
  safetyBuffer: number = constants.safetyBufferDefault,
  psuAgeYears: number = 0
): number {
  // ATX 3.1 handles 200% transients — we can use tighter headroom
  const headroomMultiplier = atxVersion === '3.1' || atxVersion === '3.0'
    ? 1 + 0.20  // 20% buffer over transient peak for ATX 3.x
    : 1 + 0.35; // 35% buffer for ATX 2.x (can't rely on transient handling)

  let recommended = transientPeak * headroomMultiplier;

  // Apply custom safety buffer (additive, on top of headroom)
  recommended *= (1 + safetyBuffer * 0.5); // Half the safety buffer is multiplicative

  // Apply capacitor aging derating
  if (psuAgeYears > 3) {
    const agingFactor = 1 + (psuAgeYears - 3) * constants.capacitorAgingPerYear;
    recommended *= agingFactor;
  }

  // Round up to nearest standard PSU wattage tier
  const standardWattages = [450, 500, 550, 600, 650, 700, 750, 800, 850, 1000, 1200, 1300, 1500, 1600];
  for (const wattage of standardWattages) {
    if (wattage >= recommended) {
      return wattage;
    }
  }

  return Math.ceil(recommended / 100) * 100; // Fallback: round up to nearest 100
}

// --- Verdict Generation ---

export function generateVerdict(
  recommendedWattage: number,
  actualPsuWattage: number,
  transientPeak: number
): { verdict: 'yes' | 'borderline' | 'no'; confidenceScore: number } {
  const headroom = actualPsuWattage - transientPeak;
  const headroomPercent = (headroom / actualPsuWattage) * 100;

  if (actualPsuWattage >= recommendedWattage) {
    // PSU meets or exceeds recommendation
    const confidence = Math.min(98, 70 + headroomPercent * 0.8);
    return { verdict: 'yes', confidenceScore: Math.round(confidence) };
  }

  if (actualPsuWattage >= transientPeak * 1.05) {
    // PSU can technically handle it but with minimal margin
    const confidence = Math.max(35, 60 - (recommendedWattage - actualPsuWattage) * 0.15);
    return { verdict: 'borderline', confidenceScore: Math.round(confidence) };
  }

  // PSU cannot safely handle transient peaks
  const deficit = transientPeak - actualPsuWattage;
  const confidence = Math.max(5, 30 - deficit * 0.1);
  return { verdict: 'no', confidenceScore: Math.round(confidence) };
}

// --- Binding Constraint Identification ---

export function identifyBindingConstraint(
  cpu: CpuIndex | null,
  gpu: GpuIndex | null
): 'gpu' | 'cpu' | 'balanced' {
  if (!cpu || !gpu) {
    return gpu ? 'gpu' : cpu ? 'cpu' : 'balanced';
  }

  const cpuPeak = cpu.tdpSustained * constants.cpuTransientMultiplier;
  const gpuPeak = gpu.tbp * constants.gpuTierMultipliers[gpu.tier as GpuTier];

  const ratio = gpuPeak / cpuPeak;
  if (ratio > 1.5) return 'gpu';
  if (ratio < 0.67) return 'cpu';
  return 'balanced';
}

// --- ATX Compliance Check ---

export function checkAtxCompliance(
  transientPeak: number,
  psuWattage: number,
  atxVersion: AtxVersion
): AtxComplianceResult {
  const tolerance = atxVersion === '3.1' || atxVersion === '3.0'
    ? constants.atx31TransientTolerance
    : constants.atx2xTransientTolerance;

  const maxHandleable = psuWattage * tolerance;
  const canHandle = transientPeak <= maxHandleable;
  const headroomPercent = ((maxHandleable - transientPeak) / maxHandleable) * 100;

  let recommendation: string;
  if (canHandle && headroomPercent > 20) {
    recommendation = `Your ${atxVersion === '3.1' ? 'ATX 3.1' : atxVersion === '3.0' ? 'ATX 3.0' : 'ATX 2.x'} PSU handles the ${transientPeak}W transient spike comfortably with ${Math.round(headroomPercent)}% headroom.`;
  } else if (canHandle) {
    recommendation = `Your PSU can handle the ${transientPeak}W transient spike, but headroom is tight at ${Math.round(headroomPercent)}%. Consider upgrading for long-term reliability.`;
  } else {
    recommendation = atxVersion === '2.x'
      ? `Your ATX 2.x PSU cannot reliably handle the ${transientPeak}W transient spike. Upgrade to an ATX 3.1 PSU for proper transient handling.`
      : `The ${transientPeak}W transient spike exceeds your PSU's capacity. A higher-wattage PSU is required.`;
  }

  return {
    atxVersion,
    canHandleTransient: canHandle,
    transientHeadroomPercent: Math.round(headroomPercent),
    recommendation,
  };
}

// --- Cable Compatibility Audit ---

export function checkCableCompatibility(gpu: GpuIndex | null): CableAuditResult {
  if (!gpu) {
    return {
      safe: true,
      severity: 'safe',
      connectorRequired: 'none',
      connectorCount: 0,
      daisyChainSafe: true,
      message: 'No GPU selected — no cable requirements.',
    };
  }

  const isHighEnd = gpu.tbp >= 250 || gpu.connectorType === '12v-2x6';
  const needs12v2x6 = gpu.connectorType === '12v-2x6';

  if (needs12v2x6) {
    return {
      safe: true,
      severity: 'warning',
      connectorRequired: '12v-2x6',
      connectorCount: gpu.connectorCount,
      daisyChainSafe: false,
      message: `⚠ ${gpu.name} requires an ATX 3.1 PSU with a native 12V-2x6 cable. DO NOT use adapter cables from older 8-pin connectors. If your PSU lacks a native 12V-2x6 port, you must upgrade your PSU.`,
    };
  }

  if (isHighEnd && (gpu.connectorType === '8pin-x2' || gpu.connectorType === '8pin-x3')) {
    return {
      safe: true,
      severity: 'warning',
      connectorRequired: gpu.connectorType,
      connectorCount: gpu.connectorCount,
      daisyChainSafe: false,
      message: `⚠ ${gpu.name} requires ${gpu.connectorCount} separate 8-pin PCIe power cables. DO NOT daisy-chain — each cable must run directly from the PSU to the GPU.`,
    };
  }

  return {
    safe: true,
    severity: 'safe',
    connectorRequired: gpu.connectorType,
    connectorCount: gpu.connectorCount,
    daisyChainSafe: true,
    message: `${gpu.name} uses a standard ${gpu.connectorType} connector. No special cabling required.`,
  };
}

// --- Per-Rail Current Estimation ---

export function estimatePerRailCurrents(baseDraw: number): PerRailResult {
  // Modern systems draw ~90% from +12V rail, ~5% from +5V, ~5% from +3.3V
  const v12Watts = baseDraw * 0.90;
  const v5Watts = baseDraw * 0.05;
  const v3_3Watts = baseDraw * 0.05;

  return {
    v12Amps: Math.round(v12Watts / 12 * 10) / 10,
    v5Amps: Math.round(v5Watts / 5 * 10) / 10,
    v3_3Amps: Math.round(v3_3Watts / 3.3 * 10) / 10,
    v12Watts: Math.round(v12Watts),
    v5Watts: Math.round(v5Watts),
    v3_3Watts: Math.round(v3_3Watts),
  };
}

// --- Full PSU Analysis (Composite) ---

export function runFullPsuAnalysis(
  components: ComponentDraws,
  psuWattage: number,
  atxVersion: AtxVersion = '3.1',
  safetyBuffer: number = constants.safetyBufferDefault,
  psuAgeYears: number = 0
): PsuAnalysis {
  const baseDraw = calculateBaseDraw(components);
  const transientPeak = calculateTransientPeak(components.cpu, components.gpu, baseDraw, components.ocConfig);
  const recommendedWattage = calculateRecommendedWattage(transientPeak, atxVersion, safetyBuffer, psuAgeYears);
  const { verdict, confidenceScore } = generateVerdict(recommendedWattage, psuWattage, transientPeak);
  const headroom = psuWattage - transientPeak;
  const headroomPercent = (headroom / psuWattage) * 100;
  const bindingConstraint = identifyBindingConstraint(components.cpu, components.gpu);
  const atxCompliance = checkAtxCompliance(transientPeak, psuWattage, atxVersion);
  const cableAudit = checkCableCompatibility(components.gpu);
  const perRail = estimatePerRailCurrents(baseDraw);

  return {
    baseDraw,
    transientPeak,
    recommendedWattage,
    headroom,
    headroomPercent: Math.round(headroomPercent),
    verdict,
    confidenceScore,
    bindingConstraint,
    atxCompliance,
    cableAudit,
    perRail,
  };
}

export function calculatePsuHealthScore(
  psuAgeYears: number,
  psuWattage: number,
  transientPeak: number,
  hasNative12v2x6: boolean,
  connectorSafe: boolean
): PsuHealthScore {
  // Effective Capacity
  const capAgingFactor = psuAgeYears <= 3 ? 1 : Math.max(0.4, 1 - (psuAgeYears - 3) * 0.05);
  const effectiveCapacity = Math.round(psuWattage * capAgingFactor);

  // Age score: 100 at 0-3yr, -5/yr after year 3
  const ageScore = Math.max(0, 100 - Math.max(0, psuAgeYears - 3) * 5);

  // Headroom score: psu capacity minus transient peak
  const headroom = effectiveCapacity - transientPeak;
  const headroomScore = headroom <= 0 ? 0 : Math.min(100, Math.round((headroom / psuWattage) * 200));

  // Transient safety score: if PSU can handle transient peak, 100, otherwise 20
  const transientScore = headroom > 0 ? 100 : 20;

  // Connector score: native 12V-2x6 = 100, daisy-chain safe = 70, otherwise 30
  const connScore = hasNative12v2x6 ? 100 : connectorSafe ? 70 : 30;

  // Weighted composite
  const finalScore = Math.round(
    ageScore * 0.50 +
    headroomScore * 0.25 +
    transientScore * 0.15 +
    connScore * 0.10
  );

  // Timeline points
  const timeline: HealthTimelinePoint[] = [
    { year: 0,  effectiveWatts: psuWattage,       score: 100, label: 'New' },
    { year: 3,  effectiveWatts: psuWattage,       score: 100, label: 'Healthy' },
    { year: 5,  effectiveWatts: Math.round(psuWattage * 0.90), score: 80,  label: 'Degrading' },
    { year: 8,  effectiveWatts: Math.round(psuWattage * 0.75), score: 55,  label: 'Warning' },
    { year: 10, effectiveWatts: Math.round(psuWattage * 0.65), score: 35,  label: 'Critical' },
    { year: 15, effectiveWatts: Math.round(psuWattage * 0.40), score: 10,  label: 'EOL' },
  ];

  // Narrative generator
  let narrative = '';
  if (finalScore >= 70) {
    narrative = `Your PSU is in good health (Score: ${finalScore}/100). It retains ~${Math.round(capAgingFactor * 100)}% of its original capacity with stable voltage rails.`;
  } else if (finalScore >= 40) {
    narrative = `Your PSU is showing warning signs (Score: ${finalScore}/100). Age-related capacitor dry-out has degraded capacity to ~${effectiveCapacity}W. Plan for an upgrade within 12 months.`;
  } else {
    narrative = `Your PSU is in a critical safety zone (Score: ${finalScore}/100). Capacity is degraded to ~${effectiveCapacity}W, failing to safely buffer your system's ${Math.round(transientPeak)}W peak spikes. Replace immediately.`;
  }

  return {
    score: finalScore,
    rating: finalScore >= 70 ? 'good' : finalScore >= 40 ? 'warning' : 'danger',
    degradationPercent: Math.round((1 - capAgingFactor) * 100),
    effectiveCapacity,
    timeline,
    narrative
  };
}

export function generateReplacementVerdict(
  score: number,
  psuWattage: number,
  effectiveCapacity: number,
  transientPeak: number,
  psuAgeYears: number,
  recommendedWattage: number,
  psusIndex: PsuIndex[]
): ReplacementVerdict {
  const headroom = effectiveCapacity - transientPeak;

  let action: 'replace' | 'plan' | 'keep' = 'keep';
  let urgency: 'immediate' | 'within-year' | 'none' = 'none';
  let reason = '';

  if (score < 40 || headroom <= 0) {
    action = 'replace';
    urgency = 'immediate';
    reason = `Your PSU is critically degraded or lacks the capacity to handle your build's ${Math.round(transientPeak)}W transient spikes, risking instant system resets or component damage.`;
  } else if (score < 65 || (headroom < 100 && psuAgeYears > 5)) {
    action = 'plan';
    urgency = 'within-year';
    reason = `Your PSU is degraded (~${Math.round(effectiveCapacity)}W effective capacity) and operates with slim headroom under peak loads. Plan to replace within 12 months.`;
  } else {
    action = 'keep';
    urgency = 'none';
    reason = `Your PSU is healthy, holds adequate headroom (~${Math.round(headroom)}W above peak draw), and does not require immediate replacement.`;
  }

  const estimatedLifespan = Math.max(0, 10 - psuAgeYears);

  const recommendedPsus = psusIndex
    .filter(p => p.wattage >= recommendedWattage && p.wattage <= recommendedWattage + 150)
    .sort((a, b) => a.price - b.price)
    .slice(0, 3);

  const costBenefit = recommendedWattage > psuWattage
    ? `Upgrading to a modern Gold/Platinum PSU resolves peak OCP shutdowns and improves overall load efficiency.`
    : `A new 80+ Gold PSU will operate at its peak efficiency zone (~50% load), saving an estimated $15-$30 annually in electricity bills.`;

  return {
    action,
    reason,
    urgency,
    estimatedLifespan,
    recommendedPsus,
    costBenefit
  };
}
