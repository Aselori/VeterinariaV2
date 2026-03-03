'use client'

import { useDarkMode } from '@/context/DarkModeContext'

export default function DarkModeToggle() {
  const { isDark, toggle } = useDarkMode()

  return (
    <button
      onClick={toggle}
      aria-label="Cambiar modo oscuro"
      className="w-9 h-9 flex items-center justify-center rounded-full bg-warm-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-warm-200 dark:hover:bg-slate-600 transition-colors text-sm"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}
