import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Ambil URL koneksi dari environment variable
const connectionString = process.env.DATABASE_URL as string;

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }, // Neon PostgreSQL biasanya butuh SSL
});

// Tambahkan revalidate = 0 untuk mencegah caching di Vercel
export const revalidate = 0;

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search')?.toLowerCase() || '';
    const searchType = searchParams.get('type') || 'nama';
    const limit = parseInt(searchParams.get('limit') || '30', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    let query = `
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
    `;
    let where = '';
    const values: unknown[] = [];
    if (search) {
      if (searchType === 'nama') {
        where = `WHERE LOWER(patient_name) LIKE $1`;
        values.push(`%${search}%`);
      } else if (searchType === 'rm') {
        where = `WHERE LOWER(medical_record_number) LIKE $1`;
        values.push(`%${search}%`);
      } else if (searchType === 'tindakan') {
        where = `WHERE LOWER(actions::text) LIKE $1 OR LOWER(other_actions) LIKE $1`;
        values.push(`%${search}%`);
      }
    }
    if (where) query += ` ${where}`;
    query += ` ORDER BY date DESC, id DESC`;
    // Hanya tambahkan LIMIT/OFFSET jika ada pencarian
    if (search) {
      query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
      values.push(limit, offset);
    }
    const result = await pool.query(query, values);
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal mengambil data pasien', detail: error },
      { status: 500 },
    );
  }
}
