
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Praktek Mandiri drg. Danny Hanggono',
  description: 'Sistem Manajemen Pasien - Praktek Mandiri drg. Danny Hanggono',
  keywords: ['dokter gigi', 'praktek mandiri', 'dental clinic', 'manajemen pasien'],
  authors: [{ name: 'drg. Danny Hanggono' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Praktek Mandiri drg. Danny Hanggono',
    description: 'Sistem Manajemen Pasien - Praktek Mandiri drg. Danny Hanggono',
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
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className="font-sans antialiased bg-gray-50 text-gray-900">
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
