
import { MainLayout } from '@/components/layout/MainLayout';

export default function PrivacyPolicyPage() {
  return (
    <MainLayout>
      <div className="space-y-8 max-w-4xl mx-auto">
        <section className="text-center py-8">
          <h1 className="text-4xl font-bold font-headline text-primary">Privacy Policy</h1>
          <p className="mt-4 text-lg text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </section>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-foreground/90">
          <p>
            Kosheli Travel & Tourism ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services. This policy is governed by the laws of the United Arab Emirates (UAE).
          </p>

          <h2 className="text-2xl font-headline font-semibold">1. Information We Collect</h2>
          <p>We may collect personal information that you voluntarily provide to us when you make a booking inquiry, such as:</p>
          <ul>
            <li><strong>Personal Identification Information:</strong> Name, email address, phone number.</li>
            <li><strong>Booking Information:</strong> Details of flights, activities, or packages you are interested in.</li>
            <li><strong>Communications:</strong> Any messages or special requests you send to us.</li>
          </ul>

          <h2 className="text-2xl font-headline font-semibold">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Respond to your booking inquiries and provide you with our services.</li>
            <li>Communicate with you regarding your booking, including confirmations and updates.</li>
            <li>Improve our website and services.</li>
            <li>Comply with legal and regulatory obligations within the UAE.</li>
          </ul>

          <h2 className="text-2xl font-headline font-semibold">3. Disclosure of Your Information</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website or conducting our business (e.g., airlines, tour operators), so long as those parties agree to keep this information confidential. We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.
          </p>

          <h2 className="text-2xl font-headline font-semibold">4. Data Security</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee its absolute security.
          </p>

          <h2 className="text-2xl font-headline font-semibold">5. Your Rights</h2>
          <p>
            In accordance with UAE's Personal Data Protection Law (PDPL), you have the right to access, correct, or request the deletion of your personal data. To exercise these rights, please contact us at the details below.
          </p>

          <h2 className="text-2xl font-headline font-semibold">6. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </p>

          <h2 className="text-2xl font-headline font-semibold">7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:koshelitravel@gmail.com" className="text-primary hover:underline">koshelitravel@gmail.com</a>.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
