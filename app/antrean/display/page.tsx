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
  const [lastCalledId, setLastCalledId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchAntrean() {
      const res = await fetch('/api/antrean');
      const data = await res.json();
      setAntrean(() => {
        // Deteksi antrean yang baru dipanggil
        const currDipanggil = data.antrean.find((a: Antrean) => a.status === 'dipanggil');
        if (currDipanggil && currDipanggil.id !== lastCalledId) {
          // Panggil suara
          const kalimat = `Nomor antrean ${currDipanggil.id} atas nama ${currDipanggil.nama} silahkan masuk ke ruang praktek`;
          if (typeof window !== 'undefined' && window.speechSynthesis) {
            const utter = new window.SpeechSynthesisUtterance(kalimat);
            utter.lang = 'id-ID';
            window.speechSynthesis.speak(utter);
          }
          setLastCalledId(currDipanggil.id);
        }
        return data.antrean;
      });
      setLoading(false);
    }
    fetchAntrean();
    const interval = setInterval(fetchAntrean, 2000); // polling setiap 2 detik
    return () => clearInterval(interval);
  }, [lastCalledId]);

  // Cari antrean yang sedang dipanggil
  const antreanDipanggil = antrean.find((a) => a.status === 'dipanggil');

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-900 dark:to-gray-800">
      {loading ? (
        <div className="text-2xl font-bold text-gray-600 dark:text-gray-200">Memuat antrean...</div>
      ) : antreanDipanggil ? (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="text-8xl font-extrabold text-blue-700 dark:text-blue-300 drop-shadow mb-6">
            {antreanDipanggil.id}
          </div>
          <div className="text-3xl font-semibold text-gray-800 dark:text-white mb-2">
            {antreanDipanggil.nama}
          </div>
          <div className="text-lg text-gray-500 dark:text-gray-200 mb-8">
            Silakan masuk ke ruang praktek
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="text-4xl font-bold text-gray-500 dark:text-gray-300 mb-4">
            Belum ada antrean dipanggil
          </div>
        </div>
      )}
    </div>
  );
}
