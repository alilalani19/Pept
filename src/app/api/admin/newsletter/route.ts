import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import {
  sendNewsletterToAll,
  sendNewsletterToEmails,
} from '@/lib/email/send-notifications'
import { z } from 'zod'

const newsletterSchema = z.object({
  subject: z.string().min(1, 'Subject is required').max(200),
  body: z.string().min(1, 'Body is required').max(50000),
  emails: z.array(z.string().email()).optional(),
})

export async function GET() {
  const session = await auth()
  if (!session?.user || session.user.role !== 'ADMIN') {
    return Response.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const users = await prisma.user.findMany({
    where: { email: { not: null } },
    select: { id: true, name: true, email: true },
    orderBy: { name: 'asc' },
  })

  return Response.json({ users })
}

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

  const { subject, body, emails } = parsed.data

  const count = emails
    ? await sendNewsletterToEmails(emails, subject, body)
    : await sendNewsletterToAll(subject, body)

  return Response.json({ success: true, sent: count })
}
