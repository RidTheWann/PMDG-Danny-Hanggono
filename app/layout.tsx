"use client";

import type { Metadata, Viewport } from 'next'
import Link from 'next/link'
import './globals.css'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { useTheme } from './hooks/useTheme';
import { Sun, Moon } from 'lucide-react';
import Image from 'next/image';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1e40af'
}

export const metadata: Metadata = {
  metadataBase: new URL('https://praktek-mandiri-drg-danny-hanggono.vercel.app/'), // Ganti dengan URL produksi Anda
  title: 'Praktek Mandiri drg. Danny Hanggono',
  description: 'Sistem Manajemen Digital untuk Praktek Dokter Gigi drg. Danny Hanggono',
  keywords: ['dokter gigi', 'praktek mandiri', 'dental clinic', 'manajemen pasien'],
  authors: [{ name: 'drg. Danny Hanggono' }],
  robots: 'index, follow',
  manifest: '/manifest.json',
  openGraph: {
    title: 'Praktek Mandiri drg. Danny Hanggono',
    description: 'Sistem Manajemen Digital untuk Praktek Dokter Gigi drg. Danny Hanggono',
    type: 'website',
    locale: 'id_ID',
    images: [
      {
        url: '/Praktek.png',
        width: 800,
        height: 600,
        alt: 'Praktek Mandiri drg. Danny Hanggono'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Praktek Mandiri drg. Danny Hanggono',
    description: 'Sistem Manajemen Digital untuk Praktek Dokter Gigi drg. Danny Hanggono',
    images: ['/Praktek.png']
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { theme, toggleTheme } = useTheme();
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
      </head>
      <body className={`font-sans antialiased bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen flex flex-col ${theme}`}> 
        {/* Header Navigation */}
        <header className="bg-gradient-to-r from-blue-900 to-blue-800 border-b border-blue-700 sticky top-0 z-50 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo and Title */}
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md transform transition-transform duration-300 group-hover:scale-105">
                  <Image src="/favicon.ico" alt="Logo Praktek Mandiri drg. Danny Hanggono" width={40} height={40} priority />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-white tracking-wide" aria-label="Praktek Mandiri drg. Danny Hanggono">Praktek Mandiri</h1>
                  <p className="text-sm text-blue-200 opacity-90">drg. Danny Hanggono</p>
                </div>
              </div>

              {/* Desktop Navigation Menu */}
              <nav className="hidden md:flex items-center space-x-2">
                <Link
                  href="/"
                  className="px-4 py-2 rounded-lg text-white hover:bg-blue-700 hover:shadow-md transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Beranda</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
                <Link
                  href="/tambah-pasien"
                  className="px-4 py-2 rounded-lg text-white hover:bg-blue-700 hover:shadow-md transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Data Harian</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
                <Link
                  href="/data-pasien"
                  className="px-4 py-2 rounded-lg text-white hover:bg-blue-700 hover:shadow-md transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Dashboard</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
                <Link
                  href="/laporan"
                  className="px-4 py-2 rounded-lg text-white hover:bg-blue-700 hover:shadow-md transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Arship Tugas</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
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

              {/* Mobile Menu Button */}
              <div className="flex md:hidden items-center">
                <button 
                  id="mobileMenuButton"
                  className="p-2 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  aria-label="Menu"
                  aria-expanded="false"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Mobile Menu */}
            <div id="mobileMenu" className="mobile-menu pb-3 transform transition-all duration-300 opacity-0 scale-95 origin-top">
              <nav className="flex flex-col space-y-2 mt-2">
                <Link
                  href="/"
                  className="px-4 py-3 rounded-lg text-white hover:bg-blue-700 transition-all duration-300 hover:shadow-md flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Beranda</span>
                </Link>
                <Link
                  href="/tambah-pasien"
                  className="px-4 py-3 rounded-lg text-white hover:bg-blue-700 transition-all duration-300 hover:shadow-md flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Data Harian</span>
                </Link>
                <Link
                  href="/data-pasien"
                  className="px-4 py-3 rounded-lg text-white hover:bg-blue-700 transition-all duration-300 hover:shadow-md flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/laporan"
                  className="px-4 py-3 rounded-lg text-white hover:bg-blue-700 transition-all duration-300 hover:shadow-md flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Arship Tugas</span>
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <main className="flex-1 bg-gradient-to-br from-gray-900 to-gray-800 py-6">
          <div className="fade-in">
            {children}
          </div>
        </main>
        
        {/* Script untuk menu mobile dengan animasi */}
        <SpeedInsights />
        <Analytics />
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            const mobileMenuButton = document.getElementById('mobileMenuButton');
            const mobileMenu = document.getElementById('mobileMenu');
            
            if (mobileMenuButton && mobileMenu) {
              // Toggle menu saat tombol diklik dengan animasi
              mobileMenuButton.addEventListener('click', function() {
                if (mobileMenu.classList.contains('active')) {
                  // Animasi menutup
                  mobileMenu.classList.add('opacity-0', 'scale-95');
                  mobileMenu.classList.remove('opacity-100', 'scale-100');
                  
                  setTimeout(() => {
                    mobileMenu.classList.remove('active');
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                  }, 300);
                } else {
                  // Animasi membuka
                  mobileMenu.classList.add('active');
                  mobileMenuButton.setAttribute('aria-expanded', 'true');
                  
                  setTimeout(() => {
                    mobileMenu.classList.remove('opacity-0', 'scale-95');
                    mobileMenu.classList.add('opacity-100', 'scale-100');
                  }, 10);
                }
              });
              
              // Tutup menu saat link diklik dengan animasi
              const mobileLinks = mobileMenu.querySelectorAll('a');
              mobileLinks.forEach(link => {
                link.addEventListener('click', function() {
                  // Animasi menutup
                  mobileMenu.classList.add('opacity-0', 'scale-95');
                  mobileMenu.classList.remove('opacity-100', 'scale-100');
                  
                  setTimeout(() => {
                    mobileMenu.classList.remove('active');
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                  }, 300);
                });
              });
            }
            
            // Tambahkan efek hover pada link desktop
            const desktopLinks = document.querySelectorAll('nav.md\\\\:flex a');
            desktopLinks.forEach(link => {
              link.addEventListener('mouseenter', function() {
                this.classList.add('pulse-animation');
              });
              link.addEventListener('mouseleave', function() {
                this.classList.remove('pulse-animation');
              });
            });
          })();
        `}} />
        


      </body>
    </html>
  )
}