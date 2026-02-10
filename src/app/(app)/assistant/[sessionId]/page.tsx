import { Metadata } from 'next'
import { ChatInterface } from '@/components/chat/chat-interface'
import { createMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = createMetadata({
  title: 'AI Research Assistant',
  description: 'Continue your conversation with the AI research assistant.',
  path: '/assistant',
  noIndex: true,
})

export default async function AssistantSessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>
}) {
  const { sessionId } = await params

  return (
    <div className="mx-auto max-w-4xl h-[calc(100vh-4rem)]">
      <ChatInterface sessionId={sessionId} />
    </div>
  )
}
