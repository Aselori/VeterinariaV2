import type { NextAuthConfig } from 'next-auth'

/**
 * Edge-compatible Auth config (no Prisma, no Node.js-only libs).
 * Used in middleware.ts for route protection.
 */
export const authConfig = {
  trustHost: true,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isAdmin = auth?.user?.role === 'ADMIN'

      if (nextUrl.pathname.startsWith('/admin')) {
        return isAdmin
      }

      if (nextUrl.pathname.startsWith('/dashboard')) {
        return isLoggedIn
      }

      return true
    },
    jwt({ token, user }) {
      if (user?.role) token.role = user.role as 'USER' | 'ADMIN'
      return token
    },
    session({ session, token }) {
      if (token.role) session.user.role = token.role as 'USER' | 'ADMIN'
      return session
    },
  },
  providers: [],
} satisfies NextAuthConfig
