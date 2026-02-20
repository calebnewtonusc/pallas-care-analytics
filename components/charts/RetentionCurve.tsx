"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { ChartTooltip } from "@/components/charts/ChartTooltip";
import type { TimeSeriesPoint } from "@/lib/data/types";

interface RetentionCurveProps {
  data: TimeSeriesPoint[];
}

export function RetentionCurve({ data }: RetentionCurveProps) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="retentionGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#5A378C" stopOpacity={0.22} />
            <stop offset="95%" stopColor="#5A378C" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0ebfa" vertical={false} />
        <XAxis
          dataKey="period"
          tick={{ fontSize: 10, fill: "#9b92a8", fontFamily: "inherit" }}
          axisLine={false}
          tickLine={false}
          dy={6}
          interval={1}
        />
        <YAxis
          domain={[50, 100]}
          tickFormatter={(v: number) => `${v}%`}
          tick={{ fontSize: 11, fill: "#9b92a8", fontFamily: "inherit" }}
          axisLine={false}
          tickLine={false}
          width={42}
          ticks={[50, 60, 70, 80, 90, 100]}
        />
        <Tooltip
          content={<ChartTooltip formatType="percent" />}
          cursor={{ stroke: "#e2daf0", strokeWidth: 1 }}
        />
        <ReferenceLine
          y={61}
          stroke="#b894e3"
          strokeDasharray="4 3"
          strokeWidth={1}
          strokeOpacity={0.6}
          label={{
            value: "61% at 36 mo.",
            position: "insideBottomRight",
            fontSize: 10,
            fill: "#9b92a8",
            fontFamily: "inherit",
          }}
        />
        <Area
          type="monotone"
          dataKey="retained"
          name="Retained"
          stroke="#5A378C"
          strokeWidth={2.5}
          fill="url(#retentionGradient)"
          dot={{ r: 3.5, fill: "#5A378C", strokeWidth: 2, stroke: "#fff" }}
          activeDot={{ r: 5.5, fill: "#5A378C", strokeWidth: 2, stroke: "#fff" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
