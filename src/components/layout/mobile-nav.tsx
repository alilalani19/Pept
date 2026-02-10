'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  FlaskConical,
  Layers,
  Building2,
  MessageSquare,
  Search,
} from 'lucide-react'
import { SITE_NAME } from '@/lib/constants'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/peptides', label: 'Peptides', icon: FlaskConical },
  { href: '/categories', label: 'Categories', icon: Layers },
  { href: '/suppliers', label: 'Suppliers', icon: Building2 },
  { href: '/assistant', label: 'AI Assistant', icon: MessageSquare },
  { href: '/search', label: 'Search', icon: Search },
]

interface MobileNavProps {
  open: boolean
  onClose: () => void
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname()

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')

  // Close on route change
  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60"
            onClick={onClose}
          />

          {/* Sliding Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-50 w-full max-w-xs border-r border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4 dark:border-slate-800">
                <Link
                  href="/"
                  onClick={onClose}
                  className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white"
                >
                  <FlaskConical className="h-5 w-5 text-blue-600" />
                  {SITE_NAME}
                </Link>
                <button
                  onClick={onClose}
                  className="rounded-md p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close menu</span>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 space-y-1 overflow-y-auto p-4">
                {navLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={onClose}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors',
                        isActive(link.href)
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300'
                          : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                      )}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      {link.label}
                    </Link>
                  )
                })}
              </nav>

              {/* Footer */}
              <div className="border-t border-slate-200 p-4 dark:border-slate-800">
                <Link
                  href="/api/auth/signin"
                  onClick={onClose}
                  className="block w-full rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
