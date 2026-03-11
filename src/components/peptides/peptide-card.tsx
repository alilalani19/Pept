import Link from 'next/link'
import { truncate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { EvidenceBadge } from '@/components/compliance/evidence-badge'
import { RegulatoryBadge } from '@/components/compliance/regulatory-badge'
import type { PeptideCard as PeptideCardType } from '@/types/peptide'

interface PeptideCardProps {
  peptide: PeptideCardType
}

export function PeptideCard({ peptide }: PeptideCardProps) {
  return (
    <div className="relative group/feature rounded-xl border border-slate-300 bg-white dark:border-neutral-800 dark:bg-slate-900 overflow-hidden">
      <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />

      <div className="absolute left-0 top-6 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-sky-500 transition-all duration-200 origin-center" />

      <div className="relative z-10 p-6">
        <h3 className="text-lg font-semibold leading-none tracking-tight">
          <Link
            href={`/peptides/${peptide.slug}`}
            className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100"
          >
            {peptide.name}
          </Link>
        </h3>
        <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-300">
          {peptide.summary ? truncate(peptide.summary, 120) : ''}
        </p>

        <div className="mt-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            {peptide.evidenceLevel && <EvidenceBadge level={peptide.evidenceLevel} />}
            {peptide.legalStatusBadge && <RegulatoryBadge status={peptide.legalStatusBadge} />}
          </div>

          {peptide.categories.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {peptide.categories.map(({ category }) => (
                <Badge key={category.slug} variant="outline">
                  {category.name}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
