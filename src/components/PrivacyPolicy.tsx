import React from "react";
import { Link } from "react-router-dom";

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen md:ml-48">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mb-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-artistic-accent mb-4">
            Legal / Policy
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-none mb-4">
            Privacy Policy
          </h1>
          <p className="text-zinc-300 max-w-2xl">
            This privacy policy explains how Fix Me collects, uses, stores, and protects your information when you use our website and services.
          </p>
        </div>

        <div className="space-y-10 text-sm leading-7 text-zinc-200">
          <section className="border border-artistic-border bg-zinc-950/60 p-6">
            <h2 className="text-lg font-semibold mb-3">1. Information We Collect</h2>
            <p>
              We may collect information that you provide directly, such as your name, email address, device details, and repair-related search queries. We may also automatically collect usage data, including browser type, IP address, referral source, and interaction patterns to improve the experience.
            </p>
          </section>

          <section className="border border-artistic-border bg-zinc-950/60 p-6">
            <h2 className="text-lg font-semibold mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To provide, maintain, and improve our website and services.</li>
              <li>To personalize content, recommendations, and search results.</li>
              <li>To respond to support requests and customer inquiries.</li>
              <li>To monitor performance, detect abuse, and protect platform security.</li>
              <li>To comply with applicable legal obligations.</li>
            </ul>
          </section>

          <section className="border border-artistic-border bg-zinc-950/60 p-6">
            <h2 className="text-lg font-semibold mb-3">3. Cookies and Tracking</h2>
            <p>
              Fix Me uses cookies and similar technologies to remember preferences, support analytics, and improve performance. You can manage cookies through your browser settings. Disabling some cookies may affect site functionality.
            </p>
          </section>

          <section className="border border-artistic-border bg-zinc-950/60 p-6">
            <h2 className="text-lg font-semibold mb-3">4. Advertising and Third-Party Services</h2>
            <p>
              Our site may use advertising and analytics tools, including Google AdSense. These services may collect data to serve relevant ads and measure performance. Their use is governed by their respective privacy policies.
            </p>
          </section>

          <section className="border border-artistic-border bg-zinc-950/60 p-6">
            <h2 className="text-lg font-semibold mb-3">5. Data Sharing</h2>
            <p>
              We do not sell your personal information. We may share information with service providers that assist us in operating the website, analytics, advertising, or support functions, only as necessary and under confidentiality obligations.
            </p>
          </section>

          <section className="border border-artistic-border bg-zinc-950/60 p-6">
            <h2 className="text-lg font-semibold mb-3">6. Data Security</h2>
            <p>
              We take reasonable administrative, technical, and physical safeguards to protect your data against unauthorized access, loss, misuse, or alteration. No method of transmission or storage is completely secure, but we continuously work to improve protection.
            </p>
          </section>

          <section className="border border-artistic-border bg-zinc-950/60 p-6">
            <h2 className="text-lg font-semibold mb-3">7. Your Rights</h2>
            <p>
              Depending on your jurisdiction, you may have rights regarding access, correction, deletion, portability, or restriction of processing of your personal data. To exercise these rights, contact us using the details below.
            </p>
          </section>

          <section className="border border-artistic-border bg-zinc-950/60 p-6">
            <h2 className="text-lg font-semibold mb-3">8. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at <span className="text-artistic-accent">privacy@fixme.example</span>.
            </p>
          </section>

          <section className="border border-artistic-border bg-zinc-950/60 p-6">
            <h2 className="text-lg font-semibold mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. Any material changes will be reflected on this page, and the effective date will be updated accordingly.
            </p>
          </section>
        </div>

        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-mono text-artistic-accent hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
