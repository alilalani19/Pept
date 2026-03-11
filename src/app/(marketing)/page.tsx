import Link from 'next/link'
import { prisma } from '@/lib/db'
import { PeptideGrid } from '@/components/peptides/peptide-grid'
import { DisclaimerBanner } from '@/components/compliance/disclaimer-banner'
import { JsonLd } from '@/components/seo/json-ld'
import { createWebsiteJsonLd } from '@/lib/seo/jsonld'
import { ArrowRight, FlaskConical, Shield, Bot, Search, BookOpen, Beaker, Users, Scale } from 'lucide-react'
import { HomeChatBox } from '@/components/chat/home-chat-box'
import { FeaturesSectionWithHoverEffects } from '@/components/ui/feature-section-with-hover-effects'

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
        <div className="mx-auto max-w-4xl px-4 pt-12 pb-10 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h1 className="animate-element animate-delay-100 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
              Ask anything about peptides
            </h1>
            <p className="animate-element animate-delay-200 mx-auto mt-3 max-w-xl text-base text-slate-600 dark:text-slate-400">
              AI-powered research assistant with evidence-based answers
            </p>
          </div>
          <div className="animate-element animate-delay-300">
            <HomeChatBox />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FeaturesSectionWithHoverEffects
            features={[
              {
                title: "Evidence-Based Profiles",
                description: "Every peptide profile includes evidence ratings, cited research, and clinical data.",
                icon: <FlaskConical className="h-6 w-6" />,
              },
              {
                title: "AI Research Assistant",
                description: "Get instant, evidence-backed answers to your peptide research questions.",
                icon: <Bot className="h-6 w-6" />,
              },
              {
                title: "Vetted Suppliers",
                description: "Curated directory of suppliers with third-party testing verification.",
                icon: <Search className="h-6 w-6" />,
              },
              {
                title: "Compliance First",
                description: "Educational content only. We never provide medical advice or dosing guidance.",
                icon: <Shield className="h-6 w-6" />,
              },
              {
                title: "Research Library",
                description: "Access categorized peptide profiles organized by biological function and research area.",
                icon: <BookOpen className="h-6 w-6" />,
              },
              {
                title: "Lab-Grade Data",
                description: "Detailed molecular data, mechanisms of action, and pharmacokinetic profiles.",
                icon: <Beaker className="h-6 w-6" />,
              },
              {
                title: "Community Driven",
                description: "Join researchers and educators sharing knowledge in peptide science.",
                icon: <Users className="h-6 w-6" />,
              },
              {
                title: "Regulatory Clarity",
                description: "Clear legal status badges so you always know the regulatory landscape.",
                icon: <Scale className="h-6 w-6" />,
              },
            ]}
          />
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
                className="relative group/feature rounded-lg border border-slate-300 bg-white p-4 transition-all dark:bg-slate-900 dark:border-neutral-800 overflow-hidden"
              >
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
                <div className="absolute left-0 top-3 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-sky-500 transition-all duration-200 origin-center" />
                <h3 className="relative z-10 text-sm font-medium group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">{category.name}</h3>
                <p className="relative z-10 mt-0.5 text-xs text-neutral-600 dark:text-neutral-300">
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
