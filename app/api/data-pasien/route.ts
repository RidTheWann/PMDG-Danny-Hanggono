import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Ambil URL koneksi dari environment variable
const connectionString = process.env.DATABASE_URL as string;

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }, // Neon PostgreSQL biasanya butuh SSL
});

export async function GET() {
  try {
    // Ambil seluruh data dari tabel data_entries, tanpa LIMIT
    const result = await pool.query(`
      SELECT 
        id,
        to_char(date, 'YYYY-MM-DD') as tanggal,
        patient_name as nama_pasien,
        medical_record_number as no_rm,
        gender as kelamin,
        payment_type as jenis_pasien,
        actions,
        other_actions as lainnya,
        description
      FROM data_entries
      ORDER BY date DESC, id DESC
    `);
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil data pasien', detail: error }, { status: 500 });
  }
}
