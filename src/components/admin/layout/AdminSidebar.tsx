'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import DarkModeToggle from '@/components/DarkModeToggle'

const navLinks = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/citas', label: 'Citas' },
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
      <div className="px-3 py-4 border-t border-warm-100 dark:border-slate-700 space-y-2">
        <div className="flex items-center justify-between px-3 py-1">
          <span className="text-xs text-gray-400 dark:text-gray-500">Tema</span>
          <DarkModeToggle />
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors"
        >
          Cerrar Sesión
        </button>
      </div>
    </aside>
  )
}
