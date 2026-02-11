import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { Badge } from '@/components/ui/badge'

export default async function AdminEmailDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const email = await prisma.inboundEmail.findUnique({ where: { id } })
  if (!email) notFound()

  if (!email.read) {
    await prisma.inboundEmail.update({
      where: { id },
      data: { read: true },
    })
  }

  return (
    <div>
      <Link
        href="/admin/inbox"
        className="text-sm text-sky-500 hover:text-sky-600 font-medium"
      >
        &larr; Back to Inbox
      </Link>

      <div className="mt-6 rounded-lg border border-slate-300 dark:border-slate-800 overflow-hidden">
        <div className="bg-slate-50 dark:bg-slate-900 px-6 py-4 space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              {email.subject}
            </h1>
            <Badge variant={email.read ? 'secondary' : 'info'}>
              {email.read ? 'Read' : 'Unread'}
            </Badge>
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
            <p><span className="font-medium text-slate-700 dark:text-slate-300">From:</span> {email.from}</p>
            <p><span className="font-medium text-slate-700 dark:text-slate-300">To:</span> {email.to}</p>
            <p><span className="font-medium text-slate-700 dark:text-slate-300">Date:</span> {new Date(email.createdAt).toLocaleString()}</p>
          </div>
        </div>

        <div className="px-6 py-6">
          {email.html ? (
            <div
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: email.html }}
            />
          ) : email.text ? (
            <pre className="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300">
              {email.text}
            </pre>
          ) : (
            <p className="text-slate-500 dark:text-slate-400 italic">
              No email content available.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
