import {
  clientKPIs,
  ageDistribution,
  careLevel,
  geographicZones,
  referralSources,
  tenureRetention,
  satisfactionByCategory,
} from "@/lib/data/clients";
import { Card, CardHeader, CardContent, CardTitle, CardSubtitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KPICard } from "@/components/kpi/KPICard";
import { RetentionCurve } from "@/components/charts/RetentionCurve";
import { formatCurrency, formatPercent } from "@/lib/utils";
import type { KPIMetric } from "@/lib/data/types";
import { Users, Star, Clock, TrendingDown } from "lucide-react";

// ─── Care level color palette ───────────────────────────────────────────────
const careLevelColors: Record<string, string> = {
  "Light (1–14h/week)": "#d6c2ef",
  "Moderate (15–28h/week)": "#a87dd4",
  "Intensive (29–56h/week)": "#5A378C",
  "Live-In / 24-hour": "#2d1a4a",
};

// ─── Conversion speed badge ──────────────────────────────────────────────────
function conversionBadge(days: number) {
  if (days <= 6) return { label: "Fast", variant: "success" as const };
  if (days <= 10) return { label: "Moderate", variant: "warning" as const };
  return { label: "Slow", variant: "danger" as const };
}

// ─── KPI definitions ─────────────────────────────────────────────────────────
const kpiMetrics: KPIMetric[] = [
  {
    label: "Active Clients",
    value: clientKPIs.activeClients,
    formatted: String(clientKPIs.activeClients),
    change: clientKPIs.activeClientsChange,
    changeLabel: "vs. prior quarter",
  },
  {
    label: "Net Promoter Score",
    value: clientKPIs.netPromoterScore,
    formatted: String(clientKPIs.netPromoterScore),
    change: clientKPIs.netPromoterChange,
    changeLabel: "vs. prior quarter",
  },
  {
    label: "Avg. Client Tenure",
    value: clientKPIs.avgTenureMonths,
    formatted: `${clientKPIs.avgTenureMonths} mo.`,
    change: clientKPIs.avgTenureChange,
    changeLabel: "vs. prior quarter",
  },
  {
    label: "Monthly Churn Rate",
    value: clientKPIs.churnRate,
    formatted: formatPercent(clientKPIs.churnRate),
    change: clientKPIs.churnRateChange,
    changeLabel: "vs. prior quarter",
  },
];

export default function ClientsPage() {
  const maxSatisfactionScore = 5;

  return (
    <div className="space-y-6">

      {/* ── ROW 1: KPI Cards ─────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiMetrics.map((metric) => (
          <KPICard key={metric.label} metric={metric} />
        ))}
      </div>

      {/* ── ROW 2: Care Level + Satisfaction ─────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Care Level Breakdown */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Care Level Distribution</CardTitle>
            <CardSubtitle>Client mix by hours per week &middot; avg. annual revenue per level</CardSubtitle>
          </CardHeader>
          <CardContent className="pt-2 space-y-3">
            {careLevel.map((item) => {
              const color = careLevelColors[item.level] ?? "#5A378C";
              return (
                <div key={item.level} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-sm text-[#16121e] font-medium truncate">{item.level}</span>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                      <span className="text-xs text-[#9b92a8]">{item.count} clients</span>
                      <span className="text-xs font-semibold text-[#5A378C] w-10 text-right">
                        {formatPercent(item.percentage, 0)}
                      </span>
                    </div>
                  </div>
                  {/* Bar */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-[#f5f0fb] rounded-full h-2 overflow-hidden">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%`, backgroundColor: color }}
                      />
                    </div>
                    <span className="text-xs text-[#6b6378] w-24 text-right flex-shrink-0">
                      {formatCurrency(item.avgRevenue, true)}/yr avg
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Summary strip */}
            <div className="mt-4 pt-3 border-t border-[#f0ebfa] flex justify-between items-center">
              <span className="text-xs text-[#9b92a8]">Weighted avg. hours/week</span>
              <span className="text-sm font-semibold text-[#16121e]">
                {clientKPIs.avgHoursPerWeek}h
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Satisfaction by Category */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Satisfaction by Category</CardTitle>
            <CardSubtitle>
              Client-reported scores &middot; scale 1–5 &middot; overall{" "}
              <span className="font-semibold text-[#5A378C]">{clientKPIs.satisfactionScore}</span>
            </CardSubtitle>
          </CardHeader>
          <CardContent className="pt-2 space-y-2.5">
            {satisfactionByCategory
              .slice()
              .sort((a, b) => b.score - a.score)
              .map((item) => {
                const pct = (item.score / maxSatisfactionScore) * 100;
                const isTop = item.score >= 4.75;
                const isLow = item.score < 4.5;
                return (
                  <div key={item.category} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#4a3f5c]">{item.category}</span>
                      <span
                        className={`text-xs font-semibold tabular-nums ${
                          isTop
                            ? "text-emerald-600"
                            : isLow
                            ? "text-amber-600"
                            : "text-[#16121e]"
                        }`}
                      >
                        {item.score.toFixed(2)}
                      </span>
                    </div>
                    <div className="bg-[#f5f0fb] rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-1.5 rounded-full transition-all duration-500"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: isTop
                            ? "#10b981"
                            : isLow
                            ? "#d97706"
                            : "#5A378C",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            <p className="text-[10px] text-[#9b92a8] pt-1">
              Green = 4.75+, Amber = below 4.50
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ── ROW 3: Retention Curve + Age Distribution ─────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Retention Curve */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Client Retention Curve</CardTitle>
            <CardSubtitle>% of cohort retained over 36 months</CardSubtitle>
          </CardHeader>
          <CardContent className="pt-1 pb-3">
            <RetentionCurve data={tenureRetention} />
            <div className="flex items-center gap-6 mt-3 pt-3 border-t border-[#f0ebfa]">
              <div>
                <p className="text-xs text-[#9b92a8]">12-month retention</p>
                <p className="text-sm font-bold text-[#16121e]">79%</p>
              </div>
              <div>
                <p className="text-xs text-[#9b92a8]">24-month retention</p>
                <p className="text-sm font-bold text-[#16121e]">69%</p>
              </div>
              <div>
                <p className="text-xs text-[#9b92a8]">36-month retention</p>
                <p className="text-sm font-bold text-[#16121e]">61%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Age Distribution */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Age Distribution</CardTitle>
            <CardSubtitle>
              Client population by age range &middot; median age{" "}
              <span className="font-semibold text-[#5A378C]">{clientKPIs.avgAge}</span>
            </CardSubtitle>
          </CardHeader>
          <CardContent className="pt-3 space-y-2.5">
            {ageDistribution.map((item) => {
              const isPeak = item.percentage >= 23;
              return (
                <div key={item.range} className="flex items-center gap-3">
                  <span className="text-xs text-[#6b6378] w-14 flex-shrink-0 tabular-nums">
                    {item.range}
                  </span>
                  <div className="flex-1 bg-[#f5f0fb] rounded-full h-5 relative overflow-hidden">
                    <div
                      className="h-5 rounded-full flex items-center justify-end pr-2 transition-all duration-500"
                      style={{
                        width: `${(item.percentage / 26) * 100}%`,
                        backgroundColor: isPeak ? "#5A378C" : "#c4a8e8",
                        minWidth: "2rem",
                      }}
                    >
                      <span className="text-[10px] font-semibold text-white leading-none">
                        {item.count}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-[#9b92a8] w-10 text-right tabular-nums flex-shrink-0">
                    {formatPercent(item.percentage, 0)}
                  </span>
                </div>
              );
            })}
            <div className="pt-2 border-t border-[#f0ebfa] flex items-center gap-4 text-[10px] text-[#9b92a8]">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-sm bg-[#5A378C]" />
                Peak range (23%+)
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-sm bg-[#c4a8e8]" />
                Other
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── ROW 4: Referral Sources + Geographic Zones ───────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Referral Sources */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Referral Sources</CardTitle>
            <CardSubtitle>Conversion speed: faster days = stronger channel</CardSubtitle>
          </CardHeader>
          <CardContent className="pt-1 pb-2">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#f0ebfa]">
                  <th className="text-left py-2 text-[#9b92a8] font-medium pr-3">Source</th>
                  <th className="text-center py-2 text-[#9b92a8] font-medium w-14">Count</th>
                  <th className="text-center py-2 text-[#9b92a8] font-medium w-16">Share</th>
                  <th className="text-center py-2 text-[#9b92a8] font-medium w-20">Conv. Days</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0ebfa]">
                {referralSources.map((row) => {
                  const badge = conversionBadge(row.conversionDays);
                  return (
                    <tr key={row.source} className="group hover:bg-[#f8f6fc]">
                      <td className="py-2.5 pr-3 text-[#16121e] font-medium leading-tight">
                        {row.source}
                      </td>
                      <td className="py-2.5 text-center text-[#4a3f5c] tabular-nums">
                        {row.count}
                      </td>
                      <td className="py-2.5 text-center">
                        <span className="font-semibold text-[#5A378C]">
                          {formatPercent(row.percentage, 0)}
                        </span>
                      </td>
                      <td className="py-2.5 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <span className="tabular-nums text-[#16121e]">
                            {row.conversionDays}d
                          </span>
                          <Badge variant={badge.variant}>{badge.label}</Badge>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Geographic Zones */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Geographic Zones</CardTitle>
            <CardSubtitle>Client density, ratings, and revenue contribution by zone</CardSubtitle>
          </CardHeader>
          <CardContent className="pt-1 pb-2">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#f0ebfa]">
                  <th className="text-left py-2 text-[#9b92a8] font-medium pr-3">Zone</th>
                  <th className="text-center py-2 text-[#9b92a8] font-medium w-16">Clients</th>
                  <th className="text-center py-2 text-[#9b92a8] font-medium w-20">Avg Rating</th>
                  <th className="text-right py-2 text-[#9b92a8] font-medium w-20">Rev. Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0ebfa]">
                {geographicZones.map((row) => (
                  <tr key={row.zone} className="hover:bg-[#f8f6fc]">
                    <td className="py-2.5 pr-3 text-[#16121e] font-medium leading-tight">
                      {row.zone}
                    </td>
                    <td className="py-2.5 text-center text-[#4a3f5c] tabular-nums">
                      {row.clients}
                    </td>
                    <td className="py-2.5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star size={10} className="text-amber-400 fill-amber-400 flex-shrink-0" />
                        <span className="font-semibold text-[#16121e] tabular-nums">
                          {row.avgRating.toFixed(2)}
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="flex-1 bg-[#f5f0fb] rounded-full h-1.5 max-w-[60px] overflow-hidden">
                          <div
                            className="h-1.5 rounded-full bg-[#5A378C]"
                            style={{ width: `${(row.revenueShare / 25) * 100}%` }}
                          />
                        </div>
                        <span className="font-semibold text-[#5A378C] tabular-nums">
                          {formatPercent(row.revenueShare, 0)}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
