'use client';

import { usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n';
import StandardHeader from './StandardHeader';
import QuizHeader from './QuizHeader';
import { useQuizNavigationGuard } from '@/lib/navigation-guard';

interface HeaderSelectorProps {
  locale: Locale;
}

/**
 * HeaderSelector - Conditionally renders StandardHeader or QuizHeader
 * based on the current route. This ensures quiz routes ALWAYS use QuizHeader
 * which has button-only logo (no Link/anchor).
 */
export default function HeaderSelector({ locale }: HeaderSelectorProps) {
  const pathname = usePathname();
  
  // Use navigation guard for extra safety
  useQuizNavigationGuard(locale);
  
  // Determine if we're on a quiz route
  // Quiz routes: /test, /gender, /result-lock
  // Pathname format: /en/test, /tr/test, etc.
  const isQuizRoute = pathname?.includes('/test') || 
                     pathname?.includes('/gender') || 
                     pathname?.includes('/result-lock');
  
  // ALWAYS use QuizHeader on quiz routes - HARD GUARANTEE
  // QuizHeader uses button only, never Link or <a>
  if (isQuizRoute) {
    return <QuizHeader locale={locale} />;
  }
  
  // Use StandardHeader on all other pages
  // StandardHeader uses Link (safe on non-quiz pages)
  return <StandardHeader locale={locale} />;
}
