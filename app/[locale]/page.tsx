'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from '@/lib/use-translations';
import { type Locale } from '@/lib/i18n';

export default function Home({ params }: { params: Promise<{ locale: Locale }> | { locale: Locale } }) {
  const router = useRouter();
  // Handle both Promise and direct params
  const locale = 'then' in params ? 'en' : params.locale;
  const t = useTranslations(locale);

  const handleStartTest = () => {
    // Clear previous test data and gender step flag for new test
    sessionStorage.removeItem('testAnswers');
    sessionStorage.removeItem('iqResult');
    sessionStorage.removeItem('timeSpent');
    sessionStorage.removeItem('answerData');
    sessionStorage.removeItem('packageType');
    sessionStorage.removeItem('genderStepCompleted');
    sessionStorage.removeItem('userGender');
    
    // Redirect to gender step first
    router.push(`/${locale}/gender`);
  };

  // Show loading state until translations are loaded
  if (!t) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
            {t.landing.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            {t.landing.hero.subtitle}
          </p>
          <button
            onClick={handleStartTest}
            className="bg-black text-white px-12 py-4 text-lg font-semibold rounded-lg hover:bg-gray-800 transition-colors shadow-lg"
          >
            {t.landing.hero.cta}
          </button>
          <p className="text-sm text-gray-500 mt-4">
            {t.landing.hero.disclaimer}
          </p>
          <p className="text-xs text-yellow-700 bg-yellow-50 border border-yellow-200 rounded px-4 py-2 mt-4 inline-block">
            <strong>Disclaimer:</strong> This test is for entertainment and personal insight only. It is not a medical, clinical, or professional assessment.
          </p>
        </div>

        {/* Social Proof Section */}
        <div className="mb-16">
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-2">
                  &quot;{t.landing.socialProof.review}&quot;
                </p>
                <p className="text-sm text-gray-600">— {t.landing.socialProof.reviewer}</p>
              </div>
              <div className="text-center md:text-right">
                <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  {t.landing.socialProof.testsTaken}
                </p>
                <p className="text-sm text-gray-600">
                  {t.landing.socialProof.todayLabel}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-12">
            {t.landing.howItWorks.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                {t.landing.howItWorks.step1.title}
              </h3>
              <p className="text-gray-600">
                {t.landing.howItWorks.step1.description}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                {t.landing.howItWorks.step2.title}
              </h3>
              <p className="text-gray-600">
                {t.landing.howItWorks.step2.description}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                {t.landing.howItWorks.step3.title}
              </h3>
              <p className="text-gray-600">
                {t.landing.howItWorks.step3.description}
              </p>
            </div>
          </div>
        </div>

        {/* Secondary CTA Section */}
        <div className="bg-gray-900 text-white rounded-xl p-8 md:p-12 text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {t.landing.secondaryCta.title}
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            {t.landing.secondaryCta.subtitle}
          </p>
          <button
            onClick={handleStartTest}
            className="bg-white text-gray-900 px-12 py-4 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            {t.landing.secondaryCta.cta}
          </button>
        </div>

        {/* Footer Disclaimer */}
        <footer className="pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            {t.disclaimer.text}
            <br />
            {t.disclaimer.iqRanges}
          </p>
        </footer>
      </main>
    </div>
  );
}
