'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import DarkModeToggle from '@/components/DarkModeToggle'

const navLinks = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/citas', label: 'Citas' },
  { href: '/admin/mensajes', label: 'Mensajes' },
  { href: '/admin/usuarios', label: 'Usuarios' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed top-0 left-0 h-full w-56 bg-white dark:bg-slate-800 border-r border-warm-100 dark:border-slate-700 flex flex-col z-40">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-warm-100 dark:border-slate-700">
        <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-0.5">
          VetClinic
        </p>
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          Administración
        </span>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navLinks.map((link) => {
          const isActive =
            link.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(link.href)
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-warm-100 dark:bg-slate-700 text-gray-800 dark:text-gray-100'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-warm-50 dark:hover:bg-slate-700/60 hover:text-gray-800 dark:hover:text-gray-100'
              }`}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 py-4 border-t border-warm-100 dark:border-slate-700 flex items-center justify-around">
        <Link
          href="/"
          aria-label="Ir al sitio público"
          title="Ir al sitio público"
          className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:bg-warm-50 dark:hover:bg-slate-700/60 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M3 12 12 3l9 9" />
            <path d="M5 10v10h14V10" />
          </svg>
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          aria-label="Cerrar sesión"
          title="Cerrar sesión"
          className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <path d="m16 17 5-5-5-5" />
            <path d="M21 12H9" />
          </svg>
        </button>
        <DarkModeToggle />
      </div>
    </aside>
  )
}
