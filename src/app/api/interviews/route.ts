import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const SYSTEM_PROMPT = `You are a senior AI solutions consultant at Develom, a custom AI development firm specializing in building production-grade AI applications for businesses. Your job is to analyze a client's profile from a discovery interview and generate a personalized AI roadmap.

Based on the interview data provided, generate a JSON recommendation report. Be specific, practical, and honest. Match solutions to the client's actual situation — factor in their technical maturity, compliance requirements, team size, and goals. Don't oversell or recommend things that don't fit their real constraints.

Return ONLY valid JSON matching this exact schema with no additional text:
{
  "summary": "2-sentence profile summary of this client and their specific AI opportunity",
  "solutions": [
    {
      "title": "Solution name (3-5 words)",
      "useCase": "What this solution does in their specific context (1-2 sentences)",
      "whyItFits": "Why this fits their particular profile — reference their size, industry, or goals (1-2 sentences)",
      "complexity": "Low | Medium | High",
      "timeToValue": "Realistic timeframe, e.g. '4–8 weeks' or '3–6 months'",
      "roiRange": "Realistic impact estimate, e.g. '15–30% cost reduction' or '2× throughput on X process'"
    }
  ],
  "implementationPath": "3-4 sentences describing the recommended sequence for getting started, given their technical maturity",
  "risks": ["Risk or honest caveat 1", "Risk or honest caveat 2", "Risk or honest caveat 3"],
  "nextStep": "One specific, actionable next step they should take this week"
}

Include 3 to 5 solutions. Order them from highest to lowest fit for this client. Be honest about complexity — High means 6+ months and significant engineering. Be realistic about ROI ranges.`

function buildUserPrompt(answers: Record<string, unknown>): string {
  const {
    companySize,
    industry,
    challenges,
    primaryGoal,
    techTeamSize,
    infrastructure,
    compliance,
    aiExperience,
    biggestBottleneck,
  } = answers as {
    companySize: string
    industry: string
    challenges: string[]
    primaryGoal: string
    techTeamSize: string
    infrastructure: string
    compliance: string[]
    aiExperience: string
    biggestBottleneck?: string
  }

  const complianceStr =
    Array.isArray(compliance) && compliance.length > 0 ? compliance.join(', ') : 'None specified'

  return `Client profile from discovery interview:

ORGANIZATION
- Company size: ${companySize}
- Industry: ${industry}

CHALLENGES & GOALS
- Top operational challenges: ${Array.isArray(challenges) ? challenges.join(', ') : challenges}
- Primary business goal: ${primaryGoal}

TECHNICAL READINESS
- Tech team: ${techTeamSize}
- Infrastructure: ${infrastructure}
- Compliance requirements: ${complianceStr}

AI READINESS
- AI experience level: ${aiExperience}${biggestBottleneck ? `\n- Biggest bottleneck (in their words): "${biggestBottleneck}"` : ''}

Generate the AI roadmap JSON for this client.`
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 })
  }

  const { name, email, company, answers } = body as {
    name?: string
    email?: string
    company?: string
    answers?: Record<string, unknown>
  }

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return NextResponse.json({ message: 'Please enter your full name.' }, { status: 422 })
  }
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: 'Please enter a valid email address.' }, { status: 422 })
  }
  if (!answers || typeof answers !== 'object') {
    return NextResponse.json({ message: 'Interview answers are required.' }, { status: 422 })
  }

  const trimmed = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    company: typeof company === 'string' && company.trim() ? company.trim() : undefined,
  }

  const payload = await getPayload({ config: configPromise })

  let recordId: string | number | undefined
  try {
    const record = await payload.create({
      collection: 'interviews',
      data: {
        ...trimmed,
        answers,
        status: 'pending',
        source: 'ai-solution-finder',
      },
    })
    recordId = record.id
  } catch (err) {
    console.error('[interviews] DB insert error', err)
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('[interviews] ANTHROPIC_API_KEY not set')
    if (recordId !== undefined) {
      await payload.update({ collection: 'interviews', id: recordId, data: { status: 'failed' } }).catch(() => {})
    }
    return NextResponse.json(
      { message: 'Recommendation service unavailable. We will email your results shortly.' },
      { status: 503 },
    )
  }

  try {
    const client = new Anthropic({ apiKey })
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1500,
      system: [
        {
          type: 'text',
          text: SYSTEM_PROMPT,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [{ role: 'user', content: buildUserPrompt(answers) }],
    })

    const raw = message.content[0]?.type === 'text' ? message.content[0].text.trim() : ''
    // Strip markdown code fences if Claude wraps the JSON
    const jsonStr = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
    const recommendation = JSON.parse(jsonStr)

    if (recordId !== undefined) {
      await payload
        .update({ collection: 'interviews', id: recordId, data: { recommendation, status: 'generated' } })
        .catch((err) => console.error('[interviews] DB update error', err))
    }

    return NextResponse.json({ ok: true, recommendation }, { status: 200 })
  } catch (err) {
    console.error('[interviews] Claude error', err)
    if (recordId !== undefined) {
      await payload.update({ collection: 'interviews', id: recordId, data: { status: 'failed' } }).catch(() => {})
    }
    return NextResponse.json(
      { message: 'We could not generate your recommendations right now. Please try again.' },
      { status: 500 },
    )
  }
}
