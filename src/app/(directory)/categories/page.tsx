import { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { createMetadata } from '@/lib/seo/metadata'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DisclaimerBanner } from '@/components/compliance/disclaimer-banner'

export const metadata: Metadata = createMetadata({
  title: 'Peptide Categories — Browse by Research Area',
  description: 'Explore peptide categories organized by research area, biological function, and therapeutic potential.',
  path: '/categories',
})

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: { select: { peptides: true } },
    },
    orderBy: { name: 'asc' },
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Peptide Categories</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Browse peptides organized by research area and biological function.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.slug} href={`/categories/${category.slug}`}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">
                  {category._count.peptides} peptide{category._count.peptides !== 1 ? 's' : ''}
                </Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <DisclaimerBanner />
    </div>
  )
}
