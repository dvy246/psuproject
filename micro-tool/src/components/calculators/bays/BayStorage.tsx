/** @jsxImportSource preact */
import { useState, useCallback } from 'preact/hooks';
import { BayCard } from './BayCard';
import type { StorageConfig } from '../../../types/components';
import componentData from '../../../data/components.json';
import { StorageIcon } from './BayIcons';
import { formatCurrency, type Locale } from '../../../i18n';

const ALL_STORAGE: StorageConfig[] = componentData.storage as StorageConfig[];

interface Props {
  selected: StorageConfig[];
  onSelect: (s: StorageConfig[]) => void;
  lang?: Locale;
}

export function BayStorage({ selected, onSelect, lang = 'en' }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(() => setIsOpen(p => !p), []);
  const clear  = useCallback(() => { onSelect([]); setIsOpen(false); }, [onSelect]);
  const key    = (s: StorageConfig) => `${s.type}-${s.capacity}`;

  const toggle_item = useCallback((s: StorageConfig) => {
    const k = key(s);
    const exists = selected.some(x => key(x) === k);
    if (exists) {
      onSelect(selected.filter(x => key(x) !== k));
    } else {
      onSelect([...selected, s]);
    }
  }, [selected, onSelect]);

  const sublabel = selected.length
    ? selected.map(s => `${s.capacity >= 1000 ? `${s.capacity/1000}TB` : `${s.capacity}GB`} ${s.type}`).join(' + ')
    : undefined;

  const storageLabel = lang === 'de' ? 'Speicher / SSD' : lang === 'es' ? 'Almacenamiento' : lang === 'fr' ? 'Stockage / SSD' : lang === 'ja' ? 'ストレージ (SSD/HDD)' : lang === 'zh' ? '存储硬盘 (SSD/HDD)' : 'Storage';
  const hintText = lang === 'de' ? 'Mehrere Laufwerke wählbar. Erneut klicken zum Abwählen.' : lang === 'es' ? 'Selecciona varios discos. Clic de nuevo para desmarcar.' : lang === 'fr' ? 'Sélectionnez plusieurs disques. Cliquez à nouveau pour désélectionner.' : lang === 'ja' ? '複数ドライブ選択可能。再クリックで解除。' : lang === 'zh' ? '可多选硬盘配置，再次点击即可取消选中。' : 'Select multiple drives. Click again to deselect.';

  return (
    <BayCard icon={<StorageIcon />} label={storageLabel} sublabel={sublabel} state={selected.length ? 'filled' : 'empty'} isOpen={isOpen} onToggle={toggle} onClear={selected.length ? clear : undefined} lang={lang}>
      <p class="selector-hint">{hintText}</p>
      <div class="selector-options-grid" role="listbox" aria-label="Storage options" aria-multiselectable="true">
        {ALL_STORAGE.map(s => {
          const k = key(s);
          const isSelected = selected.some(x => key(x) === k);
          return (
            <button key={k} role="option" aria-selected={isSelected} class={`hw-option ${isSelected ? 'selected' : ''}`} onClick={() => toggle_item(s)} type="button">
              <div class="hw-option-name">{s.capacity >= 1000 ? `${s.capacity/1000}TB` : `${s.capacity}GB`} {s.type}</div>
              <div class="hw-option-specs"><span class="hw-spec tabular">{s.typicalWatts}W</span></div>
              <div class="hw-option-price tabular">{formatCurrency(s.price, lang)}</div>
            </button>
          );
        })}
      </div>
    </BayCard>
  );
}
