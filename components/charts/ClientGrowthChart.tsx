"use client";

import dynamic from "next/dynamic";
import { ChartTooltip } from "@/components/charts/ChartTooltip";
import type { TimeSeriesPoint } from "@/lib/data/types";

const LineChart = dynamic(() => import("recharts").then((m) => m.LineChart), { ssr: false });
const Line = dynamic(() => import("recharts").then((m) => m.Line), { ssr: false });
const XAxis = dynamic(() => import("recharts").then((m) => m.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then((m) => m.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import("recharts").then((m) => m.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then((m) => m.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import("recharts").then((m) => m.ResponsiveContainer), { ssr: false });
const ReferenceLine = dynamic(() => import("recharts").then((m) => m.ReferenceLine), { ssr: false });

interface ClientGrowthChartProps {
  data: TimeSeriesPoint[];
}

export function ClientGrowthChart({ data }: ClientGrowthChartProps) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
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
          domain={[50, 80]}
          tickFormatter={(v) => String(v)}
          tick={{ fontSize: 11, fill: "#9b92a8", fontFamily: "inherit" }}
          axisLine={false}
          tickLine={false}
          width={36}
        />
        <Tooltip
          content={<ChartTooltip formatType="number" />}
          cursor={{ stroke: "#e2daf0", strokeWidth: 1 }}
        />
        <ReferenceLine
          y={74}
          stroke="#5A378C"
          strokeDasharray="4 3"
          strokeWidth={1}
          strokeOpacity={0.4}
          label={{
            value: "Current: 74",
            position: "insideTopRight",
            fontSize: 10,
            fill: "#5A378C",
            fontFamily: "inherit",
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          name="Active Clients"
          stroke="#5A378C"
          strokeWidth={2.5}
          dot={{ r: 3.5, fill: "#5A378C", strokeWidth: 2, stroke: "#fff" }}
          activeDot={{ r: 5.5, fill: "#5A378C", strokeWidth: 2, stroke: "#fff" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
