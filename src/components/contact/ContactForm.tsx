'use client'

import { useState, useRef } from 'react'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const SERVICE_OPTIONS = [
  { value: '', label: 'Select a service area…' },
  { value: 'ai-architecture', label: 'AI Architecture & Strategy' },
  { value: 'agentic-systems', label: 'Agentic Systems & RAG' },
  { value: 'automation', label: 'Workflow Automation' },
  { value: 'cloud-infrastructure', label: 'Cloud Infrastructure (GCP)' },
  { value: 'compliance', label: 'Compliance-Ready AI Systems' },
  { value: 'other', label: 'Other / Not Sure Yet' },
]

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle')
  const [error, setError] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('submitting')
    setError('')

    const data = Object.fromEntries(new FormData(e.currentTarget))

    try {
      const res = await fetch('/api/contact', {
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
      <div className="flex flex-col items-start gap-4 rounded-xl bg-[#F0FDF4] p-8">
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: '#22C55E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div>
          <h3 className="text-[18px] font-700 text-[#166534]" style={{ fontWeight: 700 }}>
            Message sent — thank you.
          </h3>
          <p className="mt-2 text-[15px] text-[#166534]/80 leading-relaxed">
            We&apos;ll review your message and get back to you within one business day.
          </p>
        </div>
        <button
          onClick={() => setState('idle')}
          className="mt-2 text-[13px] font-semibold text-blue underline underline-offset-2 hover:opacity-70 transition-opacity"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" required>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder="Jane Smith"
            className={inputClass}
          />
        </Field>
        <Field label="Work email" required>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="jane@company.com"
            className={inputClass}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company">
          <input
            type="text"
            name="company"
            autoComplete="organization"
            placeholder="Acme Corp"
            className={inputClass}
          />
        </Field>
        <Field label="Service interest">
          <select name="service" defaultValue="" className={selectClass}>
            {SERVICE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} disabled={o.value === ''}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Message" required>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us about your biggest automation or compliance challenge…"
          className={inputClass}
          style={{ resize: 'vertical', minHeight: 120 }}
        />
      </Field>

      {state === 'error' && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-[14px] text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={state === 'submitting'}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue px-8 py-4 text-[15px] font-bold text-white transition-all hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === 'submitting' ? (
          <>
            <span
              style={{
                width: 16,
                height: 16,
                border: '2px solid rgba(255,255,255,0.4)',
                borderTopColor: '#fff',
                borderRadius: '50%',
                display: 'inline-block',
                animation: 'dvlm-spin 0.7s linear infinite',
              }}
            />
            Sending…
          </>
        ) : (
          'Book a Discovery Call'
        )}
      </button>

      <style>{`@keyframes dvlm-spin { to { transform: rotate(360deg); } }`}</style>
    </form>
  )
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] font-semibold text-[#374151]">
        {label}
        {required && <span className="ml-0.5 text-blue">*</span>}
      </span>
      {children}
    </label>
  )
}

const inputClass =
  'w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-3 text-[14px] text-[#111827] placeholder-[#9CA3AF] outline-none transition-all focus:border-blue focus:ring-2 focus:ring-blue/20'

const selectClass =
  'w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-3 text-[14px] text-[#111827] outline-none transition-all focus:border-blue focus:ring-2 focus:ring-blue/20 appearance-none cursor-pointer'
