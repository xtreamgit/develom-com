import Link from 'next/link'

export default function FooterCTA() {
  return (
    <section
      className="relative overflow-hidden px-6 py-20"
      style={{
        background: 'linear-gradient(135deg, #0F2444 0%, #1e1b4b 60%, #312e81 100%)',
      }}
    >
      {/* Decorative glow */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-20"
        style={{
          background: 'radial-gradient(ellipse at 80% 50%, #6366f1 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-content">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          {/* Text + CTAs */}
          <div className="flex-1">
            <h2 className="text-h2 text-white">
              Ready to focus on strategy? We handle the operations.
            </h2>
            <p className="mt-4 text-[16px] text-white/70 max-w-[480px]">
              Develom manages your operational agents end-to-end. Discover how our approach keeps
              your workflows running while your team stays in control.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-block rounded-lg bg-[#2563EB] px-7 py-3.5 text-[16px] font-bold text-white text-center hover:brightness-90 transition-all focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                Start a conversation
              </Link>
              <Link
                href="/contact"
                className="inline-block rounded-lg border border-white/30 px-7 py-3.5 text-[16px] font-semibold text-white text-center hover:bg-white/10 hover:border-white/50 transition-all focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                Schedule a demo
              </Link>
            </div>
          </div>

          {/* Decorative cube */}
          <div className="hidden lg:flex lg:flex-shrink-0 lg:items-center lg:justify-center" aria-hidden="true">
            <div className="relative w-40 h-40">
              <div
                className="absolute inset-0 rounded-2xl opacity-30"
                style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }}
              />
              <div
                className="absolute inset-6 rounded-xl border border-white/20 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.3) 0%, rgba(79,70,229,0.15) 100%)' }}
              >
                <div
                  className="w-12 h-12 rounded-lg border border-white/20 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.4) 0%, rgba(99,102,241,0.2) 100%)' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" className="w-6 h-6">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
