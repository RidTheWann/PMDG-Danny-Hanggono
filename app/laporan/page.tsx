'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function LaporanPage(): JSX.Element {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen transition-colors duration-500 bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-b-2 border-blue-600 rounded-full animate-spin dark:border-blue-400"></div>
          <p className="text-gray-400 dark:text-gray-300">Memuat halaman...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen transition-colors duration-500 bg-white dark:bg-gray-900">
      <div className="max-w-4xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Arship Tugas</h1>
          <p className="text-gray-400 dark:text-gray-300">
            Akses survey kepuasan pelayanan untuk meningkatkan kualitas praktek
          </p>
        </div>

        {/* Survey Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Survey BPJS */}
          <div className="overflow-hidden bg-white border border-gray-200 shadow-xl dark:bg-gray-900 rounded-2xl dark:border-gray-700">
            <div className="p-8 text-center">
              {/* Kessan Image */}
              <div className="w-48 h-48 mx-auto mb-6 overflow-hidden rounded-lg">
                <Image
                  src="/Kessan.jpg"
                  alt="Survey BPJS Kesehatan"
                  width={192}
                  height={192}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>

              {/* BPJS Info */}
              <div className="mb-6">
                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  Survey Kepuasan BPJS
                </h3>
                <p className="mb-4 text-sm text-gray-400 dark:text-gray-300">
                  Survey kepuasan pelayanan kesehatan BPJS
                </p>
              </div>

              <a
                href="https://kesan.bpjs-kesehatan.go.id/kessan/survey/search/ew0KImtkcHBrIjogIjAxNTdHMDA3IiwNCiJubXBwayI6ICIgZHJnLiBEYW5ueSBIYW5nZ29ubyIsDQoia2RkYXRpMiI6ICIwMTU3Ig0KfQ"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-6 py-3 mx-auto space-x-2 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900"
              >
                <span>Survey 1</span>
                <span>🔗</span>
              </a>
            </div>
          </div>

          {/* Survey Pasien */}
          <div className="overflow-hidden bg-white border border-gray-200 shadow-xl dark:bg-gray-900 rounded-2xl dark:border-gray-700">
            <div className="p-8 text-center">
              {/* Kepuasan Image */}
              <div className="w-48 h-48 mx-auto mb-6 overflow-hidden rounded-lg">
                <Image
                  src="/Kepuasan.png"
                  alt="Survey Kepuasan Pasien Kemenkes"
                  width={192}
                  height={192}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>

              {/* Pasien Info */}
              <div className="mb-6">
                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  Survey Kepuasan Pasien
                </h3>
                <p className="mb-4 text-sm text-gray-400 dark:text-gray-300">
                  Survey kepuasan pasien Kementerian Kesehatan
                </p>
              </div>

              <a
                href="https://mutufasyankes.kemkes.go.id/halaman/survei_kepuasan_pasien/0902612912"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-6 py-3 mx-auto space-x-2 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900"
              >
                <span>Survey 2</span>
                <span>🔗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Back Button */}
        {/* Tombol kembali dihapus sesuai permintaan */}
      </div>
    </div>
  );
}
