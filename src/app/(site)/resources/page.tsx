import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Resources | Develom',
  description:
    'Practical guides, tool references, and discovery tools for teams building AI in regulated industries.',
}

const resources = [
  {
    eyebrow: 'Reference',
    title: 'Top 10 Agentic AI Tools',
    description:
      'A practitioner's guide to the leading frameworks and platforms behind production agentic AI — LangGraph, CrewAI, Langfuse, Mem0, and seven more. Stage-tagged and indexed by use case.',
    href: '/resources/agentic-ai-tools',
    cta: 'Browse the guide',
    accent: 'bg-blue/10 text-blue border-blue/20',
  },
  {
    eyebrow: 'Free Download',
    title: 'AI Governance Methods Guide',
    description:
      'A practical framework for organizations implementing AI — covering governance models, risk assessment, compliance alignment, and responsible deployment practices.',
    href: '/resources/ai-governance-guide',
    cta: 'Download free guide',
    accent: 'bg-violet-50 text-violet-700 border-violet-200',
  },
  {
    eyebrow: 'Tool',
    title: 'Solution Discovery',
    description:
      'Not sure which AI solution fits your team? Talk to Velom — our AI discovery guide will map your challenge to the right solution in under two minutes.',
    href: '/resources/discovery',
    cta: 'Start discovery',
    accent: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
]

export default function ResourcesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-navy px-6 pb-24 pt-32 md:pb-32 md:pt-40">
        <div className="mx-auto max-w-[800px]">
          <p className="mb-6 text-[13px] font-semibold uppercase tracking-[0.12em] text-blue">
            Resources
          </p>
          <h1
            className="max-w-[680px] text-white"
            style={{
              fontSize: 'clamp(2.25rem, 4vw + 1rem, 3.25rem)',
              lineHeight: 1.15,
              fontWeight: 800,
              letterSpacing: '-0.02em',
            }}
          >
            Guides and Tools for Teams Building AI in Regulated Industries.
          </h1>
          <p className="mt-8 max-w-[560px] text-[17px] leading-[1.7] text-white/85">
            Practitioner-grade references, governance frameworks, and discovery tools — built for
            the organizations that can&apos;t afford to guess.
          </p>
        </div>
      </section>

      {/* Resource cards */}
      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-content">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {resources.map((r) => (
              <article
                key={r.href}
                className="group flex flex-col rounded-lg bg-[#F8FAFC] p-8 ring-1 ring-slate-200 transition-all duration-200 hover:bg-white hover:shadow-md hover:ring-blue/20"
              >
                <span
                  className={`self-start rounded border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] ${r.accent}`}
                >
                  {r.eyebrow}
                </span>

                <h2 className="mt-5 text-[20px] font-bold leading-snug text-navy">{r.title}</h2>

                <p className="mt-3 flex-1 text-[14px] leading-[1.75] text-text">{r.description}</p>

                <div className="mt-8">
                  <Link
                    href={r.href}
                    className="inline-flex items-center gap-1.5 rounded text-[14px] font-semibold text-blue transition-colors hover:text-navy focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    {r.cta}
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F8FAFC] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-[680px]">
          <h2
            className="text-navy"
            style={{ fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 2.5rem)', fontWeight: 700, lineHeight: 1.2 }}
          >
            Ready to Go Further?
          </h2>
          <p className="mt-5 max-w-[520px] text-[17px] leading-[1.7] text-muted">
            Tell us what you&apos;re building. We&apos;ll tell you exactly how we&apos;d architect
            it — no pitch, no commitment.
          </p>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="rounded-lg bg-navy px-8 py-3.5 text-[15px] font-bold tracking-wide text-white transition-all hover:bg-blue focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Book a Discovery Call
            </Link>
            <span className="text-[14px] text-muted">30 minutes. No commitment.</span>
          </div>
        </div>
      </section>
    </main>
  )
}
