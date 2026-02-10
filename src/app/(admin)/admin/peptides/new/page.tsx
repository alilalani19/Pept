'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Select } from '@/components/ui/select'

export default function NewPeptidePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const form = new FormData(e.currentTarget)
    const data = {
      name: form.get('name'),
      slug: form.get('slug'),
      summary: form.get('summary'),
      description: form.get('description'),
      sequence: form.get('sequence') || null,
      molecularWeight: form.get('molecularWeight') ? parseFloat(form.get('molecularWeight') as string) : null,
      mechanismOfAction: form.get('mechanismOfAction'),
      researchFindings: form.get('researchFindings'),
      evidenceLevel: form.get('evidenceLevel'),
      risks: form.get('risks'),
      legalStatus: form.get('legalStatus'),
      legalStatusBadge: form.get('legalStatusBadge'),
      disclaimer: form.get('disclaimer'),
      published: form.get('published') === 'on',
      metaTitle: form.get('metaTitle') || null,
      metaDescription: form.get('metaDescription') || null,
    }

    try {
      const res = await fetch('/api/peptides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(JSON.stringify(err.error))
      }

      router.push('/admin/peptides')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create peptide')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Add New Peptide</h1>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <Input name="name" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Slug *</label>
              <Input name="slug" required placeholder="lowercase-with-hyphens" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Summary *</label>
              <textarea name="summary" required rows={2} className="w-full rounded-lg border px-3 py-2 dark:bg-slate-900 dark:border-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description *</label>
              <textarea name="description" required rows={6} className="w-full rounded-lg border px-3 py-2 dark:bg-slate-900 dark:border-slate-700" />
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Scientific Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Sequence</label>
              <Input name="sequence" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Molecular Weight (Da)</label>
              <Input name="molecularWeight" type="number" step="0.01" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mechanism of Action *</label>
              <textarea name="mechanismOfAction" required rows={4} className="w-full rounded-lg border px-3 py-2 dark:bg-slate-900 dark:border-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Research Findings *</label>
              <textarea name="researchFindings" required rows={4} className="w-full rounded-lg border px-3 py-2 dark:bg-slate-900 dark:border-slate-700" />
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Classification & Safety</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Evidence Level *</label>
              <Select name="evidenceLevel" required>
                <option value="">Select...</option>
                <option value="IN_VITRO">In Vitro</option>
                <option value="ANIMAL">Animal Studies</option>
                <option value="LIMITED_HUMAN">Limited Human Data</option>
                <option value="CLINICAL">Clinical Trials</option>
                <option value="MIXED">Mixed Evidence</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Legal Status Badge *</label>
              <Select name="legalStatusBadge" required>
                <option value="">Select...</option>
                <option value="RESEARCH_ONLY">Research Only</option>
                <option value="PRESCRIPTION">Prescription</option>
                <option value="REGULATED">Regulated</option>
                <option value="BANNED_SPORT">Banned in Sport</option>
                <option value="UNREGULATED">Unregulated</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Legal Status Description *</label>
              <textarea name="legalStatus" required rows={3} className="w-full rounded-lg border px-3 py-2 dark:bg-slate-900 dark:border-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Risks *</label>
              <textarea name="risks" required rows={3} className="w-full rounded-lg border px-3 py-2 dark:bg-slate-900 dark:border-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Disclaimer *</label>
              <textarea name="disclaimer" required rows={2} className="w-full rounded-lg border px-3 py-2 dark:bg-slate-900 dark:border-slate-700" />
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>SEO & Publishing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Meta Title</label>
              <Input name="metaTitle" maxLength={70} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Meta Description</label>
              <textarea name="metaDescription" maxLength={160} rows={2} className="w-full rounded-lg border px-3 py-2 dark:bg-slate-900 dark:border-slate-700" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="published" id="published" className="rounded" />
              <label htmlFor="published" className="text-sm font-medium">Published</label>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex gap-4">
          <Button type="submit" loading={isSubmitting}>
            Create Peptide
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
