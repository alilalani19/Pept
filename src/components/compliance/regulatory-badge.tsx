import type { LegalStatusBadge } from '@prisma/client'
import { cn } from '@/lib/utils'
import { LEGAL_STATUS_COLORS } from '@/lib/constants'

interface RegulatoryBadgeProps {
  status: LegalStatusBadge
  className?: string
}

export function RegulatoryBadge({ status, className }: RegulatoryBadgeProps) {
  const config = LEGAL_STATUS_COLORS[status]

  if (!config) return null

  const { bg, text, label } = config

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        bg,
        text,
        className
      )}
    >
      {label}
    </span>
  )
}
