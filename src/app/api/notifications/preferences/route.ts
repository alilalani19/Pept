import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const prefsSchema = z.object({
  emailSignInAlert: z.boolean(),
  emailNewPeptide: z.boolean(),
  emailNewsletter: z.boolean(),
})

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      emailSignInAlert: true,
      emailNewPeptide: true,
      emailNewsletter: true,
    },
  })

  return Response.json(user)
}

export async function PUT(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const parsed = prefsSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    )
  }

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: parsed.data,
    select: {
      emailSignInAlert: true,
      emailNewPeptide: true,
      emailNewsletter: true,
    },
  })

  return Response.json(user)
}
