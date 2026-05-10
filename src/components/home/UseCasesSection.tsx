import Link from 'next/link'

const useCases = [
  {
    title: 'Intelligent Document Processing',
    description: 'Extract data, reduce errors, and speed up workflows.',
    impact: 'Save 60%+ time',
    impactColor: 'text-[#2563EB]',
    href: '/services',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </svg>
    ),
    iconBg: 'bg-blue-50',
    iconColor: 'text-[#2563EB]',
  },
  {
    title: 'AI Chatbots & Virtual Assistants',
    description: 'Deliver 24/7 support and improve customer satisfaction.',
    impact: 'Increase CSAT by 35%',
    impactColor: 'text-emerald-600',
    href: '/services',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 10h8M8 14h5" />
      </svg>
    ),
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    title: 'Predictive Analytics & Forecasting',
    description: 'Make smarter, data-driven decisions with confidence.',
    impact: 'Improve accuracy by 25%',
    impactColor: 'text-emerald-600',
    href: '/services',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
        <circle cx="19" cy="9" r="2" fill="currentColor" fillOpacity="0.2" />
      </svg>
    ),
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    title: 'Process Automation (RPA + AI)',
    description: 'Automate repetitive tasks and boost operational efficiency.',
    impact: 'Reduce cost by 30%',
    impactColor: 'text-[#2563EB]',
    href: '/services',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <circle cx="12" cy="16" r="1.5" />
      </svg>
    ),
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-500',
  },
  {
    title: 'Fraud Detection & Risk Management',
    description: 'Detect anomalies and protect your business.',
    impact: 'Reduce fraud by 40%',
    impactColor: 'text-red-500',
    href: '/services',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
  },
]

export default function UseCasesSection() {
  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto max-w-content">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="text-h2 text-gray-900">Popular Use Cases</h2>
          <Link
            href="/services"
            className="hidden sm:flex items-center gap-1 text-[13px] font-semibold text-[#2563EB] hover:gap-2 transition-all"
          >
            View all use cases
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-3.5 h-3.5">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {useCases.map((uc) => (
            <div
              key={uc.title}
              className="flex flex-col rounded-xl border border-gray-100 p-5 hover:border-gray-200 hover:shadow-md transition-all"
            >
              <div className={`mb-4 inline-flex w-11 h-11 items-center justify-center rounded-lg ${uc.iconBg} ${uc.iconColor}`}>
                {uc.icon}
              </div>
              <h3 className="text-[14px] font-semibold text-gray-900 leading-snug">{uc.title}</h3>
              <p className="mt-1.5 text-[12px] text-gray-500 leading-relaxed flex-1">{uc.description}</p>
              <div className="mt-3">
                <span className="text-[11px] text-gray-400">Impact: </span>
                <span className={`text-[11px] font-semibold ${uc.impactColor}`}>{uc.impact}</span>
              </div>
              <Link
                href={uc.href}
                className="mt-3 flex items-center gap-1 text-[12px] font-semibold text-[#2563EB] hover:gap-2 transition-all"
              >
                View Use Case
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-3 h-3">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
