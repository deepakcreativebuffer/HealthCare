import React from "react";
import { Plus, Target, Zap, FileText, ChevronRight } from "lucide-react";
import PanelCard from "./PanelCard";

const linkItems = [
  {
    icon: Plus,
    label: "Add New User",
    sub: "Register a new profile",
    color: "green",
  },
  {
    icon: Target,
    label: "Resident Vitals",
    sub: "Log daily health stats",
    color: "blue",
  },
  {
    icon: Zap,
    label: "Resident Tracking",
    sub: "View current location and status",
    color: "orange",
  },
  {
    icon: FileText,
    label: "View Logs",
    sub: "Access historical records",
    color: "red",
  },
  {
    icon: Plus,
    label: "Skills and Knowledge Training",
    sub: "Educational modules",
    color: "green",
  },
  {
    icon: Target,
    label: "On Site and Facility Orientation Verification",
    sub: "Confirm site-specific training",
    color: "blue",
  },
  {
    icon: Zap,
    label: "Clinical Oversight",
    sub: "Supervisory reviews",
    color: "orange",
  },
];

const QuickLinks = () => {
  return (
    <PanelCard title="Quick Links" icon={Zap} customScroll={true}>
      <div className="space-y-2 max-h-[410px] overflow-y-auto no-scrollbar pr-1">
        {linkItems.map((link, idx) => (
          <button
            key={idx}
            className={`w-full flex items-center gap-3 p-3 rounded-[10px] border transition-all text-left group/link shrink-0 ${
              link.color === "green"
                ? "bg-[#E9F7EF] border-[#C2E9D1]"
                : link.color === "blue"
                  ? "bg-[#DEF3FF] border-[#B5E1FA]"
                  : link.color === "orange"
                    ? "bg-[#FFF4E5] border-[#FFE0B2]"
                    : "bg-[#FFEBEE] border-[#FFCDD2]"
            }`}
          >
            {/* White Circle for Icon */}
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-white/50">
              <link.icon
                size={16}
                className={`${
                  link.color === "green"
                    ? "text-[#27AE60]"
                    : link.color === "blue"
                      ? "text-[#129FED]"
                      : link.color === "orange"
                        ? "text-[#FF9800]"
                        : "text-[#D32F2F]"
                }`}
              />
            </div>

            <div className="flex-1">
              <h4 className="text-[13px] font-bold text-slate-800 leading-tight">
                {link.label}
              </h4>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5 opacity-80">
                {link.sub}
              </p>
            </div>

            <ChevronRight
              size={16}
              className={`transition-all group-hover/link:translate-x-1 ${
                link.color === "green"
                  ? "text-[#27AE60]"
                  : link.color === "blue"
                    ? "text-[#129FED]"
                    : link.color === "orange"
                      ? "text-[#FF9800]"
                      : "text-[#D32F2F]"
              }`}
            />
          </button>
        ))}
      </div>
    </PanelCard>
  );
};

export default QuickLinks;
