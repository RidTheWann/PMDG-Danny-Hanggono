
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Filter, Edit, Trash2, Plus, Calendar, Download, RefreshCw } from 'lucide-react';

interface Patient {
  tanggal_kunjungan: string;
  no_antrean: number;
  nama_pasien: string;
  no_rm: string;
  kelamin: string;
  biaya: number;
  obat: string;
  cabut_anak: string;
  cabut_dewasa: string;
  tambal_sementara: string;
  tambal_tetap: string;
  scaling: string;
  rujuk: string;
  lainnya: string;
}

export default function DataPasien() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<Patient | null>(null);

  useEffect(() => {
    fetchPatients();
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    filterPatients();
  }, [patients, searchTerm]);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const currentDate = new Date();
      const month = selectedMonth || (currentDate.getMonth() + 1).toString();
      const year = selectedYear || currentDate.getFullYear().toString();
      
      const sheetsUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL || process.env.GOOGLE_SHEETS_URL;
      const response = await fetch(`${sheetsUrl}?action=get&month=${month}&year=${year}`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.result === 'success' && data.data) {
          const headers = data.data[0] || [];
          const rows = data.data.slice(1) || [];
          
          const formattedPatients = rows
            .filter((row: any[]) => row.length > 0 && row[0])
            .map((row: any[]) => ({
              tanggal_kunjungan: row[0] || '',
              no_antrean: parseInt(row[1]) || 0,
              nama_pasien: row[2] || '',
              no_rm: row[3] || '',
              kelamin: row[4] || '',
              biaya: parseFloat(row[5]) || 0,
              obat: row[6] || '',
              cabut_anak: row[7] || '',
              cabut_dewasa: row[8] || '',
              tambal_sementara: row[9] || '',
              tambal_tetap: row[10] || '',
              scaling: row[11] || '',
              rujuk: row[12] || '',
              lainnya: row[13] || ''
            }));
          
          setPatients(formattedPatients);
        }
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPatients = () => {
    if (!searchTerm) {
      setFilteredPatients(patients);
      return;
    }

    const filtered = patients.filter(patient => 
      patient.nama_pasien.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.no_rm.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.tanggal_kunjungan.includes(searchTerm)
    );
    
    setFilteredPatients(filtered);
  };

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
    setShowEditModal(true);
  };

  const handleDelete = async (patient: Patient) => {
    if (!deleteConfirm) {
      setDeleteConfirm(patient);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('action', 'delete');
      formData.append('tanggal_kunjungan', patient.tanggal_kunjungan);
      formData.append('nama_pasien', patient.nama_pasien);
      formData.append('no_rm', patient.no_rm);

      const sheetsUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL || process.env.GOOGLE_SHEETS_URL;
      const response = await fetch(sheetsUrl, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      if (result.result === 'success') {
        await fetchPatients();
        setDeleteConfirm(null);
      }
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  const handleUpdatePatient = async (updatedPatient: Patient) => {
    try {
      const formData = new FormData();
      formData.append('action', 'edit');
      
      // Original identifiers
      formData.append('Tanggal Kunjungan_asli', editingPatient?.tanggal_kunjungan || '');
      formData.append('Nama Pasien_asli', editingPatient?.nama_pasien || '');
      formData.append('No.RM_asli', editingPatient?.no_rm || '');
      
      // Updated data
      formData.append('Tanggal Kunjungan', updatedPatient.tanggal_kunjungan);
      formData.append('Nama Pasien', updatedPatient.nama_pasien);
      formData.append('No.RM', updatedPatient.no_rm);
      formData.append('Kelamin', updatedPatient.kelamin);
      formData.append('Biaya', updatedPatient.biaya.toString());
      formData.append('Obat', updatedPatient.obat);
      formData.append('Cabut Anak', updatedPatient.cabut_anak);
      formData.append('Cabut Dewasa', updatedPatient.cabut_dewasa);
      formData.append('Tambal Sementara', updatedPatient.tambal_sementara);
      formData.append('Tambal Tetap', updatedPatient.tambal_tetap);
      formData.append('Scaling', updatedPatient.scaling);
      formData.append('Rujuk', updatedPatient.rujuk);
      formData.append('Lainnya', updatedPatient.lainnya);

      const sheetsUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL || process.env.GOOGLE_SHEETS_URL;
      const response = await fetch(sheetsUrl, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      if (result.result === 'success') {
        await fetchPatients();
        setShowEditModal(false);
        setEditingPatient(null);
      }
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getTreatmentSummary = (patient: Patient) => {
    const treatments = [];
    if (patient.obat === 'Ya') treatments.push('Obat');
    if (patient.cabut_anak === 'Ya') treatments.push('Cabut Anak');
    if (patient.cabut_dewasa === 'Ya') treatments.push('Cabut Dewasa');
    if (patient.tambal_sementara === 'Ya') treatments.push('Tambal Sementara');
    if (patient.tambal_tetap === 'Ya') treatments.push('Tambal Tetap');
    if (patient.scaling === 'Ya') treatments.push('Scaling');
    if (patient.rujuk === 'Ya') treatments.push('Rujuk');
    if (patient.lainnya) treatments.push(patient.lainnya);
    
    return treatments.length > 0 ? treatments.join(', ') : 'Tidak ada';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data pasien...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-soft border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Kembali</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Data Pasien</h1>
                <p className="text-sm text-gray-500">Kelola dan lihat data pasien</p>
              </div>
            </div>
            <Link
              href="/tambah-pasien"
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors btn-hover"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Pasien</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Cari nama, no. RM, atau tanggal..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input-focus transition-all w-full sm:w-80"
                />
              </div>
              
              <div className="flex space-x-3">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input-focus transition-all"
                >
                  <option value="">Bulan</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {new Date(0, i).toLocaleDateString('id-ID', { month: 'long' })}
                    </option>
                  ))}
                </select>
                
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input-focus transition-all"
                >
                  <option value="">Tahun</option>
                  {Array.from({ length: 5 }, (_, i) => {
                    const year = new Date().getFullYear() - 2 + i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={fetchPatients}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Patient Table */}
        <div className="bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Antrean
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Pasien
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No. RM
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kelamin
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tindakan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Biaya
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <Calendar className="w-12 h-12 text-gray-300 mb-4" />
                        <p className="text-lg font-medium">Tidak ada data pasien</p>
                        <p className="text-sm">Belum ada pasien yang terdaftar untuk periode ini</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((patient, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(patient.tanggal_kunjungan)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          #{patient.no_antrean}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {patient.nama_pasien}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {patient.no_rm || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {patient.kelamin}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                        <div className="truncate" title={getTreatmentSummary(patient)}>
                          {getTreatmentSummary(patient)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatCurrency(patient.biaya)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEdit(patient)}
                            className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(patient)}
                            className="p-1 text-red-600 hover:text-red-800 transition-colors"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination or Load More */}
        {filteredPatients.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Menampilkan <span className="font-medium">{filteredPatients.length}</span> pasien
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Konfirmasi Hapus</h3>
            <p className="text-sm text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus data pasien <strong>{deleteConfirm.nama_pasien}</strong>? 
              Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
