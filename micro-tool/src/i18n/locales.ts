// ============================================================
// VoltForge — i18n Supported Locales & Metadata
// ============================================================

export const SUPPORTED_LOCALES = ['en', 'de', 'es', 'fr', 'ja', 'zh'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const TARGET_LOCALES = ['de', 'es', 'fr', 'ja', 'zh'] as const;
export type TargetLocale = (typeof TARGET_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export interface LocaleMeta {
  code: Locale;
  name: string;          // Native language name (e.g. Deutsch, 日本語)
  englishName: string;   // English name (e.g. German, Japanese)
  flag: string;          // Flag emoji or regional glyph
  dir: 'ltr' | 'rtl';
  dateFormat: string;
  currencySymbol: string;
  currencyCode: string;
}

export const LOCALES_META: Record<Locale, LocaleMeta> = {
  en: {
    code: 'en',
    name: 'English',
    englishName: 'English',
    flag: '🇺🇸',
    dir: 'ltr',
    dateFormat: 'MM/DD/YYYY',
    currencySymbol: '$',
    currencyCode: 'USD',
  },
  de: {
    code: 'de',
    name: 'Deutsch',
    englishName: 'German',
    flag: '🇩🇪',
    dir: 'ltr',
    dateFormat: 'DD.MM.YYYY',
    currencySymbol: '€',
    currencyCode: 'EUR',
  },
  es: {
    code: 'es',
    name: 'Español',
    englishName: 'Spanish',
    flag: '🇪🇸',
    dir: 'ltr',
    dateFormat: 'DD/MM/YYYY',
    currencySymbol: '€',
    currencyCode: 'EUR',
  },
  fr: {
    code: 'fr',
    name: 'Français',
    englishName: 'French',
    flag: '🇫🇷',
    dir: 'ltr',
    dateFormat: 'DD/MM/YYYY',
    currencySymbol: '€',
    currencyCode: 'EUR',
  },
  ja: {
    code: 'ja',
    name: '日本語',
    englishName: 'Japanese',
    flag: '🇯🇵',
    dir: 'ltr',
    dateFormat: 'YYYY/MM/DD',
    currencySymbol: '¥',
    currencyCode: 'JPY',
  },
  zh: {
    code: 'zh',
    name: '中文',
    englishName: 'Chinese',
    flag: '🇨🇳',
    dir: 'ltr',
    dateFormat: 'YYYY-MM-DD',
    currencySymbol: '¥',
    currencyCode: 'CNY',
  },
};

export function isSupportedLocale(lang: string): lang is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(lang);
}
