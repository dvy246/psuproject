import type { Locale } from './locales';

export interface GpuUpgradeLabels {
  paramsHeading: string;
  currentGpuLabel: string;
  targetGpuLabel: string;
  currentWattageLabel: string;
  psuAgeLabel: string;
  yearsSuffix: string;
  systemCpuLabel: string;
  verdictHeading: string;
  verdictLabels: {
    safe: string;
    borderline: string;
    upgrade_required: string;
  };
  getVerdictText: (verdict: 'safe' | 'borderline' | 'upgrade_required', rated: number, targetName: string, peak: number, effective: number, recommended: number) => string;
  connectorAlert: (currentGpu: string, targetGpu: string, fromConn: string, toConn: string) => string;
  comparisonHeading: string;
  tableHeaders: {
    metric: string;
    current: (name: string) => string;
    upgraded: (name: string) => string;
    delta: string;
  };
  metrics: {
    gpuTbp: string;
    sustainedDraw: string;
    transientPeak: string;
    connector: string;
  };
  connectorDifferent: string;
  connectorSame: string;
  recommendedPsusHeading: (w: number) => string;
  viewSpecs: string;
}

export const GPU_UPGRADE_TRANSLATIONS: Record<Locale, GpuUpgradeLabels> = {
  en: {
    paramsHeading: 'GPU Upgrade Parameters',
    currentGpuLabel: 'Current Graphics Card (GPU)',
    targetGpuLabel: 'Target Upgrade GPU',
    currentWattageLabel: 'Current PSU Rated Wattage',
    psuAgeLabel: 'Current PSU Age',
    yearsSuffix: 'Years',
    systemCpuLabel: 'System CPU',
    verdictHeading: 'Upgrade Sizing Verdict',
    verdictLabels: {
      safe: 'Safe to Upgrade',
      borderline: 'Borderline Capacity',
      upgrade_required: 'PSU Upgrade Required'
    },
    getVerdictText: (verdict, rated, targetName, peak, effective, recommended) => {
      if (verdict === 'safe') {
        return `Yes! Your ${rated}W power supply is fully compatible and retains adequate safety margin for upgrading to the ${targetName}. The target configuration produces peak transient spikes of ${peak}W, which fits safely within your aged PSU's effective capacity of ${effective}W.`;
      }
      if (verdict === 'borderline') {
        return `Your ${rated}W power supply is borderline. The upgraded configuration peak draw reaches ${peak}W, which is extremely close to your PSU's effective capacity of ${effective}W. While the system may boot, we recommend upgrading to at least a ${recommended}W PSU to avoid shutdowns under heavy load spikes.`;
      }
      return `No. Your ${rated}W power supply does not have enough headroom for the ${targetName}. The upgraded system peak spikes reach ${peak}W, which exceeds your PSU's aged capacity limit of ${effective}W. You must upgrade your PSU.`;
    },
    connectorAlert: (currentGpu, targetGpu, fromConn, toConn) =>
      `Upgrading from ${currentGpu} to ${targetGpu} changes your power connector from ${fromConn} to ${toConn}. Ensure your new GPU includes adapters or select a native ATX 3.1 PSU with a native 12V-2x6 cable to prevent melting risks.`,
    comparisonHeading: 'Power Requirements Comparison',
    tableHeaders: {
      metric: 'Metric',
      current: (name) => `Current (${name})`,
      upgraded: (name) => `Upgraded (${name})`,
      delta: 'Change (Delta)'
    },
    metrics: {
      gpuTbp: 'GPU Rated TBP',
      sustainedDraw: 'Sustained System Draw',
      transientPeak: 'Peak Transient Spike',
      connector: 'Power Connector'
    },
    connectorDifferent: 'Different',
    connectorSame: 'Same',
    recommendedPsusHeading: (w) => `Recommended ATX 3.1 PSUs for the Upgrade (${w}W+)`,
    viewSpecs: 'View Specs →'
  },
  de: {
    paramsHeading: 'GPU-Upgrade-Parameter',
    currentGpuLabel: 'Aktuelle Grafikkarte (GPU)',
    targetGpuLabel: 'Geplante Upgrade-GPU',
    currentWattageLabel: 'Nennleistung des aktuellen Netzteils',
    psuAgeLabel: 'Alter des aktuellen Netzteils',
    yearsSuffix: 'Jahre',
    systemCpuLabel: 'System-Prozessor (CPU)',
    verdictHeading: 'Upgrade-Kompatibilitätsbewertung',
    verdictLabels: {
      safe: 'Upgrade sicher möglich',
      borderline: 'Grenzbereich (Knapp)',
      upgrade_required: 'Netzteil-Upgrade erforderlich'
    },
    getVerdictText: (verdict, rated, targetName, peak, effective, recommended) => {
      if (verdict === 'safe') {
        return `Ja! Ihr ${rated}W Netzteil ist vollständig kompatibel und bietet ausreichende Sicherheitsreserven für das Upgrade auf die ${targetName}. Die neue Konfiguration erzeugt Lastspitzen von ${peak}W, was sicher innerhalb der effektiven Kapazität von ${effective}W Ihres Netzteils liegt.`;
      }
      if (verdict === 'borderline') {
        return `Ihr ${rated}W Netzteil befindet sich im Grenzbereich. Die Lastspitzen erreichen ${peak}W, was extrem nah an der gealterten effektiven Kapazität von ${effective}W liegt. Wir empfehlen mindestens ein ${recommended}W Netzteil, um Notabschaltungen zu verhindern.`;
      }
      return `Nein. Ihr ${rated}W Netzteil bietet nicht genügend Reserven für die ${targetName}. Die Lastspitzen erreichen ${peak}W und überschreiten das Kapazitätslimit von ${effective}W. Ein Netzteil-Upgrade ist zwingend erforderlich.`;
    },
    connectorAlert: (currentGpu, targetGpu, fromConn, toConn) =>
      `Der Wechsel von ${currentGpu} zu ${targetGpu} ändert den Stromanschluss von ${fromConn} auf ${toConn}. Verwenden Sie beiliegende Adapter oder wählen Sie ein natives ATX 3.1 Netzteil mit 12V-2x6 Kabel zur Vermeidung thermischer Risiken.`,
    comparisonHeading: 'Leistungsbedarf im Vergleich',
    tableHeaders: {
      metric: 'Kennzahl',
      current: (name) => `Aktuell (${name})`,
      upgraded: (name) => `Nach Upgrade (${name})`,
      delta: 'Differenz (Delta)'
    },
    metrics: {
      gpuTbp: 'GPU Nennleistung (TBP)',
      sustainedDraw: 'Dauerhafte Systemleistung',
      transientPeak: 'Maximale Lastspitze (Spike)',
      connector: 'Stromanschluss'
    },
    connectorDifferent: 'Unterschiedlich',
    connectorSame: 'Identisch',
    recommendedPsusHeading: (w) => `Empfohlene ATX 3.1 Netzteile für das Upgrade (${w}W+)`,
    viewSpecs: 'Details ansehen →'
  },
  es: {
    paramsHeading: 'Parámetros de Actualización de GPU',
    currentGpuLabel: 'Tarjeta Gráfica Actual (GPU)',
    targetGpuLabel: 'GPU de Actualización Destino',
    currentWattageLabel: 'Potencia Nominal de la Fuente Actual',
    psuAgeLabel: 'Antigüedad de la Fuente Actual',
    yearsSuffix: 'Años',
    systemCpuLabel: 'Procesador del Sistema (CPU)',
    verdictHeading: 'Dictamen de Compatibilidad',
    verdictLabels: {
      safe: 'Actualización Segura',
      borderline: 'Capacidad Límite',
      upgrade_required: 'Requiere Cambio de Fuente'
    },
    getVerdictText: (verdict, rated, targetName, peak, effective, recommended) => {
      if (verdict === 'safe') {
        return `¡Sí! Tu fuente de alimentación de ${rated}W es plenamente compatible y conserva suficiente margen de seguridad para actualizar a la ${targetName}. La configuración objetivo produce picos de ${peak}W, perfectamente asumibles por la capacidad efectiva de ${effective}W de tu fuente.`;
      }
      if (verdict === 'borderline') {
        return `Tu fuente de ${rated}W está en el límite. El consumo en picos alcanzará ${peak}W, muy cerca de la capacidad efectiva de ${effective}W. Recomendamos al menos una fuente de ${recommended}W para evitar reinicios bajo carga extrema.`;
      }
      return `No. Tu fuente de ${rated}W no tiene suficiente margen para la ${targetName}. Los picos de consumo alcanzan ${peak}W, superando el límite efectivo de ${effective}W. Debes actualizar tu fuente.`;
    },
    connectorAlert: (currentGpu, targetGpu, fromConn, toConn) =>
      `La actualización de ${currentGpu} a ${targetGpu} cambia el conector de alimentación de ${fromConn} a ${toConn}. Asegúrate de usar los adaptadores incluidos o elige una fuente nativa ATX 3.1 con cable 12V-2x6 para prevenir sobrecalentamiento.`,
    comparisonHeading: 'Comparativa de Requerimientos de Energía',
    tableHeaders: {
      metric: 'Métrica',
      current: (name) => `Actual (${name})`,
      upgraded: (name) => `Actualizado (${name})`,
      delta: 'Variación (Delta)'
    },
    metrics: {
      gpuTbp: 'Potencia Nominal GPU (TBP)',
      sustainedDraw: 'Consumo Continuo del Sistema',
      transientPeak: 'Pico Transitorio Máximo',
      connector: 'Conector de Alimentación'
    },
    connectorDifferent: 'Diferente',
    connectorSame: 'Idéntico',
    recommendedPsusHeading: (w) => `Fuentes ATX 3.1 Recomendadas para la Actualización (${w}W+)`,
    viewSpecs: 'Ver Especificaciones →'
  },
  fr: {
    paramsHeading: 'Paramètres d\'Upgrade GPU',
    currentGpuLabel: 'Carte Graphique Actuelle (GPU)',
    targetGpuLabel: 'GPU Cible après Upgrade',
    currentWattageLabel: 'Puissance Nominale de l\'Alimentation',
    psuAgeLabel: 'Âge de l\'Alimentation Actuelle',
    yearsSuffix: 'Ans',
    systemCpuLabel: 'Processeur (CPU)',
    verdictHeading: 'Verdict de Dimensionnement',
    verdictLabels: {
      safe: 'Upgrade en toute sécurité',
      borderline: 'Capacité Limite',
      upgrade_required: 'Changement d\'Alimentation Requis'
    },
    getVerdictText: (verdict, rated, targetName, peak, effective, recommended) => {
      if (verdict === 'safe') {
        return `Oui ! Votre alimentation de ${rated}W est totalement compatible et conserve une marge de sécurité suffisante pour passer à la ${targetName}. La nouvelle configuration génère des pics transitoires de ${peak}W, absorbés sans danger par les ${effective}W effectifs de votre bloc.`;
      }
      if (verdict === 'borderline') {
        return `Votre alimentation de ${rated}W est à la limite. Les pics transitoires atteindront ${peak}W, ce qui est très proche de la capacité réelle de ${effective}W. Nous recommandons un bloc d'au moins ${recommended}W pour prévenir toute coupure en jeu.`;
      }
      return `Non. Votre bloc de ${rated}W ne dispose pas d'assez de puissance pour la ${targetName}. Les pics atteignent ${peak}W et dépassent la limite de ${effective}W. Vous devez changer d'alimentation.`;
    },
    connectorAlert: (currentGpu, targetGpu, fromConn, toConn) =>
      `Passer de ${currentGpu} à ${targetGpu} modifie le connecteur d'alimentation de ${fromConn} vers ${toConn}. Veillez à utiliser les adaptateurs fournis ou choisissez une alimentation ATX 3.1 avec câble 12V-2x6 natif.`,
    comparisonHeading: 'Comparaison des Besoins Électriques',
    tableHeaders: {
      metric: 'Paramètre',
      current: (name) => `Actuel (${name})`,
      upgraded: (name) => `Après Upgrade (${name})`,
      delta: 'Évolution (Delta)'
    },
    metrics: {
      gpuTbp: 'TBP Nominal du GPU',
      sustainedDraw: 'Consommation Continue Système',
      transientPeak: 'Pic Transitoire Maximal',
      connector: 'Connecteur d\'Alimentation'
    },
    connectorDifferent: 'Différent',
    connectorSame: 'Identique',
    recommendedPsusHeading: (w) => `Alimentations ATX 3.1 Recommandées pour l'Upgrade (${w}W+)`,
    viewSpecs: 'Voir Fiche Technique →'
  },
  ja: {
    paramsHeading: 'グラフィックボード換装・診断条件',
    currentGpuLabel: '現在使用中のGPU',
    targetGpuLabel: '換装予定のGPU (アップグレード先)',
    currentWattageLabel: '現在使用中の電源容量',
    psuAgeLabel: '電源ユニットの使用年数',
    yearsSuffix: '年',
    systemCpuLabel: '搭載プロセッサ (CPU)',
    verdictHeading: '電源適合性・換装診断結果',
    verdictLabels: {
      safe: '換装可能 (安全マージン十分)',
      borderline: '許容限界 (容量ギリギリ)',
      upgrade_required: '電源ユニットの交換が必要'
    },
    getVerdictText: (verdict, rated, targetName, peak, effective, recommended) => {
      if (verdict === 'safe') {
        return `換装可能です！お使いの ${rated}W 電源ユニットは、${targetName} へのアップグレードに対して十分な安全マージンを保持しています。瞬間最大スパイク電力 ${peak}W に対し、経年劣化後の実効出力 ${effective}W の範囲内に安全に収まります。`;
      }
      if (verdict === 'borderline') {
        return `お使いの ${rated}W 電源は容量限界に近いです。換装後のスパイク電力は ${peak}W に達し、電源の実効容量 ${effective}W に極めて近接します。高負荷時の突然のシャットダウンを防ぐため、${recommended}W 以上の電源へのアップグレードを推奨します。`;
      }
      return `換装には電源交換が必要です。お使いの ${rated}W 電源では ${targetName} の電力要求を満たせません。換装後のスパイク電力 ${peak}W が電源の実効容量 ${effective}W を超過します。`;
    },
    connectorAlert: (currentGpu, targetGpu, fromConn, toConn) =>
      `${currentGpu} から ${targetGpu} への換装により、電源コネクタが ${fromConn} から ${toConn} へ変更されます。付属変換アダプタを使用するか、発熱・融解リスクを抑えるためネイティブ12V-2x6ケーブル対応のATX 3.1電源をおすすめします。`,
    comparisonHeading: '消費電力・仕様の比較',
    tableHeaders: {
      metric: '比較項目',
      current: (name) => `換装前 (${name})`,
      upgraded: (name) => `換装後 (${name})`,
      delta: '変化量 (Delta)'
    },
    metrics: {
      gpuTbp: 'GPU定格消費電力 (TBP)',
      sustainedDraw: 'システム定常消費電力',
      transientPeak: '瞬間最大スパイク電力',
      connector: '電源補助コネクタ'
    },
    connectorDifferent: '異なる端子',
    connectorSame: '同一端子',
    recommendedPsusHeading: (w) => `換装におすすめのATX 3.1対応電源ユニット (${w}W以上)`,
    viewSpecs: '詳細スペックを見る →'
  },
  zh: {
    paramsHeading: '显卡升级换装参数设定',
    currentGpuLabel: '当前在用独立显卡 (GPU)',
    targetGpuLabel: '拟升级目标显卡 (Target GPU)',
    currentWattageLabel: '当前在用电源额定功率',
    psuAgeLabel: '当前电源已使用年限',
    yearsSuffix: '年',
    systemCpuLabel: '主机处理器 (CPU)',
    verdictHeading: '升级电源兼容性诊断报告',
    verdictLabels: {
      safe: '可安全升级 (余量充裕)',
      borderline: '临界紧凑 (建议换新)',
      upgrade_required: '必须更换更高功率电源'
    },
    getVerdictText: (verdict, rated, targetName, peak, effective, recommended) => {
      if (verdict === 'safe') {
        return `可以安全升级！您当前的 ${rated}W 电源完全兼容升级至 ${targetName} 并保留了充足的安全冗余。升级后系统瞬态峰值功耗为 ${peak}W，完全处于当前电源老化折算实效功率 ${effective}W 的安全支撑范围之内。`;
      }
      if (verdict === 'borderline') {
        return `当前 ${rated}W 电源处于临界紧凑状态。升级后整机尖峰功耗将达到 ${peak}W，极度逼近电源实效输出能力 ${effective}W。虽然能够正常开机，但为避免大型 3D 游戏重载时意外跳闸断电，建议升级至至少 ${recommended}W 电源。`;
      }
      return `无法支持直接升级。您当前的 ${rated}W 电源容量不足以支撑 ${targetName}。升级后峰值瞬态冲击高达 ${peak}W，已超过当前电源 ${effective}W 的老化承载上限，必须同步更换更高功率电源。`;
    },
    connectorAlert: (currentGpu, targetGpu, fromConn, toConn) =>
      `从 ${currentGpu} 升级至 ${targetGpu} 涉及供电接口由 ${fromConn} 变更为 ${toConn}。请确保使用显卡自带官方转接线，或优先选用配备原生 12V-2x6 防烧线材的 ATX 3.1 认证金牌电源。`,
    comparisonHeading: '升级前后功耗与供电规格对比',
    tableHeaders: {
      metric: '核心参数指标',
      current: (name) => `升级前 (${name})`,
      upgraded: (name) => `升级后 (${name})`,
      delta: '差值变化 (Delta)'
    },
    metrics: {
      gpuTbp: '显卡标称整卡功耗 (TBP)',
      sustainedDraw: '整机持续满载运行功耗',
      transientPeak: '亚毫秒级瞬态尖峰峰值',
      connector: '显卡供电接口规范'
    },
    connectorDifferent: '接口规格不同',
    connectorSame: '接口规格一致',
    recommendedPsusHeading: (w) => `适配本次显卡升级的严选 ATX 3.1 电源 (${w}W+)`,
    viewSpecs: '查看硬件详情 →'
  }
};

export function getGpuUpgradeTranslations(lang: Locale): GpuUpgradeLabels {
  return GPU_UPGRADE_TRANSLATIONS[lang] || GPU_UPGRADE_TRANSLATIONS.en;
}
