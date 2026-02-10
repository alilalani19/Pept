import Link from 'next/link'
import { prisma } from '@/lib/db'
import { Badge } from '@/components/ui/badge'
import { EVIDENCE_LEVELS, LEGAL_STATUS_COLORS } from '@/lib/constants'

export default async function AdminPeptidesPage() {
  const peptides = await prisma.peptide.findMany({
    include: {
      categories: { include: { category: true } },
    },
    orderBy: { updatedAt: 'desc' },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Manage Peptides</h1>
        <Link
          href="/admin/peptides/new"
          className="rounded-lg bg-sky-500 px-4 py-2 text-white hover:bg-sky-600 transition-colors"
        >
          Add Peptide
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border dark:border-slate-800">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">Evidence</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Published</th>
              <th className="px-4 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {peptides.map((peptide) => (
              <tr key={peptide.id} className="border-t dark:border-slate-800">
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium">{peptide.name}</p>
                    <p className="text-xs text-slate-500">/{peptide.slug}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={peptide.evidenceLevel ? EVIDENCE_LEVELS[peptide.evidenceLevel]?.color || '' : ''}>
                    {peptide.evidenceLevel ? EVIDENCE_LEVELS[peptide.evidenceLevel]?.label || peptide.evidenceLevel : '—'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${peptide.legalStatusBadge ? LEGAL_STATUS_COLORS[peptide.legalStatusBadge]?.bg || '' : ''} ${peptide.legalStatusBadge ? LEGAL_STATUS_COLORS[peptide.legalStatusBadge]?.text || '' : ''}`}>
                    {peptide.legalStatusBadge ? LEGAL_STATUS_COLORS[peptide.legalStatusBadge]?.label || peptide.legalStatusBadge : '—'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={peptide.published ? 'success' : 'secondary'}>
                    {peptide.published ? 'Published' : 'Draft'}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/peptides/${peptide.id}/edit`}
                    className="text-sky-500 hover:text-sky-600"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
