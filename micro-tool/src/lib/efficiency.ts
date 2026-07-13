// ============================================================
// VoltForge — Efficiency & Wall Power Calculation
// ============================================================

import type { EfficiencyTier } from '../types/components';
import efficiencyData from '../data/derived/efficiency-curves.json';

const curves = efficiencyData.tiers as Record<EfficiencyTier, Record<string, number>>;

/**
 * Get efficiency at a specific load percentage for a given tier.
 * Interpolates between known data points.
 */
export function getEfficiency(tier: EfficiencyTier, loadPercent: number): number {
  const curve = curves[tier];
  if (!curve) return 0.80; // Fallback

  const knownPoints = Object.entries(curve)
    .map(([k, v]) => ({ load: parseInt(k), eff: v }))
    .sort((a, b) => a.load - b.load);

  // Clamp to known range
  if (loadPercent <= knownPoints[0].load) return knownPoints[0].eff;
  if (loadPercent >= knownPoints[knownPoints.length - 1].load) return knownPoints[knownPoints.length - 1].eff;

  // Linear interpolation
  for (let i = 0; i < knownPoints.length - 1; i++) {
    const lower = knownPoints[i];
    const upper = knownPoints[i + 1];
    if (loadPercent >= lower.load && loadPercent <= upper.load) {
      const ratio = (loadPercent - lower.load) / (upper.load - lower.load);
      return lower.eff + ratio * (upper.eff - lower.eff);
    }
  }

  return 0.80; // Fallback
}

/**
 * Calculate wall power (AC) from DC power draw and PSU efficiency.
 */
export function calculateWallPower(
  dcPower: number,
  psuWattage: number,
  tier: EfficiencyTier
): number {
  const loadPercent = (dcPower / psuWattage) * 100;
  const efficiency = getEfficiency(tier, loadPercent);
  return Math.round(dcPower / efficiency);
}

/**
 * Calculate annual electricity cost.
 */
export function calculateAnnualElectricityCost(
  wallPower: number,
  hoursPerDay: number,
  kwhRate: number
): number {
  const dailyKwh = (wallPower / 1000) * hoursPerDay;
  const annualKwh = dailyKwh * 365;
  return Math.round(annualKwh * kwhRate * 100) / 100;
}
