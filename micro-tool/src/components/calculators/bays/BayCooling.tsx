/** @jsxImportSource preact */
import { useState, useCallback } from 'preact/hooks';
import { BayCard } from './BayCard';
import type { CoolingConfig } from '../../../types/components';
import componentData from '../../../data/components.json';

const ALL_COOLING: CoolingConfig[] = componentData.cooling as CoolingConfig[];
const LABELS: Record<string, string> = {
  'stock': 'Stock Cooler (included)', 'air-tower': 'Air Tower Cooler',
  'aio-240': '240mm AIO Liquid', 'aio-360': '360mm AIO Liquid', 'custom-loop': 'Custom Loop'
};

interface Props { selected: CoolingConfig | null; onSelect: (c: CoolingConfig | null) => void; }
export function BayCooling({ selected, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(() => setIsOpen(p => !p), []);
  const clear  = useCallback(() => { onSelect(null); setIsOpen(false); }, [onSelect]);
  const select = useCallback((c: CoolingConfig) => { onSelect(c); setIsOpen(false); }, [onSelect]);

  return (
    <BayCard icon="🔵" label="Cooling" sublabel={selected ? LABELS[selected.type] : undefined} state={selected ? 'filled' : 'empty'} isOpen={isOpen} onToggle={toggle} onClear={selected ? clear : undefined}>
      <div class="selector-options-grid" role="listbox" aria-label="Cooling options">
        {ALL_COOLING.map(c => (
          <button key={c.type} role="option" aria-selected={selected?.type === c.type} class={`hw-option ${selected?.type === c.type ? 'selected' : ''}`} onClick={() => select(c)} type="button">
            <div class="hw-option-name">{LABELS[c.type]}</div>
            <div class="hw-option-specs"><span class="hw-spec tabular">{c.typicalWatts}W</span></div>
            <div class="hw-option-price tabular">{c.price === 0 ? 'Included' : `$${c.price}`}</div>
          </button>
        ))}
      </div>
    </BayCard>
  );
}
