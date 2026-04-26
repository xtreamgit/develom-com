import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Develom',
  description: 'Privacy Policy for Develom LLC — how we collect, use, and protect your information.',
  alternates: {
    canonical: 'https://develom.com/privacy-policy',
  },
}

const EFFECTIVE_DATE = 'April 19, 2026'

export default function PrivacyPolicyPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-navy px-6 pb-16 pt-32 md:pb-20 md:pt-40">
        <div className="mx-auto max-w-[720px]">
          <p className="mb-6 text-[13px] font-semibold uppercase tracking-[0.12em] text-blue">
            Legal
          </p>
          <h1
            className="text-white"
            style={{
              fontSize: 'clamp(2rem, 3.5vw + 1rem, 3rem)',
              lineHeight: 1.2,
              fontWeight: 800,
              letterSpacing: '-0.02em',
            }}
          >
            Privacy Policy
          </h1>
          <p className="mt-4 text-[14px] text-white/50">Effective date: {EFFECTIVE_DATE}</p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-bg-alt px-6 py-16 md:py-24">
        <div className="mx-auto max-w-[720px]">
          <div className="prose-content flex flex-col gap-10 text-[16px] leading-[1.75] text-text">

            <Section title="1. Who We Are">
              <p>
                Develom LLC (&ldquo;Develom,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or
                &ldquo;us&rdquo;) provides AI engineering services to clients in regulated
                industries. Our principal place of business is in the United States.
              </p>
              <p>
                If you have questions about this policy, contact us at{' '}
                <a href="mailto:privacy@develom.com" className="text-blue underline underline-offset-2 hover:opacity-80">
                  privacy@develom.com
                </a>
                .
              </p>
            </Section>

            <Section title="2. Information We Collect">
              <p>We collect information in the following ways:</p>
              <ul>
                <li>
                  <strong>Contact forms.</strong> When you submit a contact or inquiry form on our
                  website, we collect your name, email address, company name, and the contents of
                  your message.
                </li>
                <li>
                  <strong>Analytics.</strong> We use Google Analytics to understand how visitors
                  interact with our website. This may include your IP address, browser type, pages
                  visited, and referring URLs. This data is aggregated and anonymized.
                </li>
                <li>
                  <strong>Cookies.</strong> Our website uses essential cookies required for basic
                  site functionality. Analytics cookies are used subject to your consent where
                  required by applicable law.
                </li>
              </ul>
            </Section>

            <Section title="3. How We Use Your Information">
              <p>We use the information we collect to:</p>
              <ul>
                <li>Respond to your inquiries and facilitate discovery calls</li>
                <li>Provide and improve our services</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p>
                We do not sell, rent, or share your personal information with third parties for
                their own marketing purposes.
              </p>
            </Section>

            <Section title="4. Data Retention">
              <p>
                We retain contact form submissions for as long as necessary to respond to your
                inquiry and for up to 24 months thereafter for record-keeping purposes. Analytics
                data is retained per the default Google Analytics retention settings (26 months).
              </p>
            </Section>

            <Section title="5. Third-Party Services">
              <p>Our website uses the following third-party services:</p>
              <ul>
                <li>
                  <strong>Google Analytics</strong> — website traffic analysis
                  (
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue underline underline-offset-2 hover:opacity-80"
                  >
                    Google Privacy Policy
                  </a>
                  )
                </li>
                <li>
                  <strong>Vercel</strong> — website hosting and edge infrastructure
                  (
                  <a
                    href="https://vercel.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue underline underline-offset-2 hover:opacity-80"
                  >
                    Vercel Privacy Policy
                  </a>
                  )
                </li>
              </ul>
            </Section>

            <Section title="6. Your Rights">
              <p>
                Depending on your jurisdiction, you may have the right to access, correct, or
                delete personal information we hold about you. To exercise any of these rights,
                contact us at{' '}
                <a href="mailto:privacy@develom.com" className="text-blue underline underline-offset-2 hover:opacity-80">
                  privacy@develom.com
                </a>
                .
              </p>
            </Section>

            <Section title="7. Security">
              <p>
                We implement industry-standard security measures to protect your information.
                However, no method of transmission over the internet or electronic storage is
                100% secure. We cannot guarantee absolute security.
              </p>
            </Section>

            <Section title="8. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. When we do, we will update
                the effective date at the top of this page. We encourage you to review this
                policy periodically.
              </p>
            </Section>

            <div className="mt-4 border-t border-[#E5E7EB] pt-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[14px] font-semibold text-blue hover:underline"
              >
                <svg viewBox="0 0 16 16" fill="none" width={14} height={14} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 8H3M7 4l-4 4 4 4" />
                </svg>
                Back to home
              </Link>
            </div>

          </div>
        </div>
      </section>

      <style>{`
        .prose-content ul { list-style: disc; padding-left: 1.5rem; display: flex; flex-direction: column; gap: 0.375rem; }
        .prose-content li { padding-left: 0.25rem; }
      `}</style>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h2
        className="text-navy"
        style={{ fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.3 }}
      >
        {title}
      </h2>
      {children}
    </div>
  )
}
