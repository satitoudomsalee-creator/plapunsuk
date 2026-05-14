# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Finora SME Finance OS** — a Next.js 15 finance dashboard for Thai SMEs that converts Excel reports into analytics. The UI language is Thai; financial figures are in Thai Baht (THB). The app is currently running on static/seeded data (`data/real-finance.ts`) while the Supabase/Prisma backend is wired but not yet connected to the UI.

## Commands

```bash
npm run dev              # Start dev server at http://localhost:3000
npm run build            # Production build
npm run lint             # ESLint via next lint
npm run prisma:generate  # Generate Prisma client after schema changes
npm run prisma:migrate   # Run migrations against Supabase Postgres
npm run prisma:studio    # Open Prisma Studio GUI
```

## Environment Setup

Copy `.env.example` to `.env.local` and fill in:
- `DATABASE_URL` — Supabase Postgres connection string
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — public anon key
- `SUPABASE_SERVICE_ROLE_KEY` — service role key (server-only)

## Architecture

### Data Flow (current state)
All pages import directly from `data/real-finance.ts` (static seeded records) and run pure functions from `lib/finance.ts` at render time — no API calls or database queries in the UI. The Prisma/Supabase layer exists in the schema but is not yet wired to pages.

### Key Layers

| Layer | Location | Purpose |
|-------|----------|---------|
| Pages | `app/<route>/page.tsx` | Server components; fetch/transform data, compose layout |
| Shell | `components/app-shell.tsx` | Sticky sidebar + top header; wraps all authenticated pages |
| Charts | `components/charts.tsx` | Recharts wrappers (RevenueTrend, ProfitLine, ExpensePie, MonthlyComparison) |
| Finance logic | `lib/finance.ts` | Pure functions: `summarizeTransactions`, `dailySeries`, `expenseBreakdown`, `monthlyReports`, `generateInsights` |
| Types | `lib/types.ts` | `TransactionRecord`, `MonthlyReport`, `Insight` |
| DB schema | `prisma/schema.prisma` | User → Transaction, ExpenseCategory, MonthlySummary, Report |
| Import API | `app/api/import/route.ts` | POST multipart Excel/CSV → returns parsed records + insights |
| Excel parser | `lib/excel-import.ts` | Detects columns in Thai/English, maps to `TransactionRecord[]` |

### Routing

```
/                 → redirects (unauthenticated entry)
/login            → auth
/register         → auth
/onboarding       → post-signup setup
/dashboard        → main KPI overview
/transactions     → paginated transaction list
/profit-loss      → P&L analytics
/analytics        → detailed charts
/monthly-reports  → monthly summaries + export actions
/cash-flow        → cash flow view
/settings         → file import + user settings
```

All authenticated pages wrap content in `<AppShell title="..." subtitle="...">`.

### Styling System

Dark-only glassmorphism theme. Key Tailwind design tokens:
- `mint` (#5EEAD4) — primary accent, active states
- `coral` (#FB7185) — expense/negative
- `gold` (#FBBF24) — profit/positive
- `skyglass` (#7DD3FC) — secondary accent
- `panel` — semi-transparent dark background for cards
- `.glass` CSS class — glassmorphism card style (defined in `globals.css`)
- `.soft-grid` — subtle grid overlay on page background
- `shadow-glow` — mint glow used on active nav items

Framer Motion is used for page-entry animations (`initial={{ opacity: 0, y: 8 }}`).

### Excel Import Format

The `/api/import` endpoint accepts `.xlsx`, `.xls`, or `.csv`. Column detection is fuzzy — matches Thai and English headers for: Date, Income/Revenue/Sales/รายรับ, Product cost/COGS/ต้นทุน, Expense/ค่าใช้จ่าย, Remaining balance/คงเหลือ. Missing balance column is calculated as `income - productCost - otherExpense`.
