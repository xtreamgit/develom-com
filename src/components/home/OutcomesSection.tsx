import Link from 'next/link'

// All entries are generic placeholders.
// Jean-Luc gate + PSA confidentiality check + Vogel/Robert confirmation required
// before publishing client-reported framing, real metrics, or geographic identifiers.
const outcomes = [
  {
    label: 'Nonprofit + Salesforce',
    statement:
      'A large nonprofit organization streamlined donor research and outreach workflows, reducing manual coordination across their development team.',
  },
  {
    label: 'Compliance Operations',
    statement:
      'Automated compliance monitoring integrated into ongoing operations, enabling faster response to regulatory requirements without adding headcount.',
  },
  {
    label: 'Campaign Management',
    statement:
      'Campaign sequencing and lead scoring running continuously in the background, freeing team time for strategy and relationship-building.',
  },
]

export default function OutcomesSection() {
  return (
    <section className="bg-[#0A0F1E] px-6 py-16">
      <div className="mx-auto max-w-content">
        <p className="text-label uppercase tracking-widest text-white/40">OUTCOMES DELIVERED</p>

        <div className="mt-6 grid gap-4 max-w-[700px]">
          {outcomes.map((o) => (
            <div key={o.label} className="flex flex-col rounded-lg bg-[#0F1628] px-6 py-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#2563EB]">
                {o.label}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-white/80">{o.statement}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link href="/portfolio" className="text-[15px] font-semibold text-[#2563EB] hover:underline">
            See our work &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
