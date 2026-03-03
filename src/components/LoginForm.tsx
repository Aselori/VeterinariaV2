'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-warm-100 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-warm-200 focus:border-transparent transition'

const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5'

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    setIsLoading(false)

    if (result?.error) {
      setError('Correo o contraseña incorrectos.')
      return
    }

    // Fetch session to get role for redirect
    const res = await fetch('/api/auth/session')
    const session = await res.json()

    if (session?.user?.role === 'ADMIN') {
      router.push('/admin')
    } else {
      router.push('/')
    }

    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="email" className={labelClass}>
          Correo Electrónico
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="correo@ejemplo.com"
          required
          autoComplete="email"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="password" className={labelClass}>
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          autoComplete="current-password"
          className={inputClass}
        />
      </div>

      {error && (
        <p className="text-sm text-red-500 dark:text-red-400 text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-warm-200 text-gray-800 font-medium rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
      >
        {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </button>
    </form>
  )
}
