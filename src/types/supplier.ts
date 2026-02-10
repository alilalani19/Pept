export type SupplierWithRelations = {
  id: string
  name: string
  slug: string
  description: string
  website: string
  affiliateBaseUrl: string | null
  affiliateCode: string | null
  coaAvailable: boolean
  coaUrl: string | null
  thirdPartyTested: boolean
  transparencyScore: number
  published: boolean
  createdAt: Date
  updatedAt: Date
  peptides: {
    peptide: {
      id: string
      name: string
      slug: string
    }
    productUrl: string | null
    price: number | null
  }[]
}

export type SupplierCard = {
  id: string
  name: string
  slug: string
  description: string
  transparencyScore: number
  coaAvailable: boolean
  thirdPartyTested: boolean
}
