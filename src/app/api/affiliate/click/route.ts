import { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'
import { trackAffiliateClick } from '@/lib/affiliates/click-tracker'
import { z } from 'zod'

const clickSchema = z.object({
  supplierId: z.string().cuid(),
  peptideId: z.string().cuid().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    const body = await req.json()
    const parsed = clickSchema.safeParse(body)

    if (!parsed.success) {
      return Response.json({ error: 'Invalid input' }, { status: 400 })
    }

    const rawIp = req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const ip = /^[\d.:a-fA-F]+$/.test(rawIp) ? rawIp : 'unknown'
    const userAgent = req.headers.get('user-agent') || 'unknown'
    const referrer = req.headers.get('referer') || undefined

    await trackAffiliateClick({
      supplierId: parsed.data.supplierId,
      peptideId: parsed.data.peptideId,
      userId: session?.user?.id,
      ip,
      userAgent,
      referrer,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Affiliate click tracking error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
