'use client'

import { motion } from 'framer-motion'
import type { Variants, Transition } from 'framer-motion'
import type { StepProps } from '../types'

const COMPANY_SIZES = [
  '1–10 employees',
  '11–50 employees',
  '51–200 employees',
  '201–1,000 employees',
  '1,000+ employees',
]

const INDUSTRIES = [
  'Technology & Software',
  'Healthcare & Life Sciences',
  'Finance & Banking',
  'Legal & Professional Services',
  'Retail & E-commerce',
  'Manufacturing & Operations',
  'Education',
  'Government & Public Sector',
  'Other',
]

const itemT: Transition = { duration: 0.22, ease: 'easeOut' }

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: itemT },
}

const inputClass =
  'w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-3 text-[14px] text-[#111827] outline-none transition-all focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 appearance-none cursor-pointer'
const labelClass = 'mb-1.5 block text-[13px] font-semibold text-[#374151]'

export default function Step1Organization({ answers, onChange, errors }: StepProps) {
  return (
    <div className="flex flex-col gap-6">
      <motion.div variants={item} initial="hidden" animate="show">
        <h2 className="text-[22px] font-bold text-[#0F2444]">Tell us about your organization</h2>
        <p className="mt-1.5 text-[14px] text-[#6B7280]">
          This helps us tailor solutions to your scale and context.
        </p>
      </motion.div>

      <div>
        <motion.p variants={item} initial="hidden" animate="show" className={labelClass}>
          Company size <span className="text-[#EF4444]">*</span>
        </motion.p>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-2 flex flex-col gap-2.5"
        >
          {COMPANY_SIZES.map((size) => {
            const selected = answers.companySize === size
            return (
              <motion.label
                key={size}
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
                      layoutId={`radio-dot-size-${size}`}
                      className="h-2.5 w-2.5 rounded-full bg-[#2563EB]"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </span>
                <input
                  type="radio"
                  name="companySize"
                  value={size}
                  checked={selected}
                  onChange={() => onChange({ companySize: size })}
                  className="sr-only"
                />
                <span className="text-[14px] text-[#374151]">{size}</span>
              </motion.label>
            )
          })}
        </motion.div>
        {errors.companySize && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-[13px] text-[#DC2626]"
          >
            {errors.companySize}
          </motion.p>
        )}
      </div>

      <motion.div variants={item} initial="hidden" animate="show">
        <label htmlFor="industry" className={labelClass}>
          Industry <span className="text-[#EF4444]">*</span>
        </label>
        <div className="relative">
          <select
            id="industry"
            value={answers.industry}
            onChange={(e) => onChange({ industry: e.target.value })}
            className={inputClass}
          >
            <option value="">Select your industry…</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {errors.industry && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-[13px] text-[#DC2626]"
          >
            {errors.industry}
          </motion.p>
        )}
      </motion.div>
    </div>
  )
}
