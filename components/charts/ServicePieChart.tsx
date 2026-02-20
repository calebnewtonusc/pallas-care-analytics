"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartTooltip } from "@/components/charts/ChartTooltip";
import { formatCurrency, formatPercent } from "@/lib/utils";
import type { ServiceBreakdown } from "@/lib/data/types";

interface ServicePieChartProps {
  data: ServiceBreakdown[];
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: ServiceBreakdown }>;
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <ChartTooltip
      active={active}
      payload={[
        {
          name: item.name,
          value: item.value,
          color: item.color,
          dataKey: "value",
        },
      ]}
      label={item.name}
      formatType="currency"
    />
  );
}

export function ServicePieChart({ data }: ServicePieChartProps) {
  return (
    <div className="w-full flex flex-col items-center">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={56}
            outerRadius={88}
            paddingAngle={2}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend rows */}
      <div className="w-full mt-2 space-y-0">
        {data.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between py-2 border-b border-[#f0ebfa] last:border-0 group"
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-[#4a3f5c] font-medium group-hover:text-[#5A378C] transition-colors">
                {item.name}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-[#16121e]">
                {formatCurrency(item.value, true)}
              </span>
              <span className="text-[11px] text-[#9965d4] font-medium w-10 text-right">
                {formatPercent(item.percentage, 0)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
