import type { Locale } from './locales';

export interface LocalizedGuideLink {
  name: string;
  href: string;
  desc: string;
}

export interface LocalizedGuideCategory {
  title: string;
  description: string;
  links: LocalizedGuideLink[];
}

export interface GuideHubData {
  pageTitle: string;
  heroTitle: string;
  heroHighlight: string;
  pageSubtitle: string;
  matchmakerBadge: string;
  matchmakerTitle: string;
  matchmakerDesc: string;
  budgetFinderBadge: string;
  budgetFinderTitle: string;
  budgetFinderDesc: string;
  categories: LocalizedGuideCategory[];
}

export const GUIDE_TRANSLATIONS: Record<Locale, GuideHubData> = {
  en: {
    pageTitle: 'PC Hardware & Power Sizing Guides Library — PSUCheck',
    heroTitle: 'PSUCheck Hardware',
    heroHighlight: 'Guides Library',
    pageSubtitle: 'Expert, independent engineering guides on power delivery, component sizing, safety protocols, and PC assembly best practices. Based on published Cybenetics efficiency and transient data.',
    matchmakerBadge: 'PSU Matchmaker',
    matchmakerTitle: 'GPU PSU Sizing Finder →',
    matchmakerDesc: 'Find safe wattage & connector recommendations for RTX 50-series and older GPUs.',
    budgetFinderBadge: 'Budget PSU Finder',
    budgetFinderTitle: 'Best PSUs Under a Budget →',
    budgetFinderDesc: 'Filter top power supplies under $100, $150, $200, or $300 ranked by value score.',
    categories: [
      {
        title: '⚡ PSU Sizing & Power Diagnostics',
        description: 'Detailed guides on hardware power draw, transients, noise levels, and lifespan analysis.',
        links: [
          { name: 'PSU Sizing Guide', href: '/guides/psu-sizing-guide', desc: 'Learn how to calculate recommended wattage with transient buffers.' },
          { name: '750W vs 850W PSU: Which Do You Need?', href: '/guides/750w-vs-850w-psu', desc: 'Compare safety margins, efficiency curves, and cost difference.' },
          { name: 'PC Idle Power Analysis', href: '/guides/pc-idle-power', desc: 'Understand C-states, motherboard chipset draws, and idle optimization.' },
          { name: 'PC Hardware Bottlenecks', href: '/guides/pc-bottleneck-guide', desc: 'Balance your CPU and GPU configurations to prevent power bottlenecks.' },
          { name: 'AIO Liquid Cooler Power Draw', href: '/guides/aio-cooler-power-draw', desc: 'Calculate pump amperage limits and radiator fan power consumption.' },
          { name: 'Overclocking Sizing Constraints', href: '/guides/overclocking-power-draw', desc: 'How overvolting and boost limits impact system wattage.' },
          { name: 'How to Test a PSU Safely', href: '/guides/how-to-test-a-psu', desc: 'Step-by-step jumpstart paperclip test and rail troubleshooting.' },
          { name: 'PSU Lifespan & Aging', href: '/guides/psu-lifespan', desc: 'How electrolytic capacitor degradation affects maximum output.' },
          { name: 'Quiet PSU Sizing Guide', href: '/guides/quiet-psu-guide', desc: 'Fluid dynamic bearings, ECO fan profiles, and noise levels.' },
          { name: 'PC Power Delivery Glossary', href: '/guides/power-glossary', desc: 'Master the definitions of TDP, TBP, transient spikes, and Active PFC.' }
        ]
      },
      {
        title: '🔌 Power Standards, Cables & Safety',
        description: 'Understanding ATX 3.1, connectors, custom extensions, and power quality.',
        links: [
          { name: 'ATX 3.1 & 12V-2x6 Guide', href: '/guides/atx-3-1-guide', desc: 'The definitive guide to the new ATX 3.1 safety and power standards.' },
          { name: '80 PLUS Efficiency Guide', href: '/guides/psu-efficiency-guide', desc: 'Analyze Bronze, Gold, and Platinum efficiency tier differences.' },
          { name: 'Cybenetics vs 80 PLUS', href: '/guides/cybenetics-vs-80-plus', desc: 'Why Cybenetics tests are more reliable than traditional 80 PLUS.' },
          { name: 'GPU Power Connectors', href: '/guides/gpu-power-connectors', desc: 'Analyze 8-pin, 12VHPWR, and native 12V-2x6 cable safety.' },
          { name: 'Single Rail vs Multi-Rail PSUs', href: '/guides/single-vs-multi-rail', desc: 'Understand +12V rail currents, OCP triggers, and safety.' },
          { name: 'Custom Cables & Extensions', href: '/guides/psu-cable-extensions', desc: 'Avoid hardware failures: replacement pins, modular grids, and AWG gauges.' },
          { name: 'PSU Cable Pinout Compatibility', href: '/guides/psu-cable-compatibility', desc: 'Why modular cables are non-interchangeable and how to avoid frying hardware.' },
          { name: 'UPS & Surge Protection Sizing', href: '/guides/ups-backup-power', desc: 'How to size a backup battery for high-end gaming rigs.' }
        ]
      },
      {
        title: '🖥️ PC Building & Budgeting',
        description: 'Practical assembly instructions, budget templates, and form factor compatibility.',
        links: [
          { name: 'How to Build a PC (Step-by-Step)', href: '/guides/how-to-build-a-pc', desc: 'Complete builder walkthrough from unboxing to first boot.' },
          { name: 'Best PSU for Gaming 2026', href: '/guides/best-psu-for-gaming', desc: 'Explore our editorial recommendations categorized by quality tiers.' },
          { name: 'Hardware Building Tips', href: '/guides/building-tips', desc: 'Stand-off alignments, post testing, and thermal paste advice.' },
          { name: 'PC Budget Allocation Guide', href: '/guides/budget-guide', desc: 'Optimal cost distributions for $500 to $2000+ custom systems.' },
          { name: 'Modular vs Non-Modular PSUs', href: '/guides/modular-vs-non-modular-psu', desc: 'Choose the right cable layout format for your build case.' },
          { name: 'SFX vs ATX Form Factors', href: '/guides/sfx-vs-atx-psu', desc: 'Compare desktop standard units with small form factor configurations.' },
          { name: 'SFX-L Case Clearances', href: '/guides/sfx-l-psu-guide', desc: 'Understand deeper SFX form factor layouts and case fitment limits.' },
          { name: 'Passive & Fanless Power Supplies', href: '/guides/fanless-psu-guide', desc: 'Passive thermal management for fully silent desktop builds.' },
          { name: 'Server vs Desktop PSUs', href: '/guides/server-vs-desktop-psu', desc: 'RED redundancy, 1U/2U form factors, and noise comparisons.' },
          { name: 'PSU Fan Intake Direction', href: '/guides/psu-fan-direction', desc: 'Airflow guides: should your PSU fan face up or down?' }
        ]
      }
    ]
  },
  de: {
    pageTitle: 'PC-Hardware & Netzteil-Ratgeber — PSUCheck',
    heroTitle: 'PSUCheck Hardware',
    heroHighlight: 'Ratgeber-Bibliothek',
    pageSubtitle: 'Unabhängige technische Leitfäden zu Spannungsversorgung, Lastspitzen, Sicherheitsstandards und PC-Montage. Basierend auf Cybenetics-Effizienz- und Transientenmessungen.',
    matchmakerBadge: 'Netzteil-Finder',
    matchmakerTitle: 'GPU-Netzteil-Dimensionierung →',
    matchmakerDesc: 'Sichere Wattleistungen und Stecker-Empfehlungen für RTX 50-Karten und ältere GPUs ermitteln.',
    budgetFinderBadge: 'Budget-Finder',
    budgetFinderTitle: 'Beste Netzteile nach Preisrahmen →',
    budgetFinderDesc: 'Top-Netzteile unter 100€, 150€, 200€ oder 300€ nach Preis-Leistungs-Score filtern.',
    categories: [
      {
        title: '⚡ Netzteil-Dimensionierung & Leistungsdiagnose',
        description: 'Detaillierte Anleitungen zu Leistungsaufnahme, Transienten, Lautstärke und Alterung.',
        links: [
          { name: 'Netzteil-Kaufberater', href: '/guides/psu-sizing-guide', desc: 'Erfahren Sie, wie Sie die empfohlene Wattleistung mit Sicherheitspuffern berechnen.' },
          { name: '750W vs 850W Netzteil: Was brauchen Sie?', href: '/guides/750w-vs-850w-psu', desc: 'Vergleich von Sicherheitsreserven, Effizienzkurven und Preisunterschieden.' },
          { name: 'PC-Ruhestrom-Analyse', href: '/guides/pc-idle-power', desc: 'C-States, Mainboard-Chipsatz-Verbrauch und Idle-Optimierung verstehen.' },
          { name: 'Hardware-Flaschenhälse erkennen', href: '/guides/pc-bottleneck-guide', desc: 'CPU- und GPU-Konfigurationen für maximale Effizienz ausbalancieren.' },
          { name: 'AIO-Wasserkühlung Leistungsaufnahme', href: '/guides/aio-cooler-power-draw', desc: 'Pumpenstromaufnahme und Lüfterverbrauch präzise berechnen.' },
          { name: 'Overclocking Strombedarf', href: '/guides/overclocking-power-draw', desc: 'Wie sich Übertaktung und Spannungserhöhung auf das Netzteil auswirken.' },
          { name: 'Netzteil sicher testen', href: '/guides/how-to-test-a-psu', desc: 'Schritt-für-Schritt Büroklammer-Test und Spannungsschienen-Fehlerbehebung.' },
          { name: 'Netzteil-Lebensdauer & Alterung', href: '/guides/psu-lifespan', desc: 'Wie Kondensator-Alterung die maximale Leistungsabgabe reduziert.' },
          { name: 'Leise Netzteile Ratgeber', href: '/guides/quiet-psu-guide', desc: 'FDB-Lager, ECO-Lüfterkurven und Geräuschpegel.' },
          { name: 'Stromversorgungs-Glossar', href: '/guides/power-glossary', desc: 'Definitionen von TDP, TBP, Transienten und Active PFC meistern.' }
        ]
      },
      {
        title: '🔌 Stromstandards, Kabel & Sicherheit',
        description: 'Alles über ATX 3.1, 12V-2x6 Anschlüsse, Kabel-Sleeves und Spannungsqualität.',
        links: [
          { name: 'ATX 3.1 & 12V-2x6 Ratgeber', href: '/guides/atx-3-1-guide', desc: 'Der definitive Leitfaden zu den neuen ATX 3.1 Sicherheitsstandards.' },
          { name: '80 PLUS Effizienz-Guide', href: '/guides/psu-efficiency-guide', desc: 'Unterschiede zwischen Bronze, Gold und Platinum Effizienzklassen.' },
          { name: 'Cybenetics vs 80 PLUS', href: '/guides/cybenetics-vs-80-plus', desc: 'Warum Cybenetics-Zertifizierungen präziser als 80 PLUS sind.' },
          { name: 'GPU-Stromanschlüsse', href: '/guides/gpu-power-connectors', desc: 'Sicherheit von 8-Pin, 12VHPWR und nativem 12V-2x6 Kabeln.' },
          { name: 'Single-Rail vs Multi-Rail Netzteile', href: '/guides/single-vs-multi-rail', desc: '+12V Schienenströme, OCP-Auslöser und Schutzschaltungen verstehen.' },
          { name: 'Custom-Kabel & Verlängerungen', href: '/guides/psu-cable-extensions', desc: 'Hardware-Schäden vermeiden: Pin-Layouts, AWG-Querschnitte und Risiken.' },
          { name: 'Kabel-Pinout Kompatibilität', href: '/guides/psu-cable-compatibility', desc: 'Warum modulare Netzteilkabel niemals getauscht werden dürfen.' },
          { name: 'USV & Überspannungsschutz', href: '/guides/ups-backup-power', desc: 'Wie Sie eine USV-Notstromversorgung für Gaming-PCs richtig dimensionieren.' }
        ]
      },
      {
        title: '🖥️ PC-Bau & Budgetplanung',
        description: 'Praktische Montage-Tipps, Budget-Vorlagen und Gehäuse-Kompatibilität.',
        links: [
          { name: 'PC selber bauen (Schritt-für-Schritt)', href: '/guides/how-to-build-a-pc', desc: 'Komplette Bauanleitung vom Auspacken bis zum ersten Einschalten.' },
          { name: 'Beste Netzteile für Gaming 2026', href: '/guides/best-psu-for-gaming', desc: 'Unsere redaktionellen Empfehlungen eingeteilt nach Qualitäts-Tiers.' },
          { name: 'Hardware-Bau-Tipps', href: '/guides/building-tips', desc: 'Abstandshalter, Wärmeleitpaste und Post-Code Diagnose.' },
          { name: 'PC Budget-Verteilungs-Guide', href: '/guides/budget-guide', desc: 'Optimale Kostenverteilung für Gaming-PCs von 500€ bis 2000€+.' },
          { name: 'Modular vs Nicht-Modular Netzteile', href: '/guides/modular-vs-non-modular-psu', desc: 'Wählen Sie das passende Kabelformat für Ihr Gehäuse.' },
          { name: 'SFX vs ATX Formfaktoren', href: '/guides/sfx-vs-atx-psu', desc: 'Standard-ATX und kompakte SFX-Netzteile im direkten Vergleich.' },
          { name: 'SFX-L Gehäuse-Passgenauigkeit', href: '/guides/sfx-l-psu-guide', desc: 'Tiefere SFX-L Abmessungen und Kompatibilitätsgrenzen verstehen.' },
          { name: 'Passive & Lüfterlose Netzteile', href: '/guides/fanless-psu-guide', desc: 'Lautlose Stromversorgung für geräuschlose PC-Setups.' },
          { name: 'Server- vs Desktop-Netzteile', href: '/guides/server-vs-desktop-psu', desc: 'Redundanz, 1U/2U Formate und Lautstärken-Vergleich.' },
          { name: 'Netzteil-Lüfter Einbaurichtung', href: '/guides/psu-fan-direction', desc: 'Optimaler Airflow: Soll der Netzteillüfter nach oben oder unten zeigen?' }
        ]
      }
    ]
  },
  es: {
    pageTitle: 'Biblioteca de Guías de Hardware y Fuentes — PSUCheck',
    heroTitle: 'Biblioteca de Guías',
    heroHighlight: 'Técnicas de Hardware',
    pageSubtitle: 'Guías independientes y rigurosas sobre suministro de energía, transitorios, normativas ATX 3.1 y montaje de PC.',
    matchmakerBadge: 'Buscador de Fuentes',
    matchmakerTitle: 'Calcular Fuente para GPU →',
    matchmakerDesc: 'Calcula los vatios y conectores seguros para la serie RTX 50 y generaciones previas.',
    budgetFinderBadge: 'Fuentes por Presupuesto',
    budgetFinderTitle: 'Mejores Fuentes por Precio →',
    budgetFinderDesc: 'Filtra fuentes de calidad por debajo de 100€, 150€, 200€ o 300€ clasificadas por valor.',
    categories: [
      {
        title: '⚡ Dimensionamiento de Fuentes y Diagnóstico',
        description: 'Guías detalladas sobre consumo de hardware, transitorios, sonoridad y análisis de vida útil.',
        links: [
          { name: 'Guía de Elección de Fuente (PSU)', href: '/guides/psu-sizing-guide', desc: 'Aprende a calcular los vatios recomendados con margen de seguridad.' },
          { name: 'Fuente de 750W vs 850W: ¿Cuál necesitas?', href: '/guides/750w-vs-850w-psu', desc: 'Compara márgenes de seguridad, curvas de eficiencia y precio.' },
          { name: 'Análisis de Consumo en Reposo', href: '/guides/pc-idle-power', desc: 'Estados C del procesador, consumo de la placa y optimización.' },
          { name: 'Cuellos de Botella de Hardware', href: '/guides/pc-bottleneck-guide', desc: 'Equilibra CPU y GPU para evitar caídas de rendimiento eléctrico.' },
          { name: 'Consumo de Refrigeración Líquida AIO', href: '/guides/aio-cooler-power-draw', desc: 'Calcula el consumo de la bomba y los ventiladores del radiador.' },
          { name: 'Límites de Potencia en Overclocking', href: '/guides/overclocking-power-draw', desc: 'Impacto del sobrevoltaje en el dimensionamiento de tu fuente.' },
          { name: 'Cómo Probar una Fuente de Forma Segura', href: '/guides/how-to-test-a-psu', desc: 'Prueba del clip paso a paso y comprobación de raíles.' },
          { name: 'Vida Útil y Envejecimiento de la Fuente', href: '/guides/psu-lifespan', desc: 'Cómo afecta la degradación de condensadores a la potencia real.' },
          { name: 'Guía de Fuentes Silenciosas', href: '/guides/quiet-psu-guide', desc: 'Rodamientos dinámicos fluidos, perfiles ECO y decibelios.' },
          { name: 'Glosario de Energía para PC', href: '/guides/power-glossary', desc: 'Domina los conceptos de TDP, TBP, picos de microsegundos y PFC Activo.' }
        ]
      },
      {
        title: '🔌 Estándares Eléctricos, Cables y Seguridad',
        description: 'Todo sobre ATX 3.1, conectores 12V-2x6, extensiones y calidad de corriente.',
        links: [
          { name: 'Guía Completa ATX 3.1 y 12V-2x6', href: '/guides/atx-3-1-guide', desc: 'La referencia definitiva sobre los nuevos estándares de seguridad ATX 3.1.' },
          { name: 'Guía de Eficiencia 80 PLUS', href: '/guides/psu-efficiency-guide', desc: 'Diferencias reales entre categorías Bronze, Gold y Platinum.' },
          { name: 'Cybenetics vs 80 PLUS', href: '/guides/cybenetics-vs-80-plus', desc: 'Por qué los informes de Cybenetics son más rigurosos y fiables.' },
          { name: 'Conectores de Corriente para GPU', href: '/guides/gpu-power-connectors', desc: 'Seguridad en cables de 8 pines, 12VHPWR y el nuevo 12V-2x6.' },
          { name: 'Fuentes Monorraíl vs Multirraíl', href: '/guides/single-vs-multi-rail', desc: 'Protecciones OCP, intensidades de raíl de 12V y seguridad.' },
          { name: 'Cables Personalizados y Extensiones', href: '/guides/psu-cable-extensions', desc: 'Evita fallos graves: pines de repuesto, calibres AWG y riesgos.' },
          { name: 'Compatibilidad de Pines en Cables', href: '/guides/psu-cable-compatibility', desc: 'Por qué nunca debes mezclar cables modulares de distintas marcas.' },
          { name: 'Dimensionamiento de SAIs y Baterías', href: '/guides/ups-backup-power', desc: 'Cómo elegir un SAI adecuado para proteger un PC gaming de gama alta.' }
        ]
      },
      {
        title: '🖥️ Montaje de PC y Presupuestos',
        description: 'Instrucciones paso a paso, plantillas de presupuesto y compatibilidad.',
        links: [
          { name: 'Cómo Montar un PC Paso a Paso', href: '/guides/how-to-build-a-pc', desc: 'Guía completa desde el desembalaje hasta el primer arranque.' },
          { name: 'Mejores Fuentes para Gaming 2026', href: '/guides/best-psu-for-gaming', desc: 'Nuestras recomendaciones editoriales ordenadas por niveles de calidad.' },
          { name: 'Consejos Prácticos de Ensamblaje', href: '/guides/building-tips', desc: 'Separadores, pasta térmica y pruebas de encendido previas.' },
          { name: 'Guía de Distribución de Presupuesto', href: '/guides/budget-guide', desc: 'Reparto óptimo del gasto para equipos de 500€ a más de 2000€.' },
          { name: 'Fuentes Modulares vs No Modulares', href: '/guides/modular-vs-non-modular-psu', desc: 'Elige el formato de cables más adecuado para tu caja.' },
          { name: 'Formatos SFX vs ATX Estándar', href: '/guides/sfx-vs-atx-psu', desc: 'Compara fuentes estándar ATX con formatos compactos SFX.' },
          { name: 'Espacio y Compatibilidad SFX-L', href: '/guides/sfx-l-psu-guide', desc: 'Dimensiones ampliadas SFX-L y compatibilidad con cajas pequeñas.' },
          { name: 'Fuentes Pasivas sin Ventilador', href: '/guides/fanless-psu-guide', desc: 'Refrigeración pasiva para ordenadores 100% silenciosos.' },
          { name: 'Fuentes de Servidor vs Sobremesa', href: '/guides/server-vs-desktop-psu', desc: 'Redundancia, factores de forma 1U/2U y sonoridad.' },
          { name: 'Orientación del Ventilador de la Fuente', href: '/guides/psu-fan-direction', desc: 'Flujo de aire: ¿Debe apuntar el ventilador hacia arriba o abajo?' }
        ]
      }
    ]
  },
  fr: {
    pageTitle: 'Guides et Références Techniques Matériel — PSUCheck',
    heroTitle: 'Bibliothèque de Guides',
    heroHighlight: 'Techniques PSUCheck',
    pageSubtitle: 'Articles d\'experts indépendants sur les transitoires, la norme ATX 3.1, la sécurité des câbles et l\'assemblage PC.',
    matchmakerBadge: 'Calculateur Alimentation',
    matchmakerTitle: 'Dimensionnement GPU & PSU →',
    matchmakerDesc: 'Trouvez la puissance et les connecteurs recommandés pour RTX série 50 et anciens GPU.',
    budgetFinderBadge: 'Filtre par Budget',
    budgetFinderTitle: 'Meilleures Alimentations par Prix →',
    budgetFinderDesc: 'Sélectionnez les meilleures alimentations sous 100€, 150€, 200€ ou 300€ par score d\'excellence.',
    categories: [
      {
        title: '⚡ Dimensionnement & Diagnostic d\'Alimentation',
        description: 'Guides complets sur la consommation, les transitoires, le niveau sonore et la durée de vie.',
        links: [
          { name: 'Guide de Choix d\'Alimentation', href: '/guides/psu-sizing-guide', desc: 'Calculez la puissance requise avec les marges de sécurité nécessaires.' },
          { name: 'Alimentation 750W vs 850W : Laquelle choisir ?', href: '/guides/750w-vs-850w-psu', desc: 'Comparez marges de sécurité, courbes de rendement et prix.' },
          { name: 'Consommation au Repos du PC', href: '/guides/pc-idle-power', desc: 'Comprendre les C-states, la carte mère et optimiser le repos.' },
          { name: 'Goulots d\'Étranglement Matériels', href: '/guides/pc-bottleneck-guide', desc: 'Équilibrez CPU et GPU pour éviter les instabilités électriques.' },
          { name: 'Consommation des Watercoolings AIO', href: '/guides/aio-cooler-power-draw', desc: 'Calcul de l\'ampérage de la pompe et des ventilateurs du radiateur.' },
          { name: 'Contraintes d\'Overclocking', href: '/guides/overclocking-power-draw', desc: 'Impact du survoltage sur la puissance d\'alimentation.' },
          { name: 'Tester son Alimentation en Sécurité', href: '/guides/how-to-test-a-psu', desc: 'Test au trombone pas à pas et diagnostic des tensions.' },
          { name: 'Durée de Vie & Vieillissement', href: '/guides/psu-lifespan', desc: 'Comment l\'usure des condensateurs diminue la puissance maximale.' },
          { name: 'Guide des Alimentations Silencieuses', href: '/guides/quiet-psu-guide', desc: 'Roulements FDB, profils de ventilation ECO et décibels.' },
          { name: 'Glossaire de l\'Alimentation PC', href: '/guides/power-glossary', desc: 'Maîtrisez les notions de TDP, TBP, pics transitoires et PFC Actif.' }
        ]
      },
      {
        title: '🔌 Normes Électriques, Câbles & Sécurité',
        description: 'Tout savoir sur l\'ATX 3.1, le 12V-2x6, les câbles et la qualité du courant.',
        links: [
          { name: 'Guide ATX 3.1 & 12V-2x6', href: '/guides/atx-3-1-guide', desc: 'Le guide complet des nouvelles normes de sécurité électrique ATX 3.1.' },
          { name: 'Guide du Rendement 80 PLUS', href: '/guides/psu-efficiency-guide', desc: 'Différences réelles entre les labels Bronze, Gold et Platinum.' },
          { name: 'Cybenetics vs 80 PLUS', href: '/guides/cybenetics-vs-80-plus', desc: 'Pourquoi les rapports Cybenetics sont plus fiables que 80 PLUS.' },
          { name: 'Connecteurs d\'Alimentation GPU', href: '/guides/gpu-power-connectors', desc: 'Sécurité des câbles 8 broches, 12VHPWR et 12V-2x6 natif.' },
          { name: 'Monorail vs Multirail', href: '/guides/single-vs-multi-rail', desc: 'Comprendre les rails +12V, les déclencheurs OCP et la sécurité.' },
          { name: 'Rallonges & Câbles Personnalisés', href: '/guides/psu-cable-extensions', desc: 'Évitez les pannes matérielles : sections AWG et risques de court-circuit.' },
          { name: 'Compatibilité des Câbles Modulaires', href: '/guides/psu-cable-compatibility', desc: 'Pourquoi il ne faut jamais mélanger les câbles de marques différentes.' },
          { name: 'Dimensionnement d\'Onduleurs (UPS)', href: '/guides/ups-backup-power', desc: 'Comment choisir une batterie de secours adaptée aux PC de jeu haut de gamme.' }
        ]
      },
      {
        title: '🖥️ Assemblage PC & Budget',
        description: 'Tutoriels de montage pratiques, allocation de budget et compatibilité.',
        links: [
          { name: 'Monter son PC Pas à Pas', href: '/guides/how-to-build-a-pc', desc: 'Guide complet du déballage des composants au premier démarrage.' },
          { name: 'Meilleures Alimentations Gaming 2026', href: '/guides/best-psu-for-gaming', desc: 'Nos recommandations classées par niveaux d\'excellence.' },
          { name: 'Conseils Pratiques de Montage', href: '/guides/building-tips', desc: 'Entretoises, pâte thermique et tests préalables hors boîtier.' },
          { name: 'Guide d\'Allocation de Budget PC', href: '/guides/budget-guide', desc: 'Répartition optimale pour des configurations de 500€ à plus de 2000€.' },
          { name: 'Alimentations Modulaires vs Non-Modulaires', href: '/guides/modular-vs-non-modular-psu', desc: 'Choisissez le format de câbles adapté à votre boîtier.' },
          { name: 'Formats SFX vs ATX Standard', href: '/guides/sfx-vs-atx-psu', desc: 'Comparez les alimentations de bureau standard et les modèles compacts SFX.' },
          { name: 'Encombrement des Alimentations SFX-L', href: '/guides/sfx-l-psu-guide', desc: 'Dimensions approfondies SFX-L et limites d\'espace dans les boîtiers ITX.' },
          { name: 'Alimentations Passives sans Ventilateur', href: '/guides/fanless-psu-guide', desc: 'Dissipation thermique passive pour des PC 100% silencieux.' },
          { name: 'Alimentations Serveur vs Desktop', href: '/guides/server-vs-desktop-psu', desc: 'Redondance, formats 1U/2U et comparaisons du bruit.' },
          { name: 'Sens de Montage du Ventilateur PSU', href: '/guides/psu-fan-direction', desc: 'Flux d\'air : le ventilateur doit-il être orienté vers le haut ou vers le bas ?' }
        ]
      }
    ]
  },
  ja: {
    pageTitle: '自作PCハードウェア＆電源解説ガイド — PSUCheck',
    heroTitle: 'PSUCheck ハードウェア',
    heroHighlight: '技術ガイド集',
    pageSubtitle: '電源供給、突入電力、ATX 3.1規格、配線安全性、自作PC組み立ての専門解説。Cybeneticsの変換効率・過渡応答データに基づいています。',
    matchmakerBadge: '電源マッチメーカー',
    matchmakerTitle: 'GPU推奨電源ファインダー →',
    matchmakerDesc: 'RTX 50シリーズや旧世代グラフィックボードの推奨W数とコネクタ仕様を確認。',
    budgetFinderBadge: '予算別ファインダー',
    budgetFinderTitle: '予算別おすすめ電源ユニット →',
    budgetFinderDesc: '1万円、1.5万円、2万円、3万円以下の高コスパ電源を厳選比較。',
    categories: [
      {
        title: '⚡ 電源容量の選び方・診断ガイド',
        description: 'ハードウェアの消費電力、スパイク電力、静音性、経年劣化の専門解説。',
        links: [
          { name: '電源容量（W数）選び方ガイド', href: '/guides/psu-sizing-guide', desc: 'スパイク電力と安全マージンを考慮した適正容量の計算方法。' },
          { name: '750W vs 850W電源：どちらを選ぶべき？', href: '/guides/750w-vs-850w-psu', desc: '安全余裕、変換効率カーブ、価格差を徹底比較。' },
          { name: 'PCアイドル時消費電力の分析', href: '/guides/pc-idle-power', desc: 'Cステート、マザーボードの待機電力と省電力設定。' },
          { name: 'ハードウェアのボトルネック解消法', href: '/guides/pc-bottleneck-guide', desc: 'CPUとGPUのバランスを最適化し電力不足を防ぐ方法。' },
          { name: '簡易水冷（AIO）クーラーの消費電力', href: '/guides/aio-cooler-power-draw', desc: 'ポンプ電流とファン電力の正確な算出方法。' },
          { name: 'オーバークロック時の電力制約', href: '/guides/overclocking-power-draw', desc: '昇圧とブーストクロックがシステム消費電力に与える影響。' },
          { name: '電源ユニットの安全なテスト方法', href: '/guides/how-to-test-a-psu', desc: 'クリップを用いた通電テストと電圧トラブルシューティング。' },
          { name: '電源の寿命とコンデンサ経年劣化', href: '/guides/psu-lifespan', desc: '電解コンデンサの劣化が出力低下に与える影響。' },
          { name: '静音電源ユニット選び方ガイド', href: '/guides/quiet-psu-guide', desc: 'FDB流体軸受、セミファンレスECOモード、動作音の解説。' },
          { name: '自作PC電源用語集', href: '/guides/power-glossary', desc: 'TDP、TBP、瞬時過渡スパイク、Active PFCなどの基礎知識。' }
        ]
      },
      {
        title: '🔌 電源規格・ケーブル・安全性',
        description: 'ATX 3.1規格、12V-2x6コネクタ、カスタムスリーブケーブル、電力品質の解説。',
        links: [
          { name: 'ATX 3.1 ＆ 12V-2x6 完全解説', href: '/guides/atx-3-1-guide', desc: '最新のATX 3.1安全規格とコネクタ仕様に関する決定版ガイド。' },
          { name: '80 PLUS 変換効率ガイド', href: '/guides/psu-efficiency-guide', desc: 'Bronze・Gold・Platinum各グレードの実際の効率差と電気代。' },
          { name: 'Cybenetics vs 80 PLUS 比較', href: '/guides/cybenetics-vs-80-plus', desc: 'Cybenetics認証が従来の80 PLUSより信頼される理由。' },
          { name: 'GPU電源コネクタの安全性', href: '/guides/gpu-power-connectors', desc: '8ピン、12VHPWR、新規格12V-2x6ケーブルの比較と注意点。' },
          { name: 'シングルレーン vs マルチレーン電源', href: '/guides/single-vs-multi-rail', desc: '+12V系統の電流配分とOCP保護回路の仕組み。' },
          { name: 'カスタムスリーブケーブルと延長線', href: '/guides/psu-cable-extensions', desc: 'ハード破損を防ぐためのピン配置、AWG導線太さの確認。' },
          { name: 'プラグインケーブルのピンアサイン互換性', href: '/guides/psu-cable-compatibility', desc: 'メーカー違いのモジュラーケーブルを流用してはいけない理由。' },
          { name: '無停電電源装置（UPS）の選び方', href: '/guides/ups-backup-power', desc: 'ハイエンドゲーミングPCを停電や瞬低から保護するバッテリー容量の算出。' }
        ]
      },
      {
        title: '🖥️ 自作PC組み立て・予算配分',
        description: '初心者向け組み立て手順、予算別パーツ配分、ケース規格の解説。',
        links: [
          { name: '自作PCの組み立て手順（完全版）', href: '/guides/how-to-build-a-pc', desc: 'パーツ開封から初起動までの分かりやすいステップ解説。' },
          { name: '2026年おすすめゲーミング電源', href: '/guides/best-psu-for-gaming', desc: '品質ティア別に厳選した編集部おすすめ電源ユニット。' },
          { name: '自作PC組み立てのコツと注意点', href: '/guides/building-tips', desc: 'スペーサーの配置、CPUグリス塗布、最小構成テストの重要性。' },
          { name: 'PC予算配分ガイド（価格帯別）', href: '/guides/budget-guide', desc: '5万円〜30万円超の構成における最適な予算バランス。' },
          { name: 'モジュラー vs 直出し電源の選び方', href: '/guides/modular-vs-non-modular-psu', desc: 'PCケースの配線スペースに応じた最適なケーブル仕様。' },
          { name: 'SFX vs ATX 電源規格の違い', href: '/guides/sfx-vs-atx-psu', desc: '標準ATX電源と小型SFX電源の寸法・冷却性能の比較。' },
          { name: 'SFX-L電源のケース干渉と寸法確認', href: '/guides/sfx-l-psu-guide', desc: '奥行きが長いSFX-L規格と小型ケースの適合制限。' },
          { name: 'ファンレス・完全静音電源の選び方', href: '/guides/fanless-psu-guide', desc: '無音動作を実現するパッシブ放熱電源の注意点。' },
          { name: 'サーバー用 vs デスクトップ用電源', href: '/guides/server-vs-desktop-psu', desc: '冗長電源（リダンダント）、1U/2U規格と静音性の違い。' },
          { name: '電源ファンの吸気向き（上向き・下向き）', href: '/guides/psu-fan-direction', desc: 'エアフローの基礎：電源ファンは上向き・下向きのどちらが正解？' }
        ]
      }
    ]
  },
  zh: {
    pageTitle: 'DIY装机与电源技术深度指南 — PSUCheck',
    heroTitle: 'PSUCheck 硬件装机',
    heroHighlight: '技术指南文库',
    pageSubtitle: '深入解析硬件瞬态功耗、ATX 3.1规范、模组线线序安全及DIY装机实践。基于权威Cybenetics效率与瞬态实测数据。',
    matchmakerBadge: '电源速配器',
    matchmakerTitle: '显卡电源功耗速查 →',
    matchmakerDesc: '为RTX 50系列及历史各代显卡精确匹配安全额定功率与供电线材。',
    budgetFinderBadge: '预算推荐',
    budgetFinderTitle: '各价位段高性价比电源 →',
    budgetFinderDesc: '按性价比综合得分筛选500元、800元、1200元或2000元以内的优质电源。',
    categories: [
      {
        title: '⚡ 电源功率计算与供电诊断',
        description: '全面解析硬件功耗、瞬时峰值、风扇噪音及电容老化寿命。',
        links: [
          { name: '电源功率选购指南', href: '/guides/psu-sizing-guide', desc: '学习如何考虑显卡瞬态尖峰并预留充足的安全余量。' },
          { name: '750W 还是 850W 电源？该如何选择', href: '/guides/750w-vs-850w-psu', desc: '对比安全冗余、转换效率曲线与实际差价。' },
          { name: 'PC待机功耗深度分析', href: '/guides/pc-idle-power', desc: '了解C-states节能状态、主板芯片组待机与整机待机优化。' },
          { name: '硬件瓶颈排查指南', href: '/guides/pc-bottleneck-guide', desc: '均衡搭配CPU与显卡，避免系统供电瓶颈。' },
          { name: '一体式水冷散热器功耗计算', href: '/guides/aio-cooler-power-draw', desc: '精准计算水泵电流负荷与冷排风扇耗电量。' },
          { name: '超频供电限制分析', href: '/guides/overclocking-power-draw', desc: '加压超频与功耗墙解锁对电源选型的要求。' },
          { name: '如何安全测试电源好坏', href: '/guides/how-to-test-a-psu', desc: '手把手教你回形针短接短路测试与各路电压排查。' },
          { name: '电源寿命与电解电容老化', href: '/guides/psu-lifespan', desc: '了解电容衰减如何导致输出功率下降。' },
          { name: '静音电源选购完全指南', href: '/guides/quiet-psu-guide', desc: 'FDB液压轴承、智能温控风扇停转技术与噪音曲线。' },
          { name: 'PC供电技术术语词典', href: '/guides/power-glossary', desc: '搞懂TDP、TBP、微秒级瞬态尖峰、主动式PFC等核心概念。' }
        ]
      },
      {
        title: '🔌 供电规范、线材与安全指南',
        description: '详解ATX 3.1标准、12V-2x6接口、定制线线序及供电品质。',
        links: [
          { name: 'ATX 3.1 与 12V-2x6 权威指南', href: '/guides/atx-3-1-guide', desc: '全面解读最新ATX 3.1安全规范与防烧接口标准。' },
          { name: '80 PLUS 转换效率详解', href: '/guides/psu-efficiency-guide', desc: '对比铜牌、金牌与白金牌在不同负载下的实际电费差异。' },
          { name: 'Cybenetics 与 80 PLUS 认证对比', href: '/guides/cybenetics-vs-80-plus', desc: '为什么Cybenetics测试报告比传统80 PLUS更加严谨可靠。' },
          { name: '显卡供电接口安全性全解析', href: '/guides/gpu-power-connectors', desc: '对比8-Pin、12VHPWR与原生12V-2x6线材的安全性。' },
          { name: '单路 12V 与多路 12V 电源对比', href: '/guides/single-vs-multi-rail', desc: '深入理解+12V路数、过流保护(OCP)触发与安全性。' },
          { name: '定制包网线与延长线避坑', href: '/guides/psu-cable-extensions', desc: '杜绝硬件烧毁：线径规格AWG、端子接触电阻与短路风险。' },
          { name: '模组线线序兼容性警告', href: '/guides/psu-cable-compatibility', desc: '为什么严禁混用不同品牌甚至同品牌不同批次的模组线。' },
          { name: 'UPS不间断电源与防浪涌选购', href: '/guides/ups-backup-power', desc: '如何为高配游戏主机计算后备电池容量与功率冗余。' }
        ]
      },
      {
        title: '🖥️ DIY装机教程与预算分配',
        description: '新手装机步骤、性价比预算分配模板及机箱兼容性。',
        links: [
          { name: '新手DIY装机全流程（手把手教程）', href: '/guides/how-to-build-a-pc', desc: '从零件开箱到首次点亮开机的完整图文指南。' },
          { name: '2026年高性价比游戏电源推荐', href: '/guides/best-psu-for-gaming', desc: '按品质梯队分类的编辑精选电源选购清单。' },
          { name: '装机实用避坑技巧', href: '/guides/building-tips', desc: '铜柱对齐、硅脂涂抹、机箱走线与裸机点亮测试。' },
          { name: '装机预算分配黄金法则', href: '/guides/budget-guide', desc: '3000元至15000元+各价位段硬件花费比例。' },
          { name: '全模组、半模组与非模组电源选择', href: '/guides/modular-vs-non-modular-psu', desc: '根据机箱背线空间挑选最合适的形式。' },
          { name: 'SFX 小电源 vs ATX 标准电源', href: '/guides/sfx-vs-atx-psu', desc: '对比标准ATX电源与ITX小机箱专用SFX电源的性能与空间。' },
          { name: 'SFX-L 加长型电源兼容性指南', href: '/guides/sfx-l-psu-guide', desc: '了解加长SFX-L电源尺寸及其对紧凑机箱走线的限制。' },
          { name: '无风扇全被动散热电源指南', href: '/guides/fanless-psu-guide', desc: '打造零噪音0dB纯静音电脑主机的电源选型。' },
          { name: '服务器电源 vs 家用台式机电源', href: '/guides/server-vs-desktop-psu', desc: '冗余电源(Redundant)、1U/2U工业规格与噪音对比。' },
          { name: '电源风扇朝向（朝上还是朝下？）', href: '/guides/psu-fan-direction', desc: '机箱风道优化：电源风扇究竟应该朝上还是朝下安装？' }
        ]
      }
    ]
  }
};

export function getLocalizedGuides(lang: Locale): GuideHubData {
  return GUIDE_TRANSLATIONS[lang] || GUIDE_TRANSLATIONS.en;
}
