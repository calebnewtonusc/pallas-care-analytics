import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, compact = false): string {
  if (compact && value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (compact && value >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatNumber(value: number, compact = false): string {
  if (compact && value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatHours(hours: number): string {
  return `${formatNumber(hours)}h`;
}

export function getChangeClass(change: number): string {
  if (change > 0) return "text-emerald-600";
  if (change < 0) return "text-red-500";
  return "text-gray-500";
}

export function getChangePrefix(change: number): string {
  return change > 0 ? "+" : "";
}
