import Link from 'next/link'
import { prisma } from '@/lib/db'
import { Badge } from '@/components/ui/badge'

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    include: {
      _count: {
        select: {
          chatSessions: true,
          favorites: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-sm text-slate-500">{users.length} total</p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">User</th>
              <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">Role</th>
              <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">Chat Sessions</th>
              <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">Favorites</th>
              <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">Joined</th>
              <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-slate-200 dark:border-slate-800">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name || ''}
                        className="h-8 w-8 rounded-full"
                      />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400">
                        <span className="text-xs font-medium">
                          {(user.name || user.email || '?')[0].toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {user.name || 'No name'}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={user.role === 'ADMIN' ? 'default' : 'secondary'}>
                    {user.role}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                  {user._count.chatSessions}
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                  {user._count.favorites}
                </td>
                <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/users/${user.id}`}
                    className="text-sky-500 hover:text-sky-600 text-sm font-medium"
                  >
                    View Details
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
