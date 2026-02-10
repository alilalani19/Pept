import { PeptideCard } from '@/components/peptides/peptide-card'
import type { PeptideCard as PeptideCardType } from '@/types/peptide'

interface PeptideGridProps {
  peptides: PeptideCardType[]
}

export function PeptideGrid({ peptides }: PeptideGridProps) {
  if (peptides.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center dark:border-gray-700 dark:bg-gray-900">
        <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
          No peptides found
        </p>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {peptides.map((peptide) => (
        <PeptideCard key={peptide.id} peptide={peptide} />
      ))}
    </div>
  )
}
