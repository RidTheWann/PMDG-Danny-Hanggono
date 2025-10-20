'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-lg">
            <Image src="/favicon.ico" alt="Logo" fill className="object-cover" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Praktek Mandiri</h1>
            <p className="text-sm text-muted-foreground">drg. Danny Hanggono</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/">Beranda</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/tambah-pasien">Data Harian</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/data-pasien">Dashboard</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/laporan">Arship Tugas</Link>
          </Button>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  );
}
