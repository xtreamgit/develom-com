import Link from 'next/link'

export default function AboutCTA() {
  return (
    <section className="bg-navy px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[680px]">
        <h2
          className="text-white"
          style={{ fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 2.5rem)', fontWeight: 700, lineHeight: 1.2 }}
        >
          Ready to Work With a Team That Knows Your Industry?
        </h2>
        <p className="mt-5 max-w-[520px] text-[17px] leading-[1.7] text-white/70">
          30 years of IT engineering meets production-grade AI. Let&apos;s talk about what
          you&apos;re building.
        </p>
        <div className="mt-10">
          <Link
            href="/contact"
            className="inline-block rounded-lg bg-blue px-8 py-3.5 text-[15px] font-bold tracking-wide text-white transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-navy"
          >
            Book a Discovery Call
          </Link>
        </div>
      </div>
    </section>
  )
}
