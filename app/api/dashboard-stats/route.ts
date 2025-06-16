
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
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

    // Get data for current month
    const response = await fetch(`${sheetsUrl}?action=get&month=${currentMonth}&year=${currentYear}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from Google Sheets');
    }

    const data = await response.json();
    const sheetData = data.data || [];

    // Skip header row
    const records = sheetData.slice(1);

    // Calculate stats
    let totalPasienHariIni = 0;
    let totalPasienBulanIni = records.length;
    let antreanTerakhir = 0;
    let pendapatanBulanIni = 0;

    records.forEach((row: any[]) => {
      if (row.length === 0) return;
      
      const tanggalKunjungan = row[0];
      const noAntrean = row[1];
      const biaya = parseFloat(row[5]) || 0;

      // Count patients for today
      if (tanggalKunjungan && tanggalKunjungan.includes(todayStr)) {
        totalPasienHariIni++;
        
        // Get latest queue number for today
        const currentAntrean = parseInt(noAntrean) || 0;
        if (currentAntrean > antreanTerakhir) {
          antreanTerakhir = currentAntrean;
        }
      }

      // Sum up monthly revenue
      pendapatanBulanIni += biaya;
    });

    return NextResponse.json({
      totalPasienHariIni,
      totalPasienBulanIni,
      antreanTerakhir,
      pendapatanBulanIni
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
