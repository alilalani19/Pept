import { Metadata } from 'next'
import { prisma } from '@/lib/db'
import { createMetadata } from '@/lib/seo/metadata'
import { PeptideGrid } from '@/components/peptides/peptide-grid'
import { PeptideSearch } from '@/components/peptides/peptide-search'
import { DisclaimerBanner } from '@/components/compliance/disclaimer-banner'

export const metadata: Metadata = createMetadata({
  title: 'Peptide Directory — Browse Research Peptides',
  description: 'Explore our comprehensive directory of research peptides with evidence-based profiles, safety information, and regulatory status.',
  path: '/peptides',
})

export default async function PeptidesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const category = typeof params.category === 'string' ? params.category : undefined
  const evidenceLevel = typeof params.evidenceLevel === 'string' ? params.evidenceLevel : undefined
  const legalStatus = typeof params.legalStatus === 'string' ? params.legalStatus : undefined
  const q = typeof params.q === 'string' ? params.q : undefined
  const page = typeof params.page === 'string' ? parseInt(params.page) : 1

  const where: any = { published: true }

  if (category) {
    where.categories = { some: { category: { slug: category } } }
  }
  if (evidenceLevel) {
    where.evidenceLevel = evidenceLevel
  }
  if (legalStatus) {
    where.legalStatusBadge = legalStatus
  }
  if (q) {
    where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { summary: { contains: q, mode: 'insensitive' } },
    ]
  }

  const [peptides, total, categories] = await Promise.all([
    prisma.peptide.findMany({
      where,
      select: {
        id: true,
        name: true,
        slug: true,
        summary: true,
        evidenceLevel: true,
        legalStatusBadge: true,
        categories: {
          select: { category: { select: { name: true, slug: true } } },
        },
      },
      orderBy: { name: 'asc' },
      skip: (page - 1) * 12,
      take: 12,
    }),
    prisma.peptide.count({ where }),
    prisma.category.findMany({
      select: { name: true, slug: true },
      orderBy: { name: 'asc' },
    }),
  ])

  const totalPages = Math.ceil(total / 12)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Peptide Directory</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Explore evidence-based peptide profiles for educational and research purposes.
        </p>
      </div>

      <PeptideSearch categories={categories} />

      <div className="mt-8">
        <p className="mb-4 text-sm text-slate-600">
          Showing {peptides.length} of {total} peptides
        </p>
        <PeptideGrid peptides={peptides} />
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a
              key={p}
              href={`/peptides?page=${p}${category ? `&category=${category}` : ''}${evidenceLevel ? `&evidenceLevel=${evidenceLevel}` : ''}${legalStatus ? `&legalStatus=${legalStatus}` : ''}${q ? `&q=${q}` : ''}`}
              className={`rounded-lg px-4 py-2 text-sm ${
                p === page
                  ? 'bg-sky-500 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {p}
            </a>
          ))}
        </div>
      )}

      <DisclaimerBanner />
    </div>
  )
}
