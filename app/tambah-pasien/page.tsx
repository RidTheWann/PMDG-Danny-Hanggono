import { PatientForm } from '@/app/_components/forms/patient-form';

export default function TambahPasienPage() {
  return (
    <div className="container max-w-4xl py-8">
      <div className="rounded-lg border bg-card shadow-sm">
        <div className="border-b bg-muted/50 p-6">
          <h1 className="text-2xl font-bold">Input Data Harian</h1>
          <p className="text-sm text-muted-foreground">Catat tindakan medis dan rujukan hari ini</p>
        </div>
        <div className="p-6">
          <PatientForm />
        </div>
      </div>
    </div>
  );
}
