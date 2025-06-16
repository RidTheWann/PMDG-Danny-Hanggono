
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Download, Calendar, TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

interface ReportData {
  date: string;
  totalPatients: number;
  bpjsPatients: number;
  umumPatients: number;
  treatments: {
    [key: string]: number;
  };
}

interface MonthlyStats {
  totalPatients: number;
  bpjsPatients: number;
  umumPatients: number;
  averagePerDay: number;
  mostPopularTreatment: string;
  dailyData: ReportData[];
}

export default function Laporan() {
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState((new Date().getMonth() + 1).toString());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

  useEffect(() => {
    fetchReportData();
  }, [selectedMonth, selectedYear]);

  const fetchReportData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/reports?month=${selectedMonth}&year=${selectedYear}`);
      if (response.ok) {
        const data = await response.json();
        setMonthlyStats(data);
      }
    } catch (error) {
      console.error('Error fetching report data:', error);
    } finally {
      setLoading(false);
    }
  };

  

  const getMonthName = (month: string) => {
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    return months[parseInt(month) - 1] || '';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat laporan...</p>
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
                <h1 className="text-xl font-bold text-gray-900">Laporan</h1>
                <p className="text-sm text-gray-500">Laporan harian dan bulanan</p>
              </div>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors btn-hover">
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Period Selection */}
        <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Periode Laporan</h2>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input-focus transition-all"
              >
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
        </div>

        {monthlyStats && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-soft p-6 border border-gray-100 fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Total Pasien</p>
                    <p className="text-2xl font-bold text-gray-900">{monthlyStats.totalPatients}</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-soft p-6 border border-gray-100 fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Pasien BPJS</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {monthlyStats.bpjsPatients}
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-soft p-6 border border-gray-100 fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Rata-rata/Hari</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {Math.round(monthlyStats.averagePerDay)}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-soft p-6 border border-gray-100 fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Pasien UMUM</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {monthlyStats.umumPatients}
                    </p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Report Table */}
            <div className="bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Laporan Harian - {getMonthName(selectedMonth)} {selectedYear}
                </h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tanggal
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Jumlah Pasien
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        BPJS / UMUM
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tindakan Terbanyak
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {monthlyStats.dailyData.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                          <div className="flex flex-col items-center">
                            <FileText className="w-12 h-12 text-gray-300 mb-4" />
                            <p className="text-lg font-medium">Tidak ada data</p>
                            <p className="text-sm">Belum ada data untuk periode ini</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      monthlyStats.dailyData.map((day, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(day.date).toLocaleDateString('id-ID', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long'
                            })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {day.totalPatients} pasien
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {day.bpjsPatients} / {day.umumPatients}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {Object.keys(day.treatments).length > 0 
                              ? Object.entries(day.treatments)
                                  .sort(([,a], [,b]) => b - a)[0]?.[0] || '-'
                              : '-'
                            }
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
