/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ['images.unsplash.com'],
  },

  env: {
    UNSPLASH_ACCESS_KEY: "mFY51AEfO4auSowiPKHKluHhYeA1IE5MBCf7EDfKONA",
    UNSPLASH_SECRET_KEY: "V5rdeQkIgPxZWQB6OcBfFnceJBrQrslTTPIgAXF6cEY"
  }
}

module.exports = nextConfig
