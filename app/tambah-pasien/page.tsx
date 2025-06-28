'use client';

import { useState, useEffect } from 'react';
import { Calendar, User, CreditCard } from 'lucide-react';
import StatusModal from '../components/StatusModal';
import ModernSelect from '../components/ModernSelect';
import { getTodayJakarta } from '../utils/date';

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

export default function TambahPasienPage(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [statusModal, setStatusModal] = useState({
    isOpen: false,
    status: 'success' as 'success' | 'error',
    message: '',
  });
  const [formData, setFormData] = useState<PatientForm>({
    tanggal: getTodayJakarta(),
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
    lainnya: '',
  });

  // State untuk animasi form
  const [formVisible, setFormVisible] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Efek untuk animasi form saat halaman dimuat
  useEffect(() => {
    setFormVisible(true);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError(null);
    try {
      // Konversi gender dari kode ke teks lengkap
      const genderText =
        formData.kelamin === 'L' ? 'Laki-laki' : formData.kelamin === 'P' ? 'Perempuan' : '';

      // Data untuk dikirim ke API
      const patientData = {
        'Tanggal Kunjungan': formData.tanggal,
        'Nama Pasien': formData.nama_pasien,
        'No.RM': formData.no_rm,
        Kelamin: genderText,
        Biaya: formData.jenis_pasien,
        Obat: formData.obat ? 'Ya' : 'Tidak',
        'Cabut Anak': formData.cabut_anak ? 'Ya' : 'Tidak',
        'Cabut Dewasa': formData.cabut_dewasa ? 'Ya' : 'Tidak',
        'Tambal Sementara': formData.tambal_sementara ? 'Ya' : 'Tidak',
        'Tambal Tetap': formData.tambal_tetap ? 'Ya' : 'Tidak',
        Scaling: formData.scaling ? 'Ya' : 'Tidak',
        Rujuk: formData.rujuk ? 'Ya' : 'Tidak',
        Lainnya: formData.lainnya || '',
      };

      // Kirim data ke API untuk disimpan di database dan Google Sheets
      const response = await fetch('/api/tambah-pasien', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Gagal menyimpan data');
      }

      // Show success modal
      setStatusModal({
        isOpen: true,
        status: 'success',
        message: 'Data pasien berhasil disimpan!',
      });

      // Form akan direset saat modal ditutup
    } catch (error) {
      // Tampilkan error di UI, jangan hanya di console
      let message = 'Gagal menyimpan data. Silakan coba lagi beberapa saat lagi.';
      if (error instanceof Error && error.message) {
        message = error.message;
      }
      setSubmitError(message);
      setStatusModal({
        isOpen: true,
        status: 'error',
        message,
      });
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
    { key: 'rujuk', label: 'Rujuk' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
      <div className="relative max-w-4xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        {/* Form Container */}
        <div
          className={`bg-gray-100 dark:bg-gray-800 bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transform transition-all duration-500 ease-in-out ${formVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          style={{
            boxShadow:
              '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
          }}
        >
          {/* Header */}
          <div className="relative px-6 py-5 overflow-hidden border-b border-gray-200 bg-gradient-to-r from-blue-100 to-gray-100 dark:from-blue-900 dark:to-gray-800 dark:border-gray-600">
            <div
              className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"
              aria-hidden="true"
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm"></div>
            <div className="relative flex items-center space-x-4">
              <div className="flex items-center justify-center w-10 h-10 transition-transform transform shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl hover:scale-105">
                <Calendar className="w-5 h-5 text-white dark:text-blue-900" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Input Data Harian
                </h1>
                <p className="text-sm text-blue-700 dark:text-blue-200">
                  Catat tindakan medis dan rujukan hari ini
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {submitError && (
              <div
                className="px-4 py-2 mt-4 text-center text-red-500 bg-red-100 rounded-lg dark:bg-red-200"
                role="alert"
              >
                {submitError}
              </div>
            )}
            {/* Date */}
            <div className="relative group">
              <label
                htmlFor="tanggal"
                className="block mb-2 text-sm font-medium text-blue-700 transition-all dark:text-blue-300 group-focus-within:text-blue-400"
              >
                Tanggal
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Calendar className="w-5 h-5 text-gray-400 transition-colors group-focus-within:text-blue-500" />
                </div>
                <input
                  type="date"
                  id="tanggal"
                  name="tanggal"
                  value={formData.tanggal}
                  onChange={handleInputChange}
                  required
                  className="w-full max-w-xs px-3 py-3 pl-10 text-gray-900 transition-all bg-gray-100 border border-gray-300 dark:bg-gray-700/70 dark:border-gray-600 rounded-xl dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 dark:hover:border-gray-500"
                />
              </div>
            </div>

            {/* Patient Info Row */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Nama Pasien */}
              <div className="relative group">
                <label
                  htmlFor="nama_pasien"
                  className="block mb-2 text-sm font-medium text-blue-700 transition-all dark:text-blue-300 group-focus-within:text-blue-400"
                >
                  Nama Pasien *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="w-5 h-5 text-gray-400 transition-colors group-focus-within:text-blue-500" />
                  </div>
                  <input
                    type="text"
                    id="nama_pasien"
                    name="nama_pasien"
                    value={formData.nama_pasien}
                    onChange={handleInputChange}
                    required
                    placeholder="Masukkan nama lengkap pasien"
                    className="w-full px-3 py-3 pl-10 text-gray-900 transition-all bg-gray-100 border border-gray-300 dark:bg-gray-700/70 dark:border-gray-600 rounded-xl dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 dark:hover:border-gray-500"
                  />
                </div>
              </div>

              {/* No. RM */}
              <div className="relative group">
                <label
                  htmlFor="no_rm"
                  className="block mb-2 text-sm font-medium text-blue-700 transition-all dark:text-blue-300 group-focus-within:text-blue-400"
                >
                  No. RM *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <CreditCard className="w-5 h-5 text-gray-400 transition-colors group-focus-within:text-blue-500" />
                  </div>
                  <input
                    type="text"
                    id="no_rm"
                    name="no_rm"
                    value={formData.no_rm}
                    onChange={handleInputChange}
                    required
                    placeholder="Contoh: 00.00.00"
                    className="w-full px-3 py-3 pl-10 text-gray-900 placeholder-gray-400 transition-all bg-gray-100 border border-gray-300 dark:bg-gray-700/70 dark:border-gray-600 rounded-xl dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 dark:hover:border-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* Gender and Type Row */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Kelamin */}
              <ModernSelect
                id="kelamin"
                name="kelamin"
                value={formData.kelamin}
                onChange={handleInputChange}
                required
                options={[
                  { value: 'L', label: 'Laki-laki' },
                  { value: 'P', label: 'Perempuan' },
                ]}
                placeholder="Pilih jenis kelamin"
                label="Kelamin *"
              />

              {/* Jenis Pasien */}
              <ModernSelect
                id="jenis_pasien"
                name="jenis_pasien"
                value={formData.jenis_pasien}
                onChange={handleInputChange}
                required
                options={[
                  { value: 'BPJS', label: 'BPJS' },
                  { value: 'UMUM', label: 'UMUM' },
                ]}
                placeholder="Pilih jenis pasien"
                label="Jenis Pasien *"
              />
            </div>

            {/* Tindakan Section */}
            <div>
              <h3 className="flex items-center mb-4 text-lg font-semibold text-blue-300">
                <span className="flex items-center justify-center w-8 h-8 mr-2 rounded-lg bg-blue-600/30">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                Tindakan *
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-3 lg:grid-cols-4">
                {treatmentOptions.map((option, index) => (
                  <label
                    key={option.key}
                    className={`flex items-center justify-center text-center cursor-pointer rounded-lg px-2 py-3 border transition-all duration-200
                      ${formData[option.key as keyof PatientForm] ? 'bg-blue-600 border-blue-500 shadow-lg text-white' : 'bg-gray-100 dark:bg-gray-700/70 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600/90 hover:border-gray-400 dark:hover:border-gray-500 text-gray-900 dark:text-gray-200'}`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <input
                      type="checkbox"
                      name={option.key}
                      checked={formData[option.key as keyof PatientForm] as boolean}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <span
                      className={`text-xs sm:text-sm font-medium ${formData[option.key as keyof PatientForm] ? 'text-white' : 'text-gray-900 dark:text-gray-200'}`}
                    >
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tindakan Lainnya */}
            <div className="relative group">
              <label
                htmlFor="lainnya"
                className="block mb-2 text-sm font-medium text-blue-700 transition-all dark:text-blue-300 group-focus-within:text-blue-400"
              >
                Tindakan Lainnya *
              </label>
              <div className="relative">
                <textarea
                  id="lainnya"
                  name="lainnya"
                  value={formData.lainnya}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Sebutkan tindakan lainnya, atau tindakan lainnya"
                  className="w-full px-4 py-3 text-gray-900 placeholder-gray-400 transition-all bg-gray-100 border border-gray-300 resize-none dark:bg-gray-700/70 dark:border-gray-600 rounded-xl dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 dark:hover:border-gray-500"
                />
              </div>
              <p className="flex items-center mt-2 text-xs text-blue-700 dark:text-blue-300/80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 mr-1 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Pilih minimal satu tindakan di atas, atau tindakan lainnya
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className={`w-full py-3 px-6 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-lg ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Menyimpan...' : 'Simpan Data'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Status Modal */}
      <StatusModal
        isOpen={statusModal.isOpen}
        onClose={() => {
          setStatusModal((prev) => ({ ...prev, isOpen: false }));
          // Reset form jika sukses
          if (statusModal.status === 'success') {
            setFormData({
              tanggal: getTodayJakarta(),
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
              lainnya: '',
            });
          }
        }}
        status={statusModal.status}
        message={statusModal.message}
      />
    </div>
  );
}
