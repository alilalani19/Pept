import Link from 'next/link'
import { Globe } from 'lucide-react'
import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { AdminChatSessions } from '@/components/admin/admin-chat-sessions'

export default async function AdminChatsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; filter?: string }>
}) {
  const session = await auth()
  if (session?.user?.role === 'EMPLOYEE') redirect('/admin/inbox')

  const { page: pageParam, search, filter } = await searchParams
  const page = Math.max(1, parseInt(pageParam || '1') || 1)
  const limit = 20

  // Build filter conditions
  let allSessionIds: string[] | null = null

  if (filter === 'anonymous' || filter === 'users') {
    const filtered: { id: string }[] = filter === 'anonymous'
      ? await prisma.$queryRaw`SELECT id FROM chat_sessions WHERE "userId" IS NULL`
      : await prisma.$queryRaw`SELECT id FROM chat_sessions WHERE "userId" IS NOT NULL`
    allSessionIds = filtered.map((r) => r.id)
  }

  const where: any = {}
  if (allSessionIds !== null) {
    where.id = { in: allSessionIds }
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' as const } },
      {
        messages: {
          some: { content: { contains: search, mode: 'insensitive' as const } },
        },
      },
      {
        user: {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { email: { contains: search, mode: 'insensitive' as const } },
          ],
        },
      },
    ]
  }

  const [sessions, total] = await Promise.all([
    prisma.chatSession.findMany({
      where,
      include: {
        user: { select: { id: true, name: true, email: true, image: true } },
        messages: {
          select: { id: true, role: true, content: true, createdAt: true },
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { updatedAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.chatSession.count({ where }),
  ])

  const totalPages = Math.ceil(total / limit)

  function filterUrl(f: string | undefined) {
    const params = new URLSearchParams()
    if (f) params.set('filter', f)
    if (search) params.set('search', search)
    const qs = params.toString()
    return `/admin/chats${qs ? `?${qs}` : ''}`
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Chat Logs</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {total} total session{total !== 1 && 's'}
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <form className="flex-1 max-w-md">
          <input
            type="text"
            name="search"
            defaultValue={search || ''}
            placeholder="Search by user, title, or message content..."
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
          {filter && <input type="hidden" name="filter" value={filter} />}
        </form>
        <div className="flex items-center gap-1">
          <Link
            href={filterUrl(undefined)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              !filter
                ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
            }`}
          >
            All
          </Link>
          <Link
            href={filterUrl('users')}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === 'users'
                ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
            }`}
          >
            Users
          </Link>
          <Link
            href={filterUrl('anonymous')}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === 'anonymous'
                ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
            }`}
          >
            Anonymous
          </Link>
        </div>
      </div>

      {sessions.length === 0 ? (
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {search ? 'No chat sessions match your search.' : 'No chat sessions yet.'}
        </p>
      ) : (
        <div className="space-y-3">
          {sessions.map((chatSession) => (
            <div key={chatSession.id}>
              <div className="mb-1 flex items-center gap-2 px-1">
                {chatSession.user ? (
                  <>
                    {chatSession.user.image ? (
                      <img
                        src={chatSession.user.image}
                        alt=""
                        className="h-5 w-5 rounded-full"
                      />
                    ) : (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400">
                        <span className="text-[10px] font-medium">
                          {(chatSession.user.name || chatSession.user.email || '?')[0].toUpperCase()}
                        </span>
                      </div>
                    )}
                    <Link
                      href={`/admin/users/${chatSession.user.id}`}
                      className="text-xs font-medium text-sky-500 hover:text-sky-600"
                    >
                      {chatSession.user.name || chatSession.user.email}
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400">
                      <Globe className="h-3 w-3" />
                    </div>
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                      Anonymous
                    </Badge>
                    {chatSession.ipHash && (
                      <span className="text-[10px] font-mono text-slate-400">
                        {chatSession.ipHash}
                      </span>
                    )}
                  </>
                )}
              </div>
              <AdminChatSessions
                sessions={[
                  {
                    id: chatSession.id,
                    title: chatSession.title,
                    updatedAt: chatSession.updatedAt.toISOString(),
                    messages: chatSession.messages.map((m) => ({
                      id: m.id,
                      role: m.role as 'user' | 'assistant' | 'system',
                      content: m.content,
                      createdAt: m.createdAt.toISOString(),
                    })),
                  },
                ]}
              />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          {page > 1 && (
            <Link
              href={`/admin/chats?page=${page - 1}${search ? `&search=${search}` : ''}${filter ? `&filter=${filter}` : ''}`}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Previous
            </Link>
          )}
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={`/admin/chats?page=${page + 1}${search ? `&search=${search}` : ''}${filter ? `&filter=${filter}` : ''}`}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
