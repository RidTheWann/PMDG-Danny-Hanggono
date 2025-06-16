
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Users, FileText, BarChart3, Clock, UserPlus, Settings, LogOut } from 'lucide-react';

interface DashboardStats {
  totalPasienHariIni: number;
  totalPasienBulanIni: number;
  antreanTerakhir: number;
  pendapatanBulanIni: number;
}

export default function Homepage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPasienHariIni: 0,
    totalPasienBulanIni: 0,
    antreanTerakhir: 0,
    pendapatanBulanIni: 0
  });
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard-stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    
    // Update current time every second
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const menuItems = [
    {
      title: 'Tambah Pasien',
      description: 'Daftarkan pasien baru dan kelola antrean',
      href: '/tambah-pasien',
      icon: UserPlus,
      color: 'bg-blue-500 hover:bg-blue-600',
      gradient: 'from-blue-400 to-blue-600'
    },
    {
      title: 'Data Pasien',
      description: 'Lihat dan kelola data pasien',
      href: '/data-pasien',
      icon: Users,
      color: 'bg-green-500 hover:bg-green-600',
      gradient: 'from-green-400 to-green-600'
    },
    {
      title: 'Laporan',
      description: 'Lihat laporan harian dan bulanan',
      href: '/laporan',
      icon: FileText,
      color: 'bg-purple-500 hover:bg-purple-600',
      gradient: 'from-purple-400 to-purple-600'
    },
    {
      title: 'Statistik',
      description: 'Analisis data dan tren pasien',
      href: '/statistik',
      icon: BarChart3,
      color: 'bg-orange-500 hover:bg-orange-600',
      gradient: 'from-orange-400 to-orange-600'
    }
  ];

  const statCards = [
    {
      title: 'Pasien Hari Ini',
      value: stats.totalPasienHariIni,
      icon: Calendar,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Pasien Bulan Ini',
      value: stats.totalPasienBulanIni,
      icon: Users,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      title: 'Antrean Terakhir',
      value: stats.antreanTerakhir,
      icon: Clock,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      title: 'Pendapatan Bulan Ini',
      value: formatCurrency(stats.pendapatanBulanIni),
      icon: BarChart3,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      isNumber: false
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-soft border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">DH</span>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Praktek Mandiri drg. Danny Hanggono
                </h1>
                <p className="text-sm text-gray-500">Sistem Manajemen Pasien</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{formatTime(currentTime)}</p>
                <p className="text-xs text-gray-500">{formatDate(currentTime)}</p>
              </div>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Selamat Datang
          </h2>
          <p className="text-gray-600">
            Kelola praktek dokter gigi Anda dengan mudah dan efisien
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-soft p-6 border border-gray-100 hover:shadow-lg transition-all duration-200 fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.isNumber === false ? stat.value : stat.value.toLocaleString()}
                  </p>
                </div>
                <div className={`${stat.bg} p-3 rounded-lg`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Menu Utama</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="group bg-white rounded-xl shadow-soft p-6 border border-gray-100 hover:shadow-lg transition-all duration-200 btn-hover fade-in"
                style={{ animationDelay: `${(index + 4) * 0.1}s` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`bg-gradient-to-r ${item.gradient} p-4 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-soft p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Aktivitas Terbaru</h3>
            <Link
              href="/data-pasien"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
            >
              Lihat Semua
            </Link>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Sistem siap digunakan
                </p>
                <p className="text-xs text-gray-500">
                  Mulai dengan menambahkan pasien baru
                </p>
              </div>
              <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
