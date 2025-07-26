'use client';
import { useEffect, useState } from 'react';
// import { getSocket } from './socket-client';

type Antrean = {
  id: number;
  nama: string;
  status: 'menunggu' | 'dipanggil' | 'terlewat' | 'valid-ada' | 'valid-tidak';
  waktu: string;
};

export default function KontrolAntreanPage(): JSX.Element {
  const [antrean, setAntrean] = useState<Antrean[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showValidasi, setShowValidasi] = useState(false);
  const [validasiId, setValidasiId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  // const [selectedUlang, setSelectedUlang] = useState<number | null>(null); // dihapus karena tidak digunakan

  async function fetchAntrean() {
    const res = await fetch('/api/antrean');
    const data = await res.json();
    setAntrean(data.antrean);
    setLoading(false);
  }

  useEffect(() => {
    fetchAntrean(); // initial fetch
    const interval = setInterval(() => {
      fetchAntrean();
    }, 2000); // Poll every 2 seconds
    return () => clearInterval(interval);
  }, []);

  async function panggilBerikutnya() {
    setError('');
    const next = antrean.find((a) => a.status === 'menunggu');
    if (!next) return setError('Tidak ada antrean menunggu');
    await fetch('/api/antrean', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: next.id, status: 'dipanggil' }),
    });
    setShowValidasi(true);
    setValidasiId(next.id); // Simpan antrean yang perlu divalidasi
    fetchAntrean();
  }

  // async function tandaiTerlewat(id: number) {
  //   await fetch('/api/antrean', {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ id, status: 'terlewat' }),
  //   });
  //   fetchAntrean();
  // }

  async function panggilUlang(id: number) {
    await fetch('/api/antrean', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: 'dipanggil' }),
    });
    setShowValidasi(true);
    setShowModal(false);
    fetchAntrean();
  }

  async function resetAntrean() {
    await fetch('/api/antrean', { method: 'DELETE' });
    fetchAntrean();
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded shadow border border-blue-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-800 dark:text-blue-200">
        Kontrol Antrean
      </h1>
      <div className="flex gap-2 mb-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={panggilBerikutnya}>
          Panggil Berikutnya
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          Panggil Ulang
        </button>
        <button className="bg-gray-600 text-white px-4 py-2 rounded" onClick={resetAntrean}>
          Reset Antrean
        </button>
      </div>
      {/* Modal pilih pasien terlewat */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4 text-blue-700 dark:text-blue-300">
              Pilih Pasien Terlewat
            </h2>
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {antrean.filter((a) => a.status === 'terlewat').length === 0 && (
                <li className="text-gray-500 text-center">Tidak ada antrean terlewat</li>
              )}
              {antrean
                .filter((a) => a.status === 'terlewat')
                .map((a) => (
                  <li
                    key={a.id}
                    className="flex items-center justify-between gap-2 bg-blue-50 dark:bg-gray-800 rounded px-3 py-2"
                  >
                    <span className="font-semibold text-blue-800 dark:text-blue-200">{a.id}</span>
                    <span className="flex-1 text-left text-gray-900 dark:text-white">{a.nama}</span>
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-semibold"
                      onClick={() => panggilUlang(a.id)}
                    >
                      Panggil Ulang
                    </button>
                  </li>
                ))}
            </ul>
            <button
              className="mt-4 w-full bg-gray-500 hover:bg-gray-700 text-white py-2 rounded"
              onClick={() => setShowModal(false)}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <div className="overflow-x-auto rounded-lg shadow-sm">
        <table className="min-w-full border border-blue-100 dark:border-gray-700 text-center align-middle">
          <colgroup>
            <col style={{ width: '70px' }} />
            <col style={{ width: '40%' }} />
            <col style={{ width: '120px' }} />
            <col style={{ width: '160px' }} />
          </colgroup>
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="p-3 text-gray-900 dark:text-white text-center font-semibold">No</th>
              <th className="p-3 text-gray-900 dark:text-white text-center font-semibold">Nama</th>
              <th className="p-3 text-gray-900 dark:text-white text-center font-semibold">
                Status
              </th>
              <th className="p-3 text-gray-900 dark:text-white text-center font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  Memuat...
                </td>
              </tr>
            ) : antrean.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  Belum ada antrean
                </td>
              </tr>
            ) : (
              antrean.map((a) => (
                <tr
                  key={a.id}
                  className={
                    a.status === 'dipanggil'
                      ? 'bg-green-100 dark:bg-green-900 font-bold'
                      : a.status === 'terlewat'
                        ? 'bg-red-100 dark:bg-red-900 text-gray-400 dark:text-gray-300'
                        : 'dark:text-white'
                  }
                >
                  <td className="p-3 text-center text-2xl font-bold">{a.id}</td>
                  <td className="p-3 text-center whitespace-nowrap">{a.nama}</td>
                  <td className="p-3 text-center capitalize">
                    {a.status === 'menunggu' && <span className="text-gray-500">Menunggu</span>}
                    {a.status === 'dipanggil' && (
                      <span className="text-blue-700 dark:text-blue-200 font-semibold">
                        Dipanggil
                      </span>
                    )}
                    {a.status === 'terlewat' && (
                      <span className="text-red-600 font-semibold">Terlewat</span>
                    )}
                    {a.status === 'valid-ada' && (
                      <span className="text-green-600 font-semibold">Ada</span>
                    )}
                  </td>
                  <td className="p-3 flex items-center justify-center gap-2 min-h-[48px]">
                    {/* Validasi pilihan muncul hanya untuk antrean yang baru dipanggil */}
                    {showValidasi && validasiId === a.id && a.status === 'dipanggil' ? (
                      <>
                        <button
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-semibold"
                          onClick={async () => {
                            await fetch('/api/antrean', {
                              method: 'PUT',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ id: a.id, status: 'valid-ada' }),
                            });
                            setShowValidasi(false);
                            setValidasiId(null);
                            fetchAntrean();
                          }}
                        >
                          Ada
                        </button>
                        <button
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-semibold"
                          onClick={async () => {
                            await fetch('/api/antrean', {
                              method: 'PUT',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ id: a.id, status: 'terlewat' }),
                            });
                            setShowValidasi(false);
                            setValidasiId(null);
                            fetchAntrean();
                          }}
                        >
                          Terlewat
                        </button>
                      </>
                    ) : (
                      // Tampilkan hasil validasi jika sudah dipilih
                      <>
                        {a.status === 'valid-ada' && (
                          <span title="Validasi Ada" className="text-green-600 text-xl">
                            ✅
                          </span>
                        )}
                        {a.status === 'terlewat' && (
                          <span title="Pasien Terlewat" className="text-red-500 text-xl">
                            ❌
                          </span>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
