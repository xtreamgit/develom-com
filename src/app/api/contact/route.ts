import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 })
  }

  const { name, email, company, service, message } = body as {
    name?: string
    email?: string
    company?: string
    service?: string
    message?: string
  }

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return NextResponse.json({ message: 'Please enter your full name.' }, { status: 422 })
  }
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: 'Please enter a valid email address.' }, { status: 422 })
  }
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    return NextResponse.json({ message: 'Please include a message (at least 10 characters).' }, { status: 422 })
  }

  const trimmed = {
    name: name.trim(),
    email: email.trim(),
    company: typeof company === 'string' ? company.trim() : '',
    service: typeof service === 'string' ? service.trim() : '',
    message: message.trim(),
    submittedAt: new Date().toISOString(),
  }

  console.log('[contact-form]', trimmed)

  const resendKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL ?? 'contact@agents.develom.com'
  const fromEmail = process.env.EMAIL_FROM ?? 'contact@develom.com'

  if (resendKey) {
    const payload = {
      from: `Develom Contact <${fromEmail}>`,
      to: [toEmail],
      reply_to: trimmed.email,
      subject: `New contact: ${trimmed.name}${trimmed.company ? ` — ${trimmed.company}` : ''}`,
      text: [
        `Name: ${trimmed.name}`,
        `Email: ${trimmed.email}`,
        trimmed.company ? `Company: ${trimmed.company}` : null,
        trimmed.service ? `Service: ${trimmed.service}` : null,
        '',
        `Message:\n${trimmed.message}`,
        '',
        `Submitted: ${trimmed.submittedAt}`,
      ]
        .filter((l) => l !== null)
        .join('\n'),
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      console.error('[contact-form] Resend error', res.status, await res.text())
      // Still return 200 — form submitted successfully even if email delivery fails
    }
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
