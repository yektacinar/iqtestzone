'use client';

import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { type Locale } from '@/lib/i18n';
import ExitConfirmModal from './ExitConfirmModal';

interface QuizHeaderProps {
  locale: Locale;
}

export default function QuizHeader({ locale }: QuizHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [isQuizInProgress, setIsQuizInProgress] = useState(false);
  
  const homePath = `/${locale}`;

  // Check quiz progress state
  useEffect(() => {
    const checkQuizProgress = () => {
      const genderStepCompleted = sessionStorage.getItem('genderStepCompleted');
      const answers = sessionStorage.getItem('testAnswers');
      const testCompleted = sessionStorage.getItem('testCompleted') === 'true';
      
      // Quiz is in progress if:
      // - Gender step completed (test started)
      // - Has answers
      // - Not completed
      let hasAnswers = false;
      try {
        if (answers) {
          const parsedAnswers = JSON.parse(answers);
          if (Array.isArray(parsedAnswers)) {
            hasAnswers = parsedAnswers.length > 0;
          } else if (typeof parsedAnswers === 'object' && parsedAnswers !== null) {
            hasAnswers = Object.keys(parsedAnswers).length > 0;
          }
        }
      } catch (e) {
        // Invalid JSON
      }
      
      const testStarted = genderStepCompleted === 'true';
      const quizInProgress = testStarted && hasAnswers && !testCompleted;
      
      setIsQuizInProgress(quizInProgress);
    };

    checkQuizProgress();
    // Re-check more frequently to catch state changes
    const interval = setInterval(checkQuizProgress, 200);
    return () => clearInterval(interval);
  }, [pathname]);

  const handleLogoClick = (e: React.MouseEvent) => {
    // ALWAYS prevent default and stop propagation - HARD GUARANTEE
    e.preventDefault();
    e.stopPropagation();
    
    // Re-check quiz progress immediately on click (fresh check)
    const genderStepCompleted = sessionStorage.getItem('genderStepCompleted');
    const answers = sessionStorage.getItem('testAnswers');
    const testCompleted = sessionStorage.getItem('testCompleted') === 'true';
    
    // Check if we're on the test page itself (strong indicator of quiz in progress)
    const isOnTestPage = pathname?.includes('/test');
    const isOnGenderPage = pathname?.includes('/gender');
    const isOnResultLockPage = pathname?.includes('/result-lock');
    
    
    let hasAnswers = false;
    let currentQuestionIndex = 0;
    try {
      if (answers) {
        const parsedAnswers = JSON.parse(answers);
        if (Array.isArray(parsedAnswers)) {
          hasAnswers = parsedAnswers.length > 0;
          currentQuestionIndex = parsedAnswers.length;
        } else if (typeof parsedAnswers === 'object' && parsedAnswers !== null) {
          const answerKeys = Object.keys(parsedAnswers);
          hasAnswers = answerKeys.length > 0;
          currentQuestionIndex = answerKeys.length;
        }
      }
    } catch (e) {
      // Invalid JSON
    }
    
    const testStarted = genderStepCompleted === 'true';
    
    // ULTRA-SIMPLIFIED LOGIC: 
    // If on /test page AND gender step completed = ALWAYS show modal
    // This is the most aggressive check to ensure we never miss it
    let quizInProgress = false;
    
    // ABSOLUTE SIMPLEST: If on /test page, ALWAYS show modal (no conditions)
    // This is the most aggressive check - we don't care about any state
    if (isOnTestPage) {
      // FORCE show modal - don't even check testCompleted
      setShowExitConfirm(true);
      return; // CRITICAL: Return immediately
    } else if (isOnResultLockPage) {
      const genderStepCompleted = sessionStorage.getItem('genderStepCompleted');
      const testStarted = genderStepCompleted === 'true';
      if (testStarted && !testCompleted) {
        setShowExitConfirm(true);
        return;
      }
    } else if (isOnGenderPage) {
      const genderStepCompleted = sessionStorage.getItem('genderStepCompleted');
      const answers = sessionStorage.getItem('testAnswers');
      const testStarted = genderStepCompleted === 'true';
      let hasAnswers = false;
      try {
        if (answers) {
          const parsedAnswers = JSON.parse(answers);
          if (Array.isArray(parsedAnswers)) {
            hasAnswers = parsedAnswers.length > 0;
          } else if (typeof parsedAnswers === 'object' && parsedAnswers !== null) {
            hasAnswers = Object.keys(parsedAnswers).length > 0;
          }
        }
      } catch (e) {
        // Invalid JSON
      }
      if (testStarted && hasAnswers && !testCompleted) {
        setShowExitConfirm(true);
        return;
      }
    }
    
    // If we get here, quiz is not in progress, navigate normally
    router.push(homePath);
  };

  const handleConfirmLeave = () => {
    setShowExitConfirm(false);
    // Reset quiz state ONLY on confirmed leave
    sessionStorage.removeItem('testAnswers');
    sessionStorage.removeItem('iqResult');
    sessionStorage.removeItem('timeSpent');
    sessionStorage.removeItem('timeSpentByQuestionId');
    sessionStorage.removeItem('answerData');
    sessionStorage.removeItem('packageType');
    sessionStorage.removeItem('genderStepCompleted');
    sessionStorage.removeItem('userGender');
    sessionStorage.removeItem('testCompleted');
    sessionStorage.removeItem('quizStartedAt');
    // Navigate to home
    router.push(homePath);
  };

  const handleCancelLeave = () => {
    setShowExitConfirm(false);
    // Do NOT reset quiz state - stay on current page
  };

  return (
    <>
      <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="container mx-auto px-4 h-14 md:h-16 flex items-center justify-start">
          {/* Logo - MUST be button, NEVER Link or <a> - HARD GUARANTEE */}
          <button
            type="button"
            onClick={handleLogoClick}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded cursor-pointer bg-transparent border-0 p-0 m-0 appearance-none"
            aria-label="IQTestZone Home"
            style={{ zIndex: 9999 }}
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
        </div>
      </header>
      
      <ExitConfirmModal
        isOpen={showExitConfirm}
        onClose={handleCancelLeave}
        onConfirm={handleConfirmLeave}
        locale={locale}
      />
    </>
  );
}
