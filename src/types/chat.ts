export type ChatMessage = {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  createdAt: Date
}

export type ChatSession = {
  id: string
  title: string
  createdAt: Date
  updatedAt: Date
  messages: ChatMessage[]
}

export type ChatRequest = {
  message: string
  sessionId?: string
  peptideSlug?: string
}

export type StreamChunk = {
  type: 'text' | 'error' | 'done'
  content: string
}
