'use client'

import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAffiliateClick } from '@/hooks/useAffiliateClick'

interface AffiliateLinkProps {
  supplierId: string
  peptideId?: string
  url: string
  children: React.ReactNode
  className?: string
}

export function AffiliateLink({
  supplierId,
  peptideId,
  url,
  children,
  className,
}: AffiliateLinkProps) {
  const { trackClick } = useAffiliateClick()

  const handleClick = () => {
    trackClick({ supplierId, peptideId, url })
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2',
        className
      )}
    >
      {children}
      <ExternalLink className="h-3.5 w-3.5" />
      <span className="ml-0.5 text-[10px] font-normal opacity-75">
        Affiliate Link
      </span>
    </button>
  )
}
