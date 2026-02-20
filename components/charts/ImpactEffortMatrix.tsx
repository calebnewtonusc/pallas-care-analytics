"use client";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { StrategicRecommendation } from "@/lib/data/types";

interface MatrixPoint {
  id: string;
  title: string;
  impact: number;
  effort: number;
  priority: string;
  category: string;
  timeframe: string;
}

interface ImpactEffortMatrixProps {
  data: MatrixPoint[];
  categoryColors: Record<string, string>;
}

// ─── Custom dot renderer that shows recommendation ID label ───────────────────

interface CustomDotProps {
  cx?: number;
  cy?: number;
  payload?: MatrixPoint;
  categoryColors: Record<string, string>;
}

function CustomDot({ cx = 0, cy = 0, payload, categoryColors }: CustomDotProps) {
  if (!payload) return null;
  const color = categoryColors[payload.category] ?? "#5A378C";
  const r = 20;

  return (
    <g>
      {/* Outer glow ring */}
      <circle
        cx={cx}
        cy={cy}
        r={r + 4}
        fill={color}
        fillOpacity={0.12}
      />
      {/* Main filled circle */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={color}
        stroke="white"
        strokeWidth={2.5}
        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))" }}
      />
      {/* ID label */}
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        fill="white"
        fontSize={11}
        fontWeight={700}
        fontFamily="inherit"
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        {payload.id}
      </text>
    </g>
  );
}

// ─── Custom tooltip ───────────────────────────────────────────────────────────

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: MatrixPoint }>;
  categoryColors: Record<string, string>;
  priorityColors: Record<string, string>;
}

function CustomTooltip({ active, payload, categoryColors, priorityColors }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const catColor = categoryColors[d.category] ?? "#5A378C";
  const priColor = priorityColors[d.priority] ?? "#6b7280";

  return (
    <div className="bg-white border border-[#e2daf0] rounded-xl shadow-xl px-4 py-3 text-sm max-w-[260px]">
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: catColor }}
        />
        <span className="font-bold text-[#16121e] text-xs">{d.id}</span>
        <span
          className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
          style={{ backgroundColor: `${priColor}18`, color: priColor }}
        >
          {d.priority}
        </span>
      </div>
      <p className="font-semibold text-[#16121e] text-xs leading-snug mb-2">{d.title}</p>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
        <span className="text-[#6b6378]">Impact</span>
        <span className="font-semibold text-[#16121e]">{d.impact}/10</span>
        <span className="text-[#6b6378]">Effort</span>
        <span className="font-semibold text-[#16121e]">{d.effort}/10</span>
        <span className="text-[#6b6378]">Category</span>
        <span className="font-semibold text-[#16121e]">{d.category}</span>
        <span className="text-[#6b6378]">Timeframe</span>
        <span className="font-semibold text-[#16121e]">{d.timeframe}</span>
      </div>
    </div>
  );
}

// ─── Quadrant background overlay (SVG drawn inside chart) ────────────────────
// We use a custom shape to draw background quadrant fills.
// Recharts doesn't support quadrant backgrounds natively, so we use a
// Customized component inside the ScatterChart.

// ─── Main component ───────────────────────────────────────────────────────────

const priorityColors: Record<string, string> = {
  Critical: "#16121e",
  High: "#5A378C",
  Medium: "#9b92a8",
  Low: "#c4b5d4",
};

export function ImpactEffortMatrix({ data, categoryColors }: ImpactEffortMatrixProps) {
  return (
    <div className="w-full">
      {/* Chart container with quadrant backgrounds rendered via CSS grid overlay */}
      <div className="relative">
        {/* Quadrant background grid, positioned to align with chart plot area */}
        {/* recharts default margins: top=5 right=5 bottom=5 left=10 (adjusted below) */}
        <div
          className="absolute pointer-events-none"
          style={{ top: 5, right: 5, bottom: 40, left: 52 }}
        >
          <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
            {/* top-left = Quick Wins */}
            <div className="bg-emerald-50 border-r border-b border-dashed border-[#c4b5d4] rounded-tl-sm" />
            {/* top-right = Major Projects */}
            <div className="bg-blue-50/60 border-b border-dashed border-[#c4b5d4] rounded-tr-sm" />
            {/* bottom-left = Fill-ins */}
            <div className="bg-gray-50 border-r border-dashed border-[#c4b5d4] rounded-bl-sm" />
            {/* bottom-right = Avoid */}
            <div className="bg-red-50/40 rounded-br-sm" />
          </div>
        </div>

        <ResponsiveContainer width="100%" height={380}>
          <ScatterChart margin={{ top: 5, right: 5, bottom: 40, left: 52 }}>
            <CartesianGrid
              strokeDasharray="0"
              stroke="transparent"
              vertical={false}
              horizontal={false}
            />
            <XAxis
              type="number"
              dataKey="effort"
              domain={[0, 10]}
              ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              tick={{ fontSize: 11, fill: "#9b92a8", fontFamily: "inherit" }}
              axisLine={false}
              tickLine={false}
              label={{
                value: "Implementation Effort",
                position: "insideBottom",
                offset: -20,
                style: {
                  fontSize: 12,
                  fill: "#6b6378",
                  fontWeight: 600,
                  fontFamily: "inherit",
                },
              }}
            />
            <YAxis
              type="number"
              dataKey="impact"
              domain={[0, 10]}
              ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              tick={{ fontSize: 11, fill: "#9b92a8", fontFamily: "inherit" }}
              axisLine={false}
              tickLine={false}
              label={{
                value: "Business Impact",
                angle: -90,
                position: "insideLeft",
                offset: -36,
                style: {
                  fontSize: 12,
                  fill: "#6b6378",
                  fontWeight: 600,
                  fontFamily: "inherit",
                },
              }}
            />
            {/* Quadrant dividers */}
            <ReferenceLine
              x={5}
              stroke="#c4b5d4"
              strokeDasharray="5 3"
              strokeWidth={1.5}
            />
            <ReferenceLine
              y={5}
              stroke="#c4b5d4"
              strokeDasharray="5 3"
              strokeWidth={1.5}
            />

            <Tooltip
              content={
                <CustomTooltip
                  categoryColors={categoryColors}
                  priorityColors={priorityColors}
                />
              }
              cursor={false}
            />

            <Scatter
              data={data}
              shape={(props: unknown) => {
                const p = props as { cx?: number; cy?: number; payload?: MatrixPoint };
                return (
                  <CustomDot
                    cx={p.cx}
                    cy={p.cy}
                    payload={p.payload}
                    categoryColors={categoryColors}
                  />
                );
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>

        {/* Quadrant text labels, overlaid on chart */}
        <div
          className="absolute pointer-events-none"
          style={{ top: 5, right: 5, bottom: 40, left: 52 }}
        >
          <div className="relative w-full h-full">
            <span className="absolute top-2 left-2 text-[10px] font-bold text-emerald-600 uppercase tracking-wide opacity-70">
              Quick Wins
            </span>
            <span className="absolute top-2 right-2 text-[10px] font-bold text-blue-600 uppercase tracking-wide opacity-70 text-right">
              Major Projects
            </span>
            <span className="absolute bottom-2 left-2 text-[10px] font-bold text-gray-400 uppercase tracking-wide opacity-70">
              Fill-ins
            </span>
            <span className="absolute bottom-2 right-2 text-[10px] font-bold text-red-400 uppercase tracking-wide opacity-70 text-right">
              Avoid
            </span>
          </div>
        </div>
      </div>

      {/* Category color legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 justify-center">
        {Object.entries(categoryColors).map(([cat, color]) => (
          <div key={cat} className="flex items-center gap-1.5 text-[11px] text-[#6b6378]">
            <div
              className="w-3 h-3 rounded-full border-2 border-white"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 0 1px ${color}`,
              }}
            />
            <span className="font-medium">{cat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
