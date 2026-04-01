import React from "react";
import {
  Users,
  BookOpen,
  Target,
  Crosshair,
  HandHeart,
  Activity,
  FileText,
  UserCircle,
  Calendar,
  ChevronDown,
} from "lucide-react";

const BillingSubnav = () => {
  const secondaryTabs = [
    { label: "Staff Schedule", icon: Users, active: false },
    { label: "Notes Library", icon: BookOpen, active: false },
    { label: "Measurable Goal", icon: Target, active: false },
    { label: "Objective", icon: Crosshair, active: false },
    { label: "Interventions", icon: HandHeart, active: false },
    { label: "Activity Schedule", icon: Activity, active: false },
    { label: "Special Notes", icon: FileText, active: false },
    { label: "Employee", icon: UserCircle, active: false },
    { label: "Residents", icon: Users, active: false },
  ];

  const billingTabs = [
    { label: "Billing Dashboard", active: true },
    { label: "Payments / ERA", active: false },
    { label: "Reports", active: false },
  ];

  return (
    <div className="bg-slate-50/50 pt-2 px-6 flex flex-col gap-2 shrink-0 border-b border-slate-100">
      {/* Secondary App Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {secondaryTabs.map((tab) => (
          <button
            key={tab.label}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all border border-transparent ${
              tab.active
                ? "bg-white text-blue-600 shadow-sm border-slate-100"
                : "text-slate-400 hover:text-slate-600 hover:bg-white hover:border-slate-100"
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Billing Context Header */}
      <div className="flex items-center justify-between pb-3">
        {/* Billing Tabs */}
        <div className="flex items-center gap-2 bg-slate-100/50 p-1 rounded-xl border border-slate-100">
          {billingTabs.map((tab) => (
            <button
              key={tab.label}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all ${
                tab.active
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm">
            <Calendar size={14} className="text-slate-400" />
            <span className="text-[12px] font-bold text-slate-700">
              Sep 1, 2025 - Feb 28, 2025
            </span>
          </div>

          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm cursor-pointer hover:bg-slate-50 transition-all">
            <span className="text-[12px] font-bold text-slate-700">
              Last 6 months
            </span>
            <ChevronDown size={14} className="text-slate-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingSubnav;
