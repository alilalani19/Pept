import { ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface CoaBadgeProps {
  available: boolean
  url?: string
  className?: string
}

export function CoaBadge({ available, url, className }: CoaBadgeProps) {
  const badge = (
    <Badge
      variant={available ? 'success' : 'secondary'}
      className={cn('inline-flex items-center gap-1', className)}
    >
      <ShieldCheck className="h-3 w-3" />
      {available ? 'COA Available' : 'No COA'}
    </Badge>
  )

  if (available && url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex"
      >
        {badge}
      </a>
    )
  }

  return badge
}
