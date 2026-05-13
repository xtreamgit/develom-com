'use client'

import { motion } from 'framer-motion'
import type { Variants, Transition } from 'framer-motion'
import type { StepProps } from '../types'

const itemT: Transition = { duration: 0.22, ease: 'easeOut' }

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: itemT },
}

const inputClass =
  'w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-3 text-[14px] text-[#111827] placeholder-[#9CA3AF] outline-none transition-all focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20'
const labelClass = 'mb-1.5 block text-[13px] font-semibold text-[#374151]'

export default function Step5Contact({ answers, onChange, errors }: StepProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-6"
    >
      <motion.div variants={item}>
        <h2 className="text-[22px] font-bold text-[#0F2444]">Almost there</h2>
        <p className="mt-1.5 text-[14px] text-[#6B7280]">
          Enter your details and we&apos;ll generate your personalized AI roadmap.
        </p>
      </motion.div>

      <motion.div variants={item}>
        <label htmlFor="contact-name" className={labelClass}>
          Full name <span className="text-[#EF4444]">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          placeholder="Jane Smith"
          value={answers.name}
          onChange={(e) => onChange({ name: e.target.value })}
          className={inputClass}
        />
        {errors.name && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-[13px] text-[#DC2626]"
          >
            {errors.name}
          </motion.p>
        )}
      </motion.div>

      <motion.div variants={item}>
        <label htmlFor="contact-email" className={labelClass}>
          Work email <span className="text-[#EF4444]">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          placeholder="jane@company.com"
          value={answers.email}
          onChange={(e) => onChange({ email: e.target.value })}
          className={inputClass}
        />
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-[13px] text-[#DC2626]"
          >
            {errors.email}
          </motion.p>
        )}
      </motion.div>

      <motion.div variants={item}>
        <label htmlFor="contact-company" className={labelClass}>
          Company <span className="font-normal text-[#9CA3AF]">(optional)</span>
        </label>
        <input
          id="contact-company"
          type="text"
          autoComplete="organization"
          placeholder="Acme Corp"
          value={answers.company}
          onChange={(e) => onChange({ company: e.target.value })}
          className={inputClass}
        />
      </motion.div>

      <motion.div
        variants={item}
        className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-[13px] text-[#6B7280]"
      >
        <span className="font-semibold text-[#374151]">What happens next:</span> We run your
        profile through our AI model and generate a personalized roadmap in seconds. Your
        information is never shared or sold.
      </motion.div>
    </motion.div>
  )
}
