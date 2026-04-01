import React, { useState, useEffect } from "react";
import {
  CalendarRange,
  MoreHorizontal,
  UserCheck,
  Loader2,
} from "lucide-react";
import PanelCard from "./PanelCard";
import { api } from "../../data/api";

const EmployeeRecords = ({ onViewAll }) => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getStaff().then((data) => {
      const formatted = data.slice(0, 5).map((emp) => ({
        ...emp,
        initial:
          emp.name
            .split(" ")
            .map((n) => (n.includes(".") ? "" : n[0]))
            .join("")
            .slice(0, 2) || emp.name.charAt(0),
      }));
      setEmployees(formatted);
      setIsLoading(false);
    });
  }, []);

  return (
    <PanelCard
      title="Active Employee Records"
      icon={CalendarRange}
      actionText="View All"
      onActionClick={() => onViewAll?.("Active Employee Records")}
    >
      <div className="space-y-2">
        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
          </div>
        ) : (
          employees.map((emp, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 bg-white border border-[#E2E8F0] rounded-[10px] px-2.5 py-1.5 hover:shadow-sm transition-all group cursor-pointer"
            >
              {/* Initials Avatar */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                  emp.role === "Doctor"
                    ? "bg-[#E9F7EF] text-[#27AE60]"
                    : emp.role === "Nurse"
                      ? "bg-[#E0F7FA] text-[#00ACC1]"
                      : emp.role === "Admin"
                        ? "bg-[#FFF4E5] text-[#FF9800]"
                        : "bg-[#FFEBEE] text-[#D32F2F]"
                }`}
              >
                {emp.initial}
              </div>

              {/* Name */}
              <div className="flex-1">
                <h4 className="text-[13px] font-bold text-slate-800 tracking-tight leading-tight">
                  {emp.name}
                </h4>
              </div>

              {/* Role Badge */}
              <div className="flex items-center">
                <span
                  className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                    emp.role === "Doctor"
                      ? "bg-[#E9F7EF] text-[#27AE60]"
                      : emp.role === "Nurse"
                        ? "bg-[#E0F7FA] text-[#00ACC1]"
                        : emp.role === "Admin"
                          ? "bg-[#FFF4E5] text-[#FF9800]"
                          : "bg-[#FFEBEE] text-[#D32F2F]"
                  }`}
                >
                  {emp.role}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </PanelCard>
  );
};

export default EmployeeRecords;
