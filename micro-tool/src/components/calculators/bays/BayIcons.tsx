/** @jsxImportSource preact */
// ============================================================
// PSUCheck — Component Bay SVG Icons
// Consistent, premium SVG icons for each hardware bay.
// All icons: 24×24 viewBox, 2px stroke-width, stroke-linecap round
// Themed: accent color on active bg, muted on empty state.
// ============================================================

import type { JSX } from 'preact/jsx-runtime';

interface IconProps {
  size?: number;
  'aria-hidden'?: boolean;
}

// ── CPU Icon: stylized chip with pins ──
export function CpuIcon({ size = 22, ...props }: IconProps): JSX.Element {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round"
      aria-hidden={props['aria-hidden'] ?? true}
    >
      {/* Chip body */}
      <rect x="7" y="7" width="10" height="10" rx="1.5"/>
      {/* Inner core */}
      <rect x="9.5" y="9.5" width="5" height="5" rx="0.5" fill="currentColor" opacity="0.2"/>
      {/* Left pins */}
      <line x1="7" y1="9" x2="4" y2="9"/>
      <line x1="7" y1="12" x2="4" y2="12"/>
      <line x1="7" y1="15" x2="4" y2="15"/>
      {/* Right pins */}
      <line x1="17" y1="9" x2="20" y2="9"/>
      <line x1="17" y1="12" x2="20" y2="12"/>
      <line x1="17" y1="15" x2="20" y2="15"/>
      {/* Top pins */}
      <line x1="9" y1="7" x2="9" y2="4"/>
      <line x1="12" y1="7" x2="12" y2="4"/>
      <line x1="15" y1="7" x2="15" y2="4"/>
      {/* Bottom pins */}
      <line x1="9" y1="17" x2="9" y2="20"/>
      <line x1="12" y1="17" x2="12" y2="20"/>
      <line x1="15" y1="17" x2="15" y2="20"/>
    </svg>
  );
}

// ── GPU Icon: graphics card with fans ──
export function GpuIcon({ size = 22, ...props }: IconProps): JSX.Element {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round"
      aria-hidden={props['aria-hidden'] ?? true}
    >
      {/* PCB body */}
      <rect x="2" y="7" width="20" height="10" rx="2"/>
      {/* Fan circle left */}
      <circle cx="7.5" cy="12" r="3"/>
      {/* Fan blades */}
      <path d="M7.5 9v1.5M7.5 13.5V15M5 12h1.5M9 12h1.5"/>
      {/* Fan circle right */}
      <circle cx="14.5" cy="12" r="2.5"/>
      <path d="M14.5 9.5v1M14.5 13v1.5M12 12h1M16 12h1"/>
      {/* PCIe connector at bottom */}
      <line x1="6" y1="17" x2="6" y2="20"/>
      <line x1="9" y1="17" x2="9" y2="20"/>
      <line x1="12" y1="17" x2="12" y2="20"/>
      <line x1="15" y1="17" x2="15" y2="20"/>
      <line x1="18" y1="17" x2="18" y2="20"/>
    </svg>
  );
}

// ── Motherboard Icon: PCB with slots ──
export function MotherboardIcon({ size = 22, ...props }: IconProps): JSX.Element {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round"
      aria-hidden={props['aria-hidden'] ?? true}
    >
      {/* Board outline */}
      <rect x="2" y="2" width="20" height="20" rx="2"/>
      {/* CPU socket */}
      <rect x="4" y="4" width="7" height="7" rx="1"/>
      <rect x="5.5" y="5.5" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.15"/>
      {/* RAM slots */}
      <rect x="13" y="4" width="2" height="9" rx="0.5"/>
      <rect x="16" y="4" width="2" height="9" rx="0.5"/>
      {/* PCIe slot */}
      <rect x="4" y="14" width="16" height="2.5" rx="0.5"/>
      {/* Chipset */}
      <rect x="13" y="14.5" width="4" height="4" rx="0.5"/>
      {/* IO ports */}
      <rect x="4" y="18.5" width="2" height="2" rx="0.2"/>
      <rect x="7" y="18.5" width="2" height="2" rx="0.2"/>
    </svg>
  );
}

// ── RAM Icon: memory stick ──
export function RamIcon({ size = 22, ...props }: IconProps): JSX.Element {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round"
      aria-hidden={props['aria-hidden'] ?? true}
    >
      {/* DIMM body */}
      <rect x="3" y="5" width="18" height="14" rx="1.5"/>
      {/* Chips on top row */}
      <rect x="5" y="7" width="3" height="3" rx="0.4" fill="currentColor" opacity="0.3"/>
      <rect x="9.5" y="7" width="3" height="3" rx="0.4" fill="currentColor" opacity="0.3"/>
      <rect x="14" y="7" width="3" height="3" rx="0.4" fill="currentColor" opacity="0.3"/>
      {/* Chips on bottom row */}
      <rect x="5" y="14" width="3" height="3" rx="0.4" fill="currentColor" opacity="0.3"/>
      <rect x="9.5" y="14" width="3" height="3" rx="0.4" fill="currentColor" opacity="0.3"/>
      <rect x="14" y="14" width="3" height="3" rx="0.4" fill="currentColor" opacity="0.3"/>
      {/* Notch slot at bottom */}
      <line x1="11.5" y1="19" x2="11.5" y2="21"/>
      {/* Gold contacts at bottom */}
      <line x1="5" y1="20" x2="5" y2="22"/>
      <line x1="7" y1="20" x2="7" y2="22"/>
      <line x1="9" y1="20" x2="9" y2="22"/>
      <line x1="13" y1="20" x2="13" y2="22"/>
      <line x1="15" y1="20" x2="15" y2="22"/>
      <line x1="17" y1="20" x2="17" y2="22"/>
    </svg>
  );
}

// ── Storage Icon: SSD/NVMe drive ──
export function StorageIcon({ size = 22, ...props }: IconProps): JSX.Element {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round"
      aria-hidden={props['aria-hidden'] ?? true}
    >
      {/* NVMe PCB body */}
      <rect x="2" y="7" width="20" height="10" rx="2"/>
      {/* NAND chips */}
      <rect x="4" y="9.5" width="4" height="5" rx="0.5" fill="currentColor" opacity="0.25"/>
      <rect x="10" y="9.5" width="4" height="5" rx="0.5" fill="currentColor" opacity="0.25"/>
      {/* Controller chip */}
      <rect x="16" y="10" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.15"/>
      <line x1="16.5" y1="11" x2="19.5" y2="11"/>
      <line x1="16.5" y1="12" x2="19.5" y2="12"/>
      <line x1="16.5" y1="13" x2="19.5" y2="13"/>
      {/* M.2 connector */}
      <line x1="4" y1="17" x2="4" y2="19"/>
      <line x1="6" y1="17" x2="6" y2="19"/>
      <line x1="8" y1="17" x2="8" y2="19"/>
      <line x1="10" y1="17" x2="10" y2="19"/>
    </svg>
  );
}

// ── Cooling Icon: fan / heatsink ──
export function CoolingIcon({ size = 22, ...props }: IconProps): JSX.Element {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round"
      aria-hidden={props['aria-hidden'] ?? true}
    >
      {/* Outer ring */}
      <circle cx="12" cy="12" r="9"/>
      {/* Inner hub */}
      <circle cx="12" cy="12" r="2.5"/>
      {/* Fan blades */}
      <path d="M12 9.5 C12 7 10 5.5 8.5 6.5 C7 7.5 7.5 10 9.5 10.5" stroke-width="1.75"/>
      <path d="M14.5 10.5 C17 10.5 18.5 8.5 17.5 7 C16.5 5.5 14 6 13.5 8" stroke-width="1.75"/>
      <path d="M13.5 13.5 C14 16 16 17.5 17.5 16.5 C19 15.5 18.5 13 16.5 12.5" stroke-width="1.75"/>
      <path d="M9.5 13.5 C7 13.5 5.5 15.5 6.5 17 C7.5 18.5 10 18 10.5 16" stroke-width="1.75"/>
      {/* Rotation indicator */}
      <path d="M12 3 A9 9 0 0 1 18.5 5.5" stroke-linecap="round" opacity="0.4"/>
    </svg>
  );
}

// ── PSU Icon: power supply unit ──
export function PsuIcon({ size = 22, ...props }: IconProps): JSX.Element {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round"
      aria-hidden={props['aria-hidden'] ?? true}
    >
      {/* PSU box */}
      <rect x="2" y="5" width="20" height="14" rx="2"/>
      {/* Fan grille */}
      <circle cx="8" cy="12" r="3"/>
      <line x1="8" y1="9" x2="8" y2="15"/>
      <line x1="5" y1="12" x2="11" y2="12"/>
      <line x1="5.9" y1="9.9" x2="10.1" y2="14.1"/>
      <line x1="10.1" y1="9.9" x2="5.9" y2="14.1"/>
      {/* Power connectors on right */}
      <line x1="14" y1="8" x2="21" y2="8"/>
      <line x1="14" y1="11" x2="21" y2="11"/>
      <line x1="14" y1="14" x2="21" y2="14"/>
      {/* Power switch */}
      <circle cx="17.5" cy="17" r="1.5" fill="currentColor" opacity="0.3"/>
      <line x1="17.5" y1="15.5" x2="17.5" y2="16.5"/>
    </svg>
  );
}
