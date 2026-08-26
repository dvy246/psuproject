// ============================================================
// VoltForge — i18n Master Module & Hook
// ============================================================

import { SUPPORTED_LOCALES, DEFAULT_LOCALE, type Locale } from './locales.ts';
import type { TranslationSchema } from './schema.ts';
import { en } from './dict/en.ts';
import { de } from './dict/de.ts';
import { es } from './dict/es.ts';
import { fr } from './dict/fr.ts';
import { ja } from './dict/ja.ts';
import { zh } from './dict/zh.ts';

export const DICTIONARIES: Record<Locale, TranslationSchema> = {
  en,
  de,
  es,
  fr,
  ja,
  zh,
};

/**
 * Returns the dictionary for the given locale.
 * Fallback to English if an unknown locale is passed.
 */
export function getDictionary(lang: Locale = DEFAULT_LOCALE): TranslationSchema {
  return DICTIONARIES[lang] || DICTIONARIES[DEFAULT_LOCALE];
}

/**
 * Hook/helper providing translation lookup.
 */
export function useTranslations(lang: Locale = DEFAULT_LOCALE): TranslationSchema {
  return getDictionary(lang);
}

export * from './locales.ts';
export * from './schema.ts';
export * from './utils.ts';
