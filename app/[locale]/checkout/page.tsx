'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslations } from '@/lib/use-translations';
import { type Locale } from '@/lib/i18n';

export default function CheckoutPage({ params }: { params: Promise<{ locale: Locale }> | { locale: Locale } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = 'then' in params ? 'en' : params.locale;
  const t = useTranslations(locale);

  const [plan, setPlan] = useState<string>('one_time');
  const [price, setPrice] = useState<string>('1');
  const [currency, setCurrency] = useState<string>('EUR');

  useEffect(() => {
    // Get query parameters safely
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const planParam = urlParams.get('plan') || searchParams.get('plan');
      const priceParam = urlParams.get('price') || searchParams.get('price');
      const currencyParam = urlParams.get('currency') || searchParams.get('currency');

      if (planParam) setPlan(planParam);
      if (priceParam) setPrice(priceParam);
      if (currencyParam) setCurrency(currencyParam);
    }
  }, [searchParams]);

  const handleProceedToPayment = () => {
    // For now, simulate successful payment by routing to result page
    // In production, this would redirect to Paddle checkout
    router.push(`/${locale}/result`);
  };

  const handleCancel = () => {
    // Go back to pricing or previous page
    router.push(`/${locale}/pricing`);
  };

  // Show loading state until translations are loaded
  if (!t || !t.checkout) {
    return (
      <div className="bg-white flex items-center justify-center py-12 min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const checkout = t.checkout as any;
  const pricing = t.pricing as any;

  // Format price with currency symbol
  const formatPrice = (amount: string, curr: string) => {
    const numAmount = parseFloat(amount);
    if (curr === 'EUR') {
      return `€${numAmount}`;
    } else if (curr === 'USD') {
      return `$${numAmount}`;
    } else if (curr === 'TRY') {
      return `${numAmount} ₺`;
    }
    return `${curr} ${numAmount}`;
  };

  return (
    <div className="bg-white min-h-screen">
      <main className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">{checkout.title}</h1>
        </div>

        {/* Order Summary Card */}
        <div className="bg-gray-50 rounded-xl border-2 border-gray-200 p-8 mb-6">
          <h2 className="text-2xl font-bold text-black mb-6">{checkout.orderSummary}</h2>
          
          {/* Product Info */}
          <div className="mb-6 pb-6 border-b border-gray-300">
            <h3 className="text-xl font-bold text-black mb-2">{checkout.productName}</h3>
            <p className="text-gray-600 text-sm mb-4">{checkout.productDescription}</p>
            
            {/* What You Get */}
            <div className="mt-4">
              <h4 className="font-semibold text-black mb-2">{checkout.whatYouGet}</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gray-900 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{checkout.deliverable1}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gray-900 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{checkout.deliverable2}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gray-900 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{checkout.deliverable3}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gray-900 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{checkout.deliverable4}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">{checkout.price}:</span>
              <span className="text-xl font-bold text-black">{formatPrice(price, currency)}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-gray-300">
              <span className="text-lg font-semibold text-black">{checkout.total}:</span>
              <span className="text-2xl font-bold text-black">{formatPrice(price, currency)}</span>
            </div>
          </div>
        </div>

        {/* Payment Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800 text-center">
            <strong>{locale === 'tr' ? 'Not:' : 'Note:'}</strong> {checkout.paymentNote}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleProceedToPayment}
            className="w-full bg-gray-900 text-white px-6 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-lg text-lg"
          >
            {checkout.proceedToPayment}
          </button>
          
          <button
            onClick={handleCancel}
            className="w-full bg-gray-200 text-gray-800 px-6 py-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            {checkout.cancel}
          </button>
        </div>
      </main>
    </div>
  );
}
