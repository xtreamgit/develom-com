'use client'

import { useState, useRef } from 'react'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

interface LeadCaptureFormProps {
  source?: string
  downloadPath?: string
}

export default function LeadCaptureForm({
  source = 'ai-governance-guide',
  downloadPath = '/downloads/Develom_AI_Governance_Methods.pdf',
}: LeadCaptureFormProps) {
  const [state, setState] = useState<FormState>('idle')
  const [error, setError] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('submitting')
    setError('')

    const data = {
      ...Object.fromEntries(new FormData(e.currentTarget)),
      source,
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.message ?? 'Something went wrong. Please try again.')
      }

      setState('success')
      formRef.current?.reset()
    } catch (err) {
      setState('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (state === 'success') {
    return (
      <div className="flex flex-col items-center gap-6 rounded-2xl border border-[#D1FAE5] bg-[#F0FDF4] px-8 py-10 text-center">
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: '#22C55E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <p className="text-[18px] font-semibold text-[#111827]">Your guide is ready</p>
          <p className="mt-1 text-[14px] text-[#6B7280]">
            Click below to download. Check your inbox — we may follow up with additional resources.
          </p>
        </div>
        <a
          href={downloadPath}
          download
          className="inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-6 py-3 text-[15px] font-semibold text-white transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 3v13m0 0l-4-4m4 4l4-4M4 20h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Download PDF
        </a>
      </div>
    )
  }

  const inputClass =
    'w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-3 text-[14px] text-[#111827] placeholder-[#9CA3AF] transition focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20'
  const labelClass = 'mb-1.5 block text-[13px] font-semibold text-[#374151]'

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div>
        <label htmlFor="lead-name" className={labelClass}>
          Full name <span className="text-[#EF4444]">*</span>
        </label>
        <input
          id="lead-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Jane Smith"
          required
          className={inputClass}
          disabled={state === 'submitting'}
        />
      </div>

      <div>
        <label htmlFor="lead-email" className={labelClass}>
          Work email <span className="text-[#EF4444]">*</span>
        </label>
        <input
          id="lead-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="jane@company.com"
          required
          className={inputClass}
          disabled={state === 'submitting'}
        />
      </div>

      <div>
        <label htmlFor="lead-company" className={labelClass}>
          Company <span className="text-[#9CA3AF] font-normal">(optional)</span>
        </label>
        <input
          id="lead-company"
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Acme Corp"
          className={inputClass}
          disabled={state === 'submitting'}
        />
      </div>

      {state === 'error' && error && (
        <p role="alert" className="rounded-lg bg-[#FEF2F2] px-4 py-3 text-[13px] text-[#DC2626]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'submitting'}
        className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-6 py-3.5 text-[15px] font-semibold text-white transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === 'submitting' ? (
          <>
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
              <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            Sending…
          </>
        ) : (
          'Get the Free Guide'
        )}
      </button>

      <p className="text-center text-[12px] text-[#9CA3AF]">
        No spam. Unsubscribe any time.
      </p>
    </form>
  )
}
