import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Partner Portal — Develom',
  description: 'Get started with your Develom partner account.',
}

export default function PortalSignupPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-[440px]">
        {/* Logo/brand */}
        <div className="mb-8 text-center">
          <span className="text-[13px] font-semibold uppercase tracking-widest text-[#2563EB]">
            Develom Partner Portal
          </span>
          <h1 className="mt-3 text-[28px] font-bold text-[#0F2444]">
            Welcome back
          </h1>
          <p className="mt-2 text-[14px] text-[#6B7280]">
            Sign in to manage your client deployments.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-[#374151]" htmlFor="email">
                Work email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@agency.com"
                className="rounded-lg border border-[#E2E8F0] px-3 py-2.5 text-[14px] text-[#374151] placeholder:text-[#9CA3AF] focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-[#374151]" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="rounded-lg border border-[#E2E8F0] px-3 py-2.5 text-[14px] text-[#374151] placeholder:text-[#9CA3AF] focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
              />
            </div>

            <Link
              href="/portal/dashboard"
              className="mt-2 w-full rounded-xl bg-[#2563EB] py-3 text-center text-[14px] font-semibold text-white transition hover:brightness-110"
            >
              Sign in
            </Link>
          </form>

          <p className="mt-5 text-center text-[13px] text-[#9CA3AF]">
            New partner?{' '}
            <Link href="/pricing" className="font-semibold text-[#2563EB] hover:underline">
              Start your free trial →
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-[12px] text-[#9CA3AF]">
          SOC 2 Type II · HIPAA-ready · GDPR-compliant
        </p>
      </div>
    </main>
  )
}
