'use client'

import { useState } from 'react'
import { NAV_LINKS } from '@/constants/navigation'
import DarkModeToggle from './DarkModeToggle'
import NavbarAuth from './NavbarAuth'

const pillClass =
  'rounded-full bg-warm-50/80 dark:bg-slate-900/80 backdrop-blur-md border border-warm-100 dark:border-slate-700 shadow-sm'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <div className="sticky top-4 z-50 mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-4">
        {/* Title pill — pushed to the right edge of its column so it sits next to sections */}
        <div className={`${pillClass} h-12 px-5 flex items-center justify-self-end`}>
          <span className="font-semibold text-base text-gray-800 dark:text-gray-100">
            VetClinic
          </span>
        </div>

        {/* Sections pill — center auto column, so it lands on screen center when side cols are equal */}
        <nav className={`${pillClass} hidden md:block h-12 px-6`}>
          <ul className="flex items-center gap-5 h-full">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right side: dark mode + auth — pushed to the left edge of its column so they sit next to sections */}
        <div className="flex items-center gap-2 justify-self-start">
          <DarkModeToggle />
          <NavbarAuth />
          <button
            className={`${pillClass} md:hidden w-10 h-10 flex items-center justify-center text-gray-700 dark:text-gray-300 text-sm`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Abrir menú"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className={`${pillClass} md:hidden sticky top-20 z-40 mx-4 mt-2 px-6 py-5`}
        >
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
