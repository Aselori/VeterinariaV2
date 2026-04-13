'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@/hooks/useChat'

export default function Chatbot() {
  const [input, setInput] = useState('')
  const { messages, isLoading, error, sendMessage, clearMessages } = useChat()
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = messagesContainerRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages, isLoading])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    sendMessage(input.trim())
    setInput('')
  }

  return (
    <section id="chat" className="bg-warm-100 dark:bg-slate-800 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
            Asistente IA
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
            Chatea con Nosotros
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm leading-relaxed">
            ¿Tienes una pregunta sobre tu mascota? Nuestro asistente IA está disponible en cualquier momento.
          </p>
        </div>

        {/* Chat card */}
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-warm-100 dark:border-slate-700 shadow-sm overflow-hidden">
          {/* Card header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-warm-100 dark:border-slate-700 bg-warm-50 dark:bg-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-warm-200 flex items-center justify-center text-sm">
                🐾
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">VetBot</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">Asistente IA</p>
              </div>
            </div>
            <button
              onClick={clearMessages}
              className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              Limpiar chat
            </button>
          </div>

          {/* Messages */}
          <div
            ref={messagesContainerRef}
            className="h-80 overflow-y-auto p-5 flex flex-col gap-3"
          >
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center gap-2">
                <p className="text-2xl">🐾</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  ¡Hola! Pregúntame lo que quieras sobre nuestros servicios.
                </p>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-warm-200 text-gray-800 rounded-br-sm'
                      : 'bg-warm-100 dark:bg-slate-700 text-gray-800 dark:text-gray-100 rounded-bl-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-warm-100 dark:bg-slate-700 px-4 py-2.5 rounded-2xl rounded-bl-sm">
                  <p className="text-sm text-gray-400 tracking-widest">···</p>
                </div>
              </div>
            )}

            {error && (
              <p className="text-xs text-center text-red-400">{error}</p>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-warm-100 dark:border-slate-700 p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu mensaje..."
                disabled={isLoading}
                className="flex-1 bg-warm-50 dark:bg-slate-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 rounded-full px-4 py-2.5 text-sm border border-warm-100 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-warm-200 focus:border-transparent transition"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-5 py-2.5 bg-warm-200 text-gray-800 font-medium rounded-full text-sm hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
