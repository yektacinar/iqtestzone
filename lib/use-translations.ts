'use client';

import { useState, useEffect } from 'react';
import type { Locale } from './i18n';

let translationCache: Record<string, any> = {};

export function useTranslations(locale: Locale) {
  const [translations, setTranslations] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    // Check cache first
    if (translationCache[locale]) {
      setTranslations(translationCache[locale]);
      setIsLoading(false);
      return;
    }

    // Load translations from JSON file
    import(`@/locales/${locale}/common.json`)
      .then((module) => {
        translationCache[locale] = module.default;
        setTranslations(module.default);
        setIsLoading(false);
      })
      .catch(() => {
        // Fallback to English
        import(`@/locales/en/common.json`)
          .then((module) => {
            translationCache[locale] = module.default;
            setTranslations(module.default);
            setIsLoading(false);
          })
          .catch(() => {
            // Final fallback - return empty structure
            setTranslations({});
            setIsLoading(false);
          });
      });
  }, [locale]);

  // Return translations or null if still loading
  return isLoading ? null : (translations || {});
}
