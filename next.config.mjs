/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kallmi.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Modern optimization features
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Enable modern optimizations
  experimental: {
    optimizeCss: true,
    typedRoutes: true,
    serverActions: true,
  },
  // Enable modern output
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
}

export default nextConfig