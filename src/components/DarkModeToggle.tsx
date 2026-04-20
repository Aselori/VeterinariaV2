'use client'

import { useEffect, useState } from 'react'
import { useDarkMode } from '@/context/DarkModeContext'

export default function DarkModeToggle() {
  const { isDark, toggle } = useDarkMode()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <button
      onClick={toggle}
      aria-label="Cambiar modo oscuro"
      className="w-10 h-10 flex items-center justify-center rounded-full bg-warm-50/80 dark:bg-slate-900/80 backdrop-blur-md border border-warm-100 dark:border-slate-700 shadow-sm text-gray-700 dark:text-gray-300 hover:bg-warm-100 dark:hover:bg-slate-700 transition-colors text-sm"
    >
      {mounted ? (isDark ? '☀️' : '🌙') : '🌙'}
    </button>
  )
}
