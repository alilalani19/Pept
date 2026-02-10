'use client'

import { useState } from 'react'
import { Shield, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GuardrailNoticeProps {
  className?: string
}

export function GuardrailNotice({ className }: GuardrailNoticeProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-lg bg-sky-50 px-3 py-2 dark:bg-sky-950/40',
        className
      )}
    >
      <Shield className="h-4 w-4 flex-shrink-0 text-sky-500 dark:text-sky-400" />
      <p className="flex-1 text-xs leading-relaxed text-sky-800 dark:text-sky-300">
        AI responses are for educational purposes only. Not medical advice. Always
        verify with qualified professionals.
      </p>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="flex-shrink-0 rounded p-0.5 text-sky-400 transition-colors hover:bg-sky-100 hover:text-sky-600 dark:hover:bg-sky-900 dark:hover:text-sky-200"
        aria-label="Dismiss notice"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
