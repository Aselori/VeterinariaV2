'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

const pillClass =
  'rounded-full bg-warm-50/80 dark:bg-slate-900/80 backdrop-blur-md border border-warm-100 dark:border-slate-700 shadow-sm flex items-center'

const iconBtnClass =
  'w-10 h-10 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors'

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  )
}

function LogoutIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  )
}

export default function NavbarAuth() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div className={`${pillClass} w-10 h-10 animate-pulse`} />
  }

  if (!session) {
    return (
      <Link
        href="/login"
        aria-label="Iniciar sesión"
        title="Iniciar sesión"
        className={`${pillClass} ${iconBtnClass}`}
      >
        <UserIcon />
      </Link>
    )
  }

  const isAdmin = session.user?.role === 'ADMIN'

  return (
    <div className={`${pillClass} group overflow-hidden transition-all duration-200 ease-out`}>
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        aria-label="Cerrar sesión"
        title="Cerrar sesión"
        className={iconBtnClass}
      >
        <LogoutIcon />
      </button>
      {isAdmin && (
        <Link
          href="/admin"
          aria-label="Panel de administración"
          title="Panel"
          className="flex items-center justify-center h-8 my-1 mr-1 rounded-full bg-warm-200 text-sm font-medium text-gray-800 hover:opacity-90 w-0 px-0 opacity-0 group-hover:w-[4.5rem] group-hover:px-4 group-hover:opacity-100 overflow-hidden transition-all duration-200 ease-out whitespace-nowrap"
        >
          Panel
        </Link>
      )}
    </div>
  )
}
