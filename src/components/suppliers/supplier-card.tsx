import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { truncate } from '@/lib/utils'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
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
    <Card
      className={cn(
        'rounded-xl border border-slate-300 bg-white transition-shadow duration-200 hover:shadow-md',
        'dark:border-slate-800 dark:bg-slate-900'
      )}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle>
            <Link
              href={`/suppliers/${supplier.slug}`}
              className="text-slate-900 hover:text-sky-600 transition-colors dark:text-slate-100 dark:hover:text-sky-400"
            >
              {supplier.name}
            </Link>
          </CardTitle>
        </div>
        <CardDescription>
          {supplier.description ? truncate(supplier.description, 120) : ''}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap items-center gap-2">
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
      </CardContent>
    </Card>
  )
}
