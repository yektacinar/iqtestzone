'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { locales, type Locale, languageNames, languageFlags } from '@/lib/i18n';

export default function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const switchLanguage = (locale: Locale) => {
    setIsOpen(false);
    // Replace the locale in the pathname
    const segments = pathname.split('/');
    if (segments[1] && locales.includes(segments[1] as Locale)) {
      segments[1] = locale;
    } else {
      segments.splice(1, 0, locale);
    }
    const newPath = segments.join('/');
    router.push(newPath);
    // Store preference in cookie
    document.cookie = `locale=${locale}; path=/; max-age=31536000`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        aria-label="Change language"
      >
        <span className="text-2xl leading-none" role="img" aria-label={`${languageNames[currentLocale]} flag`}>
          {languageFlags[currentLocale] || '🌐'}
        </span>
        <span className="hidden sm:inline">{languageNames[currentLocale]}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-20 py-1 max-h-96 overflow-y-auto">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => switchLanguage(locale)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors flex items-center gap-2 ${
                  currentLocale === locale ? 'bg-gray-50 font-medium text-gray-900' : 'text-gray-700'
                }`}
              >
                <span className="text-xl leading-none" role="img" aria-label={`${languageNames[locale]} flag`}>
                  {languageFlags[locale] || '🌐'}
                </span>
                <span>{languageNames[locale]}</span>
                {currentLocale === locale && (
                  <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
