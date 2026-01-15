'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { calculateIQScore } from '@/lib/questions';

export default function ResultLockPage() {
  const router = useRouter();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isCalculating, setIsCalculating] = useState(true);
  const [showAd, setShowAd] = useState(false);
  const [adWatched, setAdWatched] = useState(false);
  const [adProgress, setAdProgress] = useState(0);
  const [showFreeResult, setShowFreeResult] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    // Simulate calculation progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setIsCalculating(false);
          setShowAd(true);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showAd && !adWatched) {
      // Simulate ad playback
      const adInterval = setInterval(() => {
        setAdProgress((prev) => {
          if (prev >= 100) {
            clearInterval(adInterval);
            setAdWatched(true);
            // Calculate and show free result
            const answers = sessionStorage.getItem('testAnswers');
            if (answers) {
              const parsedAnswers = JSON.parse(answers);
              const timeSpent = parseInt(sessionStorage.getItem('timeSpent') || '0');
              const calculatedResult = calculateIQScore(parsedAnswers, timeSpent);
              setResult(calculatedResult);
              sessionStorage.setItem('iqResult', JSON.stringify(calculatedResult));
              sessionStorage.setItem('packageType', 'free');
              setTimeout(() => {
                setShowFreeResult(true);
              }, 500);
            }
            return 100;
          }
          return prev + 2;
        });
      }, 100);

      return () => clearInterval(adInterval);
    }
  }, [showAd, adWatched]);

  const handlePayment = async (packageType: 'premium') => {
    // Check if test was completed
    const answers = sessionStorage.getItem('testAnswers');
    if (!answers || answers === '[]') {
      router.push('/');
      return;
    }

    const parsedAnswers = JSON.parse(answers);
    const timeSpent = parseInt(sessionStorage.getItem('timeSpent') || '0');
    const calculatedResult = calculateIQScore(parsedAnswers, timeSpent);

    // Store result and package type
    sessionStorage.setItem('iqResult', JSON.stringify(calculatedResult));
    sessionStorage.setItem('packageType', packageType);

    // Redirect to payment
    router.push(`/api/payment?type=${packageType}`);
  };

  const handleViewFreeResult = () => {
    router.push('/result');
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        {/* Loading State */}
        {isCalculating && (
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Test tamamlandı
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              IQ skorun hesaplanıyor…
            </p>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div
                className="bg-gray-900 h-3 rounded-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-500">
              %{Math.round(loadingProgress)} tamamlandı
            </p>
          </div>
        )}

        {/* Video Ad */}
        {showAd && !adWatched && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Ücretsiz Sonuç İçin Video İzleyin
              </h2>
              <p className="text-gray-600 text-sm">
                Temel IQ aralığınızı görmek için kısa bir video izleyin
              </p>
            </div>
            
            {/* Mock Video Player */}
            <div className="relative bg-gray-900 rounded-lg aspect-video mb-6 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <p className="text-sm opacity-75">Video Oynatılıyor...</p>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                <div
                  className="h-full bg-white transition-all duration-100"
                  style={{ width: `${adProgress}%` }}
                />
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">
                Video otomatik olarak oynatılıyor...
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gray-900 h-2 rounded-full transition-all duration-100"
                  style={{ width: `${adProgress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Free Result Display */}
        {showFreeResult && result && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Ücretsiz Sonuç
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  Temel IQ aralığınız
                </p>
                <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">
                  {result.range}
                </div>
                <div className="text-lg text-gray-600 mb-4">
                  {result.description}
                </div>
              </div>
              
              <button
                onClick={handleViewFreeResult}
                className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors mb-4"
              >
                Sonucu Görüntüle
              </button>
            </div>

            {/* Premium Upsell */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg border-2 border-gray-700 p-8 text-center text-white">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">
                  Haftalık Premium Erişim
                </h3>
                <p className="text-gray-300 mb-4">
                  Tam AI destekli analiz, detaylı içgörüler ve ilerleme takibi
                </p>
                <div className="mb-4">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-3xl font-bold">€1</span>
                    <span className="text-lg text-gray-300">ilk hafta için</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg text-gray-300">Sonra</span>
                    <span className="text-2xl font-bold">€30</span>
                    <span className="text-lg text-gray-300">/ hafta</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-6">
                  Haftalık yenilenir. İstediğiniz zaman iptal edebilirsiniz.
                </p>
              </div>
              
              <button
                onClick={() => handlePayment('premium')}
                className="w-full bg-white text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                1€ Denemeyi Başlat
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
