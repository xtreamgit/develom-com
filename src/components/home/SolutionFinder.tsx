'use client'

import { useState } from 'react'
import Link from 'next/link'

const industries = [
  {
    label: 'Healthcare',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    label: 'Finance',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    label: 'Retail & eCommerce',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
  },
  {
    label: 'Manufacturing',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    label: 'Technology',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    label: 'Logistics',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 3v5h-7V8zM5.5 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm13 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
      </svg>
    ),
  },
  {
    label: 'Education',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    label: 'Government',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M3 22V8M21 22V8M12 22V8M12 3 2 8h20z" />
      </svg>
    ),
  },
]

const companySizes = [
  { label: 'Startups', sub: '1 – 10 Employees' },
  { label: 'Small Business', sub: '11 – 50 Employees' },
  { label: 'Mid-Market', sub: '51 – 500 Employees' },
  { label: 'Enterprise', sub: '500+ Employees' },
]

export default function SolutionFinder() {
  const [activeTab, setActiveTab] = useState<'industry' | 'size'>('industry')

  return (
    <section className="bg-[#F8FAFC] px-6 py-16">
      <div className="mx-auto max-w-content">
        <h2 className="text-h2 text-center text-gray-900">Find the Right Fit for Your Business</h2>

        {/* Tabs */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex rounded-lg border border-gray-200 bg-white p-1 gap-1">
            <button
              onClick={() => setActiveTab('industry')}
              className={`rounded-md px-4 py-1.5 text-[13px] font-semibold transition-colors ${
                activeTab === 'industry'
                  ? 'bg-[#2563EB] text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              By Industry
            </button>
            <button
              onClick={() => setActiveTab('size')}
              className={`rounded-md px-4 py-1.5 text-[13px] font-semibold transition-colors ${
                activeTab === 'size'
                  ? 'bg-[#2563EB] text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              By Company Size
            </button>
          </div>
          <Link
            href="/services"
            className="hidden sm:flex items-center gap-1 text-[13px] font-semibold text-[#2563EB] hover:gap-2 transition-all"
          >
            View all industries
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-3.5 h-3.5">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Main grid */}
          <div className="flex-1">
            {activeTab === 'industry' ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {industries.map(({ label, icon }) => (
                  <Link
                    key={label}
                    href="/contact"
                    className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-4 text-center hover:border-[#2563EB]/30 hover:shadow-md transition-all group"
                  >
                    <div className="text-gray-400 group-hover:text-[#2563EB] transition-colors">{icon}</div>
                    <span className="text-[13px] font-medium text-gray-700 group-hover:text-gray-900">{label}</span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {companySizes.map(({ label, sub }) => (
                  <Link
                    key={label}
                    href="/contact"
                    className="flex flex-col items-center gap-1 rounded-xl border border-gray-200 bg-white p-5 text-center hover:border-[#2563EB]/30 hover:shadow-md transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#2563EB]/10 flex items-center justify-center mb-1">
                      <div className="w-5 h-5 rounded bg-[#2563EB]/30" />
                    </div>
                    <span className="text-[14px] font-semibold text-gray-900">{label}</span>
                    <span className="text-[11px] text-gray-400">{sub}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* CTA card */}
          <div className="lg:w-56 flex-shrink-0">
            <div className="rounded-xl border border-[#2563EB]/20 bg-white p-5 text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#2563EB]/10">
                <svg viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" className="w-5 h-5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" />
                </svg>
              </div>
              <p className="text-[13px] font-semibold text-gray-800">Not sure where to start?</p>
              <p className="mt-1 text-[12px] text-gray-500">
                Answer a few questions and we&apos;ll match you with the best solution.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-block w-full rounded-lg bg-[#2563EB] px-4 py-2 text-[12px] font-bold text-white hover:brightness-90 transition-all"
              >
                Get My AI Recommendation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
