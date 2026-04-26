import Link from 'next/link'

export default function PortfolioCTA() {
  return (
    <section className="bg-white px-6 py-24 md:py-32" style={{ borderTop: '1px solid #E2E8F0' }}>
      <div className="mx-auto max-w-content">
        {/* Short overline above heading */}
        <div className="mb-7 h-px w-10 bg-blue" aria-hidden="true" />

        <h2
          className="text-navy"
          style={{
            fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 2.625rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            maxWidth: '18ch',
          }}
        >
          Have a Project in Mind?
        </h2>

        <p className="mt-5 text-[17px] leading-[1.75] text-muted" style={{ maxWidth: '52ch' }}>
          We design the architecture, build the application, and automate the workflow — for
          regulated industries that can&apos;t afford to cut corners.
        </p>

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Link
            href="/contact"
            className="min-h-[44px] rounded bg-navy px-8 py-3 text-[15px] font-semibold tracking-wide text-white transition-all hover:bg-blue focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Book a Discovery Call
          </Link>
          <Link
            href="/services"
            className="rounded text-[15px] font-medium text-muted transition-colors hover:text-navy focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            See Our Services →
          </Link>
        </div>
      </div>
    </section>
  )
}
