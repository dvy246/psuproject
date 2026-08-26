/** @jsxImportSource preact */
import { useState, useCallback } from 'preact/hooks';
import { BayCard } from './BayCard';
import type { CpuIndex } from '../../../types/components';
import cpuData from '../../../data/index/cpus.index.json';
import { CpuIcon } from './BayIcons';
import { formatCurrency, type Locale } from '../../../i18n';

const ALL_CPUS = cpuData.items as CpuIndex[];
const BRANDS = ['All', 'AMD', 'Intel'] as const;

interface Props {
  selected: CpuIndex | null;
  onSelect: (cpu: CpuIndex | null) => void;
  lang?: Locale;
}

export function BayCPU({ selected, onSelect, lang = 'en' }: Props) {
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

  const coresSuffix = lang === 'de' ? 'Kerne' : lang === 'es' ? 'núcleos' : lang === 'fr' ? 'cœurs' : lang === 'ja' ? 'コア' : lang === 'zh' ? '核' : 'cores';
  const searchPlaceholder = lang === 'de' ? 'Prozessoren suchen (z.B. 9800X3D, AM5, Intel)...' : lang === 'es' ? 'Buscar CPUs por nombre o socket (ej. AM5, Intel)...' : lang === 'fr' ? 'Rechercher un CPU (ex. AM5, Intel)...' : lang === 'ja' ? 'CPUを検索 (例: AM5, 9800X3D, Intel)...' : lang === 'zh' ? '按型号、系列或插槽搜索CPU (如 AM5, Intel)...' : 'Search CPUs by name, series, or socket (e.g. AM5, Intel)...';
  const allBrandLabel = lang === 'de' ? 'Alle' : lang === 'es' ? 'Todos' : lang === 'fr' ? 'Tous' : lang === 'ja' ? 'すべて' : lang === 'zh' ? '全部' : 'All';

  return (
    <BayCard
      icon={<CpuIcon />}
      label="CPU"
      sublabel={selected?.name}
      wattageBadge={selected ? `⚡ ${selected.tdpSustained}W TDP` : undefined}
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
              {brand === 'All' ? allBrandLabel : brand}
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
              <span class="hw-spec">{cpu.cores} {coresSuffix}</span>
              <span class="hw-spec">{cpu.socket}</span>
            </div>
            <div class="hw-option-price tabular">{formatCurrency(cpu.price, lang)}</div>
          </button>
        ))}
      </div>
    </BayCard>
  );
}
