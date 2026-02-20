"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ChartTooltip } from "@/components/charts/ChartTooltip";

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
          {data.map((entry, index) => (
            <Cell key={`tenure-${index}`} fill={getBarColor(entry.percentage)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
