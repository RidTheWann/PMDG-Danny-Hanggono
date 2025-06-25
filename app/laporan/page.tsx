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
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-500">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400 dark:text-gray-300">Memuat halaman...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Arship Tugas</h1>
          <p className="text-gray-400 dark:text-gray-300">Akses survey kepuasan pelayanan untuk meningkatkan kualitas praktek</p>
        </div>

        {/* Survey Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Survey BPJS */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-8 text-center">
              {/* Kessan Image */}
              <div className="w-48 h-48 mx-auto mb-6 rounded-lg overflow-hidden">
                <img
                  src="/Kessan.jpg"
                  alt="Survey BPJS Kesehatan"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* BPJS Info */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Survey Kepuasan BPJS</h3>
                <p className="text-gray-400 dark:text-gray-300 text-sm mb-4">Survey kepuasan pelayanan kesehatan BPJS</p>
              </div>

              <a
                href="https://kesan.bpjs-kesehatan.go.id/kessan/survey/search/ew0KImtkcHBrIjogIjAxNTdHMDA3IiwNCiJubXBwayI6ICIgZHJnLiBEYW5ueSBIYW5nZ29ubyIsDQoia2RkYXRpMiI6ICIwMTU3Ig0KfQ"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center space-x-2 mx-auto"
              >
                <span>Survey 1</span>
                <span>🔗</span>
              </a>
            </div>
          </div>

          {/* Survey Pasien */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-8 text-center">
              {/* Kepuasan Image */}
              <div className="w-48 h-48 mx-auto mb-6 rounded-lg overflow-hidden">
                <img
                  src="/Kepuasan.png"
                  alt="Survey Kepuasan Pasien Kemenkes"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Pasien Info */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Survey Kepuasan Pasien</h3>
                <p className="text-gray-400 dark:text-gray-300 text-sm mb-4">Survey kepuasan pasien Kementerian Kesehatan</p>
              </div>

              <a
                href="https://mutufasyankes.kemkes.go.id/halaman/survei_kepuasan_pasien/0902612912"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center space-x-2 mx-auto"
              >
                <span>Survey 2</span>
                <span>🔗</span>
              </a>
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