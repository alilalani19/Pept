'use client'

import { useRef, useEffect } from 'react'
import { Bot } from 'lucide-react'
import { useChat } from '@/hooks/useChat'
import { cn } from '@/lib/utils'
import { InlineDisclaimer } from '@/components/compliance/inline-disclaimer'
import { GuardrailNotice } from './guardrail-notice'
import { ChatMessage } from './chat-message'
import { ChatInput } from './chat-input'
import { StreamingMessage } from './streaming-message'

interface ChatInterfaceProps {
  sessionId?: string
  peptideSlug?: string
  peptideName?: string
  initialQuery?: string
  className?: string
}

export function ChatInterface({
  sessionId,
  peptideSlug,
  peptideName,
  initialQuery,
  className,
}: ChatInterfaceProps) {
  const { messages, isLoading, error, sendMessage, stopStreaming } =
    useChat(sessionId)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const initialQuerySent = useRef(false)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (initialQuery && !initialQuerySent.current) {
      initialQuerySent.current = true
      sendMessage(initialQuery, peptideSlug)
    }
  }, [initialQuery, peptideSlug, sendMessage])

  const handleSend = (content: string) => {
    sendMessage(content, peptideSlug)
  }

  return (
    <div
      className={cn(
        'flex h-full flex-col overflow-hidden rounded-xl border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900',
        className
      )}
    >
      {/* Guardrail notice */}
      <GuardrailNotice className="m-3 mb-0" />

      {/* Scrollable message area */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <InlineDisclaimer className="mb-4" />

        {peptideName && messages.length === 0 && (
          <div className="mb-6 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Ask questions about{' '}
              <span className="font-medium text-sky-500 dark:text-sky-400">
                {peptideName}
              </span>{' '}
              research
            </p>
          </div>
        )}

        {messages.length === 0 && !peptideName && (
          <div className="mb-6 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Start a conversation about peptide research
            </p>
          </div>
        )}

        <div className="space-y-4">
          {messages.map((message, index) => {
            const isLastAssistant =
              message.role === 'assistant' && index === messages.length - 1

            if (isLastAssistant && isLoading) {
              return (
                <div key={message.id} className="flex gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="max-w-[75%] rounded-2xl bg-slate-100 px-4 py-2.5 text-slate-800 dark:bg-slate-800 dark:text-slate-100">
                    <StreamingMessage
                      content={message.content}
                      isStreaming={true}
                    />
                  </div>
                </div>
              )
            }

            if (message.role === 'user' || message.role === 'assistant') {
              return (
                <ChatMessage
                  key={message.id}
                  message={message}
                  timestamp={message.createdAt}
                />
              )
            }

            return null
          })}
        </div>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 dark:bg-red-950/30 dark:text-red-400">
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <ChatInput
        onSend={handleSend}
        isLoading={isLoading}
        onStop={stopStreaming}
      />
    </div>
  )
}
