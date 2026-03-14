import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  const suppliers = await prisma.supplier.findMany({
    where: { published: true },
    include: {
      peptides: {
        include: { peptide: { select: { name: true, slug: true } } },
      },
      products: true,
    },
    orderBy: { name: 'asc' },
  })

  for (const s of suppliers) {
    console.log(`\n=== ${s.name} (${s.slug}) ===`)
    console.log(`Website: ${s.website}`)
    console.log(`Affiliate Code: ${s.affiliateCode || 'none'}`)
    console.log(`\nPeptide Links:`)
    for (const ps of s.peptides) {
      console.log(`  ${ps.peptide.name} — productUrl: ${ps.productUrl || 'MISSING'}`)
    }
    console.log(`\nSupplier Products:`)
    if (s.products.length === 0) console.log('  (none)')
    for (const p of s.products) {
      console.log(`  ${p.name} — ${p.productUrl || 'MISSING'}`)
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
