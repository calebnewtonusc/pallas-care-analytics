import { cn, getChangeClass, getChangePrefix } from "@/lib/utils";
import type { KPIMetric } from "@/lib/data/types";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPICardProps {
  metric: KPIMetric;
  className?: string;
}

export function KPICard({ metric, className }: KPICardProps) {
  const isPositive = metric.change > 0;
  const isNeutral = metric.change === 0;
  const changeClass = getChangeClass(metric.change);
  const prefix = getChangePrefix(metric.change);

  const ChangeIcon = isNeutral ? Minus : isPositive ? TrendingUp : TrendingDown;

  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-[#e2daf0] shadow-sm p-5 flex flex-col gap-3",
        "hover:shadow-md hover:border-[#b894e3] transition-all duration-200",
        className
      )}
    >
      <p className="text-xs font-medium text-[#6b6378] uppercase tracking-wide leading-tight">
        {metric.label}
      </p>
      <p className="text-2xl font-bold text-[#16121e] leading-none tracking-tight">
        {metric.formatted}
      </p>
      <div className={cn("flex items-center gap-1.5", changeClass)}>
        <ChangeIcon size={13} className="flex-shrink-0" />
        <span className="text-xs font-semibold">
          {prefix}{Math.abs(metric.change).toFixed(1)}%
        </span>
        <span className="text-xs text-[#9b92a8]">{metric.changeLabel}</span>
      </div>
    </div>
  );
}

interface StatRowProps {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  className?: string;
}

export function StatRow({ label, value, change, changeLabel, className }: StatRowProps) {
  const changeClass = change !== undefined ? getChangeClass(change) : "";
  const prefix = change !== undefined ? getChangePrefix(change) : "";

  return (
    <div className={cn("flex items-center justify-between py-2.5 border-b border-[#f0ebfa] last:border-0", className)}>
      <span className="text-sm text-[#4a3f5c]">{label}</span>
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-[#16121e]">{value}</span>
        {change !== undefined && (
          <span className={cn("text-xs font-medium", changeClass)}>
            {prefix}{Math.abs(change).toFixed(1)}%{changeLabel ? ` ${changeLabel}` : ""}
          </span>
        )}
      </div>
    </div>
  );
}
