import Link from 'next/link'
import { prisma } from '@/lib/db'
import { PeptideGrid } from '@/components/peptides/peptide-grid'
import { DisclaimerBanner } from '@/components/compliance/disclaimer-banner'
import { JsonLd } from '@/components/seo/json-ld'
import { createWebsiteJsonLd } from '@/lib/seo/jsonld'
import { FlaskConical, Search, Shield, Bot, ArrowRight } from 'lucide-react'

export default async function HomePage() {
  const [featuredPeptides, categories] = await Promise.all([
    prisma.peptide.findMany({
      where: { published: true },
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
      take: 6,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.category.findMany({
      include: { _count: { select: { peptides: true } } },
      orderBy: { name: 'asc' },
    }),
  ])

  return (
    <>
      <JsonLd data={createWebsiteJsonLd()} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950/20 dark:to-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Evidence-Based{' '}
              <span className="text-emerald-600">Peptide Research</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              Your trusted educational resource for peptide science. Explore evidence-based
              profiles, understand research findings, and make informed decisions with our
              AI-powered research assistant.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/peptides"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-white font-medium hover:bg-emerald-700 transition-colors"
              >
                <Search className="h-5 w-5" />
                Browse Peptides
              </Link>
              <Link
                href="/assistant"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900 transition-colors"
              >
                <Bot className="h-5 w-5" />
                AI Assistant
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
              <FlaskConical className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="font-semibold">Evidence-Based Profiles</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Every peptide profile includes evidence level ratings and cited research.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
              <Shield className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="font-semibold">Compliance First</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              No medical advice, no dosing recommendations. Education and research only.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
              <Bot className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="font-semibold">AI Research Assistant</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Ask questions about peptide research with guardrailed AI responses.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
              <Search className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="font-semibold">Vetted Suppliers</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Transparency-scored supplier directory with COA and testing verification.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Browse by Category</h2>
            <Link href="/categories" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium inline-flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="rounded-xl border bg-white p-6 hover:border-emerald-300 hover:shadow-sm transition-all dark:bg-gray-950 dark:border-gray-800 dark:hover:border-emerald-700"
              >
                <h3 className="font-semibold">{category.name}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {category._count.peptides} peptide{category._count.peptides !== 1 ? 's' : ''}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Peptides */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Featured Peptides</h2>
          <Link href="/peptides" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium inline-flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <PeptideGrid peptides={featuredPeptides} />
      </section>

      {/* CTA */}
      <section className="bg-emerald-600 dark:bg-emerald-700">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Have Questions About Peptide Research?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-emerald-100">
            Our AI assistant can help you understand peptide science, research findings,
            and regulatory status — all with appropriate disclaimers and evidence qualification.
          </p>
          <Link
            href="/assistant"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-emerald-600 hover:bg-emerald-50 transition-colors"
          >
            <Bot className="h-5 w-5" />
            Try AI Assistant
          </Link>
        </div>
      </section>

      <DisclaimerBanner />
    </>
  )
}
