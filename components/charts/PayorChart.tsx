"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { ChartTooltip } from "@/components/charts/ChartTooltip";
import { formatCurrency } from "@/lib/utils";

interface PayorData {
  payor: string;
  percentage: number;
  revenue: number;
}

interface PayorChartProps {
  data: PayorData[];
}

const PAYOR_COLORS = ["#5A378C", "#9965d4", "#b894e3", "#d6c2ef"];

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; payload: PayorData; color: string; dataKey: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div className="bg-white border border-[#e2daf0] rounded-xl shadow-lg px-4 py-3 text-sm min-w-[200px]">
      <p className="font-semibold text-[#16121e] mb-2 text-xs">{item.payor}</p>
      <div className="flex items-center justify-between gap-4 py-0.5">
        <div className="flex items-center gap-2">
          <div
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: payload[0].color }}
          />
          <span className="text-[#6b6378] text-xs">Revenue Share</span>
        </div>
        <span className="font-semibold text-[#16121e] text-xs">{item.percentage}%</span>
      </div>
      <div className="flex items-center justify-between gap-4 py-0.5">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 bg-transparent" />
          <span className="text-[#6b6378] text-xs">Revenue</span>
        </div>
        <span className="font-semibold text-[#16121e] text-xs">{formatCurrency(item.revenue, true)}</span>
      </div>
    </div>
  );
}

export function PayorChart({ data }: PayorChartProps) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 0, right: 48, left: 8, bottom: 0 }}
        barCategoryGap="24%"
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#f0ebfa"
          horizontal={false}
        />
        <XAxis
          type="number"
          tickFormatter={(v: number) => `${v}%`}
          tick={{ fontSize: 11, fill: "#6b6378" }}
          tickLine={false}
          axisLine={false}
          domain={[0, 80]}
        />
        <YAxis
          type="category"
          dataKey="payor"
          tick={{ fontSize: 11, fill: "#4a3f5c" }}
          tickLine={false}
          axisLine={false}
          width={172}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f5f0fb", opacity: 0.5 }} />
        <Bar dataKey="percentage" radius={[0, 4, 4, 0]} maxBarSize={22}>
          {data.map((entry, index) => (
            <Cell
              key={entry.payor}
              fill={PAYOR_COLORS[index % PAYOR_COLORS.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
