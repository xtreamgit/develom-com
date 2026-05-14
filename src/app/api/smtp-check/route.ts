import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    smtp_host: !!process.env.SMTP_HOST,
    smtp_user: !!process.env.SMTP_USER,
    smtp_pass: !!process.env.SMTP_PASS,
    smtp_port: process.env.SMTP_PORT ?? '(not set, defaults to 465)',
    contact_to_email: process.env.CONTACT_TO_EMAIL ?? '(not set, defaults to hector@develom.com)',
    all_present: !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS),
  })
}
