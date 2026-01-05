/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */ const repoBasePath = process.env.NEXT_PUBLIC_BASE_PATH || (process.env.GITHUB_PAGES ? '/WeddingSite' : undefined)

const nextConfig = {
  reactStrictMode: true,
  // Ensure exported pages use directory style (e.g. /rsvp/index.html)
  trailingSlash: true,
  basePath: repoBasePath || undefined,
  // Use explicit assetPrefix when basePath is set so exported assets reference correct path
  assetPrefix: repoBasePath || undefined,
}

module.exports = nextConfig
