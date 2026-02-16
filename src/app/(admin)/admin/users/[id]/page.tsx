import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AdminChatSessions } from '@/components/admin/admin-chat-sessions'
import { ConfirmDeleteButton } from '@/components/admin/confirm-delete-button'

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      favorites: {
        include: { peptide: { select: { name: true, slug: true } } },
        orderBy: { createdAt: 'desc' },
      },
      chatSessions: {
        include: {
          messages: {
            select: { id: true, role: true, content: true, createdAt: true },
            orderBy: { createdAt: 'asc' },
          },
        },
        orderBy: { updatedAt: 'desc' },
        take: 20,
      },
      accounts: {
        select: { provider: true, type: true },
      },
    },
  })

  if (!user) notFound()

  const affiliateClicks = await prisma.affiliateClick.findMany({
    where: { userId: user.id },
    include: {
      supplier: { select: { name: true, slug: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: 20,
  })

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/users"
          className="text-sm text-slate-600 hover:text-sky-500 transition-colors"
        >
          &larr; Back to Users
        </Link>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-4 mb-8">
        {user.image ? (
          <img
            src={user.image}
            alt={user.name || ''}
            className="h-16 w-16 rounded-full"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400">
            <span className="text-xl font-medium">
              {(user.name || user.email || '?')[0].toUpperCase()}
            </span>
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {user.name || 'No name'}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">{user.email}</p>
          <div className="mt-1 flex items-center gap-2">
            <Badge variant={user.role === 'ADMIN' ? 'default' : 'secondary'}>
              {user.role}
            </Badge>
            {user.accounts.map((acc) => (
              <Badge key={acc.provider} variant="outline">
                {acc.provider}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-2xl font-bold">{user.chatSessions.length}</p>
            <p className="text-xs text-slate-600">Chat Sessions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-2xl font-bold">
              {user.chatSessions.reduce((sum, s) => sum + s.messages.length, 0)}
            </p>
            <p className="text-xs text-slate-600">Total Messages</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-2xl font-bold">{user.favorites.length}</p>
            <p className="text-xs text-slate-600">Favorites</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-2xl font-bold">{affiliateClicks.length}</p>
            <p className="text-xs text-slate-600">Affiliate Clicks</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Chat History */}
        <AdminChatSessions
          sessions={user.chatSessions.map((s) => ({
            id: s.id,
            title: s.title,
            updatedAt: s.updatedAt.toISOString(),
            messages: s.messages.map((m) => ({
              id: m.id,
              role: m.role as 'user' | 'assistant' | 'system',
              content: m.content,
              createdAt: m.createdAt.toISOString(),
            })),
          }))}
        />

        {/* Favorites */}
        <Card>
          <CardHeader>
            <CardTitle>Favorites</CardTitle>
          </CardHeader>
          <CardContent>
            {user.favorites.length === 0 ? (
              <p className="text-sm text-slate-600">No favorites yet.</p>
            ) : (
              <div className="space-y-2">
                {user.favorites.map((fav) => (
                  <div
                    key={fav.id}
                    className="flex items-center justify-between rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-800"
                  >
                    <Link
                      href={`/peptides/${fav.peptide.slug}`}
                      className="text-sm font-medium text-sky-500 hover:text-sky-600"
                    >
                      {fav.peptide.name}
                    </Link>
                    <span className="text-xs text-slate-600">
                      {new Date(fav.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Affiliate Clicks */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Affiliate Click History</CardTitle>
          </CardHeader>
          <CardContent>
            {affiliateClicks.length === 0 ? (
              <p className="text-sm text-slate-600">No affiliate clicks recorded.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-300 dark:border-slate-800">
                      <th className="py-2 text-left font-medium text-slate-700 dark:text-slate-300">Supplier</th>
                      <th className="py-2 text-left font-medium text-slate-700 dark:text-slate-300">Peptide</th>
                      <th className="py-2 text-left font-medium text-slate-700 dark:text-slate-300">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {affiliateClicks.map((click) => (
                      <tr key={click.id} className="border-b border-slate-300 dark:border-slate-800">
                        <td className="py-2">
                          <Link
                            href={`/suppliers/${click.supplier.slug}`}
                            className="text-sky-500 hover:text-sky-600"
                          >
                            {click.supplier.name}
                          </Link>
                        </td>
                        <td className="py-2 text-slate-600 dark:text-slate-400">
                          {click.peptideId || '—'}
                        </td>
                        <td className="py-2 text-slate-600">
                          {new Date(click.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Account Details */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-slate-600">User ID</dt>
              <dd className="mt-1 text-xs font-mono text-slate-700 dark:text-slate-300">{user.id}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-slate-600">Joined</dt>
              <dd className="mt-1 text-slate-700 dark:text-slate-300">
                {new Date(user.createdAt).toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-slate-600">Last Updated</dt>
              <dd className="mt-1 text-slate-700 dark:text-slate-300">
                {new Date(user.updatedAt).toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-slate-600">Auth Providers</dt>
              <dd className="mt-1 text-slate-700 dark:text-slate-300">
                {user.accounts.length > 0
                  ? user.accounts.map((a) => a.provider).join(', ')
                  : user.password
                    ? 'Credentials'
                    : 'None'}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      {/* Delete Account */}
      <Card className="mt-6 border-red-200 dark:border-red-900/50">
        <CardHeader>
          <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Permanently delete this account and all associated data (sessions, favorites, chat history).
            This also removes them from all email lists. This action cannot be undone.
          </p>
          <ConfirmDeleteButton
            label="Delete Account"
            message="Permanently delete this account and all their data? This cannot be undone."
            action={async () => {
              'use server'
              const target = await prisma.user.findUnique({
                where: { id },
                select: { email: true },
              })

              if (target?.email) {
                await prisma.newsletterSubscriber.deleteMany({
                  where: { email: target.email },
                })
              }

              await prisma.user.delete({ where: { id } })
              redirect('/admin/users')
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
