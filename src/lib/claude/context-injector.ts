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
      const productLink = ps.productUrl ? ` | Buy: ${ps.productUrl}` : ''
      const website = s.website ? ` | Website: ${s.website}` : ''
      return `  - ${s.name}${website}${productLink} — View on Pept: /suppliers/${s.slug}`
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

export async function getProductCatalog(): Promise<string> {
  const peptides = await prisma.peptide.findMany({
    where: { published: true },
    select: {
      name: true,
      slug: true,
      suppliers: {
        include: {
          supplier: {
            select: { name: true, slug: true },
          },
        },
      },
    },
    orderBy: { name: 'asc' },
  })

  const supplies = await prisma.supplierProduct.findMany({
    include: {
      supplier: { select: { name: true } },
    },
  })

  const lines: string[] = []

  for (const peptide of peptides) {
    const links = peptide.suppliers
      .filter((ps) => ps.productUrl)
      .map((ps) => `[${ps.supplier.name}](${ps.productUrl})`)
    if (links.length > 0) {
      lines.push(`- **${peptide.name}**: ${links.join(' | ')}`)
    }
  }

  if (supplies.length > 0) {
    lines.push('')
    lines.push('**Supplies:**')
    for (const s of supplies) {
      if (s.productUrl) {
        lines.push(`- [${s.name} (${s.supplier.name})](${s.productUrl})`)
      }
    }
  }

  return lines.join('\n')
}
