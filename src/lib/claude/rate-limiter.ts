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

// In-memory fallback rate limiter for when Redis is not configured
const inMemoryStore = new Map<string, { count: number; resetAt: number }>()
const IN_MEMORY_WINDOW_MS = 60 * 60 * 1000 // 1 hour
const IN_MEMORY_MAX_REQUESTS = 30

function checkInMemoryRateLimit(identifier: string): { success: boolean; remaining: number } {
  const now = Date.now()
  const entry = inMemoryStore.get(identifier)

  if (!entry || now >= entry.resetAt) {
    inMemoryStore.set(identifier, { count: 1, resetAt: now + IN_MEMORY_WINDOW_MS })
    return { success: true, remaining: IN_MEMORY_MAX_REQUESTS - 1 }
  }

  if (entry.count >= IN_MEMORY_MAX_REQUESTS) {
    return { success: false, remaining: 0 }
  }

  inMemoryStore.set(identifier, { count: entry.count + 1, resetAt: entry.resetAt })
  return { success: true, remaining: IN_MEMORY_MAX_REQUESTS - entry.count - 1 }
}

export async function checkRateLimit(
  identifier: string
): Promise<{ success: boolean; remaining: number }> {
  if (!rateLimiter) {
    return checkInMemoryRateLimit(identifier)
  }

  const { success, remaining } = await rateLimiter.limit(identifier)
  return { success, remaining }
}

// Generic in-memory rate limiter for endpoints without Redis
const endpointStores = new Map<string, Map<string, { count: number; resetAt: number }>>()

export function checkEndpointRateLimit(
  endpoint: string,
  identifier: string,
  maxRequests: number,
  windowMs: number
): { success: boolean; remaining: number } {
  if (!endpointStores.has(endpoint)) {
    endpointStores.set(endpoint, new Map())
  }
  const store = endpointStores.get(endpoint)!
  const now = Date.now()
  const entry = store.get(identifier)

  if (!entry || now >= entry.resetAt) {
    store.set(identifier, { count: 1, resetAt: now + windowMs })
    return { success: true, remaining: maxRequests - 1 }
  }

  if (entry.count >= maxRequests) {
    return { success: false, remaining: 0 }
  }

  store.set(identifier, { count: entry.count + 1, resetAt: entry.resetAt })
  return { success: true, remaining: maxRequests - entry.count - 1 }
}
