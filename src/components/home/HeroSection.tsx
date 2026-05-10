import Link from 'next/link'

function DashboardMockup() {
  return (
    <div className="rounded-xl border border-gray-200 shadow-lg overflow-hidden flex w-full" style={{ fontSize: '0.65rem' }}>
      {/* Left sidebar */}
      <div className="bg-[#0F2444] w-9 flex-shrink-0 flex flex-col items-center py-3 gap-2.5">
        <div className="w-5 h-5 rounded bg-[#2563EB] flex items-center justify-center">
          <div className="grid grid-cols-2 gap-0.5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-white rounded-[1px]" />
            ))}
          </div>
        </div>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`w-5 h-5 rounded flex items-center justify-center ${i === 0 ? 'bg-[#2563EB]/25' : ''}`}
          >
            <div className={`rounded-[2px] ${i === 0 ? 'w-2.5 h-2.5 bg-[#2563EB]' : 'w-2 h-2 bg-white/25'}`} />
          </div>
        ))}
      </div>

      {/* Main dashboard */}
      <div className="flex-1 bg-white p-2.5 min-w-0 space-y-2">
        {/* Header */}
        <div className="text-[9px] font-semibold text-gray-700">AI Performance Overview</div>

        {/* KPI cards */}
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { label: 'Revenue Impact', value: '$2.45M', change: '+32% vs last quarter', up: true },
            { label: 'Cost Savings', value: '$620K', change: '+90% vs last quarter', up: true },
            { label: 'Efficiency Gain', value: '34%', change: '+12% vs last quarter', up: true },
            { label: 'Automations', value: '128', change: '+78 new this month', up: true },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-gray-50 rounded p-1.5">
              <div className="text-[7px] text-gray-400 leading-tight">{kpi.label}</div>
              <div className="text-[12px] font-bold text-gray-900 mt-0.5">{kpi.value}</div>
              <div className="text-[7px] font-medium text-emerald-600 mt-0.5">{kpi.change}</div>
              <svg viewBox="0 0 40 10" className="w-full mt-1" style={{ height: 8 }}>
                <polyline
                  points="0,8 8,6 16,5 24,3 32,2 40,1"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-3 gap-1.5">
          {/* Line chart */}
          <div className="bg-gray-50 rounded p-1.5">
            <div className="text-[7px] text-gray-400 mb-1">Performance Trend</div>
            <svg viewBox="0 0 80 30" className="w-full" style={{ height: 28 }}>
              <defs>
                <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,26 L13,20 L26,16 L39,12 L52,8 L65,5 L80,3"
                fill="none"
                stroke="#2563EB"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M0,26 L13,20 L26,16 L39,12 L52,8 L65,5 L80,3 L80,30 L0,30 Z"
                fill="url(#perfGrad)"
              />
              <path
                d="M0,24 L13,22 L26,20 L39,17 L52,14 L65,12 L80,10"
                fill="none"
                stroke="#10B981"
                strokeWidth="1"
                strokeLinecap="round"
                strokeDasharray="2,1"
              />
            </svg>
            <div className="flex gap-2 mt-0.5">
              <span className="flex items-center gap-0.5 text-[6px] text-gray-400">
                <span className="inline-block w-3 h-px bg-[#2563EB]" /> Revenue
              </span>
              <span className="flex items-center gap-0.5 text-[6px] text-gray-400">
                <span className="inline-block w-3 h-px bg-emerald-500" /> Efficiency
              </span>
            </div>
          </div>

          {/* Donut chart */}
          <div className="bg-gray-50 rounded p-1.5">
            <div className="text-[7px] text-gray-400 mb-1">Impact by Department</div>
            <div className="flex items-center gap-1.5">
              <div className="relative w-9 h-9 flex-shrink-0">
                <svg viewBox="0 0 36 36" className="w-9 h-9 -rotate-90">
                  {[
                    { pct: 32, color: '#1D4ED8', offset: 0 },
                    { pct: 24, color: '#3B82F6', offset: 32 },
                    { pct: 20, color: '#60A5FA', offset: 56 },
                    { pct: 12, color: '#93C5FD', offset: 76 },
                    { pct: 12, color: '#BFDBFE', offset: 88 },
                  ].map(({ pct, color, offset }) => (
                    <circle
                      key={offset}
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke={color}
                      strokeWidth="5"
                      strokeDasharray={`${pct * 0.88} 88`}
                      strokeDashoffset={`${-offset * 0.88}`}
                    />
                  ))}
                </svg>
              </div>
              <div className="space-y-0.5">
                {[['Operations', '32%'], ['Finance', '24%'], ['Sales', '20%'], ['Marketing', '12%']].map(
                  ([d, p]) => (
                    <div key={d} className="text-[6px] text-gray-500">
                      {d} <span className="font-semibold">{p}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Active automations */}
          <div className="bg-gray-50 rounded p-1.5">
            <div className="text-[7px] text-gray-400 mb-0.5">Active Automations</div>
            <div className="text-[18px] font-bold text-gray-900 leading-none">24</div>
            <div className="text-[6px] text-gray-400 mb-1">Running Workflows</div>
            <div className="flex items-end gap-0.5" style={{ height: 16 }}>
              {[40, 55, 50, 70, 65, 85, 75].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-[1px]"
                  style={{ height: `${h}%`, background: i === 5 ? '#2563EB' : '#DBEAFE' }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Use case impact table */}
        <div className="bg-gray-50 rounded p-1.5">
          <div className="text-[7px] text-gray-400 mb-1">Top Use Case Impact</div>
          <div className="space-y-0.5">
            {[
              { name: 'Intelligent Document Processing', val: '$830K', change: '+17%' },
              { name: 'Process Automation (RPA + AI)', val: '$510K', change: '+18%' },
              { name: 'Predictive Analytics', val: '$430K', change: '+22%' },
            ].map((row) => (
              <div
                key={row.name}
                className="flex items-center gap-1 py-0.5 border-b border-gray-100 last:border-0"
              >
                <div className="w-1.5 h-1.5 rounded-[2px] bg-[#2563EB] flex-shrink-0" />
                <span className="text-[7px] text-gray-600 flex-1 truncate">{row.name}</span>
                <span className="text-[7px] font-semibold text-gray-800 flex-shrink-0">{row.val}</span>
                <span className="text-[7px] font-semibold text-emerald-600 flex-shrink-0 ml-1">
                  {row.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Assistant */}
        <div className="bg-[#0F2444] rounded p-2 flex items-start gap-2">
          <div className="w-6 h-6 rounded-full bg-[#2563EB]/30 flex items-center justify-center flex-shrink-0">
            <div className="w-3 h-3 rounded-full bg-[#2563EB]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[8px] text-white font-medium mb-0.5">
              How can I help you optimize today?
            </div>
            <div className="flex items-center gap-1 bg-white/10 rounded px-1.5 py-0.5 mt-1">
              <span className="text-[7px] text-white/30 flex-1">Ask anything...</span>
              <div className="w-3.5 h-3.5 rounded bg-[#2563EB] flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 8 8" className="w-2 h-2" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round">
                  <path d="M1 4h5M4.5 1.5L7 4l-2.5 2.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
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
              AI Solutions That Deliver Results
            </span>
            <h1 className="mt-5 text-hero text-gray-900">
              Intelligent Solutions.
              <br />
              <span className="text-[#2563EB]">Measurable Impact.</span>
            </h1>
            <p className="mt-5 text-lg text-gray-500 max-w-narrow">
              We help businesses of all sizes automate, optimize, and accelerate with AI solutions
              built for real-world results.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-block rounded-lg bg-[#2563EB] px-6 py-3.5 text-[16px] font-bold text-white text-center hover:brightness-90 transition-all focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              >
                Find My AI Solution
              </Link>
              <Link
                href="/services"
                className="inline-block rounded-lg border border-gray-300 px-6 py-3.5 text-[16px] font-semibold text-gray-700 text-center hover:border-gray-400 hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Explore Use Cases
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-5">
              {['No Commitment', 'Expert Guidance', 'Proven Results'].map((badge) => (
                <span key={badge} className="flex items-center gap-1.5 text-[13px] text-gray-500">
                  <svg
                    className="w-4 h-4 text-[#2563EB] flex-shrink-0"
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

          {/* Right: Dashboard mockup */}
          <div className="flex-1 lg:max-w-[520px]">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  )
}
