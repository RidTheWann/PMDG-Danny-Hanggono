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

    // Jalankan database dan Google Sheets secara paralel untuk performa lebih cepat
    const [result] = await Promise.allSettled([
      // 1. Simpan ke database Neon PostgreSQL
      pool.query(
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
      ),
      // 2. Kirim data ke Google Sheets (dengan timeout lebih pendek)
      Promise.race([
        fetch(googleSheetsUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params.toString(),
        }),
        new Promise(
          (_, reject) => setTimeout(() => reject(new Error('Timeout')), 8000), // 8 detik timeout
        ),
      ]),
    ]);

    // Periksa hasil database
    if (result.status === 'rejected') {
      throw new Error('Gagal menyimpan ke database');
    }

    const dbResult = result.value as { rows: Array<{ id: string }> };

    return NextResponse.json({
      success: true,
      message: 'Data berhasil disimpan',
      id: dbResult.rows[0].id,
    });
  } catch (error) {
    console.error('Error saat menyimpan data:', error);
    return NextResponse.json(
      { error: 'Gagal menyimpan data pasien', detail: error },
      { status: 500 },
    );
  }
}
