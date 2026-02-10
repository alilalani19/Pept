import prisma from '@/lib/db'

export async function injectPeptideContext(slug: string): Promise<string | null> {
  const peptide = await prisma.peptide.findUnique({
    where: { slug },
    include: { categories: { include: { category: true } } },
  })

  if (!peptide) {
    return null
  }

  const categories = peptide.categories.map((c) => c.category.name).join(', ')

  const context = `Name: ${peptide.name}
Aliases: ${peptide.aliases?.length ? peptide.aliases.join(', ') : 'None listed'}
Categories: ${categories || 'Uncategorized'}
Summary: ${peptide.summary || 'No summary available.'}
Evidence Level: ${peptide.evidenceLevel || 'Not specified'}
Legal Status: ${peptide.legalStatus || 'Not specified'}
Mechanism: ${peptide.mechanismOfAction || 'No mechanism description available.'}
Research Findings: ${peptide.researchFindings || 'No research findings documented.'}
Risks: ${peptide.risks || 'No risk information available.'}
Disclaimer: This information is for educational purposes only. It is not medical advice. Consult a licensed healthcare professional before making any health-related decisions.`

  return context
}
