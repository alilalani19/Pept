export function buildAffiliateUrl({
  baseUrl,
  affiliateCode,
  peptideSlug,
}: {
  baseUrl: string
  affiliateCode: string
  peptideSlug?: string
}) {
  const url = new URL(baseUrl)
  url.searchParams.set('ref', affiliateCode)
  if (peptideSlug) {
    url.searchParams.set('product', peptideSlug)
  }
  return url.toString()
}
