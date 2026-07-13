/** @jsxImportSource preact */
// ============================================================
// VoltForge — Bay Component Base
// Shared logic for all component bay cards.
// Each bay: left accent border (state), selector drawer,
//           keyboard navigation, touch targets ≥44px.
// ============================================================

import { useState, useRef, useCallback, useId } from 'preact/hooks';
import type { ComponentChildren } from 'preact';

export type BayState = 'empty' | 'filled' | 'warning' | 'danger';

interface BayCardProps {
  icon:        string;
  label:       string;
  sublabel?:   string;
  state:       BayState;
  isOpen:      boolean;
  onToggle:    () => void;
  onClear?:    () => void;
  children:    ComponentChildren; // selector tray content
  id?:         string;
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

const STATE_ARIA: Record<BayState, string> = {
  empty:   'Empty — click to select',
  filled:  'Filled',
  warning: 'Warning — check compatibility',
  danger:  'Danger — configuration issue',
};

export function BayCard({ icon, label, sublabel, state, isOpen, onToggle, onClear, children, id }: BayCardProps) {
  const trayId  = useId();
  const btnRef  = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      onToggle();
      btnRef.current?.focus();
    }
  }, [isOpen, onToggle]);

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
          aria-label={`${label}: ${sublabel ?? STATE_ARIA[state]}. ${isOpen ? 'Click to close selector' : 'Click to open selector'}`}
          type="button"
        >
          {/* Left: icon + state indicator */}
          <div class="bay-left">
            <span class="bay-component-icon" aria-hidden="true">{icon}</span>
            <span
              class={`bay-state-dot bay-state-dot--${state}`}
              aria-label={`Status: ${STATE_ARIA[state]}`}
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
              <span class="bay-sublabel bay-sublabel--empty">Click to select…</span>
            )}
          </div>

          {/* Right: chevron */}
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

      {/* Selector tray — animated expand/collapse (max-height, no height animation) */}
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
