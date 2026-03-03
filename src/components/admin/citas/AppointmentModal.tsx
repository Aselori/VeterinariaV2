'use client'

import { useState, useEffect } from 'react'
import type { AppointmentRow, AppointmentFormData } from '@/types/appointment'
import { SERVICES } from '@/constants/services'

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-warm-100 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-warm-200 focus:border-transparent transition'
const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5'

const STATUSES = ['pendiente', 'confirmada', 'completada', 'cancelada']

const EMPTY: AppointmentFormData = {
  petName: '',
  ownerName: '',
  email: '',
  phone: '',
  service: '',
  date: '',
  notes: '',
  status: 'pendiente',
}

interface Props {
  appointment?: AppointmentRow
  onClose: () => void
  onSaved: (appt: AppointmentRow) => void
}

export default function AppointmentModal({ appointment, onClose, onSaved }: Props) {
  const [form, setForm] = useState<AppointmentFormData>(EMPTY)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (appointment) {
      setForm({
        petName: appointment.petName,
        ownerName: appointment.ownerName,
        email: appointment.email,
        phone: appointment.phone ?? '',
        service: appointment.service,
        date: new Date(appointment.date).toISOString().slice(0, 16),
        notes: appointment.notes ?? '',
        status: appointment.status,
      })
    } else {
      setForm(EMPTY)
    }
  }, [appointment])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const url = appointment
        ? `/api/admin/appointments/${appointment.id}`
        : '/api/admin/appointments'
      const method = appointment ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? 'Error al guardar')
        return
      }

      const saved = await res.json()
      onSaved({
        ...saved,
        date: typeof saved.date === 'string' ? saved.date : new Date(saved.date).toISOString(),
        createdAt: typeof saved.createdAt === 'string' ? saved.createdAt : new Date(saved.createdAt).toISOString(),
        updatedAt: typeof saved.updatedAt === 'string' ? saved.updatedAt : new Date(saved.updatedAt).toISOString(),
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-warm-100 dark:border-slate-700 shadow-xl w-full max-w-lg my-4">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">
            {appointment ? 'Editar Cita' : 'Nueva Cita'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl leading-none"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Mascota</label>
              <input name="petName" value={form.petName} onChange={handleChange} required placeholder="Firulais" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Dueño</label>
              <input name="ownerName" value={form.ownerName} onChange={handleChange} required placeholder="Ana García" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Correo</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="ana@email.com" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Teléfono</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="555-0100" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Servicio</label>
              <select name="service" value={form.service} onChange={handleChange} required className={inputClass}>
                <option value="">Seleccionar...</option>
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Estado</label>
              <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
                {STATUSES.map((s) => (
                  <option key={s} value={s} className="capitalize">{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Fecha y Hora</label>
            <input name="date" type="datetime-local" value={form.date} onChange={handleChange} required className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Notas</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} rows={2} placeholder="Observaciones opcionales..." className={inputClass} />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-3 justify-end pt-1">
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
              {loading ? 'Guardando...' : appointment ? 'Guardar Cambios' : 'Crear Cita'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
