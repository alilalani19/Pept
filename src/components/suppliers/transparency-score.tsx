import { cn } from '@/lib/utils'

interface TransparencyScoreProps {
  score: number
  className?: string
}

function getScoreColor(score: number) {
  if (score <= 33) return 'bg-red-500'
  if (score <= 66) return 'bg-yellow-500'
  return 'bg-green-500'
}

function getScoreTextColor(score: number) {
  if (score <= 33) return 'text-red-700 dark:text-red-400'
  if (score <= 66) return 'text-yellow-700 dark:text-yellow-400'
  return 'text-green-700 dark:text-green-400'
}

export function TransparencyScore({ score, className }: TransparencyScoreProps) {
  const clampedScore = Math.max(0, Math.min(100, score))

  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <div className="h-2 w-16 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className={cn('h-full rounded-full transition-all', getScoreColor(clampedScore))}
          style={{ width: `${clampedScore}%` }}
        />
      </div>
      <span className={cn('text-xs font-medium', getScoreTextColor(clampedScore))}>
        {clampedScore}
      </span>
    </div>
  )
}
