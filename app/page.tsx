'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Homepage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Memuat halaman...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Content */}
        <div className="text-center">
          {/* Practice Image */}
          <div className="mb-8">
            <div className="relative w-full max-w-2xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/Praktek.png"
                alt="Praktek Mandiri drg. Danny Hanggono"
                width={800}
                height={450}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Welcome Text */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Selamat Datang di
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-blue-400">Praktek Mandiri</span>
            </h2>
            <p className="text-xl text-gray-300 mb-2">
              Sistem Manajemen Digital untuk Praktek Dokter Gigi
            </p>
            <p className="text-lg text-gray-400">
              drg. Danny Hanggono
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              href="/tambah-pasien"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>➕</span>
              <span>Input Data Harian</span>
            </Link>

            <Link
              href="/data-pasien"
              className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>📊</span>
              <span>Lihat Dashboard</span>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-xl">👥</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Manajemen Pasien</h3>
              <p className="text-gray-400 text-sm">Kelola data pasien dengan mudah dan efisien</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-xl">📈</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Analisis Data</h3>
              <p className="text-gray-400 text-sm">Monitor perkembangan praktek dengan laporan</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-xl">🔒</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Keamanan Data</h3>
              <p className="text-gray-400 text-sm">Data pasien tersimpan aman dan terlindungi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}