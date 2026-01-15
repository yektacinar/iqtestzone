'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n';

export default function Footer() {
  const pathname = usePathname();
  
  // Extract locale from pathname (e.g., /en/pricing -> 'en', /tr/pricing -> 'tr')
  // Returns null if no locale is found (root route)
  const getLocaleFromPath = (): Locale | null => {
    if (!pathname) return null;
    const segments = pathname.split('/').filter(Boolean);
    const firstSegment = segments[0];
    if (firstSegment && locales.includes(firstSegment as Locale)) {
      return firstSegment as Locale;
    }
    return null; // No locale in path (root route)
  };

  const locale = getLocaleFromPath();
  
  // Build locale-aware paths - always prefix with locale if we're in a locale context
  const getLocalizedPath = (path: string): string => {
    // If we detected a locale from the current path, always prefix the path with it
    if (locale) {
      return `/${locale}${path}`;
    }
    // For root routes (terms, privacy, etc.), keep them as-is
    return path;
  };

  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
            <Link
              href="/terms"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href={getLocalizedPath('/refund-policy')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Refund Policy
            </Link>
            <Link
              href={getLocalizedPath('/pricing')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Pricing
            </Link>
          </div>

          {/* Support Contact */}
          <div className="text-sm text-gray-600">
            Support: <a
              href="mailto:support@iqtestzone.net"
              className="text-gray-900 hover:text-gray-700 transition-colors font-medium"
            >
              support@iqtestzone.net
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
