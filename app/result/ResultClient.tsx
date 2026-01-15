'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { calculateIQScore } from '@/lib/questions';
import { generatePDF } from '@/lib/pdf-generator';

export default function ResultClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [result, setResult] = useState<any>(null);
  const [packageType, setPackageType] = useState<string>('free');
  const [showUpsell, setShowUpsell] = useState(false);

  useEffect(() => {
    // Check if user has completed the test
    const answers = sessionStorage.getItem('testAnswers');
    if (!answers || answers === '[]') {
      router.push('/');
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
      const parsedAnswers = JSON.parse(answers);
      const timeSpent = parseInt(sessionStorage.getItem('timeSpent') || '0');
      const calculatedResult = calculateIQScore(parsedAnswers, timeSpent);
      setResult(calculatedResult);
      sessionStorage.setItem('iqResult', JSON.stringify(calculatedResult));
    }

    if (storedPackageType) {
      setPackageType(storedPackageType);
    }

    // Check if payment was successful
    const sessionId = searchParams.get('session_id');
    if (sessionId && sessionId.startsWith('mock_') === false && sessionId.startsWith('error_') === false) {
      // Payment successful, show upsell after a delay
      setTimeout(() => {
        setShowUpsell(true);
      }, 3000);
    }
  }, [searchParams, router]);

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
    link.download = `IQ_Test_Raporu_${result.score}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleUpgrade = () => {
    router.push('/api/payment?type=premium');
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Result Display */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 md:p-12 mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            IQ Skorunuz
          </h1>
          
          <div className="mb-8">
            {packageType === 'free' ? (
              <>
                <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-3">
                  {result.range}
                </div>
                <p className="text-lg text-gray-600 mb-4">
                  Temel IQ Aralığı
                </p>
              </>
            ) : (
              <>
                <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-3">
                  {result.score}
                </div>
                <div className="text-xl text-gray-600 mb-4">
                  Skor Aralığı: {result.range}
                </div>
              </>
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <p className="text-lg text-gray-800 leading-relaxed">
              {result.description}
            </p>
          </div>

          {/* Cognitive Breakdown - Premium Only */}
          {packageType === 'premium' && result.cognitiveBreakdown && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Bilişsel Analiz
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">Desen Tanıma</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {result.cognitiveBreakdown.patternRecognition}%
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">Soyut Akıl Yürütme</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {result.cognitiveBreakdown.abstractReasoning}%
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">Karmaşık Analiz</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {result.cognitiveBreakdown.complexAnalysis}%
                  </div>
                </div>
              </div>
              <div className="mt-4 bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-2">Genel Doğruluk</div>
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
                Detaylı PDF Raporunu İndir
              </button>
            </div>
          )}

          {/* Upgrade CTA for Free Users */}
          {packageType === 'free' && (
            <div className="mt-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-2">
                Haftalık Premium Erişim
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                Tam AI destekli analiz, detaylı içgörüler ve ilerleme takibi
              </p>
              <div className="mb-4">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-2xl font-bold">€1</span>
                  <span className="text-sm text-gray-300">ilk hafta için</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm text-gray-300">Sonra</span>
                  <span className="text-xl font-bold">€30</span>
                  <span className="text-sm text-gray-300">/ hafta</span>
                </div>
              </div>
              <button
                onClick={handleUpgrade}
                className="w-full bg-white text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                1€ Denemeyi Başlat
              </button>
              <p className="text-xs text-gray-400 mt-3 text-center">
                Haftalık yenilenir. İstediğiniz zaman iptal edebilirsiniz.
              </p>
            </div>
          )}
        </div>

        {/* Upsell */}
        {showUpsell && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              EQ & Odak Testi – %40 İndirim
            </h2>
            <p className="text-gray-700 text-center mb-6">
              Duygusal zeka ve odak seviyenizi öğrenin
            </p>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                29 TL
              </div>
              <div className="text-sm text-gray-600 mb-4 line-through">
                Normal Fiyat: 49 TL
              </div>
              <button
                onClick={() => {
                  // Handle upsell purchase
                  alert('Upsell özelliği yakında eklenecek');
                }}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Şimdi Al
              </button>
            </div>
          </div>
        )}

        {/* Footer Disclaimer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            Bu test bilimsel veya klinik tanı amacı taşımaz.
            <br />
            Eğlence ve kişisel farkındalık amaçlıdır. IQ skorları aralık olarak gösterilir.
          </p>
        </footer>
      </div>
    </div>
  );
}
