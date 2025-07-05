import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pastikan environment variables tersedia di client
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    GOOGLE_SHEETS_URL: process.env.GOOGLE_SHEETS_URL,
    SPREADSHEET_ID: process.env.SPREADSHEET_ID,
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

// Konfigurasi PWA yang diperbaiki
const withPWAConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [],
});

export default withPWAConfig(nextConfig);
