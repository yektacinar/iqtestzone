'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { calculateIQScore } from '@/lib/questions';
import { useTranslations } from '@/lib/use-translations';
import { type Locale } from '@/lib/i18n';
import AdModal from '@/components/AdModal';
import LoginModal from '@/components/LoginModal';
import { useQuizNavigationGuard } from '@/lib/navigation-guard';

export default function ResultLockPage({ params }: { params: Promise<{ locale: Locale }> | { locale: Locale } }) {
  const router = useRouter();
  const locale = 'then' in params ? 'en' : params.locale;
  const t = useTranslations(locale);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isCalculating, setIsCalculating] = useState(true);
  const [showAdModal, setShowAdModal] = useState(false);
  const [adWatched, setAdWatched] = useState(false);
  const [showFreeResult, setShowFreeResult] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  
  // Use navigation guard for route-level protection
  useQuizNavigationGuard(locale);

  // Debug: Log translation loading
  useEffect(() => {
    if (t) {
      console.log('Translations loaded:', Object.keys(t));
    } else {
      console.log('Translations not loaded yet');
    }
  }, [t]);

  useEffect(() => {
    // Simulate calculation progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setIsCalculating(false);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Check user session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/session');
        const data = await response.json();
        if (data.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error('Failed to check session:', error);
      }
    };
    checkSession();
  }, []);

  const handleWatchAd = () => {
    setShowAdModal(true);
  };

  const handleAdComplete = () => {
    setAdWatched(true);
    setShowAdModal(false);
    // Calculate and show free result
    const answers = sessionStorage.getItem('testAnswers');
    const answerDataStr = sessionStorage.getItem('answerData');
    if (answers) {
      const parsedAnswers = JSON.parse(answers);
      const timeSpent = parseInt(sessionStorage.getItem('timeSpent') || '0');
      const answerData = answerDataStr ? JSON.parse(answerDataStr) : [];
      const calculatedResult = calculateIQScore(parsedAnswers, timeSpent, answerData);
      setResult(calculatedResult);
      sessionStorage.setItem('iqResult', JSON.stringify(calculatedResult));
      sessionStorage.setItem('packageType', 'free');
      setTimeout(() => {
        setShowFreeResult(true);
      }, 500);
    }
  };

  const handlePayment = async () => {
    // Check if user is logged in
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    // Check if test was completed
    const answers = sessionStorage.getItem('testAnswers');
    if (!answers || answers === '[]') {
      router.push(`/${locale}`);
      return;
    }

    const parsedAnswers = JSON.parse(answers);
    const timeSpent = parseInt(sessionStorage.getItem('timeSpent') || '0');
    const answerDataStr = sessionStorage.getItem('answerData');
    const answerData = answerDataStr ? JSON.parse(answerDataStr) : [];
    const calculatedResult = calculateIQScore(parsedAnswers, timeSpent, answerData);

    // Store result (don't set premium yet - wait for webhook confirmation)
    sessionStorage.setItem('iqResult', JSON.stringify(calculatedResult));

    // Redirect to payment
    router.push(`/api/payment?type=premium&locale=${locale}`);
  };

  const handleLoginSuccess = async () => {
    // Refresh user session
    try {
      const response = await fetch('/api/auth/session');
      const data = await response.json();
      if (data.user) {
        setUser(data.user);
        setShowLoginModal(false);
        // Retry payment after login
        handlePayment();
      }
    } catch (error) {
      console.error('Failed to refresh session:', error);
    }
  };

  const handleViewFreeResult = () => {
    router.push(`/${locale}/result`);
  };

  // Show loading state until translations are loaded
  if (!t || !t.resultLock) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl">
          {/* Loading State */}
          {isCalculating && (
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t.resultLock?.calculating || 'Test completed'}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {t.resultLock?.calculatingSubtitle || 'Calculating your IQ score…'}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div
                  className="bg-gray-900 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <p className="text-sm text-gray-500">
                %{Math.round(loadingProgress)} {t.resultLock?.progress || 'completed'}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          {!isCalculating && !showFreeResult && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {t.resultLock?.watchAd || 'Watch Ad to Reveal Your Basic Result'}
                </h2>
                <p className="text-gray-600 text-sm mb-6">
                  {t.resultLock?.watchAdSubtitle || 'Watch a short video to see your basic IQ range'}
                </p>
                <button
                  onClick={handleWatchAd}
                  className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors mb-4"
                >
                  {t.resultLock?.unlockFree || 'Unlock Free Result'}
                </button>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg border-2 border-gray-700 p-8 text-center text-white">
                <h3 className="text-2xl font-bold mb-2">
                  {t.resultLock?.premiumTitle || 'Weekly Premium Access'}
                </h3>
                <p className="text-gray-300 mb-4">
                  {t.resultLock?.premiumSubtitle || 'Full AI-powered analysis, detailed insights, and progress tracking'}
                </p>
                <div className="mb-4">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-3xl font-bold">{t.resultLock?.introPrice || '€1'}</span>
                    <span className="text-lg text-gray-300">{t.resultLock?.introPriceLabel || 'for the first week'}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg text-gray-300">{t.resultLock?.thenLabel || 'Then'}</span>
                    <span className="text-2xl font-bold">{t.resultLock?.regularPrice || '€30'}</span>
                    <span className="text-lg text-gray-300">/ {t.resultLock?.weekLabel || 'week'}</span>
                  </div>
                </div>
                <button
                  onClick={handlePayment}
                  className="w-full bg-white text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg mt-4"
                >
                  {t.resultLock?.startTrial || 'Start 1€ Trial'}
                </button>
                <p className="text-xs text-gray-400 mt-3">
                  {t.resultLock?.renewalDisclaimer || 'Renews weekly. Cancel anytime.'}
                </p>
              </div>
            </div>
          )}

          {/* Free Result Display */}
          {showFreeResult && result && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {t.result?.freeRange || 'Basic IQ Range'}
                  </h2>
                  <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">
                    {result.range}
                  </div>
                  <div className="text-lg text-gray-600 mb-4">
                    {result.descriptionKey && t.result
                      ? (t.result as any)[result.descriptionKey.replace('result.', '')] || result.description || ''
                      : result.description || ''}
                  </div>
                </div>
                
                <button
                  onClick={handleViewFreeResult}
                  className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors mb-4"
                >
                  {t.result?.viewResult || 'View Result'}
                </button>
              </div>

              {/* Premium Upsell */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg border-2 border-gray-700 p-8 text-center text-white">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">
                    {t.resultLock?.premiumTitle || 'Weekly Premium Access'}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {t.resultLock?.premiumSubtitle || 'Full AI-powered analysis, detailed insights, and progress tracking'}
                  </p>
                  <div className="mb-4">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-3xl font-bold">{t.resultLock?.introPrice || '€1'}</span>
                      <span className="text-lg text-gray-300">{t.resultLock?.introPriceLabel || 'for the first week'}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-lg text-gray-300">{t.resultLock?.thenLabel || 'Then'}</span>
                      <span className="text-2xl font-bold">{t.resultLock?.regularPrice || '€30'}</span>
                      <span className="text-lg text-gray-300">/ {t.resultLock?.weekLabel || 'week'}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handlePayment}
                  className="w-full bg-white text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                >
                  {t.resultLock?.startTrial || 'Start 1€ Trial'}
                </button>
                <p className="text-xs text-gray-400 mt-3">
                  {t.resultLock?.renewalDisclaimer || 'Renews weekly. Cancel anytime.'}
                </p>
              </div>
            </div>
          )}

          {/* Footer Disclaimer */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              {t.disclaimer?.text || 'This test is for entertainment and personal awareness. It is not a clinical diagnostic tool.'}
              <br />
              {t.disclaimer?.iqRanges || 'IQ scores are shown as ranges only.'}
            </p>
          </footer>
        </div>
      </div>

      {/* Ad Modal */}
      {showAdModal && (
        <AdModal
          locale={locale}
          onComplete={handleAdComplete}
          onClose={() => setShowAdModal(false)}
        />
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
        locale={locale}
      />
    </>
  );
}
