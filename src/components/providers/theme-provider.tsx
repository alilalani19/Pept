'use client'

import { createContext, useContext, useEffect } from 'react'

type Theme = 'light' | 'dark'

const ThemeContext = createContext<{
  theme: Theme
  setTheme: (theme: Theme) => void
}>({
  theme: 'dark',
  setTheme: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add('dark')
    localStorage.removeItem('pept-theme')
  }, [])

  return (
    <ThemeContext.Provider value={{ theme: 'dark', setTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
