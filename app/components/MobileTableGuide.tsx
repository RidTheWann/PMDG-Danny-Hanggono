'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Smartphone, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileTableGuide(): JSX.Element | null {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if screen is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Check if user has dismissed the guide before
    const dismissed = localStorage.getItem('tableGuideDismissed');
    if (dismissed === 'true') {
      setIsVisible(false);
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const dismissGuide = () => {
    setIsVisible(false);
    localStorage.setItem('tableGuideDismissed', 'true');
  };

  if (!isMobile) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: 'spring', damping: 20 }}
          className="bg-gradient-to-r from-blue-100 to-indigo-200 dark:from-blue-600 dark:to-indigo-700 text-blue-900 dark:text-white px-5 py-4 rounded-xl mb-4 shadow-lg border border-blue-200 dark:border-blue-500/30 backdrop-filter backdrop-blur-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-200 dark:bg-blue-500/30 p-2 rounded-full">
                <Smartphone className="w-5 h-5 text-blue-700 dark:text-white" />
              </div>
              <span className="font-medium">Panduan Tabel Mobile</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              whileTap={{ scale: 0.9 }}
              onClick={dismissGuide}
              className="p-1.5 rounded-full hover:bg-blue-100 dark:hover:bg-white/20 transition-all duration-200"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="mt-3 flex items-center bg-blue-500/20 p-3 rounded-lg border border-blue-400/20">
            <motion.div
              animate={{ x: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronLeft className="w-5 h-5 text-blue-400 dark:text-blue-200" />
            </motion.div>
            <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <ChevronRight className="w-5 h-5 mr-3 text-blue-400 dark:text-blue-200" />
            </motion.div>
            <span className="text-sm">Geser tabel ke kanan/kiri untuk melihat semua data</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.03, backgroundColor: '#2563EB' }}
            whileTap={{ scale: 0.97 }}
            onClick={dismissGuide}
            className="mt-3 w-full text-sm bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg transition-all duration-200 font-medium shadow-md"
          >
            Mengerti
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
