import { Suspense } from 'react';
import { getPatients } from '@/lib/actions/patient';
import { PatientTable } from '@/app/_components/tables/patient-table';
import { Skeleton } from '@/components/ui/skeleton';

export default async function DataPasienPage() {
  const patients = await getPatients();

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Data Pasien</h1>
        <p className="text-muted-foreground">Kelola dan lihat data pasien</p>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <PatientTable data={patients} />
      </Suspense>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-96 w-full" />
    </div>
  );
}
