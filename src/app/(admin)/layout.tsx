import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/layout/sidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect('/api/auth/signin')
  }

  if (session.user.role !== 'ADMIN' && session.user.role !== 'EMPLOYEE') {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar role={session.user.role} />
      <main className="flex-1 p-6 lg:p-8">{children}</main>
    </div>
  )
}
