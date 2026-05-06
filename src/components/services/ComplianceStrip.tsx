import Link from 'next/link'
import { ShieldCheckIcon } from '@heroicons/react/24/outline'

const industries = [
  { name: 'Healthcare', hipaa: true, amlKyc: false, gdpr: true, fda: true, ccpa: true },
  { name: 'Financial Services', hipaa: false, amlKyc: true, gdpr: true, fda: false, ccpa: true },
  { name: 'Insurance', hipaa: true, amlKyc: true, gdpr: true, fda: false, ccpa: true },
  { name: 'Legal', hipaa: false, amlKyc: false, gdpr: true, fda: false, ccpa: true },
  { name: 'Government', hipaa: true, amlKyc: true, gdpr: false, fda: true, ccpa: false },
]

const frameworks = ['HIPAA', 'AML/KYC', 'GDPR', 'FDA', 'CCPA']

export default function ComplianceStrip() {
  return (
    <section className="bg-navy px-6 py-24 md:py-32">
      <div className="mx-auto max-w-content">
        {/* Header */}
        <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-blue">
          Compliance Coverage
        </p>
        <h2
          className="text-white"
          style={{ fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 2rem)', fontWeight: 700, lineHeight: 1.3 }}
        >
          Built for Regulated Industries.
        </h2>
        <p className="mt-4 max-w-[540px] text-[16px] leading-[1.7] text-white/70">
          Every system Develom ships is designed to operate inside a compliance framework. This is
          not a consulting service — it is how we architect.
        </p>

        {/* Table */}
        <div className="mt-12 overflow-x-auto rounded-lg">
          <table className="w-full min-w-[640px]" style={{ fontVariantNumeric: 'tabular-nums' }}>
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-5 py-4 text-left text-[13px] font-semibold uppercase tracking-[0.08em] text-white/50">
                  Industry
                </th>
                {frameworks.map((f) => (
                  <th
                    key={f}
                    className="px-4 py-4 text-center text-[13px] font-semibold uppercase tracking-[0.08em] text-white/50"
                  >
                    {f}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {industries.map((row, i) => {
                const checks = [row.hipaa, row.amlKyc, row.gdpr, row.fda, row.ccpa]
                return (
                  <tr
                    key={row.name}
                    className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-white/[0.03]' : ''}`}
                  >
                    <td className="px-5 py-4 text-[14px] font-medium text-white/90">{row.name}</td>
                    {checks.map((checked, j) => (
                      <td key={j} className="px-4 py-4 text-center">
                        {checked ? (
                          <ShieldCheckIcon className="mx-auto h-[18px] w-[18px] text-blue" />
                        ) : (
                          <span className="text-white/15">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Footer note */}
        <p className="mt-6 text-[14px] text-white/50">
          Don&apos;t see your framework? We&apos;ve built for PCI-DSS and FERPA as well.{' '}
          <Link
            href="/contact"
            className="rounded font-semibold text-blue transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Book a call →
          </Link>
        </p>
      </div>
    </section>
  )
}
