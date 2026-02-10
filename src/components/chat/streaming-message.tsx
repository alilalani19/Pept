'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'

interface StreamingMessageProps {
  content: string
  isStreaming: boolean
  className?: string
}

export function StreamingMessage({ content, isStreaming, className }: StreamingMessageProps) {
  return (
    <div className={cn('relative text-slate-800 dark:text-slate-100', className)}>
      <div className="prose prose-sm prose-slate dark:prose-invert max-w-none prose-p:leading-relaxed prose-p:my-1 prose-headings:my-2 prose-headings:text-slate-900 dark:prose-headings:text-white prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5 prose-pre:my-2">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>

      {isStreaming && (
        <span
          className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-slate-700 align-middle dark:bg-slate-300"
          aria-hidden="true"
        />
      )}
    </div>
  )
}
