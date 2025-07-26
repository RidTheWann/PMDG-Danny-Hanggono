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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Cetak Nomor Antrean</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="border p-2 w-full rounded"
          placeholder="Nama Pasien"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? 'Memproses...' : 'Cetak Nomor'}
        </button>
      </form>
      {error && <div className="text-red-600 mt-2">{error}</div>}
      {result && (
        <div className="mt-6 border-t pt-4 text-center">
          <div className="text-4xl font-bold">{result.id}</div>
          <div className="text-lg">{result.nama}</div>
          <div className="text-sm text-gray-500">{new Date(result.waktu).toLocaleString()}</div>
        </div>
      )}
    </div>
  );
}
