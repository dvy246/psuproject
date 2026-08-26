import type { Locale } from './locales';

export interface ApplianceTranslation {
  name: string;
}

export const ELECTRICAL_TRANSLATIONS: Record<Locale, {
  breaker: {
    title: string;
    wallPower: string;
    noteText: string;
    circuitRating: string;
    sharedDevices: string;
    verdictTitle: string;
    totalCircuitLoad: string;
    highContinuousLoad: string;
    appliances: Record<string, string>;
  };
  ups: {
    title: string;
    gamingLoad: string;
    officeLoad: string;
    monitorLoad: string;
    activePfcTitle: string;
    activePfcDesc: string;
    outputTitle: string;
    totalLoad: string;
    recommendedVa: string;
    runtimeMinutes: (m: number) => string;
  };
}> = {
  en: {
    breaker: {
      title: 'Circuit Breaker Load Auditor',
      wallPower: 'PC Gaming Wall Power Draw',
      noteText: 'Note: Under gaming load, an average PC draws ~350W–850W.',
      circuitRating: 'Room Circuit Breaker Rating',
      sharedDevices: 'Shared Room Devices',
      verdictTitle: 'Circuit Load Verdict',
      totalCircuitLoad: 'Total Circuit Load',
      highContinuousLoad: '⚠ High Continuous Load (>80%)',
      appliances: {
        'space-heater': 'Portable Space Heater (High)',
        'space-heater-low': 'Portable Space Heater (Low)',
        'portable-ac': 'Portable Air Conditioner',
        'monitor-dual': 'Dual Gaming Monitors',
        'monitor-single': 'Single Monitor',
        'console-charger': 'Console / Laptop Charger',
        'room-lights': 'LED Room Lighting',
        'fan-tower': 'Standing/Tower Fan'
      }
    },
    ups: {
      title: 'UPS Battery Sizer & Pure Sine Wave Checker',
      gamingLoad: 'PC Gaming / Peak Load Draw',
      officeLoad: 'PC Office / Idle Draw',
      monitorLoad: 'Monitors & Peripherals Draw',
      activePfcTitle: 'Active PFC Power Supply',
      activePfcDesc: 'Modern PSUs with Active PFC require pure sine wave UPS output to avoid sudden shutdowns during power outages.',
      outputTitle: 'UPS Sizing Output',
      totalLoad: 'Total Power Load',
      recommendedVa: 'Recommended UPS Capacity',
      runtimeMinutes: (m) => `~${m} mins`
    }
  },
  de: {
    breaker: {
      title: 'Stromkreis- & Sicherungs-Auditor',
      wallPower: 'PC-Leistungsaufnahme Gaming (Wand)',
      noteText: 'Hinweis: Unter Gaming-Last verbraucht ein typischer PC ca. 350W–850W.',
      circuitRating: 'Absicherung des Stromkreises (Sicherung)',
      sharedDevices: 'Weitere Geräte im selben Stromkreis',
      verdictTitle: 'Stromkreis-Last-Diagnose',
      totalCircuitLoad: 'Gesamte Stromkreis-Auslastung',
      highContinuousLoad: '⚠ Hohe Dauerlast (>80%)',
      appliances: {
        'space-heater': 'Elektrischer Heizlüfter (Stufe 2)',
        'space-heater-low': 'Elektrischer Heizlüfter (Stufe 1)',
        'portable-ac': 'Mobiles Klimagerät',
        'monitor-dual': 'Zwei Gaming-Monitore',
        'monitor-single': 'Einzelner Monitor',
        'console-charger': 'Konsolen- / Laptop-Netzteil',
        'room-lights': 'LED-Raumbeleuchtung',
        'fan-tower': 'Stand- / Turmventilator'
      }
    },
    ups: {
      title: 'USV-Batterie-Dimensionierung',
      gamingLoad: 'PC-Spitzenlast / Gaming',
      officeLoad: 'PC-Leerlauf / Office',
      monitorLoad: 'Monitore & Zubehör',
      activePfcTitle: 'Netzteil mit aktiver PFC',
      activePfcDesc: 'Moderne Netzteile mit aktiver Leistungsfaktorkorrektur (PFC) benötigen eine echte Sinuswelle, um Notabschaltungen bei Netzausfall zu vermeiden.',
      outputTitle: 'USV-Dimensionierungsergebnis',
      totalLoad: 'Gesamte Lastleistung',
      recommendedVa: 'Empfohlene USV-Kapazität',
      runtimeMinutes: (m) => `ca. ${m} Min.`
    }
  },
  es: {
    breaker: {
      title: 'Auditor de Carga del Cuadro Eléctrico',
      wallPower: 'Consumo del PC en Juego (Toma de Pared)',
      noteText: 'Nota: En sesión de juego, un PC estándar consume entre 350W y 850W.',
      circuitRating: 'Capacidad del Magnetotérmico / Diferencial',
      sharedDevices: 'Otros Aparatos en la Misma Línea',
      verdictTitle: 'Dictamen de Carga del Circuito',
      totalCircuitLoad: 'Carga Total de la Línea',
      highContinuousLoad: '⚠ Alta Carga Continua (>80%)',
      appliances: {
        'space-heater': 'Calefactor Eléctrico (Potencia Máxima)',
        'space-heater-low': 'Calefactor Eléctrico (Potencia Baja)',
        'portable-ac': 'Aire Acondicionado Portátil',
        'monitor-dual': 'Dos Monitores Gaming',
        'monitor-single': 'Monitor Único',
        'console-charger': 'Cargador de Consola / Portátil',
        'room-lights': 'Iluminación LED de Habitación',
        'fan-tower': 'Ventilador de Torre / Pie'
      }
    },
    ups: {
      title: 'Dimensionamiento de Batería SAI / UPS',
      gamingLoad: 'Consumo Máximo del PC en Juegos',
      officeLoad: 'Consumo en Reposo / Ofimática',
      monitorLoad: 'Monitores y Periféricos',
      activePfcTitle: 'Fuente con PFC Activo',
      activePfcDesc: 'Las fuentes modernas con PFC activo exigen salida de onda senoidal pura en el SAI para evitar apagados repentinos durante cortes de luz.',
      outputTitle: 'Resultado del Dimensionamiento SAI',
      totalLoad: 'Consumo Eléctrico Total',
      recommendedVa: 'Capacidad Recomendada de SAI',
      runtimeMinutes: (m) => `~${m} min`
    }
  },
  fr: {
    breaker: {
      title: 'Auditeur de Charge du Disjoncteur',
      wallPower: 'Consommation PC en Jeu (Prise Secteur)',
      noteText: 'Remarque : En charge de jeu, un PC moyen consomme ~350W à 850W.',
      circuitRating: 'Calibre du Disjoncteur Divisionnaire',
      sharedDevices: 'Autres Équipements sur le Même Circuit',
      verdictTitle: 'Verdict de Charge du Circuit',
      totalCircuitLoad: 'Charge Totale du Circuit',
      highContinuousLoad: '⚠ Forte Charge Continue (>80%)',
      appliances: {
        'space-heater': 'Chauffage d\'Appoint (Pleine Puissance)',
        'space-heater-low': 'Chauffage d\'Appoint (Basse Puissance)',
        'portable-ac': 'Climatiseur Mobile',
        'monitor-dual': 'Deux Écrans Gaming',
        'monitor-single': 'Écran Simple',
        'console-charger': 'Chargeur Console / PC Portable',
        'room-lights': 'Éclairage LED de la Pièce',
        'fan-tower': 'Ventilateur Colonne / Sur Pied'
      }
    },
    ups: {
      title: 'Dimensionnement d\'Onduleur UPS & Batterie',
      gamingLoad: 'Consommation PC en Jeu / Pic',
      officeLoad: 'Consommation PC au Repos / Bureautique',
      monitorLoad: 'Écrans & Périphériques',
      activePfcTitle: 'Alimentation avec PFC Actif',
      activePfcDesc: 'Les alimentations modernes avec PFC actif nécessitent un onduleur à onde sinusoïdale pure pour éviter toute coupure lors du basculement sur batterie.',
      outputTitle: 'Résultat du Dimensionnement Onduleur',
      totalLoad: 'Charge Électrique Totale',
      recommendedVa: 'Capacité Onduleur Recommandée',
      runtimeMinutes: (m) => `~${m} min`
    }
  },
  ja: {
    breaker: {
      title: 'ブレーカー電気負荷診断',
      wallPower: 'PCゲーム時の消費電力 (コンセント側)',
      noteText: '補足: ゲームプレイ時、一般的なゲーミングPCは350W〜850Wを消費します。',
      circuitRating: '部屋のブレーカー定格容量',
      sharedDevices: '同じ部屋・回路で同時に使う家電',
      verdictTitle: 'ブレーカー負荷判定結果',
      totalCircuitLoad: '回路全体の消費電力',
      highContinuousLoad: '⚠ 連続高負荷アラート (>80%)',
      appliances: {
        'space-heater': 'セラミックファンヒーター (強)',
        'space-heater-low': 'セラミックファンヒーター (弱)',
        'portable-ac': 'スポットエアコン・ポータブルクーラー',
        'monitor-dual': 'デュアルゲーミングモニター',
        'monitor-single': 'シングルモニター',
        'console-charger': 'ゲーム機 / ノートPC充電器',
        'room-lights': '部屋のLED照明',
        'fan-tower': 'リビング扇風機 / タワーファン'
      }
    },
    ups: {
      title: '無停電電源装置 (UPS) 容量計算機',
      gamingLoad: 'PC高負荷・ゲーム時消費電力',
      officeLoad: 'PCアイドル・事務作業時消費電力',
      monitorLoad: '液晶モニター・周辺機器',
      activePfcTitle: 'Active PFC搭載電源ユニット',
      activePfcDesc: 'Active PFC回路を搭載した電源ユニットでは、停電時の誤停止を防ぐため「正弦波出力」対応のUPSが必須です。',
      outputTitle: 'UPS必要スペック診断結果',
      totalLoad: '合計消費電力',
      recommendedVa: '推奨UPS容量 (VA)',
      runtimeMinutes: (m) => `約 ${m} 分`
    }
  },
  zh: {
    breaker: {
      title: '房间回路空开负载负荷评估',
      wallPower: 'PC主机游戏满载墙插功耗',
      noteText: '提示：在中高画质游戏下，主流电竞主机实测功耗约为 350W~850W。',
      circuitRating: '房间分路空气开关(断路器)额定安培',
      sharedDevices: '同一房间/电线同路运行的其他电器',
      verdictTitle: '空开跳闸风险综合判定',
      totalCircuitLoad: '该分路总用电负载',
      highContinuousLoad: '⚠ 接近持续高负载上限 (>80%)',
      appliances: {
        'space-heater': '电暖器/取暖器 (高档位)',
        'space-heater-low': '电暖器/取暖器 (低档位)',
        'portable-ac': '移动式空调/冷风机',
        'monitor-dual': '双显示器游戏矩阵',
        'monitor-single': '单台显示器',
        'console-charger': '游戏主机/笔记本快充头',
        'room-lights': '房间LED主灯及氛围灯',
        'fan-tower': '落地式摇头风扇'
      }
    },
    ups: {
      title: 'UPS 不间断电源容量选型计算',
      gamingLoad: 'PC游戏/高负载渲染功耗',
      officeLoad: 'PC待机/轻度办公功耗',
      monitorLoad: '显示器及外设用电',
      activePfcTitle: '主动式 PFC (Active PFC) 电源',
      activePfcDesc: '搭载主动式 PFC 的现代电源在市电中断切换至电池供电时，必须配合纯正弦波输出的 UPS 才能避免突发断电保护。',
      outputTitle: 'UPS 推荐选型输出',
      totalLoad: '整套设备总用电功耗',
      recommendedVa: '推荐 UPS 视在功率容量',
      runtimeMinutes: (m) => `约 ${m} 分钟`
    }
  }
};

export function getElectricalTranslations(lang: Locale) {
  return ELECTRICAL_TRANSLATIONS[lang] || ELECTRICAL_TRANSLATIONS.en;
}
