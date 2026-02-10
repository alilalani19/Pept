'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Menu,
  X,
  User,
  LogOut,
  Settings,
  Shield,
  FlaskConical,
  Search,
} from 'lucide-react'
import { SITE_NAME } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface NavUser {
  name?: string | null
  email?: string | null
  image?: string | null
  role?: string | null
}

interface NavbarProps {
  user?: NavUser | null
}

const navLinks = [
  { href: '/peptides', label: 'Peptides' },
  { href: '/categories', label: 'Categories' },
  { href: '/suppliers', label: 'Suppliers' },
  { href: '/assistant', label: 'AI Assistant' },
]

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white"
        >
          <FlaskConical className="h-6 w-6 text-sky-500" />
          {SITE_NAME}
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive(link.href)
                  ? 'bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <Link
            href="/peptides"
            className="rounded-md p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Link>

          {/* Auth Section - Desktop */}
          <div className="hidden md:block">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-md p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || 'User'}
                      className="h-7 w-7 rounded-full"
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </button>

                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 z-50 mt-2 w-56 rounded-lg border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-900">
                      <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-700">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {user.name || 'User'}
                        </p>
                        <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        href="/account"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                      >
                        <User className="h-4 w-4" />
                        Account
                      </Link>
                      <Link
                        href="/settings"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                      >
                        <Settings className="h-4 w-4" />
                        Settings
                      </Link>
                      {user.role === 'ADMIN' && (
                        <Link
                          href="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                          <Shield className="h-4 w-4" />
                          Admin
                        </Link>
                      )}
                      <div className="border-t border-slate-200 dark:border-slate-700">
                        <Link
                          href="/api/auth/signout"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-slate-50 dark:text-red-400 dark:hover:bg-slate-800"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/api/auth/signin"
                className="rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-600"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-md p-2 text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800 md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <div className="space-y-1 px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'block rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive(link.href)
                    ? 'bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="border-t border-slate-200 px-4 py-3 dark:border-slate-800">
            {user ? (
              <div className="space-y-1">
                <div className="mb-2 px-3">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {user.name || 'User'}
                  </p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {user.email}
                  </p>
                </div>
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  <User className="h-4 w-4" />
                  Account
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
                {user.role === 'ADMIN' && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                  >
                    <Shield className="h-4 w-4" />
                    Admin
                  </Link>
                )}
                <Link
                  href="/api/auth/signout"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-slate-50 dark:text-red-400 dark:hover:bg-slate-800"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Link>
              </div>
            ) : (
              <Link
                href="/api/auth/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-md bg-sky-500 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-sky-600"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
