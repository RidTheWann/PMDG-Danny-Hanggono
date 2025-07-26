import { NextRequest, NextResponse } from 'next/server';

// In-memory antrean data (replace with DB in production)
let antreanList: Array<{
  id: number;
  nama: string;
  status: 'menunggu' | 'dipanggil' | 'terlewat';
  waktu: string;
}> = [];
let lastNumber = 0;

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ antrean: antreanList });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { nama } = await req.json();
  if (!nama) return NextResponse.json({ error: 'Nama wajib diisi' }, { status: 400 });
  lastNumber += 1;
  const antrean = {
    id: lastNumber,
    nama,
    status: 'menunggu' as const,
    waktu: new Date().toISOString(),
  };
  antreanList.push(antrean);
  return NextResponse.json({ antrean });
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  const { id, status } = await req.json();
  const idx = antreanList.findIndex((a) => a.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Antrean tidak ditemukan' }, { status: 404 });
  if (status) antreanList[idx].status = status;
  return NextResponse.json({ antrean: antreanList[idx] });
}

export async function DELETE(): Promise<NextResponse> {
  antreanList = [];
  lastNumber = 0;
  return NextResponse.json({ success: true });
}
