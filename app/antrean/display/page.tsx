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

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Display Antrean</h1>
      {loading ? (
        <div>Memuat antrean...</div>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">No</th>
              <th className="p-2">Nama</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {antrean.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center p-4">
                  Belum ada antrean
                </td>
              </tr>
            )}
            {antrean.map((a) => (
              <tr
                key={a.id}
                className={
                  a.status === 'dipanggil'
                    ? 'bg-green-100 font-bold'
                    : a.status === 'terlewat'
                      ? 'bg-red-100 text-gray-400'
                      : ''
                }
              >
                <td className="p-2 text-center text-2xl">{a.id}</td>
                <td className="p-2">{a.nama}</td>
                <td className="p-2 capitalize">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
