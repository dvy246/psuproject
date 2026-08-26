import type { Locale } from './locales';

export interface CableCompatibilityLabels {
  title: string;
  subtitle: string;
  sourceLabel: string;
  targetLabel: string;
  passTitle: string;
  warnTitle: (brand: string) => string;
  failTitle: string;
  passIdenticalDetails: (name: string) => string;
  passStandardDetails: (standard: string) => string;
  warnDetails: (brand: string, sStandard: string, tStandard: string) => string;
  failDetails: (sName: string, sBrand: string, tName: string, tBrand: string) => string;
  ruleTitle: string;
  whyDifferTitle: string;
  whyDifferP1: string;
  whyDifferP2: string;
}

export const CABLE_COMPATIBILITY_TRANSLATIONS: Record<Locale, CableCompatibilityLabels> = {
  en: {
    title: 'Compare PSU Modular Cables',
    subtitle: 'Verify if you can safely reuse your existing modular PCIe, EPS, or SATA cables.',
    sourceLabel: 'Source PSU (Cables you want to reuse)',
    targetLabel: 'Target PSU (PSU you are upgrading to)',
    passTitle: 'Fully Compatible',
    warnTitle: (brand) => `Partial Compatibility / Risk (${brand} Brand)`,
    failTitle: 'DANGEROUS — INCOMPATIBLE',
    passIdenticalDetails: (name) => `Both power supplies are the exact same model (${name}). You can safely reuse and swap modular cables between them.`,
    passStandardDetails: (standard) => `Yes! Both units share the identical '${standard}' modular pinout standard. Modular cables for PCIe, EPS, and SATA are fully interchangeable between these models.`,
    warnDetails: (brand, sStandard, tStandard) => `Caution: While both power supplies are manufactured by ${brand}, they use different modular standards ('${sStandard}' vs '${tStandard}'). Reusing cables without verifying pins poses a high risk.`,
    failDetails: (sName, sBrand, tName, tBrand) => `DANGER! Plugging cables from a ${sName} (${sBrand}) into a ${tName} (${tBrand}) will short-circuit your PC components. The PSU-side pinout layout is completely different. Reusing modular cables across different manufacturers is guaranteed to fry components.`,
    ruleTitle: 'Modular Cable Pinout Rule',
    whyDifferTitle: 'Why Modular Cable Pinouts Differ',
    whyDifferP1: 'While the connectors plugging into your graphics card (PCIe 8-pin) or motherboard (24-pin ATX) conform to strict industry standards, there are no standards governing the connector layouts on the power supply housing itself.',
    whyDifferP2: 'Each PSU brand designs its modular interface independently, changing pinning orders across product lines. Plugging an incompatible modular cable into a power supply can send 12V down a ground line, instantly frying connected components.'
  },
  de: {
    title: 'Modulare Netzteilkabel vergleichen',
    subtitle: 'Prüfen Sie, ob Sie modulare PCIe-, EPS- oder SATA-Kabel gefahrlos wiederverwenden können.',
    sourceLabel: 'Ursprüngliches Netzteil (Kabel, die Sie weiterverwenden wollen)',
    targetLabel: 'Neues Upgrade-Netzteil (Ziel-Netzteil)',
    passTitle: 'Vollständig kompatibel',
    warnTitle: (brand) => `Teilweise Kompatibilität / Risiko (${brand})`,
    failTitle: 'GEFÄHRLICH — INKOMPATIBEL',
    passIdenticalDetails: (name) => `Beide Netzteile sind das exakt gleiche Modell (${name}). Sie können die modularen Kabel sicher tauschen und weiterverwenden.`,
    passStandardDetails: (standard) => `Ja! Beide Geräte nutzen denselben Pinout-Standard '${standard}'. PCIe-, EPS- und SATA-Kabel sind vollständig kompatibel.`,
    warnDetails: (brand, sStandard, tStandard) => `Achtung: Obwohl beide Netzteile von ${brand} stammen, nutzen sie unterschiedliche Pinout-Standards ('${sStandard}' vs '${tStandard}'). Die Wiederverwendung ohne Pin-Prüfung birgt erhebliche Risiken.`,
    failDetails: (sName, sBrand, tName, tBrand) => `GEFAHR! Das Anschließen von Kabeln eines ${sName} (${sBrand}) an ein ${tName} (${tBrand}) verursacht einen Kurzschluss. Die netzteilseitige Pin-Belegung unterscheidet sich komplett. Das Mischen von Kabeln verschiedener Hersteller zerstört Ihre Hardware.`,
    ruleTitle: 'Kabel-Pinbelegungsregel',
    whyDifferTitle: 'Warum modulare Kabel-Pinbelegungen variieren',
    whyDifferP1: 'Während Stecker auf Mainboard- und GPU-Seite fest genormt sind, gibt es für die Stecker auf der Netzteilseite keinerlei einheitlichen Standard.',
    whyDifferP2: 'Hersteller belegen die Buchsen nach eigenem Ermessen. Ein inkompatibles Kabel kann 12 Volt auf eine Masseleitung legen und Hardware sofort zerstören.'
  },
  es: {
    title: 'Comparador de Cables Modulares de Fuente',
    subtitle: 'Comprueba si puedes reutilizar con seguridad tus cables modulares PCIe, EPS o SATA.',
    sourceLabel: 'Fuente Original (Cables que deseas reutilizar)',
    targetLabel: 'Fuente Destino (Nueva fuente a la que actualizas)',
    passTitle: 'Totalmente Compatible',
    warnTitle: (brand) => `Compatibilidad Parcial / Riesgo (Marca ${brand})`,
    failTitle: 'PELIGROSO — INCOMPATIBLE',
    passIdenticalDetails: (name) => `Ambas fuentes son exactamente el mismo modelo (${name}). Puedes intercambiar y reutilizar los cables modulares con total seguridad.`,
    passStandardDetails: (standard) => `¡Sí! Ambas fuentes comparten el estándar de patillaje '${standard}'. Los cables PCIe, EPS y SATA son intercambiables.`,
    warnDetails: (brand, sStandard, tStandard) => `Atención: Aunque ambas fuentes son de ${brand}, emplean estándares modulares diferentes ('${sStandard}' frente a '${tStandard}'). Reutilizar cables sin verificar patillas conlleva alto riesgo.`,
    failDetails: (sName, sBrand, tName, tBrand) => `¡PELIGRO! Conectar cables de una ${sName} (${sBrand}) en una ${tName} (${tBrand}) provocará un cortocircuito. El conexionado interno de la fuente es totalmente distinto y quemará tus componentes.`,
    ruleTitle: 'Regla de Patillaje de Cables',
    whyDifferTitle: 'Por qué difiere el patillaje de cables modulares',
    whyDifferP1: 'Mientras que los conectores de la placa base y GPU siguen normas universales, no existe ningún estándar para las conexiones en el propio chasis de la fuente.',
    whyDifferP2: 'Cada fabricante diseña sus puertos modulares de forma independiente. Un cable incompatible puede enviar 12V a una línea de tierra y destruir tus componentes al instante.'
  },
  fr: {
    title: 'Comparateur de Câbles Modulaires',
    subtitle: 'Vérifiez si vous pouvez réutiliser vos câbles modulaires PCIe, EPS ou SATA sans danger.',
    sourceLabel: 'Alimentation Source (Câbles que vous souhaitez réutiliser)',
    targetLabel: 'Alimentation Cible (Nouveau bloc)',
    passTitle: 'Parfaitement Compatible',
    warnTitle: (brand) => `Compatibilité Partielle / Risque (Marque ${brand})`,
    failTitle: 'DANGEREUX — INCOMPATIBLE',
    passIdenticalDetails: (name) => `Les deux blocs sont rigoureusement identiques (${name}). Vous pouvez réutiliser les câbles modulaires en toute sécurité.`,
    passStandardDetails: (standard) => `Oui ! Les deux alimentations partagent le même standard de brochage '${standard}'. Les câbles PCIe, EPS et SATA sont interchangeables.`,
    warnDetails: (brand, sStandard, tStandard) => `Attention : Bien que ces alimentations soient de marque ${brand}, elles utilisent des standards différents ('${sStandard}' vs '${tStandard}'). La réutilisation sans contrôle de brochage présente un risque élevé.`,
    failDetails: (sName, sBrand, tName, tBrand) => `DANGER ! Brancher des câbles de ${sName} (${sBrand}) sur ${tName} (${tBrand}) court-circuitera votre PC. Le brochage côté alimentation est totalement différent et détruira vos composants.`,
    ruleTitle: 'Règle de Brochage Modulaire',
    whyDifferTitle: 'Pourquoi les brochages de câbles modulaires diffèrent',
    whyDifferP1: 'Alors que les fiches côté carte mère ou GPU suivent des normes strictes, il n\'existe aucune norme régissant les connecteurs sur le boîtier d\'alimentation lui-même.',
    whyDifferP2: 'Chaque marque conçoit son interface modulaire à sa guise. Un câble inadapté peut injecter du 12V sur une ligne de masse et griller instantanément vos disques ou votre carte graphique.'
  },
  ja: {
    title: '電源プラグイン・モジュラーケーブル互換性診断',
    subtitle: '現在お使いのPCIe、EPS、SATAモジュラーケーブルが安全に流用できるかを判定します。',
    sourceLabel: '元の電源ユニット (ケーブルを流用したい電源)',
    targetLabel: '換装先・新しい電源ユニット (アップグレード先)',
    passTitle: '完全互換 (流用可能)',
    warnTitle: (brand) => `一部互換・注意が必要 (${brand}製)`,
    failTitle: '危険 — 互換性なし (ショート事故のリスク)',
    passIdenticalDetails: (name) => `両方の電源は同一モデル（${name}）です。モジュラーケーブルを安全に流用・交換できます。`,
    passStandardDetails: (standard) => `流用可能です！両モデルとも共通のピンアサイン規格「${standard}」を採用しており、PCIe/EPS/SATAケーブルをそのまま使用できます。`,
    warnDetails: (brand, sStandard, tStandard) => `警告: 同一メーカー（${brand}）製ですが、採用されているモジュラー規格が異なります（${sStandard} vs ${tStandard}）。ピン配列を確認せずに流用すると故障の原因になります。`,
    failDetails: (sName, sBrand, tName, tBrand) => `危険！${sName}（${sBrand}）のケーブルを ${tName}（${tBrand}）に挿すと短絡（ショート）します。電源側のピン配列はメーカーごとに全く異なるため、異なるメーカー間のケーブル流用はパーツを確実に破損させます。`,
    ruleTitle: 'モジュラーケーブルの安全原則',
    whyDifferTitle: 'なぜ電源側のピン配列は規格化されていないのか',
    whyDifferP1: 'GPUやマザーボードに挿す端子の形状・ピン配列は業界標準で統一されていますが、電源ユニット本体側のコネクタ配列には共通規格が存在しません。',
    whyDifferP2: 'メーカーや世代ごとにピンアサインが独自設計されているため、非対応ケーブルを使用するとGND端子に12Vが印加され、SSDやグラフィックボードが一瞬で焼き切れます。'
  },
  zh: {
    title: '电源全模组线材通用兼容性检测',
    subtitle: '核验您现有的 PCIe、CPU 供电或 SATA 模组线是否可在新电源上安全混用复用。',
    sourceLabel: '原有电源型号 (拟复用线材来源)',
    targetLabel: '新升级电源型号 (拟接入的目标电源)',
    passTitle: '完全兼容 (可安全混用)',
    warnTitle: (brand) => `部分兼容 / 存在风险 (${brand} 品牌)`,
    failTitle: '极度危险 — 严禁混用线材',
    passIdenticalDetails: (name) => `两款电源为完全一致的同型号硬件（${name}）。模组线材完全通用，可安全混用。`,
    passStandardDetails: (standard) => `完全兼容！两款电源共享相同的「${standard}」模组端线序规范，PCIe、CPU 及 SATA 模组线均可安全通用。`,
    warnDetails: (brand, sStandard, tStandard) => `注意：虽然同属 ${brand} 品牌，但两者采用不同的模组接口规范（${sStandard} vs ${tStandard}）。未核对针脚定义直接复用极易引发故障。`,
    failDetails: (sName, sBrand, tName, tBrand) => `危险！将 ${sName} (${sBrand}) 的模组线插入 ${tName} (${tBrand}) 会直接导致短路烧卡。电源端模组接口定义各品牌完全不同，跨品牌混插线材必烧硬件！`,
    ruleTitle: '模组线安全法则',
    whyDifferTitle: '为什么不同电源的模组线不能随意混用？',
    whyDifferP1: '显卡端（PCIe 8-pin）和主板端（24-pin ATX）的接口线序虽有严格的行业规范，但电源外壳端（PSU-side）的接口针脚定义从来没有统一行业标准。',
    whyDifferP2: '各品牌甚至同品牌不同代际的电源内部引脚排列各不相同。一旦错误插接，12V 强电直接倒灌至地线或 5V 线路，接通电源瞬间就会烧毁硬盘与显卡。'
  }
};

export function getCableCompatibilityTranslations(lang: Locale): CableCompatibilityLabels {
  return CABLE_COMPATIBILITY_TRANSLATIONS[lang] || CABLE_COMPATIBILITY_TRANSLATIONS.en;
}
