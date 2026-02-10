import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { authConfig } from '@/lib/auth.config'
import NextAuth from 'next-auth'

const { auth } = NextAuth(authConfig)

export default auth(async function proxy(req: NextRequest & { auth: any }) {
  const { pathname } = req.nextUrl

  // Protect /account routes
  if (pathname.startsWith('/account') && !req.auth) {
    const signInUrl = new URL('/api/auth/signin', req.url)
    signInUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(signInUrl)
  }

  // Protect /admin routes
  if (pathname.startsWith('/admin')) {
    if (!req.auth) {
      const signInUrl = new URL('/api/auth/signin', req.url)
      signInUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(signInUrl)
    }
    if (req.auth.user?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/account/:path*', '/admin/:path*'],
}
