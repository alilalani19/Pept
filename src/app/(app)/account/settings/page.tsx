import { Metadata } from 'next'
import { auth, signOut } from '@/lib/auth'
import { createMetadata } from '@/lib/seo/metadata'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export const metadata: Metadata = createMetadata({
  title: 'Account Settings',
  description: 'Manage your Pept account settings.',
  path: '/account/settings',
  noIndex: true,
})

export default async function AccountSettingsPage() {
  const session = await auth()
  if (!session?.user) return null

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold tracking-tight mb-8 text-slate-900 dark:text-white">Account Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">Name</dt>
              <dd className="mt-1 text-slate-900 dark:text-white">{session.user.name || 'Not set'}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">Email</dt>
              <dd className="mt-1 text-slate-900 dark:text-white">{session.user.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">Role</dt>
              <dd className="mt-1 text-slate-900 dark:text-white">{session.user.role}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Sign Out</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action={async () => {
              'use server'
              await signOut({ redirectTo: '/' })
            }}
          >
            <button
              type="submit"
              className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600 transition-colors"
            >
              Sign Out
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
