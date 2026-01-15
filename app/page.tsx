'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleStartTest = () => {
    router.push('/test');
  };

  return (
    <div className="bg-white">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Gerçek IQ Seviyeni Öğren – 7 Dakikalık Test
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Görsel desen ve soyut akıl yürütme testi ile IQ seviyenizi öğrenin.
            <br />
            <span className="text-base text-gray-600">Bu test eğlence ve kişisel farkındalık amaçlıdır.</span>
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 text-gray-600">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>7 Dakika</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span>25 Soru</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Kayıt Gerektirmez</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={handleStartTest}
            className="bg-black text-white px-12 py-4 text-lg font-semibold rounded-lg hover:bg-gray-800 transition-colors shadow-lg"
          >
            Teste Başla
          </button>
        </div>

        {/* Footer Disclaimer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            Bu test bilimsel veya klinik tanı amacı taşımaz.
            <br />
            Eğlence ve kişisel farkındalık amaçlıdır. IQ skorları aralık olarak gösterilir.
          </p>
        </footer>
      </main>
    </div>
  );
}
