import React from "react";
import { CalendarRange, MoreHorizontal, UserCheck } from 'lucide-react';
import PanelCard from "./PanelCard";
import { mockData } from "../../data/mockData";

const EmployeeRecords = () => {
  return (
    <PanelCard
      title="Employee Records"
      icon={CalendarRange}
      actionText="View All"
    >
      <div className="space-y-2">
        {mockData.employeeRecords.map((emp, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 bg-white border border-[#E2E8F0] rounded-[10px] px-3 py-2.5 hover:shadow-sm transition-all group cursor-pointer"
          >
            {/* Initials Avatar */}
            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold ${
              emp.role === "Clinical" ? "bg-[#E9F7EF] text-[#27AE60]" :
              emp.role === "Therapy" ? "bg-[#E0F7FA] text-[#00ACC1]" :
              emp.role === "Social" ? "bg-[#FFF4E5] text-[#FF9800]" :
              "bg-[#FFEBEE] text-[#D32F2F]"
            }`}>
              {emp.initial}
            </div>

            {/* Name */}
            <div className="flex-1">
              <h4 className="text-[14px] font-bold text-slate-800 tracking-tight">
                {emp.name}
              </h4>
            </div>

            {/* Role Badge */}
            <div className="flex items-center">
              <span
                className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                  emp.role === "Clinical"
                    ? "bg-[#E9F7EF] text-[#27AE60]"
                    : emp.role === "Therapy"
                      ? "bg-[#E0F7FA] text-[#00ACC1]"
                      : emp.role === "Social"
                        ? "bg-[#FFF4E5] text-[#FF9800]"
                        : "bg-[#FFEBEE] text-[#D32F2F]"
                }`}
              >
                {emp.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </PanelCard>
  );
};

export default EmployeeRecords;
