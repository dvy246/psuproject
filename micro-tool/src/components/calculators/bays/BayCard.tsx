/** @jsxImportSource preact */
// ============================================================
// PSUCheck — Bay Component Base (i18n Enabled)
// ============================================================

import { useRef, useCallback, useId } from 'preact/hooks';
import type { ComponentChildren } from 'preact';
import type { Locale } from '../../../i18n/locales';

export type BayState = 'empty' | 'filled' | 'warning' | 'danger';

interface BayCardProps {
  icon:        ComponentChildren; // JSX SVG icon
  label:       string;
  sublabel?:   string;
  wattageBadge?: string;
  state:       BayState;
  isOpen:      boolean;
  onToggle:    () => void;
  onClear?:    () => void;
  children:    ComponentChildren; // selector tray content
  id?:         string;
  lang?:       Locale;
}

const STATE_BORDER: Record<BayState, string> = {
  empty:   'bay-card--empty',
  filled:  'bay-card--filled',
  warning: 'bay-card--warning',
  danger:  'bay-card--danger',
};

const STATE_ICON: Record<BayState, string> = {
  empty:   '○',
  filled:  '●',
  warning: '⚠',
  danger:  '✕',
};

// Icon box visual styles per state
const ICON_BOX_STYLE: Record<BayState, string> = {
  empty:   'background:var(--color-surface-raised,rgba(255,255,255,0.04));color:var(--color-text-tertiary,#6b7280);border:1.5px solid var(--color-border-subtle,rgba(255,255,255,0.08));',
  filled:  'background:rgba(6,182,212,0.12);color:var(--color-accent-cyan,#06b6d4);border:1.5px solid rgba(6,182,212,0.35);',
  warning: 'background:rgba(245,158,11,0.12);color:#f59e0b;border:1.5px solid rgba(245,158,11,0.35);',
  danger:  'background:rgba(239,68,68,0.12);color:#ef4444;border:1.5px solid rgba(239,68,68,0.35);',
};

export function BayCard({ icon, label, sublabel, wattageBadge, state, isOpen, onToggle, onClear, children, id, lang = 'en' }: BayCardProps) {
  const trayId  = useId();
  const btnRef  = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      onToggle();
      btnRef.current?.focus();
    }
  }, [isOpen, onToggle]);

  const emptyPrompt = lang === 'de' ? 'Klicken zum Auswählen…' : lang === 'es' ? 'Clic para seleccionar…' : lang === 'fr' ? 'Cliquer pour choisir…' : lang === 'ja' ? 'クリックして選択…' : lang === 'zh' ? '点击选择硬件…' : 'Click to select…';

  return (
    <div class="bay-wrapper" role="listitem" onKeyDown={handleKeyDown} id={id}>
      {/* Bay card header — the main clickable toggle */}
      <div class={`bay-card ${STATE_BORDER[state]}`}>
        <button
          ref={btnRef}
          class="bay-toggle"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={trayId}
          aria-label={`${label}: ${sublabel ?? emptyPrompt}. ${isOpen ? 'Close selector' : 'Open selector'}`}
          type="button"
        >
          {/* Left: SVG icon box + state indicator dot */}
          <div class="bay-left">
            <div
              class="bay-icon-box"
              aria-hidden="true"
              style={ICON_BOX_STYLE[state]}
            >
              {icon}
            </div>
            <span
              class={`bay-state-dot bay-state-dot--${state}`}
              role="img"
              title={STATE_ICON[state]}
            />
          </div>

          {/* Center: label + sublabel */}
          <div class="bay-center">
            <span class="bay-label">{label}</span>
            {sublabel && (
              <span class="bay-sublabel" aria-label={`Selected: ${sublabel}`}>{sublabel}</span>
            )}
            {!sublabel && (
              <span class="bay-sublabel bay-sublabel--empty">{emptyPrompt}</span>
            )}
          </div>

          {/* Wattage Badge Pill */}
          {wattageBadge && (
            <span class="bay-wattage-badge tabular" aria-label={`Power draw: ${wattageBadge}`}>
              {wattageBadge}
            </span>
          )}

          {/* Right: chevron arrow */}
          <svg
            class="bay-chevron"
            width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" aria-hidden="true"
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              'transition-property': 'transform',
              'transition-duration': '200ms',
              'transition-timing-function': 'ease-out',
            }}
          >
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>

        {/* Clear button — only shown when filled */}
        {state !== 'empty' && onClear && (
          <button
            class="bay-clear"
            onClick={(e) => { e.stopPropagation(); onClear(); }}
            aria-label={`Clear ${label} selection`}
            type="button"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
            <span class="sr-only">Clear {label}</span>
          </button>
        )}
      </div>

      {/* Selector tray — animated expand/collapse via max-height */}
      <div
        id={trayId}
        class={`selector-tray ${isOpen ? 'open' : ''}`}
        role="region"
        aria-label={`${label} options`}
        aria-hidden={!isOpen}
        inert={!isOpen ? '' : undefined}
      >
        <div class="selector-tray-inner">
          {children}
        </div>
      </div>
    </div>
  );
}
