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

  // Log submission server-side — wire up to Resend / SendGrid / etc. when ready
  console.log('[contact-form]', {
    name: name.trim(),
    email: email.trim(),
    company: typeof company === 'string' ? company.trim() : '',
    service: typeof service === 'string' ? service : '',
    message: message.trim(),
    submittedAt: new Date().toISOString(),
  })

  // TODO: send email via Resend — add RESEND_API_KEY to .env.local
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // await resend.emails.send({
  //   from: 'contact@develom.com',
  //   to: 'hector@develom.com',
  //   subject: `New contact form submission from ${name}`,
  //   text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nService: ${service}\nMessage:\n${message}`,
  // })

  return NextResponse.json({ ok: true }, { status: 200 })
}
