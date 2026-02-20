import type { KPIMetric, TimeSeriesPoint } from "./types";

export const executiveKPIs: KPIMetric[] = [
  {
    label: "Annual Revenue",
    value: 2847000,
    formatted: "$2.85M",
    change: 18.3,
    changeLabel: "vs. prior year",
    unit: "USD",
  },
  {
    label: "Active Clients",
    value: 74,
    formatted: "74",
    change: 12.1,
    changeLabel: "vs. prior quarter",
  },
  {
    label: "Active Caregivers",
    value: 48,
    formatted: "48",
    change: 8.5,
    changeLabel: "vs. prior quarter",
  },
  {
    label: "Caregiver Retention",
    value: 78.4,
    formatted: "78.4%",
    change: 4.2,
    changeLabel: "vs. prior year",
    unit: "%",
  },
  {
    label: "Client Satisfaction",
    value: 4.71,
    formatted: "4.71 / 5",
    change: 2.8,
    changeLabel: "vs. prior quarter",
  },
  {
    label: "Hours Delivered (MTD)",
    value: 5840,
    formatted: "5,840h",
    change: 9.6,
    changeLabel: "vs. prior month",
    unit: "hours",
  },
  {
    label: "Avg Revenue / Client",
    value: 38472,
    formatted: "$38.5K",
    change: 5.4,
    changeLabel: "annualized",
    unit: "USD",
  },
  {
    label: "Referral Rate",
    value: 34,
    formatted: "34%",
    change: 7.1,
    changeLabel: "of new clients",
    unit: "%",
  },
];

export const revenueTimeSeries: TimeSeriesPoint[] = [
  { period: "Mar '25", value: 198000, target: 185000 },
  { period: "Apr '25", value: 212000, target: 195000 },
  { period: "May '25", value: 225000, target: 205000 },
  { period: "Jun '25", value: 231000, target: 215000 },
  { period: "Jul '25", value: 218000, target: 220000 },
  { period: "Aug '25", value: 244000, target: 228000 },
  { period: "Sep '25", value: 256000, target: 235000 },
  { period: "Oct '25", value: 263000, target: 242000 },
  { period: "Nov '25", value: 248000, target: 248000 },
  { period: "Dec '25", value: 271000, target: 255000 },
  { period: "Jan '26", value: 284000, target: 262000 },
  { period: "Feb '26", value: 237000, target: 268000 },
];

export const clientGrowthSeries: TimeSeriesPoint[] = [
  { period: "Mar '25", value: 54 },
  { period: "Apr '25", value: 57 },
  { period: "May '25", value: 59 },
  { period: "Jun '25", value: 62 },
  { period: "Jul '25", value: 61 },
  { period: "Aug '25", value: 65 },
  { period: "Sep '25", value: 68 },
  { period: "Oct '25", value: 70 },
  { period: "Nov '25", value: 69 },
  { period: "Dec '25", value: 72 },
  { period: "Jan '26", value: 74 },
  { period: "Feb '26", value: 74 },
];

export const satisfactionTrend: TimeSeriesPoint[] = [
  { period: "Q1 '25", value: 4.52, benchmark: 4.1 },
  { period: "Q2 '25", value: 4.61, benchmark: 4.1 },
  { period: "Q3 '25", value: 4.65, benchmark: 4.2 },
  { period: "Q4 '25", value: 4.68, benchmark: 4.2 },
  { period: "Q1 '26", value: 4.71, benchmark: 4.2 },
];

export const scorecard = {
  financialHealth: 82,
  workforceQuality: 88,
  clientOutcomes: 91,
  operationalEfficiency: 74,
  growthTrajectory: 87,
};
