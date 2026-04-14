import Link from 'next/link'

export default function ServicesHero() {
  return (
    <section className="bg-navy px-6 py-24">
      <div className="mx-auto max-w-[800px]">
        <p className="mb-5 inline-flex items-center border-l-2 border-blue-500 pl-3 text-label uppercase text-blue">
          WHAT WE BUILD
        </p>

        <h1 className="max-w-[720px] text-[52px] font-extrabold leading-[1.15] text-white">
          AI Systems Built for the Industries That Can&apos;t Afford to Get It Wrong.
        </h1>

        <p className="mt-6 max-w-[620px] text-[18px] leading-[1.6] text-white/90">
          Develom designs and deploys production-grade AI architecture, applications, and automation
          systems for mid-market and enterprise clients in healthcare, financial services, insurance,
          and legal. Every system we ship is compliance-ready by default — not as an afterthought.
        </p>

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Link
            href="/contact"
            className="rounded-lg bg-blue px-8 py-3.5 text-[16px] font-bold text-white transition-all hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Book a Discovery Call
          </Link>
          <Link
            href="/portfolio"
            className="text-[16px] text-white/70 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
          >
            See our portfolio →
          </Link>
        </div>
      </div>
    </section>
  )
}
