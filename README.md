# Aplikasi Manajemen Data Pasien

Aplikasi ini digunakan untuk mengelola data pasien klinik, dengan fitur penyimpanan data ke database Neon PostgreSQL dan Google Sheets.

## Fitur

- Input data pasien baru
- Penyimpanan data ke database Neon PostgreSQL
- Sinkronisasi data ke Google Sheets
- Pencarian data pasien
- Laporan statistik

## Setup Google Sheets API

Untuk mengaktifkan penyimpanan data ke Google Sheets, ikuti langkah-langkah berikut:

1. Buka [Google Apps Script](https://script.google.com/)
2. Buat project baru
3. Copy-paste kode dari file `google-sheets-script.js` ke editor
4. Ganti `YOUR_SPREADSHEET_ID` dengan ID spreadsheet Anda
5. Klik Deploy > New deployment
6. Pilih tipe "Web app"
7. Atur akses ke "Anyone, even anonymous"
8. Klik Deploy
9. Copy URL yang dihasilkan
10. Tambahkan URL tersebut ke file `.env` sebagai `GOOGLE_SHEETS_URL`

## Struktur Database

Tabel `data_entries` di Neon PostgreSQL memiliki struktur sebagai berikut:

```sql
CREATE TABLE data_entries (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  patient_name VARCHAR(255) NOT NULL,
  medical_record_number VARCHAR(50) NOT NULL,
  gender VARCHAR(20) NOT NULL,
  payment_type VARCHAR(20) NOT NULL,
  actions JSONB,
  other_actions TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Cara Penggunaan

1. Buka halaman "Tambah Pasien"
2. Isi formulir dengan data pasien
3. Pilih tindakan yang dilakukan
4. Jika ada tindakan lain, isi di field "Tindakan Lainnya"
5. Klik tombol "Submit Data"
6. Data akan tersimpan di database Neon PostgreSQL dan Google Sheets

## Environment Variables

Aplikasi ini membutuhkan beberapa environment variables yang harus diatur di file `.env`:

```
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
GOOGLE_SHEETS_URL=https://script.google.com/macros/s/your-script-id/exec
SPREADSHEET_ID=your-spreadsheet-id
GOOGLE_CREDENTIALS={ "type": "service_account", ... }
```

## Pengembangan

Aplikasi ini dikembangkan menggunakan:
- Next.js 14
- TypeScript
- PostgreSQL (Neon)
- Google Sheets API
- Tailwind CSS