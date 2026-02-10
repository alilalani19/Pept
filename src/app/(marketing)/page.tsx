import Link from 'next/link'
import { prisma } from '@/lib/db'
import { PeptideGrid } from '@/components/peptides/peptide-grid'
import { DisclaimerBanner } from '@/components/compliance/disclaimer-banner'
import { JsonLd } from '@/components/seo/json-ld'
import { createWebsiteJsonLd } from '@/lib/seo/jsonld'
import { ArrowRight, FlaskConical, Shield, Bot, Search } from 'lucide-react'
import { HomeChatBox } from '@/components/chat/home-chat-box'

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

      {/* Hero with AI Chat */}
      <section className="relative bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-4xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
              Ask anything about peptides
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-base text-slate-500 dark:text-slate-400">
              AI-powered research assistant with evidence-based answers
            </p>
          </div>
          <HomeChatBox />
        </div>
      </section>

      {/* Features - minimal */}
      <section className="border-t border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 dark:bg-sky-900/20">
                <FlaskConical className="h-5 w-5 text-sky-500" />
              </div>
              <h3 className="text-sm font-medium text-slate-900 dark:text-white">Evidence-Based</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Every profile includes evidence ratings and cited research.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 dark:bg-sky-900/20">
                <Shield className="h-5 w-5 text-sky-500" />
              </div>
              <h3 className="text-sm font-medium text-slate-900 dark:text-white">Compliance First</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Educational content only. No medical advice.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 dark:bg-sky-900/20">
                <Bot className="h-5 w-5 text-sky-500" />
              </div>
              <h3 className="text-sm font-medium text-slate-900 dark:text-white">AI Assistant</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Get instant answers about peptide research.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 dark:bg-sky-900/20">
                <Search className="h-5 w-5 text-sky-500" />
              </div>
              <h3 className="text-sm font-medium text-slate-900 dark:text-white">Vetted Suppliers</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Transparency-scored directory with testing verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-slate-50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">Browse by Category</h2>
            <Link href="/categories" className="text-sky-500 hover:text-sky-600 text-sm font-medium inline-flex items-center gap-1">
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="rounded-lg border border-slate-200 bg-white p-4 hover:border-sky-300 hover:shadow-sm transition-all dark:bg-slate-900 dark:border-slate-800 dark:hover:border-sky-700"
              >
                <h3 className="text-sm font-medium text-slate-900 dark:text-white">{category.name}</h3>
                <p className="mt-0.5 text-xs text-slate-400">
                  {category._count.peptides} peptide{category._count.peptides !== 1 ? 's' : ''}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Peptides */}
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">Featured Peptides</h2>
          <Link href="/peptides" className="text-sky-500 hover:text-sky-600 text-sm font-medium inline-flex items-center gap-1">
            View All <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <PeptideGrid peptides={featuredPeptides} />
      </section>

      <DisclaimerBanner />
    </>
  )
}
