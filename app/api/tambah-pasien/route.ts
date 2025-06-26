import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

// Ambil URL koneksi dari environment variable
const connectionString = process.env.DATABASE_URL as string;
const googleSheetsUrl = process.env.GOOGLE_SHEETS_URL as string;

// Buat koneksi pool untuk PostgreSQL
const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }, // Neon PostgreSQL biasanya butuh SSL
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const data = await request.json();

    // Validasi data
    if (
      !data['Tanggal Kunjungan'] ||
      !data['Nama Pasien'] ||
      !data['No.RM'] ||
      !data['Kelamin'] ||
      !data['Biaya']
    ) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }

    // Konversi tindakan menjadi array untuk database
    const actions = [];
    if (data['Obat'] === 'Ya') actions.push('Obat');
    if (data['Cabut Anak'] === 'Ya') actions.push('Cabut Anak');
    if (data['Cabut Dewasa'] === 'Ya') actions.push('Cabut Dewasa');
    if (data['Tambal Sementara'] === 'Ya') actions.push('Tambal Sementara');
    if (data['Tambal Tetap'] === 'Ya') actions.push('Tambal Tetap');
    if (data['Scaling'] === 'Ya') actions.push('Scaling');
    if (data['Rujuk'] === 'Ya') actions.push('Rujuk');

    // Konversi array actions menjadi JSON string
    const actionsJson = JSON.stringify(actions);

    // 1. Simpan ke database Neon PostgreSQL
    const result = await pool.query(
      `INSERT INTO data_entries 
       (date, patient_name, medical_record_number, gender, payment_type, actions, other_actions) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING id`,
      [
        data['Tanggal Kunjungan'],
        data['Nama Pasien'],
        data['No.RM'],
        data['Kelamin'],
        data['Biaya'],
        actionsJson,
        data['Lainnya'] || null,
      ],
    );

    // 2. Kirim data ke Google Sheets
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000); // 15 detik
      // Siapkan data untuk Google Sheets dengan format yang sesuai
      const params = new URLSearchParams();
      params.append('action', 'add');
      params.append('Tanggal Kunjungan', data['Tanggal Kunjungan']);
      params.append('Nama Pasien', data['Nama Pasien']);
      params.append('No.RM', data['No.RM']);
      params.append('Kelamin', data['Kelamin']);
      params.append('Biaya', data['Biaya']);
      params.append('Obat', data['Obat']);
      params.append('Cabut Anak', data['Cabut Anak']);
      params.append('Cabut Dewasa', data['Cabut Dewasa']);
      params.append('Tambal Sementara', data['Tambal Sementara']);
      params.append('Tambal Tetap', data['Tambal Tetap']);
      params.append('Scaling', data['Scaling']);
      params.append('Rujuk', data['Rujuk']);
      params.append('Lainnya', data['Lainnya'] || '');
      // Kirim data ke Google Sheets dengan format application/x-www-form-urlencoded
      const sheetsResponse = await fetch(googleSheetsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!sheetsResponse.ok) {
        console.error('Gagal menyimpan ke Google Sheets:', await sheetsResponse.text());
      }
    } catch (sheetsError: unknown) {
      if (sheetsError instanceof Error && sheetsError.name === 'AbortError') {
        console.error('Timeout Google Sheets, lanjutkan karena data sudah masuk DB');
      } else {
        console.error('Error saat menyimpan ke Google Sheets:', sheetsError);
      }
      // Tetap lanjutkan karena data sudah tersimpan di database
    }

    return NextResponse.json({
      success: true,
      message: 'Data berhasil disimpan',
      id: result.rows[0].id,
    });
  } catch (error) {
    console.error('Error saat menyimpan data:', error);
    return NextResponse.json(
      { error: 'Gagal menyimpan data pasien', detail: error },
      { status: 500 },
    );
  }
}
