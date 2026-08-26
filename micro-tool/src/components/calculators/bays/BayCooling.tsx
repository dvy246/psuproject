/** @jsxImportSource preact */
import { useState, useCallback } from 'preact/hooks';
import { BayCard } from './BayCard';
import type { CoolingConfig } from '../../../types/components';
import componentData from '../../../data/components.json';
import { CoolingIcon } from './BayIcons';
import { formatCurrency, type Locale } from '../../../i18n';

const ALL_COOLING: CoolingConfig[] = componentData.cooling as CoolingConfig[];

const LABELS_EN: Record<string, string> = {
  'stock': 'Stock Cooler (included)', 'air-tower': 'Air Tower Cooler',
  'aio-240': '240mm AIO Liquid', 'aio-360': '360mm AIO Liquid', 'custom-loop': 'Custom Loop'
};

const LABELS_DE: Record<string, string> = {
  'stock': 'Boxed-Kühler (im Lieferumfang)', 'air-tower': 'Luftkühler (Tower)',
  'aio-240': '240mm AIO Wasserkühlung', 'aio-360': '360mm AIO Wasserkühlung', 'custom-loop': 'Custom-Wasserkühlung'
};

const LABELS_ES: Record<string, string> = {
  'stock': 'Disipador de Serie (incluido)', 'air-tower': 'Disipador por Aire en Torre',
  'aio-240': 'Refrigeración Líquida AIO 240mm', 'aio-360': 'Refrigeración Líquida AIO 360mm', 'custom-loop': 'Líquida Custom'
};

const LABELS_FR: Record<string, string> = {
  'stock': 'Ventirad Stock (inclus)', 'air-tower': 'Ventirad Tour',
  'aio-240': 'Watercooling AIO 240mm', 'aio-360': 'Watercooling AIO 360mm', 'custom-loop': 'Watercooling Custom'
};

const LABELS_JA: Record<string, string> = {
  'stock': '付属リテールクーラー (標準)', 'air-tower': 'サイドフロー空冷CPUクーラー',
  'aio-240': '240mm 簡易水冷 (AIO)', 'aio-360': '360mm 簡易水冷 (AIO)', 'custom-loop': '本格水冷 (Custom Loop)'
};

const LABELS_ZH: Record<string, string> = {
  'stock': '原装自带风冷散热器', 'air-tower': '单/双塔单向风冷散热器',
  'aio-240': '240mm 一体式水冷 (AIO)', 'aio-360': '360mm 一体式水冷 (AIO)', 'custom-loop': '分体式水冷 (Custom Loop)'
};

function getCoolingLabels(lang: Locale): Record<string, string> {
  if (lang === 'de') return LABELS_DE;
  if (lang === 'es') return LABELS_ES;
  if (lang === 'fr') return LABELS_FR;
  if (lang === 'ja') return LABELS_JA;
  if (lang === 'zh') return LABELS_ZH;
  return LABELS_EN;
}

interface Props { selected: CoolingConfig | null; onSelect: (c: CoolingConfig | null) => void; lang?: Locale; }

export function BayCooling({ selected, onSelect, lang = 'en' }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(() => setIsOpen(p => !p), []);
  const clear  = useCallback(() => { onSelect(null); setIsOpen(false); }, [onSelect]);
  const select = useCallback((c: CoolingConfig) => { onSelect(c); setIsOpen(false); }, [onSelect]);

  const labels = getCoolingLabels(lang);
  const includedText = lang === 'de' ? 'Inklusive' : lang === 'es' ? 'Incluido' : lang === 'fr' ? 'Inclus' : lang === 'ja' ? '付属 (無料)' : lang === 'zh' ? '标配自带' : 'Included';
  const coolingLabel = lang === 'de' ? 'Kühlung' : lang === 'es' ? 'Refrigeración' : lang === 'fr' ? 'Refroidissement' : lang === 'ja' ? '冷却クーラー' : lang === 'zh' ? 'CPU散热器' : 'Cooling';

  return (
    <BayCard icon={<CoolingIcon />} label={coolingLabel} sublabel={selected ? labels[selected.type] : undefined} state={selected ? 'filled' : 'empty'} isOpen={isOpen} onToggle={toggle} onClear={selected ? clear : undefined} lang={lang}>
      <div class="selector-options-grid" role="listbox" aria-label="Cooling options">
        {ALL_COOLING.map(c => (
          <button key={c.type} role="option" aria-selected={selected?.type === c.type} class={`hw-option ${selected?.type === c.type ? 'selected' : ''}`} onClick={() => select(c)} type="button">
            <div class="hw-option-name">{labels[c.type] || c.type}</div>
            <div class="hw-option-specs"><span class="hw-spec tabular">{c.typicalWatts}W</span></div>
            <div class="hw-option-price tabular">{c.price === 0 ? includedText : formatCurrency(c.price, lang)}</div>
          </button>
        ))}
      </div>
    </BayCard>
  );
}
