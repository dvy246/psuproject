/** @jsxImportSource preact */
import { useState, useCallback } from 'preact/hooks';
import { BayCard } from './BayCard';
import type { MotherboardIndex, CpuIndex } from '../../../types/components';
import moboData from '../../../data/index/motherboards.index.json';
import { MotherboardIcon } from './BayIcons';
import { formatCurrency, type Locale } from '../../../i18n';

const ALL_MOBOS = moboData.items as MotherboardIndex[];

interface Props {
  selected: MotherboardIndex | null;
  selectedCpu: CpuIndex | null;
  onSelect: (mobo: MotherboardIndex | null) => void;
  lang?: Locale;
}

export function BayMotherboard({ selected, selectedCpu, onSelect, lang = 'en' }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(() => setIsOpen(p => !p), []);
  const clear  = useCallback(() => { onSelect(null); setIsOpen(false); }, [onSelect]);
  const select = useCallback((m: MotherboardIndex) => { onSelect(m); setIsOpen(false); }, [onSelect]);

  // Compatibility check with CPU socket
  const compatible = !selected || !selectedCpu || selected.socket === selectedCpu.socket;
  const state = !selected ? 'empty' : !compatible ? 'danger' : 'filled';

  // Filter by CPU socket if CPU is selected
  const options = selectedCpu
    ? ALL_MOBOS.filter(m => m.socket === selectedCpu.socket)
    : ALL_MOBOS;

  const mismatchLabel = lang === 'de' ? 'Sockel-Inkompatibilität' : lang === 'es' ? 'Socket incompatible' : lang === 'fr' ? 'Socket incompatible' : lang === 'ja' ? 'ソケット不一致' : lang === 'zh' ? 'CPU插槽不兼容' : 'Socket mismatch';
  const label = lang === 'de' ? 'Mainboard' : lang === 'es' ? 'Placa Base' : lang === 'fr' ? 'Carte Mère' : lang === 'ja' ? 'マザーボード' : lang === 'zh' ? '主板' : 'Motherboard';

  return (
    <BayCard
      icon={<MotherboardIcon />}
      label={label}
      sublabel={selected ? `${selected.name}${!compatible ? ` ✕ ${mismatchLabel}` : ''}` : undefined}
      state={state}
      isOpen={isOpen}
      onToggle={toggle}
      onClear={selected ? clear : undefined}
      lang={lang}
    >
      {selectedCpu && (
        <p class="selector-hint">
          {options.length} {selectedCpu.socket}
        </p>
      )}
      <div class="selector-options-grid" role="listbox" aria-label="Motherboard options">
        {options.map(m => (
          <button
            key={m.id}
            role="option"
            aria-selected={selected?.id === m.id}
            class={`hw-option ${selected?.id === m.id ? 'selected' : ''}`}
            onClick={() => select(m)}
            type="button"
          >
            <div class="hw-option-header">
              <span class="hw-option-brand">{m.brand}</span>
              {selected?.id === m.id && <span class="hw-option-check">✓</span>}
            </div>
            <div class="hw-option-name">{m.name}</div>
            <div class="hw-option-specs">
              <span class="hw-spec">{m.socket}</span>
              <span class="hw-spec">{m.chipset}</span>
              <span class="hw-spec">{m.formFactor}</span>
            </div>
            <div class="hw-option-price tabular">{formatCurrency(m.price, lang)}</div>
          </button>
        ))}
      </div>
    </BayCard>
  );
}
