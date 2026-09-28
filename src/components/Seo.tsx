import { site } from '@/data/site'

interface SeoProps {
  /** Page title without the brand suffix — that is appended automatically. */
  title?: string
  description: string
  /** Route path, e.g. '/services'. Used for the canonical URL. */
  path: string
  /** Absolute or root-relative share image. */
  image?: string
  /** Emits Organization structured data — use on the home page only. */
  organization?: boolean
}

/**
 * Per-page document metadata.
 *
 * React 19 hoists <title>, <meta> and <link> rendered anywhere in the tree
 * into <head>, so no helmet library is needed. Note that these tags are
 * applied client-side: for crawlers that do not run JavaScript, enable
 * Netlify's prerendering or add a prerender step (see README).
 */
export function Seo({ title, description, path, image, organization = false }: SeoProps) {
  const fullTitle = title ? `${title} — ${site.name}` : `${site.name} — ${site.tagline}`
  const url = `${site.url}${path === '/' ? '' : path}`
  const shareImage = image ?? `${site.url}/og-image.png`

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    description: site.description,
    foundingDate: String(site.founded),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nanjing',
      addressCountry: 'CN',
    },
    sameAs: site.socials.filter((s) => s.href !== '#').map((s) => s.href),
  }

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={shareImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={shareImage} />

      {organization ? (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      ) : null}
    </>
  )
}
