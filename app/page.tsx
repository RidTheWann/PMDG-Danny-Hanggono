'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CalendarPlus, BarChart3, ClipboardList, TrendingUp, CheckSquare } from 'lucide-react';

export default function Homepage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const features = [
    {
      icon: ClipboardList,
      title: "Data Harian",
      description: "Catat semua tindakan medis dan rujukan pasien dengan mudah dan terstruktur.",
    },
    {
      icon: TrendingUp,
      title: "Dashboard Analytics",
      description: "Monitor statistik praktek dengan visualisasi data yang interaktif dan real-time.",
    },
    {
      icon: CheckSquare,
      title: "Manajemen Tugas",
      description: "Kelola tugas dan arship dengan sistem galeri yang terorganisir dengan baik.",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 dark:bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400 dark:text-gray-600">Memuat halaman...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 dark:bg-gray-100 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
            <Image
              src="/Praktek.png"
              alt="Praktek Mandiri drg. Danny Hanggono"
              width={800}
              height={450}
              className="w-full h-auto max-h-[400px] sm:max-h-[450px] md:max-h-[500px] object-cover object-center transform hover:scale-102 transition-transform duration-500"
              priority
            />
          </div>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white dark:text-gray-900 mb-6">
              Selamat Datang di<br />
              <span className="text-blue-600 dark:text-blue-700">Praktek Mandiri</span>
            </h1>
            <p className="text-xl text-gray-300 dark:text-gray-700 mb-8">
              Sistem Manajemen Digital untuk Praktek Dokter Gigi<br />
              drg. Danny Hanggono
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tambah-pasien"
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Input Data Harian"
              >
                <CalendarPlus className="h-5 w-5" />
                <span>Input Data Harian</span>
              </Link>
              <Link
                href="/data-pasien"
                className="bg-gray-700 hover:bg-gray-600 dark:bg-gray-300 dark:hover:bg-gray-400 text-white dark:text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Lihat Dashboard"
              >
                <BarChart3 className="h-5 w-5" />
                <span>Lihat Dashboard</span>
              </Link>
            </div>
          </div>
        </motion.div>
        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.3 + index * 0.1,
                ease: 'easeOut',
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: 'easeOut' },
              }}
              className="h-full"
            >
              <div className="h-full bg-gray-800 hover:bg-gray-700 dark:bg-white dark:hover:bg-blue-50 rounded-xl p-6 shadow-lg transition-all duration-500 border border-gray-700 dark:border-blue-200 hover:border-blue-500 dark:hover:border-blue-400">
                <motion.div
                  className="text-blue-500 dark:text-blue-700 text-3xl mb-4"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <feature.icon className="h-8 w-8" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-3 text-white dark:text-blue-900">{feature.title}</h3>
                <p className="text-gray-300 dark:text-gray-700">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}