import Link from 'next/link'

export default function ServicesCTA() {
  return (
    <section className="w-full bg-navy px-6 py-20">
      <div className="mx-auto max-w-[680px] text-center">
        <h2 className="text-[40px] font-bold text-white">
          Not Sure Which Service You Need?
        </h2>
        <p className="mx-auto mt-5 max-w-[520px] text-[18px] leading-[1.6] text-white/80">
          Tell us your biggest workflow or compliance challenge. We&apos;ll tell you exactly how
          we&apos;d approach it — no pitch, no upsell.
        </p>
        <div className="mt-9 flex flex-col items-center gap-3">
          <Link
            href="/contact"
            className="inline-block rounded-lg bg-blue px-9 py-3.5 text-[16px] font-bold text-white transition-all hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Book a Discovery Call
          </Link>
          <p className="text-[14px] text-white/60">
            30 minutes. No commitment. Just a real conversation.
          </p>
        </div>
      </div>
    </section>
  )
}
