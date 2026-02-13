import { Metadata } from 'next'
import { prisma } from '@/lib/db'
import { createMetadata } from '@/lib/seo/metadata'
import { SupplierCard } from '@/components/suppliers/supplier-card'
import { InlineDisclaimer } from '@/components/compliance/inline-disclaimer'
import { DisclaimerBanner } from '@/components/compliance/disclaimer-banner'

export const metadata: Metadata = createMetadata({
  title: 'Research Peptide Suppliers — Vetted Directory',
  description: 'Browse our directory of vetted research peptide suppliers with COA availability and third-party testing status.',
  path: '/suppliers',
})

export default async function SuppliersPage() {
  const suppliers = await prisma.supplier.findMany({
    where: { published: true },
    orderBy: { name: 'asc' },
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Research Peptide Suppliers</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Vetted suppliers with testing and documentation standards.
        </p>
      </div>

      <InlineDisclaimer />

      <div className="mt-6 rounded-lg border bg-amber-50 p-4 dark:bg-amber-900/10 dark:border-amber-900/30">
        <p className="text-sm text-amber-800 dark:text-amber-200">
          <strong>Affiliate Disclosure:</strong> Some links on this page are affiliate links.
          We may earn a commission if you make a purchase through these links, at no additional
          cost to you. This helps support the platform. Supplier inclusion and ranking are based
          on objective criteria, not affiliate relationships.
        </p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {suppliers.map((supplier) => (
          <SupplierCard key={supplier.id} supplier={supplier} />
        ))}
      </div>

      {suppliers.length === 0 && (
        <p className="text-center text-slate-600 py-12">
          No suppliers available at this time.
        </p>
      )}

      <DisclaimerBanner />
    </div>
  )
}
