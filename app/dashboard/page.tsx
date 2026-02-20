import { Card, CardHeader, CardContent, CardTitle, CardSubtitle } from "@/components/ui/card";
import { KPICard } from "@/components/kpi/KPICard";
import { Badge } from "@/components/ui/badge";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { ClientGrowthChart } from "@/components/charts/ClientGrowthChart";
import { SatisfactionChart } from "@/components/charts/SatisfactionChart";
import {
  executiveKPIs,
  revenueTimeSeries,
  clientGrowthSeries,
  satisfactionTrend,
  scorecard,
} from "@/lib/data/executive";
import { TrendingUp, Shield, Star, Zap, ArrowUpRight } from "lucide-react";

// ─── Scorecard helpers ─────────────────────────────────────────────────────────

interface ScorecardDimension {
  label: string;
  score: number;
  icon: React.ElementType;
  description: string;
}

function scoreBadgeVariant(score: number): "success" | "warning" | "danger" {
  if (score >= 85) return "success";
  if (score >= 70) return "warning";
  return "danger";
}

function scoreBarColor(score: number): string {
  if (score >= 85) return "#059669"; // emerald-600
  if (score >= 70) return "#d97706"; // amber-600
  return "#ef4444"; // red-500
}

function scoreLabel(score: number): string {
  if (score >= 90) return "Excellent";
  if (score >= 85) return "Strong";
  if (score >= 70) return "Developing";
  return "At Risk";
}

const scorecardDimensions: ScorecardDimension[] = [
  {
    label: "Financial Health",
    score: scorecard.financialHealth,
    icon: TrendingUp,
    description: "Revenue trajectory & margin",
  },
  {
    label: "Workforce Quality",
    score: scorecard.workforceQuality,
    icon: Shield,
    description: "Retention, training, satisfaction",
  },
  {
    label: "Client Outcomes",
    score: scorecard.clientOutcomes,
    icon: Star,
    description: "Satisfaction, longevity, referrals",
  },
  {
    label: "Ops Efficiency",
    score: scorecard.operationalEfficiency,
    icon: Zap,
    description: "Scheduling, utilization, fill rate",
  },
  {
    label: "Growth Trajectory",
    score: scorecard.growthTrajectory,
    icon: ArrowUpRight,
    description: "Pipeline, market position",
  },
];

const overallScore = Math.round(
  Object.values(scorecard).reduce((a, b) => a + b, 0) /
    Object.values(scorecard).length
);

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ExecutiveOverviewPage() {
  // Split the 8 KPIs into two rows of 4
  const topKPIs = executiveKPIs.slice(0, 4);     // revenue, active clients, active caregivers, caregiver retention
  const bottomKPIs = executiveKPIs.slice(4);     // satisfaction, hours MTD, avg rev/client, referral rate

  return (
    <div className="flex flex-col gap-6">

      {/* ── ROW 1: Top KPI Cards ──────────────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-4">
        {topKPIs.map((metric) => (
          <KPICard key={metric.label} metric={metric} />
        ))}
      </div>

      {/* ── ROW 2: Revenue Chart + Scorecard ─────────────────────────────── */}
      <div className="grid grid-cols-3 gap-4">

        {/* Revenue Trend — 2/3 width */}
        <Card className="col-span-2">
          <CardHeader className="flex flex-row items-start justify-between pb-3">
            <div>
              <CardTitle>Revenue Trend</CardTitle>
              <CardSubtitle>Monthly actuals vs. target · Mar 2025 – Feb 2026</CardSubtitle>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-0.5 rounded-full bg-[#5A378C]" />
                <span className="text-[11px] text-[#6b6378]">Revenue</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div
                  className="w-3 h-0.5 rounded-full"
                  style={{
                    background:
                      "repeating-linear-gradient(90deg,#d6c2ef 0,#d6c2ef 3px,transparent 3px,transparent 6px)",
                  }}
                />
                <span className="text-[11px] text-[#6b6378]">Target</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <RevenueChart data={revenueTimeSeries} />
          </CardContent>
        </Card>

        {/* Performance Scorecard — 1/3 width */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Performance Scorecard</CardTitle>
                <CardSubtitle>Composite score across 5 dimensions</CardSubtitle>
              </div>
              <div className="flex flex-col items-end flex-shrink-0">
                <span
                  className="text-3xl font-bold leading-none"
                  style={{ color: scoreBarColor(overallScore) }}
                >
                  {overallScore}
                </span>
                <span className="text-[10px] text-[#9b92a8] mt-0.5 font-medium tracking-wide uppercase">
                  Overall
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0 flex flex-col gap-3.5">
            {scorecardDimensions.map(({ label, score, icon: Icon, description }) => {
              const variant = scoreBadgeVariant(score);
              const barColor = scoreBarColor(score);
              return (
                <div key={label} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon size={13} className="text-[#9975c8] flex-shrink-0" />
                      <span className="text-xs font-medium text-[#16121e]">{label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={variant} className="text-[10px] px-1.5 py-0 leading-5">
                        {scoreLabel(score)}
                      </Badge>
                      <span
                        className="text-xs font-bold tabular-nums w-6 text-right"
                        style={{ color: barColor }}
                      >
                        {score}
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-[#f0ebfa] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${score}%`, backgroundColor: barColor }}
                    />
                  </div>
                  <p className="text-[10px] text-[#9b92a8] leading-tight">{description}</p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* ── ROW 3: Client Growth + Satisfaction ──────────────────────────── */}
      <div className="grid grid-cols-2 gap-4">

        {/* Client Growth */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Active Client Growth</CardTitle>
                <CardSubtitle>Headcount trend · Mar 2025 – Feb 2026</CardSubtitle>
              </div>
              <Badge variant="default" className="flex-shrink-0">
                74 Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-1">
            <ClientGrowthChart data={clientGrowthSeries} />
          </CardContent>
        </Card>

        {/* Satisfaction vs Benchmark */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Client Satisfaction</CardTitle>
                <CardSubtitle>NPS rating vs. industry benchmark · quarterly</CardSubtitle>
              </div>
              <Badge variant="success" className="flex-shrink-0">
                4.71 / 5.0
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-1">
            <SatisfactionChart data={satisfactionTrend} />
          </CardContent>
        </Card>
      </div>

      {/* ── ROW 4: Bottom KPI Cards ───────────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-4">
        {bottomKPIs.map((metric) => (
          <KPICard key={metric.label} metric={metric} />
        ))}
      </div>

    </div>
  );
}
