import type { TimeSeriesPoint, GeographicZone } from "./types";

export const clientKPIs = {
  activeClients: 74,
  activeClientsChange: 12.1,
  avgAge: 78.4,
  avgHoursPerWeek: 21.6,
  avgHoursChange: 4.2,
  avgTenureMonths: 14.2,
  avgTenureChange: 8.7,
  satisfactionScore: 4.71,
  satisfactionChange: 2.8,
  netPromoterScore: 72,
  netPromoterChange: 6,
  churnRate: 4.1,
  churnRateChange: -1.3,
};

export const ageDistribution = [
  { range: "65–70", count: 8, percentage: 10.8 },
  { range: "71–75", count: 14, percentage: 18.9 },
  { range: "76–80", count: 19, percentage: 25.7 },
  { range: "81–85", count: 17, percentage: 23.0 },
  { range: "86–90", count: 11, percentage: 14.9 },
  { range: "90+", count: 5, percentage: 6.8 },
];

export const careLevel = [
  { level: "Light (1–14h/week)", count: 22, percentage: 29.7, avgRevenue: 22400 },
  { level: "Moderate (15–28h/week)", count: 34, percentage: 45.9, avgRevenue: 38800 },
  { level: "Intensive (29–56h/week)", count: 14, percentage: 18.9, avgRevenue: 62400 },
  { level: "Live-In / 24-hour", count: 4, percentage: 5.4, avgRevenue: 142000 },
];

export const geographicZones: GeographicZone[] = [
  { zone: "West LA / Brentwood", clients: 18, caregivers: 12, revenueShare: 24.3, avgRating: 4.78 },
  { zone: "Beverly Hills / Century City", clients: 14, caregivers: 9, revenueShare: 18.9, avgRating: 4.82 },
  { zone: "Pasadena / San Marino", clients: 13, caregivers: 8, revenueShare: 17.6, avgRating: 4.69 },
  { zone: "Santa Monica", clients: 11, caregivers: 7, revenueShare: 14.9, avgRating: 4.74 },
  { zone: "Sherman Oaks / Encino", clients: 10, caregivers: 7, revenueShare: 13.5, avgRating: 4.61 },
  { zone: "Manhattan Beach / Torrance", clients: 8, caregivers: 5, revenueShare: 10.8, avgRating: 4.68 },
];

export const referralSources = [
  { source: "Word of Mouth / Family Referral", count: 25, percentage: 33.8, conversionDays: 8 },
  { source: "Discharge Planner / Social Worker", count: 16, percentage: 21.6, conversionDays: 5 },
  { source: "Physician Recommendation", count: 13, percentage: 17.6, conversionDays: 6 },
  { source: "Online Search / Website", count: 10, percentage: 13.5, conversionDays: 14 },
  { source: "Senior Living Community", count: 6, percentage: 8.1, conversionDays: 7 },
  { source: "Long-Term Care Insurance Broker", count: 4, percentage: 5.4, conversionDays: 12 },
];

export const tenureRetention: TimeSeriesPoint[] = [
  { period: "Month 1", retained: 100 },
  { period: "Month 3", retained: 94 },
  { period: "Month 6", retained: 88 },
  { period: "Month 9", retained: 83 },
  { period: "Month 12", retained: 79 },
  { period: "Month 18", retained: 74 },
  { period: "Month 24", retained: 69 },
  { period: "Month 30", retained: 65 },
  { period: "Month 36", retained: 61 },
];

export const satisfactionByCategory = [
  { category: "Caregiver Quality", score: 4.81 },
  { category: "Consistency of Care", score: 4.72 },
  { category: "Communication & Responsiveness", score: 4.68 },
  { category: "Care Plan Personalization", score: 4.74 },
  { category: "Billing & Transparency", score: 4.44 },
  { category: "Scheduling Flexibility", score: 4.61 },
  { category: "Overall Value", score: 4.69 },
];

export const diagnosesServed = [
  { diagnosis: "Cognitive Decline / Dementia", count: 28, percentage: 37.8 },
  { diagnosis: "Post-Surgical Recovery", count: 16, percentage: 21.6 },
  { diagnosis: "Mobility Limitation / Fall Risk", count: 24, percentage: 32.4 },
  { diagnosis: "Chronic Disease Management", count: 19, percentage: 25.7 },
  { diagnosis: "Parkinson's Disease", count: 8, percentage: 10.8 },
  { diagnosis: "Stroke Recovery", count: 6, percentage: 8.1 },
];
