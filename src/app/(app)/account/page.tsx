import { Metadata } from 'next'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { createMetadata } from '@/lib/seo/metadata'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { BookOpen, MessageSquare, ArrowRight } from 'lucide-react'

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
      <div className="animate-element animate-delay-100 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">My Account</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Welcome back, {session.user.name || session.user.email}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Favorites */}
        <div className="animate-element animate-delay-200 relative group/feature rounded-xl border border-slate-300 dark:border-neutral-800 overflow-hidden">
          <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
          <div className="absolute left-0 top-6 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-sky-500 transition-all duration-200 origin-center" />
          <div className="relative z-10 p-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-sky-500" />
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Saved Peptides</h2>
            </div>
            {favorites.length === 0 ? (
              <p className="text-slate-600 dark:text-slate-400 text-sm">
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
                      className="flex items-center justify-between rounded-lg p-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <span className="font-medium text-sky-500">{fav.peptide.name}</span>
                      <Badge variant="secondary">{fav.peptide.evidenceLevel?.replace('_', ' ') || '—'}</Badge>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Chat History */}
        <div className="animate-element animate-delay-300 relative group/feature rounded-xl border border-slate-300 dark:border-neutral-800 overflow-hidden">
          <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
          <div className="absolute left-0 top-6 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-sky-500 transition-all duration-200 origin-center" />
          <div className="relative z-10 p-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="h-5 w-5 text-sky-500" />
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Chat History</h2>
            </div>
            {chatSessions.length === 0 ? (
              <p className="text-slate-600 dark:text-slate-400 text-sm">
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
                      className="flex items-center justify-between rounded-lg p-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <span className="truncate font-medium text-slate-900 dark:text-white">{cs.title}</span>
                      <span className="text-xs text-slate-500 shrink-0 ml-2">
                        {cs._count.messages} msgs
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="animate-element animate-delay-400 mt-6">
        <Link
          href="/account/settings"
          className="inline-flex items-center gap-1 text-sm text-sky-500 hover:text-sky-600 font-medium transition-colors"
        >
          Account Settings <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}
