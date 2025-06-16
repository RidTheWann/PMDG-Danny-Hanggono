
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';

export default function CariPasienPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('nama');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    // Simulate search - in real app, this would call an API
    setSearchResults([]);
  };

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

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Cari Data Pasien</h1>
          <p className="text-gray-400">Temukan data pasien berdasarkan nama, nomor rekam medis, atau tindakan</p>
        </div>

        {/* Search Section */}
        <div className="bg-gray-800 rounded-2xl shadow-xl mb-8">
          <div className="bg-gray-700 px-6 py-4 rounded-t-2xl border-b border-gray-600">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Search className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-white">Pencarian</h2>
            </div>
          </div>

          <div className="p-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Masukkan kata kunci pencarian..."
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
                <div className="sm:w-48">
                  <select
                    value={searchBy}
                    onChange={(e) => setSearchBy(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="nama">Nama</option>
                    <option value="no_rm">No. RM</option>
                    <option value="tindakan">Tindakan</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Cari
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-gray-800 rounded-2xl shadow-xl">
          <div className="bg-gray-700 px-6 py-4 rounded-t-2xl border-b border-gray-600">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">📋</span>
              </div>
              <h2 className="text-lg font-semibold text-white">Hasil Pencarian</h2>
            </div>
          </div>

          <div className="p-6">
            {!hasSearched ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Search className="w-12 h-12 text-gray-500" />
                </div>
                <p className="text-gray-400">Masukkan kata kunci untuk mencari!</p>
                <p className="text-gray-500 text-sm mt-1">Hasil pencarian akan muncul di sini</p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-500 text-2xl">🔍</span>
                </div>
                <p className="text-gray-400">Masukkan kata kunci untuk mencari!</p>
                <p className="text-gray-500 text-sm mt-1">Hasil pencarian akan muncul di sini</p>
              </div>
            ) : (
              <div className="space-y-4">
                {searchResults.map((result, index) => (
                  <div key={index} className="bg-gray-700 rounded-lg p-4">
                    {/* Patient card would go here */}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
