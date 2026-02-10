import { auth } from '@/lib/auth'
import { Navbar } from '@/components/layout/navbar'

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  const user = session?.user
    ? {
        name: session.user.name || undefined,
        email: session.user.email || undefined,
        image: session.user.image || undefined,
        role: session.user.role,
      }
    : undefined

  return (
    <>
      <Navbar user={user} />
      <main>{children}</main>
    </>
  )
}
