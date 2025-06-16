'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Calendar, User, CreditCard } from 'lucide-react';

interface PatientForm {
  tanggal: string;
  nama_pasien: string;
  no_rm: string;
  kelamin: 'L' | 'P' | '';
  jenis_pasien: 'BPJS' | 'UMUM' | '';
  obat: boolean;
  cabut_anak: boolean;
  cabut_dewasa: boolean;
  tambal_sementara: boolean;
  tambal_tetap: boolean;
  scaling: boolean;
  rujuk: boolean;
  lainnya: string;
}

export default function TambahPasienPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<PatientForm>({
    tanggal: new Date().toISOString().split('T')[0],
    nama_pasien: '',
    no_rm: '',
    kelamin: '',
    jenis_pasien: '',
    obat: false,
    cabut_anak: false,
    cabut_dewasa: false,
    tambal_sementara: false,
    tambal_tetap: false,
    scaling: false,
    rujuk: false,
    lainnya: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success message
      alert('Data pasien berhasil disimpan!');

      // Reset form
      setFormData({
        tanggal: new Date().toISOString().split('T')[0],
        nama_pasien: '',
        no_rm: '',
        kelamin: '',
        jenis_pasien: '',
        obat: false,
        cabut_anak: false,
        cabut_dewasa: false,
        tambal_sementara: false,
        tambal_tetap: false,
        scaling: false,
        rujuk: false,
        lainnya: ''
      });
    } catch (error) {
      alert('Terjadi kesalahan saat menyimpan data');
    } finally {
      setLoading(false);
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
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali</span>
          </Link>
        </div>

        {/* Form Container */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gray-700 px-6 py-4 border-b border-gray-600">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Input Data Harian</h1>
                <p className="text-sm text-gray-300">Catat tindakan medis dan rujukan hari ini</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            {/* Date */}
            <div className="mb-6">
              <label htmlFor="tanggal" className="block text-sm font-medium text-gray-300 mb-2">
                Tanggal
              </label>
              <input
                type="date"
                id="tanggal"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleInputChange}
                required
                className="w-full max-w-xs px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Patient Info Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Nama Pasien */}
              <div>
                <label htmlFor="nama_pasien" className="block text-sm font-medium text-gray-300 mb-2">
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
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              {/* No. RM */}
              <div>
                <label htmlFor="no_rm" className="block text-sm font-medium text-gray-300 mb-2">
                  No. RM *
                </label>
                <input
                  type="text"
                  id="no_rm"
                  name="no_rm"
                  value={formData.no_rm}
                  onChange={handleInputChange}
                  required
                  placeholder="Contoh: 00.00.00"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Gender and Type Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Kelamin */}
              <div>
                <label htmlFor="kelamin" className="block text-sm font-medium text-gray-300 mb-2">
                  Kelamin *
                </label>
                <select
                  id="kelamin"
                  name="kelamin"
                  value={formData.kelamin}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="">Pilih jenis kelamin</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>

              {/* Jenis Pasien */}
              <div>
                <label htmlFor="jenis_pasien" className="block text-sm font-medium text-gray-300 mb-2">
                  Jenis Pasien *
                </label>
                <select
                  id="jenis_pasien"
                  name="jenis_pasien"
                  value={formData.jenis_pasien}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="">Pilih jenis pasien</option>
                  <option value="BPJS">BPJS</option>
                  <option value="UMUM">UMUM</option>
                </select>
              </div>
            </div>

            {/* Tindakan Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Tindakan *</h3>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                {treatmentOptions.map((option) => (
                  <label key={option.key} className="flex items-center space-x-3 cursor-pointer bg-gray-700 rounded-lg p-3 hover:bg-gray-600 transition-colors">
                    <input
                      type="checkbox"
                      name={option.key}
                      checked={formData[option.key as keyof PatientForm] as boolean}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-sm text-gray-200">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tindakan Lainnya */}
            <div className="mb-8">
              <label htmlFor="lainnya" className="block text-sm font-medium text-gray-300 mb-2">
                Tindakan Lainnya *
              </label>
              <textarea
                id="lainnya"
                name="lainnya"
                value={formData.lainnya}
                onChange={handleInputChange}
                rows={4}
                placeholder="Sebutkan tindakan lainnya, atau tindakan lainnya"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
              />
              <p className="text-xs text-gray-400 mt-1">* Pilih minimal satu tindakan di atas, atau tindakan lainnya</p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg transition-all flex items-center space-x-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <span>📝</span>
                )}
                <span>{loading ? 'Menyimpan...' : 'Submit Data'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}