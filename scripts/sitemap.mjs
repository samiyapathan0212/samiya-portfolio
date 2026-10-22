// Writes dist/sitemap.xml and points robots.txt at it, but only when VITE_SITE_URL is set
// (a sitemap needs absolute URLs, and the real domain isn't known until deployment).
import { appendFileSync, writeFileSync } from 'node:fs'

const origin = (process.env.VITE_SITE_URL ?? '').replace(/\/$/, '')
if (!origin) {
  console.log('sitemap: VITE_SITE_URL not set — skipping sitemap.xml')
  process.exit(0)
}
const paths = ['/', '/projects/foresight', '/projects/shopsphere', '/projects/internship-job-portal']
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
  .map((p) => `  <url><loc>${origin}${p}</loc></url>`)
  .join('\n')}\n</urlset>\n`
writeFileSync('dist/sitemap.xml', xml)
appendFileSync('dist/robots.txt', `\nSitemap: ${origin}/sitemap.xml\n`)
console.log(`sitemap: wrote ${paths.length} URLs for ${origin}`)
