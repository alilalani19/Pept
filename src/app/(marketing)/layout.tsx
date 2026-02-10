import { auth } from '@/lib/auth'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar
        user={
          session?.user
            ? {
                name: session.user.name ?? null,
                email: session.user.email ?? null,
                image: session.user.image ?? null,
                role: session.user.role ?? 'USER',
              }
            : undefined
        }
      />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
