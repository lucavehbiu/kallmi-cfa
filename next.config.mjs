/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kallmibukur.al',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Modern optimization features
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Enable modern optimizations
  experimental: {
    optimizeCss: true,
    typedRoutes: true
  },
  // Enable modern output
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
}

export default nextConfig