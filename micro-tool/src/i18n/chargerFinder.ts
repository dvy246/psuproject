// ============================================================
// VoltForge / PSUCheck — USB-C Charger Finder Translations
// ============================================================

import type { Locale } from './index.ts';

export interface ChargerFinderTranslations {
  title: string;
  titleHighlight: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  brandHeading: (brand: string) => string;
  maxCharge: string;
  battery: string;
  sizingAnalysis: string;
}

export const CHARGER_FINDER_TRANSLATIONS: Record<Locale, ChargerFinderTranslations> = {
  en: {
    title: 'USB-C PD Charger',
    titleHighlight: 'Sizing Database',
    subtitle: 'Select your laptop model below to analyze its maximum USB-C charging profile, verify compatibility with 30W-140W chargers, and browse top-rated third-party GaN chargers.',
    metaTitle: 'USB-C Charger Finder for Laptops — Fast Charging Sizing (2026)',
    metaDescription: 'Find the best third-party GaN USB-C chargers for your laptop. Detailed sizing metrics for Apple MacBooks, Dell XPS, Lenovo ThinkPads, and gaming laptops.',
    brandHeading: (brand: string) => `${brand} Laptops`,
    maxCharge: 'Max',
    battery: 'Battery',
    sizingAnalysis: 'Sizing Analysis →',
  },
  de: {
    title: 'USB-C PD Ladegerät',
    titleHighlight: 'Kompatibilitäts-Datenbank',
    subtitle: 'Wählen Sie Ihr Laptop-Modell aus, um das maximale USB-C-Ladeprofil zu analysieren, die Kompatibilität mit 30W–140W Ladegeräten zu prüfen und erstklassige GaN-Netzteile zu finden.',
    metaTitle: 'USB-C Ladegerät-Finder für Laptops — Schnelllade-Dimensionierung (2026)',
    metaDescription: 'Finden Sie das beste GaN USB-C Ladegerät für Ihren Laptop. Genaue Ladeleistungen für Apple MacBook, Dell XPS, Lenovo ThinkPad und Gaming-Laptops.',
    brandHeading: (brand: string) => `${brand} Laptops`,
    maxCharge: 'Max',
    battery: 'Akku',
    sizingAnalysis: 'Lade-Analyse →',
  },
  es: {
    title: 'Cargadores USB-C PD',
    titleHighlight: 'Base de Datos de Compatibilidad',
    subtitle: 'Selecciona el modelo de tu portátil para analizar su perfil de carga máxima por USB-C, comprobar compatibilidad con cargadores de 30W a 140W y ver los mejores modelos GaN.',
    metaTitle: 'Buscador de Cargadores USB-C para Portátiles — Carga Rápida (2026)',
    metaDescription: 'Encuentra el mejor cargador GaN USB-C para tu portátil. Datos de potencia para Apple MacBook, Dell XPS, Lenovo ThinkPad y portátiles gaming.',
    brandHeading: (brand: string) => `Portátiles ${brand}`,
    maxCharge: 'Máx',
    battery: 'Batería',
    sizingAnalysis: 'Análisis de Carga →',
  },
  fr: {
    title: 'Chargeurs USB-C PD',
    titleHighlight: 'Base de Données de Compatibilité',
    subtitle: 'Sélectionnez votre modèle d\'ordinateur portable pour analyser sa puissance de charge maximale en USB-C, vérifier la compatibilité avec les chargeurs 30W-140W et trouver les meilleurs blocs GaN.',
    metaTitle: 'Guide Chargeurs USB-C pour PC Portables — Puissance & Charge Rapide (2026)',
    metaDescription: 'Trouvez le meilleur chargeur GaN USB-C pour votre ordinateur portable. Profils de charge pour Apple MacBook, Dell XPS, Lenovo ThinkPad et PC gaming.',
    brandHeading: (brand: string) => `Portables ${brand}`,
    maxCharge: 'Max',
    battery: 'Batterie',
    sizingAnalysis: 'Analyse de Charge →',
  },
  ja: {
    title: 'ノートPC用 USB-C PD充電器',
    titleHighlight: '適合・給電データベース',
    subtitle: 'お使いのノートPCを選択して、最大USB-C充電ワット数の判定、30W〜140W充電器との互換性検証、おすすめの高効率GaN（窒化ガリウム）充電器を確認できます。',
    metaTitle: 'ノートPC用 USB-C急速充電器 適合データベース (2026)',
    metaDescription: 'MacBook、Dell XPS、ThinkPad、ゲーミングノートPCに最適なUSB-C急速充電器（GaN）のワット数と給電規格を精密判定。',
    brandHeading: (brand: string) => `${brand} ノートPC`,
    maxCharge: '最大',
    battery: 'バッテリー',
    sizingAnalysis: '給電仕様を診断 →',
  },
  zh: {
    title: '笔记本 USB-C PD 充电器',
    titleHighlight: '功率与兼容性数据库',
    subtitle: '选择您的笔记本电脑型号，分析其最大 USB-C 充电功率协议，验证与 30W–140W 充电器的兼容性，并获取精选 GaN 氮化镓充电器推荐。',
    metaTitle: '笔记本 USB-C 氮化镓充电器匹配指南 (2026)',
    metaDescription: '为您的笔记本电脑匹配最佳 GaN USB-C 充电器。覆盖苹果 MacBook、戴尔 XPS、联想 ThinkPad 及游戏本的详细供电规格。',
    brandHeading: (brand: string) => `${brand} 笔记本`,
    maxCharge: '最大',
    battery: '电池',
    sizingAnalysis: '供电规格分析 →',
  },
};
