import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 })
  }

  const { name, email, company, source } = body as {
    name?: string
    email?: string
    company?: string
    source?: string
  }

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return NextResponse.json({ message: 'Please enter your full name.' }, { status: 422 })
  }
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: 'Please enter a valid email address.' }, { status: 422 })
  }

  const trimmed = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    company: typeof company === 'string' ? company.trim() : undefined,
    source: typeof source === 'string' ? source.trim() : 'ai-governance-guide',
  }

  try {
    const payload = await getPayload({ config: configPromise })
    await payload.create({
      collection: 'leads',
      data: trimmed,
    })
  } catch (err) {
    console.error('[leads] DB insert error', err)
  }

  const smtpHost = process.env.SMTP_HOST
  const smtpPort = parseInt(process.env.SMTP_PORT ?? '465', 10)
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const toEmail = process.env.CONTACT_TO_EMAIL ?? 'hector@develom.com'
  const fromEmail = process.env.EMAIL_FROM ?? smtpUser ?? 'contact@develom.com'

  if (smtpHost && smtpUser && smtpPass) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass },
      } as any)

      await transporter.sendMail({
        from: `Develom <${fromEmail}>`,
        to: toEmail,
        subject: `New lead: ${trimmed.name}${trimmed.company ? ` — ${trimmed.company}` : ''} [AI Governance Guide]`,
        text: [
          `New lead captured via AI Governance Guide page.`,
          '',
          `Name: ${trimmed.name}`,
          `Email: ${trimmed.email}`,
          trimmed.company ? `Company: ${trimmed.company}` : null,
          `Source: ${trimmed.source}`,
          '',
          `Submitted: ${new Date().toISOString()}`,
        ]
          .filter((l) => l !== null)
          .join('\n'),
      })
    } catch (err) {
      console.error('[leads] SMTP error', err)
    }
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
