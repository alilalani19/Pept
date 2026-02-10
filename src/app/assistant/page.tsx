import { Metadata } from 'next'
import { auth } from '@/lib/auth'
import { ChatInterface } from '@/components/chat/chat-interface'
import { createMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = createMetadata({
  title: 'AI Research Assistant',
  description:
    'Ask our AI assistant educational questions about peptide research, biology, and science.',
  path: '/assistant',
})

export default async function AssistantPage({
  searchParams,
}: {
  searchParams: Promise<{ peptide?: string; q?: string }>
}) {
  const params = await searchParams
  const session = await auth()
  const isAuthenticated = !!session?.user?.id

  return (
    <div className="mx-auto max-w-4xl h-[calc(100vh-4rem)]">
      <ChatInterface
        peptideSlug={params.peptide}
        peptideName={params.peptide}
        initialQuery={params.q}
      />
      {!isAuthenticated && (
        <p className="mt-2 text-center text-xs text-slate-600 dark:text-slate-500">
          Sign in to save your conversation history.
        </p>
      )}
    </div>
  )
}
