// ============================================================
// VoltForge — Cost Optimization Engine
// ============================================================

import type { CpuIndex, GpuIndex, OptimizationTip } from '../types/components';

import cpuData from '../data/index/cpus.index.json';
import gpuData from '../data/index/gpus.index.json';

const allCpus = cpuData.items as CpuIndex[];
const allGpus = gpuData.items as GpuIndex[];

/**
 * Generate cost optimization suggestions based on current selections.
 */
export function generateOptimizationTips(
  selectedCpu: CpuIndex | null,
  selectedGpu: GpuIndex | null,
): OptimizationTip[] {
  const tips: OptimizationTip[] = [];

  if (selectedGpu) {
    // Find cheaper GPU alternatives within 80-95% of selected GPU's price
    const alternatives = allGpus
      .filter(g =>
        g.confirmed &&
        g.id !== selectedGpu.id &&
        g.brand === selectedGpu.brand &&
        g.price < selectedGpu.price * 0.90 &&
        g.price > selectedGpu.price * 0.50
      )
      .sort((a, b) => b.price - a.price);

    if (alternatives.length > 0) {
      const alt = alternatives[0];
      const savings = selectedGpu.price - alt.price;
      const perfDiff = Math.round((1 - alt.tbp / selectedGpu.tbp) * 100);
      tips.push({
        type: 'downgrade',
        component: 'GPU',
        suggestion: `The ${alt.name} at $${alt.price} saves $${savings} compared to the ${selectedGpu.name}. Power draw drops from ${selectedGpu.tbp}W to ${alt.tbp}W.`,
        savings,
        performanceImpact: `Approximately ${perfDiff}% lower power envelope`,
      });
    }
  }

  if (selectedCpu) {
    // Find cheaper CPU alternatives in the same socket
    const alternatives = allCpus
      .filter(c =>
        c.confirmed &&
        c.id !== selectedCpu.id &&
        c.socket === selectedCpu.socket &&
        c.price < selectedCpu.price * 0.85 &&
        c.price > selectedCpu.price * 0.40
      )
      .sort((a, b) => b.price - a.price);

    if (alternatives.length > 0) {
      const alt = alternatives[0];
      const savings = selectedCpu.price - alt.price;
      tips.push({
        type: 'downgrade',
        component: 'CPU',
        suggestion: `The ${alt.name} at $${alt.price} saves $${savings} while using the same ${alt.socket} socket. ${alt.cores < selectedCpu.cores ? `You lose ${selectedCpu.cores - alt.cores} cores` : 'Same core count'}.`,
        savings,
        performanceImpact: `${alt.cores} cores vs ${selectedCpu.cores} cores`,
      });
    }
  }

  return tips;
}
