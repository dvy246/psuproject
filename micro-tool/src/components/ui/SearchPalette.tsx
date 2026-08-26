/** @jsxImportSource preact */
import { useEffect, useRef, useState } from 'preact/hooks';
import { useTranslations, l, type Locale } from '../../i18n';

interface SearchItem {
  id: string;
  name: string;
  type: 'cpu' | 'gpu' | 'psu' | 'case' | 'cooler' | 'guide' | 'tool' | 'combo' | 'upgrade';
  url: string;
  brand?: string;
  subtitle?: string;
}

interface Props {
  currentLang?: Locale;
}

export default function SearchPalette({ currentLang = 'en' }: Props) {
  const t = useTranslations(currentLang);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const indexRef = useRef<SearchItem[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 1. Fetch Search Index on mount
  useEffect(() => {
    fetch('/search-index.json')
      .then(res => res.json())
      .then(data => {
        indexRef.current = data;
      })
      .catch(err => console.error('Failed to load search index:', err));
  }, []);

  // 2. Event Listeners for shortcut keys (Cmd+K, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    const handleCustomOpen = () => setIsOpen(true);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-global-search', handleCustomOpen);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-global-search', handleCustomOpen);
    };
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // 3. Main search query matching logic
  useEffect(() => {
    if (!query.trim()) {
      const defaultItems = indexRef.current.filter(item => item.type === 'tool').slice(0, 5);
      setResults(defaultItems);
      setSelectedIndex(0);
      return;
    }

    const cleanQuery = query.toLowerCase().trim();
    const terms = cleanQuery.split(/\s+/).filter(Boolean);

    let matched = indexRef.current.filter(item => {
      const searchStr = `${item.name} ${item.brand ?? ''} ${item.type} ${item.subtitle ?? ''}`.toLowerCase();
      return terms.every(term => searchStr.includes(term));
    });

    let matchedGpu: SearchItem | null = null;
    let matchedCpu: SearchItem | null = null;

    for (const item of indexRef.current) {
      if (item.type === 'gpu' && cleanQuery.includes(item.id.replace('rtx-', '').replace('rx-', ''))) {
        matchedGpu = item;
      }
      if (item.type === 'cpu' && cleanQuery.includes(item.id.replace('ryzen-7-', '').replace('ryzen-9-', '').replace('ryzen-5-', '').replace('core-i9-', '').replace('core-i7-', '').replace('core-i5-', ''))) {
        matchedCpu = item;
      }
    }

    if (matchedGpu && matchedCpu) {
      const topGpuIds = ['rtx-5090', 'rtx-5080', 'rtx-5070-ti', 'rtx-5070', 'rtx-4090', 'rtx-4080-super', 'rtx-4070-ti-super', 'rtx-4070-super', 'rtx-4070', 'rtx-4060-ti'];
      const topCpuIds = ['ryzen-7-9800x3d', 'ryzen-9-9950x', 'ryzen-9-9900x', 'ryzen-7-9700x', 'ryzen-5-9600x', 'ryzen-7-7800x3d', 'ryzen-9-7950x3d', 'core-ultra-9-285k', 'core-ultra-7-265k', 'core-i9-14900k'];
      const isStaticPage = topGpuIds.includes(matchedGpu.id) && topCpuIds.includes(matchedCpu.id);

      const comboItem: SearchItem = {
        id: `${matchedGpu.id}-with-${matchedCpu.id}`,
        name: `${matchedGpu.name} + ${matchedCpu.name} Sizing Verdict`,
        type: 'combo',
        url: isStaticPage ? `/psu-for/${matchedGpu.id}-with-${matchedCpu.id}/` : `/psu-calculator?gpu=${matchedGpu.id}&cpu=${matchedCpu.id}`,
        brand: 'Hardware Pairing',
        subtitle: isStaticPage ? 'Pairing analysis page evaluating bottleneck and wattage constraints' : 'Calculate custom power requirements and transient spikes in PSU Calculator'
      };
      matched = [comboItem, ...matched.filter(item => item.id !== matchedGpu?.id && item.id !== matchedCpu?.id)];
    }

    const wattageMatch = cleanQuery.match(/(\d{3,4})\s*w/i) || cleanQuery.match(/\b(\d{3,4})\b/);
    if (wattageMatch && matchedGpu) {
      const wattage = parseInt(wattageMatch[1], 10);
      if ([550, 650, 750, 850, 1000].includes(wattage)) {
        const upgradeItem: SearchItem = {
          id: `can-${wattage}w-run-${matchedGpu.id}`,
          name: `Can a ${wattage}W PSU run an ${matchedGpu.name}?`,
          type: 'upgrade',
          url: `/psu-for/can-${wattage}w-run-${matchedGpu.id}/`,
          brand: 'Upgrade Checker',
          subtitle: 'Static upgrade checker page with transient excursion analysis'
        };
        matched = [upgradeItem, ...matched];
      }
    }

    setResults(matched.slice(0, 8));
    setSelectedIndex(0);
  }, [query]);

  const handleBackdropClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleInputKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (results.length > 0 ? (prev + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        window.location.href = l(results[selectedIndex].url, currentLang);
        setIsOpen(false);
      }
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'cpu': return t.search.typeCpu;
      case 'gpu': return t.search.typeGpu;
      case 'psu': return t.search.typePsu;
      case 'tool': return t.search.typeTool;
      case 'guide': return t.search.typeGuide;
      case 'combo': return t.search.typeCombo;
      case 'upgrade': return t.search.typeUpgrade;
      default: return type.toUpperCase();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      class="search-palette-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={t.search.paletteTitle}
    >
      <div class="search-palette-modal" ref={modalRef}>
        <div class="search-input-wrapper">
          <svg class="search-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            class="search-palette-input"
            placeholder={t.search.placeholder}
            value={query}
            onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
            onKeyDown={handleInputKeyDown}
            aria-autocomplete="list"
            aria-controls="search-results-list"
          />
          <button
            class="search-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label={t.common.close}
            type="button"
          >
            Esc
          </button>
        </div>

        <div class="search-results-container" id="search-results-list" role="listbox">
          {results.length > 0 ? (
            results.map((item, index) => (
              <a
                key={item.id}
                href={l(item.url, currentLang)}
                class={`search-result-item ${index === selectedIndex ? 'selected' : ''}`}
                role="option"
                aria-selected={index === selectedIndex}
                onClick={() => setIsOpen(false)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div class="search-item-main">
                  <div class="search-item-title-row">
                    <span class="search-item-name">{item.name}</span>
                    <span class={`search-type-badge search-badge-${item.type}`}>
                      {getTypeLabel(item.type)}
                    </span>
                  </div>
                  {item.subtitle && <span class="search-item-subtitle">{item.subtitle}</span>}
                </div>
                <svg class="search-item-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            ))
          ) : (
            <div class="search-no-results">
              <p>{t.search.noResults}</p>
            </div>
          )}
        </div>

        <div class="search-palette-footer">
          <span class="search-footer-hint">
            {t.search.hintKbd}
          </span>
        </div>
      </div>
    </div>
  );
}
