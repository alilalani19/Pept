import { SITE_NAME, SITE_URL } from '@/lib/constants'

export function createArticleJsonLd({
  title,
  description,
  slug,
  datePublished,
  dateModified,
}: {
  title: string
  description: string
  slug: string
  datePublished: string
  dateModified: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${SITE_URL}/peptides/${slug}`,
    datePublished,
    dateModified,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/peptides/${slug}`,
    },
  }
}

export function createWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/peptides?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}
