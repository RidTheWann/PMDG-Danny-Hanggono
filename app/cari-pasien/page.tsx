'use client';

import { useState } from 'react';
import { searchPatients } from '@/lib/actions/patient';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import type { DataEntry } from '@/lib/db/schema';

export default function CariPasienPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<DataEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const data = await searchPatients(query);
      setResults(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-3xl font-bold mb-6">Cari Pasien</h1>
      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Cari nama atau nomor RM..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button onClick={handleSearch} disabled={loading}>
          <Search className="h-4 w-4 mr-2" />
          Cari
        </Button>
      </div>
      <div className="space-y-4">
        {results.map((patient) => (
          <div key={patient.id} className="p-4 border rounded-lg">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm text-muted-foreground">Nama</p>
                <p className="font-medium">{patient.patientName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">No. RM</p>
                <p className="font-medium">{patient.medicalRecordNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tanggal</p>
                <p className="font-medium">{patient.date}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pembayaran</p>
                <p className="font-medium">{patient.paymentType}</p>
              </div>
            </div>
          </div>
        ))}
        {results.length === 0 && query && !loading && (
          <p className="text-center text-muted-foreground">Tidak ada hasil</p>
        )}
      </div>
    </div>
  );
}
