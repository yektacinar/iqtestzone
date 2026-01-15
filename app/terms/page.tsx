import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for IQ Test Application',
};

export default function TermsPage() {
  return (
    <div className="bg-white">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
          <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          {/* Section 1: Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">1. Introduction</h2>
            <p>
              Welcome to our IQ Test Application (&quot;Service&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). These Terms of Service (&quot;Terms&quot;) govern your access to and use of our Service. By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these Terms, then you may not access the Service.
            </p>
            <p>
              Our Service provides an online IQ test for entertainment and personal awareness purposes. This test is not intended for scientific or clinical diagnostic purposes.
            </p>
          </section>

          {/* Section 2: Eligibility */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">2. Eligibility</h2>
            <p>
              You must be at least 13 years of age to use this Service. By using the Service, you represent and warrant that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You are at least 13 years old</li>
              <li>You have the legal capacity to enter into these Terms</li>
              <li>You will comply with all applicable laws and regulations</li>
              <li>All information you provide is accurate and truthful</li>
            </ul>
            <p>
              If you are under 18, you represent that you have obtained parental or guardian consent to use this Service.
            </p>
          </section>

          {/* Section 3: Accounts */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">3. Accounts</h2>
            <p>
              Some features of our Service may require you to create an account. When you create an account, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Accept responsibility for all activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials. We reserve the right to suspend or terminate accounts that violate these Terms or engage in fraudulent, abusive, or illegal activity.
            </p>
          </section>

          {/* Section 4: Payments, Subscriptions, and Billing */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">4. Payments, Subscriptions, and Billing</h2>
            <p>
              Our Service offers both free and premium subscription options. Premium subscriptions provide access to additional features and detailed analysis.
            </p>
            <h3 className="text-xl font-semibold text-black mt-4 mb-2">4.1 Payment Processing</h3>
            <p>
              All payments are processed securely through Paddle, our third-party payment processor. By making a purchase, you agree to Paddle&apos;s terms and conditions. We do not store your complete payment card information on our servers.
            </p>
            <h3 className="text-xl font-semibold text-black mt-4 mb-2">4.2 Subscription Plans</h3>
            <p>
              Premium subscriptions are billed on a recurring basis (weekly, monthly, or as otherwise specified at the time of purchase). Subscription fees are charged in advance for each billing period.
            </p>
            <h3 className="text-xl font-semibold text-black mt-4 mb-2">4.3 Automatic Renewal</h3>
            <p>
              Unless you cancel your subscription before the end of the current billing period, your subscription will automatically renew. You authorize us to charge the applicable subscription fee to your payment method on file.
            </p>
            <h3 className="text-xl font-semibold text-black mt-4 mb-2">4.4 Price Changes</h3>
            <p>
              We reserve the right to modify subscription prices at any time. Price changes will be communicated to you in advance. If you do not agree to the new price, you may cancel your subscription before the change takes effect.
            </p>
            <h3 className="text-xl font-semibold text-black mt-4 mb-2">4.5 Billing Disputes</h3>
            <p>
              If you believe you have been charged incorrectly, please contact us immediately. We will investigate the matter and, if appropriate, issue a refund or credit.
            </p>
          </section>

          {/* Section 5: Refund Policy */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">5. Refund Policy</h2>
            <p>
              We offer refunds in accordance with the following terms:
            </p>
            <h3 className="text-xl font-semibold text-black mt-4 mb-2">5.1 Refund Eligibility</h3>
            <p>
              You may request a refund within 14 days of your initial purchase, provided you have not substantially used the premium features. Refund requests must be submitted through our contact information provided below.
            </p>
            <h3 className="text-xl font-semibold text-black mt-4 mb-2">5.2 Processing Refunds</h3>
            <p>
              Approved refunds will be processed to the original payment method within 5-10 business days. Refunds are processed through Paddle, and the timing may vary depending on your payment provider.
            </p>
            <h3 className="text-xl font-semibold text-black mt-4 mb-2">5.3 Non-Refundable Items</h3>
            <p>
              The following are not eligible for refunds:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Subscriptions that have been active for more than 14 days</li>
              <li>Subscriptions where premium features have been substantially used</li>
              <li>Refund requests made after the subscription has been cancelled and the billing period has ended</li>
            </ul>
            <h3 className="text-xl font-semibold text-black mt-4 mb-2">5.4 Cancellation</h3>
            <p>
              You may cancel your subscription at any time. Cancellation will take effect at the end of your current billing period. You will continue to have access to premium features until the end of the paid period.
            </p>
          </section>

          {/* Section 6: User Responsibilities and Prohibited Use */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">6. User Responsibilities and Prohibited Use</h2>
            <p>
              You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the Service in any way that violates any applicable law or regulation</li>
              <li>Attempt to gain unauthorized access to the Service, other accounts, or computer systems</li>
              <li>Interfere with or disrupt the Service or servers connected to the Service</li>
              <li>Use automated systems, bots, or scripts to access or interact with the Service</li>
              <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
              <li>Copy, modify, or create derivative works of the Service</li>
              <li>Use the Service to transmit any viruses, malware, or harmful code</li>
              <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity</li>
              <li>Collect or harvest any information from the Service without authorization</li>
              <li>Use the Service for any commercial purpose without our express written consent</li>
            </ul>
            <p>
              Violation of these restrictions may result in immediate termination of your access to the Service and may subject you to legal action.
            </p>
          </section>

          {/* Section 7: Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">7. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Service without our prior written consent, except as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your computer may temporarily store copies of materials in RAM incidental to your accessing and viewing those materials</li>
              <li>You may store files that are automatically cached by your web browser for display enhancement purposes</li>
              <li>You may print or download one copy of a reasonable number of pages for your own personal, non-commercial use</li>
            </ul>
            <p>
              If you print, copy, modify, download, or otherwise use any part of the Service in breach of these Terms, your right to use the Service will cease immediately and you must return or destroy any copies of the materials you have made.
            </p>
          </section>

          {/* Section 8: Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">8. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL WE, OUR AFFILIATES, AGENTS, DIRECTORS, EMPLOYEES, SUPPLIERS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO THE USE OF, OR INABILITY TO USE, THE SERVICE.
            </p>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, WE ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Errors, mistakes, or inaccuracies of content</li>
              <li>Personal injury or property damage resulting from your access to or use of the Service</li>
              <li>Unauthorized access to or use of our servers and/or any personal information stored therein</li>
              <li>Interruption or cessation of transmission to or from the Service</li>
              <li>Bugs, viruses, trojan horses, or the like that may be transmitted to or through the Service</li>
              <li>Errors or omissions in any content or for any loss or damage incurred as a result of the use of any content posted, emailed, transmitted, or otherwise made available through the Service</li>
            </ul>
            <p>
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>
            <p>
              Some jurisdictions do not allow the exclusion of certain warranties or the limitation or exclusion of liability for incidental or consequential damages. Accordingly, some of the above limitations may not apply to you.
            </p>
          </section>

          {/* Section 9: Termination */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">9. Termination</h2>
            <p>
              We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms.
            </p>
            <p>
              Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.
            </p>
            <p>
              All provisions of these Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>
          </section>

          {/* Section 10: Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">10. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>
            <p>
              What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
            </p>
            <p>
              We encourage you to review these Terms periodically. The &quot;Last updated&quot; date at the top of this page indicates when these Terms were last revised.
            </p>
          </section>

          {/* Section 11: Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">11. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <p className="font-semibold mb-2">Email:</p>
              <p>support@example.com</p>
              <p className="font-semibold mt-4 mb-2">Mailing Address:</p>
              <p>
                [Your Company Name]<br />
                [Your Address]<br />
                [City, State, ZIP Code]<br />
                [Country]
              </p>
            </div>
            <p className="mt-4">
              For billing and payment-related inquiries, please contact us through the email address above or through your Paddle account dashboard.
            </p>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            By using this Service, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </p>
        </footer>
      </main>
    </div>
  );
}
