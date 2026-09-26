import Link from 'next/link'

const workflows = [
  {
    title: 'Donor Lifecycle Automation',
    description:
      'Continuous identification, engagement scoring, and outreach sequencing — without manual intervention. Your team reviews strategy; we handle the workflow.',
    iconBg: 'bg-blue-50',
    iconColor: 'text-[#2563EB]',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Compliance Monitoring & Alerting',
    description:
      'Real-time workflow auditing and regulatory alerting — built into your operations. We catch issues before they surface; your team stays informed.',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Campaign Operations on Schedule',
    description:
      'Multi-stage fundraising campaigns running on their own timeline. Deploy once, let it run; your team focuses on strategy and donor relationships.',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
  },
]

export default function UseCasesSection() {
  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto max-w-content">
        <div className="flex items-baseline justify-between mb-10">
          <div>
            <p className="text-label uppercase tracking-widest text-[#2563EB]">WHAT WE RUN</p>
            <h2 className="mt-2 text-h2 text-gray-900">Managed workflows, by outcome</h2>
          </div>
          <Link
            href="/contact"
            className="hidden sm:flex items-center gap-1 text-[13px] font-semibold text-[#2563EB] hover:gap-2 transition-all"
          >
            Talk to an expert
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-3.5 h-3.5">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {workflows.map((wf) => (
            <div
              key={wf.title}
              className="flex flex-col rounded-xl border border-gray-100 p-5 hover:border-gray-200 hover:shadow-md transition-all"
            >
              <div className={`inline-flex w-10 h-10 flex-shrink-0 items-center justify-center rounded-lg ${wf.iconBg} ${wf.iconColor} mb-4`}>
                {wf.icon}
              </div>
              <h3 className="text-[15px] font-semibold text-gray-900 leading-snug">{wf.title}</h3>
              <p className="mt-3 text-[13px] text-gray-500 leading-relaxed">{wf.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
