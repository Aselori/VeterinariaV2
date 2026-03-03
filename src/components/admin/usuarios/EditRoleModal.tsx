'use client'

import { useState } from 'react'

interface Props {
  userId: string
  currentRole: string
  userName: string
  onClose: () => void
  onSaved: (userId: string, newRole: string) => void
}

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-warm-100 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-warm-200 focus:border-transparent transition'

export default function EditRoleModal({ userId, currentRole, userName, onClose, onSaved }: Props) {
  const [role, setRole] = useState(currentRole)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Error al guardar')
        return
      }
      onSaved(userId, data.role)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-warm-100 dark:border-slate-700 shadow-xl w-full max-w-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">
            Editar Rol
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl leading-none">×</button>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{userName}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Rol</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className={inputClass}>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 bg-warm-50 dark:bg-slate-700 hover:bg-warm-100 dark:hover:bg-slate-600 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-xl text-sm font-medium text-gray-800 bg-warm-200 hover:bg-warm-300 transition-colors disabled:opacity-50"
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
