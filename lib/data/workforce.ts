import type { TimeSeriesPoint } from "./types";

export const workforceKPIs = {
  activeCaregiversCount: 48,
  activeCaregiversChange: 8.5,
  retentionRate: 78.4,
  retentionRateChange: 4.2,
  industryAvgRetention: 65.0,
  avgTenure: 18.3,
  avgTenureChange: 6.1,
  trainingCompletion: 92.1,
  trainingCompletionChange: 3.4,
  avgClientLoad: 2.8,
  avgClientLoadChange: 0.2,
  caregiverSatisfaction: 4.4,
  caregiverSatisfactionChange: 0.3,
};

export const retentionTrend: TimeSeriesPoint[] = [
  { period: "Q1 '24", pallas: 68.2, industry: 63.0 },
  { period: "Q2 '24", pallas: 70.5, industry: 63.5 },
  { period: "Q3 '24", pallas: 72.1, industry: 64.0 },
  { period: "Q4 '24", pallas: 74.3, industry: 64.2 },
  { period: "Q1 '25", pallas: 75.8, industry: 64.5 },
  { period: "Q2 '25", pallas: 76.2, industry: 65.0 },
  { period: "Q3 '25", pallas: 77.4, industry: 65.2 },
  { period: "Q4 '25", pallas: 78.4, industry: 65.5 },
];

export const hiringSources = [
  { source: "Employee Referral", count: 18, percentage: 37.5, retentionRate: 91.2 },
  { source: "LinkedIn / Job Boards", count: 12, percentage: 25.0, retentionRate: 72.4 },
  { source: "Community Outreach", count: 9, percentage: 18.8, retentionRate: 80.1 },
  { source: "CNA Schools / Training Programs", count: 6, percentage: 12.5, retentionRate: 84.3 },
  { source: "Agency Transfer", count: 3, percentage: 6.3, retentionRate: 63.8 },
];

export const trainingModules = [
  { module: "Dementia & Alzheimer's Care", completion: 96, required: true, avgScore: 88 },
  { module: "Fall Prevention & Safety", completion: 100, required: true, avgScore: 91 },
  { module: "Medication Awareness", completion: 98, required: true, avgScore: 87 },
  { module: "Cultural Competency", completion: 89, required: true, avgScore: 84 },
  { module: "Communication & Emotional Support", completion: 85, required: false, avgScore: 90 },
  { module: "Nutrition & Meal Planning", completion: 82, required: false, avgScore: 86 },
  { module: "Personal Care Techniques", completion: 100, required: true, avgScore: 93 },
  { module: "HIPAA & Privacy", completion: 100, required: true, avgScore: 95 },
  { module: "Emergency Response", completion: 97, required: true, avgScore: 89 },
  { module: "Technology & Care Platforms", completion: 71, required: false, avgScore: 78 },
];

export const tenureBands = [
  { band: "0–3 months", count: 7, percentage: 14.6 },
  { band: "3–6 months", count: 6, percentage: 12.5 },
  { band: "6–12 months", count: 9, percentage: 18.8 },
  { band: "1–2 years", count: 12, percentage: 25.0 },
  { band: "2–3 years", count: 8, percentage: 16.7 },
  { band: "3+ years", count: 6, percentage: 12.5 },
];

export const caregiversByZone = [
  { zone: "West LA / Brentwood", count: 12, clientsServed: 18 },
  { zone: "Beverly Hills / Century City", count: 9, clientsServed: 14 },
  { zone: "Pasadena / San Marino", count: 8, clientsServed: 13 },
  { zone: "Santa Monica", count: 7, clientsServed: 11 },
  { zone: "Sherman Oaks / Encino", count: 7, clientsServed: 10 },
  { zone: "Manhattan Beach / Torrance", count: 5, clientsServed: 8 },
];

export const caregiverRatingDistribution = [
  { rating: "5.0", count: 8 },
  { rating: "4.5–4.9", count: 19 },
  { rating: "4.0–4.4", count: 14 },
  { rating: "3.5–3.9", count: 5 },
  { rating: "Below 3.5", count: 2 },
];

export const turnoverReasons = [
  { reason: "Better compensation elsewhere", percentage: 28 },
  { reason: "Personal / family reasons", percentage: 24 },
  { reason: "Geographic relocation", percentage: 18 },
  { reason: "Client/caregiver mismatch", percentage: 14 },
  { reason: "Career transition (nursing school)", percentage: 10 },
  { reason: "Unknown / no exit interview", percentage: 6 },
];
