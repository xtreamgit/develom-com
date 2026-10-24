const comparisonRows = [
  {
    tool: 'Hands you software. Your team figures out deployment.',
    develom: 'Runs the deployment. Manages the agents. Owns the process.',
  },
  {
    tool: 'Outcome depends on how well your team uses the tool.',
    develom: "Outcome is Develom's responsibility to deliver.",
  },
  {
    tool: 'Issues are your problem to diagnose and escalate.',
    develom: 'Issues are escalated to Develom — we investigate and fix.',
  },
  {
    tool: 'Accountability: unclear.',
    develom: 'Accountability: in the contract.',
  },
]

export default function HomeAccountability() {
  return (
    <section className="bg-ground py-20 px-6">
      <div className="mx-auto max-w-content">
        {/* Pull-quote */}
        <blockquote className="border-l-4 border-signal pl-6 mb-14">
          <p className="text-[22px] font-semibold text-[#0D1B2A] leading-snug max-w-text">
            Others hand you the AI. We run the whole job — and we answer for the results.
          </p>
        </blockquote>

        {/* Header */}
        <div className="max-w-text mb-12">
          <p className="text-label uppercase tracking-widest text-[#7A9AB5] mb-4">
            04 — Accountability
          </p>
          <h2 className="text-h2 text-[#0D1B2A]">
            We don't hand you the wheel and walk away.
          </h2>
          <p className="mt-5 text-lg text-[#4A6585]">
            Develom is the named party accountable for the outcome of every engagement. When
            something needs to be investigated, improved, or escalated, there is a person and a
            process on the Develom side — not a support ticket into the void. That accountability
            is in the contract, not just the pitch.
          </p>
        </div>

        {/* Comparison table */}
        <div className="rounded-xl overflow-hidden border border-[#BDD5EE]">
          {/* Table header */}
          <div className="grid grid-cols-2 ct-header">
            <div className="px-6 py-4 border-r border-[#D0E6F5]">
              <span className="text-label uppercase tracking-widest text-[#7A9AB5]">
                The tool-vendor model
              </span>
            </div>
            <div className="px-6 py-4 border-l-4 border-signal">
              <span className="text-label uppercase tracking-widest text-signal">
                The Develom model
              </span>
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-[#D0E6F5]">
            {comparisonRows.map((row, i) => (
              <div key={i} className="grid grid-cols-2">
                <div className="px-6 py-5 border-r border-[#D0E6F5] text-[15px] text-[#7A9AB5] leading-relaxed">
                  {row.tool}
                </div>
                <div className="px-6 py-5 border-l-4 border-signal text-[15px] text-[#0D1B2A] leading-relaxed font-medium">
                  {row.develom}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
