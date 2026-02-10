import { AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InlineDisclaimerProps {
  className?: string
}

export function InlineDisclaimer({ className }: InlineDisclaimerProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-2 rounded-lg bg-yellow-50 px-3 py-2 dark:bg-amber-950/30',
        className
      )}
    >
      <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500 dark:text-amber-400" />
      <p className="text-xs leading-relaxed text-amber-800 dark:text-amber-300">
        This information is for educational purposes only and does not constitute
        medical advice.
      </p>
    </div>
  )
}
