import { Metadata } from 'next'
import { ChatInterface } from '@/components/chat/chat-interface'
import { createMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = createMetadata({
  title: 'AI Research Assistant',
  description: 'Ask our AI assistant educational questions about peptide research, biology, and science.',
  path: '/assistant',
  noIndex: true,
})

export default async function AssistantPage({
  searchParams,
}: {
  searchParams: Promise<{ peptide?: string }>
}) {
  const params = await searchParams

  return (
    <div className="mx-auto max-w-4xl h-[calc(100vh-4rem)]">
      <ChatInterface
        peptideSlug={params.peptide}
        peptideName={params.peptide}
      />
    </div>
  )
}
