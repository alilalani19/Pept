import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { truncate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { CoaBadge } from '@/components/suppliers/coa-badge'

interface Supplier {
  id: string
  name: string
  slug: string
  description: string | null
  website: string | null
  coaAvailable: boolean
  thirdPartyTested: boolean
}

interface SupplierCardProps {
  supplier: Supplier
}

export function SupplierCard({ supplier }: SupplierCardProps) {
  return (
    <div className="relative group/feature rounded-xl border border-slate-300 bg-white dark:border-neutral-800 dark:bg-slate-900 overflow-hidden">
      <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />

      <div className="absolute left-0 top-6 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-sky-500 transition-all duration-200 origin-center" />

      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold leading-none tracking-tight">
            <Link
              href={`/suppliers/${supplier.slug}`}
              className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100"
            >
              {supplier.name}
            </Link>
          </h3>
        </div>
        <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-300">
          {supplier.description ? truncate(supplier.description, 120) : ''}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <CoaBadge available={supplier.coaAvailable} />
          {supplier.thirdPartyTested && (
            <Badge variant="info">Third-Party Tested</Badge>
          )}
        </div>
        {supplier.website && (
          <a
            href={supplier.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-sm text-sky-500 hover:text-sky-600 transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {new URL(supplier.website).hostname}
          </a>
        )}
      </div>
    </div>
  )
}
