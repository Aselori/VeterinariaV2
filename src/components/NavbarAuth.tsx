'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function NavbarAuth() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div className="w-20 h-8 rounded-full bg-warm-100 dark:bg-slate-700 animate-pulse" />
  }

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <span className="hidden sm:block text-sm text-gray-600 dark:text-gray-400 max-w-[120px] truncate">
          {session.user?.name ?? session.user?.email}
        </span>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="px-4 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-slate-600 rounded-full hover:border-warm-200 dark:hover:border-warm-200 transition-colors"
        >
          Salir
        </button>
      </div>
    )
  }

  return (
    <Link
      href="/login"
      className="px-4 py-1.5 text-sm font-medium bg-warm-200 text-gray-800 rounded-full hover:opacity-90 transition-opacity"
    >
      Iniciar Sesión
    </Link>
  )
}
