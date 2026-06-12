import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Configure Deployment — Develom Partner Portal',
}

const SOLUTION_META: Record<string, { name: string; description: string; showDriveField: boolean }> = {
  'document-intelligence': {
    name: 'Document Intelligence',
    description: 'Reads and answers questions about leases, contracts, and reports.',
    showDriveField: true,
  },
  'client-communication': {
    name: 'Client Communication',
    description: 'Handles email and meeting scheduling for your client.',
    showDriveField: false,
  },
  'research-insights': {
    name: 'Research & Insights',
    description: 'Produces structured reports from research and data.',
    showDriveField: false,
  },
  'workflow-coordinator': {
    name: 'Workflow Coordinator',
    description: 'Tracks tasks and routes escalations to human reviewers.',
    showDriveField: false,
  },
}

export default async function DeployPage({
  params,
}: {
  params: Promise<{ solution: string }>
}) {
  const { solution } = await params
  const meta = SOLUTION_META[solution] ?? {
    name: 'AI Solution',
    description: 'Configure your deployment.',
    showDriveField: false,
  }

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
            <Link href="/portal/catalog" className="text-[14px] text-[#6B7280] hover:text-[#0F2444]">
              Catalog
            </Link>
            <span className="text-[#E2E8F0]">/</span>
            <span className="text-[14px] font-semibold text-[#0F2444]">Configure</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[13px] text-[#6B7280]">Apex Consulting Group</span>
            <div className="h-8 w-8 rounded-full bg-[#2563EB]/10 text-center leading-8 text-[12px] font-bold text-[#2563EB]">
              AC
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-[680px] px-6 py-10">
        {/* Selected solution badge */}
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-[#E2E8F0] bg-white px-5 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EFF6FF]">
            <svg className="h-5 w-5 text-[#2563EB]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <p className="text-[14px] font-semibold text-[#0F2444]">{meta.name}</p>
            <p className="text-[12px] text-[#6B7280]">{meta.description}</p>
          </div>
          <Link
            href="/portal/catalog"
            className="ml-auto text-[12px] font-semibold text-[#2563EB] hover:underline"
          >
            Change
          </Link>
        </div>

        <h1 className="mb-6 text-[22px] font-bold text-[#0F2444]">Configure client deployment</h1>

        <form className="flex flex-col gap-6">
          {/* Required fields card */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-7">
            <h2 className="mb-5 text-[15px] font-bold text-[#0F2444]">Client details</h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-[#374151]" htmlFor="client-name">
                  Client name <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  id="client-name"
                  type="text"
                  placeholder="e.g. Northgate Property Group"
                  className="rounded-lg border border-[#E2E8F0] px-3 py-2.5 text-[14px] text-[#374151] placeholder:text-[#9CA3AF] focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-[#374151]" htmlFor="authorized-users">
                  Authorized users <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  id="authorized-users"
                  type="text"
                  placeholder="Email domain (e.g. northgate.com) or individual emails"
                  className="rounded-lg border border-[#E2E8F0] px-3 py-2.5 text-[14px] text-[#374151] placeholder:text-[#9CA3AF] focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                />
                <p className="text-[12px] text-[#9CA3AF]">
                  Use a domain to allow all users at that company, or enter individual emails separated by commas.
                </p>
              </div>
            </div>
          </div>

          {/* Optional fields card */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-7">
            <h2 className="mb-1 text-[15px] font-bold text-[#0F2444]">Advanced options</h2>
            <p className="mb-5 text-[13px] text-[#6B7280]">Optional — defaults work for most deployments.</p>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-[#374151]" htmlFor="region">
                  Region
                </label>
                <select
                  id="region"
                  defaultValue="us"
                  className="rounded-lg border border-[#E2E8F0] px-3 py-2.5 text-[14px] text-[#374151] focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                >
                  <option value="us">US (default)</option>
                  <option value="eu">EU (GDPR-compliant)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-[#374151]" htmlFor="agent-name">
                  Agent display name
                </label>
                <input
                  id="agent-name"
                  type="text"
                  placeholder="e.g. Aria, Alex, or leave blank for default"
                  className="rounded-lg border border-[#E2E8F0] px-3 py-2.5 text-[14px] text-[#374151] placeholder:text-[#9CA3AF] focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-[#374151]" htmlFor="welcome-message">
                  Welcome message
                </label>
                <textarea
                  id="welcome-message"
                  rows={3}
                  placeholder="Custom greeting shown to users on first login"
                  className="rounded-lg border border-[#E2E8F0] px-3 py-2.5 text-[14px] text-[#374151] placeholder:text-[#9CA3AF] focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB] resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-[#374151]" htmlFor="escalation-email">
                  Escalation email
                </label>
                <input
                  id="escalation-email"
                  type="email"
                  placeholder="reviewer@yourfirm.com"
                  className="rounded-lg border border-[#E2E8F0] px-3 py-2.5 text-[14px] text-[#374151] placeholder:text-[#9CA3AF] focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                />
                <p className="text-[12px] text-[#9CA3AF]">
                  Where flagged items and escalations are routed for human review.
                </p>
              </div>

              {meta.showDriveField && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-[#374151]" htmlFor="drive-folder">
                    Document folder <span className="text-[12px] font-normal text-[#9CA3AF]">(Document Intelligence)</span>
                  </label>
                  <input
                    id="drive-folder"
                    type="text"
                    placeholder="Google Drive folder ID"
                    className="rounded-lg border border-[#E2E8F0] px-3 py-2.5 text-[14px] text-[#374151] placeholder:text-[#9CA3AF] focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Trust callout */}
          <div className="flex items-start gap-3 rounded-xl border border-[#2563EB]/20 bg-[#EFF6FF] px-5 py-4">
            <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#2563EB]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-[13px] text-[#1D4ED8]">
              <strong>Compliance and security managed by Develom.</strong> Data isolation, access controls, audit
              logging, and infrastructure security are handled automatically — no configuration required.
            </p>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-4">
            <Link
              href="/portal/catalog"
              className="text-[14px] font-semibold text-[#6B7280] hover:text-[#0F2444]"
            >
              ← Back to catalog
            </Link>
            <button
              type="submit"
              className="rounded-xl bg-[#2563EB] px-7 py-3 text-[14px] font-semibold text-white transition hover:brightness-110"
            >
              Deploy now
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
