import Link from 'next/link'
import { ShieldCheckIcon } from '@heroicons/react/24/solid'

const industries = [
  { name: 'Healthcare', hipaa: true, amlKyc: false, gdpr: true, fda: true, ccpa: true, soc2: true },
  { name: 'Financial Services', hipaa: false, amlKyc: true, gdpr: true, fda: false, ccpa: true, soc2: true },
  { name: 'Insurance', hipaa: true, amlKyc: true, gdpr: true, fda: false, ccpa: true, soc2: true },
  { name: 'Legal', hipaa: false, amlKyc: false, gdpr: true, fda: false, ccpa: true, soc2: true },
  { name: 'Government', hipaa: true, amlKyc: true, gdpr: false, fda: true, ccpa: false, soc2: true },
]

const frameworks = ['HIPAA', 'AML/KYC', 'GDPR', 'FDA', 'CCPA', 'SOC 2']

export default function ComplianceStrip() {
  return (
    <section className="bg-bg-alt px-6 py-16">
      <div className="mx-auto max-w-content">
        {/* Header */}
        <p className="mb-3 text-label uppercase text-blue">COMPLIANCE COVERAGE</p>
        <h2 className="text-[32px] font-bold text-navy">Built for Regulated Industries.</h2>
        <p className="mt-3 max-w-[560px] text-[16px] leading-relaxed text-muted">
          Every system Develom ships is designed to operate inside a compliance framework. This is
          not a consulting service — it is how we architect.
        </p>

        {/* Table */}
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] overflow-hidden rounded-xl shadow-sm">
            <thead>
              <tr className="bg-navy">
                <th className="px-5 py-4 text-left text-[13px] font-semibold text-white">
                  Industry
                </th>
                {frameworks.map((f) => (
                  <th
                    key={f}
                    className="px-4 py-4 text-center text-[13px] font-semibold text-white"
                  >
                    {f}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {industries.map((row, i) => {
                const checks = [
                  row.hipaa,
                  row.amlKyc,
                  row.gdpr,
                  row.fda,
                  row.ccpa,
                  row.soc2,
                ]
                return (
                  <tr key={row.name} className={i % 2 === 0 ? 'bg-white' : 'bg-bg-alt'}>
                    <td className="px-5 py-4 text-[14px] font-medium text-navy">{row.name}</td>
                    {checks.map((checked, j) => (
                      <td key={j} className="px-4 py-4 text-center">
                        {checked ? (
                          <ShieldCheckIcon className="mx-auto h-4 w-4 text-blue" />
                        ) : (
                          <span className="text-gray-200">—</span>
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
        <p className="mt-5 text-[14px] text-muted">
          Don&apos;t see your framework? We&apos;ve built for PCI-DSS and FERPA as well.{' '}
          <Link
            href="/contact"
            className="font-semibold text-blue transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
          >
            Book a call →
          </Link>
        </p>
      </div>
    </section>
  )
}
