import Link from 'next/link'
import { prisma } from '@/lib/db'
import { Badge } from '@/components/ui/badge'

export default async function AdminSuppliersPage() {
  const suppliers = await prisma.supplier.findMany({
    orderBy: { updatedAt: 'desc' },
    include: {
      _count: { select: { clicks: true, peptides: true } },
    },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Manage Suppliers</h1>
      </div>

      <div className="overflow-x-auto rounded-lg border dark:border-gray-800">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">Score</th>
              <th className="px-4 py-3 text-left font-medium">COA</th>
              <th className="px-4 py-3 text-left font-medium">Tested</th>
              <th className="px-4 py-3 text-left font-medium">Clicks</th>
              <th className="px-4 py-3 text-left font-medium">Published</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.id} className="border-t dark:border-gray-800">
                <td className="px-4 py-3">
                  <p className="font-medium">{supplier.name}</p>
                  <p className="text-xs text-gray-500">/{supplier.slug}</p>
                </td>
                <td className="px-4 py-3">{supplier.transparencyScore}/100</td>
                <td className="px-4 py-3">
                  <Badge variant={supplier.coaAvailable ? 'success' : 'secondary'}>
                    {supplier.coaAvailable ? 'Yes' : 'No'}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={supplier.thirdPartyTested ? 'success' : 'secondary'}>
                    {supplier.thirdPartyTested ? 'Yes' : 'No'}
                  </Badge>
                </td>
                <td className="px-4 py-3">{supplier._count.clicks}</td>
                <td className="px-4 py-3">
                  <Badge variant={supplier.published ? 'success' : 'secondary'}>
                    {supplier.published ? 'Published' : 'Draft'}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
