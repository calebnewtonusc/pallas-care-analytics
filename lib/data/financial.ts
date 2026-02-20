import type { TimeSeriesPoint, ServiceBreakdown } from "./types";

export const revenueByService: ServiceBreakdown[] = [
  { name: "Personal Care", value: 1281150, percentage: 45.0, color: "#5A378C" },
  { name: "Care Management", value: 711750, percentage: 25.0, color: "#9965d4" },
  { name: "Domestic Help", value: 569400, percentage: 20.0, color: "#b894e3" },
  { name: "Companionship", value: 284700, percentage: 10.0, color: "#d6c2ef" },
];

export const monthlyPnL: TimeSeriesPoint[] = [
  { period: "Mar '25", revenue: 198000, cogs: 118800, grossProfit: 79200, opex: 44000, netIncome: 35200 },
  { period: "Apr '25", revenue: 212000, cogs: 127200, grossProfit: 84800, opex: 45500, netIncome: 39300 },
  { period: "May '25", revenue: 225000, cogs: 135000, grossProfit: 90000, opex: 46200, netIncome: 43800 },
  { period: "Jun '25", revenue: 231000, cogs: 138600, grossProfit: 92400, opex: 47000, netIncome: 45400 },
  { period: "Jul '25", revenue: 218000, cogs: 130800, grossProfit: 87200, opex: 46800, netIncome: 40400 },
  { period: "Aug '25", revenue: 244000, cogs: 146400, grossProfit: 97600, opex: 47500, netIncome: 50100 },
  { period: "Sep '25", revenue: 256000, cogs: 153600, grossProfit: 102400, opex: 48200, netIncome: 54200 },
  { period: "Oct '25", revenue: 263000, cogs: 157800, grossProfit: 105200, opex: 48800, netIncome: 56400 },
  { period: "Nov '25", revenue: 248000, cogs: 148800, grossProfit: 99200, opex: 49100, netIncome: 50100 },
  { period: "Dec '25", revenue: 271000, cogs: 162600, grossProfit: 108400, opex: 51000, netIncome: 57400 },
  { period: "Jan '26", revenue: 284000, cogs: 170400, grossProfit: 113600, opex: 52000, netIncome: 61600 },
  { period: "Feb '26", revenue: 237000, cogs: 142200, grossProfit: 94800, opex: 51500, netIncome: 43300 },
];

export const costStructure = [
  { category: "Caregiver Wages", amount: 1185000, percentage: 60.0, yoy: 14.2 },
  { category: "Payroll Taxes & Benefits", amount: 237000, percentage: 12.0, yoy: 15.1 },
  { category: "Training & Development", amount: 59000, percentage: 3.0, yoy: 22.4 },
  { category: "Care Management Overhead", amount: 99000, percentage: 5.0, yoy: 11.8 },
  { category: "Admin & Operations", amount: 158000, percentage: 8.0, yoy: 9.3 },
  { category: "Marketing & Referral", amount: 79000, percentage: 4.0, yoy: 28.6 },
  { category: "Technology & Tools", amount: 40000, percentage: 2.0, yoy: 42.0 },
  { category: "Other", amount: 79000, percentage: 4.0, yoy: 5.2 },
  { category: "Insurance & Compliance", amount: 39000, percentage: 2.0, yoy: 7.5 },
];

export const billingRates = [
  { service: "Personal Care (Standard)", rate: 40, hours: 14820, revenue: 592800 },
  { service: "Personal Care (Specialized)", rate: 52, hours: 13248, revenue: 688896 },
  { service: "Care Management", rate: 95, hours: 7492, revenue: 711740 },
  { service: "Domestic Help", rate: 35, hours: 16268, revenue: 569380 },
  { service: "Companionship", rate: 38, hours: 7493, revenue: 284734 },
];

export const payorMix = [
  { payor: "Private Pay (Direct)", percentage: 68, revenue: 1935960 },
  { payor: "Long-Term Care Insurance", percentage: 22, revenue: 626340 },
  { payor: "Veterans Benefits (Aid & Attendance)", percentage: 6, revenue: 170820 },
  { payor: "Trust / Estate Management", percentage: 4, revenue: 113880 },
];

export const financialKPIs = {
  grossMargin: 40.0,
  grossMarginChange: 1.2,
  netMargin: 19.4,
  netMarginChange: 2.1,
  revenuePerHour: 41.8,
  revenuePerHourChange: 3.6,
  clientLifetimeValue: 56200,
  clientLifetimeValueChange: 8.4,
  clientAcquisitionCost: 1850,
  clientAcquisitionCostChange: -4.2,
  arDaysSales: 18,
  arDaysSalesChange: -2,
};
