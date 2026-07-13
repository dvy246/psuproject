/** @jsxImportSource preact */
import { useState, useCallback } from 'preact/hooks';
import { BayCard } from './BayCard';
import type { RamConfig } from '../../../types/components';
import componentData from '../../../data/components.json';

const ALL_RAM: RamConfig[] = componentData.ram as RamConfig[];

interface Props { selected: RamConfig | null; onSelect: (r: RamConfig | null) => void; }
export function BayRAM({ selected, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(() => setIsOpen(p => !p), []);
  const clear  = useCallback(() => { onSelect(null); setIsOpen(false); }, [onSelect]);
  const select = useCallback((r: RamConfig) => { onSelect(r); setIsOpen(false); }, [onSelect]);
  const state  = selected ? 'filled' : 'empty';
  const key    = (r: RamConfig) => `${r.capacity}-${r.type}-${r.speed}-${r.sticks}`;

  return (
    <BayCard icon="🔴" label="RAM" sublabel={selected ? `${selected.capacity}GB ${selected.type}-${selected.speed}` : undefined} state={state} isOpen={isOpen} onToggle={toggle} onClear={selected ? clear : undefined}>
      <div class="selector-options-grid" role="listbox" aria-label="RAM options">
        {ALL_RAM.map(r => (
          <button key={key(r)} role="option" aria-selected={key(selected ?? {} as RamConfig) === key(r)} class={`hw-option ${key(selected ?? {} as RamConfig) === key(r) ? 'selected' : ''}`} onClick={() => select(r)} type="button">
            <div class="hw-option-name">{r.capacity}GB {r.type}-{r.speed}</div>
            <div class="hw-option-specs">
              <span class="hw-spec">{r.sticks}×{r.capacity/r.sticks}GB</span>
              <span class="hw-spec tabular">{r.typicalWatts}W</span>
            </div>
            <div class="hw-option-price tabular">${r.price}</div>
          </button>
        ))}
      </div>
    </BayCard>
  );
}
