import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return Response.json({ error: 'Authentication required' }, { status: 401 })
    }

    const { sessionId } = await params

    const chatSession = await prisma.chatSession.findFirst({
      where: { id: sessionId, userId: session.user.id },
      include: {
        messages: { orderBy: { createdAt: 'asc' } },
      },
    })

    if (!chatSession) {
      return Response.json({ error: 'Session not found' }, { status: 404 })
    }

    return Response.json(chatSession)
  } catch (error) {
    console.error('Chat session fetch error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return Response.json({ error: 'Authentication required' }, { status: 401 })
    }

    const { sessionId } = await params

    await prisma.chatSession.deleteMany({
      where: { id: sessionId, userId: session.user.id },
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Chat session delete error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
