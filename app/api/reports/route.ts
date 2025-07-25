import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest): Promise<NextResponse> {
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
    const dailyData: { [key: string]: unknown } = {};
    const treatmentCounts: { [key: string]: number } = {};
    let totalPatients = 0;
    let bpjsPatients = 0;
    let umumPatients = 0;

    records.forEach((row: unknown[]) => {
      if (!Array.isArray(row) || row.length === 0) return;
      const tanggalKunjungan = String(row[0] ?? '');
      const jenisPasien = String(row[5] ?? '');

      // Extract treatments
      const treatments = {
        obat: row[6] === 'Ya',
        cabut_anak: row[7] === 'Ya',
        cabut_dewasa: row[8] === 'Ya',
        tambal_sementara: row[9] === 'Ya',
        tambal_tetap: row[10] === 'Ya',
        scaling: row[11] === 'Ya',
        rujuk: row[12] === 'Ya',
        lainnya: typeof row[13] === 'string' && row[13].trim() !== '',
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
          bpjsPatients: 0,
          umumPatients: 0,
          treatments: {} as Record<string, number>,
        };
      }
      const daily = dailyData[dateKey] as DailyData;
      daily.totalPatients += 1;
      if (jenisPasien === 'BPJS') {
        daily.bpjsPatients += 1;
        bpjsPatients += 1;
      } else if (jenisPasien === 'UMUM') {
        daily.umumPatients += 1;
        umumPatients += 1;
      }

      // Count daily treatments
      Object.entries(treatments).forEach(([treatment, isTrue]) => {
        if (isTrue) {
          daily.treatments[treatment] = (daily.treatments[treatment] || 0) + 1;
        }
      });

      totalPatients += 1;
    });

    // Find most popular treatment
    const mostPopularTreatment =
      Object.entries(treatmentCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || 'Tidak ada';

    // Convert to array and sort by date
    const dailyDataArray = Object.values(dailyData).sort((a, b) =>
      String((a as DailyData).date).localeCompare(String((b as DailyData).date)),
    );

    // Calculate average per day
    const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
    const averagePerDay = totalPatients / daysInMonth;

    return NextResponse.json({
      totalPatients,
      bpjsPatients,
      umumPatients,
      averagePerDay,
      mostPopularTreatment: getTreatmentLabel(mostPopularTreatment),
      dailyData: dailyDataArray,
    });
  } catch (error) {
    console.error('Error generating report:', error);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
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
    lainnya: 'Lainnya',
  };

  return labels[treatment] || treatment;
}

interface DailyData {
  date: string;
  totalPatients: number;
  bpjsPatients: number;
  umumPatients: number;
  treatments: Record<string, number>;
}
