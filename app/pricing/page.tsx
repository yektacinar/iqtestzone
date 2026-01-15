import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pricing - IQTestZone',
  description: 'Pricing options for IQTestZone premium features',
};

export default function PricingPage() {
  return (
    <div className="bg-white">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">Pricing</h1>
          <p className="text-lg text-gray-600">Choose the plan that&apos;s right for you</p>
        </div>

        {/* Product Name */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-black mb-2">IQTestZone</h2>
          <p className="text-gray-600">Premium IQ Test Analysis</p>
        </div>

        {/* What You Get */}
        <div className="bg-gray-50 rounded-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-black mb-6">What You Get</h3>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start">
              <svg className="w-6 h-6 text-gray-900 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span><strong>Detailed IQ Score Range:</strong> Get your precise IQ score range with comprehensive analysis</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-gray-900 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span><strong>Extended Result Analysis:</strong> Deep dive into your cognitive performance across multiple dimensions</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-gray-900 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span><strong>Personalized Insights:</strong> Receive tailored recommendations and insights based on your results</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-gray-900 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span><strong>PDF Report:</strong> Download a detailed PDF report of your results</span>
            </li>
          </ul>
        </div>

        {/* Pricing Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* One-time Purchase */}
          <div className="border-2 border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-black mb-4">One-time Purchase</h3>
            <div className="mb-4">
              <span className="text-4xl font-bold text-black">$79</span>
              <span className="text-gray-600 ml-2">one-time</span>
            </div>
            <p className="text-gray-600 mb-6">Get lifetime access to your detailed results and analysis</p>
            <button
              disabled
              className="w-full bg-gray-300 text-gray-600 px-6 py-3 rounded-lg font-semibold cursor-not-allowed"
            >
              Checkout Coming Soon
            </button>
          </div>

          {/* Subscription */}
          <div className="border-2 border-gray-900 rounded-xl p-6 bg-gray-50">
            <div className="mb-2">
              <span className="bg-gray-900 text-white text-xs font-semibold px-2 py-1 rounded">POPULAR</span>
            </div>
            <h3 className="text-xl font-bold text-black mb-4">Weekly Subscription</h3>
            <div className="mb-4">
              <div className="mb-2">
                <span className="text-4xl font-bold text-black">$1</span>
                <span className="text-gray-600 ml-2">first week</span>
              </div>
              <div className="text-sm text-gray-600">
                Then <span className="font-semibold text-black">$30/week</span>
              </div>
            </div>
            <p className="text-gray-600 mb-6">Weekly access to premium features with detailed analysis</p>
            <Link
              href="/api/payment?type=premium&locale=en"
              className="block w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-center"
            >
              Unlock Premium
            </Link>
          </div>
        </div>

        {/* Payment Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> All payments are securely processed by Paddle, our payment provider. 
            Paddle handles all payment transactions and acts as the Merchant of Record.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Disclaimer:</strong> This test is for entertainment and personal insight only. 
            It is not a medical, clinical, or professional assessment.
          </p>
        </div>
      </main>
    </div>
  );
}
