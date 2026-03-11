import { Metadata } from 'next'
import { auth, signOut } from '@/lib/auth'
import { createMetadata } from '@/lib/seo/metadata'
import { NotificationSettings } from './notification-settings'
import { User, Bell, LogOut } from 'lucide-react'

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
      <h1 className="animate-element animate-delay-100 text-2xl font-semibold tracking-tight mb-8 text-slate-900 dark:text-white">Account Settings</h1>

      <div className="animate-element animate-delay-200 relative group/feature rounded-xl border border-slate-300 dark:border-neutral-800 overflow-hidden">
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
        <div className="absolute left-0 top-6 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-sky-500 transition-all duration-200 origin-center" />
        <div className="relative z-10 p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-sky-500" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Profile Information</h2>
          </div>
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
        </div>
      </div>

      <NotificationSettings />

      <div className="animate-element animate-delay-400 mt-6 relative group/feature rounded-xl border border-red-200 dark:border-red-900/30 overflow-hidden">
        <div className="relative z-10 p-6">
          <div className="flex items-center gap-2 mb-4">
            <LogOut className="h-5 w-5 text-red-500" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Sign Out</h2>
          </div>
          <form
            action={async () => {
              'use server'
              await signOut({ redirectTo: '/' })
            }}
          >
            <button
              type="submit"
              className="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-600 transition-colors"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
