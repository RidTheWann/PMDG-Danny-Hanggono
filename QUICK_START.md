# 🚀 Quick Start Guide - v2.0

## ⚡ 5-Minute Setup

### Step 1: Install Dependencies (1 min)
```bash
npm install --legacy-peer-deps
```

### Step 2: Setup Environment (1 min)
```bash
# Copy example file
cp .env.example .env

# Edit .env and add your DATABASE_URL
# Example: postgresql://user:pass@host:5432/db?sslmode=require
```

### Step 3: Setup Database (1 min)
```bash
# Push schema to database
npm run db:push

# Optional: Open Drizzle Studio to verify
npm run db:studio
```

### Step 4: Run Development Server (1 min)
```bash
npm run dev
```

### Step 5: Open Browser (1 min)
```
http://localhost:3000
```

## ✅ Verification Checklist

After setup, verify:
- [ ] Homepage loads
- [ ] Dark mode toggle works
- [ ] Can navigate to all pages
- [ ] Can add new patient
- [ ] Can view patient data
- [ ] Can search patients

## 🎯 First Steps

### 1. Add Your First Patient
1. Go to "Data Harian" page
2. Fill in patient information
3. Select treatments
4. Click "Simpan Data"
5. See toast notification

### 2. View Dashboard
1. Go to "Dashboard" page
2. See patient table
3. Try sorting columns
4. Try searching
5. Try pagination

### 3. Check Reports
1. Go to "Arship Tugas" page
2. See statistics cards
3. View patient counts

## 🔧 Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm start               # Start production server

# Code Quality
npm run lint            # Check code
npm run lint:fix        # Fix issues
npm run format          # Format code
npm run type-check      # Check types

# Database
npm run db:push         # Push schema
npm run db:studio       # Open studio
npm run db:generate     # Generate migrations

# Testing
npm test               # Run tests
npm run test:e2e       # E2E tests
```

## 📝 Environment Variables

### Required
```env
DATABASE_URL=postgresql://...
```

### Optional
```env
# Google Sheets Integration
GOOGLE_SHEETS_URL=https://...
SPREADSHEET_ID=...
GOOGLE_CREDENTIALS={"type":"service_account",...}

# Rate Limiting (Upstash Redis)
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

## 🎨 Features Overview

### ✅ Available Now
- Patient data management
- Search & filtering
- Statistics & reports
- Dark mode
- Mobile responsive
- Toast notifications

### 🚧 Coming Soon
- Export to PDF/Excel
- Bulk operations
- Advanced filtering
- Patient history
- Appointment scheduling

## 🐛 Troubleshooting

### Issue: npm install fails
```bash
npm install --legacy-peer-deps
```

### Issue: Database connection error
1. Check `.env` file exists
2. Verify `DATABASE_URL` is correct
3. Test connection: `npm run db:studio`

### Issue: Page not loading
1. Clear cache: `rm -rf .next`
2. Rebuild: `npm run build`
3. Restart: `npm run dev`

### Issue: Type errors
```bash
npm run type-check
```

## 📚 Learn More

- [Full Documentation](./README_V2.md)
- [Migration Guide](./MIGRATION_GUIDE.md)
- [Upgrade Summary](./UPGRADE_SUMMARY.md)

## 🆘 Need Help?

1. Check documentation
2. Run `npm run type-check`
3. Check browser console
4. Review error messages

## 🎉 You're Ready!

Your application is now running with:
- ✅ Next.js 15
- ✅ React 19
- ✅ Drizzle ORM
- ✅ Modern UI
- ✅ Type Safety
- ✅ Dark Mode

Start building amazing features! 🚀
