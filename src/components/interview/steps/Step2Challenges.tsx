'use client'

import { motion } from 'framer-motion'
import type { Variants, Transition } from 'framer-motion'
import type { StepProps } from '../types'

const CHALLENGES = [
  'Manual / repetitive processes',
  'Data silos and poor visibility',
  'Slow decision-making',
  'Customer service capacity',
  'Compliance and regulatory burden',
  'Talent gaps and hiring pressure',
  'Cost control and margin pressure',
  'Difficulty scaling operations',
]

const GOALS = [
  'Reduce operating costs',
  'Grow revenue',
  'Improve operational efficiency',
  'Scale faster without adding headcount',
  'Achieve better compliance and risk posture',
  'Improve customer experience',
]

const itemT: Transition = { duration: 0.22, ease: 'easeOut' }

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: itemT },
}

const labelClass = 'mb-1.5 block text-[13px] font-semibold text-[#374151]'

export default function Step2Challenges({ answers, onChange, errors }: StepProps) {
  function toggleChallenge(challenge: string) {
    const current = answers.challenges
    if (current.includes(challenge)) {
      onChange({ challenges: current.filter((c) => c !== challenge) })
    } else if (current.length < 3) {
      onChange({ challenges: [...current, challenge] })
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <motion.div variants={item} initial="hidden" animate="show">
        <h2 className="text-[22px] font-bold text-[#0F2444]">Challenges &amp; goals</h2>
        <p className="mt-1.5 text-[14px] text-[#6B7280]">
          Select up to 3 challenges and your primary goal.
        </p>
      </motion.div>

      <div>
        <motion.p variants={item} initial="hidden" animate="show" className={labelClass}>
          Top operational challenges{' '}
          <span className="font-normal text-[#9CA3AF]">(pick up to 3)</span>{' '}
          <span className="text-[#EF4444]">*</span>
        </motion.p>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-2 flex flex-col gap-2.5"
        >
          {CHALLENGES.map((challenge) => {
            const checked = answers.challenges.includes(challenge)
            const disabled = !checked && answers.challenges.length >= 3
            return (
              <motion.label
                key={challenge}
                variants={item}
                whileTap={disabled ? {} : { scale: 0.985 }}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-all ${
                  checked
                    ? 'border-[#2563EB] bg-[#EFF6FF]'
                    : disabled
                      ? 'cursor-not-allowed border-[#E2E8F0] bg-[#F8FAFC] opacity-50'
                      : 'border-[#E2E8F0] bg-white hover:border-[#2563EB]/40'
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                    checked ? 'border-[#2563EB] bg-[#2563EB]' : 'border-[#D1D5DB]'
                  }`}
                >
                  {checked && (
                    <motion.svg
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  )}
                </span>
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={disabled}
                  onChange={() => toggleChallenge(challenge)}
                  className="sr-only"
                />
                <span className="text-[14px] text-[#374151]">{challenge}</span>
              </motion.label>
            )
          })}
        </motion.div>
        {errors.challenges && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-[13px] text-[#DC2626]"
          >
            {errors.challenges}
          </motion.p>
        )}
      </div>

      <div>
        <motion.p variants={item} initial="hidden" animate="show" className={labelClass}>
          Primary business goal <span className="text-[#EF4444]">*</span>
        </motion.p>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-2 flex flex-col gap-2.5"
        >
          {GOALS.map((goal) => {
            const selected = answers.primaryGoal === goal
            return (
              <motion.label
                key={goal}
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
                  name="primaryGoal"
                  value={goal}
                  checked={selected}
                  onChange={() => onChange({ primaryGoal: goal })}
                  className="sr-only"
                />
                <span className="text-[14px] text-[#374151]">{goal}</span>
              </motion.label>
            )
          })}
        </motion.div>
        {errors.primaryGoal && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-[13px] text-[#DC2626]"
          >
            {errors.primaryGoal}
          </motion.p>
        )}
      </div>
    </div>
  )
}
