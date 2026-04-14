import Link from 'next/link'

export default function FooterCTA() {
  return (
    <section className="bg-navy px-6 py-24">
      <div className="mx-auto max-w-text text-center">
        <h2 className="text-h1 text-white leading-tight">
          Ready to Automate What{'\u2019'}s Slowing You Down?
        </h2>

        <p className="mx-auto mt-5 max-w-narrow text-lg text-white/80">
          Tell us your biggest compliance or automation challenge. We{'\u2019'}ll tell you exactly how we{'\u2019'}d approach it — no pitch, no fluff.
        </p>

        <div className="mt-10">
          <Link
            href="/contact"
            className="inline-block rounded bg-blue px-10 py-4 text-[16px] font-bold text-white hover:brightness-90 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Book a Discovery Call
          </Link>
        </div>

        <p className="mt-3 text-[14px] text-white/60">
          30 minutes. No commitment. Just a real conversation.
        </p>
      </div>
    </section>
  )
}
