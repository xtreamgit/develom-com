import Link from 'next/link'

function AgentStatusMockup() {
  return (
    <div className="rounded-xl border border-gray-200 shadow-lg overflow-hidden w-full" style={{ fontSize: '0.65rem' }}>
      {/* Header */}
      <div className="bg-[#0F2444] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-[#2563EB] flex items-center justify-center">
            <div className="grid grid-cols-2 gap-0.5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-white rounded-[1px]" />
              ))}
            </div>
          </div>
          <span className="text-[10px] font-semibold text-white">Agent Operations</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[9px] text-white/60">Live</span>
        </div>
      </div>

      {/* Status items */}
      <div className="bg-white divide-y divide-gray-100">
        {/* Agent Activity */}
        <div className="px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 16 16" fill="none" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <circle cx="8" cy="8" r="6" />
                <path d="M8 5v3l2 1.5" />
              </svg>
            </div>
            <div>
              <div className="text-[8px] text-gray-400 uppercase tracking-wide font-medium">Agent Activity</div>
              <div className="text-[12px] font-semibold text-gray-900 mt-0.5">2 workflows active</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[9px] text-emerald-600 font-semibold">Running</span>
          </div>
        </div>

        {/* Task Completion */}
        <div className="px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 16 16" fill="none" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M2 8.5l3.5 3.5 8.5-8" />
              </svg>
            </div>
            <div>
              <div className="text-[8px] text-gray-400 uppercase tracking-wide font-medium">Tasks this month</div>
              <div className="text-[12px] font-semibold text-gray-900 mt-0.5">847 completed</div>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-emerald-600">+12%</span>
        </div>

        {/* System Health */}
        <div className="px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 16 16" fill="none" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M1 10l3-4 3 2.5 3-5 3 2.5 2-3.5" />
              </svg>
            </div>
            <div>
              <div className="text-[8px] text-gray-400 uppercase tracking-wide font-medium">System Health</div>
              <div className="text-[12px] font-semibold text-gray-900 mt-0.5">All systems operational</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[9px] text-emerald-600 font-semibold">Green</span>
          </div>
        </div>

        {/* Next Scheduled */}
        <div className="px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 16 16" fill="none" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <rect x="1.5" y="3" width="13" height="11" rx="1.5" />
                <path d="M1.5 6.5h13M5 1.5v3M11 1.5v3" />
              </svg>
            </div>
            <div>
              <div className="text-[8px] text-gray-400 uppercase tracking-wide font-medium">Next scheduled</div>
              <div className="text-[12px] font-semibold text-gray-900 mt-0.5">Next run: 2 hours</div>
            </div>
          </div>
          <span className="text-[9px] text-gray-400">Automated</span>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#0F2444] px-4 py-2.5 flex items-center justify-between">
        <span className="text-[9px] text-white/50">Develom Agent Console</span>
        <span className="text-[9px] text-white/30">Updated just now</span>
      </div>
    </div>
  )
}

export default function HeroSection() {
  return (
    <section className="bg-white pt-16 pb-20 px-6">
      <div className="mx-auto max-w-content">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Left: copy */}
          <div className="flex-1 lg:max-w-[460px]">
            <span className="inline-block rounded-full bg-[#2563EB]/10 px-3 py-1 text-label uppercase text-[#2563EB] tracking-widest">
              Enterprise-grade security
            </span>
            <h1 className="mt-5 text-hero text-gray-900">
              Operational AI agents,
              <br />
              <span className="text-[#2563EB]">managed for you.</span>
            </h1>
            <p className="mt-5 text-lg text-gray-500 max-w-narrow">
              Operational AI workflows running continuously — with your team setting the scope and
              reviewing what matters. Develom designs, deploys, monitors, and operates. You stay in
              control.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-block rounded-lg bg-[#2563EB] px-6 py-3.5 text-[16px] font-bold text-white text-center hover:brightness-90 transition-all focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              >
                See how it works
              </Link>
              <Link
                href="/contact"
                className="inline-block rounded-lg border border-gray-300 px-6 py-3.5 text-[16px] font-semibold text-gray-700 text-center hover:border-gray-400 hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Talk to an expert
              </Link>
            </div>
          </div>

          {/* Right: agent status mockup */}
          <div className="flex-1 lg:max-w-[520px]">
            <AgentStatusMockup />
          </div>
        </div>
      </div>
    </section>
  )
}
