import {
  revenueByService,
  monthlyPnL,
  costStructure,
  billingRates,
  payorMix,
  financialKPIs,
} from "@/lib/data/financial";
import { Card, CardHeader, CardContent, CardTitle, CardSubtitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatPercent, getChangeClass, getChangePrefix } from "@/lib/utils";
import { PnLChart } from "@/components/charts/PnLChart";
import { ServicePieChart } from "@/components/charts/ServicePieChart";
import { PayorChart } from "@/components/charts/PayorChart";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Percent,
  Clock,
  Users,
  CreditCard,
  Calendar,
} from "lucide-react";

// ─── Inline KPI card (server component) ──────────────────────────────────────

interface FinKPICardProps {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ReactNode;
  invertChange?: boolean; // true = negative change is good (e.g. CAC, DSO)
}

function FinKPICard({
  label,
  value,
  change,
  changeLabel,
  icon,
  invertChange = false,
}: FinKPICardProps) {
  const isGood = invertChange ? change <= 0 : change >= 0;
  const colorClass = isGood ? "text-emerald-600" : "text-red-500";
  const prefix = getChangePrefix(change);
  const TrendIcon = change > 0 ? TrendingUp : TrendingDown;

  return (
    <div className="bg-white rounded-xl border border-[#e2daf0] shadow-sm p-5 flex flex-col gap-3 hover:shadow-md hover:border-[#b894e3] transition-all duration-200">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-[#6b6378] uppercase tracking-wide leading-tight">
          {label}
        </p>
        <div className="w-8 h-8 rounded-lg bg-[#f5f0fb] flex items-center justify-center text-[#9965d4]">
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold text-[#16121e] leading-none tracking-tight">{value}</p>
      <div className={`flex items-center gap-1.5 ${colorClass}`}>
        <TrendIcon size={13} className="flex-shrink-0" />
        <span className="text-xs font-semibold">
          {prefix}
          {Math.abs(change).toFixed(1)}%
        </span>
        <span className="text-xs text-[#9b92a8]">{changeLabel}</span>
      </div>
    </div>
  );
}

// ─── YoY change indicator ─────────────────────────────────────────────────────

function YoYBadge({ value }: { value: number }) {
  const isPositive = value > 0;
  const cls = isPositive ? "text-red-500" : "text-emerald-600"; // cost going up is bad
  const Icon = isPositive ? TrendingUp : TrendingDown;
  const prefix = getChangePrefix(value);
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium ${cls}`}>
      <Icon size={11} />
      {prefix}
      {Math.abs(value).toFixed(1)}% YoY
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FinancialPage() {
  const kpis = financialKPIs;

  // Derive total revenue from billingRates for context
  const totalRevenue = billingRates.reduce((sum, r) => sum + r.revenue, 0);
  const totalHours = billingRates.reduce((sum, r) => sum + r.hours, 0);

  return (
    <div className="space-y-6 pb-8">
      {/* ── ROW 1: Top 4 KPI Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <FinKPICard
          label="Gross Margin"
          value={formatPercent(kpis.grossMargin)}
          change={kpis.grossMarginChange}
          changeLabel="vs prior year"
          icon={<Percent size={15} />}
        />
        <FinKPICard
          label="Net Margin"
          value={formatPercent(kpis.netMargin)}
          change={kpis.netMarginChange}
          changeLabel="vs prior year"
          icon={<DollarSign size={15} />}
        />
        <FinKPICard
          label="Revenue / Hour"
          value={formatCurrency(kpis.revenuePerHour)}
          change={kpis.revenuePerHourChange}
          changeLabel="vs prior year"
          icon={<Clock size={15} />}
        />
        <FinKPICard
          label="Client LTV"
          value={formatCurrency(kpis.clientLifetimeValue, true)}
          change={kpis.clientLifetimeValueChange}
          changeLabel="vs prior year"
          icon={<Users size={15} />}
        />
      </div>

      {/* ── ROW 2: PnL Chart + Revenue by Service ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* PnL Chart — 2/3 width */}
        <Card className="col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Profit &amp; Loss — 12 Months</CardTitle>
                <CardSubtitle>Revenue vs. COGS vs. Net Income · Mar 2025 – Feb 2026</CardSubtitle>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-xs text-[#6b6378]">Avg Net Margin</p>
                  <p className="text-sm font-bold text-[#5A378C]">{formatPercent(kpis.netMargin)}</p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <PnLChart data={monthlyPnL} />
          </CardContent>
        </Card>

        {/* Revenue by Service — 1/3 width */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Revenue by Service</CardTitle>
                <CardSubtitle>
                  TTM · {formatCurrency(totalRevenue, true)} total
                </CardSubtitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-1">
            <ServicePieChart data={revenueByService} />
          </CardContent>
        </Card>
      </div>

      {/* ── ROW 3: Cost Structure + Payor Mix ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Cost Structure Table */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Cost Structure</CardTitle>
                <CardSubtitle>Annualized spend by category · % of gross revenue</CardSubtitle>
              </div>
              <Badge variant="ghost" className="text-[10px]">
                9 categories
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0 px-0 pb-0">
            <div className="overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-12 px-5 py-2 bg-[#f8f6fc] border-y border-[#e2daf0]">
                <span className="col-span-5 text-[10px] font-semibold text-[#6b6378] uppercase tracking-wide">
                  Category
                </span>
                <span className="col-span-3 text-[10px] font-semibold text-[#6b6378] uppercase tracking-wide text-right">
                  Amount
                </span>
                <span className="col-span-2 text-[10px] font-semibold text-[#6b6378] uppercase tracking-wide text-right">
                  % Rev
                </span>
                <span className="col-span-2 text-[10px] font-semibold text-[#6b6378] uppercase tracking-wide text-right">
                  YoY
                </span>
              </div>

              {/* Rows */}
              {costStructure.map((row, idx) => (
                <div
                  key={row.category}
                  className={`grid grid-cols-12 px-5 py-2.5 border-b border-[#f0ebfa] last:border-0 hover:bg-[#faf8fd] transition-colors ${
                    idx === 0 ? "border-t-0" : ""
                  }`}
                >
                  <div className="col-span-5 flex items-center gap-2">
                    {/* Color bar proportional to % */}
                    <div
                      className="w-1 rounded-full flex-shrink-0"
                      style={{
                        height: "20px",
                        backgroundColor: `hsl(${270 - idx * 18}, ${50 - idx * 2}%, ${60 + idx * 3}%)`,
                        opacity: 0.7,
                      }}
                    />
                    <span className="text-xs text-[#16121e] font-medium leading-tight">
                      {row.category}
                    </span>
                  </div>
                  <div className="col-span-3 flex items-center justify-end">
                    <span className="text-xs font-semibold text-[#16121e]">
                      {formatCurrency(row.amount, true)}
                    </span>
                  </div>
                  <div className="col-span-2 flex items-center justify-end">
                    <span className="text-xs text-[#6b6378]">
                      {formatPercent(row.percentage, 0)}
                    </span>
                  </div>
                  <div className="col-span-2 flex items-center justify-end">
                    <YoYBadge value={row.yoy} />
                  </div>
                </div>
              ))}

              {/* Totals row */}
              <div className="grid grid-cols-12 px-5 py-3 bg-[#f5f0fb] border-t border-[#e2daf0] rounded-b-xl">
                <span className="col-span-5 text-xs font-bold text-[#16121e]">Total Operating Costs</span>
                <span className="col-span-3 text-xs font-bold text-[#16121e] text-right">
                  {formatCurrency(
                    costStructure.reduce((s, r) => s + r.amount, 0),
                    true
                  )}
                </span>
                <span className="col-span-2 text-xs font-bold text-[#16121e] text-right">
                  {formatPercent(
                    costStructure.reduce((s, r) => s + r.percentage, 0),
                    0
                  )}
                </span>
                <span className="col-span-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payor Mix */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Payor Mix</CardTitle>
                <CardSubtitle>Revenue by payment source · % share of TTM revenue</CardSubtitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <PayorChart data={payorMix} />

            {/* Payor detail rows */}
            <div className="mt-4 space-y-0">
              {payorMix.map((p, idx) => {
                const colors = ["#5A378C", "#9965d4", "#b894e3", "#d6c2ef"];
                return (
                  <div
                    key={p.payor}
                    className="flex items-center justify-between py-2.5 border-b border-[#f0ebfa] last:border-0 hover:bg-[#faf8fd] -mx-1 px-1 rounded transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: colors[idx % colors.length] }}
                      />
                      <span className="text-xs text-[#4a3f5c] font-medium">{p.payor}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-semibold text-[#16121e]">
                        {formatCurrency(p.revenue, true)}
                      </span>
                      <span
                        className="text-xs font-bold w-9 text-right"
                        style={{ color: colors[idx % colors.length] }}
                      >
                        {p.percentage}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── ROW 4: Secondary KPIs + Billing Rates ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Secondary KPI cards — 1/3 width */}
        <div className="flex flex-col gap-4">
          {/* CAC */}
          <div className="bg-white rounded-xl border border-[#e2daf0] shadow-sm p-5 hover:shadow-md hover:border-[#b894e3] transition-all duration-200 flex-1">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium text-[#6b6378] uppercase tracking-wide">
                Client Acq. Cost
              </p>
              <div className="w-8 h-8 rounded-lg bg-[#f5f0fb] flex items-center justify-center text-[#9965d4]">
                <CreditCard size={15} />
              </div>
            </div>
            <p className="text-2xl font-bold text-[#16121e] leading-none tracking-tight mb-3">
              {formatCurrency(kpis.clientAcquisitionCost)}
            </p>
            <div className="flex items-center gap-1.5 text-emerald-600">
              <TrendingDown size={13} className="flex-shrink-0" />
              <span className="text-xs font-semibold">
                {Math.abs(kpis.clientAcquisitionCostChange).toFixed(1)}%
              </span>
              <span className="text-xs text-[#9b92a8]">vs prior year</span>
            </div>
            <p className="text-[11px] text-[#6b6378] mt-2 leading-tight">
              LTV:CAC ratio{" "}
              <span className="font-semibold text-[#5A378C]">
                {(kpis.clientLifetimeValue / kpis.clientAcquisitionCost).toFixed(1)}x
              </span>
            </p>
          </div>

          {/* DSO */}
          <div className="bg-white rounded-xl border border-[#e2daf0] shadow-sm p-5 hover:shadow-md hover:border-[#b894e3] transition-all duration-200 flex-1">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium text-[#6b6378] uppercase tracking-wide">
                Days Sales Outstanding
              </p>
              <div className="w-8 h-8 rounded-lg bg-[#f5f0fb] flex items-center justify-center text-[#9965d4]">
                <Calendar size={15} />
              </div>
            </div>
            <p className="text-2xl font-bold text-[#16121e] leading-none tracking-tight mb-3">
              {kpis.arDaysSales} days
            </p>
            <div className="flex items-center gap-1.5 text-emerald-600">
              <TrendingDown size={13} className="flex-shrink-0" />
              <span className="text-xs font-semibold">
                {Math.abs(kpis.arDaysSalesChange).toFixed(0)} days
              </span>
              <span className="text-xs text-[#9b92a8]">vs prior year</span>
            </div>
            <p className="text-[11px] text-[#6b6378] mt-2 leading-tight">
              Excellent AR health — industry avg 28 days
            </p>
          </div>
        </div>

        {/* Billing Rates Table — 2/3 width */}
        <Card className="col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Billing Rates by Service</CardTitle>
                <CardSubtitle>
                  Hourly rates, volume &amp; revenue generated · TTM through Feb 2026
                </CardSubtitle>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-[#6b6378]">Total hours billed</p>
                <p className="text-sm font-bold text-[#5A378C]">
                  {totalHours.toLocaleString()}h
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0 px-0 pb-0">
            {/* Table header */}
            <div className="grid grid-cols-12 px-5 py-2 bg-[#f8f6fc] border-y border-[#e2daf0]">
              <span className="col-span-5 text-[10px] font-semibold text-[#6b6378] uppercase tracking-wide">
                Service Line
              </span>
              <span className="col-span-2 text-[10px] font-semibold text-[#6b6378] uppercase tracking-wide text-right">
                Rate / hr
              </span>
              <span className="col-span-3 text-[10px] font-semibold text-[#6b6378] uppercase tracking-wide text-right">
                Hours Billed
              </span>
              <span className="col-span-2 text-[10px] font-semibold text-[#6b6378] uppercase tracking-wide text-right">
                Revenue
              </span>
            </div>

            {/* Rows */}
            {billingRates.map((row, idx) => {
              const shareOfTotal = (row.revenue / totalRevenue) * 100;
              return (
                <div
                  key={row.service}
                  className="grid grid-cols-12 px-5 py-3 border-b border-[#f0ebfa] last:border-0 hover:bg-[#faf8fd] transition-colors items-center"
                >
                  <div className="col-span-5 flex items-center gap-3">
                    <div className="flex-1">
                      <p className="text-xs font-medium text-[#16121e] leading-tight">
                        {row.service}
                      </p>
                      {/* Revenue share bar */}
                      <div className="mt-1.5 h-1 bg-[#f0ebfa] rounded-full overflow-hidden w-full">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${shareOfTotal}%`,
                            backgroundColor: ["#5A378C", "#9965d4", "#b894e3", "#c9aae8", "#d6c2ef"][
                              idx % 5
                            ],
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center justify-end">
                    <span className="text-xs font-bold text-[#5A378C]">
                      ${row.rate}
                    </span>
                  </div>
                  <div className="col-span-3 flex items-center justify-end">
                    <span className="text-xs text-[#16121e] font-medium">
                      {row.hours.toLocaleString()}h
                    </span>
                  </div>
                  <div className="col-span-2 flex items-center justify-end">
                    <span className="text-xs font-semibold text-[#16121e]">
                      {formatCurrency(row.revenue, true)}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Totals row */}
            <div className="grid grid-cols-12 px-5 py-3 bg-[#f5f0fb] border-t border-[#e2daf0] rounded-b-xl">
              <span className="col-span-5 text-xs font-bold text-[#16121e]">Total</span>
              <div className="col-span-2 flex items-center justify-end">
                <span className="text-xs font-bold text-[#5A378C]">
                  ${(totalRevenue / totalHours).toFixed(0)} avg
                </span>
              </div>
              <span className="col-span-3 text-xs font-bold text-[#16121e] text-right">
                {totalHours.toLocaleString()}h
              </span>
              <span className="col-span-2 text-xs font-bold text-[#16121e] text-right">
                {formatCurrency(totalRevenue, true)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
