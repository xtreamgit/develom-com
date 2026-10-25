import Link from 'next/link'

export default function HomeHero() {
  return (
    <section className="bg-surface-light pt-16 pb-20 px-6">
      <div className="mx-auto max-w-content">
        <div className="mt-10 lg:mt-16 flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Copy */}
          <div className="flex-1 lg:max-w-[500px]">
            <h1 className="text-hero text-[#0D1B2A]">
              AI Agent Orchestration &amp; Governance
            </h1>
            <p className="mt-5 text-lg text-[#4A6585] max-w-narrow">
              Develom builds, orchestrates, and governs AI agents that do real work for your
              business — with the accountability and data protection to back it.
            </p>
            <p className="mt-4 text-[18px] font-semibold text-signal leading-snug max-w-narrow">
              Others hand you the AI. We run the whole job — and we answer for the results.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="btn-signal inline-block rounded-lg px-6 py-3.5 text-[16px] font-bold text-center transition-all focus:outline-none focus:ring-2 focus:ring-signal focus:ring-offset-2"
              >
                Talk to an Expert
              </Link>
              <Link
                href="/services"
                className="inline-block rounded-lg border border-[#BDD5EE] px-6 py-3.5 text-[16px] font-semibold text-[#4A6585] text-center hover:border-[#D0E6F5] hover:bg-ground transition-all focus:outline-none focus:ring-2 focus:ring-[#BDD5EE]"
              >
                See How It Works
              </Link>
            </div>
          </div>

          {/* Hero dashboard — 16:9 (1280×720, request 2× from Eero before ship) */}
          <div className="flex-1 lg:max-w-[560px]">
            <div className="relative w-full rounded-xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
              <img
                src="/hero-dashboard.jpg"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
