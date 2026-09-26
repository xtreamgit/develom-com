'use client'

import Link from 'next/link'

const verticals = [
  {
    label: 'Nonprofit + Salesforce',
    status: 'Available now',
    statusColor: 'text-emerald-600',
    statusDot: 'bg-emerald-400',
    description:
      'Donor lifecycle automation, campaign operations, and stewardship workflows built on Salesforce — running continuously, managed by Develom.',
    cta: 'Learn how we operate nonprofit workflows',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: 'Healthcare',
    status: 'In development — built for HIPAA-governed environments',
    statusColor: 'text-blue-500',
    statusDot: 'bg-blue-400',
    description:
      'Operational workflows for health systems and specialty practices, designed for HIPAA-governed environments from the ground up.',
    cta: 'Learn how we operate healthcare workflows',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    label: 'Financial Services',
    status: 'Planned — designed for regulated environments',
    statusColor: 'text-gray-400',
    statusDot: 'bg-gray-300',
    description:
      'Agents for RIAs, wealth managers, and professional services firms — built for fiduciary and compliance-sensitive workflows.',
    cta: 'Learn how we operate financial workflows',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
]

export default function SolutionFinder() {
  return (
    <section className="bg-[#F8FAFC] px-6 py-16">
      <div className="mx-auto max-w-content">
        <p className="text-label uppercase tracking-widest text-[#2563EB]">WHERE WE OPERATE</p>
        <h2 className="mt-3 text-h2 text-gray-900">Built for specialized verticals.</h2>
        <p className="mt-4 text-[16px] text-gray-500 max-w-[560px]">
          We go deep in regulated industries where generic AI platforms leave organizations to
          figure out compliance and operations on their own.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {verticals.map((v) => (
            <div
              key={v.label}
              className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 hover:border-gray-300 hover:shadow-md transition-all"
            >
              <div className="mb-4 inline-flex w-11 h-11 items-center justify-center rounded-lg bg-[#2563EB]/10 text-[#2563EB]">
                {v.icon}
              </div>
              <h3 className="text-[17px] font-semibold text-gray-900">{v.label}</h3>
              <div className="mt-1.5 flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${v.statusDot}`} />
                <span className={`text-[11px] font-medium ${v.statusColor}`}>{v.status}</span>
              </div>
              <p className="mt-3 text-[13px] text-gray-500 leading-relaxed flex-1">
                {v.description}
              </p>
              <Link
                href="/contact"
                className="mt-5 flex items-center gap-1 text-[13px] font-semibold text-[#2563EB] hover:gap-2 transition-all"
              >
                {v.cta}
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
