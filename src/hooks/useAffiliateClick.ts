'use client'

import { useCallback } from 'react'

export function useAffiliateClick() {
  const trackClick = useCallback(
    async ({
      supplierId,
      peptideId,
      url,
    }: {
      supplierId: string
      peptideId?: string
      url: string
    }) => {
      try {
        await fetch('/api/affiliate/click', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ supplierId, peptideId }),
        })
      } catch {
        // Don't block navigation on tracking failure
      }

      window.open(url, '_blank', 'noopener,noreferrer')
    },
    []
  )

  return { trackClick }
}
