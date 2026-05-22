import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Dashboard — Develom Partner Portal',
}

const DEPLOYMENTS = [
  {
    client: 'Northgate Property Group',
    solution: 'Document Intelligence',
    status: 'Active',
    users: 12,
    deployed: 'May 14, 2026',
  },
  {
    client: 'Meridian Capital',
    solution: 'Research & Insights',
    status: 'Active',
    users: 5,
    deployed: 'May 18, 2026',
  },
  {
    client: 'Harbor View Assets',
    solution: 'Client Communication',
    status: 'Configuring',
    users: 0,
    deployed: '—',
  },
]

const STATUS_STYLES: Record<string, string> = {
  Active: 'bg-[#DCFCE7] text-[#15803D]',
  Configuring: 'bg-[#FEF9C3] text-[#A16207]',
  Paused: 'bg-[#F1F5F9] text-[#64748B]',
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Top nav */}
      <nav className="border-b border-[#E2E8F0] bg-white px-6 py-4">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-semibold uppercase tracking-widest text-[#2563EB]">
              Develom
            </span>
            <span className="text-[#E2E8F0]">|</span>
            <span className="text-[14px] font-semibold text-[#0F2444]">Partner Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[13px] text-[#6B7280]">Apex Consulting Group</span>
            <div className="h-8 w-8 rounded-full bg-[#2563EB]/10 text-center leading-8 text-[12px] font-bold text-[#2563EB]">
              AC
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-[1100px] px-6 py-10">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-[24px] font-bold text-[#0F2444]">Client Deployments</h1>
            <p className="mt-1 text-[14px] text-[#6B7280]">
              {DEPLOYMENTS.length} of 25 deployments used · Partner Growth plan
            </p>
          </div>
          <Link
            href="/portal/catalog"
            className="flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-2.5 text-[14px] font-semibold text-white transition hover:brightness-110"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            New deployment
          </Link>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          {[
            { label: 'Active clients', value: '2' },
            { label: 'Total users provisioned', value: '17' },
            { label: 'Avg. deployment time', value: '4 min' },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-[#E2E8F0] bg-white px-6 py-5">
              <p className="text-[13px] text-[#6B7280]">{s.label}</p>
              <p className="mt-1 text-[28px] font-bold text-[#0F2444]">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Deployments table */}
        <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#F1F5F9]">
                {['Client', 'Solution', 'Status', 'Users', 'Deployed', ''].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3.5 text-left text-[12px] font-semibold uppercase tracking-wide text-[#9CA3AF]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DEPLOYMENTS.map((d, i) => (
                <tr
                  key={i}
                  className={`border-b border-[#F1F5F9] last:border-0 ${i % 2 === 0 ? '' : 'bg-[#FAFBFC]'}`}
                >
                  <td className="px-6 py-4 text-[14px] font-semibold text-[#0F2444]">{d.client}</td>
                  <td className="px-6 py-4 text-[14px] text-[#374151]">{d.solution}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${STATUS_STYLES[d.status] ?? ''}`}
                    >
                      {d.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[14px] text-[#374151]">{d.users || '—'}</td>
                  <td className="px-6 py-4 text-[14px] text-[#6B7280]">{d.deployed}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[13px] font-semibold text-[#2563EB] hover:underline">
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Trust callout */}
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-[#2563EB]/20 bg-[#EFF6FF] px-5 py-4">
          <svg className="h-5 w-5 shrink-0 text-[#2563EB]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-[13px] text-[#1D4ED8]">
            <strong>Compliance and security managed by Develom</strong> — SOC 2 Type II infrastructure,
            HIPAA-ready deployments, and GDPR-compliant data handling across all client environments.
          </p>
        </div>
      </div>
    </main>
  )
}
