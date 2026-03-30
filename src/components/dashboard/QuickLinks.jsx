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
      <div className="space-y-3 max-h-[410px] overflow-y-auto no-scrollbar pr-1">
        {linkItems.map((link, idx) => (
          <button
            key={idx}
            className={`w-full flex items-center gap-4 p-3 rounded-2xl border border-dashed transition-all text-left group/link shrink-0 ${
              link.color === "green"
                ? "bg-[#f0fdf4] border-green-200"
                : link.color === "blue"
                  ? "bg-[#f0f9ff] border-blue-200"
                  : link.color === "orange"
                    ? "bg-[#fff7ed] border-orange-200"
                    : "bg-[#fef2f2] border-red-200"
            }`}
          >
            {/* White Circle for Icon */}
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
              <link.icon
                size={18}
                className={`${
                  link.color === "green"
                    ? "text-green-500"
                    : link.color === "blue"
                      ? "text-blue-500"
                      : link.color === "orange"
                        ? "text-orange-500"
                        : "text-red-500"
                }`}
              />
            </div>

            <div className="flex-1">
              <h4 className="text-[13px] font-bold text-slate-800 leading-tight">
                {link.label}
              </h4>
              <p className="text-[10px] text-slate-400 font-bold mt-0.5">
                {link.sub}
              </p>
            </div>

            <ChevronRight
              size={18}
              className={`transition-all group-hover/link:translate-x-1 ${
                link.color === "green"
                  ? "text-green-500"
                  : link.color === "blue"
                    ? "text-blue-500"
                    : link.color === "orange"
                      ? "text-orange-500"
                      : "text-red-500"
              }`}
            />
          </button>
        ))}
      </div>
    </PanelCard>
  );
};

export default QuickLinks;
