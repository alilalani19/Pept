import { prisma } from '@/lib/db'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default async function AdminDashboard() {
  const [peptideCount, supplierCount, categoryCount, userCount, clickCount] =
    await Promise.all([
      prisma.peptide.count(),
      prisma.supplier.count(),
      prisma.category.count(),
      prisma.user.count(),
      prisma.affiliateClick.count(),
    ])

  const recentClicks = await prisma.affiliateClick.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
    include: {
      supplier: { select: { name: true } },
    },
  })

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Admin Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-500">Peptides</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{peptideCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-500">Suppliers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{supplierCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-500">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{categoryCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-500">Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{userCount}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent Affiliate Clicks</CardTitle>
        </CardHeader>
        <CardContent>
          {recentClicks.length === 0 ? (
            <p className="text-slate-500 text-sm">No clicks recorded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b dark:border-slate-800">
                    <th className="py-2 text-left font-medium">Supplier</th>
                    <th className="py-2 text-left font-medium">Peptide</th>
                    <th className="py-2 text-left font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentClicks.map((click) => (
                    <tr key={click.id} className="border-b dark:border-slate-800">
                      <td className="py-2">{click.supplier.name}</td>
                      <td className="py-2">{click.peptideId || '—'}</td>
                      <td className="py-2 text-slate-500">
                        {new Date(click.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-4 text-sm text-slate-500">
        Total affiliate clicks: {clickCount}
      </div>
    </div>
  )
}
