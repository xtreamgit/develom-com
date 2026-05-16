import Link from 'next/link'

export interface SolutionCard {
  category: string
  items: string
}

export interface IndustryColumn {
  title: string
  description: string
  icon: React.ReactNode
}

export interface IndustryPageProps {
  eyebrow: string
  hero: { headline: string; subheadline: string; cta: string }
  problem: { headline: string; body: string }
  whatWeDo: { headline: string; body: string; columns: IndustryColumn[] }
  solutions: SolutionCard[]
  trust: string
  ctaClose: { headline: string; body: string; cta: string }
}

const CARD_ICONS: Record<string, React.ReactNode> = {
  'Automate & Optimize': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'Analyze & Predict': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'Engage & Assist': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'Protect & Detect': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

export default function IndustryPage({
  eyebrow,
  hero,
  problem,
  whatWeDo,
  solutions,
  trust,
  ctaClose,
}: IndustryPageProps) {
  return (
    <main>
      {/* Hero */}
      <section className="bg-navy px-6 pb-24 pt-32 md:pb-32 md:pt-40">
        <div className="mx-auto max-w-[780px]">
          <p className="mb-6 text-[13px] font-semibold uppercase tracking-[0.12em] text-blue">
            {eyebrow}
          </p>
          <h1
            className="max-w-[720px] text-white"
            style={{ fontSize: 'clamp(2rem, 3.5vw + 1rem, 3rem)', lineHeight: 1.15, fontWeight: 800, letterSpacing: '-0.02em' }}
          >
            {hero.headline}
          </h1>
          <p className="mt-8 max-w-[620px] text-[17px] leading-[1.75] text-white/80">
            {hero.subheadline}
          </p>
          <div className="mt-10">
            <Link
              href="/ai-solution-finder"
              className="inline-block rounded-lg bg-blue px-8 py-3.5 text-[15px] font-bold tracking-wide text-white transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-navy"
            >
              {hero.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* Problem / Stakes */}
      <section className="border-b border-[#E2E8F0] bg-[#F8FAFC] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-[1000px]">
          <div className="grid gap-12 md:grid-cols-[1fr_340px] md:gap-16 md:items-start">
            <div>
              <h2
                className="text-navy"
                style={{ fontSize: 'clamp(1.5rem, 2.5vw + 0.5rem, 2.25rem)', fontWeight: 700, lineHeight: 1.2 }}
              >
                {problem.headline}
              </h2>
              <p className="mt-6 text-[16px] leading-[1.8] text-muted">
                {problem.body}
              </p>
            </div>
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
              <p className="text-[12px] font-semibold uppercase tracking-widest text-blue">
                The Stakes
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-[#374151]">
                Regulated industries that deploy AI without governance infrastructure don&apos;t just
                face audit risk — they face enforcement actions built on exactly that gap.
              </p>
              <div className="mt-6 border-t border-[#E2E8F0] pt-6">
                <p className="text-[13px] font-semibold text-navy">Develom&apos;s approach</p>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">
                  Match first. Build second. Document throughout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Develom Does */}
      <section className="bg-white px-6 py-20 md:py-28">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-14">
            <h2
              className="text-navy"
              style={{ fontSize: 'clamp(1.5rem, 2.5vw + 0.5rem, 2.25rem)', fontWeight: 700, lineHeight: 1.2 }}
            >
              {whatWeDo.headline}
            </h2>
            <p className="mt-5 max-w-[680px] text-[16px] leading-[1.8] text-muted">
              {whatWeDo.body}
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {whatWeDo.columns.map((col, i) => (
              <div key={i} className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue/10">
                  {col.icon}
                </div>
                <p className="text-[15px] font-bold text-navy">{col.title}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{col.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Cards 2×2 */}
      <section className="bg-[#F8FAFC] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-[1000px]">
          <p className="mb-3 text-[12px] font-semibold uppercase tracking-widest text-blue">
            Solution Areas
          </p>
          <h2
            className="mb-12 text-navy"
            style={{ fontSize: 'clamp(1.5rem, 2.5vw + 0.5rem, 2.25rem)', fontWeight: 700, lineHeight: 1.2 }}
          >
            What We Build For Your Industry
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {solutions.map((card, i) => (
              <div key={i} className="rounded-xl border border-[#E2E8F0] bg-white p-7 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue/10">
                    {CARD_ICONS[card.category]}
                  </div>
                  <p className="text-[13px] font-bold uppercase tracking-wider text-blue">
                    {card.category}
                  </p>
                </div>
                <p className="text-[14px] leading-relaxed text-[#374151]">{card.items}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/ai-solution-finder"
              className="inline-block rounded-lg bg-navy px-8 py-3.5 text-[15px] font-bold tracking-wide text-white transition-all hover:bg-blue focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Start Your AI Match
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Signal */}
      <section className="border-y border-[#E2E8F0] bg-white px-6 py-14">
        <div className="mx-auto max-w-[780px] text-center">
          <svg className="mx-auto mb-6 text-blue" width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-[16px] leading-[1.8] text-[#374151] md:text-[17px]">{trust}</p>
        </div>
      </section>

      {/* CTA Close */}
      <section className="bg-navy px-6 py-24 md:py-32">
        <div className="mx-auto max-w-[680px] text-center">
          <h2
            className="text-white"
            style={{ fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 2.5rem)', fontWeight: 700, lineHeight: 1.2 }}
          >
            {ctaClose.headline}
          </h2>
          <p className="mt-5 text-[17px] leading-[1.7] text-white/70">
            {ctaClose.body}
          </p>
          <div className="mt-10">
            <Link
              href="/ai-solution-finder"
              className="inline-block rounded-lg bg-blue px-10 py-4 text-[15px] font-bold tracking-wide text-white transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-navy"
            >
              {ctaClose.cta}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
