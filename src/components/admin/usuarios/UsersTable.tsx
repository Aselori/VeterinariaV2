'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import EditRoleModal from './EditRoleModal'
import DeleteConfirmModal from '@/components/admin/citas/DeleteConfirmModal'

interface UserRow {
  id: string
  name: string | null
  email: string
  role: string
  createdAt: string
  updatedAt: string
}

interface Props {
  initialUsers: UserRow[]
}

export default function UsersTable({ initialUsers }: Props) {
  const { data: session } = useSession()
  const [users, setUsers] = useState<UserRow[]>(initialUsers)
  const [editTarget, setEditTarget] = useState<UserRow | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<UserRow | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  const handleRoleSaved = (userId: string, newRole: string) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)))
    setEditTarget(null)
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleteLoading(true)
    setDeleteError('')
    try {
      const res = await fetch(`/api/admin/users/${deleteTarget.id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) {
        setDeleteError(data.error ?? 'Error al eliminar')
        return
      }
      setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id))
      setDeleteTarget(null)
    } finally {
      setDeleteLoading(false)
    }
  }

  return (
    <>
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-warm-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-warm-100 dark:border-slate-700">
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Correo</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Rol</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Registrado</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-100 dark:divide-slate-700">
              {users.map((user) => {
                const isCurrentUser = session?.user?.id === user.id
                return (
                  <tr key={user.id} className="hover:bg-warm-50/50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-5 py-3 font-medium text-gray-800 dark:text-gray-200">
                      {user.name ?? '—'}
                      {isCurrentUser && (
                        <span className="ml-2 text-xs text-gray-400 dark:text-gray-500">(tú)</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-gray-600 dark:text-gray-400">{user.email}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === 'ADMIN'
                          ? 'bg-warm-200 text-gray-800'
                          : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-500 dark:text-gray-400 text-xs">
                      {new Date(user.createdAt).toLocaleDateString('es-MX', {
                        year: 'numeric', month: 'short', day: 'numeric',
                      })}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditTarget(user)}
                          className="text-xs px-2.5 py-1 rounded-lg bg-warm-50 dark:bg-slate-700 text-gray-600 dark:text-gray-400 hover:bg-warm-100 dark:hover:bg-slate-600 transition-colors"
                        >
                          Rol
                        </button>
                        <button
                          onClick={() => { setDeleteError(''); setDeleteTarget(user) }}
                          disabled={isCurrentUser}
                          className="text-xs px-2.5 py-1 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {users.length === 0 && (
            <p className="px-6 py-8 text-center text-sm text-gray-400 dark:text-gray-500">
              Sin usuarios.
            </p>
          )}
        </div>
      </div>

      {editTarget && (
        <EditRoleModal
          userId={editTarget.id}
          currentRole={editTarget.role}
          userName={editTarget.name ?? editTarget.email}
          onClose={() => setEditTarget(null)}
          onSaved={handleRoleSaved}
        />
      )}

      {deleteTarget && (
        <>
          {deleteError && (
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 px-4 py-2 rounded-xl text-sm shadow z-50">
              {deleteError}
            </div>
          )}
          <DeleteConfirmModal
            message={`¿Eliminar a ${deleteTarget.name ?? deleteTarget.email}? Esta acción no se puede deshacer.`}
            onConfirm={handleDelete}
            onCancel={() => setDeleteTarget(null)}
            loading={deleteLoading}
          />
        </>
      )}
    </>
  )
}
