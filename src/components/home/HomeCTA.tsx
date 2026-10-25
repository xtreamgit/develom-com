import Link from 'next/link'

export default function HomeCTA() {
  return (
    <section className="bg-brand py-20 px-6">
      <div className="mx-auto max-w-content text-center">
        <h2 className="text-h2 text-on-dark">Ready when you are</h2>
        <p className="mt-5 text-lg text-on-dark/[0.65] max-w-text mx-auto">
          Tell us what process you need to run. We'll tell you how.
        </p>
        <p className="mt-3 text-[15px] text-on-dark/[0.38] max-w-text mx-auto">
          No demo environment. A real conversation about your use case, your workflows, and what
          accountability looks like in practice.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/contact"
            className="btn-signal inline-block rounded-lg px-8 py-3.5 text-[16px] font-bold text-center transition-all focus:outline-none focus:ring-2 focus:ring-signal focus:ring-offset-2 focus:ring-offset-brand"
          >
            Talk to an Expert
          </Link>
          <Link
            href="/services"
            className="btn-ghost-dark inline-block rounded-lg px-8 py-3.5 text-[16px] font-semibold text-center transition-all focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            See How It Works
          </Link>
        </div>
      </div>
    </section>
  )
}
