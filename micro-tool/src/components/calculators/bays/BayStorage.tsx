/** @jsxImportSource preact */
import { useState, useCallback } from 'preact/hooks';
import { BayCard } from './BayCard';
import type { StorageConfig } from '../../../types/components';
import componentData from '../../../data/components.json';

const ALL_STORAGE: StorageConfig[] = componentData.storage as StorageConfig[];

interface Props { selected: StorageConfig[]; onSelect: (s: StorageConfig[]) => void; }

export function BayStorage({ selected, onSelect }: Props) {
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

  return (
    <BayCard icon="⚪" label="Storage" sublabel={sublabel} state={selected.length ? 'filled' : 'empty'} isOpen={isOpen} onToggle={toggle} onClear={selected.length ? clear : undefined}>
      <p class="selector-hint">Select multiple drives. Click again to deselect.</p>
      <div class="selector-options-grid" role="listbox" aria-label="Storage options" aria-multiselectable="true">
        {ALL_STORAGE.map(s => {
          const k = key(s);
          const isSelected = selected.some(x => key(x) === k);
          return (
            <button key={k} role="option" aria-selected={isSelected} class={`hw-option ${isSelected ? 'selected' : ''}`} onClick={() => toggle_item(s)} type="button">
              <div class="hw-option-name">{s.capacity >= 1000 ? `${s.capacity/1000}TB` : `${s.capacity}GB`} {s.type}</div>
              <div class="hw-option-specs"><span class="hw-spec tabular">{s.typicalWatts}W</span></div>
              <div class="hw-option-price tabular">${s.price}</div>
            </button>
          );
        })}
      </div>
    </BayCard>
  );
}
