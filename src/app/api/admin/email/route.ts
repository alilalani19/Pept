import { auth } from '@/lib/auth'
import { sendPlainEmail } from '@/lib/email/client'
import { z } from 'zod'

const emailSchema = z.object({
  to: z.string().email('Invalid recipient email'),
  subject: z.string().min(1, 'Subject is required').max(200),
  body: z.string().min(1, 'Body is required').max(50000),
})

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user || !['ADMIN', 'EMPLOYEE'].includes(session.user.role)) {
    return Response.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const data = await req.json()
  const parsed = emailSchema.safeParse(data)
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    )
  }

  const { to, subject, body } = parsed.data

  const fullName = session.user.name || 'Pept'
  const fromEmail = 'team@pept.me'
  const fromName = fullName

  // Convert plain text to HTML: escape HTML entities, preserve line breaks and paragraphs
  const htmlBody = body
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n\n+/g, '</p><p>')
    .replace(/\n/g, '<br>')
  const html = `<div style="font-family: sans-serif; font-size: 14px; line-height: 1.6; color: #333;"><p>${htmlBody}</p></div>`

  try {
    await sendPlainEmail(to, subject, html, fromName, fromEmail)
    return Response.json({ success: true, from: fromEmail })
  } catch {
    return Response.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
