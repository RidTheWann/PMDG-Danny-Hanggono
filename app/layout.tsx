'use client';

import Link from 'next/link';
import './globals.css';
import './components/bottom-nav.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { useTheme } from './hooks/useTheme';
import { Sun, Moon } from 'lucide-react';
import Image from 'next/image';
import BottomNav from './components/BottomNav';

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  const { theme, toggleTheme } = useTheme();
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme) {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })()
            `,
          }}
        />
      </head>
      <body
        className="font-sans antialiased bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white min-h-screen flex flex-col"
        suppressHydrationWarning
      >
        {/* Header Navigation */}
        <header className="bg-white dark:bg-gradient-to-r dark:from-blue-900 dark:to-blue-800 border-b-0 dark:border-b-0 sticky top-0 z-50 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo and Title */}
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-gray-100 dark:bg-white rounded-lg flex items-center justify-center shadow-md transform transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/favicon.ico"
                    alt="Logo Praktek Mandiri drg. Danny Hanggono"
                    width={40}
                    height={40}
                    priority
                  />
                </div>
                <div>
                  <h1
                    className="text-lg font-semibold text-gray-900 dark:text-white tracking-wide"
                    aria-label="Praktek Mandiri drg. Danny Hanggono"
                  >
                    Praktek Mandiri
                  </h1>
                  <p className="text-sm text-blue-700 dark:text-blue-200 opacity-90">
                    drg. Danny Hanggono
                  </p>
                </div>
              </div>

              {/* Desktop Navigation Menu */}
              <nav className="hidden md:flex items-center space-x-2">
                <Link
                  href="/"
                  className="px-4 py-2 rounded-lg text-gray-900 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 hover:shadow-md transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Beranda</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-700 dark:bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
                <Link
                  href="/tambah-pasien"
                  className="px-4 py-2 rounded-lg text-gray-900 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 hover:shadow-md transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Data Harian</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-700 dark:bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
                <Link
                  href="/data-pasien"
                  className="px-4 py-2 rounded-lg text-gray-900 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 hover:shadow-md transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Dashboard</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-700 dark:bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
                <Link
                  href="/laporan"
                  className="px-4 py-2 rounded-lg text-gray-900 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 hover:shadow-md transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Arship Tugas</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-700 dark:bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
              </nav>

              {/* Dark/Light Mode Toggle */}
              <button
                onClick={toggleTheme}
                className="ml-4 p-2 rounded-full bg-blue-800 hover:bg-blue-700 transition-colors border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Toggle dark mode"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-300" />
                ) : (
                  <Moon className="w-5 h-5 text-blue-300" />
                )}
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 bg-white dark:bg-gray-900 py-6">
          <div className="fade-in">{children}</div>
        </main>

        {/* Bottom Navigation hanya tampil di mobile */}
        <BottomNav />

        {/* Script untuk menu mobile dengan animasi */}
        {/* <script dangerouslySetInnerHTML={{ __html: ` ... `}} /> */}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
