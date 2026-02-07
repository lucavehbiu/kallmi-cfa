/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kallmibukur.al',
      },
      {
        protocol: 'https',
        hostname: 'fishandmore.co.uk',
      },
      {
        protocol: 'https',
        hostname: 'www.charlottefashionplate.com',
      },
      {
        protocol: 'https',
        hostname: 'yourguardianchef.com',
      },
      {
        protocol: 'https',
        hostname: 'images.themodernproper.com',
      },
      {
        protocol: 'https',
        hostname: 'saladswithanastasia.com',
      },
      {
        protocol: 'https',
        hostname: 'i0.wp.com',
      },
      {
        protocol: 'https',
        hostname: 'fitfoodiefinds.com',
      },
      {
        protocol: 'https',
        hostname: 'www.allrecipes.com',
      },
      {
        protocol: 'https',
        hostname: 'media-cdn.tripadvisor.com',
      },
      {
        protocol: 'https',
        hostname: 'www.seriouseats.com',
      },
      {
        protocol: 'https',
        hostname: 'cookingwithnonna.com',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'foto1.sluurpy.com',
      },
      {
        protocol: 'https',
        hostname: 'happyhealthymama.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 80, 85, 90, 95, 100],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24, // 24 hours
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Modern optimization features
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Enable modern optimizations
  typedRoutes: true,
  // Enable modern output
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  // Performance optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimize production builds
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      }
    }

    return config
  },
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          }
        ]
      }
    ]
  },
  serverExternalPackages: [],
  async redirects() {
    return [
      // Non-www to www redirect
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'kallmibukur.al',
          },
        ],
        destination: 'https://www.kallmibukur.al/:path*',
        permanent: true,
      },
      // HTTP to HTTPS redirect (handled at server level but adding for completeness)
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://www.kallmibukur.al/:path*',
        permanent: true,
      },
      // Redirect old limited-edition page to our-story
      {
        source: '/limited-edition',
        destination: '/our-story',
        permanent: true,
      },
    ]
  },
}

export default nextConfig