/** @jsxImportSource preact */
import { useState, useCallback } from 'preact/hooks';
import { BayCard } from './BayCard';
import type { GpuIndex, GpuTier } from '../../../types/components';
import gpuData from '../../../data/index/gpus.index.json';

import { GpuIcon } from './BayIcons';

const ALL_GPUS = gpuData.items as GpuIndex[];
const BRANDS  = ['All', 'NVIDIA', 'AMD', 'Intel'] as const;
const TIERS: GpuTier[] = ['budget', 'mid', 'high', 'ultra', 'halo'];

const TIER_LABEL: Record<GpuTier, string> = {
  budget: 'Budget',
  mid: 'Mid',
  high: 'High',
  ultra: 'Ultra',
  halo: 'Halo',
};

interface Props {
  selected: GpuIndex | null;
  onSelect: (gpu: GpuIndex | null) => void;
}

export function BayGPU({ selected, onSelect }: Props) {
  const [isOpen, setIsOpen]   = useState(false);
  const [filter, setFilter]   = useState<typeof BRANDS[number]>('All');
  const [search, setSearch]   = useState('');

  const toggle = useCallback(() => setIsOpen(prev => !prev), []);
  const clear  = useCallback(() => { onSelect(null); setIsOpen(false); setSearch(''); }, [onSelect]);
  const select = useCallback((gpu: GpuIndex) => { onSelect(gpu); setIsOpen(false); setSearch(''); }, [onSelect]);

  const filtered = ALL_GPUS.filter(g => {
    const matchesBrand = filter === 'All' || g.brand === filter;
    const matchesSearch = !search ||
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.generation.toLowerCase().includes(search.toLowerCase());
    return matchesBrand && matchesSearch;
  });

  // GPU state: if selected GPU is unconfirmed → warning
  const state = !selected
    ? 'empty'
    : !selected.confirmed
    ? 'warning'
    : 'filled';

  return (
    <BayCard
      icon={<GpuIcon />}
      label="GPU"
      sublabel={selected ? `${selected.name}${!selected.confirmed ? ' ⚠ Estimated' : ''}` : undefined}
      state={state}
      isOpen={isOpen}
      onToggle={toggle}
      onClear={selected ? clear : undefined}
    >
      {/* Search and Brand filter tabs */}
      <div style="display:flex; flex-direction:column; gap: var(--spacing-2); margin-bottom: var(--spacing-3);">
        <input
          type="text"
          placeholder="Search GPUs by name, architecture, or series (e.g. Blackwell, 5090)..."
          value={search}
          onInput={(e) => setSearch((e.target as HTMLInputElement).value)}
          style="width: 100%; min-height: 40px; padding: 0 var(--spacing-3); background: var(--color-surface-raised); border: 1px solid var(--color-border-subtle); color: var(--color-text-primary); border-radius: var(--radius-md); font-size: 0.8125rem;"
        />
        <div class="selector-filter-tabs" role="tablist" aria-label="Filter GPUs by brand" style="margin-bottom:0;border-bottom:none;padding-bottom:0;">
          {BRANDS.map(brand => (
            <button
              key={brand}
              role="tab"
              class={`filter-tab ${filter === brand ? 'filter-tab--active' : ''}`}
              aria-selected={filter === brand}
              onClick={() => setFilter(brand)}
              type="button"
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Options grid */}
      <div class="selector-options-grid" role="listbox" aria-label="GPU options">
        {filtered.map(gpu => (
          <button
            key={gpu.id}
            role="option"
            aria-selected={selected?.id === gpu.id}
            class={`hw-option ${selected?.id === gpu.id ? 'selected' : ''} ${!gpu.confirmed ? 'hw-option--unconfirmed' : ''}`}
            onClick={() => select(gpu)}
            type="button"
            aria-label={`${gpu.name}, ${gpu.tbp}W TBP, $${gpu.price}${!gpu.confirmed ? ', estimated specs — not yet confirmed by manufacturer' : ''}`}
          >
            <div class="hw-option-header">
              <span class="hw-option-brand">{gpu.brand}</span>
              <div style="display:flex;align-items:center;gap:6px;">
                {!gpu.confirmed && (
                  <span class="badge-warning" style="font-size:9px;padding:1px 5px;" aria-label="Estimated specs">⚠ EST.</span>
                )}
                {selected?.id === gpu.id && (
                  <span class="hw-option-check" aria-label="Selected">✓</span>
                )}
              </div>
            </div>
            <div class="hw-option-name">{gpu.name}</div>
            <div class="hw-option-specs">
              <span class="hw-spec tabular">{gpu.tbp}W TBP</span>
              <span class="hw-spec">{TIER_LABEL[gpu.tier as GpuTier]}</span>
              <span class="hw-spec">{gpu.connectorType}</span>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:4px;">
              <span class="hw-option-price tabular">${gpu.price}</span>
              <span class="hw-spec tabular" aria-label={`Minimum PSU: ${gpu.minPsuWattage} watts`}>Min {gpu.minPsuWattage}W PSU</span>
            </div>
          </button>
        ))}
      </div>
    </BayCard>
  );
}
