'use client';

import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { type Locale, locales, isValidLocale } from '@/lib/i18n';
import ExitConfirmModal from './ExitConfirmModal';
import UpsellConfirmModal from './UpsellConfirmModal';

interface BrandLogoProps {
  locale?: Locale;
  allowNavigateWithoutConfirm?: boolean;
  isQuizInProgress?: boolean;
}

export default function BrandLogo({ 
  locale, 
  allowNavigateWithoutConfirm = true,
  isQuizInProgress: propIsQuizInProgress 
}: BrandLogoProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showUpsellConfirm, setShowUpsellConfirm] = useState(false);
  const [isQuizInProgress, setIsQuizInProgress] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [hasPremiumAccess, setHasPremiumAccess] = useState(false);
  
  // Determine current locale
  let currentLocale: Locale = 'en';
  if (locale) {
    currentLocale = locale;
  } else if (pathname) {
    const pathSegments = pathname.split('/').filter(Boolean);
    const possibleLocale = pathSegments[0];
    if (isValidLocale(possibleLocale)) {
      currentLocale = possibleLocale;
    }
  }
  
  const homePath = `/${currentLocale}`;

  // Determine quiz state: in progress, completed, premium status
  useEffect(() => {
    const checkQuizState = async () => {
      // Use prop if provided, otherwise detect from state
      if (propIsQuizInProgress !== undefined) {
        setIsQuizInProgress(propIsQuizInProgress);
      }

      // Check if we're on ANY quiz-related route (quiz flow)
      const isQuizRoute = pathname?.includes('/test') || 
                         pathname?.includes('/gender') || 
                         pathname?.includes('/result-lock');
      
      // Check if quiz has actual progress (answers exist)
      const genderStepCompleted = sessionStorage.getItem('genderStepCompleted');
      const answers = sessionStorage.getItem('testAnswers');
      const testCompleted = sessionStorage.getItem('testCompleted') === 'true';
      const isOnResultPage = pathname?.includes('/result') && !pathname?.includes('/result-lock');
      
      let hasAnswers = false;
      try {
        if (answers) {
          const parsedAnswers = JSON.parse(answers);
          hasAnswers = Array.isArray(parsedAnswers) && parsedAnswers.length > 0;
        }
      } catch (e) {
        // Invalid JSON
      }
      
      const testStarted = genderStepCompleted === 'true';
      
      // Quiz is in progress if:
      // On quiz route AND test started AND has answers AND not completed
      const quizInProgress = isQuizRoute && testStarted && hasAnswers && !isOnResultPage;
      setIsQuizInProgress(quizInProgress);
      
      // Quiz is completed if:
      // Test completed flag is set AND on result page
      const quizCompleted = testCompleted && isOnResultPage;
      setIsQuizCompleted(quizCompleted);
      
      // Check premium access if quiz is completed
      if (quizCompleted) {
        const sessionId = sessionStorage.getItem('sessionId');
        if (sessionId) {
          try {
            const response = await fetch(`${window.location.origin}/api/purchase/check?session_id=${sessionId}`);
            const data = await response.json();
            setHasPremiumAccess(data.hasAccess || false);
          } catch (error) {
            console.error('Failed to check premium access:', error);
            setHasPremiumAccess(false);
          }
        } else {
          setHasPremiumAccess(false);
        }
      } else {
        setHasPremiumAccess(false);
      }
    };

    checkQuizState();
    // Re-check when pathname changes or periodically
    const interval = setInterval(checkQuizState, 500);
    return () => clearInterval(interval);
  }, [pathname, propIsQuizInProgress]);

  const handleLogoClick = (e: React.MouseEvent) => {
    // ALWAYS prevent default and stop propagation to block any navigation
    e.preventDefault();
    e.stopPropagation();
    
    // Priority 1: Quiz in progress -> show exit confirm
    if (isQuizInProgress) {
      setShowExitConfirm(true);
      return;
    }
    
    // Priority 2: Quiz completed but no premium -> show upsell
    if (isQuizCompleted && !hasPremiumAccess) {
      setShowUpsellConfirm(true);
      return;
    }
    
    // Priority 3: Quiz completed with premium -> normal navigation
    // Priority 4: Not in quiz flow -> normal navigation
    router.push(homePath);
  };

  const handleConfirmLeave = () => {
    setShowExitConfirm(false);
    router.push(homePath);
  };

  const handleCancelLeave = () => {
    setShowExitConfirm(false);
  };

  const handleGoHome = () => {
    setShowUpsellConfirm(false);
    router.push(homePath);
  };

  const handleCloseUpsell = () => {
    setShowUpsellConfirm(false);
  };

  // Determine if we're on a quiz route (absolute safety check)
  // Quiz routes: /test, /gender, /result-lock
  const isQuizRoute = pathname?.includes('/test') || 
                     pathname?.includes('/gender') || 
                     pathname?.includes('/result-lock');
  
  // ABSOLUTE GUARANTEE: ALWAYS use button (no href) when:
  // 1. On quiz route (test, gender, result-lock pages) - PRIMARY CHECK
  // 2. Quiz is in progress (has answers and test started)
  // 3. Confirmation required
  // NEVER use <a> or <Link> on quiz routes - this prevents any navigation
  const shouldUseButton = isQuizRoute || !allowNavigateWithoutConfirm || isQuizInProgress;

  return (
    <>
      {shouldUseButton ? (
        // ALWAYS use button on quiz routes - NO href, NO navigation without confirmation
        // This is the ONLY way logo is rendered during quiz - absolute guarantee
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded cursor-pointer bg-transparent border-0 p-0 m-0 appearance-none"
          aria-label="IQTestZone Home"
          type="button"
        >
          <Image
            src="/logo.svg"
            alt="IQTestZone"
            width={200}
            height={44}
            priority
            className="h-10 md:h-12 w-auto pointer-events-none"
          />
        </button>
      ) : (
        // Only use anchor when NOT on quiz route and quiz not in progress
        // This path is NEVER taken during quiz flow
        <a
          href={homePath}
          onClick={(e) => {
            // Still prevent default to use router.push for consistency
            e.preventDefault();
            router.push(homePath);
          }}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded cursor-pointer"
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
        </a>
      )}
      <ExitConfirmModal
        isOpen={showExitConfirm}
        onClose={handleCancelLeave}
        onConfirm={handleConfirmLeave}
        locale={currentLocale}
      />
      <UpsellConfirmModal
        isOpen={showUpsellConfirm}
        onClose={handleCloseUpsell}
        onGoHome={handleGoHome}
        locale={currentLocale}
      />
    </>
  );
}
