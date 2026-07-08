import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | Develom',
  description: 'Terms of Service for Develom LLC — the terms governing your use of our website and services.',
  alternates: {
    canonical: 'https://develom.com/terms',
  },
}

const EFFECTIVE_DATE = 'June 28, 2026'

export default function TermsOfServicePage() {
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
            Terms of Service
          </h1>
          <p className="mt-4 text-[14px] text-white/50">Effective date: {EFFECTIVE_DATE}</p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-bg-alt px-6 py-16 md:py-24">
        <div className="mx-auto max-w-[720px]">
          <div className="prose-content flex flex-col gap-10 text-[16px] leading-[1.75] text-text">

            <Section title="1. Acceptance of Terms">
              <p>
                By accessing or using the Develom LLC (&ldquo;Develom,&rdquo; &ldquo;we,&rdquo;
                &ldquo;our,&rdquo; or &ldquo;us&rdquo;) website and services, you agree to be
                bound by these Terms of Service. If you do not agree to these terms, please do not
                use our website or services.
              </p>
              <p>
                If you have questions about these terms, contact us at{' '}
                <a href="mailto:jean-luc@agents.develom.com" className="text-blue underline underline-offset-2 hover:opacity-80">
                  jean-luc@agents.develom.com
                </a>
                .
              </p>
            </Section>

            <Section title="2. Services">
              <p>
                Develom provides AI engineering services to clients in regulated industries.
                Our website is intended to provide information about our services and to facilitate
                inquiries from prospective clients.
              </p>
              <p>
                Specific services are governed by separate written agreements between Develom and
                each client. Nothing on this website constitutes an offer to provide services or
                creates any binding obligation on the part of Develom.
              </p>
            </Section>

            <Section title="3. Intellectual Property">
              <p>
                All content on this website, including text, graphics, logos, images, and software,
                is the property of Develom LLC or its content suppliers and is protected by
                applicable intellectual property laws.
              </p>
              <p>
                You may not reproduce, distribute, modify, or create derivative works from any
                content on this website without our prior written consent.
              </p>
            </Section>

            <Section title="4. Use of the Website">
              <p>You agree not to:</p>
              <ul>
                <li>Use the website for any unlawful purpose or in violation of these terms</li>
                <li>Attempt to gain unauthorized access to any part of the website or its systems</li>
                <li>Transmit any harmful, offensive, or disruptive content via the website</li>
                <li>Use automated means to scrape, crawl, or index the website without permission</li>
                <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity</li>
              </ul>
            </Section>

            <Section title="5. Disclaimer of Warranties">
              <p>
                The website and its content are provided on an &ldquo;as is&rdquo; and
                &ldquo;as available&rdquo; basis without any warranties of any kind, express or
                implied. Develom does not warrant that the website will be uninterrupted, error-free,
                or free of viruses or other harmful components.
              </p>
            </Section>

            <Section title="6. Limitation of Liability">
              <p>
                To the fullest extent permitted by law, Develom shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages arising from
                your use of or inability to use this website or its content.
              </p>
            </Section>

            <Section title="7. Third-Party Links">
              <p>
                This website may contain links to third-party websites. These links are provided
                for your convenience only. Develom has no control over the content of those sites
                and accepts no responsibility for them or for any loss or damage that may arise
                from your use of them.
              </p>
            </Section>

            <Section title="8. Governing Law">
              <p>
                These Terms of Service shall be governed by and construed in accordance with the
                laws of the United States and the state in which Develom LLC is incorporated,
                without regard to its conflict of law provisions.
              </p>
            </Section>

            <Section title="9. Changes to These Terms">
              <p>
                We reserve the right to modify these Terms of Service at any time. Changes will
                take effect immediately upon posting to the website. Your continued use of the
                website after any changes constitutes your acceptance of the revised terms.
              </p>
            </Section>

            <Section title="10. Contact">
              <p>
                For questions about these Terms of Service, contact our legal team at{' '}
                <a href="mailto:jean-luc@agents.develom.com" className="text-blue underline underline-offset-2 hover:opacity-80">
                  jean-luc@agents.develom.com
                </a>
                .
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
