import { NextRequest } from 'next/server'

export const runtime = 'edge'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(req: NextRequest) {
  const cloudRunUrl = process.env.VELOM_CLOUD_RUN_URL
  const secret = process.env.VELOM_API_SECRET

  if (!cloudRunUrl || !secret) {
    return new Response(JSON.stringify({ error: 'Velom not configured' }), { status: 503 })
  }

  let messages: Message[]
  try {
    const body = await req.json()
    messages = body.messages
    if (!Array.isArray(messages) || messages.length === 0) throw new Error('invalid')
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 })
  }

  const upstream = await fetch(`${cloudRunUrl}/api/v1/velom/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Velom-Secret': secret,
    },
    body: JSON.stringify({ messages }),
  })

  if (!upstream.ok) {
    const err = await upstream.text()
    console.error('[velom-chat] upstream error', upstream.status, err)
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
