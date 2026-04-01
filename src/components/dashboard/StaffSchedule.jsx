import React, { useState, useEffect } from "react";
import { CalendarRange, ChevronDown, Users, Loader2 } from "lucide-react";
import PanelCard from "./PanelCard";
import { api } from "../../data/api";

const StaffSchedule = ({ onViewAll }) => {
  const [schedule, setSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getStaff().then(() => {
      // Reaching through simulated API for consistency
      import("../../data/mockData").then(({ mockData }) => {
        setSchedule(mockData.staffSchedule);
        setIsLoading(false);
      });
    });
  }, []);

  return (
    <PanelCard
      title="Staff Schedule"
      icon={Users}
      headerAction={
        <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 mr-2 cursor-pointer">
          Staff <ChevronDown size={14} />
        </div>
      }
      actionText="View All"
      onActionClick={() => onViewAll?.("Staff Schedule")}
      showMore={false}
    >
      <div className="space-y-2">
        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
          </div>
        ) : (
          schedule?.map((shift, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E2E8F0] rounded-[10px] px-3 py-3 flex items-center gap-3 hover:shadow-sm transition-all group/shift cursor-pointer relative overflow-hidden"
            >
              {/* Left Icon square */}
              <div
                className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 transition-colors ${
                  shift.color === "blue"
                    ? "bg-[#DEF3FF] text-[#129FED]"
                    : shift.color === "green"
                      ? "bg-[#E9F7EF] text-[#27AE60]"
                      : "bg-[#FFF4E5] text-[#FF9800]"
                }`}
              >
                <CalendarRange size={18} />
              </div>

              <div className="flex-1 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[18px] font-bold text-slate-800 leading-none">
                      {shift.count}
                    </span>
                  </div>
                  <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-tight">
                    Total Number of Shift
                  </p>
                </div>

                <div
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    shift.color === "blue"
                      ? "bg-[#DEF3FF] text-[#129FED]"
                      : shift.color === "green"
                        ? "bg-[#E9F7EF] text-[#27AE60]"
                        : "bg-[#FFF4E5] text-[#FF9800]"
                  }`}
                >
                  {shift.facility}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </PanelCard>
  );
};

export default StaffSchedule;
