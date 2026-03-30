import React from "react";
import { CalendarRange, ChevronDown, Users } from "lucide-react";
import PanelCard from "./PanelCard";
import { mockData } from "../../data/mockData";

const StaffSchedule = () => {
  return (
    <PanelCard 
      title="Staff Schedule" 
      icon={Users} 
      headerAction={
        <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 mr-2 cursor-pointer">
          Today <ChevronDown size={14} />
        </div>
      }
      actionText="View All"
      showMore={false}
    >
      <div className="space-y-3">
        {mockData.staffSchedule.map((shift, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-4 hover:shadow-sm transition-all group/shift cursor-pointer relative overflow-hidden"
          >
            {/* Left Icon square */}
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                shift.color === "blue"
                  ? "bg-blue-50 text-blue-500"
                  : shift.color === "green"
                    ? "bg-green-50 text-green-500"
                    : "bg-orange-50 text-orange-500"
              }`}
            >
              <CalendarRange size={20} />
            </div>

            <div className="flex-1 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-slate-800 tracking-tight leading-none">
                    {shift.count}
                  </span>
                </div>
                <p className="text-[10px] font-bold text-slate-400 mt-1.5 uppercase tracking-tight">
                  Total Number of Shift
                </p>
              </div>

              <div
                className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                  shift.color === "blue"
                    ? "bg-[#e0f2fe] text-[#0ea5e9]"
                    : shift.color === "green"
                      ? "bg-[#dcfce7] text-[#22c55e]"
                      : "bg-[#ffedd5] text-[#f97316]"
                }`}
              >
                {shift.facility}
              </div>
            </div>
          </div>
        ))}
      </div>
    </PanelCard>
  );
};

export default StaffSchedule;
