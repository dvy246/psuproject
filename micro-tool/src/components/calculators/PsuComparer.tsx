/** @jsxImportSource preact */
// ============================================================
// PSUCheck — PSU Comparer Component (i18n Enabled)
// Side-by-side spec comparison of two user-selected PSUs.
// Modern dark-theme comparison table.
// ============================================================

import { useState, useCallback } from 'preact/hooks';
import type { PsuIndex } from '../../types/components';
import psuData from '../../data/index/psus.index.json';
import { useTranslations, formatCurrency, type Locale } from '../../i18n';

const ALL_PSUS = psuData.items as PsuIndex[];

interface Props {
  lang?: Locale;
}

export function PsuComparer({ lang = 'en' }: Props) {
  const t = useTranslations(lang);
  const [psuAId, setPsuAId] = useState<string>('corsair-rm850x-2024');
  const [psuBId, setPsuBId] = useState<string>('seasonic-focus-gx-850');

  const psuA = ALL_PSUS.find(p => p.id === psuAId) || ALL_PSUS[0];
  const psuB = ALL_PSUS.find(p => p.id === psuBId) || ALL_PSUS[1];

  const handleSelectA = useCallback((e: Event) => {
    setPsuAId((e.target as HTMLSelectElement).value);
  }, []);

  const handleSelectB = useCallback((e: Event) => {
    setPsuBId((e.target as HTMLSelectElement).value);
  }, []);

  const specLabel = lang === 'de' ? 'Spezifikation' : lang === 'es' ? 'Especificación' : lang === 'fr' ? 'Spécification' : lang === 'ja' ? 'スペック項目' : lang === 'zh' ? '参数规格' : 'Specification';
  const psuALabel = lang === 'de' ? 'Netzteil A' : lang === 'es' ? 'Fuente de Alimentación A' : lang === 'fr' ? 'Alimentation A' : lang === 'ja' ? '電源ユニット A' : lang === 'zh' ? '对比电源 A' : 'Power Supply A';
  const psuBLabel = lang === 'de' ? 'Netzteil B' : lang === 'es' ? 'Fuente de Alimentación B' : lang === 'fr' ? 'Alimentation B' : lang === 'ja' ? '電源ユニット B' : lang === 'zh' ? '对比电源 B' : 'Power Supply B';

  const wattageLabel = lang === 'de' ? 'Nennleistung' : lang === 'es' ? 'Potencia Nominal' : lang === 'fr' ? 'Puissance Nominale' : lang === 'ja' ? '定格出力容量' : lang === 'zh' ? '额定输出功率' : 'Wattage';
  const effLabel = lang === 'de' ? 'Energieeffizienz' : lang === 'es' ? 'Certificación de Eficiencia' : lang === 'fr' ? 'Rendement Énergétique' : lang === 'ja' ? '変換効率規格' : lang === 'zh' ? '80 PLUS 转换效率' : 'Efficiency Rating';
  const atxLabel = lang === 'de' ? 'ATX-Standard' : lang === 'es' ? 'Estándar ATX' : lang === 'fr' ? 'Standard ATX' : lang === 'ja' ? 'ATX規格バージョン' : lang === 'zh' ? 'ATX 规范版本' : 'ATX Standard';
  const modularLabel = lang === 'de' ? 'Kabelmanagement' : lang === 'es' ? 'Modularidad' : lang === 'fr' ? 'Modularité' : lang === 'ja' ? 'モジュラー構造' : lang === 'zh' ? '模组化线材结构' : 'Modularity';
  const cable12vLabel = lang === 'de' ? 'Natives 12V-2x6 Kabel' : lang === 'es' ? 'Cable Nativo 12V-2x6' : lang === 'fr' ? 'Câble Natif 12V-2x6' : lang === 'ja' ? '原生12V-2x6ケーブル' : lang === 'zh' ? '原生 12V-2x6 供电接口' : 'Native 12V-2x6 Cable';
  const cybeneticsLabel = lang === 'de' ? 'Cybenetics-Zertifikat' : lang === 'es' ? 'Certificación Cybenetics' : lang === 'fr' ? 'Certification Cybenetics' : lang === 'ja' ? 'Cybenetics認証' : lang === 'zh' ? 'Cybenetics 实验室认证' : 'Cybenetics Rating';
  const priceLabel = lang === 'de' ? 'Geschätzter Preis' : lang === 'es' ? 'Precio Estimado' : lang === 'fr' ? 'Prix Estimé' : lang === 'ja' ? '参考実売価格' : lang === 'zh' ? '参考市场售价' : 'Estimated Price';

  const yesAtx31 = lang === 'de' ? '✓ Ja (ATX 3.1)' : lang === 'es' ? '✓ Sí (ATX 3.1)' : lang === 'fr' ? '✓ Oui (ATX 3.1)' : lang === 'ja' ? '✓ 対応 (ATX 3.1)' : lang === 'zh' ? '✓ 具备 (ATX 3.1 原生)' : '✓ Yes (ATX 3.1)';
  const noCable = lang === 'de' ? '✕ Nein' : lang === 'es' ? '✕ No' : lang === 'fr' ? '✕ Non' : lang === 'ja' ? '✕ 非対応' : lang === 'zh' ? '✕ 不支持' : '✕ No';
  const notRated = lang === 'de' ? 'Nicht getestet' : lang === 'es' ? 'No Certificado' : lang === 'fr' ? 'Non Évalué' : lang === 'ja' ? '未認証' : lang === 'zh' ? '未测试认证' : 'Not Rated';

  return (
    <div class="psu-comparer-container">
      {/* Selector Dropdowns Header */}
      <div class="compare-selectors-grid">
        <div class="compare-selector-box">
          <label for="compare-psu-a" class="compare-label">{psuALabel}</label>
          <select
            id="compare-psu-a"
            value={psuAId}
            onChange={handleSelectA}
            class="compare-dropdown"
          >
            {ALL_PSUS.map(p => (
              <option key={p.id} value={p.id}>{p.brand} {p.name} ({p.wattage}W)</option>
            ))}
          </select>
        </div>

        <div class="compare-vs-badge" aria-hidden="true">VS</div>

        <div class="compare-selector-box">
          <label for="compare-psu-b" class="compare-label">{psuBLabel}</label>
          <select
            id="compare-psu-b"
            value={psuBId}
            onChange={handleSelectB}
            class="compare-dropdown"
          >
            {ALL_PSUS.map(p => (
              <option key={p.id} value={p.id}>{p.brand} {p.name} ({p.wattage}W)</option>
            ))}
          </select>
        </div>
      </div>

      {/* Side-by-Side Comparison Table */}
      <div class="comparison-table-wrap" style="margin-top:2rem;">
        <table class="comparison-table" aria-label="PSU Spec Comparison">
          <thead>
            <tr>
              <th scope="col" style="width:30%;">{specLabel}</th>
              <th scope="col" style="width:35%;text-align:center;">
                <span class="compare-header-name">{psuA.brand} {psuA.name}</span>
              </th>
              <th scope="col" style="width:35%;text-align:center;">
                <span class="compare-header-name">{psuB.brand} {psuB.name}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{wattageLabel}</th>
              <td class="compare-value tabular">{psuA.wattage}W</td>
              <td class="compare-value tabular">{psuB.wattage}W</td>
            </tr>
            <tr>
              <th scope="row">{effLabel}</th>
              <td class="compare-value text-capitalize">{psuA.efficiencyTier}</td>
              <td class="compare-value text-capitalize">{psuB.efficiencyTier}</td>
            </tr>
            <tr>
              <th scope="row">{atxLabel}</th>
              <td class={`compare-value ${psuA.atxVersion === '3.1' ? 'compare-highlight-green' : ''}`}>
                ATX {psuA.atxVersion}
              </td>
              <td class={`compare-value ${psuB.atxVersion === '3.1' ? 'compare-highlight-green' : ''}`}>
                ATX {psuB.atxVersion}
              </td>
            </tr>
            <tr>
              <th scope="row">{modularLabel}</th>
              <td class="compare-value text-capitalize">{psuA.modular}</td>
              <td class="compare-value text-capitalize">{psuB.modular}</td>
            </tr>
            <tr>
              <th scope="row">{cable12vLabel}</th>
              <td class="compare-value">
                {psuA.has12v2x6 ? <span class="compare-highlight-green">{yesAtx31}</span> : <span class="compare-highlight-red">{noCable}</span>}
              </td>
              <td class="compare-value">
                {psuB.has12v2x6 ? <span class="compare-highlight-green">{yesAtx31}</span> : <span class="compare-highlight-red">{noCable}</span>}
              </td>
            </tr>
            {psuA.cybeneticsRating || psuB.cybeneticsRating ? (
              <tr>
                <th scope="row">{cybeneticsLabel}</th>
                <td class="compare-value tabular">{psuA.cybeneticsRating || notRated}</td>
                <td class="compare-value tabular">{psuB.cybeneticsRating || notRated}</td>
              </tr>
            ) : null}
            <tr>
              <th scope="row">{priceLabel}</th>
              <td class="compare-value compare-price tabular">{formatCurrency(psuA.price, lang)}</td>
              <td class="compare-value compare-price tabular">{formatCurrency(psuB.price, lang)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
