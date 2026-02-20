import { Card, CardHeader, CardContent, CardTitle, CardSubtitle } from "@/components/ui/card";
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
import { TrendingUp, Shield, Star, Zap, ArrowUpRight, ArrowUp } from "lucide-react";

function scoreBadgeVariant(score: number): "success" | "warning" | "danger" {
  if (score >= 85) return "success";
  if (score >= 70) return "warning";
  return "danger";
}

function scoreBarColor(score: number): string {
  if (score >= 85) return "#059669";
  if (score >= 70) return "#d97706";
  return "#ef4444";
}

function scoreLabel(score: number): string {
  if (score >= 90) return "Excellent";
  if (score >= 85) return "Strong";
  if (score >= 70) return "Developing";
  return "At Risk";
}

const scorecardDimensions = [
  { label: "Financial Health", score: scorecard.financialHealth, icon: TrendingUp, description: "Revenue trajectory & margin" },
  { label: "Workforce Quality", score: scorecard.workforceQuality, icon: Shield, description: "Retention, training, satisfaction" },
  { label: "Client Outcomes", score: scorecard.clientOutcomes, icon: Star, description: "Satisfaction, longevity, referrals" },
  { label: "Ops Efficiency", score: scorecard.operationalEfficiency, icon: Zap, description: "Scheduling, utilization, fill rate" },
  { label: "Growth Trajectory", score: scorecard.growthTrajectory, icon: ArrowUpRight, description: "Pipeline, market position" },
];

const overallScore = Math.round(
  Object.values(scorecard).reduce((a, b) => a + b, 0) / Object.values(scorecard).length
);

// The top 4 primary metrics, displayed large in the hero
const heroMetrics = [
  { label: "Annual Revenue", value: "$2.85M", change: "+18.3%", context: "year over year", primary: true },
  { label: "Active Clients", value: "74", change: "+12.1%", context: "vs prior quarter", primary: false },
  { label: "Active Caregivers", value: "48", change: "+8.5%", context: "vs prior quarter", primary: false },
  { label: "Caregiver Retention", value: "78.4%", change: "+13.4 pts", context: "above industry avg", primary: false },
];

// Secondary stats strip below charts
const secondaryStats = executiveKPIs.slice(4);

export default function ExecutiveOverviewPage() {
  return (
    <div className="flex flex-col gap-6">

      {/* ── PARTNERSHIP CONTEXT ──────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-6 bg-[#f5f0fb] border border-[#e2daf0] rounded-xl px-5 py-4">
        <div className="flex-1">
          <p className="text-[10px] font-bold text-[#5A378C] uppercase tracking-widest mb-1.5">
            Pallas Care × Data Analytics Partnership
          </p>
          <p className="text-[11px] text-[#6b6378] leading-relaxed">
            This platform illustrates what a fully integrated analytics system would surface for Pallas Care
            built around your mission of aging-in-place, workforce quality, and high-touch culturally competent care.
            All metrics are calibrated to LA County premium non-medical home care industry benchmarks.
          </p>
        </div>
        <div className="flex-shrink-0 text-right border-l border-[#e2daf0] pl-5">
          <p className="text-[10px] font-semibold text-[#9b92a8] uppercase tracking-wide mb-1">Benchmark Sources</p>
          <p className="text-[10px] text-[#6b6378]">PHI National Workforce Data</p>
          <p className="text-[10px] text-[#6b6378]">NAHC Industry Sourcebook</p>
          <p className="text-[10px] text-[#6b6378]">LA County DHS · CMS Data</p>
        </div>
      </div>

      {/* ── HERO: Primary KPIs with real visual hierarchy ──────────────── */}
      <div className="bg-white rounded-2xl border border-[#e2daf0] shadow-sm overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#e2daf0]">
          {heroMetrics.map((m, i) => (
            <div key={m.label} className={`px-6 py-6 ${i === 0 ? "bg-[#5A378C]" : "bg-white"}`}>
              <p className={`text-[11px] font-semibold uppercase tracking-widest ${i === 0 ? "text-[#d6c2ef]" : "text-[#9b92a8]"}`}>
                {m.label}
              </p>
              <p className={`mt-2 leading-none font-bold tracking-tight ${i === 0 ? "text-white text-5xl" : "text-[#16121e] text-4xl"}`}>
                {m.value}
              </p>
              <div className={`flex items-center gap-2 mt-3`}>
                <div className={`flex items-center gap-1 text-sm font-semibold ${i === 0 ? "text-emerald-300" : "text-emerald-600"}`}>
                  <ArrowUp size={13} />
                  {m.change}
                </div>
                <span className={`text-xs ${i === 0 ? "text-[#b894e3]" : "text-[#9b92a8]"}`}>{m.context}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Revenue Chart + Scorecard ──────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between pb-3">
            <div>
              <CardTitle>Revenue Trend</CardTitle>
              <CardSubtitle>Monthly actuals vs. target · Mar 2025 – Feb 2026</CardSubtitle>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-0.5 rounded-full bg-[#5A378C]" />
                <span className="text-[11px] text-[#6b6378]">Revenue</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-0" style={{ borderTop: "2px dashed #d6c2ef" }} />
                <span className="text-[11px] text-[#6b6378]">Target</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <RevenueChart data={revenueTimeSeries} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Performance Scorecard</CardTitle>
                <CardSubtitle>Composite across 5 dimensions</CardSubtitle>
              </div>
              <div className="flex flex-col items-end flex-shrink-0">
                <span className="text-3xl font-bold leading-none" style={{ color: scoreBarColor(overallScore) }}>
                  {overallScore}
                </span>
                <span className="text-[10px] text-[#9b92a8] mt-0.5 font-medium tracking-wide uppercase">Overall</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0 flex flex-col gap-3.5">
            {scorecardDimensions.map(({ label, score, icon: Icon, description }) => (
              <div key={label} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon size={13} className="text-[#9975c8] flex-shrink-0" />
                    <span className="text-xs font-medium text-[#16121e]">{label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={scoreBadgeVariant(score)} className="text-[10px] px-1.5 py-0 leading-5">
                      {scoreLabel(score)}
                    </Badge>
                    <span className="text-xs font-bold tabular-nums w-6 text-right" style={{ color: scoreBarColor(score) }}>
                      {score}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[#f0ebfa] overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${score}%`, backgroundColor: scoreBarColor(score) }} />
                </div>
                <p className="text-[10px] text-[#9b92a8] leading-tight">{description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* ── Client Growth + Satisfaction ──────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Active Client Growth</CardTitle>
                <CardSubtitle>Headcount trend · Mar 2025 – Feb 2026</CardSubtitle>
              </div>
              <Badge variant="default" className="flex-shrink-0">74 Active</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-1">
            <ClientGrowthChart data={clientGrowthSeries} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Client Satisfaction vs. Benchmark</CardTitle>
                <CardSubtitle>Quarterly rating vs. industry · out of 5.0</CardSubtitle>
              </div>
              <Badge variant="success" className="flex-shrink-0">4.71 / 5.0</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-1">
            <SatisfactionChart data={satisfactionTrend} />
          </CardContent>
        </Card>
      </div>

      {/* ── Secondary Stats Row ──────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-[#e2daf0] shadow-sm">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#e2daf0]">
          {secondaryStats.map((metric) => {
            const isPositive = metric.change > 0;
            return (
              <div key={metric.label} className="px-5 py-4">
                <p className="text-[10px] font-semibold text-[#9b92a8] uppercase tracking-widest">{metric.label}</p>
                <p className="text-xl font-bold text-[#16121e] mt-1.5 leading-none">{metric.formatted}</p>
                <p className={`text-xs mt-1.5 font-semibold ${isPositive ? "text-emerald-600" : "text-red-500"}`}>
                  {isPositive ? "+" : ""}{metric.change.toFixed(1)}%
                  <span className="font-normal text-[#9b92a8] ml-1">{metric.changeLabel}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
