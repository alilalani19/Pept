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
    <div className={cn('relative', className)}>
      <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5 prose-pre:my-2">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>

      {isStreaming && (
        <span
          className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-gray-600 align-middle dark:bg-gray-300"
          aria-hidden="true"
        />
      )}
    </div>
  )
}
