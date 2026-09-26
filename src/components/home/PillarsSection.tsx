const pillars = [
  {
    number: '01',
    label: 'The Operating Model',
    title: 'Full operational layer, not a platform',
    body: "We don't sell you a tool to operate. We design, deploy, monitor, tune, and continuously operate your agents. Think of us as the managed-service provider for your operational workflows — your team sets the scope and priorities, we handle the execution and keep everything running.",
  },
  {
    number: '02',
    label: 'Vertical Depth',
    title: 'Domain expertise built in',
    body: "We specialize, not generalize. We start with nonprofit + Salesforce workflows, and we're building depth in healthcare and financial services. Each vertical comes with industry-specific templates, compliance patterns, and the operational know-how that comes from running real workflows in regulated environments.",
  },
  {
    number: '03',
    label: 'Compliance-Ready by Default',
    title: 'Security you can lean on',
    // PLACEHOLDER — pending Hector SOC 2 status + Jean-Luc approval for HIPAA language
    body: "Built from the ground up for regulated organizations. We handle the compliance complexity so you don't have to manage it separately from the operational layer.",
  },
]

export default function PillarsSection() {
  return (
    <section className="bg-[#0F2444] px-6 py-20">
      <div className="mx-auto max-w-content">
        <p className="text-label uppercase tracking-widest text-white/40">WHY DEVELOM</p>
        <h2 className="mt-4 text-h2 text-white max-w-[560px]">
          Three things that set us apart from every platform on the market.
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="flex flex-col rounded-xl border border-white/10 bg-white/5 px-7 py-8"
            >
              <span className="text-[11px] font-bold text-[#2563EB] tracking-widest uppercase">
                {pillar.number} &mdash; {pillar.label}
              </span>
              <h3 className="mt-4 text-[20px] font-semibold text-white leading-snug">
                {pillar.title}
              </h3>
              <p className="mt-4 text-[14px] leading-relaxed text-white/70">{pillar.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
