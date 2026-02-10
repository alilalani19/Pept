import { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'
import anthropic from '@/lib/claude/client'
import { getSystemPrompt } from '@/lib/claude/system-prompt'
import { injectPeptideContext, getSupplierList } from '@/lib/claude/context-injector'
import { validateInput, sanitizeOutput } from '@/lib/claude/guardrails'
import { checkRateLimit } from '@/lib/claude/rate-limiter'
import { chatMessageSchema } from '@/lib/validators/chat'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    // Auth is optional — anonymous users can still chat
    const session = await auth()
    const userId = session?.user?.id
    const isAuthenticated = !!userId

    // Rate limiting: use userId for authenticated users, IP for anonymous
    const rateLimitKey = isAuthenticated
      ? userId!
      : req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anonymous'

    const { success } = await checkRateLimit(rateLimitKey)
    if (!success) {
      return Response.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await req.json()
    const parsed = chatMessageSchema.safeParse(body)
    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.issues?.[0]?.message || 'Invalid input' },
        { status: 400 }
      )
    }

    const { message, sessionId, peptideSlug } = parsed.data

    const inputValidation = validateInput(message)
    if (!inputValidation.safe) {
      return Response.json(
        { error: inputValidation.reason },
        { status: 400 }
      )
    }

    // Get or create chat session (only for authenticated users)
    let chatSession: any = null
    if (isAuthenticated) {
      if (sessionId) {
        chatSession = await prisma.chatSession.findFirst({
          where: { id: sessionId, userId: userId },
          include: { messages: { orderBy: { createdAt: 'asc' }, take: 20 } },
        })
      }

      if (!chatSession) {
        chatSession = await prisma.chatSession.create({
          data: {
            userId: userId!,
            title: message.slice(0, 100),
          },
          include: { messages: true },
        })
      }

      // Save user message
      await prisma.chatMessage.create({
        data: {
          sessionId: chatSession.id,
          role: 'USER',
          content: message,
        },
      })
    }

    // Build system prompt with optional peptide context and supplier list
    let peptideContext: string | null = null
    if (peptideSlug) {
      peptideContext = await injectPeptideContext(peptideSlug)
    }

    // Always inject supplier list so AI can reference suppliers with websites
    const supplierList = await getSupplierList()
    let fullContext = peptideContext || ''
    if (supplierList) {
      fullContext += (fullContext ? '\n\n' : '') + `VETTED SUPPLIERS DIRECTORY:\n${supplierList}`
    }

    const systemPrompt = getSystemPrompt(fullContext || undefined)

    // Build message history
    const conversationHistory = chatSession?.messages
      ? chatSession.messages.map((msg: any) => ({
          role: msg.role === 'USER' ? ('user' as const) : ('assistant' as const),
          content: msg.content,
        }))
      : []

    conversationHistory.push({ role: 'user', content: message })

    // Stream response
    const stream = anthropic.messages.stream({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      system: systemPrompt,
      messages: conversationHistory,
    })

    let fullResponse = ''

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              const text = sanitizeOutput(event.delta.text)
              fullResponse += text
              controller.enqueue(new TextEncoder().encode(text))
            }
          }

          // Save assistant response (only for authenticated users)
          if (isAuthenticated && chatSession) {
            await prisma.chatMessage.create({
              data: {
                sessionId: chatSession.id,
                role: 'ASSISTANT',
                content: fullResponse,
              },
            })
          }

          controller.close()
        } catch (error) {
          console.error('Stream error:', error)
          controller.error(error)
        }
      },
    })

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        ...(chatSession?.id && { 'X-Session-Id': chatSession.id }),
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
