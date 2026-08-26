/** @jsxImportSource preact */
// ============================================================
// PSUCheck — Interactive TCO Calculator (i18n Enabled)
// Reactive to: selected CPU, GPU, RAM, Storage, Cooling.
// ============================================================

import { useState } from 'preact/hooks';
import { computed } from '@preact/signals';
import {
  selectedCpu,
  selectedGpu,
  selectedRam,
  selectedStorage,
  selectedCooling,
  fans
} from './VirtualAssemblyDesk';
import { calculateBaseDraw } from '../../lib/psu';
import { useTranslations, formatCurrency, type Locale } from '../../i18n';

// Purchase average baseline costs per tier
const PURCHASE_COSTS = {
  bronze: 65,
  gold: 125,
  platinum: 185,
  titanium: 295,
};

// 80 PLUS standard efficiency curves at ~50% typical load
const TIER_EFFICIENCY = {
  bronze: 0.82,
  gold: 0.90,
  platinum: 0.92,
  titanium: 0.94,
};

interface Props {
  lang?: Locale;
}

export function InteractiveTco({ lang = 'en' }: Props) {
  const t = useTranslations(lang);
  const [rate, setRate] = useState<number>(0.15); // $0.15 per kWh default
  const [hours, setHours] = useState<number>(6);   // 6 hours/day default
  const [years, setYears] = useState<number>(5);   // 5 years period default

  const baseDraw = computed(() => {
    return calculateBaseDraw({
      cpu: selectedCpu.value,
      gpu: selectedGpu.value,
      ram: selectedRam.value,
      storage: selectedStorage.value,
      cooling: selectedCooling.value,
      fans: fans.value
    });
  });

  const activeDraw = baseDraw.value;

  const calcTco = (tier: 'bronze' | 'gold' | 'platinum' | 'titanium') => {
    const eff = TIER_EFFICIENCY[tier];
    const wallWatts = activeDraw / eff;
    const annualKwh = (wallWatts / 1000) * hours * 365;
    const annualCost = annualKwh * rate;
    const totalElectricity = annualCost * years;
    const totalTco = PURCHASE_COSTS[tier] + totalElectricity;

    return {
      purchase: PURCHASE_COSTS[tier],
      electricity: Math.round(totalElectricity),
      total: Math.round(totalTco),
    };
  };

  const bronze = calcTco('bronze');
  const gold = calcTco('gold');
  const platinum = calcTco('platinum');
  const titanium = calcTco('titanium');

  const maxCost = Math.max(bronze.total, gold.total, platinum.total, titanium.total, 1);
  const goldSavings = bronze.electricity - gold.electricity;
  const platSavings = bronze.electricity - platinum.electricity;
  const goldBreakeven = (PURCHASE_COSTS.gold - PURCHASE_COSTS.bronze) / (goldSavings / years || 1);

  const hrDayText = lang === 'de' ? 'Std./Tag' : lang === 'es' ? 'h/día' : lang === 'fr' ? 'h/jour' : lang === 'ja' ? '時間/日' : lang === 'zh' ? '小时/天' : 'hrs/day';
  const yearSuffix = lang === 'de' ? 'Jahre Analyse' : lang === 'es' ? 'Años de Análisis' : lang === 'fr' ? 'Ans d\'Analyse' : lang === 'ja' ? '年間の試算' : lang === 'zh' ? '年期深度测算' : 'Years Analysis';
  const singleYearSuffix = lang === 'de' ? '1 Jahr Analyse' : lang === 'es' ? '1 Año de Análisis' : lang === 'fr' ? '1 An d\'Analyse' : lang === 'ja' ? '1年間の試算' : lang === 'zh' ? '1年期深度测算' : '1 Year Analysis';

  const formatSummary = () => {
    const savingsStr = formatCurrency(goldSavings, lang);
    const diffStr = formatCurrency(PURCHASE_COSTS.gold - PURCHASE_COSTS.bronze, lang);
    const beStr = `${goldBreakeven.toFixed(1)} ${lang === 'de' ? 'Jahren' : lang === 'es' ? 'años' : lang === 'fr' ? 'ans' : lang === 'ja' ? '年' : lang === 'zh' ? '年' : 'years'}`;

    if (lang === 'de') {
      return `Das Upgrade von Bronze auf Gold spart ca. ${savingsStr} an Stromkosten über ${years} Jahre. Der Aufpreis von ca. ${diffStr} amortisiert sich in ${beStr}.`;
    }
    if (lang === 'es') {
      return `Actualizar de Bronze a Gold ahorra ${savingsStr} en electricidad durante ${years} años. El sobrecoste de ~${diffStr} se amortiza en ${beStr}.`;
    }
    if (lang === 'fr') {
      return `Passer de Bronze à Gold économise ${savingsStr} d'électricité sur ${years} ans. Le surcoût d'environ ${diffStr} est amorti en ${beStr}.`;
    }
    if (lang === 'ja') {
      return `BronzeからGoldへアップグレードすることで、${years}年間で約${savingsStr}の電気代を節約できます。約${diffStr}の本体差額は約${beStr}で回収可能です。`;
    }
    if (lang === 'zh') {
      return `由铜牌升级至金牌电源，${years} 年内可节省电费支出 ${savingsStr}。约 ${diffStr} 的初始差价可在 ${beStr} 内完全收回。`;
    }
    return `Upgrading from Bronze to Gold saves ${savingsStr} in electricity over ${years} years. The ~${diffStr} higher upfront cost pays for itself in ${beStr}.`;
  };

  return (
    <div class="tco-interactive-wrapper card" style="padding: 2rem; background: var(--color-surface); border: 1px solid var(--color-border-subtle); border-radius: var(--radius-lg);">
      {/* Parameters Header */}
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
        {/* Active sustained draw stat */}
        <div style="display:flex; flex-direction:column; gap:0.25rem;">
          <span style="font-size:0.75rem;font-weight:700;color:var(--color-text-tertiary);text-transform:uppercase;">{t.calculators.continuousLoad}</span>
          <span style="font-size:1.75rem;font-weight:900;color:var(--color-accent-cyan);" class="tabular">{activeDraw}W</span>
          <span style="font-size:0.7rem;color:var(--color-text-tertiary);">{t.calculators.baysTitle}</span>
        </div>

        {/* Electricity Rate Input */}
        <div style="display:flex; flex-direction:column; gap:0.25rem;">
          <label for="tco-rate" style="font-size:0.75rem;font-weight:700;color:var(--color-text-secondary);">{t.tco.kwhRate}</label>
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <input
              id="tco-rate"
              type="number"
              min="0.01"
              max="1.00"
              step="0.01"
              value={rate}
              onInput={(e) => setRate(parseFloat((e.target as HTMLInputElement).value) || 0.15)}
              style="width:90px; padding:0.4rem 0.6rem; border-radius:var(--radius-sm); border:1px solid var(--color-border); background:var(--color-surface-raised); color:var(--color-text-primary); font-size:0.9rem;"
            />
            <span style="font-size:0.75rem;color:var(--color-text-tertiary);">/ kWh</span>
          </div>
        </div>

        {/* Daily Hours Slider */}
        <div style="display:flex; flex-direction:column; gap:0.25rem;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <label for="tco-hours" style="font-size:0.75rem;font-weight:700;color:var(--color-text-secondary);">{t.tco.dailyHours}</label>
            <span style="font-size:0.85rem;font-weight:700;color:var(--color-accent-cyan);" class="tabular">{hours} {hrDayText}</span>
          </div>
          <input
            id="tco-hours"
            type="range"
            min="1"
            max="24"
            step="1"
            value={hours}
            onInput={(e) => setHours(parseInt((e.target as HTMLInputElement).value, 10))}
            style="width:100%; accent-color:var(--color-accent-cyan);"
          />
        </div>

        {/* Period Selector */}
        <div style="display:flex; flex-direction:column; gap:0.25rem;">
          <label for="tco-years" style="font-size:0.75rem;font-weight:700;color:var(--color-text-secondary);">{t.tco.fiveYearCost}</label>
          <select
            id="tco-years"
            value={years}
            onChange={(e) => setYears(parseInt((e.target as HTMLSelectElement).value, 10))}
            style="padding:0.4rem 0.6rem; border-radius:var(--radius-sm); border:1px solid var(--color-border); background:var(--color-surface-raised); color:var(--color-text-primary); font-size:0.85rem;"
          >
            <option value="1">{singleYearSuffix}</option>
            <option value="3">3 {yearSuffix}</option>
            <option value="5">5 {yearSuffix}</option>
            <option value="7">7 {yearSuffix}</option>
            <option value="10">10 {yearSuffix}</option>
          </select>
        </div>
      </div>

      {/* Visual Bar Comparison Grid */}
      <div style="display:flex; flex-direction:column; gap:1.25rem; margin-bottom: 2rem;">
        {/* Bronze */}
        <div style="display:flex; flex-direction:column; gap:0.35rem;">
          <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:700;">
            <span style="color:#cd7f32;">80 PLUS Bronze (82% Eff.)</span>
            <span class="tabular">{formatCurrency(bronze.total, lang)}</span>
          </div>
          <div style="height:24px; width:100%; background:var(--color-surface-overlay); border-radius:var(--radius-sm); display:flex; overflow:hidden;">
            <div style={{ width: `${(bronze.purchase / maxCost) * 100}%`, background: 'rgba(205, 127, 50, 0.4)' }} title="Purchase Cost" />
            <div style={{ width: `${(bronze.electricity / maxCost) * 100}%`, background: '#cd7f32' }} title="Electricity Cost" />
          </div>
        </div>

        {/* Gold */}
        <div style="display:flex; flex-direction:column; gap:0.35rem;">
          <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:700;">
            <span style="color:#eab308;">80 PLUS Gold (90% Eff.)</span>
            <span class="tabular">{formatCurrency(gold.total, lang)}</span>
          </div>
          <div style="height:24px; width:100%; background:var(--color-surface-overlay); border-radius:var(--radius-sm); display:flex; overflow:hidden;">
            <div style={{ width: `${(gold.purchase / maxCost) * 100}%`, background: 'rgba(234, 179, 8, 0.4)' }} title="Purchase Cost" />
            <div style={{ width: `${(gold.electricity / maxCost) * 100}%`, background: '#eab308' }} title="Electricity Cost" />
          </div>
        </div>

        {/* Platinum */}
        <div style="display:flex; flex-direction:column; gap:0.35rem;">
          <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:700;">
            <span style="color:#06b6d4;">80 PLUS Platinum (92% Eff.)</span>
            <span class="tabular">{formatCurrency(platinum.total, lang)}</span>
          </div>
          <div style="height:24px; width:100%; background:var(--color-surface-overlay); border-radius:var(--radius-sm); display:flex; overflow:hidden;">
            <div style={{ width: `${(platinum.purchase / maxCost) * 100}%`, background: 'rgba(6, 182, 212, 0.4)' }} title="Purchase Cost" />
            <div style={{ width: `${(platinum.electricity / maxCost) * 100}%`, background: '#06b6d4' }} title="Electricity Cost" />
          </div>
        </div>

        {/* Titanium */}
        <div style="display:flex; flex-direction:column; gap:0.35rem;">
          <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:700;">
            <span style="color:#a855f7;">80 PLUS Titanium (94% Eff.)</span>
            <span class="tabular">{formatCurrency(titanium.total, lang)}</span>
          </div>
          <div style="height:24px; width:100%; background:var(--color-surface-overlay); border-radius:var(--radius-sm); display:flex; overflow:hidden;">
            <div style={{ width: `${(titanium.purchase / maxCost) * 100}%`, background: 'rgba(168, 85, 247, 0.4)' }} title="Purchase Cost" />
            <div style={{ width: `${(titanium.electricity / maxCost) * 100}%`, background: '#a855f7' }} title="Electricity Cost" />
          </div>
        </div>
      </div>

      {/* Summary / Break-even verdict */}
      <div style="background:var(--color-surface-raised); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--color-border-subtle); display:flex; flex-direction:column; gap:0.5rem; font-size:0.85rem; line-height:1.5;">
        <div style="font-weight:700; color:var(--color-accent-cyan);">
          💡 {t.tco.efficiencySavings}
        </div>
        <p style="color:var(--color-text-secondary); margin:0;">
          {formatSummary()}
        </p>
      </div>
    </div>
  );
}
