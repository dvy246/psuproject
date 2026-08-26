// ============================================================
// VoltForge — Translation Schema Type Definition
// 100% Strict Parity Contract for all Locales
// ============================================================

export interface TranslationSchema {
  nav: {
    brand: string;
    home: string;
    calculatorsDropdown: string;
    buildBlueprint: string;
    psuCalculator: string;
    psuChecker: string;
    psuReplacement: string;
    pcBuilder: string;
    psuFinder: string;
    upsCalculator: string;
    breakerCalculator: string;
    usbCharger: string;
    desktopVsLaptop: string;
    diagnosticWizard: string;
    completedBuilds: string;
    guides: string;
    aboutUs: string;
    search: string;
    searchAria: string;
    themeToggleAria: string;
    themeDarkAria: string;
    themeLightAria: string;
    menuOpenAria: string;
    menuCloseAria: string;
    languageSelectAria: string;
    skipToContent: string;
  };

  hero: {
    badge: string;
    titleLine1: string;
    titleHighlight: string;
    titleLine2: string;
    subtitle: string;
    ctaWorkbench: string;
    ctaPsuChecker: string;
    ctaBestPsu: string;
    statComponents: string;
    statAccuracy: string;
    statTransient: string;
    statFree: string;
  };

  common: {
    calculate: string;
    calculating: string;
    reset: string;
    clear: string;
    compare: string;
    details: string;
    close: string;
    back: string;
    next: string;
    submit: string;
    share: string;
    shareBuild: string;
    copyLink: string;
    linkCopied: string;
    viewAll: string;
    learnMore: string;
    yes: string;
    no: string;
    safe: string;
    warning: string;
    danger: string;
    recommended: string;
    optional: string;
    auto: string;
    manual: string;
    custom: string;
    save: string;
    edit: string;
    loading: string;
    error: string;
    success: string;
    watts: string;
    volts: string;
    amps: string;
    confidence: string;
    selected: string;
    none: string;
    total: string;
  };

  calculators: {
    baysTitle: string;
    baysFilled: string;
    baysEmpty: string;
    baysCount: string;
    bayCpu: string;
    bayGpu: string;
    bayMotherboard: string;
    bayRam: string;
    bayStorage: string;
    bayCooling: string;
    bayPsu: string;
    bayCase: string;
    selectCpu: string;
    selectGpu: string;
    selectMotherboard: string;
    selectRam: string;
    selectStorage: string;
    selectCooling: string;
    selectPsu: string;
    selectCase: string;
    searchPlaceholder: string;
    tdpLabel: string;
    tbpLabel: string;
    transientLabel: string;
    continuousLoad: string;
    transientSpike: string;
    recommendedWattage: string;
    safetyBuffer: string;
    capacitorAging: string;
    overclocking: string;
    cpuOverclock: string;
    gpuOverclock: string;
    atxStandard: string;
    native12v2x6: string;
    adapterWarning: string;
    rail12v: string;
    rail5v: string;
    rail3v3: string;
    hudTitle: string;
    hudSubtitle: string;
    hudEmpty: string;
    effectiveWattage: string;
  };

  verdicts: {
    safeBadge: string;
    safeTitle: string;
    safeDesc: string;
    borderlineBadge: string;
    borderlineTitle: string;
    borderlineDesc: string;
    dangerBadge: string;
    dangerTitle: string;
    dangerDesc: string;
    confidenceScore: string;
    selectPrompt: string;
  };

  cost: {
    title: string;
    subtitle: string;
    totalBuildCost: string;
    costDistribution: string;
    cpuCost: string;
    gpuCost: string;
    motherboardCost: string;
    ramCost: string;
    storageCost: string;
    psuCost: string;
    coolingCost: string;
    caseCost: string;
    osCost: string;
    monitorCost: string;
    peripheralsCost: string;
    taxRate: string;
    assemblyFee: string;
    optimizationTips: string;
    downgradeGpu: string;
    downgradeCpu: string;
    noBuild: string;
  };

  tco: {
    title: string;
    subtitle: string;
    kwhRate: string;
    dailyHours: string;
    fiveYearCost: string;
    efficiencySavings: string;
    bronzeVsTitanium: string;
    goldVsPlatinum: string;
    annualSavings: string;
  };

  breaker: {
    title: string;
    subtitle: string;
    circuitRating: string;
    continuousLimit: string;
    wallPower: string;
    tripRiskSafe: string;
    tripRiskHigh: string;
    breaker15A: string;
    breaker20A: string;
  };

  ups: {
    title: string;
    subtitle: string;
    recommendedVa: string;
    runtimeMinutes: string;
    powerFactor: string;
    surgeProtection: string;
  };

  diagnostics: {
    title: string;
    subtitle: string;
    startWizard: string;
    stepCounter: string;
    symptomsTitle: string;
    symptomShutdown: string;
    symptomCoilWhine: string;
    symptomSparks: string;
    symptomBlackScreen: string;
    symptomNoise: string;
    emergencyWarning: string;
    emergencyAction: string;
    diagnosisResult: string;
    replacementAdvice: string;
  };

  feedback: {
    helpfulQuestion: string;
    yesBtn: string;
    noBtn: string;
    thanks: string;
    shareLabel: string;
  };

  footer: {
    aboutTitle: string;
    aboutDesc: string;
    methodologyNote: string;
    calculatorsCol: string;
    guidesCol: string;
    companyCol: string;
    copyright: string;
    affiliateDisclosure: string;
    privacy: string;
    terms: string;
    disclaimer: string;
    contact: string;
    methodology: string;
    editorialPolicy: string;
  };

  search: {
    paletteTitle: string;
    placeholder: string;
    hintKbd: string;
    recentSearches: string;
    popularTools: string;
    noResults: string;
    typeCpu: string;
    typeGpu: string;
    typePsu: string;
    typeTool: string;
    typeGuide: string;
    typeCombo: string;
    typeUpgrade: string;
  };

  homepageCards: {
    workbenchTitle: string;
    workbenchDesc: string;
    atx31Title: string;
    atx31Desc: string;
    transientTitle: string;
    transientDesc: string;
    tcoTitle: string;
    tcoDesc: string;
    breakerTitle: string;
    breakerDesc: string;
    upsTitle: string;
    upsDesc: string;
    cableTitle: string;
    cableDesc: string;
    databaseTitle: string;
    databaseDesc: string;
    faqSectionTitle: string;
    faqSectionSubtitle: string;
  };

  bestPsu: {
    title: string;
    subtitle: string;
    tierA: string;
    tierB: string;
    tierC: string;
    tierADesc: string;
    tierBDesc: string;
    tierCDesc: string;
  };

  voltBot: {
    welcome: string;
    btnSizeBuild: string;
    btnCheckGpu: string;
    btnTroubleshoot: string;
    btnCables: string;
    btnUpsBreaker: string;
    btnBestPsu: string;
    typing: string;
    inputPlaceholder: string;
  };

  seo: {
    defaultTitle: string;
    defaultDescription: string;
    psuCalcTitle: string;
    psuCalcDescription: string;
    pcBuilderTitle: string;
    pcBuilderDescription: string;
    psuCheckerTitle: string;
    psuCheckerDescription: string;
    bestPsuTitle: string;
    bestPsuDescription: string;
    buildPlanTitle: string;
    buildPlanDescription: string;
    diagnoseTitle: string;
    diagnoseDescription: string;
  };
}
