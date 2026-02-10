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
        'flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 dark:bg-indigo-950/40',
        className
      )}
    >
      <Shield className="h-4 w-4 flex-shrink-0 text-indigo-500 dark:text-indigo-400" />
      <p className="flex-1 text-xs leading-relaxed text-indigo-700 dark:text-indigo-300">
        AI responses are for educational purposes only. Not medical advice. Always
        verify with qualified professionals.
      </p>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="flex-shrink-0 rounded p-0.5 text-indigo-400 transition-colors hover:bg-indigo-100 hover:text-indigo-600 dark:hover:bg-indigo-900 dark:hover:text-indigo-200"
        aria-label="Dismiss notice"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
