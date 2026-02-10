'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Send, Bot } from 'lucide-react'

export function HomeChatBox() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    router.push(`/assistant?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <form onSubmit={handleSubmit} className="relative mx-auto max-w-2xl">
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all focus-within:border-sky-300 focus-within:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:focus-within:border-sky-600">
        <Bot className="h-5 w-5 shrink-0 text-sky-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What is BPC-157? How does TB-500 work?"
          className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none dark:text-white dark:placeholder-slate-500"
        />
        <button
          type="submit"
          disabled={!query.trim()}
          className="shrink-0 rounded-lg bg-sky-500 p-2 text-white transition-colors hover:bg-sky-600 disabled:opacity-30 disabled:hover:bg-sky-500"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {['What is BPC-157?', 'TB-500 research', 'GHK-Cu for skin'].map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => {
              setQuery(suggestion)
              router.push(`/assistant?q=${encodeURIComponent(suggestion)}`)
            }}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500 transition-colors hover:border-sky-300 hover:text-sky-600 dark:border-slate-700 dark:text-slate-400 dark:hover:border-sky-600 dark:hover:text-sky-400"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </form>
  )
}
