![Next.js](https://img.shields.io/badge/Next.js_16-black?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22B5BF?style=flat-square&logo=react&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-black?style=flat-square&logo=vercel&logoColor=white)

# Pallas Care Analytics Dashboard

A strategy-driven data analytics platform built by Kappa Theta Pi (USC) for **Pallas Care**, a premium, person-centered non-medical home care agency serving older adults in Los Angeles County. The dashboard surfaces financial visibility, workforce quality metrics, and operational insights benchmarked against LA County industry standards.

**Live:** [pallas-care-analytics.vercel.app](https://pallas-care-analytics.vercel.app) &nbsp;|&nbsp; **Client:** [pallas.care](https://www.pallas.care)

> Screenshot

## Features

- **Executive Overview** — Hero KPI cards (annual revenue, active clients, caregiver retention) with a composite performance scorecard across 5 business dimensions
- **Financial Analytics** — Monthly P&L trends, revenue-vs-target charts, cost structure breakdown, payor mix, and billing efficiency metrics
- **Workforce Quality** — Caregiver retention tracking, training pipeline, satisfaction trends, and comparison against industry benchmarks (PHI, NAHC)
- **Client Analytics** — Demographics, care level distribution, referral source attribution, and client lifetime value analysis
- **Operations** — Hours delivered, scheduling efficiency, geographic coverage across LA County
- **Strategic Insights** — Impact/effort matrix with 8 prioritized recommendations for scalable, high-touch care growth

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 with Pallas Care brand (`#5A378C`) |
| Charts | Recharts |
| UI Primitives | Radix UI |
| Icons | Lucide React |
| Deployment | Vercel |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects automatically to `/dashboard`.

```bash
npm run build   # Production build
npm start       # Production server
```

## Project Context

Built in partnership with Pallas Care to deliver actionable financial visibility and operational efficiency insights while preserving their high-touch, culturally competent care model. All metrics are calibrated to LA County premium non-medical home care industry benchmarks (PHI National Workforce Data, NAHC Industry Sourcebook, LA County DHS, CMS Data).

- Licensed HCO: `#194701168`
- Service area: Los Angeles County
- Engagement type: Data analytics, strategy consulting, technology recommendations
- KTP Chapter: USC — Spring 2026

> Data shown is illustrative and benchmarked against LA County industry averages (PHI, NAHC, LA DHS, Feb 2026).

## Author

**Caleb Newton** — [calebnewton.me](https://calebnewton.me)
