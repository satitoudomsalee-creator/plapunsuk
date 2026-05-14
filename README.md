# Finora SME Finance OS

A premium Next.js 15 finance dashboard that converts daily Excel finance reports into a modern SaaS experience for small businesses, cafes, stores, agencies, freelancers, and SMEs.

## What Is Included

- Dark fintech dashboard with glass UI, responsive sidebar, animated KPI cards, and mobile-friendly layouts.
- Transaction management UI with search, category tags, pagination controls, and edit/delete actions.
- Profit and loss analytics for income, product cost, expenses, net profit, margin, and cash flow.
- Recharts visualizations for revenue trend, expense breakdown, profit line, monthly comparison, and cash flow.
- AI-like business insight engine based on financial trends and weekday performance.
- Monthly report page with PDF, Excel, and print actions ready to connect.
- Login, register, Google login entry point, and onboarding flow.
- Prisma schema for Supabase Postgres.
- Excel import API that auto-detects monthly sheets and maps finance columns into transaction records.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Database Setup

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local`.
3. Set `DATABASE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Run:

```bash
npm run prisma:generate
npm run prisma:migrate
```

## Excel Import

POST an Excel file to `/api/import` as multipart form data using the field name `file`.

The importer detects columns matching:

- Date
- Income / Revenue / Sales / รายรับ / ยอดขาย
- Product cost / Cost / COGS / ต้นทุน
- Other expense / Expense / ค่าใช้จ่าย
- Remaining balance / Profit / คงเหลือ / กำไร
- Notes / Description / หมายเหตุ

If no remaining balance column exists, it calculates:

```text
income - productCost - otherExpense
```

## Note About The Uploaded Workbook

No Excel workbook was present in this workspace during creation, so the app ships with realistic seeded Thai Baht finance data and a production-ready import pipeline. Add the workbook to the project folder or upload it through the app flow to replace the sample data.
