'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Users, Activity, PieChart, TrendingUp, Calendar } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { Pie } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';
import AksiTableButton from './AksiTableButton';
import EditPatientModal from '../components/EditPatientModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import SuccessModal from '../components/SuccessModal';
import MobileTableGuide from '../components/MobileTableGuide';
import './mobile-table.css';
import { getTodayJakarta } from '../utils/date';
import type { Patient } from '../types/patient';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface DashboardStats {
  totalPasienHariIni: number;
  totalPasienBulanIni: number;
  antreanTerakhir: number;
  pasienBPJS: number;
  pasienUmum: number;
}

interface TreatmentStats {
  obat: number;
  cabut_anak: number;
  cabut_dewasa: number;
  tambal_sementara: number;
  tambal_tetap: number;
  scaling: number;
  rujuk: number;
  lainnya: number;
}

// Hapus function getTodayJakarta, gunakan dari utils
export default function DataPasienPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalPasienHariIni: 0,
    totalPasienBulanIni: 0,
    antreanTerakhir: 0,
    pasienBPJS: 0,
    pasienUmum: 0
  });
  const [treatmentStats, setTreatmentStats] = useState<TreatmentStats>({
    obat: 0,
    cabut_anak: 0,
    cabut_dewasa: 0,
    tambal_sementara: 0,
    tambal_tetap: 0,
    scaling: 0,
    rujuk: 0,
    lainnya: 0
  });
  const [filterDate, setFilterDate] = useState(() => getTodayJakarta());
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  
  // State untuk modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Efek untuk animasi saat halaman dimuat
  useEffect(() => {
    setPageLoaded(true);
  }, []);
  
  // Perbesar polling interval
  const POLLING_INTERVAL = 60000; // 60 detik

  // Fungsi untuk fetch data dengan useCallback agar bisa digunakan dalam useEffect
  const fetchDashboardStats = useCallback(async () => {
    try {
      setError(null);
      const response = await fetch('/api/dashboard-stats', {
        cache: 'no-store',
      });
      if (!response.ok) throw new Error('Gagal fetch data dashboard');
      const data = await response.json();
      if (data && !data.error) {
        setStats(data);
      } else {
        setError('Gagal memuat statistik dashboard.');
      }
    } catch (error) {
      setError('Gagal memuat statistik dashboard. Silakan coba beberapa saat lagi.');
    }
  }, []);

  const fetchPatientData = useCallback(async () => {
    try {
      const response = await fetch('/api/data-pasien', {
        cache: 'no-store',
        // next: { revalidate: 0 } // Dihapus karena bukan properti valid
      });
      if (!response.ok) throw new Error('Gagal fetch data pasien');
      const data = await response.json();
      // Pastikan actions selalu array string
      setPatients(data.map((p: Patient) => {
        let actions = [];
        try {
          if (Array.isArray(p.actions)) {
            actions = p.actions;
          } else if (typeof p.actions === 'string') {
            actions = JSON.parse(p.actions);
          }
        } catch (e) {
          // console.error('Error parsing actions:', e);
        }
        return {
          ...p,
          id: p.id,
          actions: actions,
        };
      }));
      setLoading(false);
    } catch (error) {
      let message = 'Gagal mengambil data pasien. Silakan coba lagi.';
      if (error instanceof Error && error.message) {
        message = error.message;
      }
      setError(message);
      setLoading(false);
    }
  }, []);

  // Fetch data awal
  useEffect(() => {
    fetchDashboardStats();
    fetchPatientData();
  }, [fetchDashboardStats, fetchPatientData]);
  
  // Setup polling untuk real-time updates
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchPatientData();
      fetchDashboardStats();
    }, POLLING_INTERVAL);
    
    return () => clearInterval(intervalId);
  }, [fetchPatientData, fetchDashboardStats]);

  // Reset currentPage ke 1 jika filterDate berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [filterDate]);
  
  // Fungsi untuk mengedit data pasien
  const handleEditPatient = (patient: Patient) => {
    // Pastikan actions adalah array
    let actions = [];
    if (patient.actions) {
      if (Array.isArray(patient.actions)) {
        actions = patient.actions;
      } else if (typeof patient.actions === 'string') {
        try {
          actions = JSON.parse(patient.actions);
        } catch (e) {
          console.error('Error parsing actions:', e);
          actions = [];
        }
      }
    }
    
    // Simpan data asli untuk keperluan edit di Google Sheets
    setSelectedPatient({
      ...patient,
      actions: actions,
      tanggal_asli: patient.tanggal,
      nama_pasien_asli: patient.nama_pasien,
      no_rm_asli: patient.no_rm
    });
    setIsEditModalOpen(true);
  };
  
  // Fungsi untuk menghapus data pasien
  const handleDeletePatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDeleteModalOpen(true);
  };
  
  // Fungsi untuk menyimpan perubahan data pasien
  const handleSavePatient = async (updatedPatient: Patient) => {
    try {
      
      const response = await fetch(`/api/data-pasien/${updatedPatient.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPatient),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error response:', errorText);
        throw new Error('Gagal update data pasien');
      }
      
      // Refresh data setelah update
      await fetchPatientData();
      
      // Tampilkan modal sukses
      setSuccessMessage(`Data pasien ${updatedPatient.nama_pasien} berhasil diperbarui`);
      setIsSuccessModalOpen(true);
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error updating patient:', error);
      return Promise.reject(error);
    }
  };
  
  // Fungsi untuk konfirmasi penghapusan data pasien
  const handleConfirmDelete = async () => {
    if (!selectedPatient?.id) return Promise.reject('ID pasien tidak valid');
    
    try {
      const response = await fetch(`/api/data-pasien/${selectedPatient.id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Gagal menghapus data pasien');
      }
      
      // Refresh data setelah delete
      await fetchPatientData();
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error deleting patient:', error);
      return Promise.reject(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Memuat data pasien...</p>
          {error && (
            <div className="mt-4 text-red-500 bg-red-100 dark:bg-red-200 px-4 py-2 rounded-lg text-center" role="alert">
              {error}
              <button onClick={() => { setLoading(true); fetchDashboardStats(); }} className="ml-4 underline text-blue-700">Coba Lagi</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Filter pasien sesuai tanggal dan urutkan entry terbaru di atas
  const filteredPatients = patients
    .filter((p: Patient) => p.tanggal && p.tanggal === filterDate)
    .sort((a: Patient, b: Patient) => (Number(b.id) ?? 0) - (Number(a.id) ?? 0));

  // Pagination logic
  const totalPages = Math.ceil(filteredPatients.length / pageSize);
  const paginatedPatients = filteredPatients.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Dashboard Analytics: hitung statistik dari seluruh data di database
  // Total pasien seluruh waktu
  const totalPasienAll = patients.length;
  // Total pasien bulan ini (berdasarkan bulan sekarang WIB)
  const now = new Date();
  const wib = new Date(now.getTime() + (7 * 60 - now.getTimezoneOffset()) * 60000);
  const bulanIniAll = wib.toISOString().slice(0, 7);
  const totalPasienBulanIniAll = patients.filter((p: Patient) => p.tanggal && p.tanggal.startsWith(bulanIniAll)).length;
  // Antrean terakhir (id terbesar di seluruh data)
  const antreanTerakhirAll = patients.reduce((max: number, p: Patient) => Number(p.id) && Number(p.id) > max ? Number(p.id) : max, 0);
  // Jumlah pasien BPJS dan UMUM seluruh waktu
  const pasienBPJS = patients.filter((p: Patient) => p.jenis_pasien === 'BPJS').length;
  const pasienUmumAll = patients.filter((p: Patient) => p.jenis_pasien === 'UMUM').length;

  // Statistik untuk card
  const totalLaki = patients.filter((p: Patient) => {
    const val = (p.kelamin || '').toLowerCase();
    return val === 'laki-laki' || val === 'l';
  }).length;
  const totalPerempuan = patients.filter((p: Patient) => p.kelamin === 'Perempuan' || p.kelamin === 'P').length;
  const totalSemuaPasien = patients.length;
  // Rata-rata kunjungan harian
  const tanggalUnik = Array.from(new Set(patients.map((p: Patient) => p.tanggal)));
  const rataKunjunganHarian = tanggalUnik.length > 0 ? Math.round(totalSemuaPasien / tanggalUnik.length) : 0;

  // Hitung rata-rata laki-laki dan perempuan per bulan
  const bulanUnik = Array.from(new Set(patients.map((p: Patient) => (p.tanggal || '').slice(0, 7)))).filter(Boolean);
  const totalLakiPerBulan = bulanUnik.length > 0 ? Math.round(totalLaki / bulanUnik.length) : 0;
  const totalPerempuanPerBulan = bulanUnik.length > 0 ? Math.round(totalPerempuan / bulanUnik.length) : 0;

  // Pie chart data Distribusi Tindakan (warna kontras, Tindakan Lainnya dari kolom lainnya)
  const tindakanUtama = [
    'Obat',
    'Cabut Anak',
    'Cabut Dewasa',
    'Tambal Sementara',
    'Tambal Tetap',
    'Scaling',
    'Rujuk'
  ];
  const tindakanCount: Record<string, number> = {};
  let tindakanLainnya = 0;
  patients.forEach((p: Patient) => {
    p.actions?.forEach((a: string) => {
      const match = tindakanUtama.find(t => a.toLowerCase().includes(t.toLowerCase()));
      if (match) {
        tindakanCount[match] = (tindakanCount[match] || 0) + 1;
      }
    });
    // Hitung Tindakan Lainnya dari kolom lainnya
    if (p.lainnya && p.lainnya.trim() && p.lainnya.trim() !== '-') {
      tindakanLainnya++;
    }
  });
  if (tindakanLainnya > 0) tindakanCount['Tindakan Lainnya'] = tindakanLainnya;
  const tindakanLabels = [...tindakanUtama, 'Tindakan Lainnya'];
  const tindakanData = tindakanLabels.map(label => tindakanCount[label] || 0);
  const tindakanColors = [
    '#2563eb', // Obat - biru tua
    '#dc2626', // Cabut Anak - merah tua
    '#f59e42', // Cabut Dewasa - oranye
    '#059669', // Tambal Sementara - hijau tua
    '#7c3aed', // Tambal Tetap - ungu tua
    '#d946ef', // Scaling - pink tua
    '#eab308', // Rujuk - kuning tua
    '#334155'  // Tindakan Lainnya - abu gelap
  ];

  // Pie chart data Distribusi Biaya
  // const pasienBPJSAll = patients.filter(p => p.jenis_pasien === 'BPJS').length;
  // const pasienUmumAll = patients.filter(p => p.jenis_pasien === 'UMUM').length;

  // Traffic Kunjungan Pasien (Line Chart)
  const trafficData: Record<string, { laki: number; perempuan: number }> = {};
  patients.forEach(p => {
    if (!trafficData[p.tanggal]) trafficData[p.tanggal] = { laki: 0, perempuan: 0 };
    const kelamin = (p.kelamin || '').toLowerCase();
    if (['laki-laki', 'laki-laki', 'laki-laki', 'l'].includes(kelamin)) trafficData[p.tanggal].laki++;
    if (kelamin === 'perempuan' || kelamin === 'p') trafficData[p.tanggal].perempuan++;
  });
  const trafficLabels = Object.keys(trafficData).sort();
  const trafficLaki = trafficLabels.map(tgl => trafficData[tgl].laki);
  const trafficPerempuan = trafficLabels.map(tgl => trafficData[tgl].perempuan);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Kunjungan Harian Table - DIPINDAH KE ATAS */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl mb-8 transition-colors duration-500">
          <div className="bg-gray-100 dark:bg-gray-800 px-6 py-4 rounded-t-2xl border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Kunjungan Harian</h2>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <input
                  type="date"
                  className="w-full sm:w-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded px-2 py-2 text-sm"
                  value={filterDate}
                  onChange={e => setFilterDate(e.target.value)}
                  aria-label="Filter tanggal kunjungan pasien"
                />
                <Link
                  href="/cari-pasien"
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm text-center flex items-center justify-center gap-2"
                  aria-label="Cari Data Pasien"
                >
                  <Users className="h-4 w-4" />
                  Cari Data Pasien
                </Link>
              </div>
            </div>
            
            {/* Mobile Table Guide - with animation */}
        <div className={`transform transition-all duration-700 delay-100 ${pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <MobileTableGuide />
        </div>
          </div>
          
          {/* Table */}
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-gray-100 dark:scrollbar-track-gray-900 mobile-table-container">
            {loading ? (
              <div className="space-y-4 p-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-700 rounded-lg p-4 animate-pulse">
                    <div className="h-4 bg-gray-600 rounded w-1/4 mb-2"></div>
                    <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : filteredPatients.length > 0 ? (
              <>
                {/* Desktop Table View */}
                <div className="hidden sm:block min-w-[1200px] w-full inline-block align-middle">
                  <div className="overflow-hidden rounded-md">
                    <table className="w-full table-fixed">
                      <thead className="bg-gray-700">
  <tr>
    <th className="w-[40px] px-2 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">No</th>
    <th className="w-[90px] px-2 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tanggal</th>
    <th className="w-[180px] px-2 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nama Pasien</th>
    <th className="w-[100px] px-2 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">No. RM</th>
    <th className="w-[250px] px-2 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tindakan</th>
    <th className="w-[80px] px-2 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Jenis</th>
    <th className="w-[150px] px-2 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Lainnya</th>
    <th className="w-[80px] px-2 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Aksi</th>
  </tr>
</thead>
<tbody className="divide-y divide-gray-700">
  {paginatedPatients.map((patient, index) => (
    <tr key={index} className="hover:bg-gray-700 transition-colors">
      <td className="px-2 py-2 text-sm font-medium text-gray-900 dark:text-gray-300">{(currentPage - 1) * pageSize + index + 1}</td>
      <td className="px-2 py-2 text-sm text-gray-900 dark:text-gray-300">{patient.tanggal}</td>
      <td className="px-2 py-3">
        <div className="truncate">
          <div className="text-xs font-medium text-gray-900 dark:text-white truncate">{patient.nama_pasien}</div>
          <div className="text-xs text-gray-700 dark:text-gray-400 truncate">{patient.kelamin === 'L' ? 'Laki-laki' : patient.kelamin === 'P' ? 'Perempuan' : patient.kelamin}</div>
        </div>
      </td>
      <td className="px-2 py-3 text-xs text-gray-900 dark:text-white truncate">{patient.no_rm}</td>
      <td className="px-2 py-3">
        <div className="flex flex-wrap gap-1 max-w-[250px]">
          {patient.actions && patient.actions.length > 0 ? patient.actions.map((action, idx) => (
            <span key={idx} className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-300">
              {action}
            </span>
          )) : <span className="text-xs text-gray-400">-</span>}
        </div>
      </td>
      <td className="px-2 py-3">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${patient.jenis_pasien === 'BPJS' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200'}`}>
          {patient.jenis_pasien}
        </span>
      </td>
      <td className="px-2 py-3 text-xs text-gray-900 dark:text-white truncate">{patient.lainnya || '-'}</td>
      <td className="px-2 py-3 text-center">
        <AksiTableButton
          onEdit={() => handleEditPatient(patient)}
          onDelete={() => handleDeletePatient(patient)}
        />
      </td>
    </tr>
  ))}
</tbody>
                    </table>
                  </div>
                </div>
                
                {/* Mobile Card View */}
                <div className="block sm:hidden">
                  <div className="space-y-4 px-2 py-3">
                    {paginatedPatients.map((patient, index) => (
                      <div key={index} className="bg-gray-700 rounded-lg p-4 shadow-md">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="text-sm font-medium text-white">{patient.nama_pasien}</div>
                            <div className="text-xs text-gray-400">{patient.kelamin === 'L' ? 'Laki-laki' : patient.kelamin === 'P' ? 'Perempuan' : patient.kelamin}</div>
                          </div>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${patient.jenis_pasien === 'BPJS' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200'}`}>
                            {patient.jenis_pasien}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div>
                            <div className="text-xs text-gray-400">Tanggal</div>
                            <div className="text-xs text-white">{patient.tanggal}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">No. RM</div>
                            <div className="text-xs text-white">{patient.no_rm}</div>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <div className="text-xs text-gray-400 mb-1">Tindakan</div>
                          <div className="flex flex-wrap gap-1">
                            {patient.actions && patient.actions.length > 0 ? patient.actions.map((action, idx) => (
                              <span key={idx} className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-600 text-gray-300">
                                {action}
                              </span>
                            )) : <span className="text-xs text-gray-400">-</span>}
                          </div>
                        </div>
                        
                        {patient.lainnya && patient.lainnya !== '-' && (
                          <div className="mb-3">
                            <div className="text-xs text-gray-400 mb-1">Lainnya</div>
                            <div className="text-xs text-white">{patient.lainnya}</div>
                          </div>
                        )}
                        
                        <div className="flex justify-end gap-2 mt-2">
                          <button 
                            onClick={() => handleEditPatient(patient)}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-md transition-colors"
                            aria-label={`Edit data pasien ${patient.nama_pasien}`}
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeletePatient(patient)}
                            className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded-md transition-colors"
                            aria-label={`Hapus data pasien ${patient.nama_pasien}`}
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">
                  Tidak ada kunjungan pada tanggal ini
                </p>
                <p className="text-sm text-gray-500">
                  Pilih tanggal lain atau tambahkan data baru
                </p>
              </div>
            )}
          </div>
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-end items-center gap-2 py-4 px-4">
              <button
                className="px-2 py-1 rounded bg-gray-700 text-white disabled:opacity-50 flex items-center justify-center"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                aria-label="Sebelumnya"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <span className="text-gray-300 text-sm">
                Halaman {currentPage} dari {totalPages}
              </span>
              <button
                className="px-2 py-1 rounded bg-gray-700 text-white disabled:opacity-50 flex items-center justify-center"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                aria-label="Berikutnya"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Dashboard Analytics Section */}
        <section className="mb-12">
          <div className={`mb-8 text-center transform transition-all duration-700 ${pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <div className="bg-gradient-to-r from-blue-900 to-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg relative overflow-hidden inline-block">
              <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]" aria-hidden="true"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm"></div>
              <div className="relative flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg transform transition-transform hover:scale-105">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard Analytics</h1>
                  <p className="text-blue-200">Ringkasan data seluruh aktivitas praktek</p>
                </div>
              </div>
            </div>
          </div>
          {/* Statistik Cards - Atas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-4">
            <div className="bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col items-center">
              <div className="text-blue-400 text-3xl font-bold">{totalLaki}</div>
              <div className="text-gray-300 mt-2">Total Laki-laki</div>
              <div className="text-xs text-gray-400 mt-1">keseluruhan</div>
            </div>
            <div className="bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col items-center">
              <div className="text-pink-400 text-3xl font-bold">{totalPerempuan}</div>
              <div className="text-gray-300 mt-2">Total Perempuan</div>
              <div className="text-xs text-gray-400 mt-1">keseluruhan</div>
            </div>
            <div className="bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col items-center">
              <div className="text-purple-400 text-3xl font-bold">{totalSemuaPasien}</div>
              <div className="text-gray-300 mt-2">Total Semua Pasien</div>
              <div className="text-xs text-gray-400 mt-1">keseluruhan</div>
            </div>
          </div>
          {/* Statistik Cards - Bawah */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col items-center">
              <div className="text-blue-400 text-3xl font-bold">{totalLakiPerBulan}</div>
              <div className="text-gray-300 mt-2">Total Laki-laki perbulan</div>
              <div className="text-xs text-gray-400 mt-1">rata-rata</div>
            </div>
            <div className="bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col items-center">
              <div className="text-pink-400 text-3xl font-bold">{totalPerempuanPerBulan}</div>
              <div className="text-gray-300 mt-2">Total Perempuan perbulan</div>
              <div className="text-xs text-gray-400 mt-1">rata-rata</div>
            </div>
            <div className="bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col items-center">
              <div className="text-green-400 text-3xl font-bold">{rataKunjunganHarian}</div>
              <div className="text-gray-300 mt-2">Kunjungan Harian</div>
              <div className="text-xs text-gray-400 mt-1">rata-rata</div>
            </div>
          </div>
          {/* Chart Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8 md:gap-3">
            <div className="bg-gray-800 rounded-2xl shadow-xl p-5 flex flex-col items-center">
              <h3 className="text-lg font-semibold text-white mb-4">Distribusi Tindakan</h3>
              <div className="w-full flex justify-center" style={{ maxWidth: 320 }}>
                <Pie
                  data={{
                    labels: tindakanLabels,
                    datasets: [{
                      data: tindakanData,
                      backgroundColor: tindakanColors,
                    }],
                  }}
                  options={{ plugins: { legend: { display: true, position: 'right', labels: { color: '#fff', font: { size: 12 } } } }, maintainAspectRatio: false }}
                  height={200}
                />
              </div>
            </div>
            <div className="bg-gray-800 rounded-2xl shadow-xl p-5 flex flex-col items-center">
              <h3 className="text-lg font-semibold text-white mb-4">Distribusi Biaya</h3>
              <div className="w-full flex justify-center" style={{ maxWidth: 320 }}>
                <Pie
                  data={{
                    labels: ['BPJS', 'UMUM'],
                    datasets: [{
                      data: [pasienBPJS, pasienUmumAll],
                      backgroundColor: ['#4ade80', '#60a5fa'],
                    }],
                  }}
                  options={{ plugins: { legend: { display: true, position: 'right', labels: { color: '#fff', font: { size: 10 } } } }, maintainAspectRatio: false }}
                  height={200}
                />
              </div>
            </div>
          </div>
          {/* Traffic Kunjungan Pasien Chart */}
          <div className="bg-gray-800 rounded-2xl shadow-xl p-5 mb-8 flex flex-col items-center max-w-full md:max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold text-white mb-4">Traffic Kunjungan Pasien</h3>
            <div className="w-full flex justify-center" style={{ maxWidth: 700 }}>
              <Line
                data={{
                  labels: trafficLabels,
                  datasets: [
                    {
                      label: 'Laki-laki',
                      data: trafficLaki,
                      borderColor: '#60a5fa',
                      backgroundColor: '#60a5fa',
                      tension: 0.3,
                      pointRadius: 3,
                      fill: false,
                    },
                    {
                      label: 'Perempuan',
                      data: trafficPerempuan,
                      borderColor: '#f472b6',
                      backgroundColor: '#f472b6',
                      tension: 0.3,
                      pointRadius: 3,
                      fill: false,
                    },
                  ],
                }}
                options={{
                  plugins: { legend: { labels: { color: '#fff', font: { size: 10 } } } },
                  scales: {
                    x: { ticks: { color: '#fff', font: { size: 10 } } },
                    y: { ticks: { color: '#fff', font: { size: 10 } } },
                  },
                  maintainAspectRatio: false,
                }}
                height={220}
              />
            </div>
          </div>
        </section>
      </div>
      
      {/* Modal Edit Pasien */}
      <EditPatientModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        patient={selectedPatient}
        onSave={handleSavePatient}
      />
      
      {/* Modal Konfirmasi Hapus */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        patientName={selectedPatient?.nama_pasien || ''}
        onConfirm={handleConfirmDelete}
      />
      
      {/* Modal Sukses */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        message={successMessage}
      />
    </div>
  );
}