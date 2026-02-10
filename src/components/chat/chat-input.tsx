'use client'

import { useState, useRef, useCallback, type KeyboardEvent } from 'react'
import { Send, Square } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatInputProps {
  onSend: (message: string) => void
  isLoading: boolean
  onStop: () => void
  className?: string
}

const MAX_CHARACTERS = 2000

export function ChatInput({ onSend, isLoading, onStop, className }: ChatInputProps) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current
    if (!textarea) return
    textarea.style.height = 'auto'
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`
  }, [])

  const handleSend = useCallback(() => {
    const trimmed = value.trim()
    if (!trimmed || isLoading) return

    onSend(trimmed)
    setValue('')

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }, [value, isLoading, onSend])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    },
    [handleSend]
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value
      if (newValue.length <= MAX_CHARACTERS) {
        setValue(newValue)
      }
      adjustHeight()
    },
    [adjustHeight]
  )

  const isEmpty = value.trim().length === 0
  const characterCount = value.length

  return (
    <div className={cn('border-t border-slate-300 bg-white p-4 dark:border-slate-700 dark:bg-slate-900', className)}>
      <div className="flex items-end gap-2">
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask about peptide research..."
            rows={1}
            className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 text-sm text-slate-900 placeholder-slate-500 transition-colors focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-sky-500 dark:focus:bg-slate-800"
            disabled={isLoading}
          />
        </div>

        {isLoading ? (
          <button
            type="button"
            onClick={onStop}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-500 text-white transition-colors hover:bg-red-600"
            aria-label="Stop generating"
          >
            <Square className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSend}
            disabled={isEmpty}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-sky-500 text-white transition-colors hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="mt-1.5 flex items-center justify-between px-1">
        <p className="text-[10px] text-slate-500 dark:text-slate-500">
          Shift+Enter for new line
        </p>
        <p
          className={cn(
            'text-[10px]',
            characterCount > MAX_CHARACTERS * 0.9
              ? 'text-red-500'
              : 'text-slate-500 dark:text-slate-500'
          )}
        >
          {characterCount}/{MAX_CHARACTERS}
        </p>
      </div>
    </div>
  )
}
