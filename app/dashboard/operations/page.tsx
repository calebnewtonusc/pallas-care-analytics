import {
  operationsKPIs,
  hoursDeliveredMonthly,
  schedulingEfficiency,
  incidentTracking,
  zoneOperations,
  techStack,
} from "@/lib/data/operations";
import { Card, CardHeader, CardContent, CardTitle, CardSubtitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KPICard } from "@/components/kpi/KPICard";
import { HoursChart } from "@/components/charts/HoursChart";
import { SchedulingChart } from "@/components/charts/SchedulingChart";
import { IncidentChart } from "@/components/charts/IncidentChart";
import { formatPercent } from "@/lib/utils";
import type { KPIMetric } from "@/lib/data/types";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

// ─── Tech adoption color ─────────────────────────────────────────────────────
function adoptionColor(pct: number): string {
  if (pct >= 85) return "#5A378C";
  if (pct >= 65) return "#a87dd4";
  return "#d6c2ef";
}

function adoptionTextColor(pct: number): string {
  if (pct >= 85) return "text-[#5A378C]";
  if (pct >= 65) return "text-[#7c4eb8]";
  return "text-amber-600";
}

// ─── Incident color coding ───────────────────────────────────────────────────
function incidentStyle(count: number) {
  if (count === 0)
    return { icon: <CheckCircle size={13} className="text-emerald-500" />, textClass: "text-emerald-600 font-semibold" };
  if (count === 1)
    return { icon: <AlertTriangle size={13} className="text-amber-500" />, textClass: "text-amber-600 font-semibold" };
  return { icon: <AlertTriangle size={13} className="text-red-500" />, textClass: "text-red-600 font-semibold" };
}

// ─── KPI definitions ─────────────────────────────────────────────────────────
const kpiMetrics: KPIMetric[] = [
  {
    label: "Hours Delivered (MTD)",
    value: operationsKPIs.hoursDeliveredMTD,
    formatted: `${operationsKPIs.hoursDeliveredMTD.toLocaleString()}h`,
    change: operationsKPIs.hoursDeliveredChange,
    changeLabel: "vs. prior month",
  },
  {
    label: "Scheduling Fulfillment",
    value: operationsKPIs.schedulingFulfillmentRate,
    formatted: formatPercent(operationsKPIs.schedulingFulfillmentRate),
    change: operationsKPIs.schedulingFulfillmentChange,
    changeLabel: "vs. prior month",
  },
  {
    label: "Avg. Callout Rate",
    value: operationsKPIs.avgCalloutRate,
    formatted: formatPercent(operationsKPIs.avgCalloutRate),
    change: operationsKPIs.calloutRateChange,
    changeLabel: "vs. prior month",
  },
  {
    label: "Incident Rate / 100 Clients",
    value: operationsKPIs.incidentRate,
    formatted: String(operationsKPIs.incidentRate),
    change: operationsKPIs.incidentRateChange,
    changeLabel: "vs. prior quarter",
  },
];

// ─── Category group colors for tech stack ────────────────────────────────────
const categoryBadgeVariant: Record<string, "default" | "success" | "info" | "ghost" | "warning"> = {
  "Core Operations": "default",
  "Field Operations": "info",
  "Documentation": "success",
  "Client Engagement": "warning",
  "Finance": "success",
  "HR & Development": "ghost",
};

export default function OperationsPage() {
  return (
    <div className="space-y-6">
      {/* ── Page header ────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#16121e] tracking-tight">Operations</h1>
          <p className="text-sm text-[#6b6378] mt-0.5">
            Service delivery, scheduling, and field performance &middot; Feb 2026
          </p>
        </div>
        <Badge variant="default">Q1 2026</Badge>
      </div>

      {/* ── ROW 1: KPI Cards ─────────────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-4">
        {kpiMetrics.map((metric) => (
          <KPICard key={metric.label} metric={metric} />
        ))}
      </div>

      {/* ── ROW 2: Hours Chart + Scheduling Chart ─────────────────────── */}
      <div className="grid grid-cols-3 gap-4">
        {/* Hours delivered — 2/3 width */}
        <Card className="col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Hours Delivered vs. Target</CardTitle>
            <CardSubtitle>Monthly care hours delivered compared to plan &middot; trailing 12 months</CardSubtitle>
          </CardHeader>
          <CardContent className="pt-1 pb-3">
            <HoursChart data={hoursDeliveredMonthly} />
            <div className="flex items-center gap-6 mt-3 pt-3 border-t border-[#f0ebfa]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-[#5A378C] rounded-full" />
                <span className="text-xs text-[#6b6378]">Hours delivered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-[#d6c2ef] rounded-full" style={{ borderTop: "2px dashed #d6c2ef", borderBottom: "none", height: 0 }} />
                <span className="text-xs text-[#6b6378]">Target</span>
              </div>
              <div className="ml-auto">
                <span className="text-xs text-[#9b92a8]">Feb MTD: </span>
                <span className="text-xs font-semibold text-[#5A378C]">
                  {operationsKPIs.hoursDeliveredMTD.toLocaleString()}h
                </span>
                <span className="text-xs text-emerald-600 ml-2">
                  +{operationsKPIs.hoursDeliveredChange}% MoM
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scheduling efficiency — 1/3 width */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Scheduling Efficiency</CardTitle>
            <CardSubtitle>Fulfillment rate vs. callout %</CardSubtitle>
          </CardHeader>
          <CardContent className="pt-1 pb-3">
            <SchedulingChart data={schedulingEfficiency} />
            <div className="mt-3 pt-3 border-t border-[#f0ebfa] space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm bg-[#5A378C]" />
                  <span className="text-xs text-[#6b6378]">Fulfillment</span>
                </div>
                <span className="text-xs font-bold text-[#5A378C]">
                  {formatPercent(operationsKPIs.schedulingFulfillmentRate)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm bg-[#f3e8ff] border border-[#d6c2ef]" />
                  <span className="text-xs text-[#6b6378]">Callout rate</span>
                </div>
                <span className="text-xs font-bold text-amber-600">
                  {formatPercent(operationsKPIs.avgCalloutRate)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── ROW 3: Zone Operations Table ──────────────────────────────── */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Zone Operations Overview</CardTitle>
          <CardSubtitle>
            Service performance by geographic zone &middot; incidents:{" "}
            <span className="text-emerald-600 font-medium">0 = green</span>,{" "}
            <span className="text-amber-600 font-medium">1 = amber</span>,{" "}
            <span className="text-red-600 font-medium">2+ = red</span>
          </CardSubtitle>
        </CardHeader>
        <CardContent className="pt-1 pb-2">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#f0ebfa]">
                <th className="text-left py-2.5 text-[#9b92a8] font-medium pr-3">Zone</th>
                <th className="text-center py-2.5 text-[#9b92a8] font-medium w-16">Clients</th>
                <th className="text-center py-2.5 text-[#9b92a8] font-medium w-20">Caregivers</th>
                <th className="text-center py-2.5 text-[#9b92a8] font-medium w-24">Weekly Hrs</th>
                <th className="text-center py-2.5 text-[#9b92a8] font-medium w-24">Fulfillment</th>
                <th className="text-center py-2.5 text-[#9b92a8] font-medium w-28">Avg Response</th>
                <th className="text-center py-2.5 text-[#9b92a8] font-medium w-20">Incidents</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0ebfa]">
              {zoneOperations.map((row) => {
                const incident = incidentStyle(row.incidents);
                return (
                  <tr key={row.zone} className="hover:bg-[#f8f6fc]">
                    <td className="py-3 pr-3 text-[#16121e] font-medium">{row.zone}</td>
                    <td className="py-3 text-center text-[#4a3f5c] tabular-nums">{row.clients}</td>
                    <td className="py-3 text-center text-[#4a3f5c] tabular-nums">{row.caregivers}</td>
                    <td className="py-3 text-center text-[#4a3f5c] tabular-nums">
                      {row.weeklyHours}h
                    </td>
                    <td className="py-3 text-center">
                      <span
                        className={`font-semibold tabular-nums ${
                          row.fulfillmentRate >= 97.5
                            ? "text-emerald-600"
                            : row.fulfillmentRate >= 96
                            ? "text-[#5A378C]"
                            : "text-amber-600"
                        }`}
                      >
                        {formatPercent(row.fulfillmentRate)}
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Clock size={11} className="text-[#9b92a8]" />
                        <span
                          className={`tabular-nums font-medium ${
                            row.avgResponseTime <= 3
                              ? "text-emerald-600"
                              : row.avgResponseTime <= 4
                              ? "text-[#4a3f5c]"
                              : "text-amber-600"
                          }`}
                        >
                          {row.avgResponseTime}h
                        </span>
                      </div>
                    </td>
                    <td className="py-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {incident.icon}
                        <span className={`${incident.textClass} tabular-nums`}>
                          {row.incidents}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* ── ROW 4: Tech Adoption + Incident Tracking ──────────────────── */}
      <div className="grid grid-cols-2 gap-4">
        {/* Tech Adoption */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Technology Adoption</CardTitle>
            <CardSubtitle>
              Platform usage by tool &middot; overall{" "}
              <span className="font-semibold text-[#5A378C]">{operationsKPIs.techAdoptionRate}%</span>{" "}
              adopted
            </CardSubtitle>
          </CardHeader>
          <CardContent className="pt-2 space-y-4">
            {techStack
              .slice()
              .sort((a, b) => b.adopted - a.adopted)
              .map((item) => {
                const badgeVariant = categoryBadgeVariant[item.category] ?? "ghost";
                return (
                  <div key={item.tool} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-sm text-[#16121e] font-medium truncate">{item.tool}</span>
                        <Badge variant={badgeVariant} className="flex-shrink-0">
                          {item.category}
                        </Badge>
                      </div>
                      <span
                        className={`text-sm font-bold tabular-nums ml-3 flex-shrink-0 ${adoptionTextColor(item.adopted)}`}
                      >
                        {item.adopted}%
                      </span>
                    </div>
                    <div className="bg-[#f5f0fb] rounded-full h-2 overflow-hidden">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${item.adopted}%`,
                          backgroundColor: adoptionColor(item.adopted),
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            <div className="pt-2 border-t border-[#f0ebfa] flex items-center gap-4 text-[10px] text-[#9b92a8]">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-sm bg-[#5A378C]" />
                85%+ Strong
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-sm bg-[#a87dd4]" />
                65–84% Growing
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-sm bg-[#d6c2ef]" />
                Below 65%
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Incident Tracking */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Incident Tracking</CardTitle>
            <CardSubtitle>Quarterly incidents by type &middot; target: sustained decline</CardSubtitle>
          </CardHeader>
          <CardContent className="pt-2">
            <IncidentChart data={incidentTracking} />
            <div className="mt-3 pt-3 border-t border-[#f0ebfa]">
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { label: "Falls", color: "#5A378C", key: "falls" },
                  { label: "Medication", color: "#a87dd4", key: "medication" },
                  { label: "Other", color: "#d6c2ef", key: "other" },
                ].map((cat) => {
                  const latestQ = incidentTracking[incidentTracking.length - 1];
                  const val = latestQ[cat.key as keyof typeof latestQ] as number;
                  return (
                    <div key={cat.key} className="space-y-0.5">
                      <div className="flex items-center justify-center gap-1.5">
                        <span
                          className="inline-block w-2.5 h-2.5 rounded-sm flex-shrink-0"
                          style={{ backgroundColor: cat.color }}
                        />
                        <span className="text-xs text-[#6b6378]">{cat.label}</span>
                      </div>
                      <p className="text-base font-bold text-[#16121e]">{val}</p>
                      <p className="text-[10px] text-[#9b92a8]">Q1 &lsquo;26</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
