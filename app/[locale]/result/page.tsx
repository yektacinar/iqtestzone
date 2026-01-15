'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { calculateIQScore, getQuestions } from '@/lib/questions';
import { generatePDF } from '@/lib/pdf-generator';
import { useTranslations } from '@/lib/use-translations';
import { type Locale } from '@/lib/i18n';

const questions = getQuestions();

export default function ResultPage({ params }: { params: Promise<{ locale: Locale }> | { locale: Locale } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = 'then' in params ? 'en' : params.locale;
  const t = useTranslations(locale);
  const [result, setResult] = useState<any>(null);
  const [packageType, setPackageType] = useState<string>('free');
  const [showUpsell, setShowUpsell] = useState(false);

  useEffect(() => {
    // Check if user has completed the test
    const answers = sessionStorage.getItem('testAnswers');
    if (!answers || answers === '[]') {
      router.push(`/${locale}`);
      return;
    }

    // Get result from sessionStorage
    const storedResult = sessionStorage.getItem('iqResult');
    const storedPackageType = sessionStorage.getItem('packageType');
    
    if (storedResult) {
      const parsedResult = JSON.parse(storedResult);
      setResult(parsedResult);
    } else {
      // If no result, calculate from answers
      // New format: answers[questionId] = selectedIndex
      const parsedAnswers = JSON.parse(answers);
      const timeSpent = parseInt(sessionStorage.getItem('timeSpent') || '0');
      // New format: timeSpentByQuestionId[questionId] = timeSpentMs
      const timeSpentByQuestionIdStr = sessionStorage.getItem('timeSpentByQuestionId');
      const timeSpentByQuestionId = timeSpentByQuestionIdStr ? JSON.parse(timeSpentByQuestionIdStr) : {};
      const calculatedResult = calculateIQScore(parsedAnswers, timeSpent, timeSpentByQuestionId);
      setResult(calculatedResult);
      sessionStorage.setItem('iqResult', JSON.stringify(calculatedResult));
    }

    // Check purchase status from database
    const checkPurchaseStatus = async () => {
      const transactionId = searchParams.get('transaction_id');
      const sessionId = searchParams.get('session_id');
      
      if (transactionId || sessionId) {
        try {
          const params = new URLSearchParams();
          if (transactionId) params.set('transaction_id', transactionId);
          if (sessionId) params.set('session_id', sessionId);
          
          const response = await fetch(`${window.location.origin}/api/purchase/check?${params.toString()}`);
          const data = await response.json();
          
          if (data.hasAccess) {
            setPackageType('premium');
            sessionStorage.setItem('packageType', 'premium');
          } else if (storedPackageType) {
            setPackageType(storedPackageType);
          }
        } catch (error) {
          console.error('Failed to check purchase status:', error);
          // Fallback to stored package type
          if (storedPackageType) {
            setPackageType(storedPackageType);
          }
        }
      } else if (storedPackageType) {
        setPackageType(storedPackageType);
      }

      // Show upsell after delay if payment was successful
      if (transactionId && !transactionId.startsWith('error_')) {
        setTimeout(() => {
          setShowUpsell(true);
        }, 3000);
      }
    };

    checkPurchaseStatus();
  }, [searchParams, router, locale]);

  const handleDownloadPDF = () => {
    if (!result) return;

    const answers = JSON.parse(sessionStorage.getItem('testAnswers') || '[]');
    const timeSpent = parseInt(sessionStorage.getItem('timeSpent') || '0');

    const pdfData = {
      score: result.score,
      range: result.range,
      description: result.description,
      cognitiveBreakdown: result.cognitiveBreakdown,
      answers,
      timeSpent,
    };

    const pdfBlob = generatePDF(pdfData);
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `IQ_Test_Report_${result.score}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleUpgrade = () => {
    router.push(`/api/payment?type=premium&locale=${locale}`);
  };

  // Show loading state until translations are loaded
  if (!t) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">{t.result.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Result Display */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 md:p-12 mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {t.result.title}
          </h1>
          
          <div className="mb-8">
            {packageType === 'free' ? (
              <>
                <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-3">
                  {result.range}
                </div>
                <p className="text-lg text-gray-600 mb-4">
                  {t.result.freeRange}
                </p>
              </>
            ) : (
              <>
                <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-3">
                  {result.score}
                </div>
                <div className="text-xl text-gray-600 mb-4">
                  {t.result.score}: {result.range}
                </div>
              </>
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <p className="text-lg text-gray-800 leading-relaxed">
              {result.descriptionKey && t.result
                ? (t.result as any)[result.descriptionKey.replace('result.', '')] || result.description || ''
                : result.description || ''}
            </p>
          </div>

          {/* Debug Panel - Development Only (guarded by NEXT_PUBLIC_DEBUG=true) */}
          {process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_DEBUG === 'true' && (
            <div className="bg-gray-900 text-white rounded-lg p-6 mb-6 font-mono text-xs">
              <h3 className="text-sm font-bold mb-3 text-yellow-400">🔍 SCORING DEBUG PANEL</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-yellow-300 font-bold mb-2">Score Metrics</h4>
                  <div>
                    <span className="text-gray-400">answeredCount:</span>{' '}
                    <span className="text-white font-bold">
                      {result._debug?.answeredCount ?? result.integrity?.answeredCount ?? 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">correctCount:</span>{' '}
                    <span className="text-white font-bold">
                      {result._debug?.correctCount ?? 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">userScore:</span>{' '}
                    <span className="text-white font-bold">
                      {result._debug?.userScore ?? 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">maxScore:</span>{' '}
                    <span className="text-white font-bold">
                      {result._debug?.maxScore ?? 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">scoreRatio:</span>{' '}
                    <span className="text-white font-bold">
                      {result._debug?.scoreRatio !== undefined ? result._debug.scoreRatio.toFixed(3) : 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">iqRange:</span>{' '}
                    <span className="text-white font-bold">
                      {result._debug?.iqRange ?? result.range ?? 'N/A'}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-yellow-300 font-bold mb-2">Integrity Metrics</h4>
                  <div>
                    <span className="text-gray-400">avgTimeMs:</span>{' '}
                    <span className={result._debug?.avgTimeMs !== undefined && result._debug.avgTimeMs < 2500 ? 'text-red-400 font-bold' : 'text-white'}>
                      {result._debug?.avgTimeMs ?? result.integrity?.avgTimeMs ?? 'N/A'} ms
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">medianTimeMs:</span>{' '}
                    <span className={result._debug?.medianTimeMs !== undefined && result._debug.medianTimeMs < 2000 ? 'text-red-400 font-bold' : 'text-white'}>
                      {result._debug?.medianTimeMs ?? result.integrity?.medianTimeMs ?? 'N/A'} ms
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">fastCount:</span>{' '}
                    <span className={result._debug?.fastCount !== undefined && result._debug.fastCount >= 8 ? 'text-red-400 font-bold' : 'text-white'}>
                      {result._debug?.fastCount ?? result.integrity?.fastCount ?? 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">sameOptionRatio:</span>{' '}
                    <span className={result._debug?.sameOptionRatio !== undefined && result._debug.sameOptionRatio >= 0.70 ? 'text-red-400 font-bold' : 'text-white'}>
                      {result._debug?.sameOptionRatio !== undefined ? result._debug.sameOptionRatio.toFixed(2) : result.integrity?.sameOptionRatio?.toFixed(2) ?? 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">integrityLow:</span>{' '}
                    <span className={result._debug?.integrityLow ? 'text-red-400 font-bold' : 'text-green-400'}>
                      {result._debug?.integrityLow !== undefined ? (result._debug.integrityLow ? 'TRUE ⚠️' : 'FALSE ✓') : result.integrity?.integrityLow ? 'TRUE ⚠️' : 'FALSE ✓'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-yellow-300 text-xs">
                  <strong>Acceptance Tests:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
                    <li>All wrong → scoreRatio low, iqRange low</li>
                    <li>Most correct → scoreRatio high, iqRange high</li>
                    <li>Random fast click (15 questions &lt;1s each) → fastCount high, integrityLow true, warning visible</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Integrity Warning - MUST show if integrityLow is true, regardless of IQ range */}
          {result.integrity && result.integrity.shouldShowWarning && (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 mb-6">
              <p className="text-yellow-800 mb-4 font-semibold text-lg">
                {t.result?.integrityWarning || 'Your results may be unreliable because answers were extremely fast or repetitive. Please retake for a better estimate.'}
              </p>
              {result.integrity.warnings && result.integrity.warnings.length > 0 && (
                <ul className="text-yellow-700 text-sm mb-4 list-disc list-inside">
                  {result.integrity.warnings.map((warning: string, idx: number) => (
                    <li key={idx}>{warning}</li>
                  ))}
                </ul>
              )}
              <button
                onClick={() => {
                  // Clear test data and restart
                  sessionStorage.removeItem('testAnswers');
                  sessionStorage.removeItem('timeSpentByQuestionId');
                  sessionStorage.removeItem('answerData');
                  sessionStorage.removeItem('iqResult');
                  sessionStorage.removeItem('testCompleted');
                  sessionStorage.removeItem('quizStartedAt');
                  router.push(`/${locale}/test`);
                }}
                className="bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
              >
                {t.result?.retakeTest || 'Retake Test'}
              </button>
            </div>
          )}

          {/* Speed Comparison */}
          {result.speedComparison && result.speedComparison.percentage > 0 && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                {t.result?.speedComparison || 'Speed Comparison'}
              </h3>
              <p className="text-blue-800">
                {result.speedComparison.message === 'faster' && (
                  t.result?.fasterThanAverage?.replace('{percentage}', result.speedComparison.percentage.toString()) || 
                  `You were ${result.speedComparison.percentage}% faster than average`
                )}
                {result.speedComparison.message === 'slower' && (
                  t.result?.slowerThanAverage?.replace('{percentage}', result.speedComparison.percentage.toString()) || 
                  `You were ${result.speedComparison.percentage}% slower than average`
                )}
                {result.speedComparison.message === 'similar speed' && (
                  t.result?.similarSpeed || 'Your speed was similar to average'
                )}
              </p>
              {result.integrity?.score < 50 && result.speedComparison.message === 'faster' && (
                <p className="text-sm text-blue-700 mt-2">
                  {t.result?.speedAndIntegrity || 'Speed was high; consider retaking for reliability.'}
                </p>
              )}
            </div>
          )}

          {/* Cognitive Breakdown - Premium Only */}
          {packageType === 'premium' && result.cognitiveBreakdown && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t.result.cognitiveAnalysis}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">{t.result.visualAccuracy || 'Visual Patterns'}</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {result.cognitiveBreakdown.visualAccuracy}%
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">{t.result.numberAccuracy || 'Number Sequences'}</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {result.cognitiveBreakdown.numberAccuracy}%
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">{t.result.verbalAccuracy || 'Verbal Reasoning'}</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {result.cognitiveBreakdown.verbalAccuracy}%
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">{t.result.patternRecognition}</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {result.cognitiveBreakdown.patternRecognition}%
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">{t.result.abstractReasoning}</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {result.cognitiveBreakdown.abstractReasoning}%
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">{t.result.complexAnalysis}</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {result.cognitiveBreakdown.complexAnalysis}%
                  </div>
                </div>
              </div>
              <div className="mt-4 bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-2">{t.result.overallAccuracy}</div>
                <div className="text-2xl font-bold text-gray-900">
                  {result.cognitiveBreakdown.overallAccuracy}%
                </div>
              </div>
            </div>
          )}

          {/* PDF Download Button (for premium) */}
          {packageType === 'premium' && (
            <div className="mt-8">
              <button
                onClick={handleDownloadPDF}
                className="w-full bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-lg"
              >
                {t.result.downloadPDF}
              </button>
            </div>
          )}

          {/* Upgrade CTA for Free Users */}
          {packageType === 'free' && (
            <div className="mt-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-2">
                {t.result.premiumTitle || 'Weekly Premium Access'}
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                {t.result.premiumSubtitle || 'Full AI-powered analysis, detailed insights, and progress tracking'}
              </p>
              <div className="mb-4">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-2xl font-bold">{t.result.introPrice || '€1'}</span>
                  <span className="text-sm text-gray-300">{t.result.introPriceLabel || 'for the first week'}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm text-gray-300">{t.result.thenLabel || 'Then'}</span>
                  <span className="text-xl font-bold">{t.result.regularPrice || '€30'}</span>
                  <span className="text-sm text-gray-300">/ {t.result.weekLabel || 'week'}</span>
                </div>
              </div>
              <button
                onClick={handleUpgrade}
                className="w-full bg-white text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {t.result.startTrial || 'Start 1€ Trial'}
              </button>
              <p className="text-xs text-gray-400 mt-3 text-center">
                {t.result.renewalDisclaimer || 'Renews weekly. Cancel anytime.'}
              </p>
            </div>
          )}
        </div>

        {/* Upsell */}
        {showUpsell && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              Additional Tests Available
            </h2>
            <p className="text-gray-700 text-center mb-6">
              Discover more about your cognitive abilities
            </p>
            <div className="text-center">
              <button
                onClick={() => {
                  // Handle upsell purchase
                  alert('Upsell feature coming soon');
                }}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        )}

        {/* Footer Disclaimer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            {t.disclaimer.text}
            <br />
            {t.disclaimer.iqRanges}
          </p>
        </footer>
      </div>
    </div>
  );
}
