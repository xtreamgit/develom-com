import Link from 'next/link'

const stats = [
  { value: '1,250+', label: 'Active Members' },
  { value: '$75K+', label: 'Rewards Earned' },
  { value: '3,400+', label: 'Businesses Helped' },
  { value: '98%', label: 'Satisfaction Rate' },
]

export default function ReferralBanner() {
  return (
    <section className="bg-[#EEF2FF] px-6 py-12">
      <div className="mx-auto max-w-content">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
          {/* Left: text */}
          <div className="flex items-start gap-5">
            <div className="flex-shrink-0 mt-1">
              <div className="relative w-14 h-14">
                {/* Referral network icon */}
                <div className="absolute inset-0 rounded-full bg-[#2563EB]/10 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.6" strokeLinecap="round" className="w-7 h-7">
                    <circle cx="12" cy="5" r="2" />
                    <circle cx="5" cy="19" r="2" />
                    <circle cx="19" cy="19" r="2" />
                    <path d="M12 7v4M8.5 17.5 12 11M15.5 17.5 12 11" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-h3 text-gray-900">
                Powered by Referrals.
                <br />
                Built on Trust.
              </h3>
              <p className="mt-2 text-[14px] text-gray-600 max-w-[320px]">
                Join a community of forward-thinking businesses transforming with AI.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#2563EB] hover:gap-2.5 transition-all"
              >
                Join Our Referral Program
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-3.5 h-3.5">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right: stats */}
          <div className="flex flex-wrap gap-6 lg:flex-1 lg:justify-end">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-[28px] font-bold text-[#2563EB] leading-none">{stat.value}</div>
                <div className="mt-1 text-[12px] text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
