import { pgTable, serial, varchar, date, text, jsonb, timestamp } from 'drizzle-orm/pg-core';

export const dataEntries = pgTable('data_entries', {
  id: serial('id').primaryKey(),
  date: date('date').notNull(),
  patientName: varchar('patient_name', { length: 255 }).notNull(),
  medicalRecordNumber: varchar('medical_record_number', { length: 50 }).notNull(),
  gender: varchar('gender', { length: 20 }).notNull(),
  paymentType: varchar('payment_type', { length: 20 }).notNull(),
  actions: jsonb('actions'),
  otherActions: text('other_actions'),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
});

export type DataEntry = typeof dataEntries.$inferSelect;
export type NewDataEntry = typeof dataEntries.$inferInsert;
