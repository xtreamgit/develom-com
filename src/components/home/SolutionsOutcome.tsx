import Link from 'next/link'

const verticals = [
  {
    title: 'Nonprofit + Salesforce',
    description: 'Automate donor lifecycle workflows — from prospect identification through stewardship and retention — without adding staff.',
    outcomes: ['Donor lapse detection', 'Stewardship scheduling', 'Campaign operations'],
    iconBg: 'bg-blue-50',
    iconColor: 'text-[#2563EB]',
    href: '/contact',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Healthcare',
    description: 'Operational workflows built for HIPAA-governed environments, enabling compliance-ready automation at scale.',
    outcomes: ['HIPAA-aware workflows', 'Administrative automation', 'Compliance monitoring'],
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    href: '/contact',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    title: 'Financial Services',
    description: 'Regulatory-compliant operational agents for wealth advisors, accounting firms, and financial institutions managing complex client workflows.',
    outcomes: ['Fiduciary-aware design', 'Regulatory workflow automation', 'Operational continuity'],
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    href: '/contact',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
]

export default function SolutionsOutcome() {
  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto max-w-content">
        <p className="text-label uppercase tracking-widest text-[#2563EB]">WHAT WE OPERATE</p>
        <h2 className="mt-3 text-h2 text-gray-900">Specialized verticals. Deep operational expertise.</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {verticals.map((v) => (
            <div key={v.title} className="flex flex-col rounded-xl border border-gray-100 p-6 hover:border-gray-200 hover:shadow-md transition-all">
              <div className={`mb-4 inline-flex w-11 h-11 items-center justify-center rounded-lg ${v.iconBg} ${v.iconColor}`}>
                {v.icon}
              </div>
              <h3 className="text-[17px] font-semibold text-gray-900">{v.title}</h3>
              <p className="mt-2 text-[13px] text-gray-500 leading-relaxed flex-1">{v.description}</p>
              <ul className="mt-4 space-y-1.5">
                {v.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-center gap-2 text-[12px] text-gray-500">
                    <svg className="w-3.5 h-3.5 text-[#2563EB] flex-shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M2 8.5l3.5 3.5 8.5-8" />
                    </svg>
                    {outcome}
                  </li>
                ))}
              </ul>
              <Link
                href={v.href}
                className="mt-5 flex items-center gap-1 text-[13px] font-semibold text-[#2563EB] hover:gap-2 transition-all"
              >
                Learn more
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-3.5 h-3.5">
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
