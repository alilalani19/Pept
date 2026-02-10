import Link from 'next/link'
import { FlaskConical } from 'lucide-react'
import { SITE_NAME, DISCLAIMER_TEXT } from '@/lib/constants'

const productLinks = [
  { href: '/peptides', label: 'Peptides' },
  { href: '/categories', label: 'Categories' },
  { href: '/suppliers', label: 'Suppliers' },
  { href: '/assistant', label: 'AI Assistant' },
]

const legalLinks = [
  { href: '/disclaimer', label: 'Disclaimer' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/about', label: 'About' },
]

const resourceLinks = [
  { href: '/guides', label: 'Research Guides' },
  { href: '/glossary', label: 'Peptide Glossary' },
  { href: '/faq', label: 'FAQ' },
  { href: '/blog', label: 'Blog' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white"
            >
              <FlaskConical className="h-5 w-5 text-sky-500" />
              {SITE_NAME}
            </Link>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Your trusted educational resource for peptide research and
              information.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Product
            </h3>
            <ul className="mt-3 space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Legal
            </h3>
            <ul className="mt-3 space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resource Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Resources
            </h3>
            <ul className="mt-3 space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 rounded-lg border border-sky-200 bg-sky-50/50 p-4 dark:border-sky-900/50 dark:bg-sky-950/20">
          <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            <strong className="text-slate-700 dark:text-slate-300">Disclaimer:</strong> {DISCLAIMER_TEXT}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">
          <p className="text-center text-xs text-slate-400 dark:text-slate-500">
            &copy; {currentYear} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
