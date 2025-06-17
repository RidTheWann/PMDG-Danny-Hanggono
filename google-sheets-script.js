/**
 * Google Apps Script untuk menerima data dari API dan menyimpannya ke Google Sheets
 * Deploy sebagai Web App dengan akses "Anyone, even anonymous"
 */

// ID spreadsheet yang digunakan
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // Ganti dengan ID spreadsheet Anda

// Nama sheet untuk data pasien (biasanya berdasarkan bulan dan tahun)
function getSheetName() {
  const date = new Date();
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${month} ${year}`;
}

// Fungsi untuk menangani permintaan POST
function doPost(e) {
  try {
    // Parse data JSON yang diterima
    const data = JSON.parse(e.postData.contents);
    
    // Validasi data
    if (!data.tanggal || !data.nama_pasien || !data.no_rm || !data.kelamin || !data.jenis_pasien) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: 'Data tidak lengkap'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Buka spreadsheet dan dapatkan sheet yang sesuai
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(getSheetName());
    
    // Jika sheet belum ada, buat sheet baru
    if (!sheet) {
      sheet = ss.insertSheet(getSheetName());
      
      // Tambahkan header
      sheet.appendRow([
        'Tanggal Kunjungan', 
        'Nama Pasien', 
        'No.RM', 
        'Kelamin', 
        'Biaya', 
        'Obat', 
        'Cabut Anak', 
        'Cabut Dewasa', 
        'Tambal Sementara', 
        'Tambal Tetap', 
        'Scaling', 
        'Rujuk', 
        'Lainnya'
      ]);
      
      // Format header
      sheet.getRange(1, 1, 1, 13).setFontWeight('bold');
    }
    
    // Siapkan data untuk dimasukkan ke sheet
    const rowData = [
      data.tanggal,
      data.nama_pasien,
      data.no_rm,
      data.kelamin,
      data.jenis_pasien,
      data.obat,
      data.cabut_anak,
      data.cabut_dewasa,
      data.tambal_sementara,
      data.tambal_tetap,
      data.scaling,
      data.rujuk,
      data.lainnya
    ];
    
    // Tambahkan data ke sheet
    sheet.appendRow(rowData);
    
    // Kembalikan respons sukses
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Data berhasil disimpan ke Google Sheets'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Kembalikan respons error
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Terjadi kesalahan: ' + error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Fungsi untuk menangani permintaan GET (opsional, untuk testing)
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: 'API Google Sheets aktif'
  })).setMimeType(ContentService.MimeType.JSON);
}