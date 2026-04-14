import Link from 'next/link'

export default function AboutCTA() {
  return (
    <section className="w-full bg-navy px-6 py-20">
      <div className="mx-auto max-w-[680px] text-center">
        <h2 className="text-[40px] font-bold text-white">
          Ready to Work With a Team That Knows Your Industry?
        </h2>
        <p className="mx-auto mt-5 max-w-[520px] text-[18px] leading-[1.6] text-white/80">
          30 years of IT engineering meets production-grade AI. Let&apos;s talk about what
          you&apos;re building.
        </p>
        <div className="mt-9">
          <Link
            href="/contact"
            className="inline-block rounded-lg bg-blue px-9 py-3.5 text-[16px] font-bold text-white transition-all hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Book a Discovery Call
          </Link>
        </div>
      </div>
    </section>
  )
}
