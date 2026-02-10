'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'

interface PeptideSearchProps {
  categories: { name: string; slug: string }[]
}

const EVIDENCE_LEVELS = [
  { value: 'IN_VITRO', label: 'In Vitro' },
  { value: 'ANIMAL', label: 'Animal Studies' },
  { value: 'LIMITED_HUMAN', label: 'Limited Human Data' },
  { value: 'CLINICAL', label: 'Clinical Trials' },
  { value: 'MIXED', label: 'Mixed Evidence' },
] as const

const LEGAL_STATUSES = [
  { value: 'RESEARCH_ONLY', label: 'Research Only' },
  { value: 'PRESCRIPTION', label: 'Prescription' },
  { value: 'REGULATED', label: 'Regulated' },
  { value: 'BANNED_SPORT', label: 'Banned in Sport' },
  { value: 'UNREGULATED', label: 'Unregulated' },
] as const

export function PeptideSearch({ categories }: PeptideSearchProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const createUpdatedParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())

      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }

      // Reset to page 1 whenever a filter changes
      params.delete('page')

      return params
    },
    [searchParams]
  )

  const applyParams = useCallback(
    (params: URLSearchParams) => {
      const qs = params.toString()
      router.push(qs ? `?${qs}` : '/peptides', { scroll: false })
    },
    [router]
  )

  // Debounced text search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      const params = createUpdatedParams('q', query.trim())
      applyParams(params)
    }, 300)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [query, createUpdatedParams, applyParams])

  const handleSelectChange = (key: string, value: string) => {
    const params = createUpdatedParams(key, value)
    applyParams(params)
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <Input
          type="text"
          placeholder="Search peptides..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="flex flex-wrap gap-3 sm:flex-nowrap">
        <Select
          value={searchParams.get('category') ?? ''}
          onChange={(e) => handleSelectChange('category', e.target.value)}
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </Select>

        <Select
          value={searchParams.get('evidenceLevel') ?? ''}
          onChange={(e) => handleSelectChange('evidenceLevel', e.target.value)}
          aria-label="Filter by evidence level"
        >
          <option value="">All Evidence Levels</option>
          {EVIDENCE_LEVELS.map((level) => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </Select>

        <Select
          value={searchParams.get('legalStatus') ?? ''}
          onChange={(e) => handleSelectChange('legalStatus', e.target.value)}
          aria-label="Filter by legal status"
        >
          <option value="">All Legal Statuses</option>
          {LEGAL_STATUSES.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </Select>
      </div>
    </div>
  )
}
