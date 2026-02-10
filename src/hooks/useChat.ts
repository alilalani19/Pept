'use client'

import { useState, useCallback, useRef } from 'react'
import type { ChatMessage } from '@/types/chat'

export function useChat(sessionId?: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentSessionId, setCurrentSessionId] = useState<string | undefined>(sessionId)
  const abortControllerRef = useRef<AbortController | null>(null)

  const sendMessage = useCallback(
    async (content: string, peptideSlug?: string) => {
      setIsLoading(true)
      setError(null)

      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content,
        createdAt: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: '',
        createdAt: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      try {
        abortControllerRef.current = new AbortController()

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: content,
            ...(currentSessionId && { sessionId: currentSessionId }),
            peptideSlug,
          }),
          signal: abortControllerRef.current.signal,
        })

        if (!response.ok) {
          const data = await response.json().catch(() => ({}))
          throw new Error(data.error || 'Failed to send message')
        }

        const newSessionId = response.headers.get('X-Session-Id')
        if (newSessionId) {
          setCurrentSessionId(newSessionId)
        }

        const reader = response.body?.getReader()
        const decoder = new TextDecoder()

        if (!reader) throw new Error('No response stream')

        let fullContent = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          fullContent += chunk

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessage.id
                ? { ...msg, content: fullContent }
                : msg
            )
          )
        }
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return

        const errorMessage =
          err instanceof Error ? err.message : 'An error occurred'
        setError(errorMessage)
        setMessages((prev) =>
          prev.filter((msg) => msg.id !== assistantMessage.id)
        )
      } finally {
        setIsLoading(false)
        abortControllerRef.current = null
      }
    },
    [currentSessionId]
  )

  const stopStreaming = useCallback(() => {
    abortControllerRef.current?.abort()
    setIsLoading(false)
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([])
    setCurrentSessionId(undefined)
    setError(null)
  }, [])

  return {
    messages,
    isLoading,
    error,
    sessionId: currentSessionId,
    sendMessage,
    stopStreaming,
    clearMessages,
    setMessages,
  }
}
