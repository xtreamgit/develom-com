'use client'

import { motion, AnimatePresence } from 'framer-motion'

const STEPS = ['Organization', 'Challenges', 'Technical', 'AI Readiness', 'Contact']

interface StepIndicatorProps {
  current: number
}

export default function StepIndicator({ current }: StepIndicatorProps) {
  return (
    <div className="flex items-start justify-center">
      {STEPS.map((label, i) => {
        const step = i + 1
        const done = step < current
        const active = step === current
        return (
          <div key={step} className="flex items-start">
            <div className="flex flex-col items-center gap-1.5">
              {/* Dot */}
              <motion.div
                animate={{
                  backgroundColor: done ? '#22C55E' : active ? '#2563EB' : '#F1F5F9',
                }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-bold"
              >
                <AnimatePresence mode="wait">
                  {done ? (
                    <motion.svg
                      key="check"
                      initial={{ scale: 0, opacity: 0, rotate: -30 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'backOut' }}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  ) : (
                    <motion.span
                      key="num"
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.7, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ color: active ? '#ffffff' : '#9CA3AF' }}
                    >
                      {step}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Label */}
              <motion.span
                animate={{
                  color: active ? '#2563EB' : done ? '#22C55E' : '#9CA3AF',
                }}
                transition={{ duration: 0.3 }}
                className="hidden text-[11px] font-semibold uppercase tracking-wide sm:block"
              >
                {label}
              </motion.span>
            </div>

            {/* Connector */}
            {i < STEPS.length - 1 && (
              <div className="relative mx-2 mt-4 h-[2px] w-8 shrink-0 overflow-hidden rounded-full bg-[#E2E8F0] sm:w-14">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-[#22C55E]"
                  initial={{ width: '0%' }}
                  animate={{ width: done ? '100%' : '0%' }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
