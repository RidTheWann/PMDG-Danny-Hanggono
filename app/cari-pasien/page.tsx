'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, User, Calendar, CreditCard, Activity, UserRound, Pencil } from 'lucide-react';
import dynamic from 'next/dynamic';

const EditPatientModal = dynamic(() => import('../components/EditPatientModal'), { ssr: false });

import type { Patient } from '../types/patient';

// Fungsi untuk memformat tanggal
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

// Fungsi untuk memformat gender
const formatGender = (kelamin: string) => {
  if (kelamin === 'L' || kelamin === 'Laki-laki') return 'Laki-laki';
  if (kelamin === 'P' || kelamin === 'Perempuan') return 'Perempuan';
  return kelamin;
};

export default function CariPasienPage(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'nama' | 'rm' | 'tindakan'>('nama');
  const [results, setResults] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [initialSearch, setInitialSearch] = useState(true);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const PAGE_SIZE = 10;

  // Efek untuk animasi saat halaman dimuat
  useEffect(() => {
    setPageLoaded(true);
  }, []);

  // Debounce search term (optimasi: 1000ms)
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000); // debounce lebih lama (1000ms)

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Fetch patients from server with search, paginasi
  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        if (!debouncedSearchTerm) {
          setResults([]);
          setInitialSearch(true);
          setHasMore(false);
          setLoading(false);
          return;
        }
        const params = new URLSearchParams({
          search: debouncedSearchTerm,
          type: searchType,
          limit: PAGE_SIZE.toString(),
          offset: ((page - 1) * PAGE_SIZE).toString(),
        });
        const response = await fetch(`/api/data-pasien?${params.toString()}`);
        if (!response.ok) throw new Error('Gagal mencari pasien');
        const data = await response.json();
        setResults(data);
        setInitialSearch(false);
        setHasMore(data.length === PAGE_SIZE);
      } catch (error) {
        setResults([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, [debouncedSearchTerm, searchType, page]);

  // Reset ke halaman 1 jika search term/type berubah
  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm, searchType]);

  const renderActionBadges = (patient: Patient) => {
    const badges: JSX.Element[] = [];

    // Parse actions dari database (bisa berupa string JSON atau array)
    let actions: string[] = [];
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

    // Tampilkan badge untuk setiap tindakan yang ada
    actions.forEach((action: string) => {
      badges.push(
        <span
          key={action}
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-700/80 text-white dark:bg-blue-900 dark:text-blue-200 mr-2 mb-2"
        >
          {action}
        </span>,
      );
    });

    // Tampilkan tindakan lainnya jika ada
    if (patient.lainnya && (patient.lainnya as string).trim() !== '') {
      badges.push(
        <span
          key="lainnya"
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-700/80 text-white dark:bg-purple-900 dark:text-purple-200 mr-2 mb-2"
        >
          Lainnya: {patient.lainnya}
        </span>,
      );
    }

    // Jika tidak ada tindakan, tampilkan pesan
    if (badges.length === 0) {
      badges.push(
        <span
          key="no-action"
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-500/80 text-white mr-2 mb-2"
        >
          Tidak ada tindakan
        </span>,
      );
    }

    return badges;
  };

  // Handler untuk membuka modal edit
  const handleOpenEditModal = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsEditModalOpen(true);
  };

  // Handler untuk menyimpan perubahan pasien
  const handleSavePatient = async (updatedPatient: Patient) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 detik timeout

      const response = await fetch(`/api/data-pasien/${updatedPatient.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPatient),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      // Refresh data setelah update
      const refreshed = await fetch('/api/data-pasien');
      if (refreshed.ok) {
        setResults((results) =>
          results.map((p: Patient) =>
            p.id === updatedPatient.id ? { ...p, ...updatedPatient } : p,
          ),
        );
      }
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Gagal update data pasien', error);
    }
  };

  // Konversi Patient (id: string) ke PatientData (id: number)
  function toPatientData(patient: Patient | null): Patient | null {
    if (!patient) return null;
    return {
      ...patient,
      id: typeof patient.id === 'string' ? parseInt(patient.id, 10) : patient.id,
    };
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div
          className={`mb-8 transform transition-all duration-700 ${pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        >
          <div className="bg-gradient-to-r from-blue-100 dark:from-blue-900 to-gray-100 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg relative overflow-hidden">
            <div
              className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"
              aria-hidden="true"
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm"></div>
            <div className="relative flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg transform transition-transform hover:scale-105">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                  Cari Pasien
                </h1>
                <p className="mt-2 text-blue-700 dark:text-blue-200">
                  Temukan data pasien berdasarkan nama, nomor RM, atau tindakan
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tombol Kembali */}
        <div className="mb-4">
          <Link
            href="/data-pasien"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium shadow transition-colors dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Kembali
          </Link>
        </div>

        {/* Search Box */}
        <div
          className={`mb-8 transform transition-all duration-700 delay-100 ${pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        >
          <div className="bg-white dark:bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
            {/* Input dan icon search dibungkus dalam .relative tanpa padding tambahan */}
            <div className="relative">
              <span className="absolute left-4 inset-y-0 my-auto flex items-center pointer-events-none z-10">
                <Search className="h-5 w-5 text-blue-500" />
              </span>
              <input
                type="text"
                className="w-full px-4 py-2.5 pl-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Cari berdasarkan ${searchType === 'nama' ? 'nama pasien' : searchType === 'rm' ? 'nomor RM' : 'tindakan'}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label={`Cari pasien berdasarkan ${searchType === 'nama' ? 'nama' : searchType === 'rm' ? 'nomor rekam medis' : 'tindakan'}`}
              />
            </div>
            {/* Search Type Buttons */}
            <div className="flex flex-wrap gap-2 mt-4">
              <button
                className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
                  searchType === 'nama'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-300'
                }`}
                onClick={() => setSearchType('nama')}
                aria-label="Cari berdasarkan nama pasien"
              >
                <User className="w-4 h-4" />
                Nama
              </button>
              <button
                className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
                  searchType === 'rm'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-300'
                }`}
                onClick={() => setSearchType('rm')}
                aria-label="Cari berdasarkan nomor rekam medis"
              >
                <CreditCard className="w-4 h-4" />
                No. RM
              </button>
              <button
                className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
                  searchType === 'tindakan'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-300'
                }`}
                onClick={() => setSearchType('tindakan')}
                aria-label="Cari berdasarkan tindakan"
              >
                <Activity className="w-4 h-4" />
                Tindakan
              </button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div
          className={`mb-6 transform transition-all duration-700 delay-200 ${pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        >
          <div className="bg-gray-100 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl px-6 py-4 border border-gray-200 dark:border-gray-700 shadow-md">
            {loading ? (
              <h2 className="text-xl font-semibold flex items-center text-gray-700 dark:text-blue-300">
                <div className="mr-3 h-5 w-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                Mencari...
              </h2>
            ) : initialSearch ? (
              <h2 className="text-xl font-semibold flex items-center text-blue-600 dark:text-blue-300">
                <Search className="h-5 w-5 mr-2" />
                Masukkan kata kunci pencarian
              </h2>
            ) : results.length === 0 ? (
              <h2 className="text-xl font-semibold flex items-center text-amber-600 dark:text-amber-300">
                <User className="h-5 w-5 mr-2" />
                Tidak ada hasil ditemukan
              </h2>
            ) : (
              <h2 className="text-xl font-semibold flex items-center text-green-700 dark:text-green-300">
                <User className="h-5 w-5 mr-2" />
                Ditemukan {results.length} hasil
              </h2>
            )}
          </div>
        </div>

        {/* Results List */}
        <div
          className={`transform transition-all duration-700 delay-300 ${pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading
              ? // Loading skeletons
                Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="bg-gray-800 rounded-xl p-4 animate-pulse">
                      <div className="flex items-center mb-4">
                        <div className="h-12 w-12 rounded-full bg-gray-700"></div>
                        <div className="ml-4 flex-1">
                          <div className="h-5 w-32 bg-gray-700 rounded mb-2"></div>
                          <div className="h-4 w-24 bg-gray-700 rounded"></div>
                        </div>
                        <div className="h-8 w-20 bg-gray-700 rounded"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="h-4 w-16 bg-gray-700 rounded mb-2"></div>
                          <div className="h-5 w-24 bg-gray-700 rounded"></div>
                        </div>
                        <div>
                          <div className="h-4 w-16 bg-gray-700 rounded mb-2"></div>
                          <div className="h-5 w-24 bg-gray-700 rounded"></div>
                        </div>
                      </div>
                      <div>
                        <div className="h-4 w-20 bg-gray-700 rounded mb-2"></div>
                        <div className="flex flex-wrap gap-2">
                          <div className="h-6 w-16 bg-gray-700 rounded-full"></div>
                          <div className="h-6 w-20 bg-gray-700 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  ))
              : !initialSearch && results.length > 0
                ? results.map((patient, index) => (
                    <motion.div
                      key={patient.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-gray-800 bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:shadow-blue-900/20 hover:-translate-y-1 transition-all duration-300"
                      style={{
                        boxShadow:
                          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
                      }}
                    >
                      <div className="p-5 text-white">
                        <div className="flex items-center mb-4">
                          <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                            <UserRound className="h-6 w-6 text-white" />
                          </div>
                          <div className="ml-4 flex-1">
                            <h3 className="text-lg font-medium text-white">
                              {patient.nama_pasien}
                            </h3>
                            <p className="text-blue-200">
                              {formatGender(patient.kelamin as string)}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full shadow-sm ${patient.jenis_pasien === 'BPJS' ? 'bg-green-200 dark:bg-green-900 text-green-900 dark:text-green-200' : 'bg-blue-200 dark:bg-blue-900 text-blue-900 dark:text-blue-200'}`}
                          >
                            {patient.jenis_pasien}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="bg-gray-700/70 p-3 rounded-lg">
                            <p className="text-sm text-blue-200 flex items-center mb-1">
                              <Calendar className="h-4 w-4 mr-2" />
                              Tanggal
                            </p>
                            <p className="text-sm text-white font-medium">
                              {formatDate(patient.tanggal)}
                            </p>
                          </div>
                          <div className="bg-gray-700/70 p-3 rounded-lg">
                            <p className="text-sm text-blue-200 flex items-center mb-1">
                              <CreditCard className="h-4 w-4 mr-2" />
                              No. RM
                            </p>
                            <p className="text-sm text-white font-medium">{patient.no_rm}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-blue-200 flex items-center mb-2">
                            <Activity className="h-4 w-4 mr-2" />
                            Tindakan
                          </p>
                          <div className="flex flex-wrap gap-2">{renderActionBadges(patient)}</div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-5 py-3 flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(patient)}
                          className="relative group inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-blue-700 bg-gradient-to-br from-blue-900 to-blue-700 text-blue-200 hover:text-white hover:border-blue-400 hover:from-blue-800 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-200 shadow-lg"
                          aria-label={`Edit data pasien ${patient.nama_pasien}`}
                        >
                          <Pencil className="h-5 w-5" />
                          <span className="absolute left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-blue-800 text-white text-xs rounded px-2 py-1 shadow-lg transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                            Edit Data
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  ))
                : null}
          </div>
          {/* Pagination Controls */}
          {!loading && results.length > 0 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold disabled:opacity-50"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Sebelumnya
              </button>
              <span className="font-medium text-gray-700 dark:text-gray-200">Halaman {page}</span>
              <button
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold disabled:opacity-50"
                onClick={() => setPage((p) => (hasMore ? p + 1 : p))}
                disabled={!hasMore}
              >
                Selanjutnya
              </button>
            </div>
          )}
        </div>
        {/* Modal Edit Pasien */}
        <EditPatientModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          patient={toPatientData(selectedPatient)}
          onSave={handleSavePatient}
        />
      </div>
    </div>
  );
}
