'use client'

import { useState, useTransition } from 'react'
import { cn } from '@/lib/utils'

const ROLES = ['USER', 'EMPLOYEE', 'ADMIN'] as const

interface RoleSelectorProps {
  userId: string
  currentRole: string
  updateRoleAction: (userId: string, role: string) => Promise<{ error?: string }>
}

export function RoleSelector({ userId, currentRole, updateRoleAction }: RoleSelectorProps) {
  const [role, setRole] = useState(currentRole)
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')

  function handleChange(newRole: string) {
    setRole(newRole)
    setMessage('')
    startTransition(async () => {
      const result = await updateRoleAction(userId, newRole)
      if (result.error) {
        setRole(currentRole)
        setMessage(result.error)
      } else {
        setMessage('Role updated')
        setTimeout(() => setMessage(''), 2000)
      }
    })
  }

  return (
    <div className="flex items-center gap-3">
      <select
        value={role}
        onChange={(e) => handleChange(e.target.value)}
        disabled={isPending}
        className={cn(
          'rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900',
          'focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500',
          'dark:border-slate-700 dark:bg-slate-800 dark:text-white',
          'disabled:opacity-50'
        )}
      >
        {ROLES.map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>
      {isPending && <span className="text-xs text-slate-500">Saving...</span>}
      {message && !isPending && (
        <span className={cn('text-xs', message === 'Role updated' ? 'text-green-600' : 'text-red-500')}>
          {message}
        </span>
      )}
    </div>
  )
}
