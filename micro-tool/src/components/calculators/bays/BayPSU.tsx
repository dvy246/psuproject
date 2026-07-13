/** @jsxImportSource preact */
import { useState, useCallback } from 'preact/hooks';
import { BayCard } from './BayCard';
import type { PsuIndex } from '../../../types/components';
import psuData from '../../../data/index/psus.index.json';

const ALL_PSUS = psuData.items as PsuIndex[];

interface Props {
  selected:      PsuIndex | null;
  mode:          'auto' | 'manual';
  onSelect:      (p: PsuIndex | null) => void;
  onModeChange:  (m: 'auto' | 'manual') => void;
}

const EFFICIENCY_ORDER = ['White', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Titanium'];

export function BayPSU({ selected, mode, onSelect, onModeChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterAtx, setFilterAtx] = useState<string>('All');
  const [search, setSearch] = useState('');
  const toggle = useCallback(() => setIsOpen(p => !p), []);
  const clear  = useCallback(() => { onSelect(null); setIsOpen(false); setSearch(''); }, [onSelect]);
  const select = useCallback((p: PsuIndex) => { onSelect(p); setIsOpen(false); setSearch(''); }, [onSelect]);

  const atxOptions = ['All', '3.1', '3.0', '2.x'];
  const filtered = ALL_PSUS.filter(p => {
    const matchesAtx = filterAtx === 'All' || p.atxVersion === filterAtx;
    const matchesSearch = !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.wattage.toString().includes(search);
    return matchesAtx && matchesSearch;
  });

  // Sort by efficiency tier descending
  const sorted = [...filtered].sort((a, b) =>
    EFFICIENCY_ORDER.indexOf(b.efficiencyTier) - EFFICIENCY_ORDER.indexOf(a.efficiencyTier)
  );

  const state = selected
    ? (selected.atxVersion === '3.1' ? 'filled' : selected.atxVersion === '3.0' ? 'filled' : 'warning')
    : 'empty';

  return (
    <BayCard
      icon="🟠"
      label="Power Supply"
      sublabel={selected ? `${selected.brand} ${selected.wattage}W ${selected.efficiencyTier} · ATX ${selected.atxVersion}` : undefined}
      state={state}
      isOpen={isOpen}
      onToggle={toggle}
      onClear={selected ? clear : undefined}
    >
      {/* Mode toggle */}
      <div class="selector-mode-toggle" role="group" aria-label="PSU selection mode">
        <button
          class={`mode-tab ${mode === 'auto' ? 'mode-tab--active' : ''}`}
          onClick={() => onModeChange('auto')}
          aria-pressed={mode === 'auto'}
          type="button"
        >Auto-recommend</button>
        <button
          class={`mode-tab ${mode === 'manual' ? 'mode-tab--active' : ''}`}
          onClick={() => onModeChange('manual')}
          aria-pressed={mode === 'manual'}
          type="button"
        >Manual select</button>
      </div>

      {mode === 'auto' && (
        <p class="selector-hint">
          Run PSU analysis to get an auto-recommended PSU for your build.
          Or switch to Manual to browse all options.
        </p>
      )}

      {mode === 'manual' && (
        <>
          {/* Search and ATX version filter */}
          <div style="display:flex; flex-direction:column; gap: var(--spacing-2); margin-bottom: var(--spacing-3);">
            <input
              type="text"
              placeholder="Search PSUs by brand, name, or wattage (e.g. Corsair, 850W)..."
              value={search}
              onInput={(e) => setSearch((e.target as HTMLInputElement).value)}
              style="width: 100%; min-height: 40px; padding: 0 var(--spacing-3); background: var(--color-surface-raised); border: 1px solid var(--color-border-subtle); color: var(--color-text-primary); border-radius: var(--radius-md); font-size: 0.8125rem;"
            />
            <div class="selector-filter-tabs" role="tablist" aria-label="Filter by ATX version" style="margin-bottom:0;border-bottom:none;padding-bottom:0;">
              {atxOptions.map(v => (
                <button key={v} role="tab" class={`filter-tab ${filterAtx === v ? 'filter-tab--active' : ''}`} aria-selected={filterAtx === v} onClick={() => setFilterAtx(v)} type="button">{v === 'All' ? 'All ATX' : `ATX ${v}`}</button>
              ))}
            </div>
          </div>

          <div class="selector-options-grid" role="listbox" aria-label="PSU options">
            {sorted.map(p => {
              const isAtx31 = p.atxVersion === '3.1';
              return (
                <button key={p.id} role="option" aria-selected={selected?.id === p.id} class={`hw-option ${selected?.id === p.id ? 'selected' : ''}`} onClick={() => select(p)} type="button">
                  <div class="hw-option-header">
                    <span class="hw-option-brand">{p.brand}</span>
                    <div style="display:flex;gap:4px;align-items:center;">
                      {isAtx31 && <span class="badge-safe" style="font-size:9px;padding:1px 5px;">ATX 3.1</span>}
                      {selected?.id === p.id && <span class="hw-option-check">✓</span>}
                    </div>
                  </div>
                  <div class="hw-option-name">{p.name}</div>
                  <div class="hw-option-specs">
                    <span class="hw-spec tabular">{p.wattage}W</span>
                    <span class="hw-spec">{p.efficiencyTier}</span>
                    <span class="hw-spec">{p.modular}</span>
                  </div>
                  <div class="hw-option-price tabular">${p.price}</div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </BayCard>
  );
}
