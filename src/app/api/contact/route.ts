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
        auth: { user: smtpUser, pass: smtpPass },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)

      const internalText = [
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
        .join('\n')

      // Internal notification to team
      await transporter.sendMail({
        from: `Develom Contact <${fromEmail}>`,
        to: toEmail,
        replyTo: trimmed.email,
        subject: `New contact: ${trimmed.name}${trimmed.company ? ` — ${trimmed.company}` : ''}`,
        text: internalText,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e">
            <div style="background:#0a0f2e;padding:24px 32px;border-radius:8px 8px 0 0">
              <p style="color:#f59e0b;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 8px">New Contact Form Submission</p>
              <h1 style="color:#fff;font-size:22px;margin:0">${trimmed.name}${trimmed.company ? ` &mdash; ${trimmed.company}` : ''}</h1>
            </div>
            <div style="background:#f8f9ff;padding:24px 32px;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;border-top:none">
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:8px 0;color:#6b7280;width:100px;vertical-align:top">Name</td><td style="padding:8px 0;font-weight:600">${trimmed.name}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top">Email</td><td style="padding:8px 0"><a href="mailto:${trimmed.email}" style="color:#0a0f2e">${trimmed.email}</a></td></tr>
                ${trimmed.company ? `<tr><td style="padding:8px 0;color:#6b7280;vertical-align:top">Company</td><td style="padding:8px 0">${trimmed.company}</td></tr>` : ''}
                ${trimmed.service ? `<tr><td style="padding:8px 0;color:#6b7280;vertical-align:top">Service</td><td style="padding:8px 0">${trimmed.service}</td></tr>` : ''}
                <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top">Message</td><td style="padding:8px 0;white-space:pre-wrap">${trimmed.message}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top">Submitted</td><td style="padding:8px 0;color:#9ca3af;font-size:13px">${trimmed.submittedAt}</td></tr>
              </table>
              <div style="margin-top:20px">
                <a href="mailto:${trimmed.email}?subject=Re: Your inquiry to Develom" style="display:inline-block;background:#0a0f2e;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:14px">Reply to ${trimmed.name}</a>
              </div>
            </div>
          </div>`,
      })

      // Auto-reply to submitter
      await transporter.sendMail({
        from: `Develom <${fromEmail}>`,
        to: trimmed.email,
        subject: `We received your message, ${trimmed.name.split(' ')[0]}`,
        text: [
          `Hi ${trimmed.name.split(' ')[0]},`,
          '',
          'Thank you for reaching out to Develom. We received your message and will get back to you within one business day.',
          '',
          'Here is a summary of what you sent us:',
          '',
          trimmed.company ? `Company: ${trimmed.company}` : null,
          trimmed.service ? `Service of interest: ${trimmed.service}` : null,
          `Message: ${trimmed.message}`,
          '',
          'In the meantime, you can learn more about our AI solutions at develom.com.',
          '',
          '-- Develom Team',
          'develom.com',
        ]
          .filter((l) => l !== null)
          .join('\n'),
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e">
            <div style="background:#0a0f2e;padding:24px 32px;border-radius:8px 8px 0 0">
              <p style="color:#f59e0b;font-size:13px;letter-spacing:0.05em;margin:0 0 4px">Develom</p>
              <h1 style="color:#fff;font-size:22px;margin:0">We got your message.</h1>
            </div>
            <div style="background:#f8f9ff;padding:28px 32px;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;border-top:none">
              <p style="margin:0 0 16px">Hi ${trimmed.name.split(' ')[0]},</p>
              <p style="margin:0 0 16px">Thank you for reaching out. We received your inquiry and will get back to you within <strong>one business day</strong>.</p>
              ${trimmed.service ? `<p style="margin:0 0 16px">You expressed interest in: <strong>${trimmed.service}</strong></p>` : ''}
              <div style="background:#fff;border:1px solid #e5e7eb;border-radius:6px;padding:16px 20px;margin:20px 0">
                <p style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 8px">Your message</p>
                <p style="margin:0;white-space:pre-wrap;color:#374151">${trimmed.message}</p>
              </div>
              <p style="margin:0 0 24px;color:#6b7280;font-size:14px">While you wait, explore our solutions at <a href="https://develom.com" style="color:#0a0f2e">develom.com</a>.</p>
              <hr style="border:none;border-top:1px solid #e5e7eb;margin:0 0 16px">
              <p style="margin:0;color:#9ca3af;font-size:12px">Develom &bull; develom.com &bull; This is an automated confirmation.</p>
            </div>
          </div>`,
      })
    } catch (err) {
      console.error('[contact-form] SMTP error', err)
      // Still return 200 — submission accepted even if email delivery fails
    }
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
