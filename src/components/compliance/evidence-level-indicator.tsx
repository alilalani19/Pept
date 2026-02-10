'use client'

import type { EvidenceLevel } from '@prisma/client'
import { cn } from '@/lib/utils'
import { EVIDENCE_LEVELS } from '@/lib/constants'
import { Tooltip } from '@/components/ui/tooltip'

interface EvidenceLevelIndicatorProps {
  level: EvidenceLevel
  className?: string
  showLabel?: boolean
}

const TOTAL_BARS = 5

const tooltipDescriptions: Record<EvidenceLevel, string> = {
  IN_VITRO: 'Only tested in lab cell cultures',
  ANIMAL: 'Studied in animal models only',
  LIMITED_HUMAN: 'Some preliminary human data exists',
  CLINICAL: 'Supported by clinical trial evidence',
  MIXED: 'Conflicting results across studies',
}

export function EvidenceLevelIndicator({
  level,
  className,
  showLabel = true,
}: EvidenceLevelIndicatorProps) {
  const config = EVIDENCE_LEVELS[level]

  if (!config) return null

  const { label, bars, color } = config

  return (
    <Tooltip content={tooltipDescriptions[level]}>
      <div className={cn('inline-flex items-center gap-1.5', className)}>
        <div className="flex items-end gap-0.5" aria-label={`Evidence level: ${label} (${bars} of ${TOTAL_BARS})`}>
          {Array.from({ length: TOTAL_BARS }, (_, i) => (
            <span
              key={i}
              className={cn(
                'w-1 rounded-sm transition-colors',
                i < bars ? color.replace('text-', 'bg-') : 'bg-gray-200 dark:bg-gray-700',
              )}
              style={{ height: `${8 + i * 3}px` }}
            />
          ))}
        </div>
        {showLabel && (
          <span className={cn('text-xs font-medium', color)}>
            {label}
          </span>
        )}
      </div>
    </Tooltip>
  )
}
