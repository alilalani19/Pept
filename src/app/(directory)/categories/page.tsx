import { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { createMetadata } from '@/lib/seo/metadata'
import { Badge } from '@/components/ui/badge'
import { DisclaimerBanner } from '@/components/compliance/disclaimer-banner'
import { FeaturesSectionWithHoverEffects } from '@/components/ui/feature-section-with-hover-effects'
import { FlaskConical, Dna, Brain, Activity, Syringe, Microscope, HeartPulse, Leaf } from 'lucide-react'

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
        <h1 className="animate-element animate-delay-100 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Peptide Categories</h1>
        <p className="animate-element animate-delay-200 mt-2 text-slate-600 dark:text-slate-400">
          Browse peptides organized by research area and biological function.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.slug} href={`/categories/${category.slug}`} className="relative group/feature rounded-xl border border-slate-300 bg-white dark:border-neutral-800 dark:bg-slate-900 overflow-hidden h-full">
            <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
            <div className="absolute left-0 top-6 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-sky-500 transition-all duration-200 origin-center" />
            <div className="relative z-10 p-6">
              <h3 className="text-lg font-semibold leading-none tracking-tight group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">{category.name}</h3>
              <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-300">{category.description}</p>
              <div className="mt-4">
                <Badge variant="secondary">
                  {category._count.peptides} peptide{category._count.peptides !== 1 ? 's' : ''}
                </Badge>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight text-center">Why Browse by Category?</h2>
        <FeaturesSectionWithHoverEffects
          features={[
            {
              title: "Organized Research",
              description: "Peptides grouped by biological function for streamlined research.",
              icon: <FlaskConical className="h-6 w-6" />,
            },
            {
              title: "Genetic Peptides",
              description: "Explore peptides involved in gene expression and DNA repair mechanisms.",
              icon: <Dna className="h-6 w-6" />,
            },
            {
              title: "Neuropeptides",
              description: "Research peptides that interact with the nervous system and cognition.",
              icon: <Brain className="h-6 w-6" />,
            },
            {
              title: "Performance",
              description: "Peptides studied for their role in physical performance and recovery.",
              icon: <Activity className="h-6 w-6" />,
            },
            {
              title: "Therapeutic Research",
              description: "Peptides under investigation for potential therapeutic applications.",
              icon: <Syringe className="h-6 w-6" />,
            },
            {
              title: "Lab Research",
              description: "Peptides commonly used in laboratory and in-vitro research settings.",
              icon: <Microscope className="h-6 w-6" />,
            },
            {
              title: "Cardiovascular",
              description: "Peptides studied for cardiovascular and metabolic research.",
              icon: <HeartPulse className="h-6 w-6" />,
            },
            {
              title: "Natural Peptides",
              description: "Naturally occurring peptides found in biological systems.",
              icon: <Leaf className="h-6 w-6" />,
            },
          ]}
        />
      </div>

      <DisclaimerBanner />
    </div>
  )
}
