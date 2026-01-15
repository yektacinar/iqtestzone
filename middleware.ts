import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './lib/i18n';

// Get locale from Accept-Language header or default
function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    // Parse Accept-Language header
    const languages = acceptLanguage
      .split(',')
      .map(lang => {
        const [code, q = 'q=1'] = lang.trim().split(';');
        return { code: code.toLowerCase().split('-')[0], quality: parseFloat(q.split('=')[1] || '1') };
      })
      .sort((a, b) => b.quality - a.quality);

    // Find first matching locale
    for (const lang of languages) {
      const matchingLocale = locales.find(locale => locale.startsWith(lang.code) || lang.code === locale);
      if (matchingLocale) {
        return matchingLocale;
      }
    }
  }

  // Check if locale is stored in cookie
  const cookieLocale = request.cookies.get('locale')?.value;
  if (cookieLocale && (locales as readonly string[]).includes(cookieLocale)) {
    return cookieLocale;
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Special redirect for /pricing to /tr/pricing (default locale)
  if (pathname === '/pricing') {
    const newUrl = new URL('/tr/pricing', request.url);
    return NextResponse.redirect(newUrl);
  }
  
  // Special redirect for /refund-policy to /tr/refund-policy (default locale)
  if (pathname === '/refund-policy') {
    const newUrl = new URL('/tr/refund-policy', request.url);
    return NextResponse.redirect(newUrl);
  }
  
  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Skip middleware for API routes, static files, _next, and public pages
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname === '/terms' ||
    pathname === '/privacy' ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // If pathname already has locale, continue
  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Get locale and redirect
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
