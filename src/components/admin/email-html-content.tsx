'use client'

import DOMPurify from 'dompurify'

export function EmailHtmlContent({ html }: { html: string }) {
  const sanitizedHtml = DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
  })

  return (
    <div
      className="prose dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  )
}
