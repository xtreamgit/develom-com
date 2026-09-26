import Link from 'next/link'

// PLACEHOLDER DATA — Vogel Alcove name/logo/metrics pending Robert consent + Jean-Luc copy clearance.
// Replace anonymized entry with real case study once both gates clear (Phase 2).
const outcomes = [
  {
    vertical: 'Nonprofit + Salesforce',
    problem:
      'Donor stewardship and lapse-detection workflows managed manually — requiring significant staff time each week with inconsistent outreach timing.',
    result:
      'Large non-profit organization in Dallas, Texas deployed automated stewardship agents. Donor lifecycle workflows now run on schedule without manual intervention. Staff reallocated to strategy and high-value relationship work.',
  },
  {
    vertical: 'Healthcare',
    problem: '[PLACEHOLDER — Healthcare case study pending AGENTS-102 completion and Jean-Luc clearance]',
    result: '[PLACEHOLDER]',
    isPlaceholder: true,
  },
  {
    vertical: 'Financial Services',
    problem: '[PLACEHOLDER — Financial services case study pending future engagement]',
    result: '[PLACEHOLDER]',
    isPlaceholder: true,
  },
]

export default function OutcomesSection() {
  const activeOutcomes = outcomes.filter((o) => !o.isPlaceholder)

  return (
    <section className="bg-[#0A0F1E] px-6 py-16">
      <div className="mx-auto max-w-content">
        <p className="text-label uppercase tracking-widest text-white/40">OUTCOMES DELIVERED</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-1 lg:grid-cols-1 max-w-[700px]">
          {activeOutcomes.map((o) => (
            <div key={o.vertical} className="flex flex-col rounded-lg bg-[#0F1628] px-6 py-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#2563EB]">
                {o.vertical}
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-white/50">{o.problem}</p>
              <div className="my-4 border-t border-white/10" />
              <p className="text-[15px] leading-relaxed text-white/85 flex-1">{o.result}</p>
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
