'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { patientSchema, type PatientFormData } from '@/lib/validations/patient';
import { createPatient } from '@/lib/actions/patient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useState } from 'react';

const treatments = [
  { id: 'obat', label: 'Obat' },
  { id: 'cabut_anak', label: 'Cabut Anak' },
  { id: 'cabut_dewasa', label: 'Cabut Dewasa' },
  { id: 'tambal_sementara', label: 'Tambal Sementara' },
  { id: 'tambal_tetap', label: 'Tambal Tetap' },
  { id: 'scaling', label: 'Scaling' },
  { id: 'rujuk', label: 'Rujuk' },
];

export function PatientForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      actions: [],
    },
  });

  const selectedActions = watch('actions') || [];

  const onSubmit = async (data: PatientFormData) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('date', data.date);
      formData.append('patientName', data.patientName);
      formData.append('medicalRecordNumber', data.medicalRecordNumber);
      formData.append('gender', data.gender);
      formData.append('paymentType', data.paymentType);
      if (data.actions) formData.append('actions', JSON.stringify(data.actions));
      if (data.otherActions) formData.append('otherActions', data.otherActions);
      if (data.description) formData.append('description', data.description);

      await createPatient(formData);
      toast.success('Data pasien berhasil disimpan!');
      reset({ date: new Date().toISOString().split('T')[0], actions: [] });
    } catch (error) {
      toast.error('Gagal menyimpan data. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="date">Tanggal</Label>
          <Input type="date" id="date" {...register('date')} />
          {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="medicalRecordNumber">No. RM</Label>
          <Input id="medicalRecordNumber" placeholder="00.00.00" {...register('medicalRecordNumber')} />
          {errors.medicalRecordNumber && (
            <p className="text-sm text-destructive">{errors.medicalRecordNumber.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="patientName">Nama Pasien</Label>
        <Input id="patientName" placeholder="Nama lengkap pasien" {...register('patientName')} />
        {errors.patientName && <p className="text-sm text-destructive">{errors.patientName.message}</p>}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="gender">Jenis Kelamin</Label>
          <select
            id="gender"
            {...register('gender')}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Pilih</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
          {errors.gender && <p className="text-sm text-destructive">{errors.gender.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="paymentType">Jenis Pembayaran</Label>
          <select
            id="paymentType"
            {...register('paymentType')}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Pilih</option>
            <option value="BPJS">BPJS</option>
            <option value="Umum">Umum</option>
          </select>
          {errors.paymentType && <p className="text-sm text-destructive">{errors.paymentType.message}</p>}
        </div>
      </div>

      <div className="space-y-3">
        <Label>Tindakan</Label>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {treatments.map((treatment) => (
            <div key={treatment.id} className="flex items-center space-x-2">
              <Checkbox
                id={treatment.id}
                checked={selectedActions.includes(treatment.id)}
                onCheckedChange={(checked) => {
                  const newActions = checked
                    ? [...selectedActions, treatment.id]
                    : selectedActions.filter((a) => a !== treatment.id);
                  setValue('actions', newActions);
                }}
              />
              <Label htmlFor={treatment.id} className="text-sm font-normal cursor-pointer">
                {treatment.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="otherActions">Tindakan Lainnya</Label>
        <Textarea id="otherActions" placeholder="Tindakan lain..." {...register('otherActions')} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Keterangan</Label>
        <Textarea id="description" placeholder="Keterangan tambahan..." {...register('description')} />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Menyimpan...' : 'Simpan Data'}
      </Button>
    </form>
  );
}
