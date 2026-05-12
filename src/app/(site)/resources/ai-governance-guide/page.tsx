import type { Metadata } from 'next'
import LeadCaptureForm from '@/components/resources/LeadCaptureForm'

export const metadata: Metadata = {
  title: 'AI Governance Methods Guide — Develom',
  description:
    'A practical framework for organizations implementing AI — covering governance models, risk assessment, compliance alignment, and responsible deployment practices. Free download.',
  openGraph: {
    title: 'AI Governance Methods Guide — Develom',
    description:
      'Download the free guide: governance models, risk assessment, compliance alignment, and responsible AI deployment practices.',
    type: 'website',
  },
}

const WHAT_IS_INSIDE = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: 'Governance models for AI systems at every maturity level',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: 'Risk assessment frameworks for LLM and agentic deployments',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: 'Compliance alignment for regulated industries (healthcare, finance, legal)',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: 'Implementation checklists and accountability structures',
  },
]

export default function AIGovernanceGuidePage() {
  return (
    <main>
      {/* Hero */}
      <section
        style={{ background: 'linear-gradient(135deg, #0F2444 0%, #1e3a5f 100%)' }}
        className="px-6 py-20 md:py-28"
      >
        <div className="mx-auto max-w-[680px] text-center">
          <span className="mb-4 inline-block rounded-full border border-[#2563EB]/40 bg-[#2563EB]/10 px-4 py-1 text-[12px] font-semibold uppercase tracking-widest text-[#93C5FD]">
            Free Resource
          </span>
          <h1
            className="font-bold text-white"
            style={{ fontSize: 'clamp(2rem, 4vw + 0.75rem, 2.75rem)', lineHeight: 1.15 }}
          >
            AI Governance Methods
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-[#CBD5E1]">
            A practical framework for organizations navigating AI adoption — governance models,
            risk assessment, compliance alignment, and responsible deployment practices.
          </p>

          {/* Social proof strip */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[13px] text-[#94A3B8]">
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#F59E0B" />
              </svg>
              Used by enterprise teams
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Immediate PDF access
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 15v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2zm10-10V7a4 4 0 0 0-8 0v4h8z" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              No spam
            </span>
          </div>
        </div>
      </section>

      {/* Form + What's Inside */}
      <section className="bg-[#F8FAFC] px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-[900px] gap-12 md:grid-cols-2 md:gap-16">

          {/* Left: What's inside */}
          <div className="flex flex-col justify-center">
            <p className="text-[12px] font-semibold uppercase tracking-widest text-[#2563EB]">
              What&apos;s Inside
            </p>
            <h2 className="mt-3 text-[24px] font-bold text-[#0F2444] md:text-[28px]">
              Build AI governance before you need it
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#6B7280]">
              Most organizations implement AI governance after a problem surfaces. This guide gives your
              team the frameworks to get ahead of risk — and build stakeholder confidence in every
              deployment decision.
            </p>

            <ul className="mt-8 flex flex-col gap-4">
              {WHAT_IS_INSIDE.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0">{item.icon}</span>
                  <span className="text-[14px] leading-snug text-[#374151]">{item.text}</span>
                </li>
              ))}
            </ul>

            {/* PDF preview hint */}
            <div className="mt-8 flex items-center gap-3 rounded-lg border border-[#E2E8F0] bg-white px-4 py-3">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
                <rect width="16" height="20" x="4" y="2" rx="2" stroke="#2563EB" strokeWidth="1.5" />
                <path d="M8 7h8M8 11h8M8 15h5" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <div>
                <p className="text-[13px] font-semibold text-[#111827]">Develom_AI_Governance_Methods.pdf</p>
                <p className="text-[12px] text-[#9CA3AF]">465 KB · Immediate download after signup</p>
              </div>
            </div>
          </div>

          {/* Right: Form card */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white px-8 py-8 shadow-sm">
            <h3 className="text-[18px] font-bold text-[#0F2444]">Download the Free Guide</h3>
            <p className="mt-1 text-[14px] text-[#6B7280]">
              Enter your details to get instant access.
            </p>
            <div className="mt-6">
              <LeadCaptureForm source="ai-governance-guide" />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-[#E2E8F0] bg-white px-6 py-14 text-center">
        <p className="text-[14px] text-[#6B7280]">
          Ready to go further?{' '}
          <a href="/contact" className="font-semibold text-[#2563EB] hover:underline">
            Talk to Develom about your AI governance strategy →
          </a>
        </p>
      </section>
    </main>
  )
}
