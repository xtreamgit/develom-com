import Link from 'next/link'

export default function ServicesHero() {
  return (
    <section className="bg-navy px-6 pb-24 pt-32 md:pb-32 md:pt-40">
      <div className="mx-auto max-w-[800px]">
        <p className="mb-6 text-[13px] font-semibold uppercase tracking-[0.12em] text-blue">
          What We Build
        </p>

        <h1
          className="max-w-[720px] text-white"
          style={{
            fontSize: 'clamp(2.25rem, 4vw + 1rem, 3.25rem)',
            lineHeight: 1.15,
            fontWeight: 800,
            letterSpacing: '-0.02em',
          }}
        >
          AI Systems Built for the Industries That Can&apos;t Afford to Get It Wrong.
        </h1>

        <p className="mt-8 max-w-[600px] text-[17px] leading-[1.7] text-white/85">
          Develom designs and deploys production-grade AI architecture, applications, and automation
          systems for mid-market and enterprise clients in healthcare, financial services, insurance,
          and legal. Every system we ship is compliance-ready by default — not as an afterthought.
        </p>

        <div className="mt-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <Link
            href="/contact"
            className="rounded-lg bg-blue px-8 py-3.5 text-[15px] font-bold tracking-wide text-white transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-navy"
          >
            Book a Discovery Call
          </Link>
          <Link
            href="/portfolio"
            className="rounded text-[15px] font-medium text-white/60 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            See our portfolio →
          </Link>
        </div>
      </div>
    </section>
  )
}
