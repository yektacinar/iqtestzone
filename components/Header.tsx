'use client';

import { type Locale } from '@/lib/i18n';
import BrandLogo from './BrandLogo';

interface HeaderProps {
  locale?: Locale;
}

export default function Header({ locale }: HeaderProps) {
  return (
    <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-40">
      <div className="container mx-auto px-4 h-14 md:h-16 flex items-center justify-start">
        {/* Logo - Top Left, Vertically Centered */}
        <BrandLogo locale={locale} />
      </div>
    </header>
  );
}
