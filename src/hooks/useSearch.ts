'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import type { PeptideCard } from '@/types/peptide'

export function useSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<PeptideCard[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const debounceRef = useRef<NodeJS.Timeout>(undefined)

  const search = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([])
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch(
        `/api/peptides/search?q=${encodeURIComponent(q)}`
      )
      if (response.ok) {
        const data = await response.json()
        setResults(data.peptides)
      }
    } catch {
      setResults([])
    } finally {
      setIsSearching(false)
    }
  }, [])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(() => {
      search(query)
    }, 300)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query, search])

  return { query, setQuery, results, isSearching }
}
