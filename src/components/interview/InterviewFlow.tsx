'use client'

import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import StepIndicator from './StepIndicator'
import Step1Organization from './steps/Step1Organization'
import Step2Challenges from './steps/Step2Challenges'
import Step3Technical from './steps/Step3Technical'
import Step4Readiness from './steps/Step4Readiness'
import Step5Contact from './steps/Step5Contact'
import ResultsView from './ResultsView'
import { defaultAnswers } from './types'
import type { InterviewAnswers, Recommendation } from './types'

type FlowState = 'form' | 'submitting' | 'success' | 'error'

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 56 : -56,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -56 : 56,
    opacity: 0,
  }),
}

const slideTransition = { duration: 0.28, ease: 'easeInOut' as const }

function validateStep(step: number, answers: InterviewAnswers): Record<string, string> {
  const errs: Record<string, string> = {}
  if (step === 1) {
    if (!answers.companySize) errs.companySize = 'Please select your company size.'
    if (!answers.industry) errs.industry = 'Please select your industry.'
  }
  if (step === 2) {
    if (answers.challenges.length === 0) errs.challenges = 'Please select at least one challenge.'
    if (!answers.primaryGoal) errs.primaryGoal = 'Please select your primary goal.'
  }
  if (step === 3) {
    if (!answers.techTeamSize) errs.techTeamSize = 'Please select your tech team size.'
    if (!answers.infrastructure) errs.infrastructure = 'Please select your infrastructure.'
  }
  if (step === 4) {
    if (!answers.aiExperience) errs.aiExperience = 'Please select your AI experience level.'
  }
  if (step === 5) {
    if (!answers.name || answers.name.trim().length < 2)
      errs.name = 'Please enter your full name.'
    if (!answers.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email.trim()))
      errs.email = 'Please enter a valid email address.'
  }
  return errs
}

export default function InterviewFlow() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<InterviewAnswers>(defaultAnswers)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [flowState, setFlowState] = useState<FlowState>('form')
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const direction = useRef(1)

  function updateAnswers(updates: Partial<InterviewAnswers>) {
    setAnswers((prev) => ({ ...prev, ...updates }))
    setErrors((prev) => {
      const next = { ...prev }
      Object.keys(updates).forEach((k) => delete next[k])
      return next
    })
  }

  function handleNext() {
    const errs = validateStep(step, answers)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    if (step < 5) {
      direction.current = 1
      setStep(step + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      handleSubmit()
    }
  }

  function handleBack() {
    setErrors({})
    direction.current = -1
    setStep(step - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleSubmit() {
    setFlowState('submitting')
    try {
      const res = await fetch('/api/interviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: answers.name.trim(),
          email: answers.email.trim(),
          company: answers.company.trim() || undefined,
          answers: {
            companySize: answers.companySize,
            industry: answers.industry,
            challenges: answers.challenges,
            primaryGoal: answers.primaryGoal,
            techTeamSize: answers.techTeamSize,
            infrastructure: answers.infrastructure,
            compliance: answers.compliance,
            aiExperience: answers.aiExperience,
            biggestBottleneck: answers.biggestBottleneck || undefined,
          },
        }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.message ?? 'Something went wrong. Please try again.')
      }

      const data = await res.json()
      setRecommendation(data.recommendation)
      setFlowState('success')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setFlowState('error')
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      )
    }
  }

  if (flowState === 'submitting') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-6 py-16 text-center"
      >
        {/* Scanning pulse animation */}
        <div className="relative flex h-16 w-16 items-center justify-center">
          <motion.div
            className="absolute inset-0 rounded-full bg-[#2563EB]/20"
            animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-[#2563EB]/10"
            animate={{ scale: [1, 2.2, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          />
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#2563EB]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div>
          <p className="text-[18px] font-bold text-[#0F2444]">Analyzing your profile…</p>
          <p className="mt-1.5 text-[14px] text-[#6B7280]">
            Our AI is generating your personalized roadmap.
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full bg-[#2563EB]"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </motion.div>
    )
  }

  if (flowState === 'success' && recommendation) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <ResultsView
          recommendation={recommendation}
          name={answers.name}
          email={answers.email}
        />
      </motion.div>
    )
  }

  if (flowState === 'error') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-5 py-12 text-center"
      >
        <div className="flex h-13 w-13 items-center justify-center rounded-full bg-[#FEF2F2]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
              stroke="#DC2626"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <p className="text-[18px] font-bold text-[#0F2444]">Something went wrong</p>
          <p className="mt-1.5 max-w-[360px] text-[14px] text-[#6B7280]">{errorMessage}</p>
        </div>
        <button
          onClick={() => {
            setFlowState('form')
            setStep(5)
          }}
          className="rounded-lg border border-[#D1D5DB] bg-white px-5 py-2.5 text-[14px] font-semibold text-[#374151] transition hover:border-[#2563EB] hover:text-[#2563EB] focus:outline-none"
        >
          Try again
        </button>
      </motion.div>
    )
  }

  return (
    <div>
      <p className="mb-5 text-[12px] text-[#6B7280]">
        This recommendation flow is powered by AI. Your answers will be analyzed to generate results.
      </p>
      <StepIndicator current={step} />

      <div className="relative mt-8 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction.current}>
          <motion.div
            key={step}
            custom={direction.current}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
          >
            {step === 1 && (
              <Step1Organization answers={answers} onChange={updateAnswers} errors={errors} />
            )}
            {step === 2 && (
              <Step2Challenges answers={answers} onChange={updateAnswers} errors={errors} />
            )}
            {step === 3 && (
              <Step3Technical answers={answers} onChange={updateAnswers} errors={errors} />
            )}
            {step === 4 && (
              <Step4Readiness answers={answers} onChange={updateAnswers} errors={errors} />
            )}
            {step === 5 && (
              <Step5Contact answers={answers} onChange={updateAnswers} errors={errors} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        className="mt-8 flex items-center justify-between border-t border-[#E2E8F0] pt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.3 }}
      >
        {step > 1 ? (
          <motion.button
            onClick={handleBack}
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="flex items-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-5 py-2.5 text-[14px] font-semibold text-[#374151] transition hover:border-[#2563EB] hover:text-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M19 12H5m7-7l-7 7 7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back
          </motion.button>
        ) : (
          <span />
        )}

        <div className="flex items-center gap-3">
          <span className="text-[13px] text-[#9CA3AF]">Step {step} of 5</span>
          <motion.button
            onClick={handleNext}
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="flex items-center gap-2 rounded-lg bg-[#2563EB] px-6 py-2.5 text-[14px] font-semibold text-white transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40"
          >
            {step === 5 ? 'Generate my roadmap' : 'Continue'}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 12h14m-7-7l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
