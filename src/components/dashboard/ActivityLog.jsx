import React from "react";
import { Activity, Clock, MoreHorizontal } from "lucide-react";
import PanelCard from "./PanelCard";
import { mockData } from "../../data/mockData";

const ActivityLog = () => {
  return (
    <PanelCard
      title="Activity Log"
      icon={Activity}
      actionText="View All Activity"
      customScroll={true}
    >
      <div className="space-y-4">
        {mockData.activityLog.map((log, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 group cursor-pointer border-b border-slate-50 pb-4 last:border-0 last:pb-0"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[12px] font-bold text-slate-700 tracking-tight">
                  {log.type}
                </span>
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    log.status === "Approved"
                      ? "bg-green-50 text-green-500"
                      : log.status === "Created" || log.status === "Updated"
                        ? "bg-blue-50 text-blue-600"
                        : log.status === "Missing Notes (3)"
                          ? "bg-red-50 text-red-600"
                          : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {log.status}
                </span>
              </div>
              <p className="text-[10px] font-bold text-slate-400">
                Action by{" "}
                <span className="text-slate-500 font-bold ml-1">
                  • {log.user}
                </span>
              </p>
            </div>

            <div className="text-[10px] text-slate-400 font-bold whitespace-nowrap">
              {log.time}
            </div>
          </div>
        ))}
      </div>
    </PanelCard>
  );
};

export default ActivityLog;
