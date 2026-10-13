const checkmark = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="mt-1 flex-shrink-0">
    <path d="M2 7l3.5 3.5L12 4" stroke="#18B8C7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const columns = [
  {
    title: 'Rules',
    bullets: [
      'Human approval required for privileged and system-level operations',
      "Per-agent authorization boundaries — agents do only what they're permitted to do",
      'Configurable escalation thresholds by business unit and risk level',
    ],
  },
  {
    title: 'Records',
    bullets: [
      'Audit-logged agent operations, backed up to cloud storage',
      'Decisions, inputs, and outputs — timestamped and attributable',
      'Full visibility into what each agent accessed, when, and why',
    ],
  },
  {
    title: 'Control',
    bullets: [
      'Agent credentials handled through an isolated proxy layer, never exposed to third-party integrations',
      'Documented and exercised incident-response procedures',
      'Data access scoped to task requirements, not agent convenience',
    ],
  },
]

export default function HomeGovernance() {
  return (
    <section className="bg-dark-raised py-20 px-6">
      <div className="mx-auto max-w-content">
        {/* Header */}
        <div className="max-w-text mb-12">
          <p className="text-label uppercase tracking-widest text-on-dark/[0.38] mb-4">
            03 — Governance
          </p>
          <h2 className="text-h2 text-on-dark">
            One control layer. For every agent we run.
          </h2>
          <p className="mt-5 text-lg text-on-dark/[0.65]">
            Every agent Develom deploys operates under a shared governance framework — the same
            rules, records, and controls, regardless of which part of your business it touches.
          </p>
        </div>

        {/* Three-column grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title} className="gov-col pt-6">
              <h3 className="text-[18px] font-semibold text-on-dark mb-5">{col.title}</h3>
              <ul className="space-y-4">
                {col.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-3">
                    {checkmark}
                    <span className="text-[15px] text-on-dark/[0.65] leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
