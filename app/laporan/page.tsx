'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LaporanPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">Survey Kepuasan Pelayanan</h1>
          <p className="text-gray-400">Akses survey kepuasan pelayanan untuk meningkatkan kualitas praktek</p>
        </div>

        {/* Survey Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Survey BPJS */}
          <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 text-center">
              {/* QR Code Placeholder */}
              <div className="w-48 h-48 mx-auto mb-6 bg-white rounded-lg flex items-center justify-center">
                <div className="grid grid-cols-8 gap-1">
                  {Array.from({ length: 64 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
                    />
                  ))}
                </div>
              </div>

              {/* BPJS Info */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl">🏥</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Survey Kepuasan BPJS</h3>
                <p className="text-gray-400 text-sm mb-4">Survey kepuasan pelayanan kesehatan BPJS Kesehatan</p>
              </div>

              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center space-x-2 mx-auto">
                <span>Survey 1</span>
                <span>🔗</span>
              </button>
            </div>
          </div>

          {/* Survey Pasien */}
          <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 text-center">
              {/* Kemenkes Logo Placeholder */}
              <div className="w-48 h-48 mx-auto mb-6 bg-gray-600 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-400 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white text-2xl">🏛️</span>
                  </div>
                  <div className="text-white font-bold text-lg">KEMENKES RI</div>
                </div>
              </div>

              {/* Pasien Info */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Survey Kepuasan Pasien</h3>
                <p className="text-gray-400 text-sm mb-4">Survey kepuasan pasien Kementerian Kesehatan</p>
              </div>

              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center space-x-2 mx-auto">
                <span>Survey 2</span>
                <span>🔗</span>
              </button>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>← Kembali ke Beranda</span>
          </Link>
        </div>
      </div>
    </div>
  );
}