import type { NextAuthConfig } from 'next-auth'

// Edge-safe config — no Node.js-only imports (bcrypt, prisma)
// Used by proxy.ts for JWT verification on the edge
export const authConfig: NextAuthConfig = {
  providers: [], // Providers added in auth.ts (not edge-safe)
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role || 'USER'
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
}
