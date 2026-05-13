'use client'

import { motion } from 'framer-motion'
import type { Variants, Transition } from 'framer-motion'
import type { Recommendation } from './types'

const complexityConfig = {
  Low: { bg: '#F0FDF4', border: '#86EFAC', text: '#16A34A' },
  Medium: { bg: '#FFFBEB', border: '#FCD34D', text: '#D97706' },
  High: { bg: '#FEF2F2', border: '#FCA5A5', text: '#DC2626' },
}

const staggerT: Transition = { staggerChildren: 0.1, delayChildren: 0.1 }
const fadeT: Transition = { duration: 0.38, ease: 'easeOut' }

const container: Variants = {
  hidden: {},
  show: { transition: staggerT },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: fadeT },
}

interface ResultsViewProps {
  recommendation: Recommendation
  name: string
  email: string
}

export default function ResultsView({ recommendation, name, email }: ResultsViewProps) {
  const firstName = name.split(' ')[0]
  const contactUrl = `/contact?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-8"
    >
      {/* Header */}
      <motion.div
        variants={fadeUp}
        className="rounded-2xl px-8 py-8 text-white"
        style={{ background: 'linear-gradient(135deg, #0F2444 0%, #1e3a5f 100%)' }}
      >
        <span className="mb-3 inline-block rounded-full border border-[#2563EB]/40 bg-[#2563EB]/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#93C5FD]">
          Your AI Roadmap
        </span>
        <h2 className="text-[24px] font-bold leading-tight md:text-[28px]">
          {firstName}&apos;s personalized recommendations
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-[#CBD5E1]">
          {recommendation.summary}
        </p>
      </motion.div>

      {/* Solutions */}
      <motion.div variants={fadeUp}>
        <h3 className="mb-4 text-[16px] font-bold text-[#0F2444]">
          Recommended AI Solutions ({recommendation.solutions.length})
        </h3>
        <div className="flex flex-col gap-4">
          {recommendation.solutions.map((solution, i) => {
            const complexity = solution.complexity as keyof typeof complexityConfig
            const config = complexityConfig[complexity] ?? complexityConfig.Medium
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
                className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h4 className="text-[16px] font-bold text-[#0F2444]">{solution.title}</h4>
                  <span
                    className="shrink-0 rounded-full border px-3 py-0.5 text-[12px] font-semibold"
                    style={{
                      background: config.bg,
                      borderColor: config.border,
                      color: config.text,
                    }}
                  >
                    {complexity} complexity
                  </span>
                </div>
                <p className="mt-2 text-[14px] leading-relaxed text-[#374151]">
                  {solution.useCase}
                </p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#6B7280]">
                  {solution.whyItFits}
                </p>
                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="flex items-center gap-1.5">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      className="shrink-0 text-[#2563EB]"
                    >
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                      <path
                        d="M12 6v6l4 2"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="text-[13px] text-[#374151]">
                      <span className="font-semibold">Time to value:</span> {solution.timeToValue}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      className="shrink-0 text-[#22C55E]"
                    >
                      <path
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-[13px] text-[#374151]">
                      <span className="font-semibold">Expected ROI:</span> {solution.roiRange}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Implementation path */}
      <motion.div
        variants={fadeUp}
        className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6"
      >
        <div className="mb-3 flex items-center gap-2">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="text-[#2563EB]"
          >
            <path
              d="M9 20l-5.447-2.724A1 1 0 0 1 3 16.382V5.618a1 1 0 0 1 1.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0 0 21 18.382V7.618a1 1 0 0 0-.553-.894L15 4m0 13V4m0 0L9 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h3 className="text-[15px] font-bold text-[#0F2444]">Recommended implementation path</h3>
        </div>
        <p className="text-[14px] leading-relaxed text-[#374151]">
          {recommendation.implementationPath}
        </p>
      </motion.div>

      {/* Risks */}
      {recommendation.risks.length > 0 && (
        <motion.div variants={fadeUp}>
          <div className="mb-3 flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="text-[#D97706]"
            >
              <path
                d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3 className="text-[15px] font-bold text-[#0F2444]">Honest caveats</h3>
          </div>
          <ul className="flex flex-col gap-2">
            {recommendation.risks.map((risk, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + i * 0.08 }}
                className="flex items-start gap-2.5 text-[14px] text-[#374151]"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D97706]" />
                {risk}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* CTA */}
      <motion.div
        variants={fadeUp}
        className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] px-8 py-8 text-center"
      >
        <p className="text-[15px] font-semibold text-[#0F2444]">{recommendation.nextStep}</p>
        <p className="mt-1.5 text-[13px] text-[#6B7280]">
          Schedule a free 30-minute strategy call with the Develom team.
        </p>
        <motion.a
          href={contactUrl}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-7 py-3.5 text-[15px] font-semibold text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40"
        >
          Schedule a strategy call
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M5 12h14m-7-7l7 7-7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.a>
      </motion.div>
    </motion.div>
  )
}
