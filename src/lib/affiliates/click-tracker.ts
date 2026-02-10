import { prisma } from '@/lib/db'
import { createHash } from 'crypto'

export async function trackAffiliateClick({
  supplierId,
  peptideId,
  userId,
  ip,
  userAgent,
  referrer,
}: {
  supplierId: string
  peptideId?: string
  userId?: string
  ip: string
  userAgent: string
  referrer?: string
}) {
  const ipHash = createHash('sha256').update(ip).digest('hex').slice(0, 16)

  return prisma.affiliateClick.create({
    data: {
      supplierId,
      peptideId: peptideId || null,
      userId: userId || null,
      ipHash,
      userAgent: userAgent.slice(0, 500),
      referrer: referrer?.slice(0, 500) || null,
    },
  })
}
