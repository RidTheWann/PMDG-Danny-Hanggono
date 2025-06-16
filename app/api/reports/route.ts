
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get('month') || (new Date().getMonth() + 1).toString();
    const year = searchParams.get('year') || new Date().getFullYear().toString();
    
    // Fetch data from Google Sheets
    const sheetsUrl = process.env.GOOGLE_SHEETS_URL;
    if (!sheetsUrl) {
      throw new Error('Google Sheets URL not configured');
    }

    const response = await fetch(`${sheetsUrl}?action=get&month=${month}&year=${year}`, {
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

    // Process data for reports
    const dailyData: { [key: string]: any } = {};
    const treatmentCounts: { [key: string]: number } = {};
    let totalPatients = 0;
    let totalRevenue = 0;

    records.forEach((row: any[]) => {
      if (row.length === 0) return;
      
      const tanggalKunjungan = row[0];
      const biaya = parseFloat(row[5]) || 0;
      
      // Extract treatments
      const treatments = {
        obat: row[6] === 'Ya',
        cabut_anak: row[7] === 'Ya',
        cabut_dewasa: row[8] === 'Ya',
        tambal_sementara: row[9] === 'Ya',
        tambal_tetap: row[10] === 'Ya',
        scaling: row[11] === 'Ya',
        rujuk: row[12] === 'Ya',
        lainnya: row[13] && row[13].trim() !== ''
      };

      // Count treatments
      Object.entries(treatments).forEach(([treatment, isTrue]) => {
        if (isTrue) {
          treatmentCounts[treatment] = (treatmentCounts[treatment] || 0) + 1;
        }
      });

      // Group by date
      const dateKey = tanggalKunjungan.split('T')[0]; // Get YYYY-MM-DD format
      if (!dailyData[dateKey]) {
        dailyData[dateKey] = {
          date: dateKey,
          totalPatients: 0,
          totalRevenue: 0,
          treatments: {}
        };
      }

      dailyData[dateKey].totalPatients += 1;
      dailyData[dateKey].totalRevenue += biaya;

      // Count daily treatments
      Object.entries(treatments).forEach(([treatment, isTrue]) => {
        if (isTrue) {
          dailyData[dateKey].treatments[treatment] = (dailyData[dateKey].treatments[treatment] || 0) + 1;
        }
      });

      totalPatients += 1;
      totalRevenue += biaya;
    });

    // Find most popular treatment
    const mostPopularTreatment = Object.entries(treatmentCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'Tidak ada';

    // Convert to array and sort by date
    const dailyDataArray = Object.values(dailyData).sort((a: any, b: any) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Calculate average per day
    const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
    const averagePerDay = totalPatients / daysInMonth;

    return NextResponse.json({
      totalPatients,
      totalRevenue,
      averagePerDay,
      mostPopularTreatment: getTreatmentLabel(mostPopularTreatment),
      dailyData: dailyDataArray
    });
  } catch (error) {
    console.error('Error generating report:', error);
    return NextResponse.json(
      { error: 'Failed to generate report' },
      { status: 500 }
    );
  }
}

function getTreatmentLabel(treatment: string): string {
  const labels: { [key: string]: string } = {
    obat: 'Obat',
    cabut_anak: 'Cabut Anak',
    cabut_dewasa: 'Cabut Dewasa',
    tambal_sementara: 'Tambal Sementara',
    tambal_tetap: 'Tambal Tetap',
    scaling: 'Scaling',
    rujuk: 'Rujuk',
    lainnya: 'Lainnya'
  };
  
  return labels[treatment] || treatment;
}
