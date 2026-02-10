'use client'

import { useTheme } from '@/components/providers/theme-provider'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center gap-4">
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Choose your preferred appearance
      </p>
      <div className="flex rounded-lg border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setTheme('light')}
          className={`flex items-center gap-2 rounded-l-lg px-3 py-2 text-sm transition-colors ${
            theme === 'light'
              ? 'bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400'
              : 'text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
          }`}
        >
          <Sun className="h-4 w-4" />
          Light
        </button>
        <button
          onClick={() => setTheme('dark')}
          className={`flex items-center gap-2 rounded-r-lg px-3 py-2 text-sm transition-colors ${
            theme === 'dark'
              ? 'bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400'
              : 'text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
          }`}
        >
          <Moon className="h-4 w-4" />
          Dark
        </button>
      </div>
    </div>
  )
}
