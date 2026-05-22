'use client'

import { useState } from 'react'

const PLANS = [
  {
    id: 'starter',
    name: 'Partner Starter',
    monthlyPrice: 299,
    annualPrice: 249,
    description: 'For agencies and consultancies provisioning AI for a handful of clients.',
    features: [
      'Up to 5 client deployments',
      'Core AI solution catalog (3 solutions)',
      'Compliance calendar & deadline tracking',
      'Velom discovery widget for each client',
      'Email support',
      'Develom-branded client portal',
    ],
    cta: 'Start free trial',
    highlight: false,
  },
  {
    id: 'growth',
    name: 'Partner Growth',
    monthlyPrice: 799,
    annualPrice: 649,
    description: 'For growing practices managing multiple enterprise client deployments.',
    features: [
      'Up to 25 client deployments',
      'Full AI solution catalog (all solutions)',
      'Multi-vertical compliance tracking',
      'White-label client portal',
      'Priority support + onboarding call',
      'Usage analytics dashboard',
      'Custom solution configuration',
    ],
    cta: 'Start free trial',
    highlight: true,
  },
  {
    id: 'enterprise',
    name: 'Partner Enterprise',
    monthlyPrice: null,
    annualPrice: null,
    description: 'For platform integrators and large enterprise resellers.',
    features: [
      'Unlimited client deployments',
      'Custom solution development',
      'Dedicated infrastructure (GCP)',
      'SLA-backed uptime guarantees',
      'Full white-label + custom domain',
      'Dedicated account manager',
      'API access & webhook integrations',
    ],
    cta: 'Talk to sales',
    highlight: false,
  },
]

export default function PricingClient() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('annual')
  const [loading, setLoading] = useState<string | null>(null)
  const [email, setEmail] = useState('')

  async function handleCheckout(planId: string) {
    if (planId === 'enterprise') {
      window.location.href = '/contact'
      return
    }
    setLoading(planId)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planId, billing, email }),
      })
      const { url, error } = await res.json()
      if (error) throw new Error(error)
      window.location.href = url
    } catch (err) {
      console.error(err)
      setLoading(null)
    }
  }

  const annualSavingsPct = Math.round((1 - 249 / 299) * 100)

  return (
    <main>
      {/* Hero */}
      <section
        style={{ background: 'linear-gradient(135deg, #0F2444 0%, #1e3a5f 100%)' }}
        className="px-6 py-20 md:py-28 text-center"
      >
        <span className="mb-4 inline-block rounded-full border border-[#2563EB]/40 bg-[#2563EB]/10 px-4 py-1 text-[12px] font-semibold uppercase tracking-widest text-[#93C5FD]">
          Platform Pricing
        </span>
        <h1
          className="font-bold text-white"
          style={{ fontSize: 'clamp(2rem, 4vw + 0.75rem, 2.75rem)', lineHeight: 1.15 }}
        >
          Provision AI solutions for your clients
        </h1>
        <p className="mt-5 mx-auto max-w-[560px] text-[17px] leading-relaxed text-[#CBD5E1]">
          Become a Develom platform partner. Deploy AI solutions across your client base — compliance tracking, discovery agents, and industry-specific automation — under your own brand.
        </p>

        {/* Billing toggle */}
        <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-2 py-1.5">
          <button
            onClick={() => setBilling('monthly')}
            className={`rounded-full px-5 py-2 text-[14px] font-semibold transition-all ${
              billing === 'monthly'
                ? 'bg-white text-[#0F2444] shadow-sm'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling('annual')}
            className={`rounded-full px-5 py-2 text-[14px] font-semibold transition-all ${
              billing === 'annual'
                ? 'bg-white text-[#0F2444] shadow-sm'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Annual
            <span className="ml-2 rounded-full bg-[#22C55E] px-2 py-0.5 text-[11px] font-bold text-white">
              Save {annualSavingsPct}%
            </span>
          </button>
        </div>
      </section>

      {/* Plans */}
      <section className="bg-[#F8FAFC] px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-[1100px] gap-6 md:grid-cols-3">
          {PLANS.map((plan) => {
            const price = billing === 'annual' ? plan.annualPrice : plan.monthlyPrice
            const isLoading = loading === plan.id

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-2xl border bg-white p-8 shadow-sm transition-shadow hover:shadow-md ${
                  plan.highlight ? 'border-[#2563EB] ring-2 ring-[#2563EB]/20' : 'border-[#E2E8F0]'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-[#2563EB] px-4 py-1 text-[12px] font-bold uppercase tracking-wide text-white shadow">
                      Most popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <p className="text-[12px] font-semibold uppercase tracking-widest text-[#2563EB]">
                    {plan.name}
                  </p>
                  <div className="mt-3 flex items-baseline gap-1">
                    {price !== null ? (
                      <>
                        <span className="text-[42px] font-bold text-[#0F2444]">${price}</span>
                        <span className="text-[15px] text-[#6B7280]">/mo</span>
                        {billing === 'annual' && (
                          <span className="ml-2 text-[12px] text-[#6B7280]">billed annually</span>
                        )}
                      </>
                    ) : (
                      <span className="text-[32px] font-bold text-[#0F2444]">Custom</span>
                    )}
                  </div>
                  <p className="mt-3 text-[14px] leading-relaxed text-[#6B7280]">
                    {plan.description}
                  </p>
                </div>

                {/* Optional email field for paid plans */}
                {plan.id !== 'enterprise' && (
                  <input
                    type="email"
                    placeholder="Work email (optional)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4 rounded-lg border border-[#E2E8F0] px-3 py-2.5 text-[13px] text-[#374151] placeholder:text-[#9CA3AF] focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                  />
                )}

                <button
                  onClick={() => handleCheckout(plan.id)}
                  disabled={isLoading}
                  className={`w-full rounded-xl py-3 text-[14px] font-semibold transition-all disabled:opacity-60 ${
                    plan.highlight
                      ? 'bg-[#2563EB] text-white hover:brightness-110'
                      : 'border border-[#D1D5DB] bg-white text-[#0F2444] hover:border-[#2563EB] hover:text-[#2563EB]'
                  }`}
                >
                  {isLoading ? 'Redirecting…' : plan.cta}
                </button>

                {plan.id !== 'enterprise' && (
                  <p className="mt-2.5 text-center text-[12px] text-[#9CA3AF]">
                    14-day free trial · No credit card required to start
                  </p>
                )}

                <ul className="mt-6 flex flex-col gap-3 border-t border-[#F1F5F9] pt-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13px] text-[#374151]">
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#22C55E]"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-t border-[#E2E8F0] bg-white px-6 py-12">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="text-[14px] font-semibold text-[#0F2444]">
            All plans include
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-[13px] text-[#6B7280]">
            {['SOC 2 Type II infrastructure', 'HIPAA-ready deployments', '99.9% uptime SLA', 'GDPR-compliant data handling', 'Cancel any time'].map(
              (item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-[#2563EB]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* FAQ / bottom CTA */}
      <section className="bg-[#F8FAFC] px-6 py-14 text-center">
        <p className="text-[15px] text-[#6B7280]">
          Questions about the partner program?{' '}
          <a href="/contact" className="font-semibold text-[#2563EB] hover:underline">
            Talk to the Develom team →
          </a>
        </p>
      </section>
    </main>
  )
}
