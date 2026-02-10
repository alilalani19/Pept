import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

function createRateLimiter() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null
  }

  return new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(30, '1 h'),
    analytics: true,
    prefix: 'pept:chat',
  })
}

export const rateLimiter = createRateLimiter()

export async function checkRateLimit(
  identifier: string
): Promise<{ success: boolean; remaining: number }> {
  if (!rateLimiter) {
    return { success: true, remaining: 999 }
  }

  const { success, remaining } = await rateLimiter.limit(identifier)
  return { success, remaining }
}
