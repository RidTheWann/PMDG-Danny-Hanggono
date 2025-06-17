// scripts/export-sheets-to-postgres.js
import { google } from 'googleapis';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const spreadsheetId = process.env.SPREADSHEET_ID;
const DATABASE_URL = process.env.DATABASE_URL;
const googleCredentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);

if (!spreadsheetId || !DATABASE_URL || !googleCredentials) {
  throw new Error("Pastikan SPREADSHEET_ID, DATABASE_URL, dan GOOGLE_CREDENTIALS sudah di-set.");
}

// Regex untuk mendeteksi nama sheet, mis. "Januari 2025", "Februari 2025", dll.
const bulanRegex = /^(Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember)\s+\d{4}$/i;

// Kolom tindakan yang mau digabung ke satu field "actions"
const tindakanFields = [
  "Obat",
  "Cabut Anak",
  "Cabut Dewasa",
  "Tambal Sementara",
  "Tambal Tetap",
  "Scaling",
  "Rujuk"
];

/**
 * Ambil data dari semua sheet yang namanya mengandung bulan + tahun (regex di atas),
 * filter baris dengan "Tanggal Kunjungan" valid, gabung kolom tindakan, 
 * lalu hasilkan array dokumen final dengan field yang sesuai dengan schema dataEntries
 */
async function fetchSheetsData() {
  const auth = new google.auth.GoogleAuth({
    credentials: googleCredentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  const sheetsApi = google.sheets({ version: 'v4', auth });

  // Ambil metadata untuk semua sheet
  const metadata = await sheetsApi.spreadsheets.get({ spreadsheetId });
  const allSheetNames = metadata.data.sheets.map(s => s.properties.title);

  // Filter hanya sheet yang cocok nama bulan + tahun
  const filteredSheetNames = allSheetNames.filter(name => bulanRegex.test(name));
  console.log("Sheet yang terdeteksi:", filteredSheetNames);

  let allData = [];

  for (const sheetName of filteredSheetNames) {
    try {
      // Ambil data range A1:N (sesuaikan jika kolom Anda lebih/kurang)
      const range = `'${sheetName}'!A1:N`;
      const result = await sheetsApi.spreadsheets.values.get({
        spreadsheetId,
        range,
      });
      const rows = result.data.values;
      if (!rows || rows.length === 0) continue;

      const header = rows[0];
      // Data mulai baris ke-2
      let data = rows.slice(1).map((row, index) => {
        const doc = {};
        header.forEach((colName, i) => {
          doc[colName] = row[i] || "";
        });
        return doc;
      });

      // Filter baris:
      // 1) "Tanggal Kunjungan" valid format YYYY-MM-DD & day != "00"
      // 2) "Nama Pasien" tidak kosong
      data = data.filter(doc => {
        const tgl = (doc["Tanggal Kunjungan"] || "").trim();
        if (!tgl || tgl === "-") return false;
        if (!/^\d{4}-\d{2}-\d{2}$/.test(tgl)) return false;
        const [yyyy, mm, dd] = tgl.split("-");
        if (dd === "00") return false;

        const nama = (doc["Nama Pasien"] || "").trim();
        if (!nama) return false;

        return true;
      });

      // Gabungkan kolom tindakan -> doc["actions"]
      data.forEach(doc => {
        let actions = [];
        tindakanFields.forEach(field => {
          const val = (doc[field] || "").trim();
          if (val && val.toLowerCase() !== "no") {
            if (val.toLowerCase() === "yes" || val.toLowerCase() === "ya") {
              actions.push(field);
            } else {
              actions.push(`${field} (${val})`);
            }
          }
          // Hapus field asli
          delete doc[field];
        });

        // Buat doc["actions"]
        doc["actions"] = actions;
      });

      // Buat array newData dengan field yang sesuai dengan schema dataEntries
      const newData = data.map(doc => {
        return {
          date: doc["Tanggal Kunjungan"] || "",
          patientName: doc["Nama Pasien"] || "",
          medicalRecordNumber: doc["No.RM"] || "",
          gender: doc["Kelamin"] === "L" ? "Laki-laki" : doc["Kelamin"] === "P" ? "Perempuan" : doc["Kelamin"] || "",
          paymentType: doc["Biaya"]?.includes("BPJS") ? "BPJS" : "UMUM",
          actions: doc["actions"] || [],
          otherActions: doc["Lainnya"] || "",
          description: ""
        };
      });

      // Gabung ke allData
      allData = allData.concat(newData);
    } catch (err) {
      console.error(`Error reading sheet "${sheetName}":`, err);
    }
  }

  return allData;
}

/**
 * Deduplikasi berdasarkan (date + medicalRecordNumber).
 */
function deduplicateData(data) {
  const seen = new Set();
  const result = [];
  for (const item of data) {
    const tgl = (item.date || "").trim();
    const noRM = (item.medicalRecordNumber || "").trim();
    const uniqueKey = `${tgl}_${noRM}`;
    if (!seen.has(uniqueKey)) {
      seen.add(uniqueKey);
      result.push(item);
    }
  }
  return result;
}

// Insert ke tabel data_entries menggunakan pg langsung
async function exportToPostgres(data) {
  // Buat koneksi ke database PostgreSQL menggunakan pg
  const client = new pg.Client({
    connectionString: DATABASE_URL,
  });

  try {
    await client.connect();
    console.log(`Mencoba insert ${data.length} data ke PostgreSQL...`);
    
    // Insert data dalam batch untuk efisiensi
    const batchSize = 20;
    let insertedCount = 0;
    
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);
      try {
        // Mulai transaksi
        await client.query('BEGIN');
        
        for (const item of batch) {
          // Konversi array actions menjadi JSON string
          const actionsJson = JSON.stringify(item.actions || []);
          
          // Buat query SQL untuk insert
          const query = {
            text: `INSERT INTO data_entries (date, patient_name, medical_record_number, gender, payment_type, actions, other_actions, description) 
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            values: [
              item.date,
              item.patientName,
              item.medicalRecordNumber,
              item.gender,
              item.paymentType,
              actionsJson,
              item.otherActions || null,
              item.description || null
            ]
          };
          
          await client.query(query);
        }
        
        // Commit transaksi
        await client.query('COMMIT');
        insertedCount += batch.length;
        console.log(`Batch ${Math.floor(i/batchSize) + 1}: ${batch.length} data berhasil diinsert`);
      } catch (batchError) {
        // Rollback jika ada error
        await client.query('ROLLBACK');
        console.error(`Error pada batch ${Math.floor(i/batchSize) + 1}:`, batchError);
      }
    }
    
    console.log(`Berhasil menginsert ${insertedCount} data ke tabel "data_entries".`);
  } catch (err) {
    console.error("Error inserting to PostgreSQL:", err);
    console.error(err.stack);
  } finally {
    // Tutup koneksi
    await client.end();
  }
}

async function main() {
  try {
    const sheetsData = await fetchSheetsData();
    if (sheetsData.length === 0) {
      console.log("Tidak ada data yang ditemukan di Google Sheets.");
      return;
    }
    
    // Deduplikasi
    const finalData = deduplicateData(sheetsData);
    console.log(`Total data setelah deduplikasi: ${finalData.length}`);
    
    // Insert ke PostgreSQL
    await exportToPostgres(finalData);
  } catch (error) {
    console.error("Error during export:", error);
  }
}

main();