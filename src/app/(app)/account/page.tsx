import { Metadata } from 'next'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { createMetadata } from '@/lib/seo/metadata'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = createMetadata({
  title: 'My Account',
  description: 'Manage your Pept account, view favorites, and chat history.',
  path: '/account',
  noIndex: true,
})

export default async function AccountPage() {
  const session = await auth()
  if (!session?.user?.id) return null

  const [favorites, chatSessions] = await Promise.all([
    prisma.favorite.findMany({
      where: { userId: session.user.id },
      include: {
        peptide: {
          select: { name: true, slug: true, evidenceLevel: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),
    prisma.chatSession.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: 'desc' },
      take: 10,
      include: { _count: { select: { messages: true } } },
    }),
  ])

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Account</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Welcome back, {session.user.name || session.user.email}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Favorites */}
        <Card>
          <CardHeader>
            <CardTitle>Saved Peptides</CardTitle>
          </CardHeader>
          <CardContent>
            {favorites.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No saved peptides yet.{' '}
                <Link href="/peptides" className="text-sky-500 hover:underline">
                  Browse the directory
                </Link>
              </p>
            ) : (
              <ul className="space-y-2">
                {favorites.map((fav) => (
                  <li key={fav.id}>
                    <Link
                      href={`/peptides/${fav.peptide.slug}`}
                      className="flex items-center justify-between rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      <span className="font-medium text-sky-500">{fav.peptide.name}</span>
                      <Badge variant="secondary">{fav.peptide.evidenceLevel?.replace('_', ' ') || '—'}</Badge>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Chat History */}
        <Card>
          <CardHeader>
            <CardTitle>Chat History</CardTitle>
          </CardHeader>
          <CardContent>
            {chatSessions.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No conversations yet.{' '}
                <Link href="/assistant" className="text-sky-500 hover:underline">
                  Start a conversation
                </Link>
              </p>
            ) : (
              <ul className="space-y-2">
                {chatSessions.map((cs) => (
                  <li key={cs.id}>
                    <Link
                      href={`/assistant/${cs.id}`}
                      className="flex items-center justify-between rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      <span className="truncate font-medium">{cs.title}</span>
                      <span className="text-xs text-gray-500 shrink-0 ml-2">
                        {cs._count.messages} msgs
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Link
          href="/account/settings"
          className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          Account Settings →
        </Link>
      </div>
    </div>
  )
}
