import { cn } from '@/lib/utils'
import { DISCLAIMER_TEXT } from '@/lib/constants'

interface PageDisclaimerProps {
  className?: string
}

export function PageDisclaimer({ className }: PageDisclaimerProps) {
  return (
    <div
      className={cn(
        'border-t border-slate-200 bg-slate-50 px-4 py-6 dark:border-slate-700 dark:bg-slate-900/50 sm:px-6 lg:px-8',
        className
      )}
    >
      <div className="mx-auto max-w-4xl space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Disclaimer
        </h3>
        <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          {DISCLAIMER_TEXT}
        </p>
        <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          The authors and contributors of this platform are not medical
          professionals, licensed physicians, or pharmacists. The content
          presented herein has been compiled from publicly available research and
          peer-reviewed literature for informational purposes only. No
          information on this platform should be interpreted as a recommendation
          to buy, sell, or use any substance. Any decision to use peptides or
          related compounds should be made solely under the guidance of a
          qualified healthcare provider. We assume no liability for actions taken
          based on information provided on this platform.
        </p>
      </div>
    </div>
  )
}
