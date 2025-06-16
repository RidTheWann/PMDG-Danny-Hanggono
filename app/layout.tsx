
import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'Praktek Mandiri drg. Danny Hanggono',
  description: 'Sistem Manajemen Digital untuk Praktek Dokter Gigi drg. Danny Hanggono',
  keywords: ['dokter gigi', 'praktek mandiri', 'dental clinic', 'manajemen pasien'],
  authors: [{ name: 'drg. Danny Hanggono' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Praktek Mandiri drg. Danny Hanggono',
    description: 'Sistem Manajemen Digital untuk Praktek Dokter Gigi drg. Danny Hanggono',
    type: 'website',
    locale: 'id_ID',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1e40af" />
      </head>
      <body className="font-sans antialiased bg-gray-900 text-white min-h-screen">
        {/* Header Navigation */}
        <header className="bg-blue-800 border-b border-blue-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo and Title */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">+</span>
                  </div>
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-white">Praktek Mandiri</h1>
                  <p className="text-sm text-blue-200">drg. Danny Hanggono</p>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="hidden md:flex items-center space-x-1">
                <Link
                  href="/"
                  className="px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition-colors"
                >
                  Beranda
                </Link>
                <Link
                  href="/tambah-pasien"
                  className="px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition-colors"
                >
                  Data Harian
                </Link>
                <Link
                  href="/data-pasien"
                  className="px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/laporan"
                  className="px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition-colors"
                >
                  Arship Tugas
                </Link>
              </nav>

              {/* Settings Icon */}
              <div className="flex items-center">
                <button className="p-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 bg-gray-900">
          {children}
        </main>
      </body>
    </html>
  )
}
