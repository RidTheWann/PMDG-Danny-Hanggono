# Deployment Fix

## Issues Fixed

### 1. Database Schema
- ✅ Removed `created_at` column from schema (not in existing DB)
- ✅ Schema now matches production database

### 2. ESLint
- ✅ Added eslint and eslint-config-next to devDependencies
- ✅ Created .eslintrc.json for Next.js build

### 3. Vercel Ignore
- ✅ Created proper .vercelignore file

## Commit & Deploy

```bash
git add .
git commit -m "fix: database schema and build configuration"
git push origin main
```

Vercel will auto-deploy after push.

## Environment Variables on Vercel

Make sure these are set in Vercel dashboard:

```
DATABASE_URL=postgresql://...
NODE_ENV=production
```

Optional:
```
GOOGLE_SHEETS_URL=...
SPREADSHEET_ID=...
GOOGLE_CREDENTIALS=...
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```
