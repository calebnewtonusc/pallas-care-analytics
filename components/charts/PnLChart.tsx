"use client";

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartTooltip } from "@/components/charts/ChartTooltip";
import type { TimeSeriesPoint } from "@/lib/data/types";

interface PnLChartProps {
  data: TimeSeriesPoint[];
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string; dataKey: string }>;
  label?: string;
}) {
  return (
    <ChartTooltip
      active={active}
      payload={payload}
      label={label}
      formatType="currency"
    />
  );
}

const legendItems = [
  { color: "#b894e3", label: "Revenue" },
  { color: "#e2daf0", label: "COGS" },
  { color: "#5A378C", label: "Net Income", isLine: true },
];

export function PnLChart({ data }: PnLChartProps) {
  return (
    <div className="w-full">
      {/* Custom legend */}
      <div className="flex items-center gap-5 mb-4 px-1">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            {item.isLine ? (
              <div className="flex items-center gap-0.5">
                <div className="w-3 h-0.5 rounded-full" style={{ backgroundColor: item.color }} />
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                <div className="w-3 h-0.5 rounded-full" style={{ backgroundColor: item.color }} />
              </div>
            ) : (
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
            )}
            <span className="text-xs text-[#6b6378]">{item.label}</span>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart
          data={data}
          margin={{ top: 4, right: 16, left: 8, bottom: 0 }}
          barCategoryGap="28%"
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f0ebfa"
            vertical={false}
          />
          <XAxis
            dataKey="period"
            tick={{ fontSize: 11, fill: "#6b6378" }}
            tickLine={false}
            axisLine={false}
            interval={0}
          />
          <YAxis
            tickFormatter={(v: number) =>
              v >= 1000 ? `$${(v / 1000).toFixed(0)}K` : `$${v}`
            }
            tick={{ fontSize: 11, fill: "#6b6378" }}
            tickLine={false}
            axisLine={false}
            width={52}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "#f5f0fb", opacity: 0.5 }}
          />
          <Bar
            dataKey="revenue"
            name="Revenue"
            stackId="financials"
            fill="#b894e3"
            radius={[0, 0, 0, 0]}
            maxBarSize={40}
          />
          <Bar
            dataKey="cogs"
            name="COGS"
            stackId="financials"
            fill="#e2daf0"
            radius={[3, 3, 0, 0]}
            maxBarSize={40}
          />
          <Line
            type="monotone"
            dataKey="netIncome"
            name="Net Income"
            stroke="#5A378C"
            strokeWidth={2.5}
            dot={{ fill: "#5A378C", r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: "#5A378C", strokeWidth: 0 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
