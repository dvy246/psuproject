// ============================================================
// VoltForge — Build Cost Calculation
// ============================================================

import type {
  BuildSelection,
  CostBreakdown,
  CostLineItem,
} from '../types/components';

/**
 * Calculate total build cost with per-component breakdown.
 */
export function calculateBuildCost(build: BuildSelection): CostBreakdown {
  const items: CostLineItem[] = [];

  if (build.cpu) {
    items.push({ category: 'CPU', name: build.cpu.name, price: build.cpu.price, percentage: 0 });
  }

  if (build.gpu) {
    items.push({ category: 'GPU', name: build.gpu.name, price: build.gpu.price, percentage: 0 });
  }

  if (build.motherboard) {
    items.push({ category: 'Motherboard', name: build.motherboard.name, price: build.motherboard.price, percentage: 0 });
  }

  if (build.ram) {
    items.push({ category: 'RAM', name: `${build.ram.capacity}GB ${build.ram.type}-${build.ram.speed}`, price: build.ram.price, percentage: 0 });
  }

  for (const drive of build.storage) {
    const label = `${drive.type} ${drive.capacity >= 1000 ? `${drive.capacity / 1000}TB` : `${drive.capacity}GB`}`;
    items.push({ category: 'Storage', name: label, price: drive.price, percentage: 0 });
  }

  if (build.psu) {
    items.push({ category: 'PSU', name: build.psu.name, price: build.psu.price, percentage: 0 });
  }

  if (build.cooling && build.cooling.type !== 'stock') {
    items.push({ category: 'Cooling', name: build.cooling.type.replace(/-/g, ' ').toUpperCase(), price: build.cooling.price, percentage: 0 });
  }

  if (build.caseConfig) {
    items.push({ category: 'Case', name: build.caseConfig.name, price: build.caseConfig.price, percentage: 0 });
  }

  if (build.peripherals.os !== 'none') {
    items.push({ category: 'OS', name: build.peripherals.os === 'windows' ? 'Windows 11' : 'Linux', price: build.peripherals.osPrice, percentage: 0 });
  }

  if (build.peripherals.monitor) {
    items.push({ category: 'Monitor', name: 'Monitor', price: build.peripherals.monitorPrice, percentage: 0 });
  }

  if (build.peripherals.keyboardMouse) {
    items.push({ category: 'Peripherals', name: 'Keyboard & Mouse', price: build.peripherals.keyboardMousePrice, percentage: 0 });
  }

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const totalWithAssembly = subtotal + build.assemblyFee;
  const totalWithTax = Math.round(totalWithAssembly * (1 + build.taxRate));

  // Calculate percentages
  const percentages: Record<string, number> = {};
  for (const item of items) {
    item.percentage = subtotal > 0 ? Math.round((item.price / subtotal) * 100) : 0;
    percentages[item.category] = (percentages[item.category] || 0) + item.percentage;
  }

  const budgetAdvice = generateBudgetAdvice(percentages, subtotal);

  return {
    totalCost: subtotal,
    totalCostWithTax: totalWithTax,
    components: items,
    percentages,
    budgetAdvice,
  };
}

/**
 * Generate budget allocation advice based on component percentages.
 */
function generateBudgetAdvice(percentages: Record<string, number>, total: number): string {
  const gpuPct = percentages['GPU'] || 0;
  const cpuPct = percentages['CPU'] || 0;

  if (gpuPct > 50) {
    return `${gpuPct}% of your budget goes to the GPU. This build is heavily GPU-focused — ideal for gaming at high resolutions or GPU-intensive workloads.`;
  }

  if (gpuPct >= 35 && gpuPct <= 45) {
    return `${gpuPct}% GPU allocation is in the sweet spot for a balanced gaming build.`;
  }

  if (cpuPct > 35) {
    return `${cpuPct}% of your budget goes to the CPU. This build prioritizes CPU performance — ideal for content creation, streaming, or productivity workloads.`;
  }

  if (total < 800) {
    return `At $${total}, this is a budget build. Focus spending on the GPU and CPU for the best performance per dollar.`;
  }

  return `This build has a balanced component allocation across all categories.`;
}
