import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

// Mapping: peptide slug -> { ascension product URL, royal product URL }
const productLinks: Record<string, { ascension?: string; royal?: string }> = {
  'bpc-157': {
    ascension: 'https://ascensionpeptides.com/product/bpc-157-10mg/',
    royal: 'https://royal-peptides.com/shop/wolverine-bpc-157-tb-500-blend/',
  },
  'tb-500': {
    ascension: 'https://ascensionpeptides.com/product/tb-500-5mg/',
    royal: 'https://royal-peptides.com/shop/wolverine-bpc-157-tb-500-blend/',
  },
  'ghk-cu': {
    ascension: 'https://ascensionpeptides.com/product/ghk-cu-100mg/',
    royal: 'https://royal-peptides.com/shop/glow-blend-vial-kit/',
  },
  'semaglutide': {
    ascension: 'https://ascensionpeptides.com/product/s-5/',
    royal: 'https://royal-peptides.com/shop/semaglutide/',
  },
  'll-37': {
    ascension: 'https://ascensionpeptides.com/product/ll37-10mg/',
  },
  'selank': {
    ascension: 'https://ascensionpeptides.com/product/selank-10mg/',
    royal: 'https://royal-peptides.com/shop/selank-semax-blend/',
  },
  'semax': {
    ascension: 'https://ascensionpeptides.com/product/semax-10mg/',
    royal: 'https://royal-peptides.com/shop/selank-semax-blend/',
  },
  'melanotan-ii': {
    ascension: 'https://ascensionpeptides.com/product/melanotan-ii-10mg/',
  },
  'ipamorelin': {
    ascension: 'https://ascensionpeptides.com/product/ipamorelin-5mg/',
    royal: 'https://royal-peptides.com/shop/tesamorelin-ipamorelin-blend/',
  },
  'cjc-1295': {
    ascension: 'https://ascensionpeptides.com/product/cjc-1295-5mg/',
  },
  'thymalin': {
    // Not found on either supplier site
  },
  'epitalon': {
    ascension: 'https://ascensionpeptides.com/product/epithalon-10mg/',
  },
}

async function main() {
  // Get all suppliers
  const ascension = await prisma.supplier.findUnique({ where: { slug: 'ascension-peptides' } })
  const royal = await prisma.supplier.findUnique({ where: { slug: 'royal-peptides' } })

  if (!ascension || !royal) {
    console.error('Missing suppliers in DB')
    process.exit(1)
  }

  // Get all peptides
  const peptides = await prisma.peptide.findMany({ select: { id: true, slug: true, name: true } })
  const peptideMap = new Map(peptides.map((p) => [p.slug, p]))

  let updated = 0

  for (const [slug, links] of Object.entries(productLinks)) {
    const peptide = peptideMap.get(slug)
    if (!peptide) {
      console.log(`  Skip ${slug} — not in peptide DB`)
      continue
    }

    // Update Ascension link
    if (links.ascension) {
      const affiliateUrl = links.ascension.replace(/\/$/, '') + '/ref/Pept/'
      try {
        await prisma.peptideSupplier.update({
          where: { peptideId_supplierId: { peptideId: peptide.id, supplierId: ascension.id } },
          data: { productUrl: affiliateUrl },
        })
        console.log(`  ${peptide.name} → Ascension: ${affiliateUrl}`)
        updated++
      } catch {
        console.log(`  ${peptide.name} → Ascension: no link exists in DB, skipping`)
      }
    }

    // Update Royal link
    if (links.royal) {
      const affiliateUrl = links.royal.includes('?')
        ? links.royal + '&ref=dadkkiby'
        : links.royal + '?ref=dadkkiby'
      try {
        await prisma.peptideSupplier.update({
          where: { peptideId_supplierId: { peptideId: peptide.id, supplierId: royal.id } },
          data: { productUrl: affiliateUrl },
        })
        console.log(`  ${peptide.name} → Royal: ${affiliateUrl}`)
        updated++
      } catch {
        console.log(`  ${peptide.name} → Royal: no link exists in DB, skipping`)
      }
    }
  }

  // Also add BAC water as supplier products
  const supplies = [
    {
      supplierId: ascension.id,
      name: 'Bacteriostatic Water (10mL)',
      slug: 'bac-water-10ml',
      productUrl: 'https://ascensionpeptides.com/product/bacteriostatic-water-10ml/ref/Pept/',
      category: 'supply',
    },
    {
      supplierId: royal.id,
      name: 'Bacteriostatic Water',
      slug: 'bac-water',
      productUrl: 'https://royal-peptides.com/shop/bacteriostatic-water/?ref=dadkkiby',
      category: 'supply',
    },
  ]

  for (const supply of supplies) {
    await prisma.supplierProduct.upsert({
      where: { supplierId_slug: { supplierId: supply.supplierId, slug: supply.slug } },
      update: { productUrl: supply.productUrl },
      create: supply,
    })
    console.log(`  Supply: ${supply.name} — ${supply.productUrl}`)
  }

  console.log(`\nDone — updated ${updated} product URLs + ${supplies.length} supplies`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
