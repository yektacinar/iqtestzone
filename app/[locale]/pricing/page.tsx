'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from '@/lib/use-translations';
import { type Locale } from '@/lib/i18n';

export default function PricingPage({ params }: { params: Promise<{ locale: Locale }> | { locale: Locale } }) {
  const router = useRouter();
  const locale = 'then' in params ? 'en' : params.locale;
  const t = useTranslations(locale);

  const handleUnlockPremium = () => {
    router.push(`/${locale}/checkout?plan=one_time&price=1&currency=EUR`);
  };

  // Show loading state until translations are loaded
  if (!t || !t.pricing) {
    return (
      <div className="bg-white flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const pricing = t.pricing as any;

  return (
    <div className="bg-white">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">{pricing.title}</h1>
        </div>

        {/* Product Name and Description */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-black mb-2">{pricing.productName}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {pricing.productDescription}
          </p>
        </div>

        {/* What You Get Section */}
        <div className="bg-gray-50 rounded-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-black mb-6">{pricing.whatYouGet}</h3>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start">
              <svg className="w-6 h-6 text-gray-900 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span><strong>{pricing.detailedIQScore}:</strong> {pricing.detailedIQScoreDesc}</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-gray-900 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span><strong>{pricing.extendedAnalysis}:</strong> {pricing.extendedAnalysisDesc}</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-gray-900 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span><strong>{pricing.personalizedInsights}:</strong> {pricing.personalizedInsightsDesc}</span>
            </li>
          </ul>
        </div>

        {/* Pricing Options */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-black mb-6 text-center">{pricing.pricingOptions}</h3>
          <div className="border-2 border-gray-900 rounded-xl p-8 bg-gray-50 max-w-md mx-auto">
            <div className="mb-2">
              <span className="bg-gray-900 text-white text-xs font-semibold px-2 py-1 rounded">{pricing.recommended}</span>
            </div>
            <h4 className="text-xl font-bold text-black mb-4">{pricing.weeklySubscription}</h4>
            <div className="mb-6">
              <div className="mb-2">
                <span className="text-4xl font-bold text-black">€1</span>
                <span className="text-gray-600 ml-2">{pricing.firstWeek}</span>
              </div>
              <div className="text-sm text-gray-600">
                {pricing.then} <span className="font-semibold text-black">€30{pricing.perWeek}</span>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              {pricing.subscriptionDescription}
            </p>
            <button
              onClick={handleUnlockPremium}
              className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-lg"
            >
              {pricing.unlockPremium}
            </button>
          </div>
        </div>

        {/* Payment Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-blue-800 text-center">
            <strong>{locale === 'tr' ? 'Not:' : 'Note:'}</strong> {pricing.paymentNote}
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800 text-center">
            <strong>{locale === 'tr' ? 'Uyarı:' : 'Disclaimer:'}</strong> {pricing.disclaimer}
          </p>
        </div>
      </main>
    </div>
  );
}
