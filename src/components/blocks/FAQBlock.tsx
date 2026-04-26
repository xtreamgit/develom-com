'use client'

import { useState } from 'react'
import LexicalContent from './LexicalContent'

interface FAQItem {
  question: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  answer: any
}

interface FAQBlockProps {
  heading?: string | null
  items?: FAQItem[] | null
}

function FAQItem({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false)
  const id = `faq-answer-${index}`

  return (
    <div className="border-b border-slate-200 last:border-b-0">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 rounded"
      >
        <span className="pr-6 text-[16px] font-semibold text-navy">{item.question}</span>
        <span
          className="shrink-0 text-[20px] font-light text-blue transition-transform duration-200"
          aria-hidden="true"
          style={{ transform: open ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>

      <div
        id={id}
        role="region"
        hidden={!open}
        className="pb-5 text-[15px] leading-[1.7] text-muted"
      >
        <LexicalContent data={item.answer} />
      </div>
    </div>
  )
}

export default function FAQBlock({ heading, items }: FAQBlockProps) {
  if (!items || items.length === 0) return null

  return (
    <section className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-[680px]">
        {heading && (
          <h2
            className="mb-10 text-navy"
            style={{ fontSize: 'clamp(1.5rem, 2vw + 0.75rem, 2rem)', fontWeight: 700, lineHeight: 1.2 }}
          >
            {heading}
          </h2>
        )}

        <div>
          {items.map((item, i) => (
            <FAQItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
