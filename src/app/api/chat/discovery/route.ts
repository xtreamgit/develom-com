import { NextRequest } from 'next/server'

export const runtime = 'edge'

const SYSTEM_PROMPT = `You are Velom, Develom's AI discovery guide. Your job is to help visitors understand which of Develom's AI solutions fits their needs.

Be warm, concise, and conversational. Ask one question at a time. After 4–5 exchanges, recommend 1–2 specific solutions.

Develom's six solutions for regulated enterprises:
1. AI Document Processing — extracts, classifies, and routes documents automatically (contracts, invoices, compliance filings)
2. Compliance Monitoring Agent — continuously monitors operations against regulatory rules and flags violations before they become fines
3. Secure Internal Knowledge Base — lets teams query internal documents and policies using AI, with all data staying on-premise
4. Automated Regulatory Reporting — generates required regulatory reports from raw operational data, reducing manual effort by 80%+
5. AI-Assisted Due Diligence — accelerates M&A, lending, and vendor evaluation by surfacing risks in large document sets
6. Agentic Workflow Orchestration — connects AI agents across existing tools (CRM, ERP, email) to automate multi-step business processes

Discovery flow:
- First, ask what industry they're in
- Then ask about their biggest operational pain point
- Then ask about their compliance or regulatory environment
- Then ask about team size / scale
- Then recommend the best-fit solution(s) with a brief explanation of why

Keep replies short — 2–4 sentences max. End your recommendation with a soft CTA to book a discovery call at develom.com/contact.`

interface AnthropicMessage {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Not configured' }), { status: 503 })
  }

  let messages: AnthropicMessage[]
  try {
    const body = await req.json()
    messages = body.messages
    if (!Array.isArray(messages) || messages.length === 0) throw new Error('invalid')
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 })
  }

  const upstream = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      stream: true,
      system: SYSTEM_PROMPT,
      messages,
    }),
  })

  if (!upstream.ok) {
    const err = await upstream.text()
    console.error('[velom-chat] Anthropic error', upstream.status, err)
    return new Response(JSON.stringify({ error: 'Upstream error' }), { status: 502 })
  }

  return new Response(upstream.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'X-Accel-Buffering': 'no',
    },
  })
}
