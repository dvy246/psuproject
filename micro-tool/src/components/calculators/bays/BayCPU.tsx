/** @jsxImportSource preact */
import { useState, useCallback } from 'preact/hooks';
import { BayCard } from './BayCard';
import type { CpuIndex } from '../../../types/components';
import cpuData from '../../../data/index/cpus.index.json';

import { CpuIcon } from './BayIcons';

const ALL_CPUS = cpuData.items as CpuIndex[];
const BRANDS = ['All', 'AMD', 'Intel'] as const;

interface Props {
  selected: CpuIndex | null;
  onSelect: (cpu: CpuIndex | null) => void;
}

export function BayCPU({ selected, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'All' | 'AMD' | 'Intel'>('All');
  const [search, setSearch] = useState('');

  const toggle  = useCallback(() => setIsOpen(prev => !prev), []);
  const clear   = useCallback(() => { onSelect(null); setIsOpen(false); setSearch(''); }, [onSelect]);
  const select  = useCallback((cpu: CpuIndex) => {
    onSelect(cpu);
    setIsOpen(false);
    setSearch('');
  }, [onSelect]);

  const filtered = ALL_CPUS.filter(c => {
    const matchesBrand = filter === 'All' || c.brand === filter;
    const matchesSearch = !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.socket.toLowerCase().includes(search.toLowerCase());
    return matchesBrand && matchesSearch;
  });
  const state    = selected ? 'filled' : 'empty';

  return (
    <BayCard
      icon={<CpuIcon />}
      label="CPU"
      sublabel={selected?.name}
      state={state}
      isOpen={isOpen}
      onToggle={toggle}
      onClear={selected ? clear : undefined}
    >
      {/* Search and Brand filter tabs */}
      <div style="display:flex; flex-direction:column; gap: var(--spacing-2); margin-bottom: var(--spacing-3);">
        <input
          type="text"
          placeholder="Search CPUs by name, series, or socket (e.g. AM5, Intel)..."
          value={search}
          onInput={(e) => setSearch((e.target as HTMLInputElement).value)}
          style="width: 100%; min-height: 40px; padding: 0 var(--spacing-3); background: var(--color-surface-raised); border: 1px solid var(--color-border-subtle); color: var(--color-text-primary); border-radius: var(--radius-md); font-size: 0.8125rem;"
        />
        <div class="selector-filter-tabs" role="tablist" aria-label="Filter CPUs by brand" style="margin-bottom:0;border-bottom:none;padding-bottom:0;">
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
      <div class="selector-options-grid" role="listbox" aria-label="CPU options">
        {filtered.map(cpu => (
          <button
            key={cpu.id}
            role="option"
            aria-selected={selected?.id === cpu.id}
            class={`hw-option ${selected?.id === cpu.id ? 'selected' : ''}`}
            onClick={() => select(cpu)}
            type="button"
          >
            <div class="hw-option-header">
              <span class="hw-option-brand">{cpu.brand}</span>
              {selected?.id === cpu.id && (
                <span class="hw-option-check" aria-label="Selected">✓</span>
              )}
            </div>
            <div class="hw-option-name">{cpu.name}</div>
            <div class="hw-option-specs">
              <span class="hw-spec tabular">{cpu.tdpSustained}W TDP</span>
              <span class="hw-spec">{cpu.cores} cores</span>
              <span class="hw-spec">{cpu.socket}</span>
            </div>
            <div class="hw-option-price tabular">${cpu.price}</div>
          </button>
        ))}
      </div>
    </BayCard>
  );
}
