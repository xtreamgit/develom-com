import type { Metadata } from 'next'
import InterviewFlow from '@/components/interview/InterviewFlow'

export const metadata: Metadata = {
  title: 'AI Solution Finder — Develom',
  description:
    'Answer 5 quick questions about your organization and get a personalized AI roadmap — tailored solutions, implementation paths, and honest ROI estimates.',
  openGraph: {
    title: 'AI Solution Finder — Develom',
    description:
      'Get a personalized AI roadmap for your organization in minutes. Tailored solutions, implementation paths, and honest ROI estimates.',
    type: 'website',
  },
}

const WHY_IT_WORKS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
          stroke="#2563EB"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    text: 'Calibrated to your team size, tech maturity, and compliance requirements',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
          stroke="#2563EB"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    text: 'Honest complexity ratings and realistic ROI ranges — no hype',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
          stroke="#2563EB"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    text: 'A clear implementation path based on where you actually are today',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
          stroke="#2563EB"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    text: 'Results in under 60 seconds — no sales call required',
  },
]

export default function AISolutionFinderPage() {
  return (
    <main>
      {/* Hero */}
      <section
        style={{ background: 'linear-gradient(135deg, #0F2444 0%, #1e3a5f 100%)' }}
        className="px-6 py-20 md:py-28"
      >
        <div className="mx-auto max-w-[680px] text-center">
          <span className="mb-4 inline-block rounded-full border border-[#2563EB]/40 bg-[#2563EB]/10 px-4 py-1 text-[12px] font-semibold uppercase tracking-widest text-[#93C5FD]">
            Free Tool
          </span>
          <h1
            className="font-bold text-white"
            style={{ fontSize: 'clamp(2rem, 4vw + 0.75rem, 2.75rem)', lineHeight: 1.15 }}
          >
            AI Solution Finder
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-[#CBD5E1]">
            Answer 5 questions about your organization. Get a personalized roadmap — specific AI
            solutions, implementation paths, and honest ROI estimates.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[13px] text-[#94A3B8]">
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Takes about 3 minutes
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                  stroke="#22C55E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Instant AI-generated results
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 15v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2zm10-10V7a4 4 0 0 0-8 0v4h8z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              No spam
            </span>
          </div>
        </div>
      </section>

      {/* Interview + Why it works */}
      <section className="bg-[#F8FAFC] px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-[1000px] gap-12 md:grid-cols-[1fr_340px] md:gap-16">

          {/* Interview flow card */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
            <InterviewFlow />
          </div>

          {/* Why it works sidebar */}
          <div className="flex flex-col justify-start gap-6 md:pt-2">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-widest text-[#2563EB]">
                Why it works
              </p>
              <h2 className="mt-3 text-[22px] font-bold text-[#0F2444]">
                Recommendations that fit your reality
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed text-[#6B7280]">
                Most AI assessments give you generic use cases. This one uses your actual
                constraints — team size, infrastructure, compliance needs, and AI maturity — to
                generate recommendations you can act on.
              </p>
            </div>

            <ul className="flex flex-col gap-4">
              {WHY_IT_WORKS.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0">{item.icon}</span>
                  <span className="text-[14px] leading-snug text-[#374151]">{item.text}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-xl border border-[#E2E8F0] bg-white px-5 py-4">
              <p className="text-[13px] font-semibold text-[#0F2444]">
                Built by Develom&apos;s AI consultants
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-[#6B7280]">
                The recommendations are generated by Claude, informed by our team&apos;s
                experience across 50+ AI implementations in regulated and high-growth
                environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-[#E2E8F0] bg-white px-6 py-14 text-center">
        <p className="text-[14px] text-[#6B7280]">
          Prefer to talk it through?{' '}
          <a href="/contact" className="font-semibold text-[#2563EB] hover:underline">
            Schedule a free strategy call with Develom →
          </a>
        </p>
      </section>
    </main>
  )
}
