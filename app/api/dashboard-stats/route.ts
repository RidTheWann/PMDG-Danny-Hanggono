import { NextResponse } from 'next/server';

// Tambahkan revalidate = 0 untuk mencegah caching di Vercel
export const revalidate = 0;

// In-memory cache sederhana
type DashboardStats = {
  totalPasienHariIni: number;
  totalPasienBulanIni: number;
  antreanTerakhir: number;
  pasiенBPJS: number;
  pasienUmum: number;
};
let cachedStats: DashboardStats | null = null;
let cachedAt = 0;
const CACHE_DURATION = 30 * 1000; // 30 detik

export async function GET(): Promise<NextResponse> {
  try {
    // Jika cache masih valid, return cache
    if (cachedStats && Date.now() - cachedAt < CACHE_DURATION) {
      return NextResponse.json(cachedStats);
    }

    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    // Get current date in YYYY-MM-DD format
    const todayStr = today.toISOString().split('T')[0];

    // Fetch data from Google Sheets
    const sheetsUrl = process.env.GOOGLE_SHEETS_URL;
    if (!sheetsUrl) {
      throw new Error('Google Sheets URL not configured');
    }

    // Tambahkan timeout pada fetch (10 detik)
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    let response;
    try {
      response = await fetch(`${sheetsUrl}?action=get&month=${currentMonth}&year=${currentYear}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        signal: controller.signal,
      });
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        return NextResponse.json(
          { error: 'Timeout saat mengambil data Google Sheets' },
          { status: 504 },
        );
      }
      throw err;
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      throw new Error('Failed to fetch data from Google Sheets');
    }

    const data = await response.json();
    const sheetData = data.data || [];

    // Skip header row
    const records = sheetData.slice(1);

    // Calculate stats
    let totalPasienHariIni = 0;
    let totalPasienBulanIni = 0;
    let antreanTerakhir = 0;
    let pasiенBPJS = 0;
    let pasienUmum = 0;

    records.forEach((row: object[]) => {
      const tanggalKunjungan = String(row[0] ?? '');
      const noAntrean = String(row[1] ?? '');
      const jenisPasien = String(row[5] ?? '');

      // Count patients for today
      if (tanggalKunjungan && tanggalKunjungan.includes(todayStr)) {
        totalPasienHariIni++;
        const currentAntrean = parseInt(noAntrean) || 0;
        if (currentAntrean > antreanTerakhir) antreanTerakhir = currentAntrean;
      }

      // Count patient types
      if (jenisPasien === 'BPJS') {
        pasiенBPJS++;
      } else if (jenisPasien === 'UMUM') {
        pasienUmum++;
      }
      totalPasienBulanIni++;
    });

    // Setelah dapat hasil:
    const result = {
      totalPasienHariIni,
      totalPasienBulanIni,
      antreanTerakhir,
      pasiенBPJS,
      pasienUmum,
    };
    cachedStats = result;
    cachedAt = Date.now();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}
