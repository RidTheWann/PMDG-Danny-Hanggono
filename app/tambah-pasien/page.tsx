
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, User, Calendar, DollarSign, Stethoscope, AlertCircle } from 'lucide-react';

interface PatientForm {
  tanggal_kunjungan: string;
  nama_pasien: string;
  no_rm: string;
  kelamin: string;
  biaya: string;
  obat: boolean;
  cabut_anak: boolean;
  cabut_dewasa: boolean;
  tambal_sementara: boolean;
  tambal_tetap: boolean;
  scaling: boolean;
  rujuk: boolean;
  lainnya: string;
}

export default function TambahPasien() {
  const [formData, setFormData] = useState<PatientForm>({
    tanggal_kunjungan: new Date().toISOString().split('T')[0],
    nama_pasien: '',
    no_rm: '',
    kelamin: '',
    biaya: '',
    obat: false,
    cabut_anak: false,
    cabut_dewasa: false,
    tambal_sementara: false,
    tambal_tetap: false,
    scaling: false,
    rujuk: false,
    lainnya: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [antreanNumber, setAntreanNumber] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Prepare form data for Google Sheets
      const submitData = new FormData();
      submitData.append('action', 'add');
      submitData.append('Tanggal Kunjungan', formData.tanggal_kunjungan);
      submitData.append('Nama Pasien', formData.nama_pasien);
      submitData.append('No.RM', formData.no_rm || '-');
      submitData.append('Kelamin', formData.kelamin);
      submitData.append('Biaya', formData.biaya || '0');
      submitData.append('Obat', formData.obat ? 'Ya' : 'Tidak');
      submitData.append('Cabut Anak', formData.cabut_anak ? 'Ya' : 'Tidak');
      submitData.append('Cabut Dewasa', formData.cabut_dewasa ? 'Ya' : 'Tidak');
      submitData.append('Tambal Sementara', formData.tambal_sementara ? 'Ya' : 'Tidak');
      submitData.append('Tambal Tetap', formData.tambal_tetap ? 'Ya' : 'Tidak');
      submitData.append('Scaling', formData.scaling ? 'Ya' : 'Tidak');
      submitData.append('Rujuk', formData.rujuk ? 'Ya' : 'Tidak');
      submitData.append('Lainnya', formData.lainnya);

      const response = await fetch(process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL || '/api/sheets', {
        method: 'POST',
        body: submitData
      });

      const result = await response.json();

      if (result.result === 'success') {
        setSuccess(true);
        if (result.data?.antrean_number) {
          setAntreanNumber(result.data.antrean_number);
        }
        
        // Reset form
        setFormData({
          tanggal_kunjungan: new Date().toISOString().split('T')[0],
          nama_pasien: '',
          no_rm: '',
          kelamin: '',
          biaya: '',
          obat: false,
          cabut_anak: false,
          cabut_dewasa: false,
          tambal_sementara: false,
          tambal_tetap: false,
          scaling: false,
          rujuk: false,
          lainnya: ''
        });
      } else {
        setError(result.message || 'Terjadi kesalahan saat menyimpan data');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Terjadi kesalahan jaringan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const treatmentOptions = [
    { key: 'obat', label: 'Obat' },
    { key: 'cabut_anak', label: 'Cabut Anak' },
    { key: 'cabut_dewasa', label: 'Cabut Dewasa' },
    { key: 'tambal_sementara', label: 'Tambal Sementara' },
    { key: 'tambal_tetap', label: 'Tambal Tetap' },
    { key: 'scaling', label: 'Scaling' },
    { key: 'rujuk', label: 'Rujuk' }
  ];

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
                <h1 className="text-xl font-bold text-gray-900">Tambah Pasien Baru</h1>
                <p className="text-sm text-gray-500">Daftarkan pasien dan kelola antrean</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 fade-in">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">✓</span>
                </div>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Pasien berhasil ditambahkan!</h3>
                {antreanNumber && (
                  <p className="text-sm text-green-700 mt-1">
                    Nomor antrean: <span className="font-semibold">{antreanNumber}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 fade-in">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden">
            {/* Basic Information */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Informasi Pasien</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="tanggal_kunjungan" className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal Kunjungan *
                  </label>
                  <input
                    type="date"
                    id="tanggal_kunjungan"
                    name="tanggal_kunjungan"
                    value={formData.tanggal_kunjungan}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input-focus transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="nama_pasien" className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Pasien *
                  </label>
                  <input
                    type="text"
                    id="nama_pasien"
                    name="nama_pasien"
                    value={formData.nama_pasien}
                    onChange={handleInputChange}
                    required
                    placeholder="Masukkan nama lengkap pasien"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input-focus transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="no_rm" className="block text-sm font-medium text-gray-700 mb-2">
                    No. Rekam Medis
                  </label>
                  <input
                    type="text"
                    id="no_rm"
                    name="no_rm"
                    value={formData.no_rm}
                    onChange={handleInputChange}
                    placeholder="Opsional"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input-focus transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="kelamin" className="block text-sm font-medium text-gray-700 mb-2">
                    Jenis Kelamin *
                  </label>
                  <select
                    id="kelamin"
                    name="kelamin"
                    value={formData.kelamin}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input-focus transition-all"
                  >
                    <option value="">Pilih jenis kelamin</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Treatment Information */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Stethoscope className="w-4 h-4 text-green-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Tindakan Medis</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                {treatmentOptions.map((option) => (
                  <label key={option.key} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name={option.key}
                      checked={formData[option.key as keyof PatientForm] as boolean}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>

              <div>
                <label htmlFor="lainnya" className="block text-sm font-medium text-gray-700 mb-2">
                  Tindakan Lainnya
                </label>
                <textarea
                  id="lainnya"
                  name="lainnya"
                  value={formData.lainnya}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Deskripsi tindakan lainnya (opsional)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input-focus transition-all resize-none"
                />
              </div>
            </div>

            {/* Financial Information */}
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-orange-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Informasi Biaya</h2>
              </div>

              <div className="max-w-md">
                <label htmlFor="biaya" className="block text-sm font-medium text-gray-700 mb-2">
                  Biaya Perawatan
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">Rp</span>
                  <input
                    type="number"
                    id="biaya"
                    name="biaya"
                    value={formData.biaya}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="0"
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input-focus transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link
              href="/"
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed btn-hover transition-all flex items-center space-x-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{loading ? 'Menyimpan...' : 'Simpan Pasien'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
