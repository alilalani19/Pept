import { NextRequest, NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { Resend } from 'resend'
import { prisma } from '@/lib/db'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const body = await req.text()

  const svixId = req.headers.get('svix-id')
  const svixTimestamp = req.headers.get('svix-timestamp')
  const svixSignature = req.headers.get('svix-signature')

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 })
  }

  const secret = process.env.RESEND_WEBHOOK_SECRET
  if (!secret) {
    console.error('RESEND_WEBHOOK_SECRET is not set')
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  }

  let event: { type: string; data: { email_id: string; from: string; to: string[]; subject: string } }

  try {
    const wh = new Webhook(secret)
    event = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as typeof event
  } catch {
    console.error('Webhook signature verification failed')
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type !== 'email.received') {
    return NextResponse.json({ received: true })
  }

  const { email_id, from, to, subject } = event.data

  try {
    const full = await resend.emails.receiving.get(email_id)

    if (full.error) {
      console.error('Failed to fetch inbound email:', full.error)
      return NextResponse.json({ error: 'Failed to fetch email' }, { status: 500 })
    }

    await prisma.inboundEmail.create({
      data: {
        emailId: email_id,
        from,
        to: to.join(', '),
        subject,
        html: full.data?.html ?? null,
        text: full.data?.text ?? null,
      },
    })
  } catch (err) {
    console.error('Error processing inbound email:', err)
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
