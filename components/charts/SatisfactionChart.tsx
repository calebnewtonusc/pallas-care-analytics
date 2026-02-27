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

interface SatisfactionChartProps {
  data: TimeSeriesPoint[];
}

function CustomLegend() {
  return (
    <div className="flex items-center gap-5 justify-end pr-2 pb-1">
      <div className="flex items-center gap-1.5">
        <div className="w-6 h-0.5 bg-[#5A378C] rounded-full" />
        <span className="text-[11px] text-[#6b6378] font-medium">Pallas Care</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div
          className="w-6 h-0.5 rounded-full"
          style={{
            background: "repeating-linear-gradient(90deg, #d6c2ef 0, #d6c2ef 4px, transparent 4px, transparent 8px)",
          }}
        />
        <span className="text-[11px] text-[#6b6378] font-medium">Industry Benchmark</span>
      </div>
    </div>
  );
}

export function SatisfactionChart({ data }: SatisfactionChartProps) {
  return (
    <div className="flex flex-col gap-2">
      <CustomLegend />
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 4, right: 8, left: -8, bottom: 0 }}>
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
            domain={[3.8, 5.0]}
            tickFormatter={(v) => v.toFixed(1)}
            tick={{ fontSize: 11, fill: "#9b92a8", fontFamily: "inherit" }}
            axisLine={false}
            tickLine={false}
            width={36}
          />
          <Tooltip
            content={<ChartTooltip formatType="number" />}
            cursor={{ stroke: "#e2daf0", strokeWidth: 1 }}
          />
          <Line
            type="monotone"
            dataKey="benchmark"
            name="Industry Benchmark"
            stroke="#d6c2ef"
            strokeWidth={2}
            strokeDasharray="5 4"
            dot={{ r: 3, fill: "#d6c2ef", strokeWidth: 1.5, stroke: "#fff" }}
            activeDot={{ r: 4.5, fill: "#d6c2ef", strokeWidth: 2, stroke: "#fff" }}
          />
          <Line
            type="monotone"
            dataKey="value"
            name="Pallas Care"
            stroke="#5A378C"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#5A378C", strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 5.5, fill: "#5A378C", strokeWidth: 2, stroke: "#fff" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
