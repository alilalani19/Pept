import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { createMetadata } from '@/lib/seo/metadata'
import { PeptideGrid } from '@/components/peptides/peptide-grid'
import { DisclaimerBanner } from '@/components/compliance/disclaimer-banner'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = await prisma.category.findUnique({
    where: { slug },
    select: { name: true, description: true },
  })

  if (!category) return {}

  return createMetadata({
    title: `${category.name} Peptides — Research Directory`,
    description: category.description || `Browse peptides in the ${category.name} category.`,
    path: `/categories/${slug}`,
  })
}

export async function generateStaticParams() {
  const categories = await prisma.category.findMany({
    select: { slug: true },
  })
  return categories.map((c) => ({ slug: c.slug }))
}

export const revalidate = 86400

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      peptides: {
        include: {
          peptide: {
            select: {
              id: true,
              name: true,
              slug: true,
              summary: true,
              evidenceLevel: true,
              legalStatusBadge: true,
              published: true,
              categories: {
                select: { category: { select: { name: true, slug: true } } },
              },
            },
          },
        },
      },
    },
  })

  if (!category) notFound()

  const peptides = category.peptides
    .map((pc) => pc.peptide)
    .filter((p) => p.published)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{category.name}</h1>
        {category.description && (
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            {category.description}
          </p>
        )}
      </div>

      <PeptideGrid peptides={peptides} />

      <DisclaimerBanner />
    </div>
  )
}
