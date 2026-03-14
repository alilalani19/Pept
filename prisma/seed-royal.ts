import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  connectionString:
    process.env.DATABASE_URL ||
    'postgresql://alilalani@localhost:5432/pept?schema=public',
})
const prisma = new PrismaClient({ adapter })

async function main() {
  // Upsert Royal Peptides supplier
  const royal = await prisma.supplier.upsert({
    where: { slug: 'royal-peptides' },
    update: {
      name: 'Royal Peptides',
      description:
        'Peptide supplier offering single vials, 10-vial kits, blends, and GLP-1 research compounds with >99% purity.',
      website: 'https://royal-peptides.com/?ref=dadkkiby',
      affiliateBaseUrl: 'https://royal-peptides.com',
      affiliateCode: 'dadkkiby',
      coaAvailable: true,
      thirdPartyTested: true,
      published: true,
    },
    create: {
      name: 'Royal Peptides',
      slug: 'royal-peptides',
      description:
        'Peptide supplier offering single vials, 10-vial kits, blends, and GLP-1 research compounds with >99% purity.',
      website: 'https://royal-peptides.com/?ref=dadkkiby',
      affiliateBaseUrl: 'https://royal-peptides.com',
      affiliateCode: 'dadkkiby',
      coaAvailable: true,
      thirdPartyTested: true,
      published: true,
    },
  })
  console.log(`Supplier: ${royal.name} (${royal.id})`)

  // Get all peptides
  const peptides = await prisma.peptide.findMany({
    select: { id: true, slug: true, name: true },
  })
  const peptideMap = new Map(peptides.map((p) => [p.slug, p]))

  // Royal carries these peptides — link them
  const royalPeptideSlugs = [
    'bpc-157',
    'tb-500',
    'ghk-cu',
    'semaglutide',
    'selank',
    'semax',
    'ipamorelin',
  ]

  for (const slug of royalPeptideSlugs) {
    const peptide = peptideMap.get(slug)
    if (!peptide) {
      console.log(`  Skipping ${slug} — not in DB`)
      continue
    }
    await prisma.peptideSupplier.upsert({
      where: {
        peptideId_supplierId: { peptideId: peptide.id, supplierId: royal.id },
      },
      update: {},
      create: { peptideId: peptide.id, supplierId: royal.id },
    })
    console.log(`  Linked: ${peptide.name} -> Royal Peptides`)
  }

  console.log('\nRoyal Peptides seed complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
