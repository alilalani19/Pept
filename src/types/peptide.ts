import type { EvidenceLevel, LegalStatusBadge } from '@prisma/client'

export type PeptideWithRelations = {
  id: string
  name: string
  slug: string
  aliases: string[]
  summary: string
  description: string
  sequence: string | null
  molecularWeight: number | null
  mechanismOfAction: string
  biologicalPathways: string[]
  researchFindings: string
  evidenceLevel: EvidenceLevel
  risks: string
  legalStatus: string
  legalStatusBadge: LegalStatusBadge
  disclaimer: string
  published: boolean
  metaTitle: string | null
  metaDescription: string | null
  createdAt: Date
  updatedAt: Date
  categories: {
    category: {
      id: string
      name: string
      slug: string
    }
  }[]
  suppliers: {
    supplier: {
      id: string
      name: string
      slug: string
      transparencyScore: number
      coaAvailable: boolean
      thirdPartyTested: boolean
    }
    productUrl: string | null
    price: number | null
  }[]
}

export type PeptideCard = {
  id: string
  name: string
  slug: string
  summary: string | null
  evidenceLevel: EvidenceLevel | null
  legalStatusBadge: LegalStatusBadge | null
  categories: { category: { name: string; slug: string } }[]
}

export type PeptideSearchParams = {
  q?: string
  category?: string
  evidenceLevel?: EvidenceLevel
  legalStatus?: LegalStatusBadge
  page?: string
}
