// ============================================================
// PSUCheck — Component & Calculation Type Definitions
// ============================================================

// --- Data Index Types (client-shipped, lightweight) ---

export interface CpuIndex {
  id: string;
  name: string;
  brand: "AMD" | "Intel";
  socket: string;
  gen: string;
  cores: number;
  tdp: number;            // TDP in watts (PL1 for Intel, TDP for AMD)
  tdpSustained: number;   // Sustained power (PL2 for Intel = tdpSustained)
  price: number;          // USD
  confirmed: boolean;     // false for leaked/rumored SKUs
}

export interface GpuIndex {
  id: string;
  name: string;
  brand: "NVIDIA" | "AMD" | "Intel";
  tbp: number;            // Total Board Power (watts)
  tier: GpuTier;
  transientMultiplier: number;
  connectorType: ConnectorType;
  connectorCount: number;
  minPsuWattage: number;  // Manufacturer recommended system PSU
  price: number;
  confirmed: boolean;
  pcieLanes: number;
  generation: string;
}

export type GpuTier = "budget" | "mid" | "high" | "ultra" | "halo";

export type ConnectorType =
  | "12v-2x6"
  | "8pin-x1"
  | "8pin-x2"
  | "8pin-x3"
  | "8pin-x4"
  | "6pin"
  | "none";

export interface MotherboardIndex {
  id: string;
  name: string;
  brand: string;
  socket: string;
  formFactor: FormFactor;
  chipset: string;
  price: number;
}

export type FormFactor = "ATX" | "Micro-ATX" | "Mini-ITX" | "E-ATX";

export interface PsuIndex {
  id: string;
  name: string;
  brand: string;
  wattage: number;
  efficiencyTier: EfficiencyTier;
  atxVersion: AtxVersion;
  modular: "full" | "semi" | "none";
  price: number;
  has12v2x6: boolean;
  cybeneticsRating?: string;
  qualityTier?: "A" | "B" | "C" | "Avoid";
}

export type EfficiencyTier =
  | "80plus"
  | "bronze"
  | "silver"
  | "gold"
  | "platinum"
  | "titanium";

export type AtxVersion = "2.x" | "3.0" | "3.1";

// --- RAM / Storage / Cooling (price-tier based) ---

export interface RamConfig {
  capacity: number;    // GB
  speed: number;       // MHz
  type: "DDR4" | "DDR5";
  sticks: number;
  price: number;
  typicalWatts: number;
}

export interface StorageConfig {
  type: "NVMe" | "SATA SSD" | "HDD";
  capacity: number;    // GB
  price: number;
  typicalWatts: number;
}

export interface CoolingConfig {
  type: "stock" | "air-tower" | "aio-240" | "aio-360" | "custom-loop";
  price: number;
  typicalWatts: number;
}

export interface CaseConfig {
  id: string;
  name: string;
  formFactor: FormFactor;
  price: number;
}

export interface PeripheralConfig {
  os: "windows" | "linux" | "none";
  osPrice: number;
  monitor: boolean;
  monitorPrice: number;
  keyboardMouse: boolean;
  keyboardMousePrice: number;
}

export interface OcConfig {
  cpuOcPercent: number;
  gpuOcPercent: number;
}

// --- Full Build Selection ---

export interface BuildSelection {
  cpu: CpuIndex | null;
  gpu: GpuIndex | null;
  motherboard: MotherboardIndex | null;
  ram: RamConfig | null;
  storage: StorageConfig[];
  psu: PsuIndex | null;
  psuMode: "auto" | "manual";
  cooling: CoolingConfig | null;
  caseConfig: CaseConfig | null;
  peripherals: PeripheralConfig;
  fans: number;            // Additional case fans
  taxRate: number;         // 0-1
  assemblyFee: number;     // USD
}

// --- Transient Constants ---

export interface TransientConstants {
  gpuTierMultipliers: Record<GpuTier, number>;
  cpuTransientMultiplier: number;
  multiGpuOverlapFactor: number;
  atx31TransientTolerance: number;
  atx31HoldUpTimeMs: number;
  atx2xTransientTolerance: number;
  capacitorAgingPerYear: number;
  safetyBufferDefault: number;
  pcieSlotMaxW: number;
  connector12v2x6MaxW: number;
}

// --- Efficiency Curves ---

export interface EfficiencyCurves {
  tiers: Record<EfficiencyTier, Record<string, number>>;
  loadPercentageLabels: string[];
}

// --- Calculation Results ---

export interface PsuAnalysis {
  baseDraw: number;            // Total component TDP sum (watts)
  transientPeak: number;       // Peak transient spike (watts)
  recommendedWattage: number;  // Final recommendation with buffer
  headroom: number;            // Watts of headroom above peak
  headroomPercent: number;     // Headroom as percentage
  verdict: "yes" | "borderline" | "no";
  confidenceScore: number;     // 0-100
  bindingConstraint: "gpu" | "cpu" | "balanced";
  atxCompliance: AtxComplianceResult;
  cableAudit: CableAuditResult;
  perRail: PerRailResult;
}

export interface AtxComplianceResult {
  atxVersion: AtxVersion;
  canHandleTransient: boolean;
  transientHeadroomPercent: number;
  recommendation: string;
}

export interface CableAuditResult {
  safe: boolean;
  severity: "safe" | "warning" | "danger";
  connectorRequired: ConnectorType;
  connectorCount: number;
  daisyChainSafe: boolean;
  message: string;
}

export interface PerRailResult {
  v12Amps: number;
  v5Amps: number;
  v3_3Amps: number;
  v12Watts: number;
  v5Watts: number;
  v3_3Watts: number;
}

export interface CostBreakdown {
  totalCost: number;
  totalCostWithTax: number;
  components: CostLineItem[];
  percentages: Record<string, number>;
  budgetAdvice: string;
}

export interface CostLineItem {
  category: string;
  name: string;
  price: number;
  percentage: number;
}

export interface TcoComparison {
  tier: EfficiencyTier;
  psuCost: number;
  annualElectricity: number;
  totalCostYears: number;
  years: number;
  savings: number;         // vs cheapest tier
}

export interface OptimizationTip {
  type: "downgrade" | "upgrade" | "swap" | "remove";
  component: string;
  suggestion: string;
  savings: number;
  performanceImpact: string;
}

// --- Oracle Page Props ---

export interface OraclePageProps {
  gpu: GpuIndex;
  cpu: CpuIndex | null;
  wattage: number;
  analysis: PsuAnalysis;
  uniqueInsight: string;
  recommendedPsus: PsuIndex[];
  faqs: OracleFaq[];
}

export interface OracleFaq {
  question: string;
  answer: string;
}

// --- UI State ---

export interface WaveformData {
  baseDraw: number;
  transientPeak: number;
  psuRating: number;
  isDanger: boolean;
  timeAxisMs: number;
}

// --- PSU Health & Replacement Types ---

export interface PsuHealthScore {
  score: number;                    // 0-100
  rating: 'good' | 'warning' | 'danger';
  degradationPercent: number;       // e.g. 20 (for "20% degraded")
  effectiveCapacity: number;        // aged wattage (e.g. 850W → 680W)
  timeline: HealthTimelinePoint[];
  narrative: string;                // contextual explanation
}

export interface HealthTimelinePoint {
  year: number;
  effectiveWatts: number;
  score: number;
  label: string;                    // "New", "Healthy", "Degrading", "End of Life"
}

export interface ReplacementVerdict {
  action: 'replace' | 'plan' | 'keep';
  reason: string;
  urgency: 'immediate' | 'within-year' | 'none';
  estimatedLifespan: number;        // years remaining
  recommendedPsus: PsuIndex[];      // from database
  costBenefit: string;              // e.g. "$120 now saves $45/yr in electricity"
}
