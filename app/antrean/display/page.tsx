'use client';

import { useEffect, useState } from 'react';

type Antrean = {
  id: number;
  nama: string;
  status: 'menunggu' | 'dipanggil' | 'terlewat';
  waktu: string;
};

export default function DisplayAntreanPage(): JSX.Element {
  const [antrean, setAntrean] = useState<Antrean[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let prevDipanggilId: number | null = null;
    async function fetchAntrean() {
      const res = await fetch('/api/antrean');
      const data = await res.json();
      setAntrean(data.antrean);
      const currDipanggil = data.antrean.find((a: Antrean) => a.status === 'dipanggil');
      if (currDipanggil && currDipanggil.id !== prevDipanggilId) {
        // Panggil suara
        const kalimat = `Nomor antrean ${currDipanggil.id} atas nama ${currDipanggil.nama} silahkan masuk ke ruang praktek`;
        if (typeof window !== 'undefined' && window.speechSynthesis) {
          const utter = new window.SpeechSynthesisUtterance(kalimat);
          utter.lang = 'id-ID';
          window.speechSynthesis.speak(utter);
        }
        prevDipanggilId = currDipanggil.id;
      }
      setLoading(false);
    }
    fetchAntrean();
    const interval = setInterval(fetchAntrean, 2000);
    return () => clearInterval(interval);
  }, []);

  // Cari antrean yang sedang dipanggil
  const antreanDipanggil = antrean.find((a) => a.status === 'dipanggil');

  return (
    <div className="fixed inset-0 z-[9999] w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center">
        <header className="w-full mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-blue-800 dark:text-blue-200 text-center tracking-wide drop-shadow-lg uppercase">
            Sistem Antrean drg. Danny Hanggono
          </h1>
        </header>
        {loading ? (
          <div className="text-2xl font-bold text-gray-600 dark:text-gray-200 animate-pulse">
            Memuat antrean...
          </div>
        ) : antreanDipanggil ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="relative flex items-center justify-center mb-6">
              <span className="absolute w-44 h-44 rounded-full bg-blue-400/30 blur-2xl animate-pulse"></span>
              <span className="text-[8rem] md:text-[10rem] font-extrabold text-blue-700 dark:text-blue-300 drop-shadow-lg tracking-widest animate-glow">
                {antreanDipanggil.id}
              </span>
            </div>
            <div className="text-3xl font-semibold text-gray-800 dark:text-white mb-8 tracking-wide animate-fadein">
              {antreanDipanggil.nama}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="text-4xl font-bold text-gray-500 dark:text-gray-300 mb-4 animate-fadein">
              Belum ada antrean dipanggil
            </div>
          </div>
        )}
        <div className="mt-8 w-full flex justify-center">
          <div className="bg-white dark:bg-gray-900 border border-blue-200 dark:border-gray-700 rounded-xl px-6 py-4 shadow text-center max-w-lg">
            <span className="text-blue-700 dark:text-blue-300 font-semibold">Note:</span>{' '}
            <span className="text-gray-700 dark:text-gray-200">
              Mohon bersabar karna antrean di dokter gigi ada yang cepat ada yang lama.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
