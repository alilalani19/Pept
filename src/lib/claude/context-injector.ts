import prisma from '@/lib/db'

export async function injectPeptideContext(slug: string): Promise<string | null> {
  const peptide = await prisma.peptide.findUnique({
    where: { slug },
    include: {
      categories: { include: { category: true } },
      suppliers: {
        include: {
          supplier: {
            select: { name: true, slug: true, website: true },
          },
        },
      },
    },
  })

  if (!peptide) {
    return null
  }

  const categories = peptide.categories.map((c) => c.category.name).join(', ')

  const supplierLines = peptide.suppliers
    .map((ps) => {
      const s = ps.supplier
      const website = s.website ? ` | Website: ${s.website}` : ''
      return `  - ${s.name}${website} — View on Pept: /suppliers/${s.slug}`
    })
    .join('\n')

  const context = `Name: ${peptide.name}
Aliases: ${peptide.aliases?.length ? peptide.aliases.join(', ') : 'None listed'}
Categories: ${categories || 'Uncategorized'}
Summary: ${peptide.summary || 'No summary available.'}
Evidence Level: ${peptide.evidenceLevel || 'Not specified'}
Legal Status: ${peptide.legalStatus || 'Not specified'}
Mechanism: ${peptide.mechanismOfAction || 'No mechanism description available.'}
Research Findings: ${peptide.researchFindings || 'No research findings documented.'}
Risks: ${peptide.risks || 'No risk information available.'}
${supplierLines ? `Vetted Suppliers:\n${supplierLines}` : 'Suppliers: No vetted suppliers listed yet.'}
Disclaimer: This information is for educational purposes only. It is not medical advice. Consult a licensed healthcare professional before making any health-related decisions.`

  return context
}

export async function getSupplierList(): Promise<string> {
  const suppliers = await prisma.supplier.findMany({
    where: { published: true },
    select: { name: true, slug: true, website: true },
    orderBy: { name: 'asc' },
  })

  if (suppliers.length === 0) return ''

  return suppliers
    .map((s) => {
      const website = s.website ? ` | Website: ${s.website}` : ''
      return `- ${s.name}${website} — View on Pept: /suppliers/${s.slug}`
    })
    .join('\n')
}
