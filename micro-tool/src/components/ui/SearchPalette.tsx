/** @jsxImportSource preact */
import { useEffect, useRef, useState, useCallback } from 'preact/hooks';

interface SearchItem {
  id: string;
  name: string;
  type: 'cpu' | 'gpu' | 'psu' | 'case' | 'cooler' | 'guide' | 'tool' | 'combo' | 'upgrade';
  url: string;
  brand?: string;
  subtitle?: string;
}

export default function SearchPalette() {
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
      // Toggle on Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      // Close on Escape
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
      // Return top tools and calculators as default recommendations
      const defaultItems = indexRef.current.filter(item => item.type === 'tool').slice(0, 5);
      setResults(defaultItems);
      setSelectedIndex(0);
      return;
    }

    const cleanQuery = query.toLowerCase().trim();
    const terms = cleanQuery.split(/\s+/).filter(Boolean);

    // Initial filter matching all query terms
    let matched = indexRef.current.filter(item => {
      const searchStr = `${item.name} ${item.brand ?? ''} ${item.type} ${item.subtitle ?? ''}`.toLowerCase();
      return terms.every(term => searchStr.includes(term));
    });

    // ── DYNAMIC MATCHING MOATS ──
    // A. GPU + CPU Combo match
    // e.g. "5080 with 9800x3d" or "4070 7800x3d"
    let matchedGpu: SearchItem | null = null;
    let matchedCpu: SearchItem | null = null;

    // Search for a CPU and a GPU in the search query
    for (const item of indexRef.current) {
      if (item.type === 'gpu' && cleanQuery.includes(item.id.replace('rtx-', '').replace('rx-', ''))) {
        matchedGpu = item;
      }
      if (item.type === 'cpu' && cleanQuery.includes(item.id.replace('ryzen-7-', '').replace('ryzen-9-', '').replace('ryzen-5-', '').replace('core-i9-', '').replace('core-i7-', '').replace('core-i5-', ''))) {
        matchedCpu = item;
      }
    }

    if (matchedGpu && matchedCpu) {
      const comboItem: SearchItem = {
        id: `${matchedGpu.id}-with-${matchedCpu.id}`,
        name: `${matchedGpu.name} + ${matchedCpu.name} Sizing Verdict`,
        type: 'combo',
        url: `/psu-for/${matchedGpu.id}-with-${matchedCpu.id}/`,
        brand: 'Dynamic Combo',
        subtitle: 'Pairing analysis page evaluating bottleneck and wattage constraints'
      };
      // Inject at the top of results
      matched = [comboItem, ...matched.filter(item => item.id !== matchedGpu?.id && item.id !== matchedCpu?.id)];
    }

    // B. Wattage + GPU Upgrade Sizer match
    // e.g. "can 750w run 5090" or "850w and 4090"
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

  // 4. Modal event listener to close when clicking outside
  const handleBackdropClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  // 5. Keyboard Navigation inside list
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
        window.location.href = results[selectedIndex].url;
        setIsOpen(false);
      }
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'cpu':
        return (
          <svg class="search-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
            <rect x="9" y="9" width="6" height="6" />
            <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
            <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
            <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="15" x2="23" y2="15" />
            <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="15" x2="4" y2="15" />
          </svg>
        );
      case 'gpu':
        return (
          <svg class="search-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        );
      case 'psu':
        return (
          <svg class="search-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="M12 12h4v4h-4z" />
          </svg>
        );
      case 'guide':
        return (
          <svg class="search-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        );
      case 'tool':
        return (
          <svg class="search-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        );
      case 'combo':
        return (
          <svg class="search-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case 'upgrade':
        return (
          <svg class="search-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 8 22 12 18 16" />
            <line x1="2" y1="12" x2="22" y2="12" />
          </svg>
        );
      default:
        return (
          <svg class="search-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        );
    }
  };

  // Expose trigger globally so header button can open search
  useEffect(() => {
    const handleOpenSearch = () => setIsOpen(true);
    window.addEventListener('open-global-search', handleOpenSearch);
    return () => window.removeEventListener('open-global-search', handleOpenSearch);
  }, []);

  if (!isOpen) return null;

  return (
    <div class="search-backdrop" onClick={handleBackdropClick} role="dialog" aria-modal="true" aria-label="Global Search">
      <div class="search-modal" ref={modalRef}>
        {/* Search Input */}
        <div class="search-input-wrapper">
          <svg class="search-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            class="search-input-field"
            placeholder="Search specs, guides, or type combos (e.g. '5080 with 9800x3d')..."
            value={query}
            onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
            onKeyDown={handleInputKeyDown}
            aria-autocomplete="list"
            aria-controls="search-results-list"
          />
          <span class="search-esc-badge">ESC</span>
        </div>

        {/* Results List */}
        <div class="search-results-list" id="search-results-list" role="listbox">
          {results.length > 0 ? (
            results.map((item, idx) => (
              <div
                key={item.id}
                role="option"
                aria-selected={idx === selectedIndex}
                class={`search-result-item ${idx === selectedIndex ? 'search-result-item--active' : ''}`}
                onClick={() => {
                  window.location.href = item.url;
                  setIsOpen(false);
                }}
              >
                <div class="search-result-icon">
                  {getIcon(item.type)}
                </div>
                <div class="search-result-info">
                  <div class="search-result-name">
                    {item.name}
                    {item.brand && <span class="search-result-brand">{item.brand}</span>}
                  </div>
                  <div class="search-result-subtitle">{item.subtitle}</div>
                </div>
                <div class="search-result-arrow">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </div>
            ))
          ) : (
            <div class="search-no-results">
              No matches found for <strong style="color:var(--accent-primary);">"{query}"</strong>
              <p style="font-size:0.75rem;color:var(--text-tertiary);margin-top:0.25rem;">Try searching for specific models like "5090", "7800x3d", "rm850x", or guides like "atx 3.1".</p>
            </div>
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div class="search-footer">
          <div class="search-shortcuts">
            <span><kbd>↑↓</kbd> Navigate</span>
            <span><kbd>Enter</kbd> Select</span>
            <span><kbd>Esc</kbd> Close</span>
          </div>
          <div class="search-footer-brand">VoltForge Search</div>
        </div>
      </div>
    </div>
  );
}
