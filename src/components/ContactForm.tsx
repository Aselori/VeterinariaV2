'use client'

import { useState } from 'react'
import type { ContactFormData } from '@/types/forms'

const INITIAL_STATE: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-warm-100 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-warm-200 focus:border-transparent transition'

const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5'

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(INITIAL_STATE)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Mensaje enviado:', form)
    setForm(INITIAL_STATE)
  }

  return (
    <section id="contact" className="bg-warm-50 dark:bg-slate-900 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
            Escríbenos
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-100">
            Contáctanos
          </h2>
        </div>

        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-warm-100 dark:border-slate-700">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className={labelClass}>
                  Tu Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ana García"
                  required
                  className={inputClass}
                />
              </div>
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
            </div>

            <div>
              <label htmlFor="subject" className={labelClass}>
                Asunto
              </label>
              <input
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="¿En qué podemos ayudarte?"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="message" className={labelClass}>
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tu mensaje..."
                rows={5}
                required
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-warm-200 text-gray-800 font-medium rounded-full hover:opacity-90 transition-opacity"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
