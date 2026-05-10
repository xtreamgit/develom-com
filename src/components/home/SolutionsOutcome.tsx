import Link from 'next/link'

const solutions = [
  {
    title: 'Automate & Optimize',
    description: 'Streamline operations and reduce manual work.',
    iconBg: 'bg-blue-50',
    iconColor: 'text-[#2563EB]',
    href: '/services',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    ),
  },
  {
    title: 'Analyze & Predict',
    description: 'Turn data into insights and predict future outcomes.',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    href: '/services',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
  },
  {
    title: 'Engage & Assist',
    description: 'Enhance customer and employee experiences.',
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-500',
    href: '/services',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: 'Protect & Detect',
    description: 'Strengthen security and reduce risk with AI.',
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
    href: '/services',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Innovate & Grow',
    description: 'Build new products and unlock revenue opportunities.',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    href: '/services',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
      </svg>
    ),
  },
]

export default function SolutionsOutcome() {
  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto max-w-content">
        <h2 className="text-h2 text-center text-gray-900">Explore Solutions by Outcome</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {solutions.map((sol) => (
            <div key={sol.title} className="flex flex-col rounded-xl border border-gray-100 p-5 hover:border-gray-200 hover:shadow-md transition-all">
              <div className={`mb-4 inline-flex w-11 h-11 items-center justify-center rounded-lg ${sol.iconBg} ${sol.iconColor}`}>
                {sol.icon}
              </div>
              <h3 className="text-[16px] font-semibold text-gray-900">{sol.title}</h3>
              <p className="mt-1.5 text-[13px] text-gray-500 leading-relaxed flex-1">{sol.description}</p>
              <Link
                href={sol.href}
                className="mt-4 flex items-center gap-1 text-[13px] font-semibold text-[#2563EB] hover:gap-2 transition-all"
              >
                View Solutions
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
