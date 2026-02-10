import { PeptideCard } from '@/components/peptides/peptide-card'
import type { PeptideCard as PeptideCardType } from '@/types/peptide'

interface PeptideGridProps {
  peptides: PeptideCardType[]
}

export function PeptideGrid({ peptides }: PeptideGridProps) {
  if (peptides.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
        <p className="text-lg font-medium text-slate-600 dark:text-slate-400">
          No peptides found
        </p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">
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
