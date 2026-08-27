// ============================================================
// VoltForge / PSUCheck — PSU Finder (GPU Matchmaker) Translations
// ============================================================

import type { Locale } from './index.ts';

export interface PsuFinderTranslations {
  title: string;
  titleHighlight: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  tierLabels: {
    halo: string;
    ultra: string;
    high: string;
    mid: string;
    budget: string;
  };
  transientMultiplier: string;
  recommendedMin: string;
  viewPairings: string;
}

export const PSU_FINDER_TRANSLATIONS: Record<Locale, PsuFinderTranslations> = {
  en: {
    title: 'Best PSU for',
    titleHighlight: 'Every Graphics Card',
    subtitle: 'Select your GPU below for curated, transient-safe power supply recommendations. Every pairing accounts for sub-millisecond power excursions, 12V-2x6 cable safety, and 5-year operating efficiency.',
    metaTitle: 'Best PSU for GPU — Power Supply Sizing Matchmaker (2026)',
    metaDescription: 'Find the best power supply for your graphics card. Transient-aware PSU recommendations for NVIDIA RTX 5090, RTX 5080, RTX 4090, AMD RX 7900 XTX, and more.',
    tierLabels: {
      halo: 'Halo & Flagship Tier (500W+ Spikes)',
      ultra: 'Enthusiast / Ultra Tier (350W–500W Spikes)',
      high: 'High-End Gaming (250W–350W Spikes)',
      mid: 'Mid-Range Gaming (150W–250W Spikes)',
      budget: 'Budget / Entry Tier (<150W Spikes)',
    },
    transientMultiplier: 'Transient Multiplier:',
    recommendedMin: 'Recommended Minimum:',
    viewPairings: 'View PSU Pairings',
  },
  de: {
    title: 'Bestes Netzteil für',
    titleHighlight: 'jede Grafikkarte',
    subtitle: 'Wählen Sie Ihre GPU aus, um Spitzenlast-sichere Netzteil-Empfehlungen zu erhalten. Jede Kombination berücksichtigt sub-millisekundengenaue Transienten, 12V-2x6 Kabelsicherheit und 5-Jahres-Effizienz.',
    metaTitle: 'Netzteil-Finder für Grafikkarten — GPU PSU Matchmaker (2026)',
    metaDescription: 'Finden Sie das perfekte PC-Netzteil für Ihre Grafikkarte. Transienten-geprüfte Empfehlungen für RTX 5090, RTX 5080, RTX 4090, RX 7900 XTX und mehr.',
    tierLabels: {
      halo: 'Halo & Flaggschiff-Klasse (500W+ Lastspitzen)',
      ultra: 'Enthusiast / Ultra-Klasse (350W–500W Lastspitzen)',
      high: 'High-End Gaming (250W–350W Lastspitzen)',
      mid: 'Mittelklasse Gaming (150W–250W Lastspitzen)',
      budget: 'Budget / Einsteiger-Klasse (<150W Lastspitzen)',
    },
    transientMultiplier: 'Spitzenlast-Multiplikator:',
    recommendedMin: 'Empfohlene Mindestleistung:',
    viewPairings: 'Netzteil-Empfehlungen ansehen',
  },
  es: {
    title: 'La mejor fuente de alimentación para',
    titleHighlight: 'cada tarjeta gráfica',
    subtitle: 'Selecciona tu GPU para obtener recomendaciones de fuentes de poder adaptadas a picos transitorios, seguridad de conectores 12V-2x6 y coste eléctrico a 5 años.',
    metaTitle: 'Buscador de Fuentes de Poder para GPU — Calculadora PSU (2026)',
    metaDescription: 'Encuentra la fuente de alimentación ideal para tu gráfica. Recomendaciones con análisis de picos para RTX 5090, RTX 5080, RTX 4090, RX 7900 XTX y más.',
    tierLabels: {
      halo: 'Gama Flagship / Extrema (Picos +500W)',
      ultra: 'Gama Entusiasta / Ultra (Picos 350W–500W)',
      high: 'Gama Alta Gaming (Picos 250W–350W)',
      mid: 'Gama Media Gaming (Picos 150W–250W)',
      budget: 'Gama Entrada / Económica (Picos <150W)',
    },
    transientMultiplier: 'Multiplicador de Transitorios:',
    recommendedMin: 'Mínimo Recomendado:',
    viewPairings: 'Ver Fuentes Compatibles',
  },
  fr: {
    title: 'La meilleure alimentation pour',
    titleHighlight: 'chaque carte graphique',
    subtitle: 'Sélectionnez votre GPU ci-dessous pour découvrir nos recommandations d\'alimentations sécurisées contre les pics transitoires, conformes aux connecteurs 12V-2x6 et optimisées pour le TCO sur 5 ans.',
    metaTitle: 'Guide d\'Alimentation pour Cartes Graphiques — Matchmaker PSU (2026)',
    metaDescription: 'Trouvez l\'alimentation idéale pour votre carte graphique. Recommandations avec analyse des pics de puissance pour RTX 5090, RTX 5080, RTX 4090, RX 7900 XTX et plus.',
    tierLabels: {
      halo: 'Gamme Flagship / Halo (Pics > 500W)',
      ultra: 'Gamme Enthousiaste / Ultra (Pics 350W–500W)',
      high: 'Haut de Gamme Gaming (Pics 250W–350W)',
      mid: 'Milieu de Gamme Gaming (Pics 150W–250W)',
      budget: 'Entrée de Gamme / Budget (Pics < 150W)',
    },
    transientMultiplier: 'Multiplicateur Transitoire :',
    recommendedMin: 'Minimum Recommandé :',
    viewPairings: 'Voir les Alimentations Compatibles',
  },
  ja: {
    title: '全グラフィックボード対応',
    titleHighlight: '電源ユニット適合データベース',
    subtitle: 'お使いのグラフィックボード（GPU）を選択して、瞬時電力スパイクや12V-2x6コネクタ安全基準、5年間の電気代TCOを考慮した最適な電源ユニット（PSU）の推奨構成を確認できます。',
    metaTitle: 'グラボ別おすすめ電源ユニット (PSU) 適合表 — 2026年最新GPU対応',
    metaDescription: 'RTX 5090、RTX 5080、RTX 4090、RX 7900 XTXなど最新GPUに最適な電源ユニット容量とおすすめモデルを瞬時過渡スパイク電力に基づいて精密判定。',
    tierLabels: {
      halo: 'フラッグシップ・最上位クラス (瞬時スパイク 500W以上)',
      ultra: 'ウルトラ・エンスージアスト (瞬時スパイク 350W〜500W)',
      high: 'ハイエンド・ゲーミング (瞬時スパイク 250W〜350W)',
      mid: 'ミドルレンジ・ゲーミング (瞬時スパイク 150W〜250W)',
      budget: 'エントリー・予算重視クラス (瞬時スパイク 150W未満)',
    },
    transientMultiplier: '瞬時スパイク倍率:',
    recommendedMin: '推奨最小電源容量:',
    viewPairings: '適合電源・推奨ペアリングを見る',
  },
  zh: {
    title: '全显卡电源选型与',
    titleHighlight: '匹配数据库',
    subtitle: '在下方选择您的显卡型号，获取基于实验室瞬态尖峰测算、12V-2x6 防烧接口规范与 5 年电费 TCO 优化的权威电源选型方案。',
    metaTitle: '显卡配电源选型指南 — 全系列显卡电源匹配表 (2026)',
    metaDescription: '为您的显卡精准匹配最佳电源。全面涵盖 NVIDIA RTX 5090、RTX 5080、RTX 4090、AMD RX 7900 XTX 等热门型号的瞬态功耗与额定瓦数推荐。',
    tierLabels: {
      halo: '旗舰巅峰级 (微秒尖峰 500W+)',
      ultra: '发烧极客级 (微秒尖峰 350W–500W)',
      high: '高端游戏级 (微秒尖峰 250W–350W)',
      mid: '主流甜品级 (微秒尖峰 150W–250W)',
      budget: '入门与性价比级 (微秒尖峰 <150W)',
    },
    transientMultiplier: '瞬态尖峰倍率:',
    recommendedMin: '建议最低额定功率:',
    viewPairings: '查看电源推荐方案',
  },
};
