"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  DollarSign,
  Users,
  HeartHandshake,
  MapPin,
  Lightbulb,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/dashboard",
    label: "Executive Overview",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/financial",
    label: "Financial Analytics",
    icon: DollarSign,
  },
  {
    href: "/dashboard/workforce",
    label: "Workforce Quality",
    icon: Users,
  },
  {
    href: "/dashboard/clients",
    label: "Client Analytics",
    icon: HeartHandshake,
  },
  {
    href: "/dashboard/operations",
    label: "Operations",
    icon: MapPin,
  },
  {
    href: "/dashboard/strategy",
    label: "Strategic Insights",
    icon: Lightbulb,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen flex flex-col fixed left-0 top-0 z-40 border-r border-[#e2daf0] bg-white">
      {/* Brand */}
      <div className="px-6 py-5 border-b border-[#e2daf0]">
        <a
          href="https://www.pallas.care"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 hover:opacity-75 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-[#5A378C] flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <div>
            <p className="font-semibold text-[#16121e] text-sm leading-tight flex items-center gap-1.5">
              Pallas Care
              <ExternalLink size={10} className="text-[#c4b5d4]" />
            </p>
            <p className="text-[10px] text-[#6b6378] leading-tight mt-0.5">Analytics Dashboard</p>
          </div>
        </a>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="px-3 text-[10px] font-semibold text-[#6b6378] uppercase tracking-widest mb-2">
          Analytics
        </p>
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150",
                    isActive
                      ? "bg-[#5A378C] text-white font-medium shadow-sm"
                      : "text-[#4a3f5c] hover:bg-[#f5f0fb] hover:text-[#5A378C]"
                  )}
                >
                  <Icon
                    size={16}
                    className={cn(
                      "flex-shrink-0",
                      isActive ? "text-white" : "text-[#9975c8]"
                    )}
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-[#e2daf0]">
        <p className="text-[10px] text-[#9b92a8]">
          Data period: Feb 2026 · LA County
        </p>
      </div>
    </aside>
  );
}
