import Link from 'next/link'

export default function ServicesCTA() {
  return (
    <section className="bg-[#F8FAFC] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[680px]">
        <h2
          className="text-navy"
          style={{ fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 2.5rem)', fontWeight: 700, lineHeight: 1.2 }}
        >
          Not Sure Which Service You Need?
        </h2>
        <p className="mt-5 max-w-[520px] text-[17px] leading-[1.7] text-muted">
          Tell us your biggest workflow or compliance challenge. We&apos;ll tell you exactly how
          we&apos;d approach it — no pitch, no upsell.
        </p>
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Link
            href="/contact"
            className="rounded-lg bg-navy px-8 py-3.5 text-[15px] font-bold tracking-wide text-white transition-all hover:bg-blue focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Book a Discovery Call
          </Link>
          <span className="text-[14px] text-muted">
            30 minutes. No commitment.
          </span>
        </div>
      </div>
    </section>
  )
}
