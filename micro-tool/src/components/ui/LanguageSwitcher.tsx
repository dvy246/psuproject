/** @jsxImportSource preact */
import { useState, useRef, useEffect } from 'preact/hooks';
import { SUPPORTED_LOCALES, LOCALES_META, type Locale } from '../../i18n/locales';
import { l, getCleanPath } from '../../i18n/utils';

interface Props {
  currentLang: Locale;
  variant?: 'header' | 'footer';
}

export default function LanguageSwitcher({ currentLang = 'en', variant = 'header' }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<Locale>(currentLang);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedLang(currentLang);
  }, [currentLang]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle switching language
  const handleSelectLanguage = (targetLang: Locale) => {
    if (targetLang === currentLang) {
      setIsOpen(false);
      return;
    }

    try {
      localStorage.setItem('vf-lang', targetLang);
    } catch {
      // ignore
    }

    const currentPath = window.location.pathname;
    const cleanPath = getCleanPath(currentPath);
    const localizedPath = l(cleanPath, targetLang);
    const targetUrl = localizedPath + window.location.search + window.location.hash;

    window.location.href = targetUrl;
  };

  const currentMeta = LOCALES_META[selectedLang] || LOCALES_META.en;

  return (
    <div
      ref={dropdownRef}
      class={`lang-switcher-container ${variant === 'footer' ? 'lang-switcher--footer' : ''}`}
      style="position:relative; display:inline-block;"
    >
      <button
        type="button"
        class="btn btn-secondary btn-sm lang-switcher-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Select language. Current: ${currentMeta.name}`}
        style="display:inline-flex; align-items:center; gap:6px; min-height:36px; padding:4px 10px; font-size:0.82rem; font-weight:600; cursor:pointer; background:var(--color-bg-secondary, rgba(255,255,255,0.05)); border:1px solid var(--color-border-subtle, rgba(255,255,255,0.12)); border-radius:6px; color:var(--color-text-primary, #fff);"
      >
        <span style="font-size:1.05rem; line-height:1;" aria-hidden="true">{currentMeta.flag}</span>
        <span class="lang-name-text">{currentMeta.name}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          style={`transition:transform 0.2s; transform:rotate(${isOpen ? '180deg' : '0deg'});`}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <ul
          class="lang-switcher-dropdown"
          role="listbox"
          aria-label="Available languages"
          style="position:absolute; right:0; top:calc(100% + 6px); z-index:9999; min-width:170px; background:var(--color-bg-elevated, #161b22); border:1px solid var(--color-border-subtle, rgba(255,255,255,0.15)); border-radius:8px; box-shadow:0 10px 25px rgba(0,0,0,0.5); padding:4px; margin:0; list-style:none;"
        >
          {SUPPORTED_LOCALES.map(loc => {
            const meta = LOCALES_META[loc];
            const isSelected = loc === currentLang;
            return (
              <li key={loc} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => handleSelectLanguage(loc)}
                  style={`display:flex; align-items:center; justify-content:space-between; width:100%; padding:8px 12px; font-size:0.84rem; font-weight:${isSelected ? '700' : '500'}; color:${isSelected ? 'var(--color-accent-cyan, #38bdf8)' : 'var(--color-text-primary, #e6edf3)'}; background:${isSelected ? 'rgba(56,189,248,0.1)' : 'transparent'}; border:none; border-radius:6px; cursor:pointer; text-align:left; transition:background 0.15s;`}
                  onMouseEnter={e => {
                    if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                  }}
                  onMouseLeave={e => {
                    if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                >
                  <span style="display:inline-flex; align-items:center; gap:8px;">
                    <span style="font-size:1.1rem; line-height:1;" aria-hidden="true">{meta.flag}</span>
                    <span>{meta.name}</span>
                  </span>
                  {isSelected && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
