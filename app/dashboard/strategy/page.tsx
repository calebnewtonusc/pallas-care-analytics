"use client";

import { Card, CardHeader, CardContent, CardTitle, CardSubtitle } from "@/components/ui/card";
import { ImpactEffortMatrix } from "@/components/charts/ImpactEffortMatrix";
import { recommendations, strategyMatrix, categoryColors, priorityColors } from "@/lib/data/strategy";
import { Clock } from "lucide-react";

const quickWins = recommendations.filter((r) => r.timeframe === "30 days");
const criticalCount = recommendations.filter((r) => r.priority === "Critical").length;

const priorityOrder: Record<string, number> = { Critical: 0, High: 1, Medium: 2, Low: 3 };
const sortedRecs = [...recommendations].sort(
  (a, b) => (priorityOrder[a.priority] ?? 4) - (priorityOrder[b.priority] ?? 4)
);

export default function StrategyPage() {
  return (
    <div className="space-y-6">

      {/* ── HERO STRIP ──────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-[#e2daf0] shadow-sm overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#e2daf0]">
          <div className="px-6 py-5 bg-[#5A378C]">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#d6c2ef]">Initiatives</p>
            <p className="text-4xl font-bold text-white mt-2 leading-none">{recommendations.length}</p>
            <p className="text-xs text-[#b894e3] mt-2">Across 5 categories</p>
          </div>
          <div className="px-6 py-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9b92a8]">Critical Actions</p>
            <p className="text-4xl font-bold text-[#16121e] mt-2 leading-none">{criticalCount}</p>
            <p className="text-xs text-[#9b92a8] mt-2">Immediate attention required</p>
          </div>
          <div className="px-6 py-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9b92a8]">Revenue Upside</p>
            <p className="text-4xl font-bold text-[#16121e] mt-2 leading-none">$1.2M+</p>
            <p className="text-xs text-emerald-600 mt-2">Combined upside</p>
          </div>
          <div className="px-6 py-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9b92a8]">Quick Wins</p>
            <p className="text-4xl font-bold text-[#16121e] mt-2 leading-none">{quickWins.length}</p>
            <p className="text-xs text-[#9b92a8] mt-2">Achievable in 30 days</p>
          </div>
        </div>
      </div>

      {/* ── MATRIX + 30-DAY SIDEBAR ─────────────────────────────────────── */}
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

        <Card>
          <CardHeader>
            <CardTitle>30-Day Action Plan</CardTitle>
            <CardSubtitle>Highest-leverage moves this month</CardSubtitle>
          </CardHeader>
          <CardContent className="pt-2 space-y-0">
            {quickWins.map((r) => {
              const priorityColor = priorityColors[r.priority] ?? "#5A378C";
              const categoryColor = categoryColors[r.category] ?? "#5A378C";
              return (
                <div
                  key={r.id}
                  className="flex items-start gap-3 py-3 border-b border-[#f5f0fb] last:border-0"
                >
                  <div className="w-[3px] h-full self-stretch rounded-full flex-shrink-0 mt-0.5" style={{ backgroundColor: priorityColor }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#16121e] leading-snug mb-1.5">
                      {r.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-[10px] text-[#9b92a8]">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: categoryColor }} />
                        {r.category}
                      </span>
                      <span className="text-emerald-600 text-[10px] font-bold">{r.keyMetric}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* ── RANKED ACTION TABLE ──────────────────────────────────────────── */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Initiatives</CardTitle>
          <CardSubtitle>Ranked Critical → High → Medium · sorted by priority then impact</CardSubtitle>
        </CardHeader>
        <CardContent className="pt-0 px-0 pb-0">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#e2daf0] bg-[#faf8fd]">
                <th className="text-left px-5 py-3 text-[10px] font-semibold text-[#9b92a8] uppercase tracking-wide w-8" />
                <th className="text-left px-2 py-3 text-[10px] font-semibold text-[#9b92a8] uppercase tracking-wide">
                  Initiative
                </th>
                <th className="text-left py-3 pr-4 text-[10px] font-semibold text-[#9b92a8] uppercase tracking-wide w-28">
                  Category
                </th>
                <th className="text-left py-3 pr-4 text-[10px] font-semibold text-[#9b92a8] uppercase tracking-wide w-24">
                  Priority
                </th>
                <th className="text-center py-3 pr-4 text-[10px] font-semibold text-[#9b92a8] uppercase tracking-wide w-24">
                  Timeline
                </th>
                <th className="text-right py-3 pr-5 text-[10px] font-semibold text-[#9b92a8] uppercase tracking-wide w-36">
                  Impact
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedRecs.map((rec) => {
                const priorityColor = priorityColors[rec.priority] ?? "#9b92a8";
                const categoryColor = categoryColors[rec.category] ?? "#5A378C";
                return (
                  <tr
                    key={rec.id}
                    className="border-b border-[#f5f0fb] last:border-0 hover:bg-[#faf8fd] transition-colors"
                  >
                    {/* Priority bar */}
                    <td className="pl-5 pr-2 py-4">
                      <div className="w-[3px] h-8 rounded-full" style={{ backgroundColor: priorityColor }} />
                    </td>

                    {/* Title + description */}
                    <td className="py-4 pr-4">
                      <div className="flex items-baseline gap-2 mb-0.5">
                        <span className="text-[11px] font-black text-[#d6c2ef] tabular-nums flex-shrink-0">
                          {rec.id}
                        </span>
                        <span className="text-sm font-semibold text-[#16121e] leading-snug">
                          {rec.title}
                        </span>
                      </div>
                      <p className="text-[12px] text-[#9b92a8] leading-relaxed line-clamp-1 pl-[22px]">
                        {rec.description}
                      </p>
                    </td>

                    {/* Category */}
                    <td className="py-4 pr-4">
                      <span className="flex items-center gap-1.5 text-xs text-[#6b6378]">
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: categoryColor }}
                        />
                        {rec.category}
                      </span>
                    </td>

                    {/* Priority text */}
                    <td className="py-4 pr-4">
                      <span
                        className="text-[11px] font-bold uppercase tracking-wide"
                        style={{ color: priorityColor }}
                      >
                        {rec.priority}
                      </span>
                    </td>

                    {/* Timeframe */}
                    <td className="py-4 pr-4 text-center">
                      <span className="flex items-center justify-center gap-1 text-xs text-[#9b92a8]">
                        <Clock size={10} />
                        {rec.timeframe}
                      </span>
                    </td>

                    {/* Key metric */}
                    <td className="py-4 pr-5 text-right">
                      <span className="text-sm font-bold text-emerald-600 tabular-nums">
                        {rec.keyMetric}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* ── PARTNERSHIP ROADMAP ──────────────────────────────────────── */}
      <div className="bg-[#f5f0fb] border border-[#e2daf0] rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-[#e2daf0]">
          <p className="text-sm font-semibold text-[#16121e]">From Illustrative to Live — Partnership Roadmap</p>
          <p className="text-xs text-[#6b6378] mt-0.5">
            Three phases to replace every benchmark metric with Pallas Care&rsquo;s real operational data
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[#e2daf0]">
          {[
            {
              phase: "Phase 1",
              label: "Data Discovery",
              timeline: "Weeks 1–2",
              color: "#5A378C",
              items: [
                "Export scheduling & shift records",
                "Pull 12-month billing history",
                "Compile caregiver exit interview logs",
                "Map client satisfaction survey data",
              ],
            },
            {
              phase: "Phase 2",
              label: "Analysis & Population",
              timeline: "Weeks 3–4",
              color: "#0D9488",
              items: [
                "Replace all benchmarks with actuals",
                "Validate model against reported P&L",
                "Identify real retention risk factors",
                "Refine all 8 strategy recommendations",
              ],
            },
            {
              phase: "Phase 3",
              label: "Live Integration",
              timeline: "Month 2+",
              color: "#15803D",
              items: [
                "Connect scheduling platform API",
                "Automate billing data pipeline",
                "Enable real-time mid-month alerts",
                "Deploy for leadership team access",
              ],
            },
          ].map((p) => (
            <div key={p.phase} className="px-6 py-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p
                    className="text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: p.color }}
                  >
                    {p.phase}
                  </p>
                  <p className="text-sm font-semibold text-[#16121e] mt-0.5">{p.label}</p>
                </div>
                <span className="text-[10px] text-[#9b92a8] bg-white border border-[#e2daf0] px-2 py-1 rounded-md">
                  {p.timeline}
                </span>
              </div>
              <ul className="space-y-2">
                {p.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-[#4a3f5c]">
                    <span
                      className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: p.color }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 bg-white border-t border-[#e2daf0]">
          <p className="text-[11px] text-[#6b6378] text-center leading-relaxed">
            This dashboard is the Phase 3 deliverable — built before your data, to show exactly what we&rsquo;d build with it.
            All 8 initiatives above become data-backed decisions specific to Pallas Care once connected to your systems.
          </p>
        </div>
      </div>

    </div>
  );
}
