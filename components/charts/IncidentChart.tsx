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
import type { TimeSeriesPoint } from "@/lib/data/types";

interface IncidentChartProps {
  data: TimeSeriesPoint[];
}

export function IncidentChart({ data }: IncidentChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: -4, bottom: 0 }} barCategoryGap="30%">
        <CartesianGrid strokeDasharray="3 3" stroke="#f0ebfa" vertical={false} />
        <XAxis
          dataKey="period"
          tick={{ fontSize: 11, fill: "#9b92a8", fontFamily: "inherit" }}
          axisLine={false}
          tickLine={false}
          dy={6}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 11, fill: "#9b92a8", fontFamily: "inherit" }}
          axisLine={false}
          tickLine={false}
          width={24}
        />
        <Tooltip
          content={<ChartTooltip formatType="number" />}
          cursor={{ fill: "#f5f0fb" }}
        />
        <Bar dataKey="falls" name="Falls" stackId="incidents" fill="#5A378C" radius={[0, 0, 0, 0]} maxBarSize={36} />
        <Bar dataKey="medication" name="Medication" stackId="incidents" fill="#a87dd4" maxBarSize={36} />
        <Bar dataKey="other" name="Other" stackId="incidents" fill="#d6c2ef" radius={[3, 3, 0, 0]} maxBarSize={36} />
      </BarChart>
    </ResponsiveContainer>
  );
}
