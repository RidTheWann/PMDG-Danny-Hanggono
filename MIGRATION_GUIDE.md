# Migration Guide: v1 → v2

## 🎯 Overview
Aplikasi telah di-upgrade dari Next.js 14 ke Next.js 15 dengan React 19, Drizzle ORM, dan arsitektur modern.

## 📦 Dependencies Baru

### Core
- **Next.js 15** - Latest stable dengan PPR & React Compiler
- **React 19** - Latest dengan Server Components optimal
- **Drizzle ORM** - Type-safe database layer (menggantikan raw pg)
- **Biome.js** - Linting & formatting (menggantikan ESLint + Prettier)

### UI/UX
- **next-themes** - Dark mode support
- **sonner** - Toast notifications
- **@tanstack/react-table** - Advanced data tables
- **react-hook-form + zod** - Form validation

### Developer Tools
- **Vitest** - Unit testing
- **Playwright** - E2E testing
- **Drizzle Kit** - Database migrations

## 🔄 Breaking Changes

### 1. Database Layer
**Before (v1):**
```typescript
import { Pool } from 'pg';
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const result = await pool.query('SELECT * FROM data_entries');
```

**After (v2):**
```typescript
import { db } from '@/lib/db';
import { dataEntries } from '@/lib/db/schema';
const result = await db.select().from(dataEntries);
```

### 2. API Routes → Server Actions
**Before (v1):**
```typescript
// app/api/tambah-pasien/route.ts
export async function POST(request: Request) {
  const data = await request.json();
  // ...
}
```

**After (v2):**
```typescript
// lib/actions/patient.ts
'use server';
export async function createPatient(formData: FormData) {
  // ...
}
```

### 3. Client Components
**Before (v1):**
```typescript
'use client';
import { useState } from 'react';
```

**After (v2):**
- Gunakan Server Components by default
- Client Components hanya untuk interactivity
- Server Actions untuk mutations

### 4. Styling
**Before (v1):**
- Custom CSS dengan dark mode manual

**After (v2):**
- Tailwind dengan CSS variables
- next-themes untuk dark mode
- shadcn/ui components

## 📝 Migration Steps

### Step 1: Install Dependencies
```bash
npm install --legacy-peer-deps
```

### Step 2: Setup Environment
```bash
cp .env.example .env
# Edit .env dengan credentials Anda
```

### Step 3: Database Migration
```bash
npm run db:push
```

### Step 4: Run Development
```bash
npm run dev
```

### Step 5: Testing
```bash
npm run lint
npm run type-check
npm test
```

## 🗂️ Struktur Folder Baru

```
app/
├── _components/        # Shared components
│   ├── forms/
│   ├── tables/
│   └── ui/
├── tambah-pasien/     # Pages
├── data-pasien/
├── laporan/
└── cari-pasien/

lib/
├── db/                # Database
│   ├── schema.ts
│   └── index.ts
├── actions/           # Server Actions
├── validations/       # Zod schemas
├── env.ts            # Environment validation
└── utils.ts

components/
└── ui/               # shadcn components
```

## ⚠️ Important Notes

### Data Compatibility
- Database schema tetap sama
- Data existing tetap kompatibel
- Tidak perlu migrasi data

### Google Sheets
- Integration tetap berfungsi
- Perlu update API calls ke Server Actions

### Environment Variables
- Gunakan `lib/env.ts` untuk type-safe env
- Validasi otomatis dengan Zod

## 🚀 New Features

### 1. Server Actions
```typescript
import { createPatient } from '@/lib/actions/patient';

async function handleSubmit(formData: FormData) {
  await createPatient(formData);
}
```

### 2. Type-Safe Forms
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { patientSchema } from '@/lib/validations/patient';

const form = useForm({
  resolver: zodResolver(patientSchema),
});
```

### 3. Advanced Tables
```typescript
import { PatientTable } from '@/app/_components/tables/patient-table';

<PatientTable data={patients} />
// Includes: sorting, filtering, pagination
```

### 4. Toast Notifications
```typescript
import { toast } from 'sonner';

toast.success('Data berhasil disimpan!');
toast.error('Gagal menyimpan data');
```

## 🔧 Scripts Baru

```bash
# Linting & Formatting
npm run lint          # Check dengan Biome
npm run lint:fix      # Fix issues
npm run format        # Format code

# Database
npm run db:generate   # Generate migrations
npm run db:migrate    # Run migrations
npm run db:push       # Push schema
npm run db:studio     # Open Drizzle Studio

# Testing
npm test             # Run unit tests
npm run test:ui      # Test UI
npm run test:e2e     # E2E tests

# Build
npm run build        # Production build
npm run analyze      # Bundle analysis
```

## 📚 Resources

- [Next.js 15 Docs](https://nextjs.org/docs)
- [Drizzle ORM](https://orm.drizzle.team)
- [shadcn/ui](https://ui.shadcn.com)
- [Biome.js](https://biomejs.dev)

## 🆘 Troubleshooting

### Issue: Dependency conflicts
```bash
npm install --legacy-peer-deps
```

### Issue: Database connection
```bash
# Check DATABASE_URL in .env
# Test connection:
npm run db:studio
```

### Issue: Type errors
```bash
npm run type-check
```

## 📞 Support

Jika ada masalah, check:
1. Environment variables (.env)
2. Database connection
3. Node version (18+)
4. npm version (9+)
