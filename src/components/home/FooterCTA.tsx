import Link from 'next/link'

export default function FooterCTA() {
  return (
    <section className="bg-navy px-6 py-24 text-center">
      <div className="mx-auto max-w-[640px]">
        <h2 className="text-h2 text-white">
          Ready to Replace Your Compliance Bottleneck?
        </h2>

        <p className="mx-auto mt-5 max-w-narrow text-lg text-white/75">
          Tell us what{"'"}s slowing your team down. We{"'"}ll tell you what{"'"}s possible.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/contact"
            className="inline-block rounded bg-blue px-8 py-3.5 text-[16px] font-bold text-white hover:brightness-90 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Book a Discovery Call
          </Link>
          <Link
            href="/portfolio"
            className="inline-block rounded border border-white/40 px-8 py-3 text-[16px] font-semibold text-white hover:border-white hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            See the Work
          </Link>
        </div>
      </div>
    </section>
  )
}
