const cards = [
  {
    title: 'Parallel execution',
    body: 'Multiple agents work simultaneously on different parts of the same process. No waiting for one step to finish before the next can begin.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="1" y="8" width="5" height="4" rx="1.5" fill="#18B8C7"/>
        <rect x="7.5" y="4" width="5" height="4" rx="1.5" fill="#18B8C7"/>
        <rect x="7.5" y="12" width="5" height="4" rx="1.5" fill="#18B8C7"/>
        <rect x="14" y="8" width="5" height="4" rx="1.5" fill="#18B8C7"/>
        <line x1="6" y1="10" x2="7.5" y2="6" stroke="#18B8C7" strokeWidth="1.2"/>
        <line x1="6" y1="10" x2="7.5" y2="14" stroke="#18B8C7" strokeWidth="1.2"/>
        <line x1="12.5" y1="6" x2="14" y2="10" stroke="#18B8C7" strokeWidth="1.2"/>
        <line x1="12.5" y1="14" x2="14" y2="10" stroke="#18B8C7" strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    title: 'Structured handoffs',
    body: 'When one agent finishes, the next picks up with full context — no re-briefing, no dropped state, no manual coordination required.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 10h14M13 6l4 4-4 4" stroke="#18B8C7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Escalation by design',
    body: "Agents know exactly what they're authorized to do and what to escalate. Human approvals happen at the right moments — by rule, not by accident.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="7" r="3" stroke="#18B8C7" strokeWidth="1.5"/>
        <path d="M5 17c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="#18B8C7" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 9l2-2M16 9l-2-2" stroke="#0F80E3" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export default function HomeOrchestration() {
  return (
    <section className="bg-dark-base py-20 px-6">
      <div className="mx-auto max-w-content">
        {/* Header */}
        <div className="max-w-text mb-12">
          <p className="text-label uppercase tracking-widest text-on-dark/[0.38] mb-4">
            02 — Orchestration
          </p>
          <h2 className="text-h2 text-on-dark">
            One job. A coordinated workforce of agents to do it.
          </h2>
          <p className="mt-5 text-lg text-on-dark/[0.65]">
            Real business processes aren't single steps. They're sequences of decisions, handoffs,
            checks, and escalations that span teams, systems, and timelines. Develom doesn't give
            you an agent — we deploy and run a workforce of agents, managed as a single coordinated
            operation.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="orch-card rounded-xl border border-white/[0.07] bg-dark-raised p-7 transition-shadow"
            >
              <div className="orch-icon w-10 h-10 rounded-[10px] flex items-center justify-center mb-4">
                {card.icon}
              </div>
              <h3 className="text-[20px] font-semibold text-on-dark mb-3">{card.title}</h3>
              <p className="text-[15px] text-on-dark/[0.65] leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
