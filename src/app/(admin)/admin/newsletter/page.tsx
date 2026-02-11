'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

type User = { id: string; name: string | null; email: string }

export default function NewsletterPage() {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState('')
  const [preview, setPreview] = useState(false)

  const [mode, setMode] = useState<'all' | 'specific'>('all')
  const [users, setUsers] = useState<User[]>([])
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [selectedEmails, setSelectedEmails] = useState<Set<string>>(new Set())
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (mode === 'specific' && users.length === 0) {
      setLoadingUsers(true)
      fetch('/api/admin/newsletter')
        .then((res) => res.json())
        .then((data) => setUsers(data.users ?? []))
        .catch(() => setUsers([]))
        .finally(() => setLoadingUsers(false))
    }
  }, [mode, users.length])

  function toggleEmail(email: string) {
    setSelectedEmails((prev) => {
      const next = new Set(prev)
      if (next.has(email)) next.delete(email)
      else next.add(email)
      return next
    })
  }

  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase()
    return (
      u.email.toLowerCase().includes(q) ||
      (u.name?.toLowerCase().includes(q) ?? false)
    )
  })

  async function handleSend() {
    if (!subject.trim() || !body.trim()) {
      setResult('Subject and body are required')
      return
    }
    if (mode === 'specific' && selectedEmails.size === 0) {
      setResult('Select at least one recipient')
      return
    }

    setSending(true)
    setResult('')
    try {
      const payload: Record<string, unknown> = { subject, body }
      if (mode === 'specific') {
        payload.emails = Array.from(selectedEmails)
      }

      const res = await fetch('/api/admin/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (res.ok) {
        setResult(`Newsletter sent to ${data.sent} recipients`)
        setSubject('')
        setBody('')
        setSelectedEmails(new Set())
      } else {
        setResult(data.error || 'Failed to send')
      }
    } catch {
      setResult('Failed to send')
    } finally {
      setSending(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Newsletter</h1>

      <Card>
        <CardHeader>
          <CardTitle>Compose Newsletter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Recipient mode */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Recipients
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="radio"
                    name="mode"
                    checked={mode === 'all'}
                    onChange={() => setMode('all')}
                    className="accent-sky-500"
                  />
                  All subscribers
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="radio"
                    name="mode"
                    checked={mode === 'specific'}
                    onChange={() => setMode('specific')}
                    className="accent-sky-500"
                  />
                  Specific users
                </label>
              </div>
            </div>

            {/* User picker */}
            {mode === 'specific' && (
              <div className="rounded-lg border border-slate-300 dark:border-slate-700 p-3">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search users..."
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white mb-2"
                />
                {loadingUsers ? (
                  <p className="text-sm text-slate-500">Loading users...</p>
                ) : (
                  <div className="max-h-48 overflow-y-auto space-y-1">
                    {filteredUsers.map((u) => (
                      <label
                        key={u.id}
                        className="flex items-center gap-2 rounded px-2 py-1 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedEmails.has(u.email)}
                          onChange={() => toggleEmail(u.email)}
                          className="accent-sky-500"
                        />
                        <span className="text-slate-700 dark:text-slate-300">
                          {u.name ? `${u.name} — ` : ''}
                          {u.email}
                        </span>
                      </label>
                    ))}
                    {filteredUsers.length === 0 && (
                      <p className="text-sm text-slate-500 px-2">
                        No users found
                      </p>
                    )}
                  </div>
                )}
                {selectedEmails.size > 0 && (
                  <p className="text-xs text-slate-500 mt-2">
                    {selectedEmails.size} user{selectedEmails.size !== 1 && 's'}{' '}
                    selected
                  </p>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Newsletter subject line"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Body (HTML supported)
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={12}
                placeholder="Write your newsletter content here..."
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white font-mono"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setPreview(!preview)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                {preview ? 'Hide Preview' : 'Preview'}
              </button>
              <button
                onClick={handleSend}
                disabled={sending}
                className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-600 transition-colors disabled:opacity-50"
              >
                {sending ? 'Sending...' : 'Send Newsletter'}
              </button>
            </div>

            {result && (
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {result}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {preview && body && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
                {subject || '(No subject)'}
              </h3>
              <div
                className="prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: body }}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
