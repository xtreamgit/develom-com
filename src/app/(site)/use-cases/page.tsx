import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI Use Cases — Automate, Optimize & Accelerate | Develom',
  description:
    'The 10 highest-ROI enterprise AI use cases in 2026 — mapped to Automate, Optimize, and Accelerate. Research-backed, regulated-industry-ready.',
  alternates: {
    canonical: 'https://develom.com/use-cases',
  },
  openGraph: {
    title: 'AI Use Cases — Automate, Optimize & Accelerate | Develom',
    description:
      'The 10 highest-ROI enterprise AI use cases in 2026 — mapped to Automate, Optimize, and Accelerate. Research-backed, regulated-industry-ready.',
    type: 'website',
    url: 'https://develom.com/use-cases',
  },
}

type Pillar = 'automate' | 'optimize' | 'accelerate'

interface UseCase {
  title: string
  pillar: Pillar
  description: string
  roi: string
  angle: string
}

const USE_CASES: UseCase[] = [
  {
    title: 'Customer Service Automation',
    pillar: 'automate',
    description:
      'AI agents handle full end-to-end resolution — returns, rebooking, account updates, multi-step transactions — without human handoff. The #1 enterprise AI deployment category in 2026.',
    roi: '5.8x average ROI; 88% of companies report measurable cost reduction (Deloitte 2026)',
    angle: 'Automate your entire first-response layer. Your team handles escalations; AI handles everything else.',
  },
  {
    title: 'Document Processing & Intelligent Automation',
    pillar: 'automate',
    description:
      'AI reads, classifies, extracts, and acts on unstructured documents — invoices, contracts, claims — at scale. Highest single-use-case ROI in enterprise AI.',
    roi: '320% ROI within 6 months; 70% cost reduction (iEnable/MindPath 2026)',
    angle: 'Automate the paper-and-PDF layer of your business.',
  },
  {
    title: 'Meeting Intelligence & Workflow Automation',
    pillar: 'automate',
    description:
      'AI captures meetings, extracts action items, drafts follow-ups, assigns and tracks tasks — turning every conversation into an executed plan.',
    roi: '4–6 hours/week reclaimed per manager; 70% reduction in post-meeting follow-up time',
    angle: 'Every meeting becomes a tracked, executed plan.',
  },
  {
    title: 'Finance & Compliance Automation',
    pillar: 'optimize',
    description:
      'AI monitors transactions, flags anomalies, generates financial reports, and automates reconciliation. Already in production at major financial institutions.',
    roi: '43% of financial services companies report major efficiency gains; HSBC detects 2–4x more suspicious activity with 60% fewer false positives',
    angle: 'Fewer errors, faster close, lower compliance exposure.',
  },
  {
    title: 'HR & Talent Operations',
    pillar: 'optimize',
    description:
      'AI screens candidates, schedules interviews, and handles onboarding workflows — compressing time-to-hire without compromising quality.',
    roi: '75% reduction in hiring time; Unilever cut time-to-fill 50%, increased new-hire diversity 16%',
    angle: 'Hire faster, screen better, spend HR time where it matters.',
  },
  {
    title: 'Supply Chain & Demand Forecasting',
    pillar: 'optimize',
    description:
      'AI predicts demand, optimizes inventory levels, and surfaces supply chain risks before they become outages — giving ops teams time to act.',
    roi: 'Unilever: 8% cost reduction across 124 factories; Nike: measurable lead time reduction',
    angle: 'Stop guessing, start predicting.',
  },
  {
    title: 'Internal Knowledge & Employee AI Assistant',
    pillar: 'optimize',
    description:
      'A persistent AI assistant that learns each employee\'s context, handles recurring tasks, and builds institutional knowledge over time.',
    roi: 'Output equivalent to a team 2–3x larger; PwC estimates $1,200–$2,400 annual productivity value per knowledge worker',
    angle: 'Give every employee an AI that knows their job.',
  },
  {
    title: 'Sales Enablement & Lead Qualification',
    pillar: 'accelerate',
    description:
      'AI qualifies inbound leads, scores pipeline, drafts personalized outreach, and surfaces the right content during live calls — without adding headcount.',
    roi: '3.7x ROI within 18 months; 300% more qualified leads; 2x faster lead-to-conversion (McKinsey/Forrester)',
    angle: 'Accelerate your pipeline without scaling your sales team.',
  },
  {
    title: 'Marketing Content & Campaign Operations',
    pillar: 'accelerate',
    description:
      'AI handles first-draft content, ad copy variations, SEO optimization, campaign performance analysis, and audience segmentation — at the speed your market moves.',
    roi: '3–5x content output at same headcount; 40% reduction in cost per acquired customer',
    angle: 'More content, faster campaigns, same team.',
  },
  {
    title: 'Developer & Knowledge Worker Productivity',
    pillar: 'accelerate',
    description:
      'AI coding assistants, meeting summarizers, and agentic knowledge tools that compress the timeline on everything your best people do.',
    roi: '55% faster task completion (GitHub); 66% of organizations report measurable gains (Deloitte 2026)',
    angle: 'Less time on busywork, more on the work that compounds.',
  },
]

const PILLARS: {
  key: Pillar
  label: string
  tagline: string
  description: string
  badge: string
  accent: string
  dot: string
}[] = [
  {
    key: 'automate',
    label: 'Automate',
    tagline: 'Remove the human from work that doesn\'t need one.',
    description:
      'Let AI handle work that shouldn\'t need a human — repetitive, high-volume, rules-driven tasks. Free your team for decisions that actually require judgment.',
    badge: 'bg-blue/10 text-blue',
    accent: 'border-blue',
    dot: 'bg-blue',
  },
  {
    key: 'optimize',
    label: 'Optimize',
    tagline: 'Make better decisions faster.',
    description:
      'Make better decisions faster — with better data, tighter processes, less waste. AI that surfaces what matters and gets out of the way.',
    badge: 'bg-emerald-50 text-emerald-700',
    accent: 'border-emerald-500',
    dot: 'bg-emerald-500',
  },
  {
    key: 'accelerate',
    label: 'Accelerate',
    tagline: 'Move faster than your competition.',
    description:
      'Move faster than your competition. AI compresses the timeline on everything — from pipeline to product to publication.',
    badge: 'bg-orange-50 text-orange-700',
    accent: 'border-orange-500',
    dot: 'bg-orange-500',
  },
]

const PILLAR_MAP = Object.fromEntries(PILLARS.map((p) => [p.key, p])) as Record<Pillar, (typeof PILLARS)[0]>

function PillarBadge({ pillar }: { pillar: Pillar }) {
  const p = PILLAR_MAP[pillar]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] ${p.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${p.dot}`} />
      {p.label}
    </span>
  )
}

function UseCaseCard({ uc }: { uc: UseCase }) {
  const p = PILLAR_MAP[uc.pillar]
  return (
    <div className={`flex flex-col gap-4 rounded-xl border border-[#E5E7EB] border-l-[3px] ${p.accent} bg-white p-6 shadow-sm`}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-navy text-[17px] font-700 leading-snug" style={{ fontWeight: 700 }}>
          {uc.title}
        </h3>
        <PillarBadge pillar={uc.pillar} />
      </div>
      <p className="text-[15px] leading-[1.65] text-text">{uc.description}</p>
      <div className="rounded-lg bg-[#F8FAFC] px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted mb-1">ROI</p>
        <p className="text-[13px] leading-[1.55] text-text">{uc.roi}</p>
      </div>
      <div className="flex gap-2">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
          <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8S4.41 14.5 8 14.5 14.5 11.59 14.5 8 11.59 1.5 8 1.5zm.75 9.75h-1.5V7.25h1.5v4zm0-5.5h-1.5v-1.5h1.5v1.5z" fill="#2563EB" />
        </svg>
        <p className="text-[13px] leading-[1.55] text-blue font-medium">{uc.angle}</p>
      </div>
    </div>
  )
}

export default function UseCasesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-navy px-6 pb-16 pt-32 md:pb-24 md:pt-44">
        <div className="mx-auto max-w-content">
          <p className="mb-6 text-[13px] font-semibold uppercase tracking-[0.12em] text-blue">
            Use Cases
          </p>
          <h1
            className="text-white"
            style={{
              fontSize: 'clamp(2rem, 4vw + 1rem, 3.25rem)',
              lineHeight: 1.15,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              maxWidth: '760px',
            }}
          >
            What AI Actually Does Inside Your Business
          </h1>
          <p
            className="mt-6 text-white/70"
            style={{ fontSize: 'clamp(1rem, 1.5vw + 0.5rem, 1.2rem)', lineHeight: 1.65, maxWidth: '620px' }}
          >
            The 10 highest-ROI enterprise AI deployments in 2026 — mapped to three operating principles:
            Automate what doesn&rsquo;t need humans, Optimize what does, and Accelerate everything in between.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-blue px-6 py-3 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              Find the right fit for your business
              <svg viewBox="0 0 16 16" fill="none" width={14} height={14} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Pillar intro */}
      <section className="border-b border-[#E5E7EB] bg-white px-6 py-14 md:py-16">
        <div className="mx-auto max-w-content">
          <div className="grid gap-8 md:grid-cols-3">
            {PILLARS.map((p) => (
              <div key={p.key} className={`flex flex-col gap-3 rounded-xl border-t-[3px] ${p.accent} bg-[#F8FAFC] p-6`}>
                <span className={`inline-flex items-center gap-1.5 self-start rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] ${p.badge}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${p.dot}`} />
                  {p.label}
                </span>
                <p className="text-navy text-[16px] font-bold leading-snug">{p.tagline}</p>
                <p className="text-[14px] leading-[1.65] text-muted">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases by pillar */}
      {PILLARS.map((pillar) => {
        const cases = USE_CASES.filter((uc) => uc.pillar === pillar.key)
        return (
          <section key={pillar.key} className="bg-bg-alt px-6 py-14 md:py-20">
            <div className="mx-auto max-w-content">
              <div className="mb-10 flex items-center gap-4">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.08em] ${pillar.badge}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${pillar.dot}`} />
                  {pillar.label}
                </span>
                <div className="h-px flex-1 bg-[#E5E7EB]" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {cases.map((uc) => (
                  <UseCaseCard key={uc.title} uc={uc} />
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* CTA */}
      <section className="bg-navy px-6 py-20 md:py-28">
        <div className="mx-auto max-w-text text-center">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-blue">
            Ready to start?
          </p>
          <h2
            className="text-white"
            style={{ fontSize: 'clamp(1.6rem, 3vw + 0.5rem, 2.5rem)', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.02em' }}
          >
            Which of these applies to your business?
          </h2>
          <p className="mt-5 text-[16px] leading-[1.7] text-white/60">
            Tell us where you want to start — Automate, Optimize, or Accelerate — and we&rsquo;ll match
            you to the right AI implementation for your industry, stack, and compliance requirements.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-blue px-7 py-3.5 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              Start the conversation
              <svg viewBox="0 0 16 16" fill="none" width={14} height={14} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
            <Link
              href="/industries"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-7 py-3.5 text-[15px] font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
            >
              Browse by industry
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
