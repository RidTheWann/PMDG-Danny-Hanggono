'use client';
import { useState } from 'react';

export default function CetakAntreanPage(): JSX.Element {
  const [nama, setNama] = useState('');
  const [result, setResult] = useState<null | { id: number; nama: string; waktu: string }>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch('/api/antrean', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal membuat antrean');
      setResult(data.antrean);
      setNama('');
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center">
        <header className="w-full mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-blue-800 dark:text-blue-200 text-center tracking-wide drop-shadow-lg uppercase">
            Selamat datang di sistem antrean drg. Danny Hanggono
          </h1>
          <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-6 text-center">
            Cetak Nomor Antrean
          </h2>
        </header>
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">
          <input
            type="text"
            className="border p-3 w-full rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-lg shadow"
            placeholder="Nama Pasien"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
            autoFocus
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded w-full font-bold text-lg shadow transition-colors"
            disabled={loading}
          >
            {loading ? 'Memproses...' : 'Cetak Nomor'}
          </button>
        </form>
        {error && <div className="text-red-600 mt-2">{error}</div>}
        {result && (
          <div className="mt-8 border-t border-blue-100 dark:border-gray-700 pt-6 text-center">
            <div className="text-6xl font-extrabold text-blue-700 dark:text-blue-300 drop-shadow mb-4 animate-pulse">
              {result.id}
            </div>
            <div className="text-2xl text-gray-900 dark:text-white font-semibold mb-2">
              {result.nama}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
