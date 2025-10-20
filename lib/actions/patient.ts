'use server';

import { db } from '@/lib/db';
import { dataEntries } from '@/lib/db/schema';
import { patientSchema } from '@/lib/validations/patient';
import { revalidatePath } from 'next/cache';
import { eq, desc, or, ilike } from 'drizzle-orm';

export async function createPatient(formData: FormData) {
  const data = {
    date: formData.get('date') as string,
    patientName: formData.get('patientName') as string,
    medicalRecordNumber: formData.get('medicalRecordNumber') as string,
    gender: formData.get('gender') as string,
    paymentType: formData.get('paymentType') as string,
    actions: formData.get('actions') ? JSON.parse(formData.get('actions') as string) : null,
    otherActions: formData.get('otherActions') as string,
    description: formData.get('description') as string,
  };

  const validated = patientSchema.parse(data);

  await db.insert(dataEntries).values({
    date: validated.date,
    patientName: validated.patientName,
    medicalRecordNumber: validated.medicalRecordNumber,
    gender: validated.gender,
    paymentType: validated.paymentType,
    actions: validated.actions,
    otherActions: validated.otherActions,
    description: validated.description,
  });

  revalidatePath('/data-pasien');
  return { success: true };
}

export async function getPatients() {
  return await db.select().from(dataEntries).orderBy(desc(dataEntries.date));
}

export async function getPatientById(id: number) {
  const [patient] = await db.select().from(dataEntries).where(eq(dataEntries.id, id));
  return patient;
}

export async function updatePatient(id: number, formData: FormData) {
  const data = {
    date: formData.get('date') as string,
    patientName: formData.get('patientName') as string,
    medicalRecordNumber: formData.get('medicalRecordNumber') as string,
    gender: formData.get('gender') as string,
    paymentType: formData.get('paymentType') as string,
    actions: formData.get('actions') ? JSON.parse(formData.get('actions') as string) : null,
    otherActions: formData.get('otherActions') as string,
    description: formData.get('description') as string,
  };

  const validated = patientSchema.parse(data);

  await db.update(dataEntries).set(validated).where(eq(dataEntries.id, id));

  revalidatePath('/data-pasien');
  return { success: true };
}

export async function deletePatient(id: number) {
  await db.delete(dataEntries).where(eq(dataEntries.id, id));
  revalidatePath('/data-pasien');
  return { success: true };
}

export async function searchPatients(query: string) {
  return await db
    .select()
    .from(dataEntries)
    .where(
      or(
        ilike(dataEntries.patientName, `%${query}%`),
        ilike(dataEntries.medicalRecordNumber, `%${query}%`)
      )
    )
    .orderBy(desc(dataEntries.date));
}
