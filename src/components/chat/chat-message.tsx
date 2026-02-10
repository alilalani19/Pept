'use client'

import { User, Bot } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'

interface ChatMessageProps {
  message: {
    role: 'user' | 'assistant' | 'system'
    content: string
  }
  timestamp?: Date
  className?: string
}

export function ChatMessage({ message, timestamp, className }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div
      className={cn(
        'flex gap-3',
        isUser ? 'flex-row-reverse' : 'flex-row',
        className
      )}
    >
      <div
        className={cn(
          'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full',
          isUser
            ? 'bg-sky-500 text-white'
            : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
        )}
      >
        {isUser ? (
          <User className="h-4 w-4" />
        ) : (
          <Bot className="h-4 w-4" />
        )}
      </div>

      <div
        className={cn(
          'max-w-[75%] rounded-2xl px-4 py-2.5',
          isUser
            ? 'bg-sky-500 text-white'
            : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100'
        )}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        ) : (
          <div className="prose prose-sm prose-slate dark:prose-invert max-w-none prose-p:leading-relaxed prose-p:my-1 prose-headings:my-2 prose-headings:text-slate-900 dark:prose-headings:text-white prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5 prose-pre:my-2">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        )}

        {timestamp && (
          <p
            className={cn(
              'mt-1 text-[10px]',
              isUser
                ? 'text-sky-100'
                : 'text-slate-500 dark:text-slate-500'
            )}
          >
            {timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        )}
      </div>
    </div>
  )
}
