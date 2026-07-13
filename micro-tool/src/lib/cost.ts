// ============================================================
// VoltForge — TCO (Total Cost of Ownership) Calculation
// ============================================================

import type { EfficiencyTier, TcoComparison } from '../types/components';
import { calculateWallPower, calculateAnnualElectricityCost } from './efficiency';

// Approximate PSU prices by tier at common wattage points
const tierPriceMultipliers: Record<EfficiencyTier, number> = {
  '80plus': 0.06,    // ~$0.06 per watt
  'bronze': 0.08,
  'silver': 0.10,
  'gold': 0.13,
  'platinum': 0.20,
  'titanium': 0.30,
};

/**
 * Compare TCO across efficiency tiers for a given power draw scenario.
 */
export function compareTCOAcrossTiers(
  dcPower: number,
  psuWattage: number,
  kwhRate: number,
  hoursPerDay: number,
  years: number
): TcoComparison[] {
  const tiers: EfficiencyTier[] = ['bronze', 'gold', 'platinum', 'titanium'];
  const results: TcoComparison[] = [];

  let cheapestTotal = Infinity;

  for (const tier of tiers) {
    const wallPower = calculateWallPower(dcPower, psuWattage, tier);
    const annualElectricity = calculateAnnualElectricityCost(wallPower, hoursPerDay, kwhRate);
    const psuCost = Math.round(psuWattage * tierPriceMultipliers[tier]);
    const totalCost = psuCost + annualElectricity * years;

    if (totalCost < cheapestTotal) cheapestTotal = totalCost;

    results.push({
      tier,
      psuCost,
      annualElectricity: Math.round(annualElectricity),
      totalCostYears: Math.round(totalCost),
      years,
      savings: 0, // Calculated below
    });
  }

  // Calculate savings relative to most expensive tier
  const mostExpensive = Math.max(...results.map(r => r.totalCostYears));
  for (const result of results) {
    result.savings = Math.round(mostExpensive - result.totalCostYears);
  }

  return results;
}

/**
 * Generate a human-readable TCO insight.
 */
export function generateTcoInsight(comparisons: TcoComparison[]): string {
  if (comparisons.length < 2) return '';

  const cheapest = comparisons.reduce((a, b) => a.totalCostYears < b.totalCostYears ? a : b);
  const mostExpensive = comparisons.reduce((a, b) => a.totalCostYears > b.totalCostYears ? a : b);
  const savings = mostExpensive.totalCostYears - cheapest.totalCostYears;

  if (savings < 10) {
    return `All efficiency tiers cost roughly the same over ${cheapest.years} years at your usage level.`;
  }

  return `Choosing an 80 PLUS ${cheapest.tier.charAt(0).toUpperCase() + cheapest.tier.slice(1)} PSU saves approximately $${savings} over ${cheapest.years} years compared to 80 PLUS ${mostExpensive.tier.charAt(0).toUpperCase() + mostExpensive.tier.slice(1)}, accounting for both purchase price and electricity costs.`;
}
