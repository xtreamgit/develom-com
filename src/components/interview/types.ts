export interface InterviewAnswers {
  companySize: string
  industry: string
  challenges: string[]
  primaryGoal: string
  techTeamSize: string
  infrastructure: string
  compliance: string[]
  aiExperience: string
  biggestBottleneck: string
  name: string
  email: string
  company: string
}

export const defaultAnswers: InterviewAnswers = {
  companySize: '',
  industry: '',
  challenges: [],
  primaryGoal: '',
  techTeamSize: '',
  infrastructure: '',
  compliance: [],
  aiExperience: '',
  biggestBottleneck: '',
  name: '',
  email: '',
  company: '',
}

export interface Solution {
  title: string
  useCase: string
  whyItFits: string
  complexity: 'Low' | 'Medium' | 'High'
  timeToValue: string
  roiRange: string
}

export interface Recommendation {
  summary: string
  solutions: Solution[]
  implementationPath: string
  risks: string[]
  nextStep: string
}

export interface StepProps {
  answers: InterviewAnswers
  onChange: (updates: Partial<InterviewAnswers>) => void
  errors: Record<string, string>
}
