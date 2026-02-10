'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface Prefs {
  emailSignInAlert: boolean
  emailNewPeptide: boolean
  emailNewsletter: boolean
}

export function NotificationSettings() {
  const [prefs, setPrefs] = useState<Prefs | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/notifications/preferences')
      .then((r) => r.json())
      .then(setPrefs)
      .catch(() => setMessage('Failed to load preferences'))
  }, [])

  async function save() {
    if (!prefs) return
    setSaving(true)
    setMessage('')
    try {
      const res = await fetch('/api/notifications/preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prefs),
      })
      if (res.ok) {
        setMessage('Preferences saved')
      } else {
        setMessage('Failed to save')
      }
    } catch {
      setMessage('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  function toggle(key: keyof Prefs) {
    if (!prefs) return
    setPrefs({ ...prefs, [key]: !prefs[key] })
  }

  if (!prefs) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-500">Loading...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Email Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Toggle
            label="Sign-in alerts"
            description="Get notified when someone signs into your account"
            checked={prefs.emailSignInAlert}
            onChange={() => toggle('emailSignInAlert')}
          />
          <Toggle
            label="New peptide listings"
            description="Get notified when a new peptide is added"
            checked={prefs.emailNewPeptide}
            onChange={() => toggle('emailNewPeptide')}
          />
          <Toggle
            label="Newsletter"
            description="Receive occasional newsletters from Pept"
            checked={prefs.emailNewsletter}
            onChange={() => toggle('emailNewsletter')}
          />
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={save}
            disabled={saving}
            className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-600 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Preferences'}
          </button>
          {message && (
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {message}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-900 dark:text-white">
          {label}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
          checked ? 'bg-sky-500' : 'bg-slate-300 dark:bg-slate-600'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  )
}
