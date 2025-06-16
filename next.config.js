
/** @type {import('next').NextConfig} */
const nextConfig = {
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
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    GOOGLE_SHEETS_URL: process.env.GOOGLE_SHEETS_URL,
    SPREADSHEET_ID: process.env.SPREADSHEET_ID,
    GOOGLE_CREDENTIALS: process.env.GOOGLE_CREDENTIALS,
  },
}

module.exports = nextConfig
