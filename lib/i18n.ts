import { notFound } from 'next/navigation';

export const locales = [
  'fr', 'de', 'no', 'es', 'pt', 'pl', 'da', 'cs', 'it', 'ro', 
  'sv', 'el', 'lv', 'sl', 'hu', 'hr', 'fi', 'et', 'sk', 'lt', 
  'nl', 'ptbr', 'bg', 'mt', 'esmx', 'ga', 'tr', 'en'
] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

// Language names for display
export const languageNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  no: 'Norsk',
  es: 'Español',
  pt: 'Português',
  pl: 'Polski',
  da: 'Dansk',
  cs: 'Čeština',
  it: 'Italiano',
  ro: 'Română',
  sv: 'Svenska',
  el: 'Ελληνικά',
  lv: 'Latviešu',
  sl: 'Slovenščina',
  hu: 'Magyar',
  hr: 'Hrvatski',
  fi: 'Suomi',
  et: 'Eesti',
  sk: 'Slovenčina',
  lt: 'Lietuvių',
  nl: 'Nederlands',
  ptbr: 'Português (Brasil)',
  bg: 'Български',
  mt: 'Malti',
  esmx: 'Español (México)',
  ga: 'Gaeilge',
  tr: 'Türkçe',
};

// Flag emojis for each language
export const languageFlags: Record<Locale, string> = {
  fr: '🇫🇷',
  de: '🇩🇪',
  no: '🇳🇴',
  es: '🇪🇸',
  pt: '🇵🇹',
  pl: '🇵🇱',
  da: '🇩🇰',
  cs: '🇨🇿',
  it: '🇮🇹',
  ro: '🇷🇴',
  sv: '🇸🇪',
  el: '🇬🇷',
  lv: '🇱🇻',
  sl: '🇸🇮',
  hu: '🇭🇺',
  hr: '🇭🇷',
  fi: '🇫🇮',
  et: '🇪🇪',
  sk: '🇸🇰',
  lt: '🇱🇹',
  nl: '🇳🇱',
  ptbr: '🇧🇷',
  bg: '🇧🇬',
  mt: '🇲🇹',
  esmx: '🇲🇽',
  en: '🇬🇧',
  ga: '🇮🇪',
  tr: '🇹🇷',
};

// Load translations
export async function getTranslations(locale: Locale) {
  try {
    const translations = await import(`@/locales/${locale}/common.json`);
    return translations.default;
  } catch (error) {
    console.error(`Failed to load translations for locale: ${locale}`, error);
    // Fallback to English
    const fallback = await import(`@/locales/${defaultLocale}/common.json`);
    return fallback.default;
  }
}

// Validate locale
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// Get locale from params
export function getLocaleFromParams(params: { locale?: string }): Locale {
  const locale = params.locale;
  if (locale && isValidLocale(locale)) {
    return locale;
  }
  return defaultLocale;
}
