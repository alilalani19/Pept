import Link from 'next/link'
import { prisma } from '@/lib/db'
import { Badge } from '@/components/ui/badge'

export default async function AdminInboxPage() {
  const emails = await prisma.inboundEmail.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const unreadCount = emails.filter((e) => !e.read).length

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Inbox</h1>
        <p className="text-sm text-slate-600">
          {unreadCount} unread / {emails.length} total
        </p>
      </div>

      {emails.length === 0 ? (
        <div className="rounded-lg border border-slate-300 dark:border-slate-800 p-12 text-center">
          <p className="text-slate-500 dark:text-slate-400">No emails yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-300 dark:border-slate-800">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">From</th>
                <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">Subject</th>
                <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">Date</th>
                <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {emails.map((email) => (
                <tr key={email.id} className="border-t border-slate-300 dark:border-slate-800">
                  <td className={`px-4 py-3 ${!email.read ? 'font-semibold text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                    <Link href={`/admin/inbox/${email.id}`} className="hover:underline">
                      {email.from}
                    </Link>
                  </td>
                  <td className={`px-4 py-3 ${!email.read ? 'font-semibold text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                    <Link href={`/admin/inbox/${email.id}`} className="hover:underline">
                      {email.subject}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    {new Date(email.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={email.read ? 'secondary' : 'info'}>
                      {email.read ? 'Read' : 'Unread'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
