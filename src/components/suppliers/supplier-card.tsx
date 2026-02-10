import Link from 'next/link'
import { cn } from '@/lib/utils'
import { truncate } from '@/lib/utils'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TransparencyScore } from '@/components/suppliers/transparency-score'
import { CoaBadge } from '@/components/suppliers/coa-badge'

interface Supplier {
  id: string
  name: string
  slug: string
  description: string | null
  transparencyScore: number
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
        'rounded-xl border border-gray-200 bg-white transition-shadow duration-200 hover:shadow-md',
        'dark:border-gray-800 dark:bg-gray-950'
      )}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle>
            <Link
              href={`/suppliers/${supplier.slug}`}
              className="text-gray-900 hover:text-emerald-600 transition-colors dark:text-gray-100 dark:hover:text-emerald-400"
            >
              {supplier.name}
            </Link>
          </CardTitle>
          <TransparencyScore score={supplier.transparencyScore} />
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
      </CardContent>
    </Card>
  )
}
