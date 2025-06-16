'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Download, Edit, Trash2, Eye } from 'lucide-react';

interface Patient {
  tanggal: string;
  nama_pasien: string;
  no_rm: string;
  kelamin: 'L' | 'P';
  jenis_pasien: 'BPJS' | 'UMUM';
  tindakan: string;
  lainnya?: string;
}

export default function DataPasienPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('nama');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Mock data
  const mockPatients: Patient[] = [
    {
      tanggal: '13/6/2025',
      nama_pasien: 'M. UMAR FARUQ G.',
      no_rm: '00.36.14',
      kelamin: 'L',
      jenis_pasien: 'UMUM',
      tindakan: 'obat',
      lainnya: 'ortho'
    },
    {
      tanggal: '13/6/2025',
      nama_pasien: 'AZMATUN NISA',
      no_rm: '00.23.14',
      kelamin: 'P',
      jenis_pasien: 'BPJS',
      tindakan: 'konseling',
      lainnya: 'konseling'
    },
    {
      tanggal: '13/6/2025',
      nama_pasien: 'DAMIANTO',
      no_rm: '00.41.16',
      kelamin: 'L',
      jenis_pasien: 'UMUM',
      tindakan: 'Cabut dewasa, Obat',
      lainnya: ''
    },
    {
      tanggal: '13/6/2025',
      nama_pasien: 'MARSHAN A.A',
      no_rm: '00.29.05',
      kelamin: 'L',
      jenis_pasien: 'BPJS',
      tindakan: 'Obat',
      lainnya: '-'
    },
    {
      tanggal: '13/6/2025',
      nama_pasien: 'HARIS M',
      no_rm: '00.19.16',
      kelamin: 'L',
      jenis_pasien: 'BPJS',
      tindakan: 'Obat',
      lainnya: ''
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setPatients(mockPatients);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredPatients = patients.filter(patient => {
    const searchValue = searchTerm.toLowerCase();
    switch (filterBy) {
      case 'nama':
        return patient.nama_pasien.toLowerCase().includes(searchValue);
      case 'no_rm':
        return patient.no_rm.toLowerCase().includes(searchValue);
      case 'tindakan':
        return patient.tindakan.toLowerCase().includes(searchValue);
      default:
        return true;
    }
  });

  const stats = {
    totalLakiLaki: 855,
    totalPerempuan: 1136,
    kunjunganHarian: 17,
    totalSemuaPasien: 1991
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

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard Analytics</h1>
          <p className="text-gray-400">Ringkasan aktivitas praktek hari ini</p>
        </div>

        {/* Kunjungan Harian Section */}
        <div className="bg-gray-800 rounded-2xl shadow-xl mb-8">
          {/* Section Header */}
          <div className="bg-gray-700 px-6 py-4 rounded-t-2xl border-b border-gray-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">📅</span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Kunjungan Harian</h2>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-300">Tanggal:</span>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="px-3 py-1 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Cari Data Pasien</span>
                </button>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Masukkan kata kunci pencarian..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="nama">Nama</option>
                <option value="no_rm">No. RM</option>
                <option value="tindakan">Tindakan</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tanggal</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nama Pasien</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">No. RM</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tindakan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Jenis Pasien</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Lainnya</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredPatients.map((patient, index) => (
                  <tr key={index} className="hover:bg-gray-700 transition-colors">
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-red-400 hover:text-red-300 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-blue-600 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-xl">👨</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">{stats.totalLakiLaki}</div>
            <div className="text-blue-100 text-sm">Total Laki-laki</div>
          </div>

          <div className="bg-pink-600 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-xl">👩</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">{stats.totalPerempuan}</div>
            <div className="text-pink-100 text-sm">Total Perempuan</div>
          </div>

          <div className="bg-green-600 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-xl">📅</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">{stats.kunjunganHarian}</div>
            <div className="text-green-100 text-sm">Kunjungan Harian</div>
          </div>

          <div className="bg-purple-600 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-xl">👥</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">{stats.totalSemuaPasien}</div>
            <div className="text-purple-100 text-sm">Total Semua Pasien</div>
          </div>
        </div>
      </div>
    </div>
  );
}