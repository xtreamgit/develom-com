import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import nodemailer from 'nodemailer'

const MARA_EMAIL = 'mara@agents.develom.com'

const PLATFORM_LABEL: Record<string, string> = {
  linkedin: 'LinkedIn',
  x: 'X / Twitter',
}

function buildEmailHtml(post: {
  postTitle: string
  platform: string
  postText: string
  scheduledAt?: string
  adminUrl: string
}): string {
  const platformLabel = PLATFORM_LABEL[post.platform] ?? post.platform
  const scheduledLine = post.scheduledAt
    ? `<p style="margin:0 0 8px"><strong>Scheduled:</strong> ${new Date(post.scheduledAt).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}</p>`
    : ''

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#F8F9FA;font-family:'DM Sans',Arial,sans-serif">
  <div style="max-width:560px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #E2E8F0">
    <div style="background:#0D1B2A;padding:24px 32px">
      <img src="https://develom.com/develom_logo.svg" alt="Develom" height="28" style="display:block">
    </div>
    <div style="padding:32px">
      <p style="margin:0 0 4px;font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#64748B">
        Social post approved
      </p>
      <h1 style="margin:0 0 24px;font-size:22px;font-weight:700;color:#0D1B2A;line-height:1.3">
        ${post.postTitle}
      </h1>
      <p style="margin:0 0 8px"><strong>Platform:</strong> ${platformLabel}</p>
      ${scheduledLine}
      <div style="margin:20px 0;padding:16px;background:#F8F9FA;border-radius:8px;border-left:3px solid #2563EB">
        <p style="margin:0;font-size:14px;line-height:1.7;color:#374151;white-space:pre-wrap">${post.postText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
      </div>
      <p style="margin:0 0 24px;font-size:14px;color:#64748B">
        Hector has approved this post. Please schedule it on ${platformLabel} at your earliest convenience.
      </p>
      <a href="${post.adminUrl}" style="display:inline-block;background:#2563EB;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px">
        View in CMS →
      </a>
    </div>
    <div style="padding:16px 32px;background:#F8F9FA;border-top:1px solid #E2E8F0">
      <p style="margin:0;font-size:12px;color:#94A3B8">Develom CMS · Auto-notification on post approval</p>
    </div>
  </div>
</body>
</html>`
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const payload = await getPayload({ config: configPromise })

  const { user } = await payload.auth({ headers: req.headers })
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  let existing: Record<string, unknown>
  try {
    existing = (await payload.findByID({
      collection: 'social-posts',
      id,
      depth: 0,
    })) as unknown as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  if (existing.status === 'approved') {
    return NextResponse.json({ error: 'Already approved' }, { status: 409 })
  }

  const now = new Date().toISOString()

  await payload.update({
    collection: 'social-posts',
    id,
    data: {
      status: 'approved',
      notifiedAt: now,
    },
  })

  const smtpHost = process.env.SMTP_HOST
  const smtpPort = parseInt(process.env.SMTP_PORT ?? '465', 10)
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const fromEmail = process.env.EMAIL_FROM ?? 'contact@agents.develom.com'
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? 'https://develom.com'

  const postTitle = (existing.postTitle as string) ?? 'Untitled'
  const adminUrl = `${serverUrl}/admin/collections/social-posts/${id}`

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
        from: `Develom CMS <${fromEmail}>`,
        to: MARA_EMAIL,
        subject: `✅ Post approved: ${postTitle}`,
        html: buildEmailHtml({
          postTitle,
          platform: (existing.platform as string) ?? 'linkedin',
          postText: (existing.postText as string) ?? '',
          scheduledAt: existing.scheduledAt as string | undefined,
          adminUrl,
        }),
        text: [
          `Post approved: ${postTitle}`,
          `Platform: ${PLATFORM_LABEL[(existing.platform as string) ?? 'linkedin'] ?? existing.platform}`,
          existing.scheduledAt ? `Scheduled: ${existing.scheduledAt}` : null,
          '',
          existing.postText as string,
          '',
          `View in CMS: ${adminUrl}`,
        ]
          .filter((l) => l !== null)
          .join('\n'),
      })
    } catch (err) {
      console.error('[social-posts/publish] email error', err)
      // Don't fail the publish — status is already updated
    }
  }

  return NextResponse.json({ ok: true, notifiedAt: now })
}
