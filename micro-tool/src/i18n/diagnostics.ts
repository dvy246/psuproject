import type { Locale } from './locales';

export interface LocalizedSymptom {
  name: string;
  description: string;
}

export const DIAGNOSTIC_TRANSLATIONS: Record<Locale, {
  selectSymptomHeading: string;
  hardwareProfileHeading: string;
  hardwareProfileSubtitle: string;
  psuAgeLabel: string;
  yearsSuffix: string;
  qualityTierLabel: string;
  gpuLabel: string;
  backBtn: string;
  nextStepBtn: string;
  previousQuestionBtn: string;
  questionOf: (curr: number, total: number) => string;
  completePercent: (pct: number) => string;
  criticalSafetyTitle: string;
  criticalSafetyWarning: string;
  criticalSafetyStep1: string;
  criticalSafetyStep2: string;
  criticalSafetyStep3: string;
  criticalSafetyStep4: string;
  restartDiagnosisBtn: string;
  findReplacementPsuBtn: string;
  resultsHeading: string;
  matchSuffix: string;
  recommendedActionHeading: string;
  eeatDisclaimer: string;
  symptoms: Record<string, LocalizedSymptom>;
  causeTitles: Record<string, string>;
  tierNames: Record<string, string>;
}> = {
  en: {
    selectSymptomHeading: 'What is the primary symptom your PC is experiencing?',
    hardwareProfileHeading: 'Configure Hardware Profile',
    hardwareProfileSubtitle: 'Inputting your power supply age and tier allows the engine to calibrate wear-and-tear degradation indices.',
    psuAgeLabel: 'Power Supply Age:',
    yearsSuffix: 'Years',
    qualityTierLabel: 'Power Supply Quality Tier:',
    gpuLabel: 'Graphics Card (GPU):',
    backBtn: 'Back',
    nextStepBtn: 'Next Step',
    previousQuestionBtn: '← Previous Question',
    questionOf: (curr, total) => `Question ${curr} of ${total}`,
    completePercent: (pct) => `${pct}% Complete`,
    criticalSafetyTitle: '⚠️ CRITICAL ELECTRICAL SAFETY ALERT',
    criticalSafetyWarning: 'DO NOT attempt to boot the computer, troubleshoot components, or leave the PC connected to wall power.',
    criticalSafetyStep1: 'Immediately turn off the power switch on the back of the PSU.',
    criticalSafetyStep2: 'Unplug the AC power cord from the wall outlet.',
    criticalSafetyStep3: 'Wait at least 30 minutes for capacitors to discharge before removing any parts.',
    criticalSafetyStep4: 'Do not reuse this power supply; it must be replaced.',
    restartDiagnosisBtn: 'Restart Diagnosis',
    findReplacementPsuBtn: 'Find a Replacement PSU',
    resultsHeading: '📊 Differential Diagnosis Results',
    matchSuffix: '% Match',
    recommendedActionHeading: '💡 Recommended Action:',
    eeatDisclaimer: 'Hardware Diagnostic Notice: This diagnostic tool runs a client-side probability ruleset to narrow down faulty components. Always confirm voltage stability and safety steps before purchasing replacement hardware.',
    tierNames: {
      A: 'Tier A (High-End)',
      B: 'Tier B (Mid-Range)',
      C: 'Tier C (Budget)',
      Avoid: 'Avoid (Low-Quality)'
    },
    symptoms: {
      'no-power': {
        name: 'No Power / Completely Dead',
        description: 'No lights, no fan spin, and total lack of response when pressing the power button.'
      },
      'shut-down-gaming': {
        name: 'Sudden Shutdown Under Load / Gaming',
        description: 'PC abruptly powers off or restarts during heavy 3D gaming or benchmark rendering without blue screens.'
      },
      'bsod-crashes': {
        name: 'Random BSODs & Kernel Crashes',
        description: 'Frequent Windows Blue Screen errors (WHEA_UNCORRECTABLE_ERROR, KERNEL_SECURITY_CHECK, MEMORY_MANAGEMENT).'
      },
      'coil-whine': {
        name: 'Loud Coil Whine / High-Pitched Buzzing',
        description: 'Electrical buzzing or screeching noises coming from the PSU or GPU when frame rates increase.'
      },
      'burning-smell': {
        name: 'Burning Smell / Sparks / Smoke',
        description: 'Pungent electrical odor, scorched plastic smell, or visible sparks from the power supply.'
      }
    },
    causeTitles: {
      psu_failure: 'Power Supply Component Failure',
      front_panel: 'Faulty Front Panel Button / Headers',
      outlet_issue: 'External Power Outlet or Cable Fault',
      short_circuit: 'Short Circuit Protection (SCP) Active',
      psu_overload: 'PSU Rail Overload / Insufficient Capacity',
      motherboard_dead: 'Motherboard VRM or Chipset Failure',
      psu_protection: 'Over-Current Protection (OCP) Triggered',
      gpu_instability: 'GPU Core / VRAM Instability',
      ram_instability: 'System RAM / XMP Instability',
      psu_droop: 'Voltage Rail Droop Under Load',
      cpu_thermal: 'CPU Thermal Throttling / Cooling Fail',
      psu_transient: 'Transient Spike Excursion (GPU Triggered)',
      motherboard_vr: 'Motherboard VRM Overheating',
      psu_overheating: 'PSU Thermal Protection (OTP) Triggered',
      thermal_throttling: 'System Thermal Throttling (CPU/GPU)',
      driver_issue: 'OS File Corruption or Driver State Failure',
      psu_ripple: 'High Voltage Ripple / Aging Capacitors',
      normal_resonance: 'Inductor Vibration (Normal Coil Whine)',
      psu_defect: 'PSU Inductor Defect (Abnormal Coil Whine)',
      psu_aging: 'Capacitor Wear & Tear (PSU Aging)',
      dirty_power: 'Dirty AC Wall Power / Harmonic Ripple',
      cpu_voltage_droop: 'CPU Vcore Droop / Unstable Overclock'
    }
  },
  de: {
    selectSymptomHeading: 'Welches Hauptsymptom tritt bei Ihrem PC auf?',
    hardwareProfileHeading: 'Hardware-Profil konfigurieren',
    hardwareProfileSubtitle: 'Die Angabe von Alter und Qualitätsstufe des Netzteils kalibriert die Verschleiß- und Alterungsberechnung.',
    psuAgeLabel: 'Netzteil-Alter:',
    yearsSuffix: 'Jahre',
    qualityTierLabel: 'Netzteil-Qualitätsstufe (Tier):',
    gpuLabel: 'Grafikkarte (GPU):',
    backBtn: 'Zurück',
    nextStepBtn: 'Nächster Schritt',
    previousQuestionBtn: '← Vorherige Frage',
    questionOf: (curr, total) => `Frage ${curr} von ${total}`,
    completePercent: (pct) => `${pct}% Abgeschlossen`,
    criticalSafetyTitle: '⚠️ KRITISCHE ELEKTRISCHE SICHERHEITSWARNUNG',
    criticalSafetyWarning: 'Versuchen Sie NICHT, den PC einzuschalten oder am Stromnetz angeschlossen zu lassen.',
    criticalSafetyStep1: 'Schalten Sie sofort den Netzschalter auf der Rückseite des Netzteils aus.',
    criticalSafetyStep2: 'Ziehen Sie das Netzkabel aus der Steckdose.',
    criticalSafetyStep3: 'Warten Sie mindestens 30 Minuten, bis sich die Kondensatoren entladen haben.',
    criticalSafetyStep4: 'Verwenden Sie dieses Netzteil keinesfalls weiter; es muss ersetzt werden.',
    restartDiagnosisBtn: 'Diagnose neu starten',
    findReplacementPsuBtn: 'Ersatz-Netzteil finden',
    resultsHeading: '📊 Differential-Diagnose-Ergebnisse',
    matchSuffix: '% Übereinstimmung',
    recommendedActionHeading: '💡 Handlungsempfehlung:',
    eeatDisclaimer: 'Hardware-Diagnose-Hinweis: Dieses Werkzeug nutzt ein regelbasiertes Modell zur Eingrenzung defekter Komponenten. Überprüfen Sie vor einem Kauf stets die Messwerte mit einem Multimeter.',
    tierNames: {
      A: 'Tier A (High-End)',
      B: 'Tier B (Mittelklasse)',
      C: 'Tier C (Budget)',
      Avoid: 'Vermeiden (Minderwertig)'
    },
    symptoms: {
      'no-power': {
        name: 'Kein Strom / Komplett tot',
        description: 'Keine LEDs, kein Lüfteranlauf, keinerlei Reaktion beim Drücken des Einschaltknopfes.'
      },
      'shut-down-gaming': {
        name: 'Plötzliches Abschalten unter Last / Gaming',
        description: 'PC schaltet sich bei anspruchsvollen Spielen oder Benchmarks ohne Bluescreen abrupt ab.'
      },
      'bsod-crashes': {
        name: 'Häufige Bluescreens (BSOD) & Abstürze',
        description: 'Wiederkehrende Windows-Fehler (WHEA_UNCORRECTABLE_ERROR, KERNEL_SECURITY_CHECK).'
      },
      'coil-whine': {
        name: 'Lautes Spulenfiepen / Hochfrequentes Summen',
        description: 'Elektrisches Surren oder Fiepen aus dem Netzteil oder der GPU bei hohen Bildraten.'
      },
      'burning-smell': {
        name: 'Brandgeruch / Funken / Rauch',
        description: 'Stechender Geruch nach verschmortem Kunststoff, Funkenbildung oder Rauchentwicklung.'
      }
    },
    causeTitles: {
      psu_failure: 'Komponentenausfall im Netzteil',
      front_panel: 'Defekter Front-Panel-Taster / Verkabelung',
      outlet_issue: 'Defekte Steckdose oder Netzkabel',
      short_circuit: 'Kurzschlussschutz (SCP) aktiv',
      psu_overload: 'Schienen-Überlastung / Zu geringe Watt-Kapazität',
      motherboard_dead: 'Mainboard VRM- oder Chipsatz-Defekt',
      psu_protection: 'Überstromschutz (OCP) ausgelöst',
      gpu_instability: 'GPU-Kern- / VRAM-Instabilität',
      ram_instability: 'Arbeitsspeicher- / XMP-Instabilität',
      psu_droop: 'Spannungsabfall unter Last (Vdrop)',
      cpu_thermal: 'CPU-Überhitzung / Kühler-Defekt',
      psu_transient: 'Transiente Lastspitze (GPU-Spike)',
      motherboard_vr: 'Mainboard-Spannungswandler überhitzt',
      psu_overheating: 'Überhitzungsschutz (OTP) ausgelöst',
      thermal_throttling: 'Thermisches Drosseln (CPU/GPU)',
      driver_issue: 'Grafiktreiber- oder Betriebssystemfehler',
      psu_ripple: 'Hohe Restwelligkeit / Kondensatoralterung',
      normal_resonance: 'Induktor-Vibration (Normales Spulenfiepen)',
      psu_defect: 'Defekte Drosselspule (Abnormales Spulenfiepen)',
      psu_aging: 'Kondensator-Alterung & Verschleiß',
      dirty_power: 'Unsaubere Netzspannung / Oberschwingungen',
      cpu_voltage_droop: 'CPU Vcore Spannungsabfall'
    }
  },
  es: {
    selectSymptomHeading: '¿Cuál es el síntoma principal que experimenta tu PC?',
    hardwareProfileHeading: 'Configurar Perfil de Hardware',
    hardwareProfileSubtitle: 'Indicar la antigüedad y la calidad de la fuente permite calibrar los índices de degradación.',
    psuAgeLabel: 'Antigüedad de la Fuente:',
    yearsSuffix: 'Años',
    qualityTierLabel: 'Nivel de Calidad de la Fuente:',
    gpuLabel: 'Tarjeta Gráfica (GPU):',
    backBtn: 'Atrás',
    nextStepBtn: 'Siguiente Paso',
    previousQuestionBtn: '← Pregunta Anterior',
    questionOf: (curr, total) => `Pregunta ${curr} de ${total}`,
    completePercent: (pct) => `${pct}% Completado`,
    criticalSafetyTitle: '⚠️ ALERTA CRÍTICA DE SEGURIDAD ELÉCTRICA',
    criticalSafetyWarning: 'NO intentes encender el ordenador ni lo dejes conectado a la toma de corriente.',
    criticalSafetyStep1: 'Apaga inmediatamente el interruptor trasero de la fuente (PSU).',
    criticalSafetyStep2: 'Desconecta el cable de alimentación de la toma de corriente de la pared.',
    criticalSafetyStep3: 'Espera al menos 30 minutos a que se descarguen los condensadores antes de manipularlo.',
    criticalSafetyStep4: 'No vuelvas a utilizar esta fuente; debe sustituirse por seguridad.',
    restartDiagnosisBtn: 'Reiniciar Diagnóstico',
    findReplacementPsuBtn: 'Buscar Fuente de Sustitución',
    resultsHeading: '📊 Resultados del Diagnóstico Diferencial',
    matchSuffix: '% Coincidencia',
    recommendedActionHeading: '💡 Acción Recomendada:',
    eeatDisclaimer: 'Aviso de Diagnóstico: Esta herramienta utiliza un modelo probabilístico para identificar componentes defectuosos. Confirma siempre los valores de voltaje antes de sustituir hardware.',
    tierNames: {
      A: 'Nivel A (Gama Alta)',
      B: 'Nivel B (Gama Media)',
      C: 'Nivel C (Básico)',
      Avoid: 'Evitar (Baja Calidad)'
    },
    symptoms: {
      'no-power': {
        name: 'Sin Corriente / Completamente Apagado',
        description: 'Sin luces, sin giro de ventiladores y falta total de respuesta al pulsar el botón de encendido.'
      },
      'shut-down-gaming': {
        name: 'Apagado Repentino Bajo Carga / Juegos',
        description: 'El PC se apaga o reinicia bruscamente durante juegos exigentes o renders sin pantallazo azul.'
      },
      'bsod-crashes': {
        name: 'Pantallazos Azules (BSOD) y Bloqueos',
        description: 'Errores frecuentes en Windows (WHEA_UNCORRECTABLE_ERROR, KERNEL_SECURITY_CHECK).'
      },
      'coil-whine': {
        name: 'Zumbido Eléctrico / Coil Whine Fuerte',
        description: 'Chirrido o zumbido agudo procedente de la fuente o la GPU al aumentar los fotogramas.'
      },
      'burning-smell': {
        name: 'Olor a Quemado / Chispas / Humo',
        description: 'Olor intenso a plástico quemado, chispas visibles o humo saliendo de la fuente.'
      }
    },
    causeTitles: {
      psu_failure: 'Fallo de Componente en la Fuente de Alimentación',
      front_panel: 'Pulsador o Cables del Panel Frontal Defectuosos',
      outlet_issue: 'Fallo en Toma de Pared o Cable de Corriente',
      short_circuit: 'Protección Contra Cortocircuitos (SCP) Activa',
      psu_overload: 'Sobrecarga de Raíl / Capacidad de Vatios Insuficiente',
      motherboard_dead: 'Fallo en VRM o Chipset de la Placa Base',
      psu_protection: 'Protección Contra Sobrecorriente (OCP) Activada',
      gpu_instability: 'Inestabilidad en Núcleo / VRAM de la GPU',
      ram_instability: 'Inestabilidad en Memoria RAM / Perfil XMP',
      psu_droop: 'Caída de Voltaje en Raíles Bajo Carga',
      cpu_thermal: 'Sobrecalentamiento de CPU / Fallo de Disipación',
      psu_transient: 'Pico Transitorio de Potencia (Activado por GPU)',
      motherboard_vr: 'Sobrecalentamiento del VRM de la Placa',
      psu_overheating: 'Protección Térmica (OTP) de Fuente Activada',
      thermal_throttling: 'Estrangulamiento Térmico (CPU/GPU)',
      driver_issue: 'Error de Controladores o Corrupción de Sistema',
      psu_ripple: 'Rizado de Voltaje Elevado / Condensadores Degradados',
      normal_resonance: 'Vibración de Bobinas (Coil Whine Normal)',
      psu_defect: 'Defecto en Bobina Inductora (Coil Whine Anormal)',
      psu_aging: 'Envejecimiento y Desgaste de Condensadores',
      dirty_power: 'Corriente de Red Inestable / Armónicos Eléctricos',
      cpu_voltage_droop: 'Caída de Voltaje Vcore del Procesador'
    }
  },
  fr: {
    selectSymptomHeading: 'Quel est le symptôme principal de votre PC ?',
    hardwareProfileHeading: 'Configurer le Profil Matériel',
    hardwareProfileSubtitle: 'Indiquer l\'âge et la gamme de l\'alimentation permet d\'ajuster les indices d\'usure des condensateurs.',
    psuAgeLabel: 'Âge de l\'Alimentation :',
    yearsSuffix: 'Ans',
    qualityTierLabel: 'Gamme de Qualité de l\'Alimentation :',
    gpuLabel: 'Carte Graphique (GPU) :',
    backBtn: 'Retour',
    nextStepBtn: 'Étape Suivante',
    previousQuestionBtn: '← Question Précédente',
    questionOf: (curr, total) => `Question ${curr} sur ${total}`,
    completePercent: (pct) => `${pct}% Complété`,
    criticalSafetyTitle: '⚠️ ALERTE DE SÉCURITÉ ÉLECTRIQUE CRITIQUE',
    criticalSafetyWarning: 'Ne tentez PAS d\'allumer l\'ordinateur ni de le laisser branché sur secteur.',
    criticalSafetyStep1: 'Basculez immédiatement l\'interrupteur situé à l\'arrière du bloc d\'alimentation sur 0.',
    criticalSafetyStep2: 'Débranchez le cordon d\'alimentation de la prise murale.',
    criticalSafetyStep3: 'Attendez au moins 30 minutes que les condensateurs se déchargent.',
    criticalSafetyStep4: 'Ne réutilisez pas cette alimentation ; elle doit être remplacée.',
    restartDiagnosisBtn: 'Recommencer le Diagnostic',
    findReplacementPsuBtn: 'Trouver une Alimentation de Remplacement',
    resultsHeading: '📊 Résultats du Diagnostic Différentiel',
    matchSuffix: '% Correspondance',
    recommendedActionHeading: '💡 Action Recommandée :',
    eeatDisclaimer: 'Avertissement Technique : Cet outil utilise un moteur probabiliste pour cibler les anomalies matérielles. Vérifiez toujours la stabilité des tensions avant d\'acheter du matériel de remplacement.',
    tierNames: {
      A: 'Tier A (Haut de Gamme)',
      B: 'Tier B (Milieu de Gamme)',
      C: 'Tier C (Entrée de Gamme)',
      Avoid: 'À Éviter (Bas de Gamme)'
    },
    symptoms: {
      'no-power': {
        name: 'Aucun Courant / Totalement Inerte',
        description: 'Pas de voyants, aucun ventilateur ne tourne, aucune réaction au bouton d\'alimentation.'
      },
      'shut-down-gaming': {
        name: 'Extinction Brutale en Jeu / Forte Charge',
        description: 'Le PC s\'éteint ou redémarre instantanément lors des jeux 3D exigeants sans écran bleu.'
      },
      'bsod-crashes': {
        name: 'Écrans Bleus (BSOD) & Crashs Fréquents',
        description: 'Erreurs Windows récurrentes (WHEA_UNCORRECTABLE_ERROR, KERNEL_SECURITY_CHECK).'
      },
      'coil-whine': {
        name: 'Grésillement Électrique / Coil Whine Fort',
        description: 'Bruit aigu ou sifflement électrique émis par l\'alimentation ou le GPU lors des montées en FPS.'
      },
      'burning-smell': {
        name: 'Odeur de Brûlé / Étincelles / Fumée',
        description: 'Odeur de plastique brûlé, étincelles visibles ou fumée provenant de l\'alimentation.'
      }
    },
    causeTitles: {
      psu_failure: 'Défaillance d\'un Composant de l\'Alimentation',
      front_panel: 'Bouton ou Câblage du Panneau Avant Défectueux',
      outlet_issue: 'Prise Secteur Murale ou Cordon Défectueux',
      short_circuit: 'Protection Court-Circuit (SCP) Active',
      psu_overload: 'Surcharge de Rail / Puissance Insuffisante',
      motherboard_dead: 'Panne VRM ou Chipset de la Carte Mère',
      psu_protection: 'Protection Surintensité (OCP) Déclenchée',
      gpu_instability: 'Instabilité du GPU ou de la VRAM',
      ram_instability: 'Instabilité de la Mémoire RAM / Profil XMP',
      psu_droop: 'Chute de Tension sous Forte Charge',
      cpu_thermal: 'Surchauffe CPU / Défaillance du Refroidissement',
      psu_transient: 'Pic Transitoire de Puissance (Généré par le GPU)',
      motherboard_vr: 'Surchauffe des VRM de la Carte Mère',
      psu_overheating: 'Protection Thermique (OTP) Déclenchée',
      thermal_throttling: 'Étranglement Thermique (CPU/GPU)',
      driver_issue: 'Crash de Pilote Graphique ou du Système',
      psu_ripple: 'Ondulation Résiduelle Élevée / Condensateurs Usés',
      normal_resonance: 'Vibration des Bobines (Coil Whine Normal)',
      psu_defect: 'Bobine Défectueuse (Coil Whine Anormal)',
      psu_aging: 'Usure & Vieillissement des Condensateurs',
      dirty_power: 'Courant Secteur Parasité / Harmoniques',
      cpu_voltage_droop: 'Chute de Tension Vcore Processeur'
    }
  },
  ja: {
    selectSymptomHeading: 'PCに発生している主な症状を選択してください',
    hardwareProfileHeading: 'ハードウェア構成の設定',
    hardwareProfileSubtitle: '電源ユニットの使用年数と品質グレードを設定することで、コンデンサ経年劣化を診断に反映します。',
    psuAgeLabel: '電源の使用年数:',
    yearsSuffix: '年',
    qualityTierLabel: '電源の品質ティア:',
    gpuLabel: 'グラフィックボード (GPU):',
    backBtn: '戻る',
    nextStepBtn: '次のステップ',
    previousQuestionBtn: '← 前の質問',
    questionOf: (curr, total) => `質問 ${curr} / ${total}`,
    completePercent: (pct) => `${pct}% 完了`,
    criticalSafetyTitle: '⚠️ 重大な電気的危険アラート',
    criticalSafetyWarning: 'PCの起動を試みたり、コンセントに接続したまま放置しないでください。',
    criticalSafetyStep1: '直ちに電源ユニット背面の主電源スイッチをOFFにしてください。',
    criticalSafetyStep2: '壁のコンセントからAC電源コードを抜いてください。',
    criticalSafetyStep3: '内部コンデンサが放電するまで、最低30分間待機してください。',
    criticalSafetyStep4: 'この電源ユニットを再使用しないでください。直ちに交換が必要です。',
    restartDiagnosisBtn: '診断をやり直す',
    findReplacementPsuBtn: '交換用電源を探す',
    resultsHeading: '📊 推定原因の診断結果',
    matchSuffix: '% 一致',
    recommendedActionHeading: '💡 推奨される対処方法:',
    eeatDisclaimer: 'ハードウェア診断に関する注意事項：本ツールは確率アルゴリズムに基づいて不具合箇所を推定します。パーツ交換前に必ず電圧測定や最小構成テストを実施してください。',
    tierNames: {
      A: 'Tier A (ハイエンド)',
      B: 'Tier B (ミドルレンジ)',
      C: 'Tier C (エントリー)',
      Avoid: '回避推奨 (低品質)'
    },
    symptoms: {
      'no-power': {
        name: '電源が入らない / 完全に無反応',
        description: 'LEDが点灯せず、ファンも回らず、電源ボタンを押しても一切反応しない。'
      },
      'shut-down-gaming': {
        name: '高負荷時・ゲーム中の突然のシャットダウン',
        description: '高負荷ゲームやベンチマーク実行中に、ブルースクリーンなしで電源が突然落ちる。'
      },
      'bsod-crashes': {
        name: '頻繁なブルースクリーン (BSOD) とフリーズ',
        description: 'WHEA_UNCORRECTABLE_ERRORやKERNEL_SECURITY_CHECKなどのエラーが頻発する。'
      },
      'coil-whine': {
        name: '異音・高周波のコイル鳴き',
        description: 'フレームレート上昇時に電源やグラフィックボードから「ジー」「キーン」と高周波ノイズが鳴る。'
      },
      'burning-smell': {
        name: '焦げ臭い・火花・煙の発生',
        description: '電源ユニット周辺からプラスチックの焦げた匂い、火花、または煙が出ている。'
      }
    },
    causeTitles: {
      psu_failure: '電源ユニット内部パーツの故障',
      front_panel: 'フロントパネルスイッチ・配線の断線・不良',
      outlet_issue: '壁コンセント・電源コードの接触不良',
      short_circuit: '短絡保護回路 (SCP) の作動',
      psu_overload: '電源出力不足・過負荷',
      motherboard_dead: 'マザーボードVRM・チップセットの故障',
      psu_protection: '過電流保護 (OCP) の作動',
      gpu_instability: 'GPUコア / VRAMの不安定動作',
      ram_instability: 'メインメモリ / XMP設定の不安定',
      psu_droop: '高負荷時の電圧降下 (Volt Droop)',
      cpu_thermal: 'CPU熱暴走 / クーラー冷却不良',
      psu_transient: '瞬時スパイク電力によるシャットダウン',
      motherboard_vr: 'マザーボード電源回路 (VRM) の過熱',
      psu_overheating: '電源過熱保護 (OTP) の作動',
      thermal_throttling: 'サーマルスロットリング (熱飽和)',
      driver_issue: 'グラフィックドライバ / OSの不具合',
      psu_ripple: '電圧リップル過大・コンデンサ劣化',
      normal_resonance: 'インダクタ振動（正常なコイル鳴き）',
      psu_defect: 'コイル破損（異常なコイル鳴き）',
      psu_aging: '電解コンデンサの経年劣化',
      dirty_power: 'AC商用電源の電圧不安定・ノイズ',
      cpu_voltage_droop: 'CPUコア電圧の低下・OC不安定'
    }
  },
  zh: {
    selectSymptomHeading: '您的电脑当前遇到的主要故障表现是什么？',
    hardwareProfileHeading: '配置硬件特征档案',
    hardwareProfileSubtitle: '填写电源使用年限与品质梯队，帮助诊断引擎校准电容老化衰减系数。',
    psuAgeLabel: '电源使用年限:',
    yearsSuffix: '年',
    qualityTierLabel: '电源品质梯队 (Tier):',
    gpuLabel: '独立显卡 (GPU):',
    backBtn: '返回上一页',
    nextStepBtn: '下一步',
    previousQuestionBtn: '← 上一个问题',
    questionOf: (curr, total) => `问题 ${curr} / ${total}`,
    completePercent: (pct) => `${pct}% 完成`,
    criticalSafetyTitle: '⚠️ 严重电气安全警报',
    criticalSafetyWarning: '严禁尝试开机通电，切勿让主机继续连接墙插电源！',
    criticalSafetyStep1: '立即关闭电源背部的物理 I/O 翘板开关。',
    criticalSafetyStep2: '拔掉墙面插座上的 AC 交流电源线。',
    criticalSafetyStep3: '静置等待至少 30 分钟，待大电容完全放电后再拆卸零件。',
    criticalSafetyStep4: '切勿继续使用该电源，必须进行更换。',
    restartDiagnosisBtn: '重新开始诊断',
    findReplacementPsuBtn: '寻找适配替换电源',
    resultsHeading: '📊 鉴别诊断分析报告',
    matchSuffix: '% 吻合度',
    recommendedActionHeading: '💡 专家建议排查方案:',
    eeatDisclaimer: '硬件诊断免责声明：本工具基于加权规则引擎排查故障部件。在购买更换硬件之前，建议先使用万用表或替换法交叉验证。',
    tierNames: {
      A: 'Tier A (旗舰高端)',
      B: 'Tier B (主流金牌)',
      C: 'Tier C (入门性价比)',
      Avoid: '避免购买 (劣质山寨)'
    },
    symptoms: {
      'no-power': {
        name: '完全无法通电 / 毫无反应',
        description: '按开机键无任何灯光亮起、风扇不转，主机彻底断电无响应。'
      },
      'shut-down-gaming': {
        name: '高负载/玩游戏时突发断电黑屏',
        description: '在运行大型3D游戏或渲染跑分时，电脑突然黑屏关机或自动重启，无蓝屏提示。'
      },
      'bsod-crashes': {
        name: '频繁蓝屏死机 (BSOD) 与系统崩溃',
        description: '频繁跳出 WHEA_UNCORRECTABLE_ERROR、KERNEL_SECURITY_CHECK 等蓝屏代码。'
      },
      'coil-whine': {
        name: '严重啸叫 / 高频电流声',
        description: '高帧率运行时，电源或显卡内部发出刺耳的“滋滋”或高频电感震鸣声。'
      },
      'burning-smell': {
        name: '有焦糊味 / 冒火花 / 冒烟',
        description: '电源内部发出刺鼻塑料烧焦味，甚至看到明显电火花或白烟。'
      }
    },
    causeTitles: {
      psu_failure: '电源内部元器件击穿损坏',
      front_panel: '机箱前置开机按键/跳线接触不良',
      outlet_issue: '外部墙插供电异常或电源线故障',
      short_circuit: '短路保护机制 (SCP) 持续触发',
      psu_overload: '电源路数过载 / 额定额定功率不足',
      motherboard_dead: '主板供电VRM或芯片组击穿损坏',
      psu_protection: '过流保护 (OCP) 突发触发',
      gpu_instability: '显卡核心或显存(VRAM)不稳定',
      ram_instability: '内存颗粒不稳定或XMP超频报错',
      psu_droop: '重载下电源各路电压大幅跌落',
      cpu_thermal: 'CPU过热撞温度墙 / 散热器失效',
      psu_transient: '显卡瞬态尖峰脉冲触发保护',
      motherboard_vr: '主板供电电感及MOS管过热',
      psu_overheating: '电源过温保护 (OTP) 触发',
      thermal_throttling: '整机过热保护降频 (CPU/GPU)',
      driver_issue: '显卡驱动崩溃或操作系统文件损坏',
      psu_ripple: '电压纹波过大 / 滤波电容老化失效',
      normal_resonance: '电感线圈高频共振 (正常电感啸叫)',
      psu_defect: '电源电感封装开裂 (异常啸叫缺陷)',
      psu_aging: '电解电容严重老化电解液干涸',
      dirty_power: '市电电压波动过大 / 电网高次谐波',
      cpu_voltage_droop: 'CPU核心供电电压掉压过大'
    }
  }
};

export function getDiagnosticTranslations(lang: Locale) {
  return DIAGNOSTIC_TRANSLATIONS[lang] || DIAGNOSTIC_TRANSLATIONS.en;
}
