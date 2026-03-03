"use client";

import { usePathname } from "next/navigation";
import { Calendar } from "lucide-react";

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
    <header
      className="h-14 flex items-center justify-between px-6 bg-white sticky top-0 z-30"
      style={{
        borderBottom: "1px solid transparent",
        backgroundImage:
          "linear-gradient(white, white), linear-gradient(90deg, #5A378C 0%, #9975c8 50%, #e2daf0 100%)",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        borderBottomWidth: "2px",
        borderBottomStyle: "solid",
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-1 h-8 rounded-full flex-shrink-0"
          style={{ background: "linear-gradient(180deg, #5A378C 0%, #9975c8 100%)" }}
        />
        <div>
          <h1 className="text-sm font-bold text-[#16121e] leading-tight tracking-tight">{pageInfo.title}</h1>
          <p className="text-[11px] text-[#9b92a8] leading-tight mt-0.5">{pageInfo.subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-[#6b6378] px-3 py-1.5 rounded-lg bg-[#f8f6fc] border border-[#e2daf0]">
        <Calendar size={12} />
        <span>Feb 2026</span>
      </div>
    </header>
  );
}
