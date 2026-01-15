'use client';

import Link from 'next/link';
import Image from 'next/image';
import { type Locale } from '@/lib/i18n';

interface StandardHeaderProps {
  locale: Locale;
}

export default function StandardHeader({ locale }: StandardHeaderProps) {
  const homePath = `/${locale}`;

  return (
    <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-40">
      <div className="container mx-auto px-4 h-14 md:h-16 flex items-center justify-start">
        {/* Logo - Link to home (safe on non-quiz pages) */}
        <Link
          href={homePath}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded"
          aria-label="IQTestZone Home"
        >
          <Image
            src="/logo.svg"
            alt="IQTestZone"
            width={200}
            height={44}
            priority
            className="h-10 md:h-12 w-auto"
          />
        </Link>
      </div>
    </header>
  );
}
