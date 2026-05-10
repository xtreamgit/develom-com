import Link from 'next/link'

const resources = [
  {
    title: 'Case Studies',
    description: 'Real results from real businesses.',
    href: '/portfolio',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    title: 'Whitepapers',
    description: 'In-depth guides and research.',
    href: '/blog',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </svg>
    ),
  },
  {
    title: 'Webinars',
    description: 'Learn from experts and innovators.',
    href: '/blog',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </svg>
    ),
  },
  {
    title: 'Blog',
    description: 'Insights, trends, and best practices.',
    href: '/blog',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    title: 'AI Toolkit',
    description: 'Templates and tools to accelerate your AI journey.',
    href: '/contact',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
]

export default function ResourcesSection() {
  return (
    <section className="bg-[#F8FAFC] px-6 py-16">
      <div className="mx-auto max-w-content">
        <h2 className="text-h2 text-center text-gray-900">Resources to Help You Succeed</h2>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {resources.map((res) => (
            <div
              key={res.title}
              className="flex flex-col rounded-xl border border-gray-100 bg-white p-5 hover:border-gray-200 hover:shadow-md transition-all"
            >
              <div className="mb-4 inline-flex w-11 h-11 items-center justify-center rounded-lg bg-[#2563EB]/10 text-[#2563EB]">
                {res.icon}
              </div>
              <h3 className="text-[15px] font-semibold text-gray-900">{res.title}</h3>
              <p className="mt-1.5 text-[12px] text-gray-500 leading-relaxed flex-1">{res.description}</p>
              <Link
                href={res.href}
                className="mt-4 flex items-center gap-1 text-[12px] font-semibold text-[#2563EB] hover:gap-2 transition-all"
              >
                Explore
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
