"use client";

import { Card, CardHeader, CardContent, CardTitle, CardSubtitle } from "@/components/ui/card";
import { ImpactEffortMatrix } from "@/components/charts/ImpactEffortMatrix";
import { recommendations, strategyMatrix, categoryColors, priorityColors } from "@/lib/data/strategy";
import type { StrategicRecommendation } from "@/lib/data/types";
import { Clock, ChevronRight } from "lucide-react";

const quickWins = recommendations.filter((r) => r.timeframe === "30 days");
const criticalCount = recommendations.filter((r) => r.priority === "Critical").length;

const priorityOrder: Record<string, number> = { Critical: 0, High: 1, Medium: 2, Low: 3 };
const sortedRecs = [...recommendations].sort(
  (a, b) => (priorityOrder[a.priority] ?? 4) - (priorityOrder[b.priority] ?? 4)
);

// ─── Recommendation Card ──────────────────────────────────────────────────────
function RecommendationCard({ rec }: { rec: StrategicRecommendation }) {
  const priorityColor = priorityColors[rec.priority] ?? "#6b6378";
  const categoryColor = categoryColors[rec.category] ?? "#5A378C";

  return (
    <div
      className="bg-white border border-[#e2daf0] rounded-xl shadow-sm hover:shadow-md transition-shadow duration-150 flex overflow-hidden"
    >
      {/* Left priority border */}
      <div className="w-[3px] flex-shrink-0" style={{ backgroundColor: priorityColor }} />

      <div className="p-5 flex-1 min-w-0">
        {/* Meta row: priority label · category dot + name · timeframe */}
        <div className="flex items-center gap-2 mb-2.5 flex-wrap">
          <span
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: priorityColor }}
          >
            {rec.priority}
          </span>
          <span className="text-[#d6c2ef] text-[10px]">·</span>
          <span className="flex items-center gap-1 text-[11px] text-[#6b6378]">
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: categoryColor }}
            />
            {rec.category}
          </span>
          <span className="text-[#d6c2ef] text-[10px]">·</span>
          <span className="flex items-center gap-1 text-[11px] text-[#9b92a8]">
            <Clock size={9} />
            {rec.timeframe}
          </span>
        </div>

        {/* R# + Title */}
        <div className="flex items-baseline gap-2 mb-2.5">
          <span className="text-[12px] font-black text-[#d6c2ef] tabular-nums flex-shrink-0">
            {rec.id}
          </span>
          <h3 className="text-sm font-bold text-[#16121e] leading-snug">{rec.title}</h3>
        </div>

        {/* Description */}
        <p className="text-[13px] text-[#4a3f5c] leading-relaxed mb-3">{rec.description}</p>

        {/* Outcome */}
        <p className="text-[13px] text-[#16121e] leading-relaxed mb-3">
          <span className="text-emerald-600 font-bold">→ </span>
          {rec.expectedOutcome}
        </p>

        {/* Evidence */}
        <p className="text-[12px] text-[#9b92a8] leading-relaxed border-t border-[#f0ebfa] pt-2.5">
          <span className="font-medium text-[#6b6378]">Evidence: </span>
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

      {/* ── 1. HERO STRIP ───────────────────────────────────────────────── */}
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
            <p className="text-4xl font-bold text-[#16121e] mt-2 leading-none">{criticalCount}</p>
            <p className="text-xs text-[#9b92a8] mt-2">Immediate leadership attention</p>
          </div>
          <div className="px-6 py-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9b92a8]">
              Revenue Upside
            </p>
            <p className="text-4xl font-bold text-[#16121e] mt-2 leading-none">$1.2M+</p>
            <p className="text-xs text-emerald-600 mt-2">Combined upside</p>
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

      {/* ── 2. MATRIX + SIDEBAR ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Impact vs. Effort Matrix</CardTitle>
            <CardSubtitle>
              Initiatives positioned by business impact and implementation effort · colored by category
            </CardSubtitle>
          </CardHeader>
          <CardContent className="pt-2">
            <ImpactEffortMatrix data={strategyMatrix} categoryColors={categoryColors} />
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          {/* Priority summary */}
          <Card>
            <CardHeader>
              <CardTitle>Priority Summary</CardTitle>
              <CardSubtitle>{recommendations.length} total initiatives</CardSubtitle>
            </CardHeader>
            <CardContent className="pt-2 space-y-2">
              {(["Critical", "High", "Medium"] as const).map((level) => {
                const count = recommendations.filter((r) => r.priority === level).length;
                const color = priorityColors[level];
                return (
                  <div key={level} className="flex items-center justify-between py-1.5 border-b border-[#f5f0fb] last:border-0">
                    <div className="flex items-center gap-2.5">
                      <div className="w-[3px] h-4 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                      <span className="text-sm font-medium text-[#16121e]">{level}</span>
                    </div>
                    <span className="text-sm font-bold text-[#16121e] tabular-nums">{count}</span>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* 30-day action plan */}
          <Card>
            <CardHeader>
              <CardTitle>30-Day Action Plan</CardTitle>
              <CardSubtitle>Highest-leverage moves this month</CardSubtitle>
            </CardHeader>
            <CardContent className="pt-2 space-y-0">
              {quickWins.map((r) => {
                const categoryColor = categoryColors[r.category] ?? "#5A378C";
                return (
                  <div
                    key={r.id}
                    className="flex items-start gap-3 py-3 border-b border-[#f5f0fb] last:border-0"
                  >
                    <span className="text-xs font-black text-[#c4b5d4] tabular-nums mt-0.5 flex-shrink-0">
                      {r.id}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#16121e] leading-snug mb-1">
                        {r.title}
                      </p>
                      <span className="flex items-center gap-1 text-[10px] text-[#9b92a8]">
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: categoryColor }}
                        />
                        {r.category}
                      </span>
                    </div>
                    <ChevronRight size={13} className="text-[#d6c2ef] flex-shrink-0 mt-0.5" />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── 3. RECOMMENDATIONS ──────────────────────────────────────────── */}
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
