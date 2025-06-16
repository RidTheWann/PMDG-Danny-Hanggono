'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users, Activity, PieChart, TrendingUp } from 'lucide-react';

interface Patient {
  tanggal: string;
  nama_pasien: string;
  no_rm: string;
  kelamin: 'L' | 'P';
  jenis_pasien: 'BPJS' | 'UMUM';
  tindakan: string;
  lainnya?: string;
}

interface DashboardStats {
  totalPasienHariIni: number;
  totalPasienBulanIni: number;
  antreanTerakhir: number;
  pasiенBPJS: number;
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

export default function DataPasienPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalPasienHariIni: 0,
    totalPasienBulanIni: 0,
    antreanTerakhir: 0,
    pasiенBPJS: 0,
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

  useEffect(() => {
    fetchDashboardStats();
    fetchPatientData();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/dashboard-stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const fetchPatientData = async () => {
    try {
      // Simulate loading data - replace with actual API call
      setTimeout(() => {
        const mockPatients = [
          {
            tanggal: '2024-01-15',
            nama_pasien: 'Ahmad Rizki',
            no_rm: 'RM001',
            kelamin: 'L' as const,
            jenis_pasien: 'BPJS' as const,
            tindakan: 'Scaling',
            lainnya: ''
          },
          {
            tanggal: '2024-01-14',
            nama_pasien: 'Siti Nurhaliza',
            no_rm: 'RM002',
            kelamin: 'P' as const,
            jenis_pasien: 'UMUM' as const,
            tindakan: 'Tambal Tetap',
            lainnya: 'Konsultasi'
          }
        ];

        // Sort by date descending (newest first)
        mockPatients.sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime());

        setPatients(mockPatients);
        setTreatmentStats({
          obat: 45,
          cabut_anak: 23,
          cabut_dewasa: 67,
          tambal_sementara: 89,
          tambal_tetap: 134,
          scaling: 156,
          rujuk: 12,
          lainnya: 34
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching patient data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Memuat data pasien...</p>
        </div>
      </div>
    );
  }

  const totalTindakan = Object.values(treatmentStats).reduce((sum, value) => sum + value, 0);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard Analytics</h1>
          <p className="text-gray-400">Ringkasan aktivitas praktek hari ini</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          {/* Card Distribusi Tindakan */}
          <div className="bg-gray-800 rounded-2xl shadow-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <Activity className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">Distribusi Tindakan</h3>
              </div>
            </div>
            <div>
              <p className="text-white text-sm mb-2">Total Tindakan: {totalTindakan}</p>
              {Object.entries(treatmentStats).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between text-gray-300 text-xs py-1 border-b border-gray-700 last:border-b-0">
                  <span>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card Distribusi Biaya */}
          <div className="bg-gray-800 rounded-2xl shadow-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <PieChart className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">Distribusi Biaya</h3>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-gray-300 text-sm py-2">
                <span>BPJS</span>
                <span>{stats.pasiенBPJS}</span>
              </div>
              <div className="flex items-center justify-between text-gray-300 text-sm py-2">
                <span>UMUM</span>
                <span>{stats.pasienUmum}</span>
              </div>
            </div>
          </div>

          {/* Card Traffic Kunjungan Pasien */}
          <div className="bg-gray-800 rounded-2xl shadow-xl p-5 col-span-3">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">Traffic Kunjungan Pasien</h3>
              </div>
            </div>
            <div>
              {/* Placeholder for chart line component */}
              <div className="text-gray-400 text-center py-4">
                Grafik kunjungan pasien akan ditampilkan di sini
              </div>
            </div>
          </div>
        </div>

        {/* Kunjungan Harian Table */}
        <div className="bg-gray-800 rounded-2xl shadow-xl">
          <div className="bg-gray-700 px-6 py-4 rounded-t-2xl border-b border-gray-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">📋</span>
                </div>
                <h2 className="text-lg font-semibold text-white">Kunjungan Harian ({patients.length})</h2>
              </div>

              <div className="flex items-center space-x-4">
                <Link
                  href="/cari-pasien"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  🔍 Cari Data Pasien
                </Link>
                <Link
                  href="/tambah-pasien"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  + Tambah Pasien
                </Link>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tanggal</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nama Pasien</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">No. RM</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tindakan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Jenis Pasien</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Lainnya</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {patients.map((patient, index) => (
                  <tr key={index} className="hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-semibold">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{patient.tanggal}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-white">{patient.nama_pasien}</div>
                        <div className="text-xs text-gray-400">{patient.kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{patient.no_rm}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{patient.tindakan}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        patient.jenis_pasien === 'BPJS' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {patient.jenis_pasien}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{patient.lainnya || '-'}</td>
                  </tr>
                ))}

                {patients.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                      <div className="flex flex-col items-center">
                        <Users className="w-12 h-12 text-gray-600 mb-4" />
                        <p>Tidak ada data pasien hari ini</p>
                        <p className="text-sm mt-1">Mulai tambahkan data pasien baru</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}