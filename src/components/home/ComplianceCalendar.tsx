'use client'

import { useState, useEffect } from 'react'

export interface ComplianceItem {
  title: string
  dueDate: string
  industry: string
  regulatoryBody: string
}

const DWELL_MS = 6000
const FADE_MS = 300

export default function ComplianceCalendar({ items }: { items: ComplianceItem[] }) {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (items.length <= 1) return
    const timer = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx((i) => (i + 1) % items.length)
        setVisible(true)
      }, FADE_MS)
    }, DWELL_MS)
    return () => clearInterval(timer)
  }, [items.length])

  if (!items.length) return null

  const item = items[idx]

  return (
    <section className="bg-slate-900 py-2.5 px-6">
      <div className="mx-auto max-w-content flex items-center gap-5 min-w-0">
        <span className="hidden sm:block text-[10px] font-semibold text-slate-500 uppercase tracking-widest flex-shrink-0">
          Compliance Calendar
        </span>
        <span className="hidden sm:block h-3 w-px bg-slate-700 flex-shrink-0" aria-hidden="true" />

        <div
          className="flex-1 min-w-0 flex flex-wrap items-baseline gap-x-3 gap-y-0.5"
          style={{ opacity: visible ? 1 : 0, transition: `opacity ${FADE_MS}ms ease` }}
        >
          <span className="text-[13px] text-white font-medium truncate">{item.title}</span>
          <span className="text-[12px] text-slate-400 flex-shrink-0">Due {item.dueDate}</span>
          <span className="text-slate-600 flex-shrink-0" aria-hidden="true">·</span>
          <span className="text-[12px] text-slate-500 flex-shrink-0">{item.industry}</span>
          <span className="text-slate-600 flex-shrink-0" aria-hidden="true">·</span>
          <span className="text-[12px] text-slate-600 flex-shrink-0">{item.regulatoryBody}</span>
        </div>

        {items.length > 1 && (
          <span className="text-[11px] text-slate-700 flex-shrink-0 tabular-nums">
            {idx + 1}/{items.length}
          </span>
        )}
      </div>
    </section>
  )
}
