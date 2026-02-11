'use client'

import { useState } from 'react'
import { ChatInterface } from './chat-interface'

const SUGGESTIONS = ['What is BPC-157?', 'TB-500 research', 'GHK-Cu for skin']

export function HomeChatBox() {
  const [initialQuery, setInitialQuery] = useState<string | undefined>(undefined)
  const [started, setStarted] = useState(false)

  function handleSuggestion(suggestion: string) {
    setInitialQuery(suggestion)
    setStarted(true)
  }

  return (
    <div className="relative mx-auto max-w-2xl">
      <div className="h-[28rem] sm:h-[32rem]">
        <ChatInterface
          initialQuery={initialQuery}
          className="h-full"
        />
      </div>
      {!started && (
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => handleSuggestion(suggestion)}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500 transition-colors hover:border-sky-300 hover:text-sky-600 dark:border-slate-700 dark:text-slate-400 dark:hover:border-sky-600 dark:hover:text-sky-400"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
