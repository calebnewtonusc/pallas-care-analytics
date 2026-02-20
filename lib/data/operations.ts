import type { TimeSeriesPoint } from "./types";

export const operationsKPIs = {
  hoursDeliveredMTD: 5840,
  hoursDeliveredChange: 9.6,
  schedulingFulfillmentRate: 97.2,
  schedulingFulfillmentChange: 1.4,
  avgCalloutRate: 2.8,
  calloutRateChange: -0.9,
  avgResponseTime: 3.4,
  avgResponseTimeUnit: "hours",
  responseTimeChange: -0.8,
  techAdoptionRate: 71,
  techAdoptionChange: 8.0,
  incidentRate: 0.41,
  incidentRateChange: -0.18,
};

export const hoursDeliveredMonthly: TimeSeriesPoint[] = [
  { period: "Mar '25", hours: 4320, target: 4200 },
  { period: "Apr '25", hours: 4480, target: 4350 },
  { period: "May '25", hours: 4720, target: 4500 },
  { period: "Jun '25", hours: 4890, target: 4650 },
  { period: "Jul '25", hours: 4610, target: 4700 },
  { period: "Aug '25", hours: 5050, target: 4850 },
  { period: "Sep '25", hours: 5280, target: 5000 },
  { period: "Oct '25", hours: 5420, target: 5150 },
  { period: "Nov '25", hours: 5190, target: 5200 },
  { period: "Dec '25", hours: 5650, target: 5350 },
  { period: "Jan '26", hours: 5930, target: 5500 },
  { period: "Feb '26", hours: 5840, target: 5640 },
];

export const schedulingEfficiency: TimeSeriesPoint[] = [
  { period: "Mar '25", fulfillment: 94.1, callouts: 5.1 },
  { period: "Apr '25", fulfillment: 94.8, callouts: 4.8 },
  { period: "May '25", fulfillment: 95.2, callouts: 4.4 },
  { period: "Jun '25", fulfillment: 95.9, callouts: 4.2 },
  { period: "Jul '25", fulfillment: 95.6, callouts: 4.6 },
  { period: "Aug '25", fulfillment: 96.1, callouts: 3.9 },
  { period: "Sep '25", fulfillment: 96.4, callouts: 3.7 },
  { period: "Oct '25", fulfillment: 96.8, callouts: 3.4 },
  { period: "Nov '25", fulfillment: 96.7, callouts: 3.5 },
  { period: "Dec '25", fulfillment: 97.0, callouts: 3.1 },
  { period: "Jan '26", fulfillment: 97.2, callouts: 2.8 },
  { period: "Feb '26", fulfillment: 97.2, callouts: 2.8 },
];

export const incidentTracking: TimeSeriesPoint[] = [
  { period: "Q1 '25", incidents: 8, falls: 3, medication: 2, other: 3 },
  { period: "Q2 '25", incidents: 7, falls: 2, medication: 2, other: 3 },
  { period: "Q3 '25", incidents: 6, falls: 2, medication: 1, other: 3 },
  { period: "Q4 '25", incidents: 5, falls: 2, medication: 1, other: 2 },
  { period: "Q1 '26", incidents: 3, falls: 1, medication: 1, other: 1 },
];

export const zoneOperations = [
  {
    zone: "West LA / Brentwood",
    clients: 18,
    caregivers: 12,
    weeklyHours: 389,
    fulfillmentRate: 97.8,
    avgResponseTime: 2.9,
    incidents: 0,
  },
  {
    zone: "Beverly Hills / Century City",
    clients: 14,
    caregivers: 9,
    weeklyHours: 308,
    fulfillmentRate: 98.2,
    avgResponseTime: 2.7,
    incidents: 0,
  },
  {
    zone: "Pasadena / San Marino",
    clients: 13,
    caregivers: 8,
    weeklyHours: 272,
    fulfillmentRate: 97.1,
    avgResponseTime: 3.6,
    incidents: 1,
  },
  {
    zone: "Santa Monica",
    clients: 11,
    caregivers: 7,
    weeklyHours: 241,
    fulfillmentRate: 96.9,
    avgResponseTime: 3.1,
    incidents: 0,
  },
  {
    zone: "Sherman Oaks / Encino",
    clients: 10,
    caregivers: 7,
    weeklyHours: 214,
    fulfillmentRate: 96.4,
    avgResponseTime: 3.8,
    incidents: 1,
  },
  {
    zone: "Manhattan Beach / Torrance",
    clients: 8,
    caregivers: 5,
    weeklyHours: 176,
    fulfillmentRate: 95.8,
    avgResponseTime: 4.2,
    incidents: 1,
  },
];

export const techStack = [
  { tool: "Scheduling Platform", adopted: 92, category: "Core Operations" },
  { tool: "Mobile Caregiver App", adopted: 71, category: "Field Operations" },
  { tool: "Electronic Care Notes", adopted: 88, category: "Documentation" },
  { tool: "Family Communication Portal", adopted: 45, category: "Client Engagement" },
  { tool: "Billing / Invoicing System", adopted: 96, category: "Finance" },
  { tool: "Training / LMS Platform", adopted: 83, category: "HR & Development" },
];
