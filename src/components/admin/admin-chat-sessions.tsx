'use client'

import { useState } from 'react'
import { ChevronDown, User, Bot } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  createdAt: string
}

interface Session {
  id: string
  title: string | null
  updatedAt: string
  messages: Message[]
}

export function AdminChatSessions({ sessions }: { sessions: Session[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chat Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        {sessions.length === 0 ? (
          <p className="text-sm text-slate-600">No chat sessions yet.</p>
        ) : (
          <div className="space-y-2">
            {sessions.map((session) => {
              const isExpanded = expandedId === session.id
              return (
                <div
                  key={session.id}
                  className="rounded-lg border border-slate-300 dark:border-slate-800 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedId(isExpanded ? null : session.id)
                    }
                    className="flex w-full items-center justify-between p-3 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                        {session.title || 'Untitled session'}
                      </p>
                      <div className="mt-1 flex items-center gap-3 text-xs text-slate-600">
                        <span>{session.messages.length} messages</span>
                        <span>
                          {new Date(session.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 flex-shrink-0 text-slate-400 transition-transform',
                        isExpanded && 'rotate-180'
                      )}
                    />
                  </button>

                  {isExpanded && (
                    <div className="border-t border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-4 space-y-4 max-h-[500px] overflow-y-auto">
                      {session.messages.map((msg) => {
                        const isUser = msg.role === 'user'
                        return (
                          <div
                            key={msg.id}
                            className={cn(
                              'flex gap-3',
                              isUser ? 'flex-row-reverse' : 'flex-row'
                            )}
                          >
                            <div
                              className={cn(
                                'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full',
                                isUser
                                  ? 'bg-sky-500 text-white'
                                  : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                              )}
                            >
                              {isUser ? (
                                <User className="h-3.5 w-3.5" />
                              ) : (
                                <Bot className="h-3.5 w-3.5" />
                              )}
                            </div>

                            <div
                              className={cn(
                                'max-w-[80%] rounded-2xl px-3.5 py-2',
                                isUser
                                  ? 'bg-sky-500 text-white'
                                  : 'bg-white text-slate-800 dark:bg-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700'
                              )}
                            >
                              {isUser ? (
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                  {msg.content}
                                </p>
                              ) : (
                                <div className="prose prose-sm prose-slate dark:prose-invert max-w-none prose-p:leading-relaxed prose-p:my-1 prose-headings:my-2 prose-headings:text-slate-900 dark:prose-headings:text-white prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5 prose-pre:my-2">
                                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {msg.content}
                                  </ReactMarkdown>
                                </div>
                              )}

                              <p
                                className={cn(
                                  'mt-1 text-[10px]',
                                  isUser
                                    ? 'text-sky-100'
                                    : 'text-slate-400 dark:text-slate-500'
                                )}
                              >
                                {new Date(msg.createdAt).toLocaleTimeString(
                                  [],
                                  { hour: '2-digit', minute: '2-digit' }
                                )}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
