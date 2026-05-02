import Link from 'next/link'

const outcomes = [
  {
    industry: 'Healthcare',
    problem: 'Compliance staff spending 60% of their time fielding internal regulatory queries.',
    result: 'Deployed agentic AI system — query turnaround reduced from 4 days to 4 hours.',
  },
  {
    industry: 'Financial Services',
    problem: 'AML/KYC documentation review creating a 12-day average client onboarding delay.',
    result: 'Automated review workflow reduced onboarding time from 12 days to 3 days. Zero compliance exceptions at handoff.',
  },
  {
    industry: 'Insurance',
    problem: 'GDPR data subject requests processed manually across 9 regional offices.',
    result: 'Unified agentic pipeline — average processing time reduced from 11 days to same-day.',
  },
]

export default function SocialProof() {
  return (
    <section className="bg-[#0A0F1E] px-6 py-16">
      <div className="mx-auto max-w-content">
        <p className="text-label uppercase tracking-widest text-white/40">SYSTEMS IN PRODUCTION</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((o) => (
            <div key={o.industry} className="flex flex-col rounded-lg bg-[#0F1628] px-6 py-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-blue">
                {o.industry}
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-white/50">
                {o.problem}
              </p>
              <div className="my-4 border-t border-white/10" />
              <p className="text-[15px] leading-relaxed text-white/85 flex-1">
                {o.result}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/portfolio"
            className="text-[15px] font-semibold text-blue hover:underline"
          >
            See the full portfolio &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
