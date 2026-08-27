// ============================================================
// VoltForge / PSUCheck — Editorial Policy Translations
// ============================================================

import type { Locale } from './index.ts';

export interface EditorialPolicyTranslations {
  badge: string;
  metaDesc: string;
  lead: string;
  s1Title: string;
  s1P1: string;
  s1P2: string;
  s2Title: string;
  s2Lead: string;
  s2Items: {
    cpu: string;
    gpu: string;
    transient: string;
    atx: string;
    efficiency: string;
    tiers: string;
  };
  s3Title: string;
  s3P1: string;
  s3P2: string;
  s4Title: string;
  s4P1: string;
  s4P2: string;
}

export const EDITORIAL_POLICY_TRANSLATIONS: Record<Locale, EditorialPolicyTranslations> = {
  en: {
    badge: 'Editorial Standards',
    metaDesc: 'PSUCheck editorial standards: data sourcing methodology, correction policy, update frequency, and content review practices.',
    lead: 'PSUCheck is built by a team of PC hardware engineers and enthusiasts. This policy documents how we source data, review content, handle corrections, and maintain editorial independence.',
    s1Title: '1. Our Editorial Standards',
    s1P1: 'PSUCheck is an independent, unbiased website. We do not accept payment from hardware manufacturers for product placement, recommendations, or editorial coverage. Our content is driven by engineering accuracy and verifiable data, not commercial relationships.',
    s1P2: 'All calculator tools, guides, and comparison pages are produced by our team and reviewed for technical accuracy against published specifications from manufacturers and independent testing laboratories.',
    s2Title: '2. Data Sourcing Standards',
    s2Lead: 'Every specification used in PSUCheck is sourced from published, verifiable references:',
    s2Items: {
      cpu: 'Intel PL2 (Maximum Turbo Power) from Intel ARK. AMD TDP from AMD official specifications.',
      gpu: 'Total Board Power (TBP) from NVIDIA/AMD official product pages, cross-referenced with TechPowerUp GPU database.',
      transient: 'GPU and CPU transient scaling factors from Cybenetics PSU Lab published methodology.',
      atx: 'Transient tolerance standards from Intel ATX 3.1 Design Guide (2024 revision).',
      efficiency: '80 PLUS efficiency data from CLEAResult 80 PLUS certification program public records.',
      tiers: 'Based on Cultists Network PSU tier list cross-referenced with Cybenetics test results.',
    },
    s3Title: '3. Content Review & Update Frequency',
    s3P1: 'Our hardware databases are actively maintained and updated whenever new CPUs, GPUs, or power supplies launch.',
    s3P2: 'Guides and calculators undergo bi-monthly technical reviews to ensure formulas remain aligned with evolving ATX and PCIe standards.',
    s4Title: '4. Corrections and Accuracy Inquiries',
    s4P1: 'We are committed to total factual and engineering precision. If you spot a data discrepancy or formula error, our engineering team investigates and resolves verified inaccuracies promptly.',
    s4P2: 'Contact our editorial team directly at editorial@psucheck.com.',
  },
  de: {
    badge: 'Redaktionelle Standards',
    metaDesc: 'PSUCheck Redaktionsrichtlinien: Methodik der Datenerhebung, Fehlerkorrektur, Aktualisierungsfrequenz und redaktionelle Unabhängigkeit.',
    lead: 'PSUCheck wird von einem Team aus Hardware-Ingenieuren und PC-Enthusiasten betrieben. Diese Richtlinie dokumentiert, wie wir Daten erheben, Inhalte prüfen und redaktionelle Unabhängigkeit wahren.',
    s1Title: '1. Unsere redaktionellen Standards',
    s1P1: 'PSUCheck ist eine unabhängige Plattform. Wir akzeptieren keine Zahlungen von Hardware-Herstellern für Produktplatzierungen oder Empfehlungen. Unsere Inhalte basieren ausschließlich auf technischer Präzision und verifizierbaren Labordaten.',
    s1P2: 'Alle Rechner, Ratgeber und Vergleichsseiten werden von unserem Team entwickelt und anhand von Herstellerdatenblättern und unabhängigen Laborergebnissen geprüft.',
    s2Title: '2. Datenerhebung und Quellen',
    s2Lead: 'Alle in PSUCheck verwendeten Spezifikationen stammen aus offiziellen, überprüfbaren Quellen:',
    s2Items: {
      cpu: 'Intel PL2 (Max Turbo Power) aus Intel ARK; AMD TDP aus offiziellen AMD-Datenblättern.',
      gpu: 'Total Board Power (TBP) aus NVIDIA/AMD-Herstellerangaben, abgeglichen mit TechPowerUp.',
      transient: 'Transienten-Skalierungsfaktoren nach veröffentlichter Cybenetics-Testmethodik.',
      atx: 'Lastspitzen-Toleranzen gemäß Intel ATX 3.1 Design Guide (Revision 2024).',
      efficiency: '80 PLUS Effizienzkurven aus den Prüfberichten von CLEAResult.',
      tiers: 'Qualitätsstufen basierend auf der Cultists Network Tier-Liste und Cybenetics-Messwerten.',
    },
    s3Title: '3. Prüfung und Aktualisierungszyklus',
    s3P1: 'Unsere Datenbanken werden kontinuierlich gepflegt und bei jedem Hardware-Launch sofort aktualisiert.',
    s3P2: 'Alle Berechnungsformeln werden zweimonatlich überprüft, um stets den neuesten ATX- und PCIe-Spezifikationen zu entsprechen.',
    s4Title: '4. Fehlerkorrekturen und Feedback',
    s4P1: 'Sollten Sie eine Unstimmigkeit in unseren Daten oder Formeln feststellen, wird diese von unseren Ingenieuren unverzüglich geprüft und korrigiert.',
    s4P2: 'Erreichen Sie unser Redaktionsteam direkt unter editorial@psucheck.com.',
  },
  es: {
    badge: 'Estándares Editoriales',
    metaDesc: 'Normas editoriales de PSUCheck: metodología de fuentes de datos, política de correcciones, frecuencia de actualización e independencia editorial.',
    lead: 'PSUCheck ha sido creado por ingenieros y apasionados del hardware de PC. Este documento detalla cómo obtenemos los datos, revisamos el contenido y mantenemos nuestra total independencia editorial.',
    s1Title: '1. Nuestros Estándares Editoriales',
    s1P1: 'PSUCheck es un sitio web independiente e imparcial. No aceptamos pagos de fabricantes de hardware por colocar productos o recomendaciones. Nuestro contenido se basa en la precisión técnica y datos contrastables.',
    s1P2: 'Todas las calculadoras, guías y comparativas son elaboradas por nuestro equipo técnico y contrastadas con especificaciones oficiales y análisis independientes de laboratorio.',
    s2Title: '2. Fuentes de Datos y Metodología',
    s2Lead: 'Cada dato técnico utilizado en PSUCheck procede de fuentes públicas y contrastables:',
    s2Items: {
      cpu: 'Intel PL2 (Turbo Power) de Intel ARK; TDP de especificaciones oficiales de AMD.',
      gpu: 'Total Board Power (TBP) de NVIDIA/AMD, cruzado con bases de datos de TechPowerUp.',
      transient: 'Factores de picos transitorios según la metodología publicada de Cybenetics.',
      atx: 'Estándares de tolerancia transitoria según la Guía de Diseño Intel ATX 3.1 (2024).',
      efficiency: 'Curvas de eficiencia 80 PLUS obtenidas de los registros públicos de CLEAResult.',
      tiers: 'Niveles de calidad basados en la Tier List de Cultists Network y análisis de Cybenetics.',
    },
    s3Title: '3. Frecuencia de Revisión y Actualización',
    s3P1: 'Nuestra base de datos de componentes se actualiza de forma inmediata con el lanzamiento de cada nuevo procesador, tarjeta gráfica o fuente.',
    s3P2: 'Las fórmulas de cálculo se auditan bimestralmente para garantizar su adecuación a los estándares ATX y PCIe en evolución.',
    s4Title: '4. Correcciones y Contacto Editorial',
    s4P1: 'Si detectas cualquier discrepancia técnica o error en los datos, nuestro equipo de ingeniería lo investigará y corregirá a la mayor brevedad.',
    s4P2: 'Escríbenos directamente a editorial@psucheck.com.',
  },
  fr: {
    badge: 'Normes Éditoriales',
    metaDesc: 'Normes éditoriales de PSUCheck : méthodologie de collecte des données, politique de correction, fréquence des mises à jour et indépendance.',
    lead: 'PSUCheck est développé par une équipe d\'ingénieurs et d\'experts en matériel informatique. Cette charte explique comment nous collectons nos données, vérifions nos contenus et préservons notre indépendance.',
    s1Title: '1. Nos Principes Éditoriaux',
    s1P1: 'PSUCheck est un média indépendant et impartial. Nous ne percevons aucune rémunération de la part des constructeurs pour recommander des produits. Notre contenu repose uniquement sur la rigueur d\'ingénierie et des mesures vérifiables.',
    s1P2: 'Tous nos outils de calcul, guides et comparatifs sont rédigés par notre équipe et validés face aux fiches techniques constructeurs et aux tests de laboratoires tiers.',
    s2Title: '2. Sources et Fiabilité des Données',
    s2Lead: 'Chaque caractéristique technique intégrée dans nos outils provient de sources officielles vérifiables :',
    s2Items: {
      cpu: 'Intel PL2 (Maximum Turbo Power) depuis Intel ARK ; TDP officiel AMD.',
      gpu: 'Total Board Power (TBP) depuis NVIDIA/AMD, recoupé avec la base TechPowerUp.',
      transient: 'Multiplicateurs de transitoires issus de la méthodologie officielle Cybenetics.',
      atx: 'Tolérances aux pics de puissance conformes au guide de conception Intel ATX 3.1 (2024).',
      efficiency: 'Courbes de rendement 80 PLUS issues des rapports publics CLEAResult.',
      tiers: 'Classements de qualité issus de la Tier List Cultists Network et des mesures Cybenetics.',
    },
    s3Title: '3. Fréquence des Mises à Jour',
    s3P1: 'Nos bases de données matérielles sont enrichies dès la sortie officielle de nouveaux processeurs, cartes graphiques ou alimentations.',
    s3P2: 'Nos algorithmes de calcul font l\'objet d\'une revue bimensuelle pour rester en phase avec les normes ATX et PCIe.',
    s4Title: '4. Signalement d\'Erreurs et Contact',
    s4P1: 'Nous attachons une importance primordiale à l\'exactitude des calculs. Si vous relevez une anomalie, notre équipe technique procède immédiatement à sa vérification.',
    s4P2: 'Contactez notre rédaction à l\'adresse editorial@psucheck.com.',
  },
  ja: {
    badge: '編集方針・データ基準',
    metaDesc: 'PSUCheckの編集基準：ハードウェアデータの算出根拠、訂正方針、更新頻度、技術的独立性についての指針。',
    lead: 'PSUCheckは、PCハードウェアエンジニアと自作PC専門家によって運営されています。本ページでは、データの算出方法、記事の検証プロセス、訂正対応、編集の公平性について明記します。',
    s1Title: '1. 編集基準と公平性の原則',
    s1P1: 'PSUCheckは完全な中立性と独立性を維持しています。特定のメーカーからの有償掲載や偏った推薦は一切行いません。すべての算出結果とおすすめ選定は、工学的根拠と客観的な実測データに基づいています。',
    s1P2: 'すべての計算ツール、解説ガイド、比較データは当サイトのエンジニアが制作し、各メーカーの公式仕様書および独立機関の測定値と照合して正確性を確認しています。',
    s2Title: '2. データ引用元と算出基準',
    s2Lead: 'PSUCheckで使用されているすべての仕様値は、公開された検証可能な出典に基づいています：',
    s2Items: {
      cpu: 'Intel ARKのPL2（最大ターボ電力）およびAMD公式仕様のTDP値。',
      gpu: 'NVIDIA / AMD公式のTBP（総ボード電力）およびTechPowerUpデータベースとの照合値。',
      transient: 'Cybenetics PSUラボが公表している瞬時スパイク計測プロトコル。',
      atx: 'Intel ATX 3.1 デザインガイド（2024年改訂版）の過渡負荷耐性基準。',
      efficiency: 'CLEAResultの80 PLUS公式認定テストレポートに基づく電力変換効率曲線。',
      tiers: 'Cultists Network PSU Tier表およびCybenetics測定結果に基づく総合品質判定。',
    },
    s3Title: '3. 検証プロセスと更新頻度',
    s3P1: '新型CPU・GPU・電源ユニットの発売に合わせて、ハードウェアデータベースを随時更新・拡充しています。',
    s3P2: '最新のATXおよびPCIe給電規格の動向を反映するため、計算アルゴリズムは隔月で定期見直しを実施しています。',
    s4Title: '4. 訂正方針と問い合わせ',
    s4P1: '掲載データや計算ロジックに誤りや変更点が発見された場合、エンジニアチームが速やかに再検証を行い、迅速に修正いたします。',
    s4P2: '編集チームへのご連絡は editorial@psucheck.com までお寄せください。',
  },
  zh: {
    badge: '编辑标准与数据准则',
    metaDesc: 'PSUCheck 编辑政策：硬件数据采纳标准、勘误流程、更新周期与技术独立性准则。',
    lead: 'PSUCheck 由硬件工程师与 DIY 电脑资深爱好者共同创建与维护。本准则详细阐述了我们如何采集数据、审核内容、勘误纠错并始终保持编辑独立性。',
    s1Title: '1. 我们的编辑原则',
    s1P1: 'PSUCheck 坚持中立与客观。我们不接受任何硬件厂商的付费植入、商业推荐或赞助排名。所有内容与工具推荐完全基于严谨的工程测算与可验证的客观数据。',
    s1P2: '所有计算工具、装机指南与对比页面均由工程团队制作，并严格比对厂商技术白皮书及独立实验室实测报告。',
    s2Title: '2. 数据来源与测算标准',
    s2Lead: 'PSUCheck 中引用的每一项硬件规格均来自公开、权威的基准数据：',
    s2Items: {
      cpu: 'Intel ARK 官方 PL2（最大睿频功耗）及 AMD 官方 TDP 标称值。',
      gpu: 'NVIDIA / AMD 官方 TBP（整卡功耗），并与 TechPowerUp 显卡数据库交叉核验。',
      transient: '源自 Cybenetics 实验室公开发布的显卡/处理器瞬态尖峰倍率测试法。',
      atx: '严格遵循英特尔 Intel ATX 3.1 设计规范（2024版）的瞬态过载容忍要求。',
      efficiency: '基于 CLEAResult 80 PLUS 认证机构公开发布的各负载点能效曲线。',
      tiers: '综合参考 Cultists Network 电源天梯榜与 Cybenetics 实验室评分。',
    },
    s3Title: '3. 内容审核与更新周期',
    s3P1: '硬件数据库与新品发布保持同步更新，第一时间录入全新上市的处理器、显卡与电源型号。',
    s3P2: '每双月对计算核心与功耗模型进行工程复核，确保全面契合最新的供电标准。',
    s4Title: '4. 勘误机制与技术反馈',
    s4P1: '我们追求极致的数据精确度。若您在页面中发现任何参数差异或计算疑点，我们的工程团队将在核实后第一时间更新修正。',
    s4P2: '编辑团队直接联络邮箱：editorial@psucheck.com。',
  },
};
