'use client'

import { motion } from 'framer-motion'
import type { Variants, Transition } from 'framer-motion'
import type { StepProps } from '../types'

const TECH_TEAMS = [
  'No dedicated tech team',
  'Small IT team (1–3 people)',
  'Dedicated engineering team',
  'Full engineering organization',
]

const INFRASTRUCTURE = [
  'Fully on-premise',
  'Hybrid (on-premise + cloud)',
  'Mostly cloud',
  'Cloud-native',
]

const COMPLIANCE_OPTIONS = ['SOC 2', 'HIPAA', 'GDPR', 'FedRAMP', 'None / not sure']

const itemT: Transition = { duration: 0.22, ease: 'easeOut' }

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: itemT },
}

const labelClass = 'mb-1.5 block text-[13px] font-semibold text-[#374151]'

export default function Step3Technical({ answers, onChange, errors }: StepProps) {
  function toggleCompliance(option: string) {
    const current = answers.compliance
    if (current.includes(option)) {
      onChange({ compliance: current.filter((c) => c !== option) })
    } else {
      onChange({ compliance: [...current, option] })
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <motion.div variants={item} initial="hidden" animate="show">
        <h2 className="text-[22px] font-bold text-[#0F2444]">Technical readiness</h2>
        <p className="mt-1.5 text-[14px] text-[#6B7280]">
          Helps us recommend solutions that match your infrastructure and constraints.
        </p>
      </motion.div>

      <div>
        <motion.p variants={item} initial="hidden" animate="show" className={labelClass}>
          Tech team <span className="text-[#EF4444]">*</span>
        </motion.p>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-2 flex flex-col gap-2.5"
        >
          {TECH_TEAMS.map((team) => {
            const selected = answers.techTeamSize === team
            return (
              <motion.label
                key={team}
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
                  name="techTeamSize"
                  value={team}
                  checked={selected}
                  onChange={() => onChange({ techTeamSize: team })}
                  className="sr-only"
                />
                <span className="text-[14px] text-[#374151]">{team}</span>
              </motion.label>
            )
          })}
        </motion.div>
        {errors.techTeamSize && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-[13px] text-[#DC2626]"
          >
            {errors.techTeamSize}
          </motion.p>
        )}
      </div>

      <div>
        <motion.p variants={item} initial="hidden" animate="show" className={labelClass}>
          Infrastructure <span className="text-[#EF4444]">*</span>
        </motion.p>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-2 flex flex-col gap-2.5"
        >
          {INFRASTRUCTURE.map((infra) => {
            const selected = answers.infrastructure === infra
            return (
              <motion.label
                key={infra}
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
                  name="infrastructure"
                  value={infra}
                  checked={selected}
                  onChange={() => onChange({ infrastructure: infra })}
                  className="sr-only"
                />
                <span className="text-[14px] text-[#374151]">{infra}</span>
              </motion.label>
            )
          })}
        </motion.div>
        {errors.infrastructure && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-[13px] text-[#DC2626]"
          >
            {errors.infrastructure}
          </motion.p>
        )}
      </div>

      <div>
        <motion.p variants={item} initial="hidden" animate="show" className={labelClass}>
          Compliance requirements{' '}
          <span className="font-normal text-[#9CA3AF]">(select all that apply)</span>
        </motion.p>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-2 flex flex-wrap gap-2.5"
        >
          {COMPLIANCE_OPTIONS.map((option) => {
            const checked = answers.compliance.includes(option)
            return (
              <motion.label
                key={option}
                variants={item}
                whileTap={{ scale: 0.96 }}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 transition-all ${
                  checked
                    ? 'border-[#2563EB] bg-[#EFF6FF]'
                    : 'border-[#E2E8F0] bg-white hover:border-[#2563EB]/40'
                }`}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                    checked ? 'border-[#2563EB] bg-[#2563EB]' : 'border-[#D1D5DB]'
                  }`}
                >
                  {checked && (
                    <motion.svg
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      width="9"
                      height="9"
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
                  onChange={() => toggleCompliance(option)}
                  className="sr-only"
                />
                <span className="text-[14px] text-[#374151]">{option}</span>
              </motion.label>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
