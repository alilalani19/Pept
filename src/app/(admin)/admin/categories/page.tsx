import { prisma } from '@/lib/db'
import { Badge } from '@/components/ui/badge'

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: { select: { peptides: true } },
    },
    orderBy: { name: 'asc' },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Manage Categories</h1>
      </div>

      <div className="overflow-x-auto rounded-lg border dark:border-slate-800">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">Slug</th>
              <th className="px-4 py-3 text-left font-medium">Peptides</th>
              <th className="px-4 py-3 text-left font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-t dark:border-slate-800">
                <td className="px-4 py-3 font-medium">{category.name}</td>
                <td className="px-4 py-3 text-slate-500">/{category.slug}</td>
                <td className="px-4 py-3">
                  <Badge variant="secondary">{category._count.peptides}</Badge>
                </td>
                <td className="px-4 py-3 text-slate-500 max-w-xs truncate">
                  {category.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
