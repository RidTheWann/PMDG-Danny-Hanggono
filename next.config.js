/** @type {import('next').NextConfig} */
const nextConfig = {
  // Konfigurasi untuk SVG
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  // Pastikan environment variables tersedia di client
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    GOOGLE_SHEETS_URL: process.env.GOOGLE_SHEETS_URL,
    SPREADSHEET_ID: process.env.SPREADSHEET_ID,
    // JANGAN ekspos GOOGLE_CREDENTIALS ke client, hanya gunakan di server-side API routes
  },
  // Optimasi untuk production
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Konfigurasi untuk gambar
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA(nextConfig);
