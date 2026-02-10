'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DISCLAIMER_TEXT } from '@/lib/constants'

export function DisclaimerBanner({ className }: { className?: string }) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 backdrop-blur-sm',
        className
      )}
    >
      <div className="bg-sky-600/95 dark:bg-sky-700/95 shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center gap-x-4 px-4 py-3 sm:px-6 lg:px-8">
          <p className="flex-1 text-sm leading-relaxed text-white">
            {DISCLAIMER_TEXT}
          </p>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="flex-shrink-0 rounded-md p-1.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Dismiss disclaimer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
