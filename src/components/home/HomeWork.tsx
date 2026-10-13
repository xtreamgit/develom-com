const toolRows = [
  {
    tool: "Here's a chatbot that can answer questions about your data.",
    develom:
      'Processes the invoice, routes it, flags exceptions, updates the ERP. The question was never asked.',
  },
  {
    tool: 'Generate a draft — your team can finish it.',
    develom:
      'Runs the process end to end: draft, review, approval routing, submission — with a human in the loop only where the rules require.',
  },
  {
    tool: 'Your team decides how to use it — outcomes depend on adoption.',
    develom:
      "Outcome is Develom's responsibility to deliver. We configure, run, and improve the agents.",
  },
]

export default function HomeWork() {
  return (
    <section className="bg-surface-light py-20 px-6">
      <div className="mx-auto max-w-content">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Copy */}
          <div className="lg:w-[380px] flex-shrink-0">
            <p className="text-label uppercase tracking-widest text-[#7A9AB5] mb-4">
              01 — The Work
            </p>
            <h2 className="text-h2 text-[#0D1B2A]">
              An AI agent doesn't just answer. It acts.
            </h2>
            <p className="mt-5 text-lg text-[#4A6585]">
              Most AI tools generate text in response to a prompt. An AI agent takes a task,
              makes decisions, uses tools, and completes work — the same way a person on your
              team would, but at scale, without interruption, and under documented controls.
            </p>
            <p className="mt-4 text-lg text-[#4A6585]">
              Develom's agents are configured for your specific workflows: the systems they're
              permitted to touch, the decisions they can make autonomously, and the approvals
              they must escalate.
            </p>
          </div>

          {/* Comparison panel */}
          <div className="flex-1 min-w-0 rounded-xl border border-[#BDD5EE] overflow-hidden">
            {/* Header row */}
            <div className="grid grid-cols-2 compare-header">
              <div className="px-5 py-3.5 border-r border-[#D0E6F5]">
                <span className="text-label uppercase tracking-widest text-[#7A9AB5]">
                  The tool model
                </span>
              </div>
              <div className="px-5 py-3.5 border-l-2 border-signal">
                <span className="text-label uppercase tracking-widest text-signal">
                  The Develom model
                </span>
              </div>
            </div>

            {/* Data rows */}
            <div className="divide-y divide-[#D0E6F5]">
              {toolRows.map((row, i) => (
                <div key={i} className="grid grid-cols-2">
                  <div className="px-5 py-5 border-r border-[#D0E6F5] text-[15px] text-[#7A9AB5] leading-relaxed">
                    {row.tool}
                  </div>
                  <div className="px-5 py-5 border-l-2 border-signal text-[15px] text-[#0D1B2A] leading-relaxed font-medium">
                    {row.develom}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
