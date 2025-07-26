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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded shadow border border-blue-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold mb-2 text-blue-800 dark:text-blue-200 text-center">
        Selamat datang di sistem antrean drg. Danny Hanggono
      </h1>
      <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-6 text-center">
        Cetak Nomor Antrean
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="border p-2 w-full rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="Nama Pasien"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full transition-colors"
          disabled={loading}
        >
          {loading ? 'Memproses...' : 'Cetak Nomor'}
        </button>
      </form>
      {error && <div className="text-red-600 mt-2">{error}</div>}
      {result && (
        <div className="mt-6 border-t border-blue-100 dark:border-gray-700 pt-4 text-center">
          <div className="text-4xl font-bold text-blue-700 dark:text-blue-300">{result.id}</div>
          <div className="text-lg text-gray-900 dark:text-white">{result.nama}</div>
        </div>
      )}
    </div>
  );
}
