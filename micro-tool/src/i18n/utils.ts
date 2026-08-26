// ============================================================
// VoltForge — i18n URL Routing & Format Utilities
// ============================================================

import { SUPPORTED_LOCALES, DEFAULT_LOCALE, LOCALES_META, type Locale, isSupportedLocale } from './locales.ts';

/**
 * Extracts the locale from a URL pathname.
 * Handles paths like /de, /de/, /de/psu-calculator, /de.html, etc.
 */
export function getLangFromUrl(url: URL | string): Locale {
  const pathname = typeof url === 'string' ? url : url.pathname;
  // Clean pathname
  const clean = pathname.replace(/^\/+/, '').split(/[?#]/)[0];
  const firstSegment = clean.split('/')[0]?.replace(/\.(html|php)$/, '');

  if (firstSegment && isSupportedLocale(firstSegment)) {
    return firstSegment;
  }
  return DEFAULT_LOCALE;
}

/**
 * Returns clean path without locale prefix or trailing slash.
 * E.g. "/de/psu-calculator/" -> "/psu-calculator"
 * E.g. "/psu-calculator" -> "/psu-calculator"
 * E.g. "/de" -> "/"
 */
export function getCleanPath(pathname: string): string {
  const clean = pathname.replace(/^\/+/, '').split(/[?#]/)[0];
  const segments = clean.split('/').filter(Boolean);

  if (segments.length === 0) return '/';

  if (isSupportedLocale(segments[0])) {
    segments.shift();
  }

  const result = '/' + segments.join('/');
  return result === '' ? '/' : result;
}

/**
 * Generates a localized path for a given clean path and target language.
 * Default locale ('en') is unprefixed for SEO preservation.
 * Other locales get a subpath prefix (e.g. /de/psu-calculator).
 */
export function l(path: string, lang: Locale = DEFAULT_LOCALE): string {
  const clean = getCleanPath(path);

  if (lang === DEFAULT_LOCALE) {
    return clean;
  }

  return clean === '/' ? `/${lang}` : `/${lang}${clean}`;
}

/**
 * Returns array of bidirectional hreflang link descriptors + x-default.
 */
export function getAlternateHreflangLinks(pathname: string, origin: string = 'https://psucheck.com'): Array<{ lang: string; href: string }> {
  const cleanPath = getCleanPath(pathname);
  const links: Array<{ lang: string; href: string }> = [];

  for (const locale of SUPPORTED_LOCALES) {
    const locPath = l(cleanPath, locale);
    links.push({
      lang: locale,
      href: `${origin}${locPath === '/' ? '' : locPath}`,
    });
  }

  // x-default points to default English route
  const defaultPath = l(cleanPath, DEFAULT_LOCALE);
  links.push({
    lang: 'x-default',
    href: `${origin}${defaultPath === '/' ? '' : defaultPath}`,
  });

  return links;
}

export function getDir(lang: Locale): 'ltr' | 'rtl' {
  return LOCALES_META[lang]?.dir ?? 'ltr';
}

export function formatNumber(num: number, lang: Locale): string {
  try {
    return new Intl.NumberFormat(lang).format(num);
  } catch {
    return num.toLocaleString();
  }
}

export function formatCurrency(num: number, lang: Locale, customSymbol?: string): string {
  const symbol = customSymbol || LOCALES_META[lang]?.currencySymbol || '$';
  return `${symbol}${formatNumber(num, lang)}`;
}
