"use client";

import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ChartTooltip } from "@/components/charts/ChartTooltip";
import type { TimeSeriesPoint } from "@/lib/data/types";

interface SchedulingChartProps {
  data: TimeSeriesPoint[];
}

export function SchedulingChart({ data }: SchedulingChartProps) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <ComposedChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
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
          yAxisId="fulfillment"
          orientation="left"
          domain={[92, 100]}
          tickFormatter={(v: number) => `${v}%`}
          tick={{ fontSize: 11, fill: "#9b92a8", fontFamily: "inherit" }}
          axisLine={false}
          tickLine={false}
          width={42}
        />
        <YAxis
          yAxisId="callouts"
          orientation="right"
          domain={[0, 8]}
          tickFormatter={(v: number) => `${v}%`}
          tick={{ fontSize: 11, fill: "#9b92a8", fontFamily: "inherit" }}
          axisLine={false}
          tickLine={false}
          width={36}
        />
        <Tooltip
          content={<ChartTooltip formatType="percent" />}
          cursor={{ stroke: "#e2daf0", strokeWidth: 1 }}
        />
        <Bar
          yAxisId="callouts"
          dataKey="callouts"
          name="Callout Rate"
          fill="#f3e8ff"
          stroke="#d6c2ef"
          strokeWidth={1}
          radius={[2, 2, 0, 0]}
          maxBarSize={16}
        />
        <Line
          yAxisId="fulfillment"
          type="monotone"
          dataKey="fulfillment"
          name="Fulfillment"
          stroke="#5A378C"
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 5, fill: "#5A378C", strokeWidth: 2, stroke: "#fff" }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
