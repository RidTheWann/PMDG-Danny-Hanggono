import { Suspense } from 'react';
import { getPatients } from '@/lib/actions/patient';
import { ReportStats } from '@/app/_components/report-stats';
import { Skeleton } from '@/components/ui/skeleton';

export default async function LaporanPage() {
  const patients = await getPatients();

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Laporan & Statistik</h1>
        <p className="text-muted-foreground">Analisis data pasien dan tindakan</p>
      </div>
      <Suspense fallback={<StatsSkeleton />}>
        <ReportStats data={patients} />
      </Suspense>
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-32" />
      ))}
    </div>
  );
}
