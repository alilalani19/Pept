import { auth } from '@/lib/auth'
import { sendNewsletterToAll } from '@/lib/email/send-notifications'
import { z } from 'zod'

const newsletterSchema = z.object({
  subject: z.string().min(1, 'Subject is required').max(200),
  body: z.string().min(1, 'Body is required').max(50000),
})

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'ADMIN') {
    return Response.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const data = await req.json()
  const parsed = newsletterSchema.safeParse(data)
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    )
  }

  const count = await sendNewsletterToAll(parsed.data.subject, parsed.data.body)

  return Response.json({ success: true, sent: count })
}
