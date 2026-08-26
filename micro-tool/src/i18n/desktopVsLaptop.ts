import type { Locale } from './locales';
import { formatCurrency } from './utils';

export interface DesktopVsLaptopLabels {
  presetsHeading: string;
  desktopConfigLabel: string;
  laptopConfigLabel: string;
  customPowerRating: string;
  customLoadLabel: (w: number) => string;
  usageHeading: string;
  heavyUsageLabel: string;
  lightUsageLabel: string;
  hrDaySuffix: string;
  electricityRateLabel: string;
  rateSuffix: string;
  timelineLabel: string;
  yearsSuffix: string;
  projectionsHeading: string;
  efficiencyVerdict: string;
  verdictTitle: (better: string) => string;
  verdictDesc: (better: string, savingsYear: number, savingsTotal: number, years: number, lang: Locale) => string;
  operatingDraw: string;
  idleDraw: string;
  annualConsumption: string;
  desktopCostTitle: (years: number) => string;
  laptopCostTitle: (years: number) => string;
  desktopPresets: Array<{ name: string; loadWatts: number }>;
  laptopPresets: Array<{ name: string; loadWatts: number }>;
}

export const DESKTOP_VS_LAPTOP_TRANSLATIONS: Record<Locale, DesktopVsLaptopLabels> = {
  en: {
    presetsHeading: '1. Sizing Presets',
    desktopConfigLabel: 'Desktop Config',
    laptopConfigLabel: 'Laptop Config',
    customPowerRating: 'Custom Power Rating',
    customLoadLabel: (w) => `Custom Gaming Load (W): ${w}W`,
    usageHeading: '2. Usage & Cost Parameters',
    heavyUsageLabel: 'Heavy Usage (Gaming/Load)',
    lightUsageLabel: 'Light Usage (Office/Idle)',
    hrDaySuffix: 'hr/day',
    electricityRateLabel: 'Electricity Rate',
    rateSuffix: '/kWh',
    timelineLabel: 'Timeline Horizon',
    yearsSuffix: 'Years',
    projectionsHeading: '3. Cost Comparison Projections',
    efficiencyVerdict: 'Efficiency Verdict',
    verdictTitle: (better) => `The ${better} Saves You Money`,
    verdictDesc: (better, savingsYear, savingsTotal, years, lang) =>
      `By using a ${better.toLowerCase()}, you reduce your electric bill by approximately ${formatCurrency(savingsYear, lang)} per year, saving ${formatCurrency(savingsTotal, lang)} over your ${years}-year timeline.`,
    operatingDraw: 'Operating Mode Draw',
    idleDraw: 'Idle/Office Mode Draw',
    annualConsumption: 'Annual Power Consumption',
    desktopCostTitle: (years) => `Desktop PC ${years}-Yr Cost`,
    laptopCostTitle: (years) => `Laptop ${years}-Yr Cost`,
    desktopPresets: [
      { name: 'Budget PC (Ryzen 5 + RTX 4060)', loadWatts: 180 },
      { name: 'Mid-Range PC (Ryzen 7 + RTX 4070 SUPER)', loadWatts: 350 },
      { name: 'High-End PC (Ryzen 7 + RTX 5080)', loadWatts: 550 },
      { name: 'Enthusiast PC (Intel i9 + RTX 5090)', loadWatts: 800 }
    ],
    laptopPresets: [
      { name: 'Thin & Light (MacBook Pro / Office)', loadWatts: 30 },
      { name: 'Productivity Laptop (Dell XPS / Creator)', loadWatts: 85 },
      { name: 'High-End Gaming Laptop (ASUS G14 / Blade)', loadWatts: 180 }
    ]
  },
  de: {
    presetsHeading: '1. Voreinstellungen für Hardware',
    desktopConfigLabel: 'Desktop-Konfiguration',
    laptopConfigLabel: 'Laptop-Konfiguration',
    customPowerRating: 'Benutzerdefinierte Leistung',
    customLoadLabel: (w) => `Eigener Gaming-Verbrauch: ${w}W`,
    usageHeading: '2. Nutzungs- & Kostenparameter',
    heavyUsageLabel: 'Hohe Last (Gaming/Rendering)',
    lightUsageLabel: 'Geringe Last (Office/Leerlauf)',
    hrDaySuffix: 'Std/Tag',
    electricityRateLabel: 'Strompreis',
    rateSuffix: '/kWh',
    timelineLabel: 'Betrachtungszeitraum',
    yearsSuffix: 'Jahre',
    projectionsHeading: '3. Kostenvergleich & Prognose',
    efficiencyVerdict: 'Effizienz-Auswertung',
    verdictTitle: (better) => `Mit dem ${better} sparen Sie bares Geld`,
    verdictDesc: (better, savingsYear, savingsTotal, years, lang) =>
      `Durch die Nutzung eines ${better === 'Desktop' ? 'Desktop-PCs' : 'Laptops'} senken Sie Ihre Stromkosten um ca. ${formatCurrency(savingsYear, lang)} pro Jahr und sparen ${formatCurrency(savingsTotal, lang)} über ${years} Jahre.`,
    operatingDraw: 'Leistungsaufnahme unter Last',
    idleDraw: 'Leistungsaufnahme Leerlauf/Office',
    annualConsumption: 'Jährlicher Stromverbrauch',
    desktopCostTitle: (years) => `Desktop-PC Stromkosten (${years} Jahre)`,
    laptopCostTitle: (years) => `Laptop Stromkosten (${years} Jahre)`,
    desktopPresets: [
      { name: 'Einsteiger-PC (Ryzen 5 + RTX 4060)', loadWatts: 180 },
      { name: 'Mittelklasse-PC (Ryzen 7 + RTX 4070 SUPER)', loadWatts: 350 },
      { name: 'High-End PC (Ryzen 7 + RTX 5080)', loadWatts: 550 },
      { name: 'Enthusiasten-PC (Intel i9 + RTX 5090)', loadWatts: 800 }
    ],
    laptopPresets: [
      { name: 'Ultra-Slim / Office (MacBook Pro / Thin)', loadWatts: 30 },
      { name: 'Creator-Laptop (Dell XPS / Studio)', loadWatts: 85 },
      { name: 'High-End Gaming-Laptop (ASUS G14 / Blade)', loadWatts: 180 }
    ]
  },
  es: {
    presetsHeading: '1. Perfiles de Hardware',
    desktopConfigLabel: 'Configuración Sobremesa',
    laptopConfigLabel: 'Configuración Portátil',
    customPowerRating: 'Potencia Personalizada',
    customLoadLabel: (w) => `Consumo Personalizado en Juegos: ${w}W`,
    usageHeading: '2. Parámetros de Uso y Tarifas',
    heavyUsageLabel: 'Uso Intensivo (Juegos/Carga)',
    lightUsageLabel: 'Uso Ligero (Ofimática/Reposo)',
    hrDaySuffix: 'h/día',
    electricityRateLabel: 'Tarifa de la Luz',
    rateSuffix: '/kWh',
    timelineLabel: 'Horizonte Temporal',
    yearsSuffix: 'Años',
    projectionsHeading: '3. Proyección Comparativa de Costes',
    efficiencyVerdict: 'Dictamen de Eficiencia',
    verdictTitle: (better) => `El ${better === 'Desktop' ? 'PC de Sobremesa' : 'Portátil'} te permite Ahorrar`,
    verdictDesc: (better, savingsYear, savingsTotal, years, lang) =>
      `Utilizando un ${better === 'Desktop' ? 'PC de sobremesa' : 'portátil'}, reduces tu factura eléctrica aproximadamente ${formatCurrency(savingsYear, lang)} al año, ahorrando ${formatCurrency(savingsTotal, lang)} en un periodo de ${years} años.`,
    operatingDraw: 'Consumo en Modo Activo (Juegos)',
    idleDraw: 'Consumo en Reposo / Ofimática',
    annualConsumption: 'Consumo Anual de Energía',
    desktopCostTitle: (years) => `Coste Sobremesa en ${years} Años`,
    laptopCostTitle: (years) => `Coste Portátil en ${years} Años`,
    desktopPresets: [
      { name: 'PC Económico (Ryzen 5 + RTX 4060)', loadWatts: 180 },
      { name: 'PC Gama Media (Ryzen 7 + RTX 4070 SUPER)', loadWatts: 350 },
      { name: 'PC Gama Alta (Ryzen 7 + RTX 5080)', loadWatts: 550 },
      { name: 'PC Entusiasta (Intel i9 + RTX 5090)', loadWatts: 800 }
    ],
    laptopPresets: [
      { name: 'Ultrabook / Oficina (MacBook Pro / Ligero)', loadWatts: 30 },
      { name: 'Portátil Productividad (Dell XPS / Creadores)', loadWatts: 85 },
      { name: 'Portátil Gaming Potente (ASUS G14 / Blade)', loadWatts: 180 }
    ]
  },
  fr: {
    presetsHeading: '1. Profils Matériels',
    desktopConfigLabel: 'Configuration PC Fixe',
    laptopConfigLabel: 'Configuration PC Portable',
    customPowerRating: 'Puissance Personnalisée',
    customLoadLabel: (w) => `Consommation Personnalisée en Charge : ${w}W`,
    usageHeading: '2. Paramètres d\'Utilisation & Tarifs',
    heavyUsageLabel: 'Usage Intensif (Jeux/Rendu)',
    lightUsageLabel: 'Usage Léger (Bureautique/Repos)',
    hrDaySuffix: 'h/jour',
    electricityRateLabel: 'Prix de l\'Électricité',
    rateSuffix: '/kWh',
    timelineLabel: 'Horizon d\'Analyse',
    yearsSuffix: 'Ans',
    projectionsHeading: '3. Comparatif des Coûts & Rentabilité',
    efficiencyVerdict: 'Verdict Énergétique',
    verdictTitle: (better) => `Le ${better === 'Desktop' ? 'PC Fixe' : 'Portable'} vous fait économiser`,
    verdictDesc: (better, savingsYear, savingsTotal, years, lang) =>
      `En optant pour un ${better === 'Desktop' ? 'PC fixe' : 'portable'}, vous réduisez votre facture d'électricité d'environ ${formatCurrency(savingsYear, lang)} par an, soit une économie de ${formatCurrency(savingsTotal, lang)} sur ${years} ans.`,
    operatingDraw: 'Consommation en Charge (Jeux)',
    idleDraw: 'Consommation au Repos (Bureautique)',
    annualConsumption: 'Consommation Électrique Annuelle',
    desktopCostTitle: (years) => `Coût PC Fixe sur ${years} Ans`,
    laptopCostTitle: (years) => `Coût Portable sur ${years} Ans`,
    desktopPresets: [
      { name: 'PC Budget (Ryzen 5 + RTX 4060)', loadWatts: 180 },
      { name: 'PC Milieu de Gamme (Ryzen 7 + RTX 4070 SUPER)', loadWatts: 350 },
      { name: 'PC Haut de Gamme (Ryzen 7 + RTX 5080)', loadWatts: 550 },
      { name: 'PC Enthusiast (Intel i9 + RTX 5090)', loadWatts: 800 }
    ],
    laptopPresets: [
      { name: 'Ultraportable / Bureautique (MacBook Pro)', loadWatts: 30 },
      { name: 'Portable Créatif (Dell XPS / Studio)', loadWatts: 85 },
      { name: 'Portable Gaming Haut de Gamme (ASUS G14 / Blade)', loadWatts: 180 }
    ]
  },
  ja: {
    presetsHeading: '1. ハードウェア構成プリセット',
    desktopConfigLabel: 'デスクトップPC構成',
    laptopConfigLabel: 'ノートPC構成',
    customPowerRating: 'カスタム手動入力',
    customLoadLabel: (w) => `カスタムゲーム時消費電力: ${w}W`,
    usageHeading: '2. 使用時間・電気代単価設定',
    heavyUsageLabel: '高負荷稼働 (ゲーム/レンダリング)',
    lightUsageLabel: '軽負荷稼働 (事務作業/アイドル)',
    hrDaySuffix: '時間/日',
    electricityRateLabel: '電気料金単価',
    rateSuffix: '/kWh',
    timelineLabel: '試算年数 (タイムライン)',
    yearsSuffix: '年',
    projectionsHeading: '3. 電気代比較・シミュレーション結果',
    efficiencyVerdict: '省エネ・経済性判定',
    verdictTitle: (better) => `${better === 'Desktop' ? 'デスクトップPC' : 'ノートPC'} の方が電気代を節約できます`,
    verdictDesc: (better, savingsYear, savingsTotal, years, lang) =>
      `${better === 'Desktop' ? 'デスクトップPC' : 'ノートPC'} を使用することで、年間約 ${formatCurrency(savingsYear, lang)}、${years} 年間で合計約 ${formatCurrency(savingsTotal, lang)} の電気代を節約できます。`,
    operatingDraw: '高負荷・ゲーム時消費電力',
    idleDraw: 'アイドル・事務作業時消費電力',
    annualConsumption: '年間総消費電力量',
    desktopCostTitle: (years) => `デスクトップPC ${years}年間の電気代`,
    laptopCostTitle: (years) => `ノートPC ${years}年間の電気代`,
    desktopPresets: [
      { name: 'エントリーPC (Ryzen 5 + RTX 4060)', loadWatts: 180 },
      { name: 'ミドルレンジPC (Ryzen 7 + RTX 4070 SUPER)', loadWatts: 350 },
      { name: 'ハイエンドPC (Ryzen 7 + RTX 5080)', loadWatts: 550 },
      { name: '最上位エンスージアスト (Intel i9 + RTX 5090)', loadWatts: 800 }
    ],
    laptopPresets: [
      { name: '薄型軽量 / 事務用 (MacBook Pro / Office)', loadWatts: 30 },
      { name: 'クリエイター向け (Dell XPS / Creator)', loadWatts: 85 },
      { name: '高性能ゲーミングノート (ASUS G14 / Blade)', loadWatts: 180 }
    ]
  },
  zh: {
    presetsHeading: '1. 硬件类型预设方案',
    desktopConfigLabel: '台式主机硬件配置',
    laptopConfigLabel: '笔记本电脑硬件配置',
    customPowerRating: '自定义功率输入',
    customLoadLabel: (w) => `自定义游戏满载功耗: ${w}W`,
    usageHeading: '2. 使用习惯与电价参数',
    heavyUsageLabel: '重度高负载 (大型游戏/渲染)',
    lightUsageLabel: '轻度日常 (网页办公/待机)',
    hrDaySuffix: '小时/天',
    electricityRateLabel: '当地用电单价',
    rateSuffix: '元/度',
    timelineLabel: '使用周期年限',
    yearsSuffix: '年',
    projectionsHeading: '3. 电费综合对比与收益预测',
    efficiencyVerdict: '能效与电费分析结论',
    verdictTitle: (better) => `选用 ${better === 'Desktop' ? '台式主机' : '笔记本电脑'} 更加省钱`,
    verdictDesc: (better, savingsYear, savingsTotal, years, lang) =>
      `通过选用 ${better === 'Desktop' ? '台式机' : '笔记本'}，您每年可节省电费约 ${formatCurrency(savingsYear, lang)}，在 ${years} 年的使用周期内累计可省下 ${formatCurrency(savingsTotal, lang)}。`,
    operatingDraw: '满载运行工作功耗',
    idleDraw: '日常待机/轻载功耗',
    annualConsumption: '全年累计用电度数',
    desktopCostTitle: (years) => `台式机 ${years} 年累计电费`,
    laptopCostTitle: (years) => `笔记本 ${years} 年累计电费`,
    desktopPresets: [
      { name: '入门电竞主机 (Ryzen 5 + RTX 4060)', loadWatts: 180 },
      { name: '主流甜点主机 (Ryzen 7 + RTX 4070 SUPER)', loadWatts: 350 },
      { name: '高端旗舰主机 (Ryzen 7 + RTX 5080)', loadWatts: 550 },
      { name: '顶配发烧主机 (Intel i9 + RTX 5090)', loadWatts: 800 }
    ],
    laptopPresets: [
      { name: '轻薄办公本 (MacBook Pro / Office)', loadWatts: 30 },
      { name: '全能创作本 (Dell XPS / 设计师款)', loadWatts: 85 },
      { name: '高端游戏本 (ASUS 幻14 / 潜行者)', loadWatts: 180 }
    ]
  }
};

export function getDesktopVsLaptopTranslations(lang: Locale): DesktopVsLaptopLabels {
  return DESKTOP_VS_LAPTOP_TRANSLATIONS[lang] || DESKTOP_VS_LAPTOP_TRANSLATIONS.en;
}
