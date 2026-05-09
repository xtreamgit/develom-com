import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

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

  const smtpHost = process.env.SMTP_HOST
  const smtpPort = parseInt(process.env.SMTP_PORT ?? '465', 10)
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const toEmail = process.env.CONTACT_TO_EMAIL ?? 'contact@agents.develom.com'
  const fromEmail = process.env.EMAIL_FROM ?? smtpUser ?? 'contact@develom.com'

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser!, pass: smtpPass! },
      })

      await transporter.sendMail({
        from: `Develom Contact <${fromEmail}>`,
        to: toEmail,
        replyTo: trimmed.email,
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
      })
    } catch (err) {
      console.error('[contact-form] SMTP error', err)
      // Still return 200 — form submitted successfully even if email delivery fails
    }
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
