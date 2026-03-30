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
      <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden">
        {mockData.employeeRecords.map((emp, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 group cursor-pointer"
          >
            {/* Initials Avatar */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold bg-[#fff7ed] text-[#f97316]`}>
              {emp.initial}
            </div>

            {/* Name */}
            <div className="flex-1">
              <h4 className="text-[13px] font-bold text-slate-700 tracking-tight">
                {emp.name}
              </h4>
            </div>

            {/* Role Badge */}
            <div className="flex items-center">
              <span
                className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                  emp.role === "Clinical"
                    ? "bg-[#dcfce7] text-[#16a34a]"
                    : emp.role === "Therapy"
                      ? "bg-[#e0f7fa] text-[#00acc1]"
                      : emp.role === "Social"
                        ? "bg-[#ffedd5] text-[#d97706]"
                        : "bg-[#fee2e2] text-[#dc2626]"
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
