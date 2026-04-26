import Link from 'next/link'

export default function PortfolioHero() {
  return (
    <section
      className="px-6 pb-24 pt-32 md:pb-32 md:pt-40"
      style={{
        backgroundColor: '#060D1B',
        backgroundImage:
          'radial-gradient(circle, rgba(37,99,235,0.12) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    >
      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
        {/* Left — headline block */}
        <div>
          <p className="mb-7 text-[12px] font-semibold uppercase tracking-[0.14em] text-blue">
            Our Work
          </p>

          <h1
            className="text-white"
            style={{
              fontSize: 'clamp(2.5rem, 4.5vw + 1rem, 3.75rem)',
              lineHeight: 1.1,
              fontWeight: 700,
              letterSpacing: '-0.025em',
              maxWidth: '14ch',
            }}
          >
            Working AI Systems.
            <br />
            Not Slide Decks.
          </h1>

          <p
            className="mt-8 text-[17px] leading-[1.75] text-white/65"
            style={{ maxWidth: '52ch' }}
          >
            Three production-grade AI systems — designed, built, and deployed by Develom
            for regulated industries. GCP-native from the ground up. Compliance-ready
            by default.
          </p>

          <div className="mt-12">
            <Link
              href="/contact"
              className="inline-block rounded bg-blue px-8 py-3.5 text-[15px] font-semibold tracking-wide text-white transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#060D1B]"
            >
              Start a Project →
            </Link>
          </div>
        </div>

        {/* Right — spec panel (desktop only) */}
        <div
          className="hidden shrink-0 overflow-hidden rounded lg:flex lg:flex-col"
          style={{
            minWidth: '272px',
            border: '1px solid rgba(37,99,235,0.18)',
            backgroundColor: 'rgba(12,24,44,0.85)',
          }}
          aria-hidden="true"
        >
          {/* Panel header */}
          <div
            className="px-5 py-3"
            style={{ borderBottom: '1px solid rgba(37,99,235,0.15)', backgroundColor: 'rgba(6,13,27,0.6)' }}
          >
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-blue/60">
              Production Portfolio
            </p>
          </div>

          {/* Stat row */}
          <div className="px-5 py-5" style={{ borderBottom: '1px solid rgba(37,99,235,0.12)' }}>
            <p className="font-mono text-[56px] font-normal leading-none tabular-nums text-blue">
              03
            </p>
            <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-white/40">
              Systems in active build
            </p>
          </div>

          {/* Stack row */}
          <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(37,99,235,0.12)' }}>
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/60">
              GCP-Native
            </p>
            <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-white/60">
              Agentic RAG Architecture
            </p>
          </div>

          {/* Compliance row */}
          <div className="px-5 py-4">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-blue/70">
              HIPAA · AML/KYC · GDPR
            </p>
            <p className="mt-0.5 font-mono text-[11px] text-white/35">
              Compliance by design
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
