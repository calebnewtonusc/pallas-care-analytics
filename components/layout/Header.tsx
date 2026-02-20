"use client";

import { usePathname } from "next/navigation";
import { Calendar, TrendingUp } from "lucide-react";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": {
    title: "Executive Overview",
    subtitle: "High-level performance summary across all dimensions",
  },
  "/dashboard/financial": {
    title: "Financial Analytics",
    subtitle: "Revenue, margins, cost structure, and billing efficiency",
  },
  "/dashboard/workforce": {
    title: "Workforce Quality",
    subtitle: "Caregiver retention, training, satisfaction, and pipeline",
  },
  "/dashboard/clients": {
    title: "Client Analytics",
    subtitle: "Demographics, care levels, satisfaction, and retention",
  },
  "/dashboard/operations": {
    title: "Operations",
    subtitle: "Hours delivered, scheduling efficiency, and geographic coverage",
  },
  "/dashboard/strategy": {
    title: "Strategic Insights",
    subtitle: "Data-driven recommendations ranked by impact and effort",
  },
};

export function Header() {
  const pathname = usePathname();
  const pageInfo = pageTitles[pathname] ?? {
    title: "Analytics",
    subtitle: "Pallas Care Dashboard",
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-[#e2daf0] sticky top-0 z-30">
      <div>
        <h1 className="text-base font-semibold text-[#16121e] leading-tight">
          {pageInfo.title}
        </h1>
        <p className="text-xs text-[#6b6378] leading-tight mt-0.5">
          {pageInfo.subtitle}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-[#f5f0fb] px-3 py-1.5 rounded-lg">
          <TrendingUp size={13} className="text-[#5A378C]" />
          <span className="text-xs font-medium text-[#5A378C]">+18.3% YoY</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#6b6378] bg-[#f8f6fc] border border-[#e2daf0] px-3 py-1.5 rounded-lg">
          <Calendar size={13} />
          Feb 2026
        </div>
      </div>
    </header>
  );
}
