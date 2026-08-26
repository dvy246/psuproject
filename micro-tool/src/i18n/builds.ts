import type { Locale } from './locales';

export interface LocalizedBuildInfo {
  name: string;
  description: string;
  category: string;
}

export const BUILD_TRANSLATIONS: Record<string, Record<Locale, LocalizedBuildInfo>> = {
  'rtx-5090-ryzen-9-9950x-ultimate': {
    en: {
      name: 'NVIDIA RTX 5090 & Ryzen 9 9950X Ultimate Gaming & Creator Rig',
      description: 'An absolute dream PC configuration for 4K ray-traced gaming, machine learning development, and heavy 8K video editing workflows. Featuring the flagship NVIDIA GeForce RTX 5090 Blackwell GPU and AMD Zen 5 Ryzen 9 9950X CPU on a premium ASUS ROG Crosshair X870E Hero motherboard. Fully equipped with 64GB DDR5 memory, a 2TB NVMe PCIe 5.0 SSD, and 360mm AIO liquid cooling.',
      category: 'Gaming'
    },
    de: {
      name: 'NVIDIA RTX 5090 & Ryzen 9 9950X Ultimatives Gaming- & Creator-System',
      description: 'Ein absolutes Traum-PC-Setup für 4K-Raytracing-Gaming, Machine-Learning-Entwicklung und anspruchsvolle 8K-Videobearbeitung. Ausgestattet mit dem Flaggschiff NVIDIA GeForce RTX 5090 Blackwell und dem AMD Ryzen 9 9950X auf einem ASUS ROG Crosshair X870E Hero Mainboard mit 64 GB DDR5 und 360mm Wasserkühlung.',
      category: 'Gaming'
    },
    es: {
      name: 'NVIDIA RTX 5090 y Ryzen 9 9950X Equipo Definitivo Gaming y Creadores',
      description: 'Una configuración de ensueño para juegos 4K con trazado de rayos, desarrollo de IA y edición de vídeo 8K profesional. Cuenta con la tarjeta insignia NVIDIA GeForce RTX 5090 Blackwell y el procesador AMD Ryzen 9 9950X sobre una placa ASUS ROG Crosshair X870E Hero con 64GB DDR5 y refrigeración líquida de 360mm.',
      category: 'Gaming'
    },
    fr: {
      name: 'NVIDIA RTX 5090 & Ryzen 9 9950X Configuration Ultime Gaming & Création',
      description: 'La configuration PC de rêve pour le jeu 4K en ray tracing, l\'intelligence artificielle et le montage vidéo 8K intensif. Dotée du fleuron NVIDIA GeForce RTX 5090 Blackwell et du processeur AMD Ryzen 9 9950X sur carte mère ASUS ROG Crosshair X870E Hero avec 64 Go DDR5 et watercooling 360mm.',
      category: 'Gaming'
    },
    ja: {
      name: 'NVIDIA RTX 5090 ＆ Ryzen 9 9950X 究極のゲーミング＆クリエイターPC',
      description: '4Kレイトレーシングゲーミング、機械学習、8K動画編集に最適な最高峰PC構成。フラッグシップのNVIDIA GeForce RTX 5090とAMD Ryzen 9 9950XをASUS ROG Crosshair X870E Heroマザーボードに搭載。64GB DDR5メモリと360mm水冷クーラー完備。',
      category: 'ゲーミング'
    },
    zh: {
      name: 'NVIDIA RTX 5090 与 锐龙 9 9950X 终极游戏与创作旗舰装机',
      description: '专为4K全光追游戏、深度学习开发及8K重度视频剪辑打造的终极PC。配备NVIDIA旗舰GeForce RTX 5090与AMD Zen 5锐龙9 9950X处理器，搭配华硕ROG Crosshair X870E Hero主板、64GB DDR5内存与360mm一体式水冷。',
      category: '游戏旗舰'
    }
  },
  'intel-ultra-9-rtx-5080-powerhouse': {
    en: {
      name: 'Intel Core Ultra 9 285K & RTX 5080 Professional Rig',
      description: 'A high-performance productivity and professional gaming build leveraging Intel\'s Arrow Lake flagship Core Ultra 9 285K and the powerhouse NVIDIA GeForce RTX 5080 graphics card. Mounted on the premium MSI MEG Z890 ACE motherboard, this build delivers outstanding multithreaded compute efficiency and top-tier frame rates.',
      category: 'Workstation'
    },
    de: {
      name: 'Intel Core Ultra 9 285K & RTX 5080 Professionelles Workstation-System',
      description: 'Ein leistungsstarkes Produktivitäts- und Gaming-System mit Intels Arrow Lake Flaggschiff Core Ultra 9 285K und der NVIDIA GeForce RTX 5080 auf einem MSI MEG Z890 ACE Mainboard für herausragende Multithreading-Leistung und Top-Frameraten.',
      category: 'Workstation'
    },
    es: {
      name: 'Intel Core Ultra 9 285K y RTX 5080 Equipo Profesional de Rendimiento',
      description: 'Un equipo de alta gama para productividad profesional y gaming exigente que combina el procesador Intel Core Ultra 9 285K Arrow Lake y la gráfica NVIDIA GeForce RTX 5080 en una placa MSI MEG Z890 ACE con excelente eficiencia de cálculo multihilo.',
      category: 'Estación de Trabajo'
    },
    fr: {
      name: 'Intel Core Ultra 9 285K & RTX 5080 Station Professionnelle Haute Performance',
      description: 'Une machine professionnelle alliant le fleuron Intel Arrow Lake Core Ultra 9 285K et la puissante carte NVIDIA GeForce RTX 5080 sur carte mère MSI MEG Z890 ACE pour une puissance de calcul et des débits d\'images exceptionnels.',
      category: 'Station de Travail'
    },
    ja: {
      name: 'Intel Core Ultra 9 285K ＆ RTX 5080 プロ向けハイエンド構成',
      description: 'Intel Arrow LakeフラッグシップCore Ultra 9 285KとNVIDIA GeForce RTX 5080を組み合わせた超高速ワークステーション。MSI MEG Z890 ACEマザーボード搭載でマルチスレッド処理と高解像度ゲームを圧倒的な性能で両立。',
      category: 'ワークステーション'
    },
    zh: {
      name: '英特尔酷睿 Ultra 9 285K 与 RTX 5080 专业全能工作站',
      description: '基于英特尔Arrow Lake旗舰酷睿Ultra 9 285K与NVIDIA GeForce RTX 5080打造的高性能生产力平台。搭载微星MEG Z890 ACE主板，兼具出色的多线程计算效率与顶级4K光追帧率表现。',
      category: '工作站'
    }
  },
  'ryzen-7-9800x3d-rtx-5070-ti-sweetspot': {
    en: {
      name: 'AMD Ryzen 7 9800X3D & RTX 5070 Ti Sweet Spot Gaming Build',
      description: 'The current absolute sweet spot configuration for high-refresh-rate 1440p competitive gaming. Combines AMD\'s legendary 3D V-Cache Ryzen 7 9800X3D with the highly efficient NVIDIA GeForce RTX 5070 Ti. Standardized on a durable MSI MAG B850 Tomahawk motherboard and high-speed 32GB DDR5 6000MHz RAM.',
      category: 'Gaming'
    },
    de: {
      name: 'AMD Ryzen 7 9800X3D & RTX 5070 Ti Sweet-Spot Gaming-PC',
      description: 'Die aktuell perfekte Gaming-Konfiguration für hochfrequentes 1440p-Esports-Gaming. Verbindet AMDs 3D V-Cache Prozessor Ryzen 7 9800X3D mit der energieeffizienten NVIDIA GeForce RTX 5070 Ti auf einem MSI MAG B850 Tomahawk Mainboard.',
      category: 'Gaming'
    },
    es: {
      name: 'AMD Ryzen 7 9800X3D y RTX 5070 Ti Montaje Gaming Punto Dulce',
      description: 'La configuración ideal y más equilibrada para jugar a 1440p con altos fotogramas por segundo. Combina el procesador con 3D V-Cache AMD Ryzen 7 9800X3D con la eficiente gráfica NVIDIA GeForce RTX 5070 Ti sobre una placa MSI MAG B850 Tomahawk.',
      category: 'Gaming'
    },
    fr: {
      name: 'AMD Ryzen 7 9800X3D & RTX 5070 Ti Le Meilleur Équilibre Gaming',
      description: 'La configuration reine pour le jeu compétitif 1440p à très haut rafraîchissement. Associe le processeur 3D V-Cache AMD Ryzen 7 9800X3D à la NVIDIA GeForce RTX 5070 Ti sur carte mère MSI MAG B850 Tomahawk avec 32 Go DDR5 6000MHz.',
      category: 'Gaming'
    },
    ja: {
      name: 'AMD Ryzen 7 9800X3D ＆ RTX 5070 Ti 黄金バランス・ゲーミング構成',
      description: 'WQHD（1440p）高リフレッシュレート環境で最高のコスパを誇るゲーミングPC。驚異的なゲーム性能を持つRyzen 7 9800X3DとNVIDIA GeForce RTX 5070 TiをMSI MAG B850 Tomahawkマザーボードに搭載。',
      category: 'ゲーミング'
    },
    zh: {
      name: 'AMD 锐龙 7 9800X3D 与 RTX 5070 Ti 甜点级高刷电竞装机',
      description: '当前2K 1440p高刷电竞游戏的黄金甜点配置。融合AMD传奇3D V-Cache锐龙7 9800X3D与高效能NVIDIA GeForce RTX 5070 Ti显卡，标配微星MAG B850 Tomahawk主板与32GB DDR5 6000MHz高速内存。',
      category: '电竞甜点'
    }
  },
  'intel-ultra-7-rtx-4070-super-creator': {
    en: {
      name: 'Intel Core Ultra 7 265K & RTX 4070 SUPER Creator PC',
      description: 'A quiet and reliable creator/editing system featuring the Intel Core Ultra 7 265K and ASUS TUF RTX 4070 SUPER. This configuration provides a perfect balance between fast CPU render speeds and NVIDIA Studio CUDA hardware acceleration for Adobe Premier Pro, Blender, and Photoshop.',
      category: 'Creator'
    },
    de: {
      name: 'Intel Core Ultra 7 265K & RTX 4070 SUPER Creator-PC',
      description: 'Ein leises und zuverlässiges Schnitt- und Content-Creation-System mit Intel Core Ultra 7 265K und ASUS TUF RTX 4070 SUPER für schnelle CPU-Renderzeiten und NVIDIA Studio CUDA-Beschleunigung in Premiere Pro und Blender.',
      category: 'Content Creator'
    },
    es: {
      name: 'Intel Core Ultra 7 265K y RTX 4070 SUPER PC para Creadores',
      description: 'Un sistema silencioso y fiable para edición de vídeo y renderizado 3D con Intel Core Ultra 7 265K y ASUS TUF RTX 4070 SUPER. Ofrece aceleración CUDA NVIDIA Studio para Premiere Pro, Photoshop y Blender.',
      category: 'Creador'
    },
    fr: {
      name: 'Intel Core Ultra 7 265K & RTX 4070 SUPER PC pour Créateurs de Contenu',
      description: 'Un PC silencieux et ultra-fiable pour le montage et la 3D avec le processeur Intel Core Ultra 7 265K et la carte ASUS TUF RTX 4070 SUPER, optimisé pour Adobe Premiere Pro, Blender et Photoshop.',
      category: 'Créateur'
    },
    ja: {
      name: 'Intel Core Ultra 7 265K ＆ RTX 4070 SUPER クリエイター向けPC',
      description: '動画編集や3Dグラフィックス制作者向けの静音・高信頼性構成。Intel Core Ultra 7 265KとASUS TUF RTX 4070 SUPERを搭載し、Adobe Premiere ProやBlenderでのCUDAアクセラレーションを最大限に活用。',
      category: 'クリエイター'
    },
    zh: {
      name: '英特尔酷睿 Ultra 7 265K 与 RTX 4070 SUPER 创作者静音设计主机',
      description: '专为视频剪辑与3D渲染打造的静音高效创作平台。配备酷睿Ultra 7 265K与华硕TUF RTX 4070 SUPER，为Premiere Pro、Photoshop与Blender提供强劲的CPU算力与NVIDIA Studio CUDA硬件加速。',
      category: '创作设计'
    }
  },
  'ryzen-5-9600x-rtx-5060-value': {
    en: {
      name: 'AMD Ryzen 5 9600X & RTX 5060 Value Gaming PC',
      description: 'An excellent mid-range gaming configuration designed for high frame rate 1080p and entry-level 1440p gaming workloads. Combines AMD\'s highly power-efficient 6-core Ryzen 5 9600X processor with the newly released NVIDIA GeForce RTX 5060.',
      category: 'Value'
    },
    de: {
      name: 'AMD Ryzen 5 9600X & RTX 5060 Preis-Leistungs Gaming-PC',
      description: 'Hervorragendes Mittelklasse-System für flüssiges 1080p- und 1440p-Gaming mit dem hocheffizienten 6-Kern-Prozessor AMD Ryzen 5 9600X und der neuen NVIDIA GeForce RTX 5060 auf einem ASRock B850M Pro Mainboard.',
      category: 'Preis-Leistung'
    },
    es: {
      name: 'AMD Ryzen 5 9600X y RTX 5060 PC Gaming Calidad-Precio',
      description: 'Una configuración de gama media optimizada para jugar a 1080p con alta tasa de refresco y 1440p. Combina el eficiente AMD Ryzen 5 9600X de 6 núcleos con la tarjeta NVIDIA GeForce RTX 5060.',
      category: 'Calidad-Precio'
    },
    fr: {
      name: 'AMD Ryzen 5 9600X & RTX 5060 PC Gaming Meilleur Rapport Qualité/Prix',
      description: 'Une excellente configuration milieu de gamme pour le jeu en 1080p haute fluidité et 1440p. Associe le processeur 6 cœurs AMD Ryzen 5 9600X à la carte graphique NVIDIA GeForce RTX 5060.',
      category: 'Rapport Qualité/Prix'
    },
    ja: {
      name: 'AMD Ryzen 5 9600X ＆ RTX 5060 高コスパ・ゲーミングPC',
      description: 'フルHD高フレームレートおよびWQHDエントリー向けの高コスパ構成。高効率な6コアRyzen 5 9600Xと最新NVIDIA GeForce RTX 5060をASRock B850M Pro RS WiFiに搭載。',
      category: 'コスパ'
    },
    zh: {
      name: 'AMD 锐龙 5 9600X 与 RTX 5060 高性价比主流游戏装机',
      description: '专为1080p高刷与2K主流游戏设计的性价比利器。搭载低功耗高能效的6核锐龙5 9600X处理器与NVIDIA GeForce RTX 5060显卡，兼顾预算与流畅度。',
      category: '高性价比'
    }
  },
  'pure-amd-beast-9900x-rx-9070-xt': {
    en: {
      name: 'Pure AMD Ryzen 9 9900X & RX 9070 XT Enthusiast PC',
      description: 'A high-end all-AMD configuration built for maximum rasterization gaming and multithreaded productivity tasks. Utilizes the 12-core AMD Ryzen 9 9900X processor and the newly announced Radeon RX 9070 XT graphics card on a premium ASRock X870E Taichi board.',
      category: 'Gaming'
    },
    de: {
      name: 'Pure AMD Ryzen 9 9900X & RX 9070 XT Enthusiasten-PC',
      description: 'High-End Voll-AMD-Konfiguration für maximale Rasterisierungsleistung und Multithread-Workloads mit dem 12-Kern Ryzen 9 9900X und der Radeon RX 9070 XT auf einem ASRock X870E Taichi Board.',
      category: 'Gaming'
    },
    es: {
      name: 'Equipo Entusiasta Puro AMD Ryzen 9 9900X y RX 9070 XT',
      description: 'Configuración de gama alta 100% AMD diseñada para máximo rendimiento en rasterizado y productividad multihilo. Cuenta con el procesador Ryzen 9 9900X de 12 núcleos y la gráfica Radeon RX 9070 XT.',
      category: 'Gaming'
    },
    fr: {
      name: 'Pure AMD Ryzen 9 9900X & RX 9070 XT PC Enfant Terrible Enthusiast',
      description: 'Configuration haut de gamme 100% AMD pour des performances de rastérisation et de productivité maximales. Équipée du Ryzen 9 9900X 12 cœurs et de la Radeon RX 9070 XT.',
      category: 'Gaming'
    },
    ja: {
      name: 'オールAMD構成 Ryzen 9 9900X ＆ RX 9070 XT エンスージアストPC',
      description: '純粋なラスタライズゲーミングとマルチスレッド作業に最適化されたオールAMDハイエンド構成。12コアRyzen 9 9900XとRadeon RX 9070 XTをASRock X870E Taichiに搭載。',
      category: 'ゲーミング'
    },
    zh: {
      name: '全AMD 3A平台 锐龙 9 9900X 与 RX 9070 XT 发烧级装机',
      description: '专为纯粹光栅化游戏与高负载多线程打造的全AMD发烧主机。配备12核锐龙9 9900X处理器与Radeon RX 9070 XT显卡，搭配华擎X870E Taichi主板。',
      category: '发烧电竞'
    }
  },
  'rtx-4090-ryzen-7-7800x3d-gaming-rig': {
    en: {
      name: 'NVIDIA RTX 4090 & Ryzen 7 7800X3D Gaming Classic',
      description: 'A legendary gaming setup pairing the world\'s most powerful consumer GPU, the NVIDIA GeForce RTX 4090, with AMD\'s highly acclaimed gaming CPU, the Ryzen 7 7800X3D.',
      category: 'Gaming'
    },
    de: {
      name: 'NVIDIA RTX 4090 & Ryzen 7 7800X3D Gaming-Klassiker',
      description: 'Legendäres Gaming-Setup, das die Flaggschiff-Grafikkarte NVIDIA GeForce RTX 4090 mit dem Benchmark-König Ryzen 7 7800X3D für maximale 4K-Bildraten kombiniert.',
      category: 'Gaming'
    },
    es: {
      name: 'NVIDIA RTX 4090 y Ryzen 7 7800X3D Clásico Gaming de Élite',
      description: 'Configuración legendaria que une la tarjeta gráfica NVIDIA GeForce RTX 4090 con el aclamado procesador para juegos AMD Ryzen 7 7800X3D.',
      category: 'Gaming'
    },
    fr: {
      name: 'NVIDIA RTX 4090 & Ryzen 7 7800X3D Le Classique Gaming Absolu',
      description: 'Le combo de légende combinant la puissance brute de la NVIDIA GeForce RTX 4090 au processeur gaming de référence AMD Ryzen 7 7800X3D.',
      category: 'Gaming'
    },
    ja: {
      name: 'NVIDIA RTX 4090 ＆ Ryzen 7 7800X3D 伝説のゲーミングPC',
      description: '最強のグラフィックカードNVIDIA GeForce RTX 4090と、ゲーム性能で圧倒的人気を誇るRyzen 7 7800X3Dを組み合わせた4K最高設定対応PC。',
      category: 'ゲーミング'
    },
    zh: {
      name: 'NVIDIA RTX 4090 与 锐龙 7 7800X3D 传奇电竞装机',
      description: '将旗舰卡皇NVIDIA GeForce RTX 4090与广受赞誉的电竞神U锐龙7 7800X3D结合，畅享4K极致画质与最高光追帧率。',
      category: '传奇旗舰'
    }
  },
  'intel-i7-rtx-4070-ti-super-workstation': {
    en: {
      name: 'Intel Core i7-14700K & RTX 4070 Ti SUPER Editing Workstation',
      description: 'A high-performance media workstation tailored for multi-stream 4K rendering in DaVinci Resolve and heavy multitasking with 20 cores and 16GB VRAM.',
      category: 'Workstation'
    },
    de: {
      name: 'Intel Core i7-14700K & RTX 4070 Ti SUPER Videoschnitt-Workstation',
      description: 'Leistungsstarke Schnitt-Workstation für DaVinci Resolve und 4K-Multistreaming mit 20 Intel-Kernen und 16 GB VRAM der RTX 4070 Ti SUPER.',
      category: 'Workstation'
    },
    es: {
      name: 'Intel Core i7-14700K y RTX 4070 Ti SUPER Estación de Edición',
      description: 'Estación de trabajo multimedia optimizada para renderizado 4K multipista en DaVinci Resolve y multitarea con 20 núcleos y 16GB de VRAM.',
      category: 'Estación de Trabajo'
    },
    fr: {
      name: 'Intel Core i7-14700K & RTX 4070 Ti SUPER Station de Montage 4K',
      description: 'Station de montage vidéo taillée pour le flux 4K multi-pistes sous DaVinci Resolve avec 20 cœurs et les 16 Go de VRAM de la RTX 4070 Ti SUPER.',
      category: 'Station de Travail'
    },
    ja: {
      name: 'Intel Core i7-14700K ＆ RTX 4070 Ti SUPER 映像編集ワークステーション',
      description: 'DaVinci Resolveでの4Kマルチストリーム編集や高負荷マルチタスクに最適な20コアCPU＆16GB VRAM搭載ワークステーション。',
      category: 'ワークステーション'
    },
    zh: {
      name: '英特尔酷睿 i7-14700K 与 RTX 4070 Ti SUPER 影视剪辑工作站',
      description: '专为DaVinci Resolve多轨4K剪辑及重度生产力打造的20核工作站，搭载16GB大显存RTX 4070 Ti SUPER与64GB高速内存。',
      category: '工作站'
    }
  },
  'ryzen-5-7600-rx-7800-xt-balanced-gaming': {
    en: {
      name: 'AMD Ryzen 5 7600 & Radeon RX 7800 XT Balanced Build',
      description: 'An extremely balanced 1440p gaming machine optimized for high frame rates and cost-to-performance efficiency with 16GB of VRAM.',
      category: 'Gaming'
    },
    de: {
      name: 'AMD Ryzen 5 7600 & Radeon RX 7800 XT Ausgewogener Gaming-PC',
      description: 'Perfekt ausbalanciertes 1440p-Gaming-System mit 16 GB VRAM für maximale Langlebigkeit und flüssige Bildraten bei hoher Energieeffizienz.',
      category: 'Gaming'
    },
    es: {
      name: 'AMD Ryzen 5 7600 y Radeon RX 7800 XT Montaje Equilibrado 1440p',
      description: 'Equipo muy equilibrado para 1440p optimizado para altos FPS y gran relación calidad-precio con 16GB de memoria gráfica.',
      category: 'Gaming'
    },
    fr: {
      name: 'AMD Ryzen 5 7600 & Radeon RX 7800 XT PC Gaming Équilibré 1440p',
      description: 'Une machine de jeu 1440p extrêmement équilibrée avec 16 Go de VRAM offrant un excellent rapport performances/prix.',
      category: 'Gaming'
    },
    ja: {
      name: 'AMD Ryzen 5 7600 ＆ Radeon RX 7800 XT バランス型1440p PC',
      description: '高フレームレートと優れたコスパを両立させたWQHDゲーミングPC。16GBの大容量VRAMで最新タイトルも安心。',
      category: 'ゲーミング'
    },
    zh: {
      name: 'AMD 锐龙 5 7600 与 Radeon RX 7800 XT 2K均衡高画质装机',
      description: '极具性价比的2K高画质游戏主机，配备16GB大显存RX 7800 XT与能效卓越的锐龙5 7600处理器。',
      category: '均衡游戏'
    }
  },
  'intel-i5-rtx-4060-ti-compact-pc': {
    en: {
      name: 'Intel Core i5-14600K & RTX 4060 Ti Compact PC',
      description: 'A compact and portable Small Form Factor (SFF) build featuring the Intel Core i5-14600K and NVIDIA GeForce RTX 4060 Ti.',
      category: 'Gaming'
    },
    de: {
      name: 'Intel Core i5-14600K & RTX 4060 Ti Kompakter SFF-PC',
      description: 'Kompaktes Small Form Factor System mit Intel Core i5-14600K und RTX 4060 Ti, ideal für platzsparende Schreibtische und LAN-Partys.',
      category: 'Gaming'
    },
    es: {
      name: 'Intel Core i5-14600K y RTX 4060 Ti PC Compacto SFF',
      description: 'Montaje compacto en formato pequeño (SFF) con Intel Core i5-14600K y NVIDIA GeForce RTX 4060 Ti, perfecto para poco espacio.',
      category: 'Gaming'
    },
    fr: {
      name: 'Intel Core i5-14600K & RTX 4060 Ti PC Compact SFF',
      description: 'Une configuration compacte petit format (SFF) associant le Core i5-14600K et la carte graphique RTX 4060 Ti.',
      category: 'Gaming'
    },
    ja: {
      name: 'Intel Core i5-14600K ＆ RTX 4060 Ti 小型コンパクトPC',
      description: '省スペース環境やLANパーティーに最適なSFF小型PC。Core i5-14600KとRTX 4060 TiでフルHD最高画質に対応。',
      category: 'ゲーミング'
    },
    zh: {
      name: '英特尔酷睿 i5-14600K 与 RTX 4060 Ti 便携紧凑型ITX/MATX装机',
      description: '专为桌面空间紧凑打造的高性能小钢炮，搭载酷睿i5-14600K与RTX 4060 Ti，提供清爽整洁与高效散热。',
      category: '紧凑主机'
    }
  },
  'ryzen-9-7900x-rx-7900-xtx-red-monster': {
    en: {
      name: 'AMD Ryzen 9 7900X & Radeon RX 7900 XTX All-AMD Enthusiast',
      description: 'A powerhouse all-AMD build combining the 12-core Ryzen 9 7900X with the flagship Radeon RX 7900 XTX featuring 24GB VRAM.',
      category: 'Gaming'
    },
    de: {
      name: 'AMD Ryzen 9 7900X & Radeon RX 7900 XTX All-AMD Monster',
      description: 'Kraftvolles Voll-AMD-Kraftpaket mit 12-Kern Ryzen 9 7900X und der 24 GB VRAM Flaggschiff-Karte Radeon RX 7900 XTX.',
      category: 'Gaming'
    },
    es: {
      name: 'AMD Ryzen 9 7900X y Radeon RX 7900 XTX Monstruo Rojo AMD',
      description: 'Una bestia 100% AMD que une el Ryzen 9 7900X de 12 núcleos con la potente Radeon RX 7900 XTX de 24GB de VRAM.',
      category: 'Gaming'
    },
    fr: {
      name: 'AMD Ryzen 9 7900X & Radeon RX 7900 XTX Le Monstre Rouge Tout-AMD',
      description: 'Un monstre de puissance 100% AMD associant le Ryzen 9 7900X 12 cœurs et les 24 Go de VRAM de la Radeon RX 7900 XTX.',
      category: 'Gaming'
    },
    ja: {
      name: 'AMD Ryzen 9 7900X ＆ Radeon RX 7900 XTX レッドモンスターPC',
      description: '12コアRyzen 9 7900Xと24GB大容量VRAM搭載のRadeon RX 7900 XTXによるオールAMDハイエンド構成。',
      category: 'ゲーミング'
    },
    zh: {
      name: 'AMD 锐龙 9 7900X 与 Radeon RX 7900 XTX 红色巨兽旗舰装机',
      description: '结合12核锐龙9 7900X与24GB超大显存Radeon RX 7900 XTX旗舰显卡的全AMD高性能电竞利器。',
      category: '发烧电竞'
    }
  },
  'core-i9-14900k-rtx-4080-super-intel-enthusiast': {
    en: {
      name: 'Intel Core i9-14900K & RTX 4080 SUPER Ultimate Intel Rig',
      description: 'The definitive LGA1700 flagship build pairing Intel\'s 24-core Core i9-14900K with the premium NVIDIA GeForce RTX 4080 SUPER.',
      category: 'Workstation'
    },
    de: {
      name: 'Intel Core i9-14900K & RTX 4080 SUPER Ultimatives Intel-System',
      description: 'Das definitive LGA1700-Flaggschiff mit 24-Kern Core i9-14900K und NVIDIA GeForce RTX 4080 SUPER auf ASUS ROG Maximus Z790.',
      category: 'Workstation'
    },
    es: {
      name: 'Intel Core i9-14900K y RTX 4080 SUPER Equipo Definitivo Intel',
      description: 'El buque insignia definitivo para socket LGA1700 que combina el Core i9-14900K de 24 núcleos con la NVIDIA GeForce RTX 4080 SUPER.',
      category: 'Estación de Trabajo'
    },
    fr: {
      name: 'Intel Core i9-14900K & RTX 4080 SUPER Configuration Ultime Intel',
      description: 'Le fleuron absolu LGA1700 associant les 24 cœurs du Core i9-14900K à la puissante NVIDIA GeForce RTX 4080 SUPER.',
      category: 'Station de Travail'
    },
    ja: {
      name: 'Intel Core i9-14900K ＆ RTX 4080 SUPER 究極のインテル構成',
      description: '24コアのCore i9-14900KとRTX 4080 SUPERを組み合わせたLGA1700最高峰のハイエンドマシン。',
      category: 'ワークステーション'
    },
    zh: {
      name: '英特尔酷睿 i9-14900K 与 RTX 4080 SUPER 顶级双旗舰装机',
      description: 'LGA1700平台终极旗舰组合，搭载24核酷睿i9-14900K与NVIDIA GeForce RTX 4080 SUPER，兼顾顶级游戏与生产力。',
      category: '工作站'
    }
  },
  'ryzen-7-9700x-rtx-5070-midrange-killer': {
    en: {
      name: 'AMD Ryzen 7 9700X & RTX 5070 Mid-Range Gaming Build',
      description: 'An incredibly efficient and balanced 1440p gaming machine combining AMD\'s power-sipping 65W Ryzen 7 9700X with the capable NVIDIA GeForce RTX 5070.',
      category: 'Gaming'
    },
    de: {
      name: 'AMD Ryzen 7 9700X & RTX 5070 Mittelklasse-Meister',
      description: 'Unglaublich energieeffizientes 1440p-System mit dem 65W Ryzen 7 9700X und der NVIDIA GeForce RTX 5070 für leisen Dauerbetrieb.',
      category: 'Gaming'
    },
    es: {
      name: 'AMD Ryzen 7 9700X y RTX 5070 Montaje Gama Media Imbatible',
      description: 'Una configuración sumamente eficiente para jugar a 1440p que une el procesador de 65W Ryzen 7 9700X con la NVIDIA GeForce RTX 5070.',
      category: 'Gaming'
    },
    fr: {
      name: 'AMD Ryzen 7 9700X & RTX 5070 PC Gaming Milieu de Gamme Redoutable',
      description: 'Une machine 1440p ultra-efficace associant le Ryzen 7 9700X (65W) à la nouvelle NVIDIA GeForce RTX 5070.',
      category: 'Gaming'
    },
    ja: {
      name: 'AMD Ryzen 7 9700X ＆ RTX 5070 ミドルレンジ本命PC',
      description: '省電力65WのRyzen 7 9700XとNVIDIA GeForce RTX 5070を組み合わせた、静音かつ高性能なWQHD向けゲーミングPC。',
      category: 'ゲーミング'
    },
    zh: {
      name: 'AMD 锐龙 7 9700X 与 RTX 5070 高能效主流游戏主机',
      description: '将65W低功耗锐龙7 9700X与新一代RTX 5070强强联合，带来清凉静音且帧率强劲的2K畅玩体验。',
      category: '主流电竞'
    }
  },
  'core-ultra-5-245k-rx-7700-xt-balanced': {
    en: {
      name: 'Intel Core Ultra 5 245K & Radeon RX 7700 XT Value Build',
      description: 'A smart mid-range value proposition pairing Intel\'s newest Arrow Lake Core Ultra 5 245K with AMD\'s competitive Radeon RX 7700 XT.',
      category: 'Gaming'
    },
    de: {
      name: 'Intel Core Ultra 5 245K & Radeon RX 7700 XT Ausgewogener PC',
      description: 'Clevere Mittelklasse-Kombination aus Intels Arrow Lake Core Ultra 5 245K und der preiswerten Radeon RX 7700 XT.',
      category: 'Gaming'
    },
    es: {
      name: 'Intel Core Ultra 5 245K y Radeon RX 7700 XT PC Equilibrado',
      description: 'Una propuesta inteligente de gama media que combina el nuevo Intel Core Ultra 5 245K con la gráfica Radeon RX 7700 XT.',
      category: 'Gaming'
    },
    fr: {
      name: 'Intel Core Ultra 5 245K & Radeon RX 7700 XT PC Équilibré et Évolutif',
      description: 'Un choix malin associant le récent Intel Core Ultra 5 245K et la carte graphique Radeon RX 7700 XT.',
      category: 'Gaming'
    },
    ja: {
      name: 'Intel Core Ultra 5 245K ＆ Radeon RX 7700 XT コスパ構成',
      description: '最新のIntel Arrow Lake Core Ultra 5 245KとRadeon RX 7700 XTを組み合わせた将来性豊かなミドルクラス構成。',
      category: 'ゲーミング'
    },
    zh: {
      name: '英特尔酷睿 Ultra 5 245K 与 RX 7700 XT 现代均衡装机',
      description: '搭载新一代酷睿Ultra 5 245K与高性价比Radeon RX 7700 XT显卡，提供出色的1080p与2K游戏表现。',
      category: '现代均衡'
    }
  },
  'ryzen-5-7600x-rtx-4060-budget-1080p': {
    en: {
      name: 'AMD Ryzen 5 7600X & RTX 4060 Budget 1080p Gaming PC',
      description: 'An affordable entry-level build optimized for 1080p high-refresh gaming with DDR5 memory and DLSS 3 support.',
      category: 'Gaming'
    },
    de: {
      name: 'AMD Ryzen 5 7600X & RTX 4060 Budget 1080p Gaming-PC',
      description: 'Erschwinglicher Einstiegs-Gaming-PC für flüssiges 1080p-Gaming mit schnellem DDR5-Speicher und DLSS 3 Unterstützung.',
      category: 'Gaming'
    },
    es: {
      name: 'AMD Ryzen 5 7600X y RTX 4060 PC Gaming Económico 1080p',
      description: 'Montaje asequible y optimizado para jugar a 1080p con alta tasa de refresco, memoria DDR5 y compatibilidad con DLSS 3.',
      category: 'Gaming'
    },
    fr: {
      name: 'AMD Ryzen 5 7600X & RTX 4060 PC Gaming Économique 1080p',
      description: 'Une configuration économique optimisée pour le jeu 1080p avec support de la DDR5 et de la génération d\'images DLSS 3.',
      category: 'Gaming'
    },
    ja: {
      name: 'AMD Ryzen 5 7600X ＆ RTX 4060 お手頃1080p ゲーミングPC',
      description: 'DDR5メモリとDLSS 3フレーム生成に対応した、フルHD高画質ゲーム向けの低価格おすすめ構成。',
      category: 'ゲーミング'
    },
    zh: {
      name: 'AMD 锐龙 5 7600X 与 RTX 4060 亲民百元级高刷游戏主机',
      description: '专为1080p高帧率电竞打造的高性价比入门配置，支持DDR5内存与DLSS 3插帧技术。',
      category: '亲民电竞'
    }
  },
  'core-i5-14400f-arc-b580-intel-budget': {
    en: {
      name: 'Intel Core i5-14400F & Arc B580 Intel Gaming Rig',
      description: 'A compelling all-Intel budget build featuring the efficient Core i5-14400F and Intel\'s Arc B580 Battlemage GPU with 12GB VRAM.',
      category: 'Gaming'
    },
    de: {
      name: 'Intel Core i5-14400F & Arc B580 All-Intel Budget-PC',
      description: 'Attraktives All-Intel-System für preisbewusste Spieler mit Core i5-14400F und 12 GB VRAM der Arc B580 Battlemage.',
      category: 'Gaming'
    },
    es: {
      name: 'Intel Core i5-14400F y Arc B580 Montaje Todo-Intel Económico',
      description: 'Atractivo montaje 100% Intel con procesador Core i5-14400F y la nueva gráfica Intel Arc B580 de 12GB de VRAM.',
      category: 'Gaming'
    },
    fr: {
      name: 'Intel Core i5-14400F & Arc B580 PC Gaming 100% Intel Abordable',
      description: 'Configuration séduisante tout-Intel associant le Core i5-14400F et la carte Arc B580 Battlemage avec 12 Go de VRAM.',
      category: 'Gaming'
    },
    ja: {
      name: 'Intel Core i5-14400F ＆ Arc B580 オールIntel格安構成',
      description: '省電力なCore i5-14400Fと12GB VRAM搭載のIntel Arc B580 Battlemageによる高コスパなオールIntel PC。',
      category: 'ゲーミング'
    },
    zh: {
      name: '英特尔酷睿 i5-14400F 与 锐炫 Arc B580 全蓝厂高性价比装机',
      description: '极具性价比的全Intel平台，搭载酷睿i5-14400F与拥有12GB大显存的Arc B580显卡。',
      category: '亲民电竞'
    }
  },
  'ryzen-7-7700x-rx-7900-xt-gaming-pro': {
    en: {
      name: 'AMD Ryzen 7 7700X & Radeon RX 7900 XT High-FPS Gaming',
      description: 'A high-refresh-rate 1440p and entry-level 4K gaming build pairing the 8-core Ryzen 7 7700X with the powerful Radeon RX 7900 XT with 20GB VRAM.',
      category: 'Gaming'
    },
    de: {
      name: 'AMD Ryzen 7 7700X & Radeon RX 7900 XT High-FPS Gaming-PC',
      description: 'Leistungsstarkes 1440p- und 4K-Setup mit dem 8-Kern Ryzen 7 7700X und der 20 GB VRAM Radeon RX 7900 XT.',
      category: 'Gaming'
    },
    es: {
      name: 'AMD Ryzen 7 7700X y Radeon RX 7900 XT Gaming Pro Altos FPS',
      description: 'Montaje para 1440p y 4K con altos fotogramas que combina el Ryzen 7 7700X de 8 núcleos con la Radeon RX 7900 XT de 20GB.',
      category: 'Gaming'
    },
    fr: {
      name: 'AMD Ryzen 7 7700X & Radeon RX 7900 XT PC Gaming Hautes Fréquences',
      description: 'Configuration puissante pour le jeu 1440p et 4K combinant le Ryzen 7 7700X et les 20 Go de VRAM de la RX 7900 XT.',
      category: 'Gaming'
    },
    ja: {
      name: 'AMD Ryzen 7 7700X ＆ Radeon RX 7900 XT 高FPSゲーミング',
      description: '8コアRyzen 7 7700Xと20GB大容量VRAMを誇るRadeon RX 7900 XTによる高リフレッシュレートゲーミング構成。',
      category: 'ゲーミング'
    },
    zh: {
      name: 'AMD 锐龙 7 7700X 与 Radeon RX 7900 XT 高刷高画质电竞装机',
      description: '专为2K高刷与4K入门打造的高端配置，配备8核锐龙7 7700X与拥有20GB超大显存的RX 7900 XT。',
      category: '高端电竞'
    }
  },
  'core-ultra-5-245kf-rtx-4070-balanced-creator': {
    en: {
      name: 'Intel Core Ultra 5 245KF & RTX 4070 Balanced Creator PC',
      description: 'A well-balanced creator and gaming hybrid build featuring the Intel Core Ultra 5 245KF and the capable RTX 4070 with 12GB VRAM.',
      category: 'Workstation'
    },
    de: {
      name: 'Intel Core Ultra 5 245KF & RTX 4070 Ausgewogener Creator-PC',
      description: 'Ausgewogenes Hybrid-System für Content Creation und Gaming mit Intel Core Ultra 5 245KF und RTX 4070 mit 12 GB VRAM.',
      category: 'Workstation'
    },
    es: {
      name: 'Intel Core Ultra 5 245KF y RTX 4070 PC Equilibrado para Creadores',
      description: 'Híbrido equilibrado para creación de contenido y juegos con Intel Core Ultra 5 245KF y la solvente RTX 4070 de 12GB.',
      category: 'Estación de Trabajo'
    },
    fr: {
      name: 'Intel Core Ultra 5 245KF & RTX 4070 PC Hybride Création & Jeu',
      description: 'Une machine polyvalente associant l\'Intel Core Ultra 5 245KF et la carte RTX 4070 dotée de 12 Go de VRAM.',
      category: 'Station de Travail'
    },
    ja: {
      name: 'Intel Core Ultra 5 245KF ＆ RTX 4070 クリエイター兼ゲームPC',
      description: 'Intel Core Ultra 5 245KFと12GB VRAMのRTX 4070を搭載した、動画編集とゲームを両立するハイブリッド構成。',
      category: 'ワークステーション'
    },
    zh: {
      name: '英特尔酷睿 Ultra 5 245KF 与 RTX 4070 全能创作与游戏主机',
      description: '兼顾轻度内容创作与2K高画质游戏的均衡主机，搭载酷睿Ultra 5 245KF与12GB显存的RTX 4070。',
      category: '全能创作'
    }
  },
  'ryzen-9-7950x-rtx-4070-ti-super-prodigy': {
    en: {
      name: 'AMD Ryzen 9 7950X & RTX 4070 Ti SUPER Productivity Beast',
      description: 'A productivity-first workstation optimized for CPU-heavy workloads like software compilation, 3D rendering, and scientific computing with 16 cores and 64GB DDR5.',
      category: 'Workstation'
    },
    de: {
      name: 'AMD Ryzen 9 7950X & RTX 4070 Ti SUPER Produktivitäts-Monster',
      description: 'Produktivitäts-Workstation für Software-Kompilierung und 3D-Rendering mit 16-Kern Ryzen 9 7950X und RTX 4070 Ti SUPER.',
      category: 'Workstation'
    },
    es: {
      name: 'AMD Ryzen 9 7950X y RTX 4070 Ti SUPER Bestia de Productividad',
      description: 'Estación de trabajo optimizada para compilación de código, renderizado 3D y cálculo científico con 16 núcleos y 64GB DDR5.',
      category: 'Estación de Trabajo'
    },
    fr: {
      name: 'AMD Ryzen 9 7950X & RTX 4070 Ti SUPER Monstre de Productivité',
      description: 'Station de travail taillée pour la compilation logicielle et le rendu 3D avec le processeur 16 cœurs Ryzen 9 7950X et 64 Go DDR5.',
      category: 'Station de Travail'
    },
    ja: {
      name: 'AMD Ryzen 9 7950X ＆ RTX 4070 Ti SUPER 圧倒的生産性ワークステーション',
      description: '16コアRyzen 9 7950XとRTX 4070 Ti SUPER、64GB DDR5メモリを搭載したプログラミング・3D制作向けモンスター構成。',
      category: 'ワークステーション'
    },
    zh: {
      name: 'AMD 锐龙 9 7950X 与 RTX 4070 Ti SUPER 极致生产力怪兽工作站',
      description: '面向软件编译、3D渲染及科学计算的专业工作站，搭载16核32线程锐龙9 7950X与RTX 4070 Ti SUPER。',
      category: '生产力工作站'
    }
  },
  'core-i3-14100f-arc-b570-extreme-budget': {
    en: {
      name: 'Intel Core i3-14100F & Arc B570 Extreme Budget Build',
      description: 'The ultimate entry-level gaming PC for under $600 with smooth 1080p performance for competitive esports titles like Valorant and CS2.',
      category: 'Gaming'
    },
    de: {
      name: 'Intel Core i3-14100F & Arc B570 Extrem-Budget Gaming-PC',
      description: 'Der ultimative Budget-Gaming-PC für unter 600€ mit flüssiger 1080p-Leistung für Esports-Titel wie Valorant und CS2.',
      category: 'Gaming'
    },
    es: {
      name: 'Intel Core i3-14100F y Arc B570 Montaje Ultra Económico',
      description: 'El PC gaming de iniciación definitivo por menos de 600€ para jugar a títulos competitivos como Valorant y CS2 en 1080p.',
      category: 'Gaming'
    },
    fr: {
      name: 'Intel Core i3-14100F & Arc B570 PC Gaming Ultra Petit Budget',
      description: 'Le PC gaming d\'entrée de gamme idéal à moins de 600€ pour les jeux compétitifs comme Valorant et CS2 en 1080p fluide.',
      category: 'Gaming'
    },
    ja: {
      name: 'Intel Core i3-14100F ＆ Arc B570 激安エントリーゲーミングPC',
      description: 'ValorantやCS2などのeスポーツ系タイトルをフルHDで快適にプレイできる超低価格エントリー構成。',
      category: 'ゲーミング'
    },
    zh: {
      name: '英特尔酷睿 i3-14100F 与 锐炫 Arc B570 极限性价比入门装机',
      description: '千元级入门电竞利器，畅玩无畏契约、CS2与永劫无间等1080p电竞网游。',
      category: '极限性价比'
    }
  }
};

export function getLocalizedBuild(
  build: { slug: string; name: string; description: string; category?: string; useCase?: string },
  lang: Locale
): LocalizedBuildInfo {
  const trans = BUILD_TRANSLATIONS[build.slug]?.[lang];
  if (trans) return trans;

  return {
    name: build.name,
    description: build.description,
    category: build.category || build.useCase || 'Gaming'
  };
}
