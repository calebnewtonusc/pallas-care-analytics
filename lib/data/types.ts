export interface KPIMetric {
  label: string;
  value: string | number;
  formatted: string;
  change: number; // percentage change from prior period
  changeLabel: string;
  unit?: string;
  icon?: string;
}

export interface TimeSeriesPoint {
  period: string;
  value?: number;
  [key: string]: string | number | undefined;
}

export interface ServiceBreakdown {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export interface CaregiverProfile {
  id: string;
  name: string;
  tenure: number; // months
  clientLoad: number;
  rating: number;
  trainingCompletion: number;
  specialties: string[];
  zone: string;
}

export interface ClientProfile {
  id: string;
  age: number;
  careLevel: "Light" | "Moderate" | "Intensive";
  hoursPerWeek: number;
  tenure: number; // months
  zone: string;
  services: string[];
  satisfactionScore: number;
}

export interface GeographicZone {
  zone: string;
  clients: number;
  caregivers: number;
  revenueShare: number;
  avgRating: number;
}

export interface StrategicRecommendation {
  id: string;
  title: string;
  category: "Revenue" | "Operations" | "Workforce" | "Technology" | "Growth";
  priority: "Critical" | "High" | "Medium" | "Low";
  impact: number; // 1-10
  effort: number; // 1-10
  timeframe: "30 days" | "90 days" | "6 months" | "12 months";
  description: string;
  expectedOutcome: string;
  dataEvidence: string;
}
