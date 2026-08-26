import type { Locale } from './locales';
import { formatCurrency } from './utils';

export interface ReplacementCalcLabels {
  currentPsuHeading: string;
  ratedWattageLabel: string;
  wattsSuffix: string;
  psuAgeLabel: string;
  yearsSuffix: string;
  efficiencyLabel: string;
  atxSpecLabel: string;
  pcHardwareHeading: string;
  gpuLabel: string;
  cpuLabel: string;
  usageHoursLabel: string;
  hrDaySuffix: string;
  electricityRateLabel: string;
  rateSuffix: string;
  verdictActionLabel: (urgency: 'immediate' | 'within-year' | 'none') => string;
  replaceImmediately: string;
  upgradeRecommended: string;
  psuSafeToKeep: string;
  healthScoreLabel: string;
  effectiveOutputLabel: string;
  ratedSuffix: (w: number) => string;
  calculatedPeakDrawLabel: string;
  estimatedSafeLifespanLabel: string;
  yearsEstimated: (y: number) => string;
  costBenefitLabel: string;
  recommendedPsusHeading: string;
  wattageCardLabel: (w: number) => string;
  viewOnAmazon: string;
  tierLabel: (t: string) => string;
  efficiencyOptions: {
    bronze: string;
    gold: string;
    platinum: string;
    titanium: string;
  };
  atxOptions: {
    '2.x': string;
    '3.0': string;
    '3.1': string;
  };
  getReason: (action: 'replace' | 'plan' | 'keep', peak: number, effective: number, headroom: number) => string;
  getCostBenefit: (isUpgrade: boolean) => string;
}

export const PSU_REPLACEMENT_TRANSLATIONS: Record<Locale, ReplacementCalcLabels> = {
  en: {
    currentPsuHeading: 'Current Power Supply Details',
    ratedWattageLabel: 'Rated PSU Wattage',
    wattsSuffix: 'Watts',
    psuAgeLabel: 'PSU Age',
    yearsSuffix: 'Years',
    efficiencyLabel: 'Efficiency Rating',
    atxSpecLabel: 'ATX Specification',
    pcHardwareHeading: 'PC Hardware Specs',
    gpuLabel: 'Graphics Card (GPU)',
    cpuLabel: 'Processor (CPU)',
    usageHoursLabel: 'Usage Load Hours',
    hrDaySuffix: 'Hr/Day',
    electricityRateLabel: 'Electricity Rate',
    rateSuffix: '/kWh',
    verdictActionLabel: (urgency) =>
      urgency === 'immediate'
        ? 'VERDICT: IMMEDIATE ACTION'
        : urgency === 'within-year'
        ? 'VERDICT: ACTION RECOMMENDED'
        : 'VERDICT: SYSTEM SAFE',
    replaceImmediately: 'Replace Immediately',
    upgradeRecommended: 'Upgrade Recommended',
    psuSafeToKeep: 'PSU Safe to Keep',
    healthScoreLabel: 'PSU Health Score',
    effectiveOutputLabel: 'Effective Output',
    ratedSuffix: (w) => `(Rated ${w}W)`,
    calculatedPeakDrawLabel: 'Calculated Peak Draw',
    estimatedSafeLifespanLabel: 'Estimated Safe Lifespan',
    yearsEstimated: (y) => `~${y} Years`,
    costBenefitLabel: 'Cost-Benefit Insight:',
    recommendedPsusHeading: 'Recommended Replacement Power Supplies',
    wattageCardLabel: (w) => `Wattage: ${w}W`,
    viewOnAmazon: 'View on Amazon',
    tierLabel: (t) => (t === 'Avoid' ? 'Avoid' : `Tier ${t}`),
    efficiencyOptions: {
      bronze: '80+ Bronze',
      gold: '80+ Gold',
      platinum: '80+ Platinum',
      titanium: '80+ Titanium'
    },
    atxOptions: {
      '2.x': 'ATX 2.x (Legacy Standard)',
      '3.0': 'ATX 3.0 (12VHPWR Gen)',
      '3.1': 'ATX 3.1 (12V-2x6 Connector)'
    },
    getReason: (action, peak, effective, headroom) => {
      if (action === 'replace') {
        return `Your PSU is critically degraded or lacks the capacity to handle your build's ${Math.round(peak)}W transient spikes, risking instant system resets or component damage.`;
      }
      if (action === 'plan') {
        return `Your PSU is degraded (~${Math.round(effective)}W effective capacity) and operates with slim headroom under peak loads. Plan to replace within 12 months.`;
      }
      return `Your PSU is healthy, holds adequate headroom (~${Math.round(headroom)}W above peak draw), and does not require immediate replacement.`;
    },
    getCostBenefit: (isUpgrade) =>
      isUpgrade
        ? 'Upgrading to a modern Gold/Platinum PSU resolves peak OCP shutdowns and improves overall load efficiency.'
        : 'A new 80+ Gold PSU will operate at its peak efficiency zone (~50% load), saving an estimated $15-$30 annually in electricity bills.'
  },
  de: {
    currentPsuHeading: 'Aktuelle Netzteil-Details',
    ratedWattageLabel: 'Nennleistung des Netzteils',
    wattsSuffix: 'Watt',
    psuAgeLabel: 'Netzteil-Alter',
    yearsSuffix: 'Jahre',
    efficiencyLabel: 'Effizienz-Klasse',
    atxSpecLabel: 'ATX-Spezifikation',
    pcHardwareHeading: 'PC-Hardware-Konfiguration',
    gpuLabel: 'Grafikkarte (GPU)',
    cpuLabel: 'Prozessor (CPU)',
    usageHoursLabel: 'Tägliche Nutzungsdauer',
    hrDaySuffix: 'Std/Tag',
    electricityRateLabel: 'Strompreis',
    rateSuffix: '/kWh',
    verdictActionLabel: (urgency) =>
      urgency === 'immediate'
        ? 'DIAGNOSE: SOFORTIGER AUSTAUSCH ERFORDERLICH'
        : urgency === 'within-year'
        ? 'DIAGNOSE: AUSTAUSCH EMPFOHLEN'
        : 'DIAGNOSE: SYSTEM SICHER',
    replaceImmediately: 'Sofort ersetzen',
    upgradeRecommended: 'Upgrade empfohlen',
    psuSafeToKeep: 'Netzteil kann behalten werden',
    healthScoreLabel: 'Netzteil-Zustand (Score)',
    effectiveOutputLabel: 'Effektive Leistung',
    ratedSuffix: (w) => `(Nennwert ${w}W)`,
    calculatedPeakDrawLabel: 'Berechnete Lastspitze',
    estimatedSafeLifespanLabel: 'Geschätzte Restlebensdauer',
    yearsEstimated: (y) => `~${y} Jahre`,
    costBenefitLabel: 'Wirtschaftlichkeits-Hinweis:',
    recommendedPsusHeading: 'Empfohlene Ersatz-Netzteile',
    wattageCardLabel: (w) => `Leistung: ${w}W`,
    viewOnAmazon: 'Auf Amazon ansehen',
    tierLabel: (t) => (t === 'Avoid' ? 'Vermeiden' : `Tier ${t}`),
    efficiencyOptions: {
      bronze: '80+ Bronze',
      gold: '80+ Gold',
      platinum: '80+ Platinum',
      titanium: '80+ Titanium'
    },
    atxOptions: {
      '2.x': 'ATX 2.x (Älterer Standard)',
      '3.0': 'ATX 3.0 (12VHPWR Gen)',
      '3.1': 'ATX 3.1 (12V-2x6 Anschluss)'
    },
    getReason: (action, peak, effective, headroom) => {
      if (action === 'replace') {
        return `Ihr Netzteil ist kritisch gealtert oder verfügt nicht über ausreichende Kapazität für die Lastspitzen von ${Math.round(peak)}W. Es besteht das Risiko von Notabschaltungen oder Hardwareschäden.`;
      }
      if (action === 'plan') {
        return `Ihr Netzteil ist gealtert (~${Math.round(effective)}W effektive Kapazität) und arbeitet unter Volllast mit geringer Reserve. Ein Austausch innerhalb der nächsten 12 Monate wird empfohlen.`;
      }
      return `Ihr Netzteil ist in gutem Zustand, bietet ausreichende Sicherheitsreserven (~${Math.round(headroom)}W über Spitzenlast) und muss nicht ersetzt werden.`;
    },
    getCostBenefit: (isUpgrade) =>
      isUpgrade
        ? 'Ein Upgrade auf ein modernes Gold/Platinum-Netzteil verhindert OCP-Abschaltungen und senkt den Stromverbrauch.'
        : 'Ein neues 80+ Gold-Netzteil arbeitet im optimalen Wirkungsgradbereich (~50% Last) und spart jährlich ca. 15–30 € an Stromkosten.'
  },
  es: {
    currentPsuHeading: 'Detalles de la Fuente de Alimentación Actual',
    ratedWattageLabel: 'Potencia Nominal de la Fuente',
    wattsSuffix: 'Vatios',
    psuAgeLabel: 'Antigüedad de la Fuente',
    yearsSuffix: 'Años',
    efficiencyLabel: 'Certificación de Eficiencia',
    atxSpecLabel: 'Especificación ATX',
    pcHardwareHeading: 'Especificaciones de Hardware del PC',
    gpuLabel: 'Tarjeta Gráfica (GPU)',
    cpuLabel: 'Procesador (CPU)',
    usageHoursLabel: 'Horas de Uso Diario',
    hrDaySuffix: 'h/día',
    electricityRateLabel: 'Precio de la Electricidad',
    rateSuffix: '/kWh',
    verdictActionLabel: (urgency) =>
      urgency === 'immediate'
        ? 'DICTAMEN: ACCIÓN INMEDIATA'
        : urgency === 'within-year'
        ? 'DICTAMEN: ACTUALIZACIÓN RECOMENDADA'
        : 'DICTAMEN: SISTEMA SEGURO',
    replaceImmediately: 'Reemplazar Inmediatamente',
    upgradeRecommended: 'Actualización Recomendada',
    psuSafeToKeep: 'Fuente Segura (Mantener)',
    healthScoreLabel: 'Puntuación de Salud de la Fuente',
    effectiveOutputLabel: 'Potencia Real Efectiva',
    ratedSuffix: (w) => `(Nominal ${w}W)`,
    calculatedPeakDrawLabel: 'Pico de Consumo Calculado',
    estimatedSafeLifespanLabel: 'Vida Útil Segura Estimada',
    yearsEstimated: (y) => `~${y} Años`,
    costBenefitLabel: 'Análisis Coste-Beneficio:',
    recommendedPsusHeading: 'Fuentes de Alimentación Recomendadas de Reemplazo',
    wattageCardLabel: (w) => `Potencia: ${w}W`,
    viewOnAmazon: 'Ver en Amazon',
    tierLabel: (t) => (t === 'Avoid' ? 'Evitar' : `Nivel ${t}`),
    efficiencyOptions: {
      bronze: '80+ Bronze',
      gold: '80+ Gold',
      platinum: '80+ Platinum',
      titanium: '80+ Titanium'
    },
    atxOptions: {
      '2.x': 'ATX 2.x (Estándar Heredado)',
      '3.0': 'ATX 3.0 (Generación 12VHPWR)',
      '3.1': 'ATX 3.1 (Conector 12V-2x6)'
    },
    getReason: (action, peak, effective, headroom) => {
      if (action === 'replace') {
        return `Tu fuente está críticamente degradada o carece de capacidad para soportar los picos transitorios de ${Math.round(peak)}W de tu equipo, arriesgando reinicios repentinos o daños en los componentes.`;
      }
      if (action === 'plan') {
        return `Tu fuente muestra degradación (~${Math.round(effective)}W de capacidad efectiva) y opera con un margen muy estrecho bajo carga máxima. Planifica su sustitución en los próximos 12 meses.`;
      }
      return `Tu fuente de alimentación está en buen estado, mantiene un margen holgado (~${Math.round(headroom)}W sobre el pico) y no requiere reemplazo inmediato.`;
    },
    getCostBenefit: (isUpgrade) =>
      isUpgrade
        ? 'Actualizar a una fuente moderna Gold/Platinum previene apagados repentinos por OCP y mejora la eficiencia energética.'
        : 'Una nueva fuente 80+ Gold operará en su curva óptima de eficiencia (~50% de carga), ahorrando unos 15€-30€ anuales en la factura eléctrica.'
  },
  fr: {
    currentPsuHeading: 'Détails de l\'Alimentation Actuelle',
    ratedWattageLabel: 'Puissance Nominale du Bloc',
    wattsSuffix: 'Watts',
    psuAgeLabel: 'Âge de l\'Alimentation',
    yearsSuffix: 'Ans',
    efficiencyLabel: 'Certification d\'Efficacité',
    atxSpecLabel: 'Spécification ATX',
    pcHardwareHeading: 'Configuration Matérielle du PC',
    gpuLabel: 'Carte Graphique (GPU)',
    cpuLabel: 'Processeur (CPU)',
    usageHoursLabel: 'Heures d\'Utilisation par Jour',
    hrDaySuffix: 'h/jour',
    electricityRateLabel: 'Tarif Électricité',
    rateSuffix: '/kWh',
    verdictActionLabel: (urgency) =>
      urgency === 'immediate'
        ? 'VERDICT : ACTION IMMÉDIATE'
        : urgency === 'within-year'
        ? 'VERDICT : REMPLACEMENT RECOMMANDÉ'
        : 'VERDICT : SYSTÈME SÉCURISÉ',
    replaceImmediately: 'Remplacer Immédiatement',
    upgradeRecommended: 'Remplacement Recommandé',
    psuSafeToKeep: 'Alimentation Sûre (Conserver)',
    healthScoreLabel: 'Score de Santé du Bloc',
    effectiveOutputLabel: 'Puissance Réelle Débitée',
    ratedSuffix: (w) => `(Nominale ${w}W)`,
    calculatedPeakDrawLabel: 'Pic de Charge Calculé',
    estimatedSafeLifespanLabel: 'Durée de Vie Estimée',
    yearsEstimated: (y) => `~${y} Ans`,
    costBenefitLabel: 'Aperçu Rentabilité & Économies :',
    recommendedPsusHeading: 'Blocs d\'Alimentation Recommandés en Remplacement',
    wattageCardLabel: (w) => `Puissance : ${w}W`,
    viewOnAmazon: 'Voir sur Amazon',
    tierLabel: (t) => (t === 'Avoid' ? 'À Éviter' : `Tier ${t}`),
    efficiencyOptions: {
      bronze: '80+ Bronze',
      gold: '80+ Gold',
      platinum: '80+ Platinum',
      titanium: '80+ Titanium'
    },
    atxOptions: {
      '2.x': 'ATX 2.x (Ancienne Norme)',
      '3.0': 'ATX 3.0 (Génération 12VHPWR)',
      '3.1': 'ATX 3.1 (Connecteur 12V-2x6)'
    },
    getReason: (action, peak, effective, headroom) => {
      if (action === 'replace') {
        return `Votre alimentation est gravement dégradée ou manque de puissance pour absorber les pics transitoires de ${Math.round(peak)}W, risquant des arrêts brutaux ou des dommages matériels.`;
      }
      if (action === 'plan') {
        return `Votre alimentation montre des signes d'usure (~${Math.round(effective)}W de puissance réelle) et fonctionne avec une marge très faible. Prévoyez son remplacement d'ici 12 mois.`;
      }
      return `Votre alimentation est en parfait état, dispose d'une marge confortable (~${Math.round(headroom)}W au-dessus du pic) et ne nécessite pas de remplacement.`;
    },
    getCostBenefit: (isUpgrade) =>
      isUpgrade
        ? 'Passer à une alimentation moderne Gold/Platinum élimine les coupures OCP et améliore le rendement global.'
        : 'Une nouvelle alimentation 80+ Gold fonctionnera sur sa plage de rendement optimale (~50% de charge), économisant 15€ à 30€ par an sur vos factures.'
  },
  ja: {
    currentPsuHeading: '現在使用中の電源ユニット情報',
    ratedWattageLabel: '電源の定格出力',
    wattsSuffix: 'W',
    psuAgeLabel: '電源の使用年数',
    yearsSuffix: '年',
    efficiencyLabel: '変換効率規格',
    atxSpecLabel: 'ATX規格バージョン',
    pcHardwareHeading: '搭載PCパーツ構成',
    gpuLabel: 'グラフィックボード (GPU)',
    cpuLabel: 'プロセッサ (CPU)',
    usageHoursLabel: '1日の稼働時間',
    hrDaySuffix: '時間/日',
    electricityRateLabel: '電気料金単価',
    rateSuffix: '/kWh',
    verdictActionLabel: (urgency) =>
      urgency === 'immediate'
        ? '診断結果: 直ちに対処が必要'
        : urgency === 'within-year'
        ? '診断結果: 交換・アップグレード推奨'
        : '診断結果: 継続使用可能（安全）',
    replaceImmediately: '直ちに交換が必要',
    upgradeRecommended: '交換・アップグレード推奨',
    psuSafeToKeep: '現在の電源で安全に使用可能',
    healthScoreLabel: '電源ヘルススコア (健康度)',
    effectiveOutputLabel: '実効出力可能W数',
    ratedSuffix: (w) => `(定格 ${w}W)`,
    calculatedPeakDrawLabel: '計算された最大スパイク電力',
    estimatedSafeLifespanLabel: '安全使用推定寿命',
    yearsEstimated: (y) => `残り約 ${y} 年`,
    costBenefitLabel: '省エネ・経済性分析:',
    recommendedPsusHeading: '推奨される交換用電源ユニット',
    wattageCardLabel: (w) => `定格出力: ${w}W`,
    viewOnAmazon: 'Amazonで見る',
    tierLabel: (t) => (t === 'Avoid' ? '回避推奨' : `Tier ${t}`),
    efficiencyOptions: {
      bronze: '80+ Bronze',
      gold: '80+ Gold',
      platinum: '80+ Platinum',
      titanium: '80+ Titanium'
    },
    atxOptions: {
      '2.x': 'ATX 2.x (旧規格)',
      '3.0': 'ATX 3.0 (12VHPWR世代)',
      '3.1': 'ATX 3.1 (最新 12V-2x6コネクタ)'
    },
    getReason: (action, peak, effective, headroom) => {
      if (action === 'replace') {
        return `電源ユニットが著しく劣化しているか、システムの瞬間スパイク電力 ${Math.round(peak)}W に対する容量が不足しています。突然のシャットダウンやパーツ破損のリスクがあります。`;
      }
      if (action === 'plan') {
        return `電源ユニットの経年劣化が進んでおり（実効容量 約${Math.round(effective)}W）、高負荷時の余力が少なくなっています。1年以内の交換をおすすめします。`;
      }
      return `電源ユニットは良好な状態を保っており、瞬間最大負荷に対しても十分なマージン（約${Math.round(headroom)}W）を確保できています。今すぐ交換する必要はありません。`;
    },
    getCostBenefit: (isUpgrade) =>
      isUpgrade
        ? '最新のATX 3.1 Gold/Platinum電源にアップグレードすることで、スパイクによるOCP遮断を防ぎ、変換ロスを大幅に削減できます。'
        : '新しい80+ Gold電源は最高効率ゾーン（負荷率約50%）で動作し、年間約2,000円〜4,500円の電気代削減効果が見込めます。'
  },
  zh: {
    currentPsuHeading: '当前在用电源参数配置',
    ratedWattageLabel: '电源额定功率',
    wattsSuffix: 'W',
    psuAgeLabel: '电源已使用年限',
    yearsSuffix: '年',
    efficiencyLabel: '80 PLUS 转换效率认证',
    atxSpecLabel: 'ATX 供电标准规范',
    pcHardwareHeading: '主机核心硬件清单',
    gpuLabel: '独立显卡 (GPU)',
    cpuLabel: '处理器 (CPU)',
    usageHoursLabel: '日均满载/开机时长',
    hrDaySuffix: '小时/天',
    electricityRateLabel: '当地居民/商业用电单价',
    rateSuffix: '元/度(kWh)',
    verdictActionLabel: (urgency) =>
      urgency === 'immediate'
        ? '诊断结论: 存在风险 须立即更换'
        : urgency === 'within-year'
        ? '诊断结论: 建议规划升级'
        : '诊断结论: 电源工况良好 可继续使用',
    replaceImmediately: '须立即更换电源',
    upgradeRecommended: '建议近期升级',
    psuSafeToKeep: '工况安全 可继续使用',
    healthScoreLabel: '电源健康度评估得分',
    effectiveOutputLabel: '当前老化折算实效功率',
    ratedSuffix: (w) => `(出厂标称 ${w}W)`,
    calculatedPeakDrawLabel: '整机瞬态尖峰峰值功耗',
    estimatedSafeLifespanLabel: '预计安全剩余使用寿命',
    yearsEstimated: (y) => `约 ${y} 年`,
    costBenefitLabel: '能效与电费收益洞察:',
    recommendedPsusHeading: '严选适配更换电源推荐清单',
    wattageCardLabel: (w) => `额定功率: ${w}W`,
    viewOnAmazon: '在亚马逊查看',
    tierLabel: (t) => (t === 'Avoid' ? '避免购买' : `Tier ${t}`),
    efficiencyOptions: {
      bronze: '80+ 铜牌 (Bronze)',
      gold: '80+ 金牌 (Gold)',
      platinum: '80+ 白金 (Platinum)',
      titanium: '80+ 钛金 (Titanium)'
    },
    atxOptions: {
      '2.x': 'ATX 2.x (传统老标准)',
      '3.0': 'ATX 3.0 (首代 12VHPWR 规范)',
      '3.1': 'ATX 3.1 (最新 12V-2x6 防烧接口)'
    },
    getReason: (action, peak, effective, headroom) => {
      if (action === 'replace') {
        return `当前电源电容已严重衰减或输出功率不足，无法承受整机高达 ${Math.round(peak)}W 的瞬态尖峰冲击，存在断电死机及损坏贵重配件的风险。`;
      }
      if (action === 'plan') {
        return `当前电源出现电容老化（实效功率仅约 ${Math.round(effective)}W），满载运行安全余量偏小，建议在未来 12 个月内规划更换。`;
      }
      return `当前电源健康状况良好，在峰值负载下仍保留了充裕的安全冗余（约 ${Math.round(headroom)}W），无需立即更换。`;
    },
    getCostBenefit: (isUpgrade) =>
      isUpgrade
        ? '升级至现代 ATX 3.1 金牌/白金电源可彻底消除瞬态过流保护(OCP)误触发跳闸，显著提升整机用电稳定性。'
        : '换装全新 80+ 金牌电源可使其处于黄金效率区间（约 50% 负载），每年预估可节省 100~200 元电费支出。'
  }
};

export function getPsuReplacementTranslations(lang: Locale): ReplacementCalcLabels {
  return PSU_REPLACEMENT_TRANSLATIONS[lang] || PSU_REPLACEMENT_TRANSLATIONS.en;
}
