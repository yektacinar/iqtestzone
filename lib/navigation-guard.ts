'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

/**
 * Navigation guard to prevent leaving quiz pages without confirmation
 * This provides route-level protection as an extra safety layer
 */
export function useQuizNavigationGuard(locale: string) {
  const router = useRouter();
  const pathname = usePathname();
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    // Check if we're on a quiz route
    const isQuizRoute = pathname?.includes('/test') || 
                       pathname?.includes('/gender') || 
                       pathname?.includes('/result-lock');
    
    if (!isQuizRoute) {
      return; // No guard needed on non-quiz pages
    }

    // Check quiz progress
    const checkQuizProgress = () => {
      const genderStepCompleted = sessionStorage.getItem('genderStepCompleted');
      const answers = sessionStorage.getItem('testAnswers');
      const testCompleted = sessionStorage.getItem('testCompleted') === 'true';
      
      let hasAnswers = false;
      try {
        if (answers) {
          const parsedAnswers = JSON.parse(answers);
          hasAnswers = Array.isArray(parsedAnswers) 
            ? parsedAnswers.length > 0
            : Object.keys(parsedAnswers || {}).length > 0;
        }
      } catch (e) {
        // Invalid JSON
      }
      
      const testStarted = genderStepCompleted === 'true';
      return testStarted && hasAnswers && !testCompleted;
    };

    const isQuizInProgress = checkQuizProgress();

    // Handle browser navigation (back/forward buttons, URL changes)
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isQuizInProgress) {
        e.preventDefault();
        e.returnValue = ''; // Chrome requires returnValue to be set
        return '';
      }
    };

    // Add beforeunload listener
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Intercept Next.js router navigation attempts
    // Note: Next.js router doesn't provide a direct way to intercept all navigations
    // This guard works in conjunction with the QuizHeader button handler
    // The button handler is the primary protection, this is extra safety

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname, locale]);
}

/**
 * Check if quiz is currently in progress
 */
export function isQuizInProgress(): boolean {
  if (typeof window === 'undefined') return false;
  
  const genderStepCompleted = sessionStorage.getItem('genderStepCompleted');
  const answers = sessionStorage.getItem('testAnswers');
  const testCompleted = sessionStorage.getItem('testCompleted') === 'true';
  
  let hasAnswers = false;
  try {
    if (answers) {
      const parsedAnswers = JSON.parse(answers);
      hasAnswers = Array.isArray(parsedAnswers) 
        ? parsedAnswers.length > 0
        : Object.keys(parsedAnswers || {}).length > 0;
    }
  } catch (e) {
    // Invalid JSON
  }
  
  const testStarted = genderStepCompleted === 'true';
  return testStarted && hasAnswers && !testCompleted;
}

/**
 * Reset quiz state (only call after user confirms leaving)
 */
export function resetQuizState() {
  if (typeof window === 'undefined') return;
  
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
}
