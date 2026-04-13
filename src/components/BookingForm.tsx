'use client'

import { useState } from 'react'
import type { BookingFormData } from '@/types/forms'
import { SERVICES } from '@/constants/services'

const INITIAL_STATE: BookingFormData = {
  petName: '',
  ownerName: '',
  email: '',
  phone: '',
  service: '',
  date: '',
  notes: '',
}

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-warm-100 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-warm-200 focus:border-transparent transition'

const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function BookingForm() {
  const [form, setForm] = useState<BookingFormData>(INITIAL_STATE)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg(null)

    const selectedService = SERVICES.find((s) => s.id === form.service)

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          service: selectedService?.title ?? form.service,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error ?? 'No se pudo crear la cita')
      }

      setStatus('success')
      setForm(INITIAL_STATE)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Error desconocido')
    }
  }

  return (
    <section id="booking" className="bg-warm-100 dark:bg-slate-800 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
            Programa tu Visita
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-100">
            Reservar una Cita
          </h2>
        </div>

        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-warm-100 dark:border-slate-700">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="petName" className={labelClass}>
                  Nombre de la Mascota
                </label>
                <input
                  id="petName"
                  name="petName"
                  value={form.petName}
                  onChange={handleChange}
                  placeholder="Firulais"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="ownerName" className={labelClass}>
                  Nombre del Dueño
                </label>
                <input
                  id="ownerName"
                  name="ownerName"
                  value={form.ownerName}
                  onChange={handleChange}
                  placeholder="Ana García"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="email" className={labelClass}>
                  Correo Electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="ana@correo.com"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="phone" className={labelClass}>
                  Teléfono
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+52 55 1234 5678"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="service" className={labelClass}>
                  Servicio
                </label>
                <select
                  id="service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="">Selecciona un servicio</option>
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="date" className={labelClass}>
                  Fecha Preferida
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="notes" className={labelClass}>
                Notas Adicionales
              </label>
              <textarea
                id="notes"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Información relevante sobre tu mascota..."
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3 bg-warm-200 text-gray-800 font-medium rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {status === 'loading' ? 'Enviando...' : 'Reservar Cita'}
            </button>

            {status === 'success' && (
              <p className="text-sm text-center text-green-600 dark:text-green-400">
                ¡Cita registrada! Te contactaremos pronto para confirmar.
              </p>
            )}
            {status === 'error' && (
              <p className="text-sm text-center text-red-500 dark:text-red-400">
                {errorMsg ?? 'No se pudo registrar la cita.'}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
