'use client'

import { useState, useCallback } from 'react'
import type { Message, ChatState } from '@/types/chatbot'

export function useChat() {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  })

  const sendMessage = useCallback(
    async (content: string) => {
      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content,
        timestamp: new Date(),
      }

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, userMessage],
        isLoading: true,
        error: null,
      }))

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: [...state.messages, userMessage] }),
        })

        if (!response.ok) throw new Error('Failed to get response')

        const data = await response.json()

        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: data.message,
          timestamp: new Date(),
        }

        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, assistantMessage],
          isLoading: false,
        }))
      } catch {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: 'No se pudo enviar el mensaje. Por favor, inténtalo de nuevo.',
        }))
      }
    },
    [state.messages],
  )

  const clearMessages = useCallback(() => {
    setState({ messages: [], isLoading: false, error: null })
  }, [])

  return { ...state, sendMessage, clearMessages }
}
