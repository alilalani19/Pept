import { Metadata } from 'next'
import { prisma } from '@/lib/db'
import { createMetadata } from '@/lib/seo/metadata'
import { PeptideGrid } from '@/components/peptides/peptide-grid'
import { PeptideSearch } from '@/components/peptides/peptide-search'
import { DisclaimerBanner } from '@/components/compliance/disclaimer-banner'
import { FeaturesSectionWithHoverEffects } from '@/components/ui/feature-section-with-hover-effects'
import { BookOpen, Shield, FlaskConical, Search, BarChart3, FileText, Tag, Beaker } from 'lucide-react'

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
        <h1 className="animate-element animate-delay-100 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Peptide Directory</h1>
        <p className="animate-element animate-delay-200 mt-2 text-slate-600 dark:text-slate-400">
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

      <div className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight text-center">What You Get With Every Profile</h2>
        <FeaturesSectionWithHoverEffects
          features={[
            {
              title: "Evidence Ratings",
              description: "Each peptide is rated by the strength of available scientific evidence.",
              icon: <BarChart3 className="h-6 w-6" />,
            },
            {
              title: "Cited Research",
              description: "Profiles link directly to published studies and clinical trials.",
              icon: <FileText className="h-6 w-6" />,
            },
            {
              title: "Safety Information",
              description: "Known side effects, contraindications, and safety considerations.",
              icon: <Shield className="h-6 w-6" />,
            },
            {
              title: "Legal Status",
              description: "Clear regulatory status badges for every peptide in the directory.",
              icon: <Tag className="h-6 w-6" />,
            },
            {
              title: "Mechanism of Action",
              description: "Detailed breakdowns of how each peptide works at the molecular level.",
              icon: <Beaker className="h-6 w-6" />,
            },
            {
              title: "Category Tags",
              description: "Filter and discover peptides by biological function and research area.",
              icon: <Search className="h-6 w-6" />,
            },
            {
              title: "Research Context",
              description: "Educational summaries putting each peptide's research in perspective.",
              icon: <BookOpen className="h-6 w-6" />,
            },
            {
              title: "Lab Data",
              description: "Molecular weight, amino acid sequences, and pharmacokinetic data.",
              icon: <FlaskConical className="h-6 w-6" />,
            },
          ]}
        />
      </div>

      <DisclaimerBanner />
    </div>
  )
}
