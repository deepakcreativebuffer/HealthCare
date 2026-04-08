import React, { useState, useEffect } from "react";
import {
  Users,
  UserCheck,
  CalendarClock,
  Stethoscope,
  CalendarDays,
  FileText,
  TrendingDown,
  TrendingUp,
  Loader2,
  Plus
} from "lucide-react";
import { api } from "../../data/api";

const iconMap = {
  Users: { icon: Users, bg: "bg-teal-50", color: "text-teal-600" },
  UserCheck: { icon: UserCheck, bg: "bg-blue-50", color: "text-blue-600" },
  CalendarClock: {
    icon: CalendarClock,
    bg: "bg-orange-50",
    color: "text-orange-600",
  },
  Stethoscope: { icon: Stethoscope, bg: "bg-red-50", color: "text-red-600" },
  CalendarDays: {
    icon: CalendarDays,
    bg: "bg-indigo-50",
    color: "text-indigo-600",
  },
  FileText: { icon: FileText, bg: "bg-green-50", color: "text-green-600" },
};

const StatsGrid = ({ onStatClick }) => {
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getDashboardStats().then((data) => {
      setStats(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 py-3">
        {[...Array(6)].map((_, idx) => (
          <div
            key={idx}
            className="bg-white rounded-[10px] border border-[#E2E8F0] shadow-sm p-4 h-[110px] flex items-center justify-center"
          >
            <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 py-1">
      {stats.map((stat, idx) => {
        const IconConfig = iconMap[stat.icon || "Users"];
        const isTotalResidents = stat.title === "Total Residents";
        return (
          <div
            key={idx}
            onClick={() => onStatClick?.(stat.title)}
            className="bg-white rounded-[10px] border border-[#E2E8F0] shadow-sm p-2.5 hover:shadow-md hover:border-blue-200 transition-all group cursor-pointer flex flex-col h-full active:scale-95 duration-200"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div
                className={`${IconConfig.bg} ${IconConfig.color} w-8 h-8 rounded-[8px] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 relative`}
              >
                <IconConfig.icon size={16} />
              </div>
              <div className="flex flex-col items-start w-full">
                <div className="flex items-center justify-between w-full">
                  <span className="text-[17px] font-bold text-slate-800 leading-tight">
                    {stat.value}
                  </span>
                </div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                  {stat.title}
                </p>
              </div>
            </div>

            <div className="mt-auto flex items-center gap-1.5 pt-1.5 border-t border-gray-100">
              <div
                className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full ${stat.trendUp ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}
              >
                {stat.trendUp ? (
                  <TrendingUp size={10} />
                ) : (
                  <TrendingDown size={10} />
                )}
                <span className="text-[10px] font-bold">{stat.trend}</span>
              </div>
              <span className="text-[10px] text-slate-400">vs last month</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsGrid;
