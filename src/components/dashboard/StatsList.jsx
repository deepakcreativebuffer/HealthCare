import React, { useState, useEffect } from "react";
import { AreaChart, Brain, Target, BookOpen, Loader2 } from "lucide-react";
import PanelCard from "./PanelCard";
import { api } from "../../data/api";

const iconMap = {
  blue: { bg: "bg-blue-100/50 text-blue-500", icon: AreaChart },
  orange: { bg: "bg-orange-100/50 text-orange-500", icon: Brain },
  green: { bg: "bg-green-100/50 text-green-500", icon: Target },
  sky: { bg: "bg-sky-100/50 text-sky-500", icon: BookOpen },
};

const StatsList = ({ onViewAll }) => {
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getDashboardStats().then(() => {
      // For this specific component, we still use the mainStats from mockData
      // but reached through a (theoretical) API call for consistency.
      // In a real app, this would be a specific endpoint.
      import("../../data/mockData").then(({ mockData }) => {
        setStats(mockData.mainStats);
        setIsLoading(false);
      });
    });
  }, []);

  return (
    <PanelCard
      title="Stats"
      icon={AreaChart}
      actionText="View All Stats"
      onActionClick={() => onViewAll?.("Main Stats List")}
      customScroll={true}
    >
      <div className="space-y-2">
        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
          </div>
        ) : (
          stats?.map((stat, idx) => {
            const Config = iconMap[stat.color];
            return (
              <div
                key={idx}
                className="bg-white border border-[#E2E8F0] rounded-[10px] px-2.5 py-1.5 flex items-center gap-2.5 hover:shadow-sm transition-all group cursor-pointer relative overflow-hidden"
              >
                {/* Icon Container */}
                <div
                  className={`w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0 ${Config.bg} group-hover:scale-105 transition-transform shadow-sm`}
                >
                  <Config.icon size={18} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[16px] font-bold text-slate-800 leading-none block">
                        {stat.value}
                      </span>
                      <p className="text-[10px] font-bold text-slate-400 mt-1 leading-tight uppercase tracking-tight">
                        {stat.label.substring(0, 16)}...
                      </p>
                    </div>

                    {/* View All Individual Link */}
                    <button className="text-[10px] font-extrabold text-action-blue hover:underline whitespace-nowrap">
                      View All
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </PanelCard>
  );
};

export default StatsList;
