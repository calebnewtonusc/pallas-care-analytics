import { formatCurrency, formatPercent } from "@/lib/utils";

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string; dataKey: string }>;
  label?: string;
  formatType?: "currency" | "percent" | "number" | "hours";
}

export function ChartTooltip({ active, payload, label, formatType = "number" }: TooltipProps) {
  if (!active || !payload?.length) return null;

  function fmt(v: number) {
    if (formatType === "currency") return formatCurrency(v);
    if (formatType === "percent") return formatPercent(v);
    if (formatType === "hours") return `${v.toLocaleString()}h`;
    return v.toLocaleString();
  }

  return (
    <div className="bg-white border border-[#e2daf0] rounded-xl shadow-lg px-4 py-3 text-sm min-w-[160px]">
      <p className="font-semibold text-[#16121e] mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center justify-between gap-4 py-0.5">
          <div className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-[#6b6378] text-xs capitalize">
              {entry.name.replace(/_/g, " ")}
            </span>
          </div>
          <span className="font-semibold text-[#16121e] text-xs">{fmt(entry.value)}</span>
        </div>
      ))}
    </div>
  );
}
