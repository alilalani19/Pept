'use client'

import { useState, useCallback, useEffect } from 'react'

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchFavorites = useCallback(async () => {
    try {
      const response = await fetch('/api/favorites')
      if (response.ok) {
        const data = await response.json()
        setFavorites(data.map((f: { peptideId: string }) => f.peptideId))
      }
    } catch {
      // Not logged in or error
    }
  }, [])

  useEffect(() => {
    fetchFavorites()
  }, [fetchFavorites])

  const toggleFavorite = useCallback(
    async (peptideId: string) => {
      setIsLoading(true)
      const isFavorited = favorites.includes(peptideId)

      try {
        const response = await fetch('/api/favorites', {
          method: isFavorited ? 'DELETE' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ peptideId }),
        })

        if (response.ok) {
          setFavorites((prev) =>
            isFavorited
              ? prev.filter((id) => id !== peptideId)
              : [...prev, peptideId]
          )
        }
      } catch {
        // Error handling
      } finally {
        setIsLoading(false)
      }
    },
    [favorites]
  )

  const isFavorited = useCallback(
    (peptideId: string) => favorites.includes(peptideId),
    [favorites]
  )

  return { favorites, isLoading, toggleFavorite, isFavorited }
}
