import { Metadata } from 'next'
import { createMetadata } from '@/lib/seo/metadata'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ThemeToggle } from '@/components/settings/theme-toggle'

export const metadata: Metadata = createMetadata({
  title: 'Settings',
  description: 'Customize your Pept experience.',
  path: '/settings',
  noIndex: true,
})

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold tracking-tight mb-8 text-slate-900 dark:text-white">
        Settings
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <ThemeToggle />
        </CardContent>
      </Card>
    </div>
  )
}
