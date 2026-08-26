import type { Locale } from './locales';
import { GUIDE_TRANSLATIONS } from './guides';

export interface GuideSection {
  id: string;
  title: string;
  paragraphs: string[];
}

export interface GuideFaq {
  question: string;
  answer: string;
}

export interface LocalizedGuideArticle {
  slug: string;
  title: string;
  description: string;
  readTime: string;
  updatedDate: string;
  sections: GuideSection[];
  faqs: GuideFaq[];
  relatedTool?: {
    name: string;
    href: string;
    description: string;
  };
}

// Common UI labels for guide layout
export const GUIDE_UI_LABELS: Record<Locale, {
  methodologyVerified: string;
  updatedPrefix: string;
  faqHeading: string;
  relatedToolsHeading: string;
  tocHeading: string;
  backToGuides: string;
  defaultReadTime: string;
  defaultDate: string;
}> = {
  en: {
    methodologyVerified: '✓ Sizing Methodology Verified',
    updatedPrefix: 'Updated:',
    faqHeading: 'Frequently Asked Questions (FAQ)',
    relatedToolsHeading: 'Related Hardware Tools',
    tocHeading: 'Table of Contents',
    backToGuides: '← Back to All Guides',
    defaultReadTime: '6 min read',
    defaultDate: 'July 14, 2026'
  },
  de: {
    methodologyVerified: '✓ Sizing-Methodik verifiziert',
    updatedPrefix: 'Aktualisiert:',
    faqHeading: 'Häufig gestellte Fragen (FAQ)',
    relatedToolsHeading: 'Passende Hardware-Tools',
    tocHeading: 'Inhaltsverzeichnis',
    backToGuides: '← Zurück zur Übersicht',
    defaultReadTime: '6 Min. Lesezeit',
    defaultDate: '14. Juli 2026'
  },
  es: {
    methodologyVerified: '✓ Metodología de dimensionamiento verificada',
    updatedPrefix: 'Actualizado:',
    faqHeading: 'Preguntas Frecuentes (FAQ)',
    relatedToolsHeading: 'Herramientas Recomendadas',
    tocHeading: 'Índice de Contenidos',
    backToGuides: '← Volver a todas las guías',
    defaultReadTime: '6 min de lectura',
    defaultDate: '14 de julio de 2026'
  },
  fr: {
    methodologyVerified: '✓ Méthodologie certifiée',
    updatedPrefix: 'Mis à jour :',
    faqHeading: 'Foire Aux Questions (FAQ)',
    relatedToolsHeading: 'Outils Recommandés',
    tocHeading: 'Table des Matières',
    backToGuides: '← Retour à tous les guides',
    defaultReadTime: '6 min de lecture',
    defaultDate: '14 juillet 2026'
  },
  ja: {
    methodologyVerified: '✓ 計算手法検証済み',
    updatedPrefix: '更新日:',
    faqHeading: 'よくある質問（FAQ）',
    relatedToolsHeading: '関連ハードウェアツール',
    tocHeading: '目次',
    backToGuides: '← ガイド一覧に戻る',
    defaultReadTime: '読了目安 6分',
    defaultDate: '2026年7月14日'
  },
  zh: {
    methodologyVerified: '✓ 硬件计算模型已校验',
    updatedPrefix: '更新时间:',
    faqHeading: '常见问题解答 (FAQ)',
    relatedToolsHeading: '相关硬件计算工具',
    tocHeading: '文章目录',
    backToGuides: '← 返回所有技术指南',
    defaultReadTime: '预计阅读时间 6分钟',
    defaultDate: '2026年7月14日'
  }
};

const TEMPLATE_PARAGRAPHS: Record<Locale, {
  s1Title: string;
  s1P1: (title: string, desc: string) => string;
  s1P2: string;
  s2Title: string;
  s2P1: string;
  s2P2: string;
  s3Title: string;
  s3P1: string;
  s3P2: string;
  s4Title: string;
  s4P1: string;
  faq1Q: string;
  faq1A: string;
  faq2Q: string;
  faq2A: string;
}> = {
  en: {
    s1Title: '1. Overview & Sizing Fundamentals',
    s1P1: (title, desc) => `${title} is critical for optimal PC performance and stability. ${desc}`,
    s1P2: 'Understanding component power demands, transient current spikes, and efficiency certifications ensures long-term system stability without wasting budget on unnecessary capacity.',
    s2Title: '2. Technical Analysis & Power Delivery',
    s2P1: 'Modern CPUs and graphics cards draw power dynamically, fluctuating rapidly based on workload intensity. Sub-millisecond transient excursions can spike significantly above rated TDP.',
    s2P2: 'Adhering to Intel ATX 3.1 and Cybenetics power standards guarantees that the power supply can buffer these high-frequency load transitions smoothly without tripping over-current protection.',
    s3Title: '3. Engineering Best Practices & Safety',
    s3P1: 'Always allocate a minimum 15% to 20% safety headroom above peak calculated load to account for thermal degradation and capacitor aging over multiple years of operation.',
    s3P2: 'Ensure all modular cables are certified for your specific PSU model to prevent cross-pin electrical shorts and thermal melting at high currents.',
    s4Title: '4. Summary & Verdict',
    s4P1: 'Selecting hardware with proper power headroom and validated safety certifications delivers quiet acoustics, maximum electrical efficiency, and dependable long-term reliability.',
    faq1Q: 'Why is safety headroom important for power supplies?',
    faq1A: 'Safety headroom keeps the PSU running in its optimal 50% efficiency window, lowers fan acoustic noise, and buffers against microsecond transient current spikes.',
    faq2Q: 'Does a higher wattage PSU consume more electricity?',
    faq2A: 'No. The PSU only draws the exact wattage demanded by your active components plus small conversion losses.'
  },
  de: {
    s1Title: '1. Übersicht & Technische Grundlagen',
    s1P1: (title, desc) => `${title} ist entscheidend für maximale Systemstabilität und Effizienz. ${desc}`,
    s1P2: 'Das präzise Verständnis von Lastzuständen, Transienten-Spitzen und Wirkungsgradklassen verhindert Abstürze und schützt wertvolle Hardware-Komponenten vor vorzeitiger Alterung.',
    s2Title: '2. Technische Analyse & Stromversorgung',
    s2P1: 'Moderne Prozessoren und High-End-Grafikkarten fordern dynamische Lastströme an. Mikrosekundenschnelle Transienten können die Nennleistung für Sekundenbruchteile um das 1,5- bis 2-fache übersteigen.',
    s2P2: 'Netzteile nach ATX 3.1 und Cybenetics-Standards sind speziell dafür ausgelegt, solche Stromspitzen ohne Spannungsabfall oder OCP-Notabschaltung stabil abzufedern.',
    s3Title: '3. Sicherheitsstandards & Praxistipps',
    s3P1: 'Planen Sie stets einen Sicherheitspuffer von 15% bis 20% über der Spitzenlast ein, um Kondensator-Alterung und thermischen Verschleiß über mehrere Betriebsjahre auszugleichen.',
    s3P2: 'Verwenden Sie ausschließlich original zertifizierte modulare Kabel für Ihr spezifisches Netzteilmodell, um Kurzschlüsse durch abweichende Pin-Belegungen zu vermeiden.',
    s4Title: '4. Fazit & Kaufberatung',
    s4P1: 'Ein hochwertiges, zertifiziertes Netzteil mit passenden Leistungsreserven sorgt für leisen Betrieb, beste Energieeffizienz und höchste Ausfallsicherheit.',
    faq1Q: 'Warum ist ein Leistungspuffer beim Netzteil unverzichtbar?',
    faq1A: 'Ein Puffer hält das Netzteil im effizienten 50%-Bereich, verringert die Lüfterlautstärke und federt plötzliche Lastspitzen moderner Grafikkarten sicher ab.',
    faq2Q: 'Verbraucht ein stärkeres Netzteil dauerhaft mehr Strom?',
    faq2A: 'Nein. Das Netzteil zieht nur die Leistung aus der Steckdose, die Ihre PC-Komponenten im jeweiligen Moment tatsächlich benötigen.'
  },
  es: {
    s1Title: '1. Visión General y Fundamentos',
    s1P1: (title, desc) => `${title} es fundamental para garantizar estabilidad y rendimiento. ${desc}`,
    s1P2: 'Comprender los requerimientos de consumo, picos transitorios y niveles de certificación evita reinicios inesperados y optimiza la inversión en hardware.',
    s2Title: '2. Análisis Técnico y Entrega de Energía',
    s2P1: 'Los procesadores y tarjetas gráficas modernas demandan energía de forma altamente dinámica, generando picos de microsegundos muy superiores al TDP oficial.',
    s2P2: 'El cumplimiento de los estándares ATX 3.1 y certificaciones Cybenetics asegura que la fuente absorba estas variaciones sin activar protecciones OCP de forma prematura.',
    s3Title: '3. Normas de Seguridad y Buenas Prácticas',
    s3P1: 'Recomendamos mantener un margen de seguridad de al menos un 15% a 20% para compensar la degradación térmica natural de los condensadores a lo largo de los años.',
    s3P2: 'Nunca intercambie cables modulares entre diferentes marcas o modelos para evitar cortocircuitos por diferencias en la distribución de pines.',
    s4Title: '4. Veredicto y Conclusiones',
    s4P1: 'Invertir en una fuente de calidad con suficiente margen asegura un funcionamiento silencioso, alta eficiencia y protección a largo plazo.',
    faq1Q: '¿Por qué es necesario un margen de seguridad en la fuente?',
    faq1A: 'El margen sitúa a la fuente en su zona de máxima eficiencia (cercana al 50% de carga), reduce el ruido del ventilador y absorbe picos de corriente.',
    faq2Q: '¿Una fuente de mayor potencia consume más electricidad?',
    faq2A: 'No. La fuente solo consume de la red eléctrica los vatios exactos que sus componentes demandan en cada instante.'
  },
  fr: {
    s1Title: '1. Vue d\'Ensemble & Principes Fondamentaux',
    s1P1: (title, desc) => `${title} est indispensable pour assurer la fiabilité et le rendement de votre PC. ${desc}`,
    s1P2: 'La maîtrise de la consommation réelle, des pointes transitoires et des normes électriques évite les pannes et protège vos composants haut de gamme.',
    s2Title: '2. Analyse Technique & Alimentation Électrique',
    s2P1: 'Les processeurs et cartes graphiques modernes génèrent de fortes fluctuations de courant en quelques microsecondes, dépassant largement le TDP de référence.',
    s2P2: 'Les normes ATX 3.1 et labels Cybenetics garantissent que l\'alimentation encaisse ces excursions de puissance sans coupure intempestive du système.',
    s3Title: '3. Recommandations de Sécurité & Bonnes Pratiques',
    s3P1: 'Prévoyez toujours une réserve de sécurité de 15% à 20% au-dessus de la charge maximale pour compenser le vieillissement thermique des condensateurs.',
    s3P2: 'N\'utilisez que les câbles modulaires certifiés d\'origine pour éviter tout risque de court-circuit lié à des schémas de brochage incompatibles.',
    s4Title: '4. Bilan & Recommandations',
    s4P1: 'Une alimentation certifiée de qualité supérieure offre un fonctionnement silencieux, un rendement optimal et une excellente longévité.',
    faq1Q: 'Pourquoi prévoir une marge de puissance sur son alimentation ?',
    faq1A: 'Cette marge permet de travailler dans la zone de rendement optimal (autour de 50%), limite le bruit du ventilateur et absorbe les pics transitoires.',
    faq2Q: 'Une alimentation plus puissante consomme-t-elle plus d\'électricité ?',
    faq2A: 'Non. L\'alimentation ne puise sur le secteur que les watts réclamés par les composants à l\'instant T.'
  },
  ja: {
    s1Title: '1. 概要と適正電源設計の基礎',
    s1P1: (title, desc) => `「${title}」は自作PCの安定性と長寿命化において極めて重要な要素です。${desc}`,
    s1P2: 'パーツごとの正確な消費電力、瞬時過渡スパイク、変換効率規格を理解することで、過不足のない最適な電源ユニット選びが可能になります。',
    s2Title: '2. 技術的分析と給電品質',
    s2P1: '最新のCPUおよびハイエンドグラフィックボードは負荷に応じて急激な電力変動を起こし、瞬間的に定格TDPを大幅に上回るスパイクが発生します。',
    s2P2: 'ATX 3.1規格やCybenetics認証を満たした電源は、これらの高周波スパイクを安全に吸収し、過電流保護（OCP）による不意の遮断を防ぎます。',
    s3Title: '3. 安全基準と配線の注意点',
    s3P1: '電解コンデンサの経年劣化による容量低下を考慮し、計算されたピーク負荷に対して常に15％〜20％の安全マージンを確保することを推奨します。',
    s3P2: 'メーカーやモデルが異なるプラグインケーブルはピンアサインが異なるため、絶対に混用しないでください。',
    s4Title: '4. 結論と選定のポイント',
    s4P1: '適切なマージンを備えた高品質電源を選ぶことで、静音性、優れた省電力性、長期的な安心動作が手に入ります。',
    faq1Q: '電源容量に安全マージンが必要な理由は何ですか？',
    faq1A: '電源の変換効率が最も高くなる50％負荷付近を維持でき、ファンの静音化や急激な突入スパイクへの耐性が得られるためです。',
    faq2Q: '大容量の電源を使うと電気代が高くなりますか？',
    faq2A: 'いいえ、電源はパーツが実際に要求する電力分しか消費しないため、電気代が高くなることはありません。'
  },
  zh: {
    s1Title: '1. 概述与供电选型核心原则',
    s1P1: (title, desc) => `《${title}》对于保障电脑硬件系统的稳定运行和安全至关重要。${desc}`,
    s1P2: '准确掌握各硬件在不同负载下的实际功耗、微秒级瞬态尖峰以及能效标准，能够有效杜绝突然断电黑屏并避免不必要的预算浪费。',
    s2Title: '2. 深度技术解析与供电架构',
    s2P1: '现代高性能CPU和显卡在运行大型游戏或生产力渲染时，供电需求呈现极高的动态变化，瞬时功耗可达标称TDP的1.5倍至2倍。',
    s2P2: '符合ATX 3.1规范与Cybenetics严苛测试标准的电源具备强劲的瞬态抗扰度，能够平稳吸收高频浪涌电流而不触发过流保护(OCP)。',
    s3Title: '3. 工程安全规范与避坑要点',
    s3P1: '建议在整机峰值功耗基础上预留15%至20%的安全冗余，以抵消电解电容在多年高热运行下的自然衰减。',
    s3P2: '严禁混用不同品牌甚至同品牌不同型号的模组线，线序定义差异极易造成硬件短路烧毁。',
    s4Title: '4. 总结与选购建议',
    s4P1: '选择具有充足安全余量、通过权威认证的高品质电源，能够兼顾静音体验、高转换效率与长久的使用寿命。',
    faq1Q: '为什么必须预留电源安全余量？',
    faq1A: '安全余量可使电源工作在50%左右的最佳转换效率区间，大幅降低风扇噪音并从容应对显卡微秒级瞬态峰值。',
    faq2Q: '高瓦数电源会更耗电吗？',
    faq2A: '不会。电源输出功率取决于电脑内部硬件实际消耗的电量，额定功率大不会增加电费支出。'
  }
};

export function getLocalizedGuideArticle(slug: string, lang: Locale): LocalizedGuideArticle {
  const ui = GUIDE_UI_LABELS[lang] || GUIDE_UI_LABELS.en;
  const hubData = GUIDE_TRANSLATIONS[lang] || GUIDE_TRANSLATIONS.en;
  const tpl = TEMPLATE_PARAGRAPHS[lang] || TEMPLATE_PARAGRAPHS.en;

  let matchedLink = null;
  for (const cat of hubData.categories) {
    const found = cat.links.find(l => l.href.endsWith(`/${slug}`));
    if (found) {
      matchedLink = found;
      break;
    }
  }

  const title = matchedLink?.name || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const desc = matchedLink?.desc || hubData.pageSubtitle;

  return {
    slug,
    title,
    description: desc,
    readTime: ui.defaultReadTime,
    updatedDate: ui.defaultDate,
    sections: [
      {
        id: 'overview',
        title: tpl.s1Title,
        paragraphs: [
          tpl.s1P1(title, desc),
          tpl.s1P2
        ]
      },
      {
        id: 'technical-analysis',
        title: tpl.s2Title,
        paragraphs: [
          tpl.s2P1,
          tpl.s2P2
        ]
      },
      {
        id: 'safety-and-standards',
        title: tpl.s3Title,
        paragraphs: [
          tpl.s3P1,
          tpl.s3P2
        ]
      },
      {
        id: 'verdict',
        title: tpl.s4Title,
        paragraphs: [
          tpl.s4P1
        ]
      }
    ],
    faqs: [
      {
        question: tpl.faq1Q,
        answer: tpl.faq1A
      },
      {
        question: tpl.faq2Q,
        answer: tpl.faq2A
      }
    ]
  };
}
