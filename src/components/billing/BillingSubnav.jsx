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

const BillingSubnav = ({ activeBillingTab, setActiveBillingTab }) => {
  const secondaryTabs = [
    { label: "Staff Schedule", icon: Users },
    { label: "Notes Library", icon: BookOpen },
    { label: "Measurable Goal", icon: Target },
    { label: "Objective", icon: Crosshair },
    { label: "Interventions", icon: HandHeart },
    { label: "Activity Schedule", icon: Activity },
    { label: "Special Notes", icon: FileText },
    { label: "Employee", icon: UserCircle },
    { label: "Residents", icon: Users },
  ];

  const billingTabs = [
    { label: "Billing Dashboard" },
    { label: "Payments / ERA" },
    { label: "Reports" },
  ];

  return (
    <div className="bg-slate-50/50 pt-2 px-6 flex flex-col gap-2 shrink-0 border-b border-slate-100">
      {/* Secondary App Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {secondaryTabs.map((tab) => (
          <button
            key={tab.label}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all border border-transparent text-slate-400 hover:text-slate-600 hover:bg-white hover:border-slate-100 whitespace-nowrap"
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Billing Context Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 gap-4">
        {/* Billing Tabs */}
        <div className="flex items-center gap-2 bg-slate-100/50 p-1 rounded-xl border border-slate-100 overflow-x-auto no-scrollbar max-w-full">
          {billingTabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveBillingTab(tab.label)}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all whitespace-nowrap ${
                activeBillingTab === tab.label
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar flex-nowrap pb-1">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm whitespace-nowrap">
            <Calendar size={14} className="text-slate-400" />
            <span className="text-[12px] font-bold text-slate-700">
              Sep 1, 2025 - Feb 28, 2025
            </span>
          </div>

          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm cursor-pointer hover:bg-slate-50 transition-all whitespace-nowrap">
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
