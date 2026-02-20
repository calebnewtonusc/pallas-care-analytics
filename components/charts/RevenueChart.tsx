"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartTooltip } from "@/components/charts/ChartTooltip";
import type { TimeSeriesPoint } from "@/lib/data/types";

interface RevenueChartProps {
  data: TimeSeriesPoint[];
}

function formatYAxis(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
        <defs>
          <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#5A378C" stopOpacity={0.18} />
            <stop offset="95%" stopColor="#5A378C" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#d6c2ef" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#d6c2ef" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#f0ebfa"
          vertical={false}
        />
        <XAxis
          dataKey="period"
          tick={{ fontSize: 11, fill: "#9b92a8", fontFamily: "inherit" }}
          axisLine={false}
          tickLine={false}
          dy={6}
        />
        <YAxis
          tickFormatter={formatYAxis}
          tick={{ fontSize: 11, fill: "#9b92a8", fontFamily: "inherit" }}
          axisLine={false}
          tickLine={false}
          width={52}
        />
        <Tooltip
          content={<ChartTooltip formatType="currency" />}
          cursor={{ stroke: "#e2daf0", strokeWidth: 1 }}
        />
        <Area
          type="monotone"
          dataKey="target"
          name="Target"
          stroke="#d6c2ef"
          strokeWidth={1.5}
          strokeDasharray="5 4"
          fill="url(#targetGradient)"
          dot={false}
          activeDot={{ r: 4, fill: "#d6c2ef", strokeWidth: 0 }}
        />
        <Area
          type="monotone"
          dataKey="value"
          name="Revenue"
          stroke="#5A378C"
          strokeWidth={2}
          fill="url(#revGradient)"
          dot={false}
          activeDot={{ r: 5, fill: "#5A378C", strokeWidth: 2, stroke: "#fff" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
