import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy - IQTestZone',
  description: 'Refund policy for IQTestZone services',
};

export default function RefundPolicyPage() {
  return (
    <div className="bg-white">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-8">Refund Policy</h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
          <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">Introduction</h2>
            <p>
              At IQTestZone, we want you to be completely satisfied with your purchase. 
              This Refund Policy explains our policy regarding refunds for premium subscriptions and one-time purchases.
            </p>
            <p>
              All payments are processed by Paddle, our payment provider. Refunds are handled in accordance 
              with Paddle&apos;s refund policy and our terms outlined below.
            </p>
          </section>

          {/* Refund Eligibility */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">Refund Eligibility</h2>
            <p>
              You may request a refund within <strong>14 days</strong> of your initial purchase, provided that:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>You have not substantially used the premium features</li>
              <li>The refund request is made within the 14-day window</li>
              <li>The request is submitted through our official support channels</li>
            </ul>
            <p className="mt-4">
              &quot;Substantial use&quot; is defined as:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Downloading or accessing detailed PDF reports multiple times</li>
              <li>Extensive use of premium analysis features</li>
              <li>Using the service for more than 7 days of the subscription period</li>
            </ul>
          </section>

          {/* How to Request a Refund */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">How to Request a Refund</h2>
            <p>
              To request a refund, please contact us at:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <p className="font-semibold mb-2">Email:</p>
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
              Please include the following information in your refund request:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Your transaction ID or order number</li>
              <li>The email address used for the purchase</li>
              <li>The date of purchase</li>
              <li>Reason for the refund request</li>
            </ul>
          </section>

          {/* Processing Refunds */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">Processing Refunds</h2>
            <p>
              Once your refund request is approved:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Refunds will be processed to the original payment method</li>
              <li>Processing time is typically <strong>5-10 business days</strong></li>
              <li>Refunds are processed through Paddle, and timing may vary depending on your payment provider</li>
              <li>You will receive an email confirmation once the refund has been processed</li>
            </ul>
            <p className="mt-4">
              Please note that refunds may take longer to appear in your account depending on your bank or 
              credit card company&apos;s processing times.
            </p>
          </section>

          {/* Non-Refundable Items */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">Non-Refundable Items</h2>
            <p>
              The following are not eligible for refunds:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Subscriptions that have been active for more than 14 days</li>
              <li>Subscriptions where premium features have been substantially used</li>
              <li>Refund requests made after the subscription has been cancelled and the billing period has ended</li>
              <li>Free trial periods (if applicable)</li>
            </ul>
          </section>

          {/* Cancellation */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">Cancellation</h2>
            <p>
              You may cancel your subscription at any time. Cancellation will take effect at the end of your 
              current billing period. You will continue to have access to premium features until the end of 
              the paid period.
            </p>
            <p className="mt-4">
              To cancel your subscription:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Contact us at <a href="mailto:support@iqtestzone.net" className="text-blue-600 hover:underline">support@iqtestzone.net</a></li>
              <li>Or manage your subscription through your Paddle account dashboard</li>
            </ul>
            <p className="mt-4">
              <strong>Note:</strong> Cancelling your subscription does not automatically entitle you to a refund. 
              Refunds are only available within the 14-day window and subject to the eligibility criteria above.
            </p>
          </section>

          {/* Paddle Refund Policy */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">Paddle Refund Policy</h2>
            <p>
              Since payments are processed by Paddle, refunds are handled in accordance with Paddle&apos;s 
              refund policy. Paddle acts as the Merchant of Record and handles all payment-related matters, 
              including refunds.
            </p>
            <p className="mt-4">
              For more information about Paddle&apos;s refund policy, please visit:{' '}
              <a 
                href="https://paddle.com/support/refund-policy" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:underline"
              >
                https://paddle.com/support/refund-policy
              </a>
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Refund Policy, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <p className="font-semibold mb-2">Email:</p>
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
        </div>
      </main>
    </div>
  );
}
