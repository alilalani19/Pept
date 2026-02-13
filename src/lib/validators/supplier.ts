import { z } from 'zod'

export const supplierCreateSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  description: z.string().min(1, 'Description is required'),
  website: z.string().url('Must be a valid URL'),
  affiliateBaseUrl: z.string().url().nullable().default(null),
  affiliateCode: z.string().nullable().default(null),
  coaAvailable: z.boolean().default(false),
  coaUrl: z.string().url().nullable().default(null),
  thirdPartyTested: z.boolean().default(false),
  published: z.boolean().default(false),
})

export const supplierUpdateSchema = supplierCreateSchema.partial()

export type SupplierCreateInput = z.infer<typeof supplierCreateSchema>
export type SupplierUpdateInput = z.infer<typeof supplierUpdateSchema>
