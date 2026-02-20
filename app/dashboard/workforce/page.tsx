import {
  workforceKPIs,
  retentionTrend,
  hiringSources,
  trainingModules,
  tenureBands,
  caregiverRatingDistribution,
  turnoverReasons,
} from "@/lib/data/workforce";
import { Card, CardHeader, CardContent, CardTitle, CardSubtitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KPICard } from "@/components/kpi/KPICard";
import { RetentionChart } from "@/components/charts/RetentionChart";
import { TenureBarChart } from "@/components/charts/TrainingChart";
import { formatPercent, getChangeClass, getChangePrefix } from "@/lib/utils";
import {
  Users,
  TrendingUp,
  Clock,
  BookOpen,
  ArrowUp,
  Star,
} from "lucide-react";
import type { KPIMetric } from "@/lib/data/types";

// ─── helpers ─────────────────────────────────────────────────────────────────

function retentionColor(rate: number): string {
  if (rate >= 85) return "text-emerald-600";
  if (rate >= 70) return "text-amber-600";
  return "text-red-500";
}

function retentionBg(rate: number): string {
  if (rate >= 85) return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (rate >= 70) return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-red-50 text-red-700 border-red-200";
}

function trainingBarColor(completion: number): string {
  if (completion >= 90) return "bg-emerald-500";
  if (completion >= 75) return "bg-amber-400";
  return "bg-red-500";
}

function trainingBarBg(completion: number): string {
  if (completion >= 90) return "bg-emerald-100";
  if (completion >= 75) return "bg-amber-100";
  return "bg-red-100";
}

// ─── KPI definitions ─────────────────────────────────────────────────────────

const kpis: KPIMetric[] = [
  {
    label: "Retention Rate",
    value: workforceKPIs.retentionRate,
    formatted: formatPercent(workforceKPIs.retentionRate),
    change: workforceKPIs.retentionRateChange,
    changeLabel: "vs prior year",
  },
  {
    label: "Active Caregivers",
    value: workforceKPIs.activeCaregiversCount,
    formatted: String(workforceKPIs.activeCaregiversCount),
    change: workforceKPIs.activeCaregiversChange,
    changeLabel: "vs prior year",
  },
  {
    label: "Avg Tenure",
    value: workforceKPIs.avgTenure,
    formatted: `${workforceKPIs.avgTenure} mo`,
    change: workforceKPIs.avgTenureChange,
    changeLabel: "vs prior year",
  },
  {
    label: "Training Completion",
    value: workforceKPIs.trainingCompletion,
    formatted: formatPercent(workforceKPIs.trainingCompletion),
    change: workforceKPIs.trainingCompletionChange,
    changeLabel: "vs prior year",
  },
];

// ─── page ─────────────────────────────────────────────────────────────────────

export default function WorkforcePage() {
  const retentionGap = +(
    workforceKPIs.retentionRate - workforceKPIs.industryAvgRetention
  ).toFixed(1);

  const totalRatings = caregiverRatingDistribution.reduce((s, r) => s + r.count, 0);

  return (
    <div className="space-y-6">
      {/* ── ROW 1: KPI cards ──────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Retention KPI — custom to show vs industry */}
        <div className="bg-white rounded-xl border border-[#e2daf0] shadow-sm p-5 flex flex-col gap-3 hover:shadow-md hover:border-[#b894e3] transition-all duration-200 col-span-1">
          <p className="text-xs font-medium text-[#6b6378] uppercase tracking-wide leading-tight">
            Retention Rate
          </p>
          <p className="text-2xl font-bold text-[#16121e] leading-none tracking-tight">
            {formatPercent(workforceKPIs.retentionRate)}
          </p>
          <div className="flex items-center gap-1.5 text-emerald-600">
            <TrendingUp size={13} className="flex-shrink-0" />
            <span className="text-xs font-semibold">
              +{workforceKPIs.retentionRateChange.toFixed(1)}%
            </span>
            <span className="text-xs text-[#9b92a8]">vs prior year</span>
          </div>
          <div className="mt-1 pt-2.5 border-t border-[#f0ebfa]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#6b6378]">Industry avg</span>
              <span className="text-[#9b92a8]">
                {formatPercent(workforceKPIs.industryAvgRetention)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold px-2 py-0.5 rounded-md">
                <ArrowUp size={10} />
                +{retentionGap} pts above benchmark
              </div>
            </div>
          </div>
        </div>

        {kpis.slice(1).map((metric) => (
          <KPICard key={metric.label} metric={metric} />
        ))}
      </div>

      {/* ── ROW 2: Retention trend + Hiring sources ───────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Retention trend — 2/3 width */}
        <Card className="col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Retention Rate Trend</CardTitle>
                <CardSubtitle>Pallas Care vs. Industry Average — 8 quarters</CardSubtitle>
              </div>
              {/* Gap callout */}
              <div className="flex flex-col items-end gap-1">
                <div className="inline-flex items-center gap-1.5 bg-[#f5f0fb] border border-[#d6c2ef] rounded-lg px-3 py-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#5A378C]" />
                  <span className="text-xs font-bold text-[#5A378C]">
                    +{retentionGap} pt gap
                  </span>
                </div>
                <span className="text-[10px] text-[#9b92a8] pr-0.5">vs industry avg</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <RetentionChart data={retentionTrend} />
          </CardContent>
        </Card>

        {/* Hiring sources — 1/3 width */}
        <Card>
          <CardHeader>
            <CardTitle>Hiring Sources</CardTitle>
            <CardSubtitle>Retention rate by acquisition channel</CardSubtitle>
          </CardHeader>
          <CardContent className="pt-3">
            <div className="space-y-0">
              {/* Header row */}
              <div className="grid grid-cols-[1fr_36px_44px] gap-2 pb-2 border-b border-[#f0ebfa]">
                <span className="text-[10px] font-semibold text-[#9b92a8] uppercase tracking-wide">
                  Source
                </span>
                <span className="text-[10px] font-semibold text-[#9b92a8] uppercase tracking-wide text-right">
                  n
                </span>
                <span className="text-[10px] font-semibold text-[#9b92a8] uppercase tracking-wide text-right">
                  Ret.
                </span>
              </div>
              {hiringSources.map((s) => (
                <div
                  key={s.source}
                  className="grid grid-cols-[1fr_36px_44px] gap-2 py-2.5 border-b border-[#f0ebfa] last:border-0 items-center"
                >
                  <div>
                    <p className="text-xs font-medium text-[#16121e] leading-tight">
                      {s.source}
                    </p>
                    <p className="text-[11px] text-[#9b92a8] mt-0.5">
                      {s.percentage.toFixed(1)}% of hires
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-[#16121e] text-right">
                    {s.count}
                  </span>
                  <span
                    className={`text-xs font-bold text-right ${retentionColor(s.retentionRate)}`}
                  >
                    {s.retentionRate.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
            {/* Legend */}
            <div className="flex items-center gap-3 mt-3 pt-2 border-t border-[#f0ebfa]">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] text-[#9b92a8]">&ge;85%</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-[10px] text-[#9b92a8]">70–84%</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-[10px] text-[#9b92a8]">&lt;70%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── ROW 3: Training modules (compact) ────────────────────────── */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Training Completion</CardTitle>
              <CardSubtitle>10 modules — required and optional</CardSubtitle>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1.5">
              <BookOpen size={12} className="text-emerald-600" />
              <span className="text-xs font-bold text-emerald-700">
                {formatPercent(workforceKPIs.trainingCompletion)} overall
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
            {trainingModules.map((m) => (
              <div
                key={m.module}
                className="flex items-center gap-3 py-2.5 border-b border-[#f5f0fb] last:border-0"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#16121e] leading-tight truncate">{m.module}</p>
                </div>
                <div className="w-20 h-1.5 bg-[#f5f0fb] rounded-full overflow-hidden flex-shrink-0">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${m.completion}%`,
                      backgroundColor:
                        m.completion >= 90 ? "#059669" : m.completion >= 75 ? "#5A378C" : "#dc2626",
                    }}
                  />
                </div>
                <span className="text-xs font-bold text-[#16121e] tabular-nums flex-shrink-0 w-7 text-right">
                  {m.completion}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── ROW 4: Tenure bands | Turnover reasons ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Tenure bands */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Tenure Distribution</CardTitle>
                <CardSubtitle>Avg tenure: {workforceKPIs.avgTenure} months</CardSubtitle>
              </div>
              <div className="flex items-center gap-1 bg-[#f5f0fb] border border-[#e2daf0] rounded-lg px-2.5 py-1.5">
                <Clock size={11} className="text-[#5A378C]" />
                <span className="text-[11px] font-semibold text-[#5A378C]">
                  {workforceKPIs.avgTenure} mo avg
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <TenureBarChart data={tenureBands} />
          </CardContent>
        </Card>

        {/* Turnover reasons */}
        <Card>
          <CardHeader>
            <CardTitle>Turnover Reasons</CardTitle>
            <CardSubtitle>Exit interview analysis — trailing 12 months</CardSubtitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-0 mt-1">
              {turnoverReasons.map((t, i) => {
                const isTop = i === 0;
                const barWidth = `${t.percentage}%`;
                return (
                  <div
                    key={t.reason}
                    className="py-2.5 border-b border-[#f0ebfa] last:border-0"
                  >
                    <div className="flex items-start justify-between mb-1.5 gap-2">
                      <span className="text-xs font-medium text-[#16121e] leading-tight">
                        {t.reason}
                      </span>
                      <span
                        className={`text-xs font-bold flex-shrink-0 ${
                          isTop ? "text-red-500" : "text-[#6b6378]"
                        }`}
                      >
                        {t.percentage}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[#f5f0fb]">
                      <div
                        className={`h-1.5 rounded-full transition-all ${
                          isTop
                            ? "bg-red-400"
                            : i === 1
                            ? "bg-amber-400"
                            : "bg-[#b894e3]"
                        }`}
                        style={{ width: barWidth }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 pt-3 border-t border-[#f0ebfa]">
              <p className="text-[11px] text-[#6b6378] leading-relaxed">
                <span className="font-semibold text-[#16121e]">Key insight:</span>{" "}
                52% of turnover is addressable — compensation and client-matching
                programs could significantly reduce attrition.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
