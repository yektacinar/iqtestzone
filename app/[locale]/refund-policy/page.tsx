'use client';

import { useTranslations } from '@/lib/use-translations';
import { type Locale } from '@/lib/i18n';

export default function RefundPolicyPage({ params }: { params: Promise<{ locale: Locale }> | { locale: Locale } }) {
  const locale = 'then' in params ? 'en' : params.locale;
  const t = useTranslations(locale);

  // Show loading state until translations are loaded
  if (!t || !t.refundPolicy) {
    return (
      <div className="bg-white flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const refund = t.refundPolicy as any;

  return (
    <div className="bg-white">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-8">{refund.title}</h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
          <p className="text-sm text-gray-500 mb-8">
            {refund.lastUpdated}: {new Date().toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          {/* Overview */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">{refund.overview.title}</h2>
            <p>
              {refund.overview.text1}
            </p>
            <p className="mt-4">
              {refund.overview.text2}
            </p>
          </section>

          {/* How to Request a Refund */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">{refund.howToRequest.title}</h2>
            <p>
              {refund.howToRequest.text1}
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <p className="font-semibold mb-2">{refund.contact.email}</p>
              <p>
                <a 
                  href="mailto:support@iqtestzone.net" 
                  className="text-blue-600 hover:underline"
                >
                  support@iqtestzone.net
                </a>
              </p>
            </div>
            <p className="mt-4">
              {refund.howToRequest.text2}
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>{refund.howToRequest.info1}</li>
              <li>{refund.howToRequest.info2}</li>
              <li>{refund.howToRequest.info3}</li>
              <li>{refund.howToRequest.info4}</li>
            </ul>
          </section>

          {/* Refund Eligibility */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">{refund.eligibility.title}</h2>
            <p>
              {refund.eligibility.text1}
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>{refund.eligibility.condition1}</li>
              <li>{refund.eligibility.condition2}</li>
              <li>{refund.eligibility.condition3}</li>
            </ul>
            <p className="mt-4">
              {refund.eligibility.text2}
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>{refund.eligibility.use1}</li>
              <li>{refund.eligibility.use2}</li>
              <li>{refund.eligibility.use3}</li>
            </ul>
          </section>

          {/* Processing Refunds */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">{refund.processing.title}</h2>
            <p>
              {refund.processing.text1}
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>{refund.processing.detail1}</li>
              <li>{refund.processing.detail2}</li>
              <li>{refund.processing.detail3}</li>
              <li>{refund.processing.detail4}</li>
            </ul>
            <p className="mt-4">
              {refund.processing.text2}
            </p>
          </section>

          {/* Chargebacks */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">{refund.chargebacks.title}</h2>
            <p>
              {refund.chargebacks.text}
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">{refund.contact.title}</h2>
            <p>
              {refund.contact.text}
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <p className="font-semibold mb-2">{refund.contact.email}</p>
              <p>
                <a 
                  href="mailto:support@iqtestzone.net" 
                  className="text-blue-600 hover:underline"
                >
                  support@iqtestzone.net
                </a>
              </p>
            </div>
          </section>

          {/* Note about Terms and Paddle */}
          <section>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-8">
              <p className="text-sm text-blue-800">
                <strong>{locale === 'tr' ? 'Not:' : 'Note:'}</strong> {refund.note.text}{' '}
                <a 
                  href={refund.note.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {refund.note.link}
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
