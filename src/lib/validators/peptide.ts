import { z } from 'zod'

export const peptideCreateSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  aliases: z.array(z.string()).default([]),
  summary: z.string().min(1, 'Summary is required').max(500),
  description: z.string().min(1, 'Description is required'),
  sequence: z.string().nullable().default(null),
  molecularWeight: z.number().positive().nullable().default(null),
  mechanismOfAction: z.string().min(1, 'Mechanism of action is required'),
  biologicalPathways: z.array(z.string()).default([]),
  researchFindings: z.string().min(1, 'Research findings are required'),
  evidenceLevel: z.enum(['IN_VITRO', 'ANIMAL', 'LIMITED_HUMAN', 'CLINICAL', 'MIXED']),
  risks: z.string().min(1, 'Risks information is required'),
  legalStatus: z.string().min(1, 'Legal status is required'),
  legalStatusBadge: z.enum(['RESEARCH_ONLY', 'PRESCRIPTION', 'REGULATED', 'BANNED_SPORT', 'UNREGULATED']),
  disclaimer: z.string().min(1, 'Disclaimer is required'),
  published: z.boolean().default(false),
  metaTitle: z.string().max(70).nullable().default(null),
  metaDescription: z.string().max(160).nullable().default(null),
  categoryIds: z.array(z.string()).default([]),
})

export const peptideUpdateSchema = peptideCreateSchema.partial()

export const peptideSearchSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  evidenceLevel: z.enum(['IN_VITRO', 'ANIMAL', 'LIMITED_HUMAN', 'CLINICAL', 'MIXED']).optional(),
  legalStatus: z.enum(['RESEARCH_ONLY', 'PRESCRIPTION', 'REGULATED', 'BANNED_SPORT', 'UNREGULATED']).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(12),
})

export type PeptideCreateInput = z.infer<typeof peptideCreateSchema>
export type PeptideUpdateInput = z.infer<typeof peptideUpdateSchema>
export type PeptideSearchInput = z.infer<typeof peptideSearchSchema>
