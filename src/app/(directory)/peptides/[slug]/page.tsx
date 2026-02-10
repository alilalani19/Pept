import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { createMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { createArticleJsonLd } from '@/lib/seo/jsonld'
import { InlineDisclaimer } from '@/components/compliance/inline-disclaimer'
import { PageDisclaimer } from '@/components/compliance/page-disclaimer'
import { EvidenceLevelIndicator } from '@/components/compliance/evidence-level-indicator'
import { RegulatoryBadge } from '@/components/compliance/regulatory-badge'
import { EvidenceBadge } from '@/components/compliance/evidence-badge'
import { Badge } from '@/components/ui/badge'
import { DisclaimerBanner } from '@/components/compliance/disclaimer-banner'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const peptide = await prisma.peptide.findUnique({
    where: { slug },
    select: { metaTitle: true, metaDescription: true, name: true, summary: true },
  })

  if (!peptide) return {}

  return createMetadata({
    title: peptide.metaTitle || `${peptide.name} — Peptide Research Profile`,
    description: peptide.metaDescription || peptide.summary || '',
    path: `/peptides/${slug}`,
  })
}

export async function generateStaticParams() {
  const peptides = await prisma.peptide.findMany({
    where: { published: true },
    select: { slug: true },
  })
  return peptides.map((p) => ({ slug: p.slug }))
}

export const revalidate = 86400 // 24 hours

export default async function PeptideProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const peptide = await prisma.peptide.findUnique({
    where: { slug },
    include: {
      categories: { include: { category: true } },
      suppliers: {
        include: {
          supplier: {
            select: {
              id: true,
              name: true,
              slug: true,
              website: true,
              transparencyScore: true,
              coaAvailable: true,
              thirdPartyTested: true,
            },
          },
        },
      },
    },
  })

  if (!peptide || !peptide.published) notFound()

  const jsonLd = createArticleJsonLd({
    title: peptide.name,
    description: peptide.summary || '',
    slug: peptide.slug,
    datePublished: peptide.createdAt.toISOString(),
    dateModified: peptide.updatedAt.toISOString(),
  })

  return (
    <>
      <JsonLd data={jsonLd} />
      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <InlineDisclaimer />

        {/* Header */}
        <header className="mt-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {peptide.categories.map((pc) => (
              <Link key={pc.category.slug} href={`/categories/${pc.category.slug}`}>
                <Badge variant="secondary">{pc.category.name}</Badge>
              </Link>
            ))}
          </div>
          <h1 className="text-4xl font-bold tracking-tight">{peptide.name}</h1>
          {peptide.aliases.length > 0 && (
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Also known as: {peptide.aliases.join(', ')}
            </p>
          )}
          <p className="mt-4 text-lg text-slate-700 dark:text-slate-300">{peptide.summary}</p>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            {peptide.evidenceLevel && <EvidenceLevelIndicator level={peptide.evidenceLevel} />}
            {peptide.legalStatusBadge && <RegulatoryBadge status={peptide.legalStatusBadge} />}
          </div>
        </header>

        {/* Quick Facts */}
        {(peptide.sequence || peptide.molecularWeight) && (
          <section className="mt-8 rounded-xl border bg-slate-50 p-6 dark:bg-slate-900/50 dark:border-slate-800">
            <h2 className="text-lg font-semibold mb-4">Quick Facts</h2>
            <dl className="grid gap-4 sm:grid-cols-2">
              {peptide.sequence && (
                <div>
                  <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">Sequence</dt>
                  <dd className="mt-1 font-mono text-sm break-all">{peptide.sequence}</dd>
                </div>
              )}
              {peptide.molecularWeight && (
                <div>
                  <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">Molecular Weight</dt>
                  <dd className="mt-1">{peptide.molecularWeight} Da</dd>
                </div>
              )}
            </dl>
          </section>
        )}

        {/* Description */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <div className="prose dark:prose-invert max-w-none">
            {(peptide.description || '').split('\n\n').map((paragraph, i) => (
              <p key={i} className="mb-4 text-slate-700 dark:text-slate-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Mechanism of Action */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Mechanism of Action</h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{peptide.mechanismOfAction}</p>
          {peptide.biologicalPathways.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                Biological Pathways
              </h3>
              <div className="flex flex-wrap gap-2">
                {peptide.biologicalPathways.map((pathway) => (
                  <Badge key={pathway} variant="outline">{pathway}</Badge>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Research Findings */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Research Findings</h2>
          <div className="mb-3">
            {peptide.evidenceLevel && <EvidenceBadge level={peptide.evidenceLevel} />}
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{peptide.researchFindings}</p>
        </section>

        {/* Risks */}
        <section className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6 dark:bg-red-900/10 dark:border-red-900/30">
          <h2 className="text-2xl font-semibold mb-4 text-red-800 dark:text-red-300">Risks & Safety Concerns</h2>
          <p className="text-red-700 dark:text-red-300 leading-relaxed">{peptide.risks}</p>
        </section>

        {/* Legal Status */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Regulatory & Legal Status</h2>
          <div className="mb-3">
            {peptide.legalStatusBadge && <RegulatoryBadge status={peptide.legalStatusBadge} />}
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{peptide.legalStatus}</p>
        </section>

        {/* Suppliers */}
        {peptide.suppliers.length > 0 && (
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Research Suppliers</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              The following suppliers carry this peptide for research purposes. Inclusion does not constitute an endorsement.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {peptide.suppliers.map((ps) => (
                <div
                  key={ps.supplier.id}
                  className="rounded-lg border border-slate-300 p-4 dark:border-slate-800"
                >
                  <Link
                    href={`/suppliers/${ps.supplier.slug}`}
                    className="font-medium text-sky-500 hover:text-sky-600"
                  >
                    {ps.supplier.name}
                  </Link>
                  {ps.supplier.website && (
                    <a
                      href={ps.supplier.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-xs text-slate-600 hover:text-sky-500 transition-colors"
                    >
                      {ps.supplier.website.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                  <div className="mt-2 flex items-center gap-3 text-sm text-slate-600">
                    <span>Score: {ps.supplier.transparencyScore}/100</span>
                    {ps.supplier.coaAvailable && <Badge variant="success">COA</Badge>}
                    {ps.supplier.thirdPartyTested && <Badge variant="info">Tested</Badge>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Ask AI */}
        <section className="mt-8 rounded-xl border bg-sky-50 p-6 dark:bg-sky-900/10 dark:border-sky-900/30">
          <h2 className="text-xl font-semibold mb-2">Have questions about {peptide.name}?</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Ask our AI research assistant for educational information about this peptide.
          </p>
          <Link
            href={`/assistant?peptide=${peptide.slug}`}
            className="inline-flex items-center rounded-lg bg-sky-500 px-4 py-2 text-white hover:bg-sky-600 transition-colors"
          >
            Ask AI Assistant
          </Link>
        </section>

        <PageDisclaimer />
      </article>

      <DisclaimerBanner />
    </>
  )
}
