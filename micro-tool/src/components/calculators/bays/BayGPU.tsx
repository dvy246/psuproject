/** @jsxImportSource preact */
import { useState, useCallback } from 'preact/hooks';
import { BayCard } from './BayCard';
import type { GpuIndex, GpuTier } from '../../../types/components';
import gpuData from '../../../data/index/gpus.index.json';
import { GpuIcon } from './BayIcons';
import { formatCurrency, type Locale } from '../../../i18n';

const ALL_GPUS = gpuData.items as GpuIndex[];
const BRANDS  = ['All', 'NVIDIA', 'AMD', 'Intel'] as const;

interface Props {
  selected: GpuIndex | null;
  onSelect: (gpu: GpuIndex | null) => void;
  lang?: Locale;
}

export function BayGPU({ selected, onSelect, lang = 'en' }: Props) {
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

  const estimatedLabel = lang === 'de' ? 'Geschätzt' : lang === 'es' ? 'Estimado' : lang === 'fr' ? 'Estimé' : lang === 'ja' ? '予測値' : lang === 'zh' ? '估算参数' : 'Estimated';
  const searchPlaceholder = lang === 'de' ? 'Grafikkarten suchen (z.B. 5090, 4070, AMD)...' : lang === 'es' ? 'Buscar GPUs por nombre o serie (ej. 5090, RTX 4070)...' : lang === 'fr' ? 'Rechercher un GPU (ex. 5090, 4070, AMD)...' : lang === 'ja' ? 'グラフィックボードを検索 (例: 5090, RTX 4070)...' : lang === 'zh' ? '按型号或系列搜索显卡 (如 5090, RTX 4070, AMD)...' : 'Search GPUs by name, architecture, or series (e.g. Blackwell, 5090)...';
  const allBrandLabel = lang === 'de' ? 'Alle' : lang === 'es' ? 'Todos' : lang === 'fr' ? 'Tous' : lang === 'ja' ? 'すべて' : lang === 'zh' ? '全部' : 'All';

  return (
    <BayCard
      icon={<GpuIcon />}
      label="GPU"
      sublabel={selected ? `${selected.name}${!selected.confirmed ? ` ⚠ ${estimatedLabel}` : ''}` : undefined}
      wattageBadge={selected ? `⚡ ${selected.tbp}W TBP` : undefined}
      state={state}
      isOpen={isOpen}
      onToggle={toggle}
      onClear={selected ? clear : undefined}
      lang={lang}
    >
      {/* Search and Brand filter tabs */}
      <div style="display:flex; flex-direction:column; gap: var(--spacing-2); margin-bottom: var(--spacing-3);">
        <input
          type="text"
          placeholder={searchPlaceholder}
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
              {brand === 'All' ? allBrandLabel : brand}
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
            aria-label={`${gpu.name}, ${gpu.tbp}W TBP, ${formatCurrency(gpu.price, lang)}`}
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
              <span class="hw-spec" style="text-transform:capitalize;">{gpu.tier}</span>
              <span class="hw-spec">{gpu.connectorType}</span>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:4px;">
              <span class="hw-option-price tabular">{formatCurrency(gpu.price, lang)}</span>
              <span class="hw-spec tabular">Min {gpu.minPsuWattage}W PSU</span>
            </div>
          </button>
        ))}
      </div>
    </BayCard>
  );
}
