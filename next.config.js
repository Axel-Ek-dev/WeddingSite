/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ? process.env.NEXT_PUBLIC_BASE_PATH : undefined
const nextConfig = {
  reactStrictMode: true,
  // Ensure exported pages use directory style (e.g. /rsvp/index.html) so GitHub Pages serves /rsvp without a server
  trailingSlash: true,
  // Optional base path for GitHub Pages (set to "/repo-name" during CI deploy if required)
  basePath,
  assetPrefix: basePath ?? undefined,
}

module.exports = nextConfig
