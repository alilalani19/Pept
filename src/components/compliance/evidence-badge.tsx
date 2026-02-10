import type { EvidenceLevel } from '@prisma/client'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { EVIDENCE_LEVELS } from '@/lib/constants'

interface EvidenceBadgeProps {
  level: EvidenceLevel
  className?: string
}

const levelToBadgeClass: Record<EvidenceLevel, string> = {
  IN_VITRO:
    'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  ANIMAL:
    'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  LIMITED_HUMAN:
    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  CLINICAL:
    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  MIXED:
    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
}

export function EvidenceBadge({ level, className }: EvidenceBadgeProps) {
  const config = EVIDENCE_LEVELS[level]

  if (!config) return null

  return (
    <Badge
      className={cn(levelToBadgeClass[level], className)}
    >
      {config.label}
    </Badge>
  )
}
