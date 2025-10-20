import { z } from 'zod';

export const patientSchema = z.object({
  date: z.string().min(1, 'Tanggal harus diisi'),
  patientName: z.string().min(1, 'Nama pasien harus diisi'),
  medicalRecordNumber: z.string().min(1, 'Nomor rekam medis harus diisi'),
  gender: z.enum(['Laki-laki', 'Perempuan'], { required_error: 'Jenis kelamin harus dipilih' }),
  paymentType: z.enum(['BPJS', 'Umum'], { required_error: 'Jenis pembayaran harus dipilih' }),
  actions: z.array(z.string()).optional(),
  otherActions: z.string().optional(),
  description: z.string().optional(),
});

export type PatientFormData = z.infer<typeof patientSchema>;
