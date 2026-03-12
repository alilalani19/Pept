import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { sendEmail } from '@/lib/email/client'
import { z } from 'zod'
import { checkEndpointRateLimit } from '@/lib/claude/rate-limiter'

const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const { success } = checkEndpointRateLimit('newsletter-subscribe', ip, 5, 15 * 60 * 1000)
    if (!success) {
      return Response.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await req.json()
    const parsed = subscribeSchema.safeParse(body)
    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      )
    }

    const { email } = parsed.data

    await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: { active: true },
      create: { email },
    })

    await sendEmail(
      email,
      'Welcome to the Pept Newsletter!',
      `<div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #0ea5e9;">Thanks for subscribing!</h2>
        <p>You're now on the Pept newsletter list. We'll keep you updated with the latest peptide research, new content, and platform updates.</p>
        <p style="color: #64748b; font-size: 14px;">If you didn't subscribe, you can safely ignore this email.</p>
      </div>`
    )

    return Response.json({ success: true })
  } catch {
    return Response.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
