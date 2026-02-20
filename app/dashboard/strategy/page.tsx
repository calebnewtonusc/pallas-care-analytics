"use client";

import { Card, CardHeader, CardContent, CardTitle, CardSubtitle } from "@/components/ui/card";
import { ImpactEffortMatrix } from "@/components/charts/ImpactEffortMatrix";
import { recommendations, strategyMatrix, categoryColors, priorityColors } from "@/lib/data/strategy";
import type { StrategicRecommendation } from "@/lib/data/types";
import { Clock, ChevronRight } from "lucide-react";

// ─── Quick-win count (≤30 days, high impact) ─────────────────────────────────
const quickWins = recommendations.filter((r) => r.timeframe === "30 days");
const criticalCount = recommendations.filter((r) => r.priority === "Critical").length;

// ─── Priority sort ────────────────────────────────────────────────────────────
const priorityOrder: Record<string, number> = { Critical: 0, High: 1, Medium: 2, Low: 3 };
const sortedRecs = [...recommendations].sort(
  (a, b) => (priorityOrder[a.priority] ?? 4) - (priorityOrder[b.priority] ?? 4)
);

// ─── Recommendation Card ──────────────────────────────────────────────────────
function RecommendationCard({ rec }: { rec: StrategicRecommendation }) {
  const priorityColor = priorityColors[rec.priority] ?? "#6b7280";
  const categoryColor = categoryColors[rec.category] ?? "#5A378C";

  return (
    <div className="bg-white border border-[#e2daf0] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-150">
      {/* Priority accent — thin stripe */}
      <div className="h-[3px] w-full" style={{ backgroundColor: priorityColor }} />

      <div className="p-5">
        {/* Top row: R# + category + right-aligned priority + timeframe */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <span
              className="text-lg font-black leading-none tabular-nums"
              style={{ color: priorityColor }}
            >
              {rec.id}
            </span>
            <span
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-md"
              style={{ backgroundColor: `${categoryColor}14`, color: categoryColor }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: categoryColor }}
              />
              {rec.category}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-[11px] text-[#9b92a8] font-medium flex items-center gap-1">
              <Clock size={10} />
              {rec.timeframe}
            </span>
            <span
              className="text-[11px] font-bold px-2 py-0.5 rounded"
              style={{ backgroundColor: `${priorityColor}15`, color: priorityColor }}
            >
              {rec.priority}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-[#16121e] leading-snug mb-2.5">{rec.title}</h3>

        {/* Description */}
        <p className="text-[13px] text-[#4a3f5c] leading-relaxed mb-3">{rec.description}</p>

        {/* Expected outcome — integrated, no green box */}
        <p className="text-[13px] text-[#16121e] leading-relaxed mb-3">
          <span className="text-emerald-600 font-bold">→ </span>
          {rec.expectedOutcome}
        </p>

        {/* Data evidence — muted footer, no purple box */}
        <p className="text-[12px] text-[#9b92a8] leading-relaxed border-t border-[#f0ebfa] pt-2.5">
          <span className="font-semibold text-[#6b6378]">Evidence: </span>
          {rec.dataEvidence}
        </p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StrategyPage() {
  return (
    <div className="space-y-6">

      {/* ── 1. HERO COMMAND STRIP ───────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-[#e2daf0] shadow-sm overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#e2daf0]">
          <div className="px-6 py-5 bg-[#5A378C]">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#d6c2ef]">
              Initiatives
            </p>
            <p className="text-4xl font-bold text-white mt-2 leading-none">
              {recommendations.length}
            </p>
            <p className="text-xs text-[#b894e3] mt-2">Across 5 categories</p>
          </div>
          <div className="px-6 py-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9b92a8]">
              Critical Actions
            </p>
            <p className="text-4xl font-bold text-red-600 mt-2 leading-none">{criticalCount}</p>
            <p className="text-xs text-red-400 mt-2">Immediate leadership attention</p>
          </div>
          <div className="px-6 py-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9b92a8]">
              Revenue Upside
            </p>
            <p className="text-4xl font-bold text-[#16121e] mt-2 leading-none">$1.2M+</p>
            <p className="text-xs text-emerald-600 mt-2">Combined across all initiatives</p>
          </div>
          <div className="px-6 py-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9b92a8]">
              Quick Wins
            </p>
            <p className="text-4xl font-bold text-[#16121e] mt-2 leading-none">{quickWins.length}</p>
            <p className="text-xs text-[#9b92a8] mt-2">Achievable in 30 days</p>
          </div>
        </div>
      </div>

      {/* ── 2. IMPACT / EFFORT MATRIX + SIDEBAR ────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Matrix — 2/3 width */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Impact vs. Effort Matrix</CardTitle>
            <CardSubtitle>
              Each node is one initiative — colored by category, positioned by business impact and
              implementation effort
            </CardSubtitle>
          </CardHeader>
          <CardContent className="pt-2">
            <ImpactEffortMatrix data={strategyMatrix} categoryColors={categoryColors} />
          </CardContent>
        </Card>

        {/* Sidebar — 1/3 width */}
        <div className="flex flex-col gap-4">
          {/* Priority breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>By Priority</CardTitle>
              <CardSubtitle>{recommendations.length} total recommendations</CardSubtitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex flex-wrap gap-2">
                {(["Critical", "High", "Medium"] as const).map((level) => {
                  const count = recommendations.filter((r) => r.priority === level).length;
                  const color = priorityColors[level];
                  return (
                    <div
                      key={level}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl border flex-1 min-w-[80px]"
                      style={{ borderColor: `${color}30`, backgroundColor: `${color}08` }}
                    >
                      <span
                        className="text-xl font-black leading-none tabular-nums"
                        style={{ color }}
                      >
                        {count}
                      </span>
                      <span className="text-xs font-semibold text-[#4a3f5c] leading-tight">
                        {level}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* 30-day action plan */}
          <Card>
            <CardHeader>
              <CardTitle>30-Day Action Plan</CardTitle>
              <CardSubtitle>Highest-leverage moves this month</CardSubtitle>
            </CardHeader>
            <CardContent className="pt-2 space-y-1">
              {quickWins.map((r) => {
                const priorityColor = priorityColors[r.priority] ?? "#6b7280";
                const categoryColor = categoryColors[r.category] ?? "#5A378C";
                return (
                  <div
                    key={r.id}
                    className="flex items-start gap-3 py-2.5 border-b border-[#f0ebfa] last:border-0"
                  >
                    <span
                      className="text-sm font-black leading-none mt-0.5 flex-shrink-0 tabular-nums"
                      style={{ color: priorityColor }}
                    >
                      {r.id}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#16121e] leading-snug mb-1">
                        {r.title}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                          style={{ backgroundColor: `${categoryColor}14`, color: categoryColor }}
                        >
                          {r.category}
                        </span>
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                          style={{ backgroundColor: `${priorityColor}15`, color: priorityColor }}
                        >
                          {r.priority}
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-[#c4b5d4] flex-shrink-0 mt-1" />
                  </div>
                );
              })}
            </CardContent>
          </Card>

        </div>
      </div>

      {/* ── 3. ALL RECOMMENDATIONS ──────────────────────────────────────── */}
      <div>
        <div className="mb-4">
          <h2 className="text-base font-bold text-[#16121e]">All Recommendations</h2>
          <p className="text-sm text-[#9b92a8] mt-0.5">Sorted Critical → High → Medium</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {sortedRecs.map((rec) => (
            <RecommendationCard key={rec.id} rec={rec} />
          ))}
        </div>
      </div>
    </div>
  );
}
