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

// PUT untuk update data pasien
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  try {
    const id = params.id;
    const data = await request.json();

    // Validasi data
    if (!data.tanggal || !data.nama_pasien || !data.no_rm || !data.kelamin || !data.jenis_pasien) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }

    // Siapkan data untuk Google Sheets
    const sheetsParams = new URLSearchParams();
    sheetsParams.append('action', 'edit');
    sheetsParams.append('Tanggal Kunjungan_asli', data.tanggal_asli || data.tanggal);
    sheetsParams.append('Nama Pasien_asli', data.nama_pasien_asli || data.nama_pasien);
    sheetsParams.append('No.RM_asli', data.no_rm_asli || data.no_rm);
    sheetsParams.append('Tanggal Kunjungan', data.tanggal);
    sheetsParams.append('Nama Pasien', data.nama_pasien);
    sheetsParams.append('No.RM', data.no_rm);
    sheetsParams.append('Kelamin', data.kelamin);
    sheetsParams.append('Biaya', data.jenis_pasien);
    sheetsParams.append('Lainnya', data.lainnya || '');

    // Tambahkan tindakan ke Google Sheets
    if (Array.isArray(data.actions)) {
      sheetsParams.append('Obat', data.actions.includes('Obat') ? 'Ya' : 'Tidak');
      sheetsParams.append('Cabut Anak', data.actions.includes('Cabut Anak') ? 'Ya' : 'Tidak');
      sheetsParams.append('Cabut Dewasa', data.actions.includes('Cabut Dewasa') ? 'Ya' : 'Tidak');
      sheetsParams.append(
        'Tambal Sementara',
        data.actions.includes('Tambal Sementara') ? 'Ya' : 'Tidak',
      );
      sheetsParams.append('Tambal Tetap', data.actions.includes('Tambal Tetap') ? 'Ya' : 'Tidak');
      sheetsParams.append('Scaling', data.actions.includes('Scaling') ? 'Ya' : 'Tidak');
      sheetsParams.append('Rujuk', data.actions.includes('Rujuk') ? 'Ya' : 'Tidak');
    }

    // Jalankan database dan Google Sheets secara paralel untuk performa lebih cepat
    const [dbResult] = await Promise.allSettled([
      // 1. Update di database Neon PostgreSQL
      pool.query(
        `UPDATE data_entries 
         SET date = $1, patient_name = $2, medical_record_number = $3, 
             gender = $4, payment_type = $5, other_actions = $6, actions = $7
         WHERE id = $8
         RETURNING *`,
        [
          data.tanggal,
          data.nama_pasien,
          data.no_rm,
          data.kelamin,
          data.jenis_pasien,
          data.lainnya || null,
          JSON.stringify(data.actions || []),
          id,
        ],
      ),
      // 2. Update di Google Sheets (dengan timeout)
      Promise.race([
        fetch(googleSheetsUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: sheetsParams.toString(),
        }),
        new Promise(
          (_, reject) => setTimeout(() => reject(new Error('Timeout')), 8000), // 8 detik timeout
        ),
      ]),
    ]);

    // Periksa hasil database
    if (dbResult.status === 'rejected') {
      throw new Error('Gagal update database');
    }

    const result = dbResult.value as { rows: Array<Record<string, unknown>>; rowCount: number };
    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Data pasien tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Data berhasil diupdate',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error saat update data:', error);
    return NextResponse.json({ error: 'Gagal update data pasien', detail: error }, { status: 500 });
  }
}

// DELETE untuk menghapus data pasien
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  try {
    const id = params.id;

    // Ambil data pasien sebelum dihapus untuk digunakan di Google Sheets
    const getPatient = await pool.query(`SELECT * FROM data_entries WHERE id = $1`, [id]);

    if (getPatient.rowCount === 0) {
      return NextResponse.json({ error: 'Data pasien tidak ditemukan' }, { status: 404 });
    }

    const patient = getPatient.rows[0];

    // 1. Hapus dari database Neon PostgreSQL
    await pool.query(`DELETE FROM data_entries WHERE id = $1 RETURNING id`, [id]);

    // 2. Hapus dari Google Sheets
    try {
      // Siapkan data untuk Google Sheets
      const params = new URLSearchParams();
      params.append('action', 'delete');
      params.append('Tanggal Kunjungan', patient.date);
      params.append('Nama Pasien', patient.patient_name);
      params.append('No.RM', patient.medical_record_number);

      // Kirim data ke Google Sheets
      const sheetsResponse = await fetch(googleSheetsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      if (!sheetsResponse.ok) {
        console.error('Gagal menghapus dari Google Sheets:', await sheetsResponse.text());
      }
    } catch (sheetsError) {
      console.error('Error saat menghapus dari Google Sheets:', sheetsError);
      // Tetap lanjutkan karena data sudah terhapus dari database
    }

    return NextResponse.json({
      success: true,
      message: 'Data berhasil dihapus',
      id: id,
    });
  } catch (error) {
    console.error('Error saat menghapus data:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus data pasien', detail: error },
      { status: 500 },
    );
  }
}
