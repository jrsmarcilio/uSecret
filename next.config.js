/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com', 'localhost', 'lh3.googleusercontent.com'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  swcMinify: true,

  serverRuntimeConfig: {
    UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
  },

  publicRuntimeConfig: {
    staticFolder: '/public',
  },

  images: {
    domains: ['images.unsplash.com'],
  },

  env: {
    UNSPLASH_ACCESS_KEY: "mFY51AEfO4auSowiPKHKluHhYeA1IE5MBCf7EDfKONA",
    UNSPLASH_SECRET_KEY: "V5rdeQkIgPxZWQB6OcBfFnceJBrQrslTTPIgAXF6cEY"
  }
}

module.exports = nextConfig
