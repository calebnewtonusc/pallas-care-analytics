"use client";

import dynamic from "next/dynamic";
import { ChartTooltip } from "@/components/charts/ChartTooltip";

const BarChart = dynamic(() => import("recharts").then((m) => m.BarChart), { ssr: false });
const Bar = dynamic(() => import("recharts").then((m) => m.Bar), { ssr: false });
const XAxis = dynamic(() => import("recharts").then((m) => m.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then((m) => m.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import("recharts").then((m) => m.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then((m) => m.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import("recharts").then((m) => m.ResponsiveContainer), { ssr: false });
const Cell = dynamic(() => import("recharts").then((m) => m.Cell), { ssr: false });

interface TenureBand {
  band: string;
  count: number;
  percentage: number;
}

interface TenureChartProps {
  data: TenureBand[];
}

function getBarColor(percentage: number): string {
  if (percentage >= 20) return "#5A378C";
  if (percentage >= 15) return "#7c52b8";
  if (percentage >= 12) return "#9b72d0";
  return "#c4a8e8";
}

export function TenureBarChart({ data }: TenureChartProps) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 4, right: 16, left: 4, bottom: 4 }}
        barSize={18}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0ebfa" horizontal={false} />
        <XAxis
          type="number"
          tickFormatter={(v: number) => `${v}%`}
          tick={{ fontSize: 11, fill: "#9b92a8", fontFamily: "inherit" }}
          axisLine={false}
          tickLine={false}
          domain={[0, 30]}
        />
        <YAxis
          type="category"
          dataKey="band"
          tick={{ fontSize: 11, fill: "#6b6378", fontFamily: "inherit" }}
          axisLine={false}
          tickLine={false}
          width={80}
        />
        <Tooltip
          content={<ChartTooltip formatType="percent" />}
          cursor={{ fill: "#f5f0fb" }}
        />
        <Bar dataKey="percentage" name="Share of Team" radius={[0, 4, 4, 0]}>
          {data.map((entry) => (
            <Cell key={entry.band} fill={getBarColor(entry.percentage)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
