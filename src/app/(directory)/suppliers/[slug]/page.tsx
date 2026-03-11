import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { createMetadata } from '@/lib/seo/metadata'
import { CoaBadge } from '@/components/suppliers/coa-badge'
import { Badge } from '@/components/ui/badge'
import { InlineDisclaimer } from '@/components/compliance/inline-disclaimer'
import { DisclaimerBanner } from '@/components/compliance/disclaimer-banner'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const supplier = await prisma.supplier.findUnique({
    where: { slug },
    select: { name: true, description: true },
  })

  if (!supplier) return {}

  return createMetadata({
    title: `${supplier.name} — Research Peptide Supplier`,
    description: supplier.description || '',
    path: `/suppliers/${slug}`,
  })
}

export default async function SupplierDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const supplier = await prisma.supplier.findUnique({
    where: { slug },
    include: {
      peptides: {
        include: {
          peptide: {
            select: { id: true, name: true, slug: true },
          },
        },
      },
    },
  })

  if (!supplier || !supplier.published) notFound()

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <InlineDisclaimer />

      <header className="mt-6">
        <h1 className="animate-element animate-delay-100 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">{supplier.name}</h1>
        <p className="mt-4 text-lg text-slate-700 dark:text-slate-300">
          {supplier.description}
        </p>
        {supplier.website && (
          <a
            href={supplier.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-sky-500 hover:text-sky-600 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            {new URL(supplier.website).hostname}
          </a>
        )}
      </header>

      {/* Verification */}
      <section className="mt-8 rounded-xl border border-slate-300 p-6 dark:border-slate-800">
        <h2 className="text-xl font-semibold mb-4">Verification</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Certificate of Analysis</p>
            <CoaBadge available={supplier.coaAvailable} url={supplier.coaUrl || undefined} />
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Third-Party Tested</p>
            {supplier.thirdPartyTested ? (
              <Badge variant="success">Verified</Badge>
            ) : (
              <Badge variant="secondary">Not Verified</Badge>
            )}
          </div>
        </div>
      </section>

      {/* Available Peptides */}
      {supplier.peptides.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Available Peptides</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {supplier.peptides.map((ps) => (
              <Link
                key={ps.peptide.id}
                href={`/peptides/${ps.peptide.slug}`}
                className="relative group/feature rounded-lg border border-slate-300 p-3 transition-colors dark:border-neutral-800 overflow-hidden"
              >
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
                <div className="absolute left-0 top-2 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-sky-500 transition-all duration-200 origin-center" />
                <span className="relative z-10 font-medium group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
                  {ps.peptide.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Affiliate Disclosure */}
      <div className="mt-8 rounded-lg border bg-amber-50 p-4 dark:bg-amber-900/10 dark:border-amber-900/30">
        <p className="text-sm text-amber-800 dark:text-amber-200">
          <strong>Affiliate Disclosure:</strong> Links to this supplier may be affiliate links.
          We may earn a commission at no additional cost to you. Supplier listings are based
          on objective criteria and are not influenced by affiliate relationships.
        </p>
      </div>

      <DisclaimerBanner />
    </div>
  )
}
