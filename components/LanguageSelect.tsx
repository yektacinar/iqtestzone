'use client';

console.log("✅ LanguageSelect.tsx LOADED v123");

import { usePathname, useRouter } from 'next/navigation';
import Select, { components, SingleValueProps, OptionProps, StylesConfig } from 'react-select';
import { locales, type Locale, languageNames, languageFlags } from '@/lib/i18n';

// Helper function to convert country code to flag emoji using regional indicator symbols
// Input: "TR" -> Output: 🇹🇷
function countryCodeToFlag(countryCode: string) {
  if (!countryCode) return "";
  const cc = countryCode.trim().toUpperCase();
  return String.fromCodePoint(...cc.split("").map(ch => 127397 + ch.charCodeAt(0)));
}

// Map locale codes to country codes for flag generation
const localeToCountryCode: Record<Locale, string> = {
  en: 'GB',
  fr: 'FR',
  de: 'DE',
  no: 'NO',
  es: 'ES',
  pt: 'PT',
  pl: 'PL',
  da: 'DK',
  cs: 'CZ',
  it: 'IT',
  ro: 'RO',
  sv: 'SE',
  el: 'GR',
  lv: 'LV',
  sl: 'SI',
  hu: 'HU',
  hr: 'HR',
  fi: 'FI',
  et: 'EE',
  sk: 'SK',
  lt: 'LT',
  nl: 'NL',
  ptbr: 'BR',
  bg: 'BG',
  mt: 'MT',
  esmx: 'MX',
  ga: 'IE',
  tr: 'TR',
};

// LANGS data structure with flags - each option has unique flag based on language code
// Example structure:
// [
//   { code: 'fr', value: 'fr', label: 'Français', flag: '🇫🇷' },
//   { code: 'de', value: 'de', label: 'Deutsch', flag: '🇩🇪' },
//   { code: 'no', value: 'no', label: 'Norsk', flag: '🇳🇴' },
//   { code: 'es', value: 'es', label: 'Español', flag: '🇪🇸' },
//   ... (28 total languages, each with unique flag)
// ]
const LANGS = locales.map((locale) => ({
  code: locale, // Unique identifier for getOptionValue
  value: locale,
  label: languageNames[locale],
  flag: languageFlags[locale] || '🌐', // Each language has its own unique flag from languageFlags mapping
}));

// Verify LANGS array has correct flags
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('🔍 LANGS array verification:', LANGS.slice(0, 5).map(l => ({ 
    code: l.code, 
    flag: l.flag, 
    flagFromMap: languageFlags[l.code],
    match: l.flag === languageFlags[l.code]
  })));
}

interface LanguageOption {
  code: Locale; // Unique code for react-select
  value: Locale;
  label: string;
  flag: string; // Unique flag emoji per language
}

// Custom Option component to show flag + language name
const CustomOption = (props: OptionProps<LanguageOption>) => {
  const { data, isSelected } = props;
  
  // Generate flag emoji from country code using regional indicator symbols
  const countryCode = localeToCountryCode[data.code] || data.code.toUpperCase();
  
  return (
    <components.Option {...props}>
      <div className="flex items-center gap-2">
        <span className="text-xl leading-none" role="img" aria-label={`${data.label} flag`}>
          {countryCodeToFlag(countryCode)}
        </span>
        <span>{data.label}</span>
        {isSelected && (
          <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
    </components.Option>
  );
};

// Custom SingleValue component to show flag + language name in the selected value
const CustomSingleValue = (props: SingleValueProps<LanguageOption>) => {
  const { data } = props;
  
  if (!data) return null;
  
  // Generate flag emoji from country code using regional indicator symbols
  const countryCode = localeToCountryCode[data.code] || data.code.toUpperCase();
  
  return (
    <components.SingleValue {...props}>
      <div className="flex items-center gap-2">
        <span className="text-xl leading-none" role="img" aria-label={`${data.label} flag`}>
          {countryCodeToFlag(countryCode)}
        </span>
        <span>{data.label}</span>
      </div>
    </components.SingleValue>
  );
};

export default function LanguageSelect({ currentLocale }: { currentLocale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();

  const currentOption = LANGS.find((lang) => lang.value === currentLocale) || LANGS[0];
  

  const handleChange = (selectedOption: LanguageOption | null) => {
    if (!selectedOption) return;

    const locale = selectedOption.value;
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
    <Select<LanguageOption>
      value={currentOption}
      onChange={handleChange}
      options={LANGS}
      isSearchable={false}
      getOptionValue={(option) => option.code} // Use unique code to prevent DOM node reuse
      getOptionLabel={(option) => option.label} // Return label only, flag is rendered via formatOptionLabel
      formatOptionLabel={({ code, label }) => {
        // Generate flag emoji from country code using regional indicator symbols
        const countryCode = localeToCountryCode[code] || code.toUpperCase();
        return (
          <div className="flex items-center gap-2">
            <span className="text-xl leading-none">{countryCodeToFlag(countryCode)}</span>
            <span>{label}</span>
          </div>
        );
      }}
      components={{
        Option: CustomOption,
        SingleValue: CustomSingleValue,
      }}
      styles={{
        control: (base, state) => ({
          ...base,
          minWidth: 180,
          borderColor: state.isFocused ? '#9ca3af' : '#d1d5db',
          borderRadius: '0.5rem',
          boxShadow: state.isFocused ? '0 0 0 1px #9ca3af' : 'none',
        }),
        menu: (base) => ({
          ...base,
          zIndex: 9999,
        }),
      } as StylesConfig<LanguageOption>}
      className="react-select-container"
      classNamePrefix="react-select"
    />
  );
}
