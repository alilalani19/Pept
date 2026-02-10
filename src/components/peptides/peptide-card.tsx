import Link from 'next/link'
import { cn } from '@/lib/utils'
import { truncate } from '@/lib/utils'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { EvidenceBadge } from '@/components/compliance/evidence-badge'
import { RegulatoryBadge } from '@/components/compliance/regulatory-badge'
import type { PeptideCard as PeptideCardType } from '@/types/peptide'

interface PeptideCardProps {
  peptide: PeptideCardType
}

export function PeptideCard({ peptide }: PeptideCardProps) {
  return (
    <Card
      className={cn(
        'rounded-xl border border-gray-200 bg-white transition-shadow duration-200 hover:shadow-md',
        'dark:border-gray-800 dark:bg-gray-950'
      )}
    >
      <CardHeader>
        <CardTitle>
          <Link
            href={`/peptides/${peptide.slug}`}
            className="text-gray-900 hover:text-emerald-600 transition-colors dark:text-gray-100 dark:hover:text-emerald-400"
          >
            {peptide.name}
          </Link>
        </CardTitle>
        <CardDescription>
          {peptide.summary ? truncate(peptide.summary, 120) : ''}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-3">
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
      </CardContent>
    </Card>
  )
}
