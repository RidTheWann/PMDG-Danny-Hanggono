import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { Sun, Moon } from 'lucide-react';
import Image from 'next/image';

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Lock scroll saat menu terbuka
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [open]);

  return (
    <>
      <button
        className="p-2 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 md:hidden"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
      >
        <svg className="w-6 h-6 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/40 dark:bg-black/60 transition-opacity" onClick={() => setOpen(false)}></div>
      )}
      {/* Menu */}
      <nav
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ color: theme === 'dark' ? '#fff' : '#222' }}
        tabIndex={-1}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Image src="/favicon.ico" alt="Logo" width={32} height={32} />
            <span className="font-semibold text-lg">Menu</span>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Tutup menu" className="p-2 rounded-full hover:bg-red-500/20 text-gray-400 hover:text-red-600 dark:hover:text-white transition-all duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="flex flex-col space-y-2 mt-6 px-4">
          <Link href="/" className="px-4 py-3 rounded-lg hover:bg-blue-700 hover:text-white transition-all duration-300 flex items-center space-x-2" onClick={() => setOpen(false)}>
            <span>Beranda</span>
          </Link>
          <Link href="/tambah-pasien" className="px-4 py-3 rounded-lg hover:bg-blue-700 hover:text-white transition-all duration-300 flex items-center space-x-2" onClick={() => setOpen(false)}>
            <span>Data Harian</span>
          </Link>
          <Link href="/data-pasien" className="px-4 py-3 rounded-lg hover:bg-blue-700 hover:text-white transition-all duration-300 flex items-center space-x-2" onClick={() => setOpen(false)}>
            <span>Dashboard</span>
          </Link>
          <Link href="/laporan" className="px-4 py-3 rounded-lg hover:bg-blue-700 hover:text-white transition-all duration-300 flex items-center space-x-2" onClick={() => setOpen(false)}>
            <span>Arship Tugas</span>
          </Link>
          <button
            onClick={toggleTheme}
            className="mt-4 p-2 rounded-full bg-blue-800 hover:bg-blue-700 transition-colors border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-300" />
            ) : (
              <Moon className="w-5 h-5 text-blue-300" />
            )}
          </button>
        </div>
      </nav>
    </>
  );
}
