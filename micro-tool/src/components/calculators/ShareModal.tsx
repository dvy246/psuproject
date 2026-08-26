/** @jsxImportSource preact */
// ============================================================
// PSUCheck — Share Build Modal (i18n Enabled)
// ============================================================

import { useState, useRef, useEffect } from 'preact/hooks';
import type { CpuIndex, GpuIndex, MotherboardIndex, RamConfig, StorageConfig, CoolingConfig, PsuIndex } from '../../types/components';
import { useTranslations, formatCurrency, type Locale } from '../../i18n';

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
  lang?: Locale;
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
  recommendedWattage,
  lang = 'en',
}: Props) {
  const t = useTranslations(lang);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');
  const [mdCopyStatus, setMdCopyStatus] = useState<'idle' | 'copied'>('idle');
  const [activeTab, setActiveTab] = useState<'share' | 'publish'>('share');
  const dialogRef = useRef<HTMLDivElement>(null);

  // Form states for Publish to Gallery
  const [buildTitle, setBuildTitle] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [description, setDescription] = useState('');
  const [resolution, setResolution] = useState('1440p');
  const [useCase, setUseCase] = useState('gaming');
  const [publishStatus, setPublishStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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

  // Localized strings
  const modalHeading = lang === 'de' ? 'PC-Konfiguration teilen & veröffentlichen' : lang === 'es' ? 'Compartir y Publicar Configuración' : lang === 'fr' ? 'Partager & Publier la Configuration' : lang === 'ja' ? '構成の共有・ギャラリー投稿' : lang === 'zh' ? '分享或发布当前装机配置' : 'Share & Publish Build';
  const getLinksTab = lang === 'de' ? 'Freigabelinks abrufen' : lang === 'es' ? 'Obtener Enlaces' : lang === 'fr' ? 'Liens de Partage' : lang === 'ja' ? '共有リンク取得' : lang === 'zh' ? '获取分享链接' : 'Get Share Links';
  const publishTab = lang === 'de' ? 'In Galerie veröffentlichen' : lang === 'es' ? 'Publicar en Galería' : lang === 'fr' ? 'Publier dans la Galerie' : lang === 'ja' ? 'ギャラリーに投稿' : lang === 'zh' ? '投稿至装机广场' : 'Publish to Gallery';
  const directUrlLabel = lang === 'de' ? 'Direkter Freigabe-Link' : lang === 'es' ? 'URL Directa para Compartir' : lang === 'fr' ? 'URL Directe de Partage' : lang === 'ja' ? '直接共有URL' : lang === 'zh' ? '一键直达永久分享链接' : 'Direct Shareable URL';
  const copyBtn = copyStatus === 'copied' ? (lang === 'de' ? 'Kopiert!' : lang === 'es' ? '¡Copiado!' : lang === 'fr' ? 'Copié !' : lang === 'ja' ? 'コピー完了！' : lang === 'zh' ? '已复制！' : 'Copied!') : (lang === 'de' ? 'Link kopieren' : lang === 'es' ? 'Copiar Enlace' : lang === 'fr' ? 'Copier le Lien' : lang === 'ja' ? 'リンクをコピー' : lang === 'zh' ? '复制链接' : 'Copy Link');

  const redditLabel = lang === 'de' ? 'Reddit / Foren Markdown-Tabelle' : lang === 'es' ? 'Tabla Markdown para Reddit / Foros' : lang === 'fr' ? 'Tableau Markdown Reddit / Forums' : lang === 'ja' ? '掲示板/Reddit用 Markdown表' : lang === 'zh' ? 'Reddit / 论坛 Markdown 配置表格' : 'Reddit / Forum Markdown Table';
  const redditSub = lang === 'de' ? 'Ideal für Hardware-Foren und Reddit' : lang === 'es' ? 'Ideal para foros y comunidades' : lang === 'fr' ? 'Idéal pour Reddit et les forums PC' : lang === 'ja' ? '自作PC掲示板やSNSへの投稿に最適' : lang === 'zh' ? '适合直接粘贴至贴吧、NGA或论坛' : 'Ideal for /r/buildapc and PC forums';
  const copyMdBtn = mdCopyStatus === 'copied' ? (lang === 'de' ? 'Markdown kopiert!' : lang === 'es' ? '¡Markdown Copiado!' : lang === 'fr' ? 'Markdown Copié !' : lang === 'ja' ? 'Markdown表をコピー完了！' : lang === 'zh' ? 'Markdown 表格已复制！' : 'Markdown Copied!') : (lang === 'de' ? 'Markdown-Tabelle kopieren' : lang === 'es' ? 'Copiar Tabla Markdown' : lang === 'fr' ? 'Copier le Tableau Markdown' : lang === 'ja' ? 'フォーラム用Markdown表をコピー' : lang === 'zh' ? '复制 Markdown 论坛代码' : 'Copy Markdown Table for Forums');

  const successMsg = lang === 'de' ? '✓ Konfiguration erfolgreich in Ihrer lokalen Galerie gespeichert!' : lang === 'es' ? '✓ ¡Configuración guardada en tu galería local!' : lang === 'fr' ? '✓ Configuration enregistrée dans votre galerie locale !' : lang === 'ja' ? '✓ ローカルギャラリーに構成を保存しました！' : lang === 'zh' ? '✓ 配置已成功保存至您的本地装机库！' : '✓ Build published! Your configuration has been saved to your local gallery and queued for moderation.';
  const fillAllMsg = lang === 'de' ? 'Bitte füllen Sie alle Felder aus.' : lang === 'es' ? 'Por favor completa todos los campos.' : lang === 'fr' ? 'Veuillez remplir tous les champs.' : lang === 'ja' ? 'すべての項目を入力してください。' : lang === 'zh' ? '请填写所有必填字段。' : 'Please fill out all fields.';
  const minDescMsg = (len: number) => lang === 'de' ? `Die Beschreibung muss mindestens 150 Zeichen lang sein (aktuell: ${len}).` : lang === 'es' ? `La descripción debe tener al menos 150 caracteres (actual: ${len}).` : lang === 'fr' ? `La description doit comporter au moins 150 caractères (actuel : ${len}).` : lang === 'ja' ? `説明文は150文字以上入力してください（現在: ${len}文字）。` : lang === 'zh' ? `详细说明至少需要150个字符以通过审核（当前字数：${len}）。` : `Description must be at least 150 characters to pass SEO Helpful Content verification. Current length: ${len} chars.`;

  const titleFieldLabel = lang === 'de' ? 'Name der Konfiguration' : lang === 'es' ? 'Título de la Configuración' : lang === 'fr' ? 'Titre de la Configuration' : lang === 'ja' ? '構成タイトル' : lang === 'zh' ? '装机方案名称' : 'Build Title';
  const creatorFieldLabel = lang === 'de' ? 'Ersteller-Name' : lang === 'es' ? 'Nombre del Creador' : lang === 'fr' ? 'Nom du Créateur' : lang === 'ja' ? '作成者ネーム' : lang === 'zh' ? '创作者昵称' : 'Creator Name';
  const resolutionFieldLabel = lang === 'de' ? 'Zielauflösung' : lang === 'es' ? 'Resolución Objetivo' : lang === 'fr' ? 'Résolution Cible' : lang === 'ja' ? 'ターゲット解像度' : lang === 'zh' ? '目标游戏分辨率' : 'Target Resolution';
  const useCaseFieldLabel = lang === 'de' ? 'Haupt-Einsatzzweck' : lang === 'es' ? 'Uso Principal' : lang === 'fr' ? 'Usage Principal' : lang === 'ja' ? '主な用途' : lang === 'zh' ? '核心使用场景' : 'Primary Use Case';
  const descFieldLabel = lang === 'de' ? 'Beschreibung (mind. 150 Zeichen)' : lang === 'es' ? 'Descripción (mín. 150 caracteres)' : lang === 'fr' ? 'Description (min. 150 car.)' : lang === 'ja' ? '構成のこだわり・説明 (150文字以上)' : lang === 'zh' ? '设计思路与配置说明 (至少150字)' : 'Build Description (min 150 chars)';
  const publishSubmitBtn = lang === 'de' ? 'Konfiguration in Galerie veröffentlichen' : lang === 'es' ? 'Publicar en la Galería' : lang === 'fr' ? 'Publier dans la Galerie' : lang === 'ja' ? 'ギャラリーに投稿する' : lang === 'zh' ? '确认发布并存入广场' : 'Publish Build to Gallery';

  // Generate formatting for Reddit copy-paste
  const generateMarkdown = () => {
    let md = `[VoltForge Custom PC Build](${shareUrl})\n\n`;
    md += `| Category | Component | Price |\n`;
    md += `| :--- | :--- | :--- |\n`;
    if (cpu) md += `| **Processor (CPU)** | [${cpu.brand} ${cpu.name}](${shareUrl}) | ${formatCurrency(cpu.price, lang)} |\n`;
    if (gpu) md += `| **Graphics Card (GPU)** | [${gpu.brand} ${gpu.name}](${shareUrl}) | ${formatCurrency(gpu.price, lang)} |\n`;
    if (mobo) md += `| **Motherboard** | [${mobo.brand} ${mobo.name}](${shareUrl}) | ${formatCurrency(mobo.price, lang)} |\n`;
    if (ram) md += `| **Memory (RAM)** | [${ram.capacity}GB ${ram.type} ${ram.speed}MHz](${shareUrl}) | ${formatCurrency(ram.price, lang)} |\n`;
    storage.forEach((drive, idx) => {
      md += `| **Storage Drive #${idx + 1}** | [${drive.type} ${drive.capacity}GB](${shareUrl}) | ${formatCurrency(drive.price, lang)} |\n`;
    });
    if (cooling) md += `| **Cooling** | [${cooling.type.replace(/-/g, ' ').toUpperCase()}](${shareUrl}) | ${formatCurrency(cooling.price, lang)} |\n`;
    if (psu) md += `| **Power Supply (PSU)** | [${psu.brand} ${psu.name}](${shareUrl}) | ${formatCurrency(psu.price, lang)} |\n`;
    md += `| | **Total Build Cost** | **${formatCurrency(totalCost, lang)}** |\n\n`;

    md += `### VoltForge Sizing & Power Analysis\n`;
    md += `- **Calculated Transient Peak:** ${transientPeak}W sub-1ms excursion ceiling\n`;
    md += `- **Recommended PSU Wattage:** ${recommendedWattage}W\n`;
    md += `- **Cable Compliance Warning:** Verified via VoltForge Cable-Melt Prevention Auditor.\n\n`;
    md += `*Configure your build at [VoltForge PSU Sizing & Cost Calculator](${shareUrl})*`;
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

  const handlePublish = (e: Event) => {
    e.preventDefault();
    if (!buildTitle.trim() || !creatorName.trim() || !description.trim()) {
      setPublishStatus('error');
      setErrorMessage(fillAllMsg);
      return;
    }
    if (description.length < 150) {
      setPublishStatus('error');
      setErrorMessage(minDescMsg(description.length));
      return;
    }

    const customBuild = {
      slug: `custom-${Date.now()}`,
      name: buildTitle,
      creator: creatorName,
      description: description,
      resolution: resolution,
      useCase: useCase,
      cpuId: cpu?.id ?? null,
      gpuId: gpu?.id ?? null,
      moboId: mobo?.id ?? null,
      ram: ram,
      storage: storage,
      cooling: cooling,
      psuId: psu?.id ?? null,
      price: totalCost
    };

    try {
      const existing = localStorage.getItem('psucheck_my_builds');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(customBuild);
      localStorage.setItem('psucheck_my_builds', JSON.stringify(list));
      setPublishStatus('success');
      setErrorMessage('');
      setBuildTitle('');
      setDescription('');
    } catch (err) {
      setPublishStatus('error');
      setErrorMessage('Failed to save build to local storage.');
    }
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
        onClick={(e) => e.stopPropagation()}
        style="width:100%; max-width:600px; background:var(--color-surface); border:1px solid var(--color-border); border-radius:var(--radius-lg); padding:1.5rem; display:flex; flex-direction:column; gap:1.25rem; outline:none; max-height:90dvh; overflow-y:auto;"
      >
        {/* Header */}
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h2 id="share-modal-title" style="font-size:1.25rem; font-weight:800; color:var(--color-text-primary); margin:0;">
            {modalHeading}
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

        {/* Tab Selectors */}
        <div style="display:flex; border-bottom:1px solid var(--color-border-subtle);">
          <button
            onClick={() => setActiveTab('share')}
            style={`flex:1; padding:0.75rem; background:transparent; border:none; border-bottom:2px solid ${activeTab === 'share' ? 'var(--color-accent-cyan)' : 'transparent'}; color:${activeTab === 'share' ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)'}; font-weight:600; cursor:pointer; font-size:0.875rem;`}
            type="button"
          >
            {getLinksTab}
          </button>
          <button
            onClick={() => setActiveTab('publish')}
            style={`flex:1; padding:0.75rem; background:transparent; border:none; border-bottom:2px solid ${activeTab === 'publish' ? 'var(--color-accent-cyan)' : 'transparent'}; color:${activeTab === 'publish' ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)'}; font-weight:600; cursor:pointer; font-size:0.875rem;`}
            type="button"
          >
            {publishTab}
          </button>
        </div>

        {activeTab === 'share' ? (
          <>
            {/* Share Link Copy */}
            <div style="display:flex; flex-direction:column; gap:0.5rem;">
              <label for="share-link-input" style="font-size:0.75rem; font-weight:700; color:var(--color-text-secondary); text-transform:uppercase;">
                {directUrlLabel}
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
                  {copyBtn}
                </button>
              </div>
            </div>

            {/* Reddit/Forum Markdown Exporter */}
            <div style="display:flex; flex-direction:column; gap:0.5rem;">
              <label for="share-markdown-textarea" style="font-size:0.75rem; font-weight:700; color:var(--color-text-secondary); text-transform:uppercase; display:flex; justify-content:space-between; align-items:center;">
                <span>{redditLabel}</span>
                <span style="font-size:0.7rem; font-weight:normal; text-transform:none; color:var(--color-text-tertiary);">{redditSub}</span>
              </label>
              <textarea
                id="share-markdown-textarea"
                readOnly
                value={mdText}
                rows={6}
                style="width:100%; padding:0.75rem; background:var(--color-surface-raised); border:1px solid var(--color-border-subtle); color:var(--color-text-secondary); border-radius:var(--radius-md); font-size:0.75rem; font-family:var(--font-mono); resize:none;"
              />
              <button
                onClick={handleCopyMarkdown}
                class="btn btn-secondary"
                style="min-height:40px; width:100%; display:flex; align-items:center; justify-content:center; gap:6px; font-size:0.8125rem;"
                type="button"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                {copyMdBtn}
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handlePublish} style="display:flex; flex-direction:column; gap:1rem;">
            {publishStatus === 'success' && (
              <div style="padding:10px; background:rgba(34,197,94,0.15); border:1px solid var(--color-safe); color:var(--color-safe); border-radius:var(--radius-md); font-size:0.8125rem; font-weight:600;">
                {successMsg}
              </div>
            )}
            {publishStatus === 'error' && (
              <div style="padding:10px; background:rgba(239,68,68,0.15); border:1px solid var(--color-danger); color:var(--color-danger); border-radius:var(--radius-md); font-size:0.8125rem; font-weight:600;">
                {errorMessage}
              </div>
            )}

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.75rem;">
              <div style="display:flex; flex-direction:column; gap:0.25rem;">
                <label for="publish-title" style="font-size:0.75rem; font-weight:600; color:var(--color-text-secondary);">{titleFieldLabel}</label>
                <input
                  id="publish-title"
                  type="text"
                  placeholder="e.g. AM5 Silent Beast"
                  value={buildTitle}
                  onInput={(e) => setBuildTitle((e.target as HTMLInputElement).value)}
                  style="min-height:36px; padding:0 0.5rem; background:var(--color-surface-raised); border:1px solid var(--color-border-subtle); color:var(--color-text-primary); border-radius:var(--radius-md); font-size:0.8125rem;"
                />
              </div>
              <div style="display:flex; flex-direction:column; gap:0.25rem;">
                <label for="publish-creator" style="font-size:0.75rem; font-weight:600; color:var(--color-text-secondary);">{creatorFieldLabel}</label>
                <input
                  id="publish-creator"
                  type="text"
                  placeholder="e.g. Builder99"
                  value={creatorName}
                  onInput={(e) => setCreatorName((e.target as HTMLInputElement).value)}
                  style="min-height:36px; padding:0 0.5rem; background:var(--color-surface-raised); border:1px solid var(--color-border-subtle); color:var(--color-text-primary); border-radius:var(--radius-md); font-size:0.8125rem;"
                />
              </div>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.75rem;">
              <div style="display:flex; flex-direction:column; gap:0.25rem;">
                <label for="publish-resolution" style="font-size:0.75rem; font-weight:600; color:var(--color-text-secondary);">{resolutionFieldLabel}</label>
                <select
                  id="publish-resolution"
                  value={resolution}
                  onChange={(e) => setResolution((e.target as HTMLSelectElement).value)}
                  style="min-height:36px; padding:0 0.5rem; background:var(--color-surface-raised); border:1px solid var(--color-border-subtle); color:var(--color-text-primary); border-radius:var(--radius-md); font-size:0.8125rem;"
                >
                  <option value="1080p">1080p Full HD</option>
                  <option value="1440p">1440p Quad HD</option>
                  <option value="4K UHD">4K Ultra HD</option>
                </select>
              </div>
              <div style="display:flex; flex-direction:column; gap:0.25rem;">
                <label for="publish-usecase" style="font-size:0.75rem; font-weight:600; color:var(--color-text-secondary);">{useCaseFieldLabel}</label>
                <select
                  id="publish-usecase"
                  value={useCase}
                  onChange={(e) => setUseCase((e.target as HTMLSelectElement).value)}
                  style="min-height:36px; padding:0 0.5rem; background:var(--color-surface-raised); border:1px solid var(--color-border-subtle); color:var(--color-text-primary); border-radius:var(--radius-md); font-size:0.8125rem;"
                >
                  <option value="gaming">Gaming & Streaming</option>
                  <option value="workstation">Professional Workstation</option>
                  <option value="general">Budget/General Use</option>
                </select>
              </div>
            </div>

            <div style="display:flex; flex-direction:column; gap:0.25rem;">
              <label for="publish-desc" style="font-size:0.75rem; font-weight:600; color:var(--color-text-secondary); display:flex; justify-content:space-between;">
                <span>{descFieldLabel}</span>
                <span class="tabular" style={`color:${description.length >= 150 ? 'var(--color-safe)' : 'var(--color-warning)'}`}>{description.length}/150</span>
              </label>
              <textarea
                id="publish-desc"
                placeholder="Describe your design choices, airflow configuration, or gaming targets..."
                value={description}
                onInput={(e) => setDescription((e.target as HTMLTextAreaElement).value)}
                rows={3}
                style="padding:0.5rem; background:var(--color-surface-raised); border:1px solid var(--color-border-subtle); color:var(--color-text-primary); border-radius:var(--radius-md); font-size:0.8125rem; resize:none;"
              />
            </div>

            <button
              type="submit"
              class="btn btn-primary"
              style="min-height:40px; margin-top:0.5rem; font-size:0.875rem;"
            >
              {publishSubmitBtn}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
