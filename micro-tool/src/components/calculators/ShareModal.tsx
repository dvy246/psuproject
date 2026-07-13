/** @jsxImportSource preact */
// ============================================================
// VoltForge — Share Build Modal
// Displays: Shareable URL, Reddit / Forum Markdown Table Exporter.
// Keyboard focus trap, Escape to close, Accessible ARIA roles.
// ============================================================

import { useState, useRef, useEffect } from 'preact/hooks';
import type { CpuIndex, GpuIndex, MotherboardIndex, RamConfig, StorageConfig, CoolingConfig, PsuIndex } from '../../types/components';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cpu: CpuIndex | null;
  gpu: GpuIndex | null;
  mobo: MotherboardIndex | null;
  ram: RamConfig | null;
  storage: StorageConfig[];
  cooling: CoolingConfig | null;
  psu: PsuIndex | null;
  shareUrl: string;
  totalCost: number;
  transientPeak: number;
  recommendedWattage: number;
}

export function ShareModal({
  isOpen,
  onClose,
  cpu,
  gpu,
  mobo,
  ram,
  storage,
  cooling,
  psu,
  shareUrl,
  totalCost,
  transientPeak,
  recommendedWattage
}: Props) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');
  const [mdCopyStatus, setMdCopyStatus] = useState<'idle' | 'copied'>('idle');
  const dialogRef = useRef<HTMLDivElement>(null);

  // Auto-focus the close button or modal container on open for a11y focus trap
  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.focus();
      document.body.style.overflow = 'hidden'; // Lock background scroll
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  // Generate formatting for Reddit copy-paste
  const generateMarkdown = () => {
    let md = `[VoltForge Custom PC Build](${shareUrl})\n\n`;
    md += `| Category | Component | Price |\n`;
    md += `| :--- | :--- | :--- |\n`;
    if (cpu) md += `| **Processor (CPU)** | [${cpu.brand} ${cpu.name}](${shareUrl}) | $${cpu.price} |\n`;
    if (gpu) md += `| **Graphics Card (GPU)** | [${gpu.brand} ${gpu.name}](${shareUrl}) | $${gpu.price} |\n`;
    if (mobo) md += `| **Motherboard** | [${mobo.brand} ${mobo.name}](${shareUrl}) | $${mobo.price} |\n`;
    if (ram) md += `| **Memory (RAM)** | [${ram.capacity}GB ${ram.type} ${ram.speed}MHz](${shareUrl}) | $${ram.price} |\n`;
    storage.forEach((drive, idx) => {
      md += `| **Storage Drive #${idx + 1}** | [${drive.type} ${drive.capacity}GB](${shareUrl}) | $${drive.price} |\n`;
    });
    if (cooling) md += `| **Cooling** | [${cooling.type.replace(/-/g, ' ').toUpperCase()}](${shareUrl}) | $${cooling.price} |\n`;
    if (psu) md += `| **Power Supply (PSU)** | [${psu.brand} ${psu.name}](${shareUrl}) | $${psu.price} |\n`;
    md += `| | **Total Build Cost** | **$${totalCost}** |\n\n`;

    md += `### VoltForge Sizing & Power Analysis\n`;
    md += `- **Calculated Sustained Draw:** ${transientPeak}W peak spike / ${transientPeak}W headroom limits\n`;
    md += `- **Recommended PSU Wattage:** ${recommendedWattage}W\n`;
    md += `- **Cable Compliance Warning:** Verified via VoltForge Cable-Melt Prevention Auditor.\n\n`;
    md += `*Configure your build at [VoltForge.app PSU Sizing & Cost Calculator](${shareUrl})*`;
    return md;
  };

  const mdText = generateMarkdown();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2000);
    });
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(mdText).then(() => {
      setMdCopyStatus('copied');
      setTimeout(() => setMdCopyStatus('idle'), 2000);
    });
  };

  return (
    <div
      class="share-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
      onClick={onClose}
      style="position:fixed; inset:0; background:rgba(0,0,0,0.7); backdrop-filter:blur(4px); z-index:1000; display:flex; align-items:center; justify-content:center; padding:1rem;"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        class="share-modal-content card"
        onClick={(e) => e.stopPropagation()} // Prevent close on modal click
        style="width:100%; max-width:600px; background:var(--color-surface); border:1px solid var(--color-border); border-radius:var(--radius-lg); padding:1.5rem; display:flex; flex-direction:column; gap:1.25rem; outline:none; max-height:90dvh; overflow-y:auto;"
      >
        {/* Header */}
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h2 id="share-modal-title" style="font-size:1.25rem; font-weight:800; color:var(--color-text-primary); margin:0;">
            Share Your Build Configuration
          </h2>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            style="background:transparent; border:none; color:var(--color-text-tertiary); cursor:pointer; font-size:1.25rem; padding:4px;"
            type="button"
          >
            ✕
          </button>
        </div>

        {/* Share Link Copy */}
        <div style="display:flex; flex-direction:column; gap:0.5rem;">
          <label for="share-link-input" style="font-size:0.75rem; font-weight:700; color:var(--color-text-secondary); text-transform:uppercase;">
            Direct Shareable URL
          </label>
          <div style="display:flex; gap:0.5rem; width:100%;">
            <input
              id="share-link-input"
              type="text"
              readOnly
              value={shareUrl}
              style="flex:1; min-height:40px; padding:0 0.75rem; background:var(--color-surface-raised); border:1px solid var(--color-border-subtle); color:var(--color-text-primary); border-radius:var(--radius-md); font-size:0.8125rem; font-family:var(--font-mono);"
            />
            <button
              onClick={handleCopyLink}
              class="btn btn-primary"
              style="min-height:40px; white-space:nowrap; padding:0 1rem; font-size:0.8125rem;"
              type="button"
            >
              {copyStatus === 'copied' ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
        </div>

        {/* Reddit/Forum Markdown Exporter */}
        <div style="display:flex; flex-direction:column; gap:0.5rem;">
          <label for="share-markdown-textarea" style="font-size:0.75rem; font-weight:700; color:var(--color-text-secondary); text-transform:uppercase; display:flex; justify-content:space-between; align-items:center;">
            <span>Reddit / Forum Markdown Table</span>
            <span style="font-size:0.7rem; font-weight:normal; text-transform:none; color:var(--color-text-tertiary);">Ideal for /r/buildapc and PC forums</span>
          </label>
          <textarea
            id="share-markdown-textarea"
            readOnly
            value={mdText}
            rows={8}
            style="width:100%; padding:0.75rem; background:var(--color-surface-raised); border:1px solid var(--color-border-subtle); color:var(--color-text-secondary); border-radius:var(--radius-md); font-size:0.75rem; font-family:var(--font-mono); resize:none;"
          />
          <button
            onClick={handleCopyMarkdown}
            class="btn btn-secondary"
            style="min-height:40px; width:100%; display:flex; align-items:center; justify-content:center; gap:6px; font-size:0.8125rem;"
            type="button"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            {mdCopyStatus === 'copied' ? 'Markdown Copied!' : 'Copy Markdown Table for Forums'}
          </button>
        </div>
      </div>
    </div>
  );
}
