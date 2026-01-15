import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for IQ Test Application',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
          <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          {/* Section 1: Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">1. Introduction</h2>
            <p>
              This Privacy Policy describes how we collect, use, and protect your personal information when you use our IQ Test Application ("Service", "we", "us", or "our"). We are committed to protecting your privacy and ensuring the security of your personal data.
            </p>
            <p>
              By using our Service, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with our policies and practices, please do not use our Service.
            </p>
          </section>

          {/* Section 2: Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold text-black mt-4 mb-2">2.1 Information You Provide</h3>
            <p>
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Account information (username, email address, password)</li>
              <li>Profile information (if you choose to provide it)</li>
              <li>Test responses and results</li>
              <li>Communication data when you contact us for support</li>
            </ul>
            <h3 className="text-xl font-semibold text-black mt-4 mb-2">2.2 Automatically Collected Information</h3>
            <p>
              When you use our Service, we automatically collect certain information, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Device information (device type, operating system, browser type)</li>
              <li>Usage data (pages visited, time spent, features used)</li>
              <li>IP address and approximate location</li>
              <li>Log data (access times, error logs)</li>
            </ul>
            <h3 className="text-xl font-semibold text-black mt-4 mb-2">2.3 Payment Information</h3>
            <p>
              Payment information is processed securely through Paddle, our third-party payment processor. We do not store your complete payment card information on our servers. Paddle handles all payment data in accordance with their privacy policy and PCI DSS compliance standards.
            </p>
          </section>

          {/* Section 3: How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">3. How We Use Your Information</h2>
            <p>
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide, maintain, and improve our Service</li>
              <li>To process your transactions and manage your subscriptions</li>
              <li>To authenticate your identity and secure your account</li>
              <li>To generate and display your test results</li>
              <li>To communicate with you about your account, transactions, and Service updates</li>
              <li>To respond to your inquiries and provide customer support</li>
              <li>To detect, prevent, and address technical issues and security threats</li>
              <li>To analyze usage patterns and improve user experience</li>
              <li>To comply with legal obligations and enforce our Terms of Service</li>
            </ul>
            <p>
              We do not sell your personal information to third parties. We may share aggregated, anonymized data that cannot be used to identify you for analytical and research purposes.
            </p>
          </section>

          {/* Section 4: Cookies and Tracking Technologies */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">4. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our Service and store certain information. Cookies are small data files stored on your device that help us improve your experience.
            </p>
            <h3 className="text-xl font-semibold text-black mt-4 mb-2">4.1 Types of Cookies We Use</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for the Service to function properly (e.g., authentication, session management)</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our Service</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (if applicable)</li>
            </ul>
            <h3 className="text-xl font-semibold text-black mt-4 mb-2">4.2 Managing Cookies</h3>
            <p>
              You can control cookies through your browser settings. Most browsers allow you to refuse or delete cookies. However, disabling certain cookies may limit your ability to use some features of our Service.
            </p>
            <p>
              For more information about cookies and how to manage them, visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.allaboutcookies.org</a>.
            </p>
          </section>

          {/* Section 5: Payment Processing via Paddle */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">5. Payment Processing via Paddle</h2>
            <p>
              When you make a purchase through our Service, payments are processed by Paddle, a third-party payment processor. Paddle handles all payment transactions securely and in compliance with PCI DSS standards.
            </p>
            <p>
              Information shared with Paddle includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Payment method information (credit card details, billing address)</li>
              <li>Transaction details (amount, currency, subscription type)</li>
              <li>Account information necessary to process the transaction</li>
            </ul>
            <p>
              Paddle's use of your personal information is governed by their Privacy Policy. We encourage you to review Paddle's Privacy Policy at <a href="https://paddle.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://paddle.com/legal/privacy</a>.
            </p>
            <p>
              We receive limited information from Paddle about your transactions, such as payment status and subscription details, which we use to manage your account and provide customer support.
            </p>
          </section>

          {/* Section 6: Data Sharing and Disclosure */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">6. Data Sharing and Disclosure</h2>
            <p>
              We may share your information in the following circumstances:
            </p>
            <h3 className="text-xl font-semibold text-black mt-4 mb-2">6.1 Service Providers</h3>
            <p>
              We may share your information with third-party service providers who perform services on our behalf, such as:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Payment processors (Paddle)</li>
              <li>Cloud hosting providers</li>
              <li>Analytics services</li>
              <li>Customer support platforms</li>
            </ul>
            <p>
              These service providers are contractually obligated to protect your information and use it only for the purposes we specify.
            </p>
            <h3 className="text-xl font-semibold text-black mt-4 mb-2">6.2 Legal Requirements</h3>
            <p>
              We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., court orders, government agencies).
            </p>
            <h3 className="text-xl font-semibold text-black mt-4 mb-2">6.3 Business Transfers</h3>
            <p>
              In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity, subject to the same privacy protections.
            </p>
            <h3 className="text-xl font-semibold text-black mt-4 mb-2">6.4 With Your Consent</h3>
            <p>
              We may share your information with your explicit consent or at your direction.
            </p>
          </section>

          {/* Section 7: Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">7. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Encryption of data in transit and at rest</li>
              <li>Secure authentication and access controls</li>
              <li>Regular security assessments and updates</li>
              <li>Limited access to personal information on a need-to-know basis</li>
            </ul>
            <p>
              However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          {/* Section 8: Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">8. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <h3 className="text-xl font-semibold text-black mt-4 mb-2">8.1 Access and Portability</h3>
            <p>
              You have the right to access and receive a copy of your personal information that we hold.
            </p>
            <h3 className="text-xl font-semibold text-black mt-4 mb-2">8.2 Correction</h3>
            <p>
              You have the right to request correction of inaccurate or incomplete personal information.
            </p>
            <h3 className="text-xl font-semibold text-black mt-4 mb-2">8.3 Deletion</h3>
            <p>
              You have the right to request deletion of your personal information, subject to certain legal and operational requirements.
            </p>
            <h3 className="text-xl font-semibold text-black mt-4 mb-2">8.4 Objection and Restriction</h3>
            <p>
              You have the right to object to certain processing of your personal information or request restriction of processing.
            </p>
            <h3 className="text-xl font-semibold text-black mt-4 mb-2">8.5 Withdrawal of Consent</h3>
            <p>
              Where processing is based on consent, you have the right to withdraw your consent at any time.
            </p>
            <h3 className="text-xl font-semibold text-black mt-4 mb-2">8.6 Data Portability</h3>
            <p>
              You have the right to receive your personal information in a structured, commonly used, and machine-readable format.
            </p>
            <p className="mt-4">
              To exercise any of these rights, please contact us using the contact information provided below. We will respond to your request within a reasonable timeframe and in accordance with applicable law.
            </p>
          </section>

          {/* Section 9: Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">9. Children's Privacy</h2>
            <p>
              Our Service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
            </p>
            <p>
              Users between the ages of 13 and 18 should obtain parental or guardian consent before using our Service.
            </p>
          </section>

          {/* Section 10: International Data Transfers */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">10. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your country. We take appropriate measures to ensure that your information receives adequate protection in accordance with this Privacy Policy and applicable law.
            </p>
          </section>

          {/* Section 11: Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">11. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
            </p>
            <p>
              Account information is retained while your account is active and for a reasonable period after account deletion to comply with legal obligations and resolve disputes.
            </p>
          </section>

          {/* Section 12: Changes to This Privacy Policy */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">12. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
            <p>
              We encourage you to review this Privacy Policy periodically for any changes. Your continued use of the Service after any changes to this Privacy Policy constitutes your acceptance of the updated policy.
            </p>
          </section>

          {/* Section 13: Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">13. Contact Information</h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <p className="font-semibold mb-2">Email:</p>
              <p>privacy@example.com</p>
              <p className="font-semibold mt-4 mb-2">Mailing Address:</p>
              <p>
                [Your Company Name]<br />
                [Your Address]<br />
                [City, State, ZIP Code]<br />
                [Country]
              </p>
            </div>
            <p className="mt-4">
              For data protection inquiries or to exercise your rights, please include "Privacy Request" in the subject line of your email.
            </p>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            By using this Service, you acknowledge that you have read, understood, and agree to this Privacy Policy.
          </p>
        </footer>
      </main>
    </div>
  );
}
