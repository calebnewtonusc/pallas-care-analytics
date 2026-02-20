"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ChartTooltip } from "@/components/charts/ChartTooltip";
import type { TimeSeriesPoint } from "@/lib/data/types";

interface RetentionChartProps {
  data: TimeSeriesPoint[];
}

function CustomLegend() {
  return (
    <div className="flex items-center gap-5 text-xs text-[#6b6378] mt-1">
      <div className="flex items-center gap-1.5">
        <svg width="24" height="10">
          <line x1="0" y1="5" x2="24" y2="5" stroke="#5A378C" strokeWidth="2.5" />
          <circle cx="12" cy="5" r="3.5" fill="#5A378C" stroke="#fff" strokeWidth="2" />
        </svg>
        <span className="font-medium text-[#16121e]">Pallas Care</span>
      </div>
      <div className="flex items-center gap-1.5">
        <svg width="24" height="10">
          <line
            x1="0"
            y1="5"
            x2="24"
            y2="5"
            stroke="#b894e3"
            strokeWidth="2"
            strokeDasharray="5 3"
          />
        </svg>
        <span>Industry Average</span>
      </div>
    </div>
  );
}

export function RetentionChart({ data }: RetentionChartProps) {
  return (
    <div>
      <CustomLegend />
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data} margin={{ top: 16, right: 12, left: -4, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0ebfa" vertical={false} />
          <XAxis
            dataKey="period"
            tick={{ fontSize: 11, fill: "#9b92a8", fontFamily: "inherit" }}
            axisLine={false}
            tickLine={false}
            dy={6}
          />
          <YAxis
            domain={[60, 85]}
            tickFormatter={(v: number) => `${v}%`}
            tick={{ fontSize: 11, fill: "#9b92a8", fontFamily: "inherit" }}
            axisLine={false}
            tickLine={false}
            width={40}
            ticks={[60, 65, 70, 75, 80, 85]}
          />
          <Tooltip
            content={<ChartTooltip formatType="percent" />}
            cursor={{ stroke: "#e2daf0", strokeWidth: 1 }}
          />
          <Line
            type="monotone"
            dataKey="industry"
            name="Industry Avg"
            stroke="#b894e3"
            strokeWidth={2}
            strokeDasharray="6 4"
            dot={false}
            activeDot={{ r: 4, fill: "#b894e3", strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="pallas"
            name="Pallas Care"
            stroke="#5A378C"
            strokeWidth={2.5}
            dot={{ r: 3.5, fill: "#5A378C", strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 5.5, fill: "#5A378C", strokeWidth: 2, stroke: "#fff" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
