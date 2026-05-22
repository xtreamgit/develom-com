import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Solution Catalog — Develom Partner Portal',
}

const SOLUTIONS = [
  {
    id: 'document-intelligence',
    name: 'Document Intelligence',
    tagline: 'Read and answer questions about leases, contracts, and reports.',
    description:
      'Clients upload documents and ask questions in plain language. The agent reads, extracts, and reasons across your document library — lease abstractions, due diligence packages, financial reports.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    useCases: ['Lease abstraction', 'Contract Q&A', 'Due diligence review'],
  },
  {
    id: 'client-communication',
    name: 'Client Communication',
    tagline: 'Draft email responses and manage meeting scheduling.',
    description:
      'Handles inbound email, drafts responses for review, and manages calendar scheduling. Sends on request — your client stays in control. Reduces email overhead for high-volume client relationships.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    useCases: ['Email triage & drafting', 'Meeting scheduling', 'Client follow-ups'],
  },
  {
    id: 'research-insights',
    name: 'Research & Insights',
    tagline: 'Produce structured reports from research and data.',
    description:
      'Researches topics, synthesizes data, and produces structured outputs. Handles due diligence summaries, market research briefs, and competitive analysis — delivered as documents your team can act on.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    useCases: ['Due diligence packages', 'Market research', 'Competitive analysis'],
  },
  {
    id: 'workflow-coordinator',
    name: 'Workflow Coordinator',
    tagline: 'Track tasks and route escalations to human reviewers.',
    description:
      'Monitors outstanding items, sends follow-ups, and routes anything requiring human judgment to the right reviewer. Keeps deals and engagements moving without manual chase-up.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    useCases: ['Task tracking', 'Automated follow-up', 'Escalation routing'],
  },
]

export default function CatalogPage() {
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
            <Link href="/portal/dashboard" className="text-[14px] text-[#6B7280] hover:text-[#0F2444]">
              Dashboard
            </Link>
            <span className="text-[#E2E8F0]">/</span>
            <span className="text-[14px] font-semibold text-[#0F2444]">Solution Catalog</span>
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
        <div className="mb-8">
          <h1 className="text-[24px] font-bold text-[#0F2444]">Choose a solution</h1>
          <p className="mt-1 text-[14px] text-[#6B7280]">
            Select one solution to deploy for this client. You can provision additional clients with different solutions.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {SOLUTIONS.map((s) => (
            <div
              key={s.id}
              className="group relative flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-7 shadow-sm transition-shadow hover:border-[#2563EB] hover:shadow-md"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
                {s.icon}
              </div>

              <h2 className="text-[17px] font-bold text-[#0F2444]">{s.name}</h2>
              <p className="mt-1 text-[13px] font-medium text-[#6B7280]">{s.tagline}</p>
              <p className="mt-3 text-[13px] leading-relaxed text-[#374151]">{s.description}</p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {s.useCases.map((uc) => (
                  <li
                    key={uc}
                    className="rounded-full bg-[#F1F5F9] px-3 py-1 text-[11px] font-semibold text-[#374151]"
                  >
                    {uc}
                  </li>
                ))}
              </ul>

              <Link
                href={`/portal/deploy/${s.id}`}
                className="mt-6 w-full rounded-xl border border-[#2563EB] py-2.5 text-center text-[14px] font-semibold text-[#2563EB] transition hover:bg-[#2563EB] hover:text-white"
              >
                Deploy for a client →
              </Link>
            </div>
          ))}
        </div>

        {/* Trust callout */}
        <div className="mt-8 flex items-center gap-3 rounded-xl border border-[#2563EB]/20 bg-[#EFF6FF] px-5 py-4">
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
            <strong>Compliance and security managed by Develom</strong> — all solutions run on SOC 2 Type II
            infrastructure with HIPAA-ready and GDPR-compliant deployment options.
          </p>
        </div>
      </div>
    </main>
  )
}
