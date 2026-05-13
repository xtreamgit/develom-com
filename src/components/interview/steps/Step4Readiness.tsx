'use client'

import { motion } from 'framer-motion'
import type { Variants, Transition } from 'framer-motion'
import type { StepProps } from '../types'

const AI_EXPERIENCE = [
  "We've never tried AI tools",
  'Informally using ChatGPT or Copilot',
  'AI tools running in production',
  'Building AI into our own products',
]

const itemT: Transition = { duration: 0.22, ease: 'easeOut' }

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: itemT },
}

const labelClass = 'mb-1.5 block text-[13px] font-semibold text-[#374151]'
const inputClass =
  'w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-3 text-[14px] text-[#111827] placeholder-[#9CA3AF] outline-none transition-all focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 resize-none'

export default function Step4Readiness({ answers, onChange, errors }: StepProps) {
  return (
    <div className="flex flex-col gap-6">
      <motion.div variants={item} initial="hidden" animate="show">
        <h2 className="text-[22px] font-bold text-[#0F2444]">AI readiness</h2>
        <p className="mt-1.5 text-[14px] text-[#6B7280]">
          We calibrate recommendations to where you actually are, not where you&apos;d like to be.
        </p>
      </motion.div>

      <div>
        <motion.p variants={item} initial="hidden" animate="show" className={labelClass}>
          AI experience level <span className="text-[#EF4444]">*</span>
        </motion.p>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-2 flex flex-col gap-2.5"
        >
          {AI_EXPERIENCE.map((level) => {
            const selected = answers.aiExperience === level
            return (
              <motion.label
                key={level}
                variants={item}
                whileTap={{ scale: 0.985 }}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-all ${
                  selected
                    ? 'border-[#2563EB] bg-[#EFF6FF]'
                    : 'border-[#E2E8F0] bg-white hover:border-[#2563EB]/40'
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    selected ? 'border-[#2563EB]' : 'border-[#D1D5DB]'
                  }`}
                >
                  {selected && (
                    <motion.span
                      className="h-2.5 w-2.5 rounded-full bg-[#2563EB]"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </span>
                <input
                  type="radio"
                  name="aiExperience"
                  value={level}
                  checked={selected}
                  onChange={() => onChange({ aiExperience: level })}
                  className="sr-only"
                />
                <span className="text-[14px] text-[#374151]">{level}</span>
              </motion.label>
            )
          })}
        </motion.div>
        {errors.aiExperience && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-[13px] text-[#DC2626]"
          >
            {errors.aiExperience}
          </motion.p>
        )}
      </div>

      <motion.div variants={item} initial="hidden" animate="show">
        <label htmlFor="bottleneck" className={labelClass}>
          Biggest bottleneck{' '}
          <span className="font-normal text-[#9CA3AF]">(optional — in your own words)</span>
        </label>
        <textarea
          id="bottleneck"
          rows={3}
          maxLength={250}
          placeholder="e.g. 'We spend 20 hours a week manually reviewing contracts' or 'Customer support tickets take 3 days to resolve'"
          value={answers.biggestBottleneck}
          onChange={(e) => onChange({ biggestBottleneck: e.target.value })}
          className={inputClass}
        />
        <p className="mt-1 text-right text-[12px] text-[#9CA3AF]">
          {answers.biggestBottleneck.length} / 250
        </p>
      </motion.div>
    </div>
  )
}
