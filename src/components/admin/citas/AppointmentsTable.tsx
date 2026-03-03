'use client'

import { useState } from 'react'
import type { AppointmentRow } from '@/types/appointment'
import { SERVICES } from '@/constants/services'
import StatusBadge from './StatusBadge'
import AppointmentModal from './AppointmentModal'
import DeleteConfirmModal from './DeleteConfirmModal'

const STATUSES = ['pendiente', 'confirmada', 'completada', 'cancelada']
const PAGE_SIZE = 10

interface Props {
  initialAppointments: AppointmentRow[]
}

export default function AppointmentsTable({ initialAppointments }: Props) {
  const [appointments, setAppointments] = useState<AppointmentRow[]>(initialAppointments)
  const [filterStatus, setFilterStatus] = useState('')
  const [filterService, setFilterService] = useState('')
  const [page, setPage] = useState(1)

  const [showCreate, setShowCreate] = useState(false)
  const [editTarget, setEditTarget] = useState<AppointmentRow | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<AppointmentRow | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const filtered = appointments.filter((a) => {
    if (filterStatus && a.status !== filterStatus) return false
    if (filterService && a.service !== filterService) return false
    return true
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleSaved = (appt: AppointmentRow) => {
    setAppointments((prev) => {
      const idx = prev.findIndex((a) => a.id === appt.id)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = appt
        return next
      }
      return [appt, ...prev]
    })
    setShowCreate(false)
    setEditTarget(null)
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleteLoading(true)
    try {
      const res = await fetch(`/api/admin/appointments/${deleteTarget.id}`, { method: 'DELETE' })
      if (res.ok) {
        setAppointments((prev) => prev.filter((a) => a.id !== deleteTarget.id))
        setDeleteTarget(null)
      }
    } finally {
      setDeleteLoading(false)
    }
  }

  return (
    <>
      {/* Filters + create button */}
      <div className="flex flex-wrap gap-3 items-center justify-between mb-4">
        <div className="flex gap-3 flex-wrap">
          <select
            value={filterStatus}
            onChange={(e) => { setFilterStatus(e.target.value); setPage(1) }}
            className="px-3 py-2 rounded-xl border border-warm-100 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-warm-200"
          >
            <option value="">Todos los estados</option>
            {STATUSES.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
          </select>

          <select
            value={filterService}
            onChange={(e) => { setFilterService(e.target.value); setPage(1) }}
            className="px-3 py-2 rounded-xl border border-warm-100 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-warm-200"
          >
            <option value="">Todos los servicios</option>
            {SERVICES.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
          </select>
        </div>

        <button
          onClick={() => setShowCreate(true)}
          className="px-4 py-2 rounded-xl text-sm font-medium text-gray-800 bg-warm-200 hover:bg-warm-300 transition-colors"
        >
          + Nueva Cita
        </button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-warm-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-warm-100 dark:border-slate-700">
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Mascota</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Dueño</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Servicio</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-100 dark:divide-slate-700">
              {paged.map((appt) => (
                <tr key={appt.id} className="hover:bg-warm-50/50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-5 py-3 font-medium text-gray-800 dark:text-gray-200">{appt.petName}</td>
                  <td className="px-5 py-3 text-gray-600 dark:text-gray-400">{appt.ownerName}</td>
                  <td className="px-5 py-3 text-gray-600 dark:text-gray-400">
                    {SERVICES.find((s) => s.id === appt.service)?.title ?? appt.service}
                  </td>
                  <td className="px-5 py-3 text-gray-600 dark:text-gray-400">
                    {new Date(appt.date).toLocaleDateString('es-MX', {
                      year: 'numeric', month: 'short', day: 'numeric',
                    })}
                  </td>
                  <td className="px-5 py-3"><StatusBadge status={appt.status} /></td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditTarget(appt)}
                        className="text-xs px-2.5 py-1 rounded-lg bg-warm-50 dark:bg-slate-700 text-gray-600 dark:text-gray-400 hover:bg-warm-100 dark:hover:bg-slate-600 transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => setDeleteTarget(appt)}
                        className="text-xs px-2.5 py-1 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {paged.length === 0 && (
            <p className="px-6 py-8 text-center text-sm text-gray-400 dark:text-gray-500">
              Sin citas encontradas.
            </p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-5 py-3 border-t border-warm-100 dark:border-slate-700 flex items-center justify-between text-sm">
            <span className="text-gray-400 dark:text-gray-500 text-xs">
              {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded-lg bg-warm-50 dark:bg-slate-700 text-gray-600 dark:text-gray-400 hover:bg-warm-100 dark:hover:bg-slate-600 disabled:opacity-40 transition-colors"
              >
                ←
              </button>
              <span className="px-3 py-1 text-gray-600 dark:text-gray-400">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 rounded-lg bg-warm-50 dark:bg-slate-700 text-gray-600 dark:text-gray-400 hover:bg-warm-100 dark:hover:bg-slate-600 disabled:opacity-40 transition-colors"
              >
                →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {(showCreate || editTarget) && (
        <AppointmentModal
          appointment={editTarget ?? undefined}
          onClose={() => { setShowCreate(false); setEditTarget(null) }}
          onSaved={handleSaved}
        />
      )}

      {deleteTarget && (
        <DeleteConfirmModal
          message={`¿Eliminar la cita de ${deleteTarget.petName} (${deleteTarget.ownerName})?`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleteLoading}
        />
      )}
    </>
  )
}
