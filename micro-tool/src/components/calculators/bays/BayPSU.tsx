/** @jsxImportSource preact */
import { useState, useCallback } from 'preact/hooks';
import { BayCard } from './BayCard';
import type { PsuIndex } from '../../../types/components';
import psuData from '../../../data/index/psus.index.json';
import { PsuIcon } from './BayIcons';
import { formatCurrency, type Locale } from '../../../i18n';

const ALL_PSUS = psuData.items as PsuIndex[];

interface Props {
  selected:      PsuIndex | null;
  mode:          'auto' | 'manual';
  onSelect:      (p: PsuIndex | null) => void;
  onModeChange:  (m: 'auto' | 'manual') => void;
  lang?:         Locale;
}

const EFFICIENCY_ORDER = ['White', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Titanium'];

export function BayPSU({ selected, mode, onSelect, onModeChange, lang = 'en' }: Props) {
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

  const sorted = [...filtered].sort((a, b) =>
    EFFICIENCY_ORDER.indexOf(b.efficiencyTier) - EFFICIENCY_ORDER.indexOf(a.efficiencyTier)
  );

  const state = selected
    ? (selected.atxVersion === '3.1' ? 'filled' : selected.atxVersion === '3.0' ? 'filled' : 'warning')
    : 'empty';

  const psuLabel = lang === 'de' ? 'Netzteil (PSU)' : lang === 'es' ? 'Fuente de Alimentación' : lang === 'fr' ? 'Alimentation (PSU)' : lang === 'ja' ? '電源ユニット (PSU)' : lang === 'zh' ? '电源供应器 (PSU)' : 'Power Supply';
  const autoTab = lang === 'de' ? 'Automatisch berechnen' : lang === 'es' ? 'Auto-recomendación' : lang === 'fr' ? 'Recommandation auto' : lang === 'ja' ? '自動推奨モード' : lang === 'zh' ? '智能自动匹配' : 'Auto-recommend';
  const manualTab = lang === 'de' ? 'Manuell auswählen' : lang === 'es' ? 'Selección manual' : lang === 'fr' ? 'Sélection manuelle' : lang === 'ja' ? '手動選択モード' : lang === 'zh' ? '手动指定型号' : 'Manual select';
  const autoHint = lang === 'de' ? 'Führen Sie die Netzteil-Analyse durch, um ein passendes Netzteil für Ihr System zu berechnen. Oder schalten Sie auf Manuell um.' : lang === 'es' ? 'Calcula la fuente recomendada para tu PC o cambia a manual para elegir modelo.' : lang === 'fr' ? 'Obtenez une alimentation automatiquement dimensionnée ou choisissez manuellement.' : lang === 'ja' ? 'システム構成に合わせて最適な電源を自動計算します。手動で特定モデルを選ぶことも可能です。' : lang === 'zh' ? '根据整机硬件瞬态峰值自动计算推荐适配电源，亦可切换至手动模式自由选定具体型号。' : 'Run PSU analysis to get an auto-recommended PSU for your build. Or switch to Manual to browse all options.';
  const searchPlaceholder = lang === 'de' ? 'Netzteile suchen (z.B. Corsair, 850W, Seasonic)...' : lang === 'es' ? 'Buscar fuentes por marca, modelo o vatios (ej. Corsair, 850W)...' : lang === 'fr' ? 'Rechercher une alimentation (ex. Corsair, 850W)...' : lang === 'ja' ? '電源を検索 (例: Corsair, 850W, Seasonic)...' : lang === 'zh' ? '按品牌或功率搜索电源 (如 Corsair, 850W, 海韵)...' : 'Search PSUs by brand, name, or wattage (e.g. Corsair, 850W)...';

  return (
    <BayCard
      icon={<PsuIcon />}
      label={psuLabel}
      sublabel={selected ? `${selected.brand} ${selected.wattage}W ${selected.efficiencyTier} · ATX ${selected.atxVersion}` : undefined}
      wattageBadge={selected ? `⚡ ${selected.wattage}W ${selected.efficiencyTier}` : undefined}
      state={state}
      isOpen={isOpen}
      onToggle={toggle}
      onClear={selected ? clear : undefined}
      lang={lang}
    >
      {/* Mode toggle */}
      <div class="selector-mode-toggle" role="group" aria-label="PSU selection mode">
        <button
          class={`mode-tab ${mode === 'auto' ? 'mode-tab--active' : ''}`}
          onClick={() => onModeChange('auto')}
          aria-pressed={mode === 'auto'}
          type="button"
        >{autoTab}</button>
        <button
          class={`mode-tab ${mode === 'manual' ? 'mode-tab--active' : ''}`}
          onClick={() => onModeChange('manual')}
          aria-pressed={mode === 'manual'}
          type="button"
        >{manualTab}</button>
      </div>

      {mode === 'auto' && (
        <p class="selector-hint">
          {autoHint}
        </p>
      )}

      {mode === 'manual' && (
        <>
          {/* Search and ATX version filter */}
          <div style="display:flex; flex-direction:column; gap: var(--spacing-2); margin-bottom: var(--spacing-3);">
            <input
              type="text"
              placeholder={searchPlaceholder}
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
                  <div class="hw-option-price tabular">{formatCurrency(p.price, lang)}</div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </BayCard>
  );
}
