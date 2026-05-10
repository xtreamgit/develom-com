import Link from 'next/link'

const trustBadges = [
  'Free AI Assessment',
  'Personalized Recommendations',
  'No Credit Card Required',
  'Cancel Anytime',
]

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
              Ready to Transform Your Business with AI?
            </h2>
            <p className="mt-4 text-[16px] text-white/70 max-w-[480px]">
              Let&apos;s find the right solution to drive your next breakthrough.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-block rounded-lg bg-[#2563EB] px-7 py-3.5 text-[16px] font-bold text-white text-center hover:brightness-90 transition-all focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                Get Started for Free
              </Link>
              <Link
                href="/contact"
                className="inline-block rounded-lg border border-white/30 px-7 py-3.5 text-[16px] font-semibold text-white text-center hover:bg-white/10 hover:border-white/50 transition-all focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                Talk to an Expert
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {trustBadges.map((badge) => (
                <span key={badge} className="flex items-center gap-1.5 text-[12px] text-white/60">
                  <svg
                    className="w-3.5 h-3.5 text-white/40 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Decorative cube */}
          <div className="hidden lg:flex lg:flex-shrink-0 lg:items-center lg:justify-center" aria-hidden="true">
            <div className="relative w-40 h-40">
              {/* Outer glow ring */}
              <div
                className="absolute inset-0 rounded-2xl opacity-30"
                style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }}
              />
              {/* Cube face - front */}
              <div
                className="absolute inset-6 rounded-xl border border-white/20 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.3) 0%, rgba(79,70,229,0.15) 100%)' }}
              >
                <div className="w-12 h-12 rounded-lg border border-white/20 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.4) 0%, rgba(99,102,241,0.2) 100%)' }}>
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
