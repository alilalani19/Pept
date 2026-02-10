import type { Metadata } from 'next'
import { SITE_NAME, SITE_URL } from '@/lib/constants'

export function createMetadata({
  title,
  description,
  path = '',
  image,
  noIndex = false,
}: {
  title: string
  description: string
  path?: string
  image?: string
  noIndex?: boolean
}): Metadata {
  const url = `${SITE_URL}${path}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      ...(image && { images: [{ url: image, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  }
}
