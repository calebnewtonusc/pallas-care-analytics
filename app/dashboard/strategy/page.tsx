import { Card, CardHeader, CardContent, CardTitle, CardSubtitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImpactEffortMatrix } from "@/components/charts/ImpactEffortMatrix";
import { recommendations, strategyMatrix, categoryColors, priorityColors } from "@/lib/data/strategy";
import type { StrategicRecommendation } from "@/lib/data/types";
import {
  Target,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
  BarChart2,
  Clock,
  ChevronRight,
} from "lucide-react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getPriorityVariant(priority: string): "danger" | "warning" | "info" | "ghost" {
  if (priority === "Critical") return "danger";
  if (priority === "High") return "warning";
  if (priority === "Medium") return "info";
  return "ghost";
}

function getCategoryVariant(category: string): "default" | "success" | "info" | "warning" | "ghost" {
  if (category === "Revenue") return "default";
  if (category === "Growth") return "warning";
  if (category === "Workforce") return "success";
  if (category === "Technology") return "info";
  return "ghost"; // Operations
}

function getTimeframeVariant(timeframe: string): "default" | "success" | "ghost" {
  if (timeframe === "30 days") return "success";
  if (timeframe === "90 days") return "default";
  return "ghost";
}

// Small horizontal score bar for impact / effort
function ScoreBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-[#f0ebfa] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${(value / 10) * 100}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-[11px] font-semibold text-[#16121e] w-4 text-right">{value}</span>
    </div>
  );
}

// Sorted recommendations: Critical → High → Medium → Low
const sortedRecommendations: StrategicRecommendation[] = [...recommendations].sort((a, b) => {
  const order: Record<string, number> = { Critical: 0, High: 1, Medium: 2, Low: 3 };
  return (order[a.priority] ?? 4) - (order[b.priority] ?? 4);
});

const criticalCount = recommendations.filter((r) => r.priority === "Critical").length;
const highCount = recommendations.filter((r) => r.priority === "High").length;
const mediumCount = recommendations.filter((r) => r.priority === "Medium").length;
const lowCount = recommendations.filter((r) => r.priority === "Low").length;

const priorityCounts: { label: string; count: number; color: string; bg: string }[] = [
  { label: "Critical", count: criticalCount, color: "#dc2626", bg: "#fef2f2" },
  { label: "High", count: highCount, color: "#d97706", bg: "#fffbeb" },
  { label: "Medium", count: mediumCount, color: "#3b82f6", bg: "#eff6ff" },
  ...(lowCount > 0
    ? [{ label: "Low", count: lowCount, color: "#6b7280", bg: "#f9fafb" }]
    : []),
];

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  value: string;
  label: string;
  sublabel: string;
}

function StatCard({ icon: Icon, iconBg, iconColor, value, label, sublabel }: StatCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start gap-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: iconBg }}
        >
          <Icon size={20} style={{ color: iconColor }} />
        </div>
        <div>
          <p className="text-2xl font-bold text-[#16121e] leading-none mb-0.5">{value}</p>
          <p className="text-sm font-semibold text-[#16121e]">{label}</p>
          <p className="text-xs text-[#6b6378] mt-0.5">{sublabel}</p>
        </div>
      </div>
    </Card>
  );
}

// ─── Recommendation Card ──────────────────────────────────────────────────────

function RecommendationCard({ rec }: { rec: StrategicRecommendation }) {
  const priorityColor = priorityColors[rec.priority] ?? "#6b7280";
  const categoryColor = categoryColors[rec.category] ?? "#5A378C";

  return (
    <Card hover className="overflow-hidden">
      {/* Priority accent bar */}
      <div className="h-1 w-full" style={{ backgroundColor: priorityColor }} />

      <CardHeader className="pt-4">
        {/* Header row: badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {/* R# badge — colored by priority */}
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold border"
            style={{
              backgroundColor: `${priorityColor}18`,
              color: priorityColor,
              borderColor: `${priorityColor}35`,
            }}
          >
            {rec.id}
          </span>

          {/* Priority badge */}
          <Badge variant={getPriorityVariant(rec.priority)}>{rec.priority} Priority</Badge>

          {/* Category badge — colored dot + label */}
          <span
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium border"
            style={{
              backgroundColor: `${categoryColor}14`,
              color: categoryColor,
              borderColor: `${categoryColor}30`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: categoryColor }}
            />
            {rec.category}
          </span>

          {/* Timeframe badge */}
          <Badge variant={getTimeframeVariant(rec.timeframe)}>
            <Clock size={10} className="mr-1 inline" />
            {rec.timeframe}
          </Badge>
        </div>

        {/* Title */}
        <CardTitle className="text-base font-bold text-[#16121e] leading-snug">
          {rec.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-3">
        {/* Description */}
        <p className="text-sm text-[#3d3549] leading-relaxed mb-4">{rec.description}</p>

        {/* Expected Outcome */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3.5 mb-3">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 size={15} className="text-emerald-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide mb-1">
                Expected Outcome
              </p>
              <p className="text-sm text-emerald-900 leading-relaxed">{rec.expectedOutcome}</p>
            </div>
          </div>
        </div>

        {/* Data Evidence */}
        <div className="bg-[#f5f0fb] border border-[#e2daf0] rounded-xl p-3.5 mb-4">
          <div className="flex items-start gap-2.5">
            <BarChart2 size={15} className="text-[#5A378C] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-[#5A378C] uppercase tracking-wide mb-1">
                Data Evidence
              </p>
              <p className="text-sm text-[#3d3549] leading-relaxed">{rec.dataEvidence}</p>
            </div>
          </div>
        </div>

        {/* Impact / Effort score bars */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 border-t border-[#f0ebfa] pt-3">
          <div>
            <p className="text-[10px] font-semibold text-[#6b6378] uppercase tracking-wide mb-1">
              Business Impact
            </p>
            <ScoreBar value={rec.impact} color="#059669" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-[#6b6378] uppercase tracking-wide mb-1">
              Implementation Effort
            </p>
            <ScoreBar value={rec.effort} color="#5A378C" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StrategyPage() {
  return (
    <div className="space-y-6">

      {/* ── 1. TOP SUMMARY STAT CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={Target}
          iconBg="#f5f0fb"
          iconColor="#5A378C"
          value="8"
          label="Total Recommendations"
          sublabel="Across 5 strategic categories"
        />
        <StatCard
          icon={AlertTriangle}
          iconBg="#fef2f2"
          iconColor="#dc2626"
          value="2"
          label="Critical Priority Actions"
          sublabel="Require immediate leadership attention"
        />
        <StatCard
          icon={TrendingUp}
          iconBg="#ecfdf5"
          iconColor="#059669"
          value="$1.2M+"
          label="Estimated Revenue Impact"
          sublabel="Combined upside across all initiatives"
        />
      </div>

      {/* ── 2. IMPACT vs EFFORT MATRIX + SIDEBAR ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Matrix — 2/3 width */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Impact vs. Effort Matrix</CardTitle>
            <CardSubtitle>
              Each node represents one strategic recommendation. Hover for details.
            </CardSubtitle>
          </CardHeader>
          <CardContent className="pt-2">
            <ImpactEffortMatrix data={strategyMatrix} categoryColors={categoryColors} />
          </CardContent>
        </Card>

        {/* Sidebar — 1/3 width */}
        <div className="flex flex-col gap-4">
          {/* Priority breakdown card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Priority Breakdown</CardTitle>
              <CardSubtitle>{recommendations.length} recommendations total</CardSubtitle>
            </CardHeader>
            <CardContent className="pt-3 space-y-3">
              {priorityCounts.map(({ label, count, color, bg }) => (
                <div key={label} className="flex items-center gap-3">
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-semibold text-[#16121e]">{label}</span>
                      <span
                        className="text-xs font-bold px-1.5 py-0.5 rounded-md"
                        style={{ backgroundColor: bg, color }}
                      >
                        {count}
                      </span>
                    </div>
                    <div className="h-1.5 bg-[#f0ebfa] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(count / recommendations.length) * 100}%`,
                          backgroundColor: color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Category breakdown card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">By Category</CardTitle>
              <CardSubtitle>Distribution across focus areas</CardSubtitle>
            </CardHeader>
            <CardContent className="pt-3 space-y-2.5">
              {Object.entries(categoryColors).map(([category, color]) => {
                const count = recommendations.filter((r) => r.category === category).length;
                if (count === 0) return null;
                return (
                  <div key={category} className="flex items-center gap-3">
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs font-semibold text-[#16121e]">{category}</span>
                        <span className="text-xs text-[#6b6378] font-medium">{count}</span>
                      </div>
                      <div className="h-1 bg-[#f0ebfa] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(count / recommendations.length) * 100}%`,
                            backgroundColor: color,
                            opacity: 0.8,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Reading guide card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">How to Read This Matrix</CardTitle>
            </CardHeader>
            <CardContent className="pt-2 space-y-2.5">
              {[
                {
                  zone: "Quick Wins",
                  color: "#059669",
                  bg: "#ecfdf5",
                  desc: "High impact with low effort. Start here immediately.",
                },
                {
                  zone: "Major Projects",
                  color: "#3b82f6",
                  bg: "#eff6ff",
                  desc: "High payoff but require planning and resources.",
                },
                {
                  zone: "Fill-ins",
                  color: "#6b7280",
                  bg: "#f9fafb",
                  desc: "Low effort but limited upside. Schedule opportunistically.",
                },
                {
                  zone: "Avoid",
                  color: "#dc2626",
                  bg: "#fef2f2",
                  desc: "High cost, low return. Deprioritize or eliminate.",
                },
              ].map(({ zone, color, bg, desc }) => (
                <div key={zone} className="flex items-start gap-2.5">
                  <div
                    className="w-5 h-5 rounded flex-shrink-0 mt-0.5 border"
                    style={{ backgroundColor: bg, borderColor: `${color}40` }}
                  />
                  <div>
                    <p className="text-[11px] font-bold" style={{ color }}>
                      {zone}
                    </p>
                    <p className="text-[11px] text-[#6b6378] leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── 3. RECOMMENDATION CARDS ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-[#16121e]">All Recommendations</h2>
            <p className="text-sm text-[#6b6378] mt-0.5">
              Sorted by priority — Critical actions listed first.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {priorityCounts.slice(0, 3).map(({ label, color, bg }) => (
              <span
                key={label}
                className="text-[11px] font-semibold px-2 py-1 rounded-lg border"
                style={{
                  backgroundColor: bg,
                  color,
                  borderColor: `${color}30`,
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {sortedRecommendations.map((rec) => (
            <RecommendationCard key={rec.id} rec={rec} />
          ))}
        </div>
      </div>
    </div>
  );
}
